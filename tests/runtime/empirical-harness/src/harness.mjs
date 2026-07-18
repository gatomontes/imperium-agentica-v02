import assert from "node:assert/strict";

export const Modes = Object.freeze({
  EXACT: "EXECUTE_EXACT_INSTRUCTION",
  BOUNDED: "BOUNDED_MAINTENANCE_DISCRETION",
});

export const Actions = Object.freeze({
  ACTIVATE: "ACTIVATE_IMPLEMENTATION",
  DEACTIVATE: "DEACTIVATE_IMPLEMENTATION",
  RECOVER: "INITIATE_RECOVERY",
  TUNE: "ALTER_RESOURCE_LIMIT",
  MIGRATE: "MIGRATE_STATE",
  ROLLBACK: "ROLL_BACK_IMPLEMENTATION",
});

const disclaimer = "Operational observation only; not a Cognitive, Authority, Provenance, Procedure, proof, completion, or mission finding.";

export class AuthorityRegistry {
  constructor() { this.grants = new Map(); }
  issue(grant) { this.grants.set(grant.id, structuredClone(grant)); }
  withdraw(id) { this.grants.get(id).effective = false; }
  finding(id, request) {
    const grant = this.grants.get(id);
    if (!grant || !grant.effective) return { effective: false, reason: "WITHDRAWN_OR_ABSENT" };
    if (grant.environment !== request.environment || !grant.components.includes(request.component)) return { effective: false, reason: "SCOPE_MISMATCH" };
    if (!grant.actions.includes(request.action)) return { effective: false, reason: "ACTION_NOT_GRANTED" };
    if (grant.mode === Modes.EXACT && grant.instructionId !== request.instructionId) return { effective: false, reason: "EXACT_INSTRUCTION_MISMATCH" };
    if (grant.mode === Modes.BOUNDED && (!grant.findings.includes(request.diagnosis) || grant.procedure !== request.procedure)) return { effective: false, reason: "DISCRETION_CONDITION_MISMATCH" };
    return { effective: true, grantId: id, version: grant.version, mode: grant.mode };
  }
}

export class RuntimeHarness {
  constructor({ authority, clock = (() => new Date().toISOString()) }) {
    this.authority = authority;
    this.clock = clock;
    this.components = new Map();
    this.effects = new Map();
    this.queue = [];
    this.observations = [];
    this.sequence = 0;
  }

  addComponent(id, state = {}) {
    this.components.set(id, { active: false, blocked: false, resourceLimit: 1, mappingVersion: "map-1", implementationVersion: "impl-1", ...state });
  }

  observe({ cls, result, subject, request, details = {}, indeterminate = false }) {
    const observation = {
      observationId: `obs-${++this.sequence}`,
      observationContractVersion: "runtime-observation-envelope-draft-001",
      class: cls,
      result,
      component: request?.component ?? subject,
      subjectIdentity: subject,
      implementationVersion: this.components.get(request?.component)?.implementationVersion ?? "harness-1",
      semanticMappingVersion: this.components.get(request?.component)?.mappingVersion ?? "not-applicable",
      observedAt: this.clock(),
      clockSource: "injected-harness-clock",
      details,
      secretRedactionStatus: "NO_SECRETS_RECORDED",
      producer: "RuntimeHarness",
      provenanceReferences: request?.correlation ? [request.correlation] : [],
      knownGaps: indeterminate ? ["EXTERNAL_EFFECT_OUTCOME_UNKNOWN"] : [],
      semanticDisclaimer: disclaimer,
      missionOrScopeIdentity: request?.scope,
      attemptIdentity: request?.attemptId,
      effectIdentity: request?.effectId,
      authorityFindingReference: details.authorityFinding,
      procedureReference: request?.procedure,
      indeterminateEffect: indeterminate,
    };
    this.observations.push(observation);
    return observation;
  }

  enqueue(item) {
    this.queue.push(structuredClone(item));
    return this.observe({ cls: "QUEUE", result: "ACCEPTED", subject: item.attemptId, request: item });
  }

  blockWorker(component) {
    this.components.get(component).blocked = true;
  }

  clearBlockage(component) {
    this.components.get(component).blocked = false;
    this.observe({ cls: "RESOURCE", result: "RECOVERED", subject: component, request: { component } });
  }

  dispatch(request, provider) {
    const component = this.components.get(request.component);
    assert(component, `unknown component ${request.component}`);
    const controlActionMayAddressBlockage = [Actions.RECOVER, Actions.DEACTIVATE].includes(request.action);
    if (component.blocked && !controlActionMayAddressBlockage) return this.refuse(request, "COMPONENT_BLOCKED");
    if (!request.correlation) return this.refuse(request, "CORRELATION_ABSENT");
    const finding = this.authority.finding(request.grantId, request);
    if (!finding.effective) return this.refuse(request, finding.reason);
    const prior = this.effects.get(request.effectId);
    if (prior?.status === "INDETERMINATE") return this.refuse(request, "INDETERMINATE_EFFECT_QUARANTINED");
    if (prior) return this.refuse(request, "DUPLICATE_EFFECT");

    const effect = { effectId: request.effectId, attemptId: request.attemptId, status: "DISPATCH_PENDING" };
    this.effects.set(request.effectId, effect);
    if (request.crashAt === "before-dispatch") {
      effect.status = "CRASHED_BEFORE_DISPATCH";
      this.observe({ cls: "PROCESS", result: "CRASHED", subject: request.attemptId, request, details: { authorityFinding: finding } });
      return effect;
    }

    effect.status = "DISPATCHED";
    this.observe({ cls: "DISPATCH", result: "STARTED", subject: request.effectId, request, details: { authorityFinding: finding } });
    const outcome = provider(request);
    if (request.crashAt === "after-dispatch" || outcome === "INDETERMINATE") {
      effect.status = "INDETERMINATE";
      this.observe({ cls: "EXTERNAL_EFFECT", result: "QUARANTINED", subject: request.effectId, request, details: { authorityFinding: finding }, indeterminate: true });
      return effect;
    }
    effect.status = outcome === "SUCCEEDED" ? "SUCCEEDED_OPERATIONALLY" : "FAILED_OPERATIONALLY";
    this.apply(request, effect.status);
    this.observe({ cls: "EXTERNAL_EFFECT", result: effect.status === "SUCCEEDED_OPERATIONALLY" ? "COMPLETED_OPERATIONALLY" : "FAILED_OPERATIONALLY", subject: request.effectId, request, details: { authorityFinding: finding } });
    return effect;
  }

  refuse(request, reason) {
    this.observe({ cls: "REFUSAL", result: "REFUSED", subject: request.effectId ?? request.attemptId, request, details: { reason } });
    return { status: "REFUSED", reason };
  }

  apply(request, status) {
    if (status !== "SUCCEEDED_OPERATIONALLY") return;
    const component = this.components.get(request.component);
    if (request.action === Actions.ACTIVATE) component.active = true;
    if (request.action === Actions.DEACTIVATE) component.active = false;
    if (request.action === Actions.TUNE) component.resourceLimit = request.targetLimit;
    if (request.action === Actions.RECOVER) component.blocked = false;
  }

  migrate({ component: id, targetMapping, preserves, grantRequest, provider = () => "SUCCEEDED" }) {
    const component = this.components.get(id);
    const required = ["semanticStates", "effectIdentities", "observations", "quarantines", "procedureBranches"];
    const missing = required.filter(key => !preserves.includes(key));
    if (missing.length) return this.refuse(grantRequest, `LOSSY_MIGRATION:${missing.join(",")}`);
    const result = this.dispatch(grantRequest, provider);
    if (result.status === "SUCCEEDED_OPERATIONALLY") component.mappingVersion = targetMapping;
    return result;
  }

  rollback(request, provider = () => "SUCCEEDED") {
    const quarantined = [...this.effects.values()].some(effect => effect.status === "INDETERMINATE");
    if (request.erasesObservations || request.reclassifiesIndeterminate || quarantined && request.claimsExternalReversal) return this.refuse(request, "ROLLBACK_CANNOT_REWRITE_HISTORY_OR_EXTERNAL_EFFECTS");
    return this.dispatch(request, provider);
  }
}

export class MasterMason {
  constructor(runtime) { this.runtime = runtime; }
  diagnose({ component, symptom, structural = false }) {
    if (structural) return "STRUCTURAL_CHANGE_REQUIRED";
    const state = this.runtime.components.get(component);
    if (!state) return "RUNTIME_CONDITION_INDETERMINATE";
    if (symptom === "RESOURCE_EXHAUSTED" || state.blocked || symptom === "INACTIVE") return "RUNTIME_MAINTENANCE_ELIGIBLE";
    return "RUNTIME_HEALTHY";
  }
  maintain(request, provider = () => "SUCCEEDED") {
    if (request.diagnosis === "STRUCTURAL_CHANGE_REQUIRED" || request.diagnosis === "RUNTIME_CONDITION_INDETERMINATE") return { exit: "STRUCTURAL_ESCALATION_REQUIRED" };
    const effect = this.runtime.dispatch(request, provider);
    if (effect.status === "SUCCEEDED_OPERATIONALLY") return { exit: "OPERATIONALLY_RESTORED", effect };
    if (effect.status === "INDETERMINATE") return { exit: "CONDITION_REMAINS_INDETERMINATE", effect };
    return { exit: "MAINTENANCE_WITHHELD", effect };
  }
}

export function checkConformance(procedure, machine) {
  const errors = [];
  for (const transition of procedure.transitions) if (!machine.transitions.includes(transition)) errors.push(`missing:${transition}`);
  for (const transition of machine.transitions) if (!procedure.transitions.includes(transition)) errors.push(`invented:${transition}`);
  for (const prohibited of procedure.prohibitedTransitions) if (!machine.prohibitedTransitions.includes(prohibited)) errors.push(`unblocked:${prohibited}`);
  for (const branch of procedure.independentBranches) if (!machine.independentBranches.includes(branch)) errors.push(`collapsed:${branch}`);
  return { conforms: errors.length === 0, errors };
}

export function validateObservation(o) {
  const required = ["observationId", "observationContractVersion", "class", "result", "component", "subjectIdentity", "implementationVersion", "semanticMappingVersion", "observedAt", "clockSource", "secretRedactionStatus", "producer", "provenanceReferences", "knownGaps", "semanticDisclaimer"];
  return required.every(key => Object.hasOwn(o, key)) && o.semanticDisclaimer === disclaimer;
}
