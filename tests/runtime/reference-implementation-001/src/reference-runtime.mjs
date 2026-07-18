import {
  Contracts,
  DispositionForms,
  EffectResults,
  disclaimer,
  requireFields,
  validateDisposition,
  validatePlan,
} from "./contracts.mjs";

export class ReferenceRuntime {
  constructor({
    store,
    authorityPort,
    correlationPort,
    procedurePort,
    effectPort,
    observationSink,
    executionGate = null,
    clock = () => new Date().toISOString(),
  }) {
    this.store = store;
    this.authorityPort = authorityPort;
    this.correlationPort = correlationPort;
    this.procedurePort = procedurePort;
    this.effectPort = effectPort;
    this.observationSink = observationSink;
    this.executionGate = executionGate;
    this.clock = clock;
    this.sequence = 0;
  }

  accept(realization) {
    requireFields(realization, [
      "id",
      "contract",
      "procedureReference",
      "diagnosisContract",
      "dispositionContract",
      "authorityContract",
      "provenanceContract",
      "implementationVersion",
      "semanticMappingVersion",
      "environment",
      "component",
      "scope",
    ], "REALIZATION");
    const expected = {
      contract: Contracts.realization,
      procedureReference: Contracts.maintenanceProcedure,
      diagnosisContract: Contracts.diagnosis,
      dispositionContract: Contracts.disposition,
      authorityContract: Contracts.authority,
      provenanceContract: Contracts.provenance,
    };
    for (const [key, value] of Object.entries(expected)) {
      if (realization[key] !== value) return this.refuse(realization, `REALIZATION_${key.toUpperCase()}_MISMATCH`);
    }
    if (!this.store.hasComponent(realization.component)) return this.refuse(realization, "COMPONENT_UNKNOWN");
    this.store.saveRealization(realization.id, realization);
    this.observe("ADMISSION", "ACCEPTED", realization.id, realization, {});
    return { status: "ACCEPTED", realizationId: realization.id };
  }

  dispatch({ realizationId, attemptId, effectId, disposition, plan, crashAt }) {
    const realization = this.store.getRealization(realizationId);
    if (!realization) return this.refuse({ realizationId, attemptId, effectId }, "REALIZATION_ABSENT");
    try {
      validateDisposition(disposition);
      validatePlan(plan);
    } catch (error) {
      return this.refuse({ realizationId, attemptId, effectId, ...realization }, error.message);
    }
    if (disposition.form !== DispositionForms.INSTRUCT) {
      return this.refuse({ realizationId, attemptId, effectId, ...realization }, "NON_EFFECT_DISPOSITION");
    }
    const conformance = [
      ["dispositionId", plan.dispositionId, disposition.id],
      ["dispositionVersion", plan.dispositionVersion, disposition.version],
      ["diagnosisId", plan.diagnosisId, disposition.diagnosisId],
      ["diagnosisVersion", plan.diagnosisVersion, disposition.diagnosisVersion],
      ["environment", plan.environment, disposition.environment],
      ["component", plan.component, disposition.component],
      ["action", plan.action, disposition.action],
      ["scope", plan.scope, disposition.scope],
      ["procedureReference", plan.procedureReference, Contracts.maintenanceProcedure],
      ["implementationVersion", plan.implementationVersion, realization.implementationVersion],
      ["semanticMappingVersion", plan.semanticMappingVersion, realization.semanticMappingVersion],
    ];
    const mismatch = conformance.find(([, actual, expected]) => actual !== expected);
    if (mismatch) return this.refuse({ realizationId, attemptId, effectId, ...realization }, `PLAN_WIDENS_OR_MISMATCHES:${mismatch[0]}`);

    const component = this.store.getComponent(realization.component);
    if (component.implementationVersion !== plan.implementationVersion ||
        component.semanticMappingVersion !== plan.semanticMappingVersion) {
      return this.refuse({ realizationId, attemptId, effectId, ...realization }, "CURRENT_STATE_MISMATCH");
    }

    const prior = this.store.getEffect(effectId);
    if (prior?.status === "QUARANTINED_INDETERMINATE") return this.refuse({ realizationId, attemptId, effectId, ...realization }, "INDETERMINATE_EFFECT_QUARANTINED");
    if (prior) return this.refuse({ realizationId, attemptId, effectId, ...realization }, "DUPLICATE_EFFECT");

    const context = { realization, disposition, plan, attemptId, effectId };
    const authority = this.authorityPort.evaluate(context);
    if (!authority?.effective || authority.reference !== plan.authorityFindingReference) {
      return this.refuse({ realizationId, attemptId, effectId, ...realization }, authority?.reason ?? "AUTHORITY_REFUSED");
    }
    const correlation = this.correlationPort.evaluate(context);
    if (!correlation?.exact || correlation.reference !== plan.correlationFindingReference) {
      return this.refuse({ realizationId, attemptId, effectId, ...realization }, correlation?.reason ?? "CORRELATION_REFUSED");
    }
    const procedure = this.procedurePort.evaluate(context);
    if (!procedure?.permits || procedure.reference !== plan.procedureReference) {
      return this.refuse({ realizationId, attemptId, effectId, ...realization }, procedure?.reason ?? "PROCEDURE_REFUSED");
    }

    if (this.executionGate) {
      const claim = this.executionGate.claim({ effectId, attemptId });
      if (!claim.accepted) {
        return this.refuse({ realizationId, attemptId, effectId, ...realization }, claim.reason);
      }
    }

    const effect = { effectId, attemptId, status: "DISPATCH_PENDING" };
    this.store.saveEffect(effectId, effect);
    if (crashAt === "before-dispatch") {
      effect.status = "CRASHED_BEFORE_DISPATCH";
      this.store.saveEffect(effectId, effect);
      this.observe("PROCESS", "CRASHED", attemptId, realization, { attemptId, effectId, authority, correlation, procedure });
      return structuredClone(effect);
    }

    if (this.executionGate) {
      const permit = this.executionGate.markDispatched({ effectId, attemptId });
      if (!permit.accepted) {
        effect.status = "ABORTED_BEFORE_DISPATCH";
        effect.reason = permit.reason;
        this.store.saveEffect(effectId, effect);
        return this.refuse({ realizationId, attemptId, effectId, ...realization }, permit.reason);
      }
    }

    effect.status = "DISPATCHED";
    this.store.saveEffect(effectId, effect);
    this.observe("DISPATCH", "STARTED", effectId, realization, { attemptId, effectId, authority, correlation, procedure });
    const result = this.effectPort.dispatch({ realization, disposition, plan, attemptId, effectId });
    if (crashAt === "after-dispatch" || result === EffectResults.INDETERMINATE) {
      this.executionGate?.quarantine({ effectId, attemptId });
      effect.status = "QUARANTINED_INDETERMINATE";
      this.store.saveEffect(effectId, effect);
      this.observe("EXTERNAL_EFFECT", "QUARANTINED", effectId, realization, {
        attemptId,
        effectId,
        authority,
        correlation,
        procedure,
        indeterminate: true,
      });
      return structuredClone(effect);
    }
    effect.status = result === EffectResults.SUCCEEDED ? "SUCCEEDED_OPERATIONALLY" : "FAILED_OPERATIONALLY";
    let completionIndeterminate = false;
    if (this.executionGate) {
      const completion = this.executionGate.complete({ effectId, attemptId, result: effect.status });
      if (!completion.accepted) {
        effect.status = "QUARANTINED_INDETERMINATE";
        effect.recoveryReason = completion.reason;
        completionIndeterminate = true;
      }
    }
    this.store.saveEffect(effectId, effect);
    if (completionIndeterminate) {
      this.observe("EXTERNAL_EFFECT", "QUARANTINED", effectId, realization, {
        attemptId,
        effectId,
        authority,
        correlation,
        procedure,
        indeterminate: true,
      });
      return structuredClone(effect);
    }
    this.observe("EXTERNAL_EFFECT", result === EffectResults.SUCCEEDED ? "COMPLETED_OPERATIONALLY" : "FAILED_OPERATIONALLY", effectId, realization, {
      attemptId,
      effectId,
      authority,
      correlation,
      procedure,
    });
    return structuredClone(effect);
  }

  refuse(subject, reason) {
    this.observe("REFUSAL", "REFUSED", subject.effectId ?? subject.attemptId ?? subject.id ?? "unknown", subject, { reason });
    return { status: "REFUSED", reason };
  }

  observe(cls, result, subjectIdentity, realization, details) {
    const observation = {
      observationId: `obs-${++this.sequence}`,
      observationContract: Contracts.observation,
      class: cls,
      result,
      component: realization.component ?? "not-applicable",
      subjectIdentity,
      implementationVersion: realization.implementationVersion ?? "reference-runtime-001",
      semanticMappingVersion: realization.semanticMappingVersion ?? "not-applicable",
      observedAt: this.clock(),
      clockSource: "injected-reference-clock",
      details: structuredClone(details),
      secretRedactionStatus: "NO_SECRETS_RECORDED",
      producer: "ReferenceRuntime001",
      provenanceReferences: details.correlation?.reference ? [details.correlation.reference] : [],
      knownGaps: details.indeterminate ? ["EXTERNAL_EFFECT_OUTCOME_UNKNOWN"] : [],
      semanticDisclaimer: disclaimer,
      missionOrScopeIdentity: realization.scope,
      realizationIdentity: realization.id,
      attemptIdentity: details.attemptId,
      effectIdentity: details.effectId,
      authorityFindingReference: details.authority?.reference,
      correlationFindingReference: details.correlation?.reference,
      procedureReference: details.procedure?.reference ?? realization.procedureReference,
      indeterminateEffect: Boolean(details.indeterminate),
    };
    this.observationSink.append(observation);
    return observation;
  }
}
