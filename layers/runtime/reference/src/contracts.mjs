export const Contracts = Object.freeze({
  realization: "layers/runtime/production/runtime-realization-and-dispatch-contract.md@RTB-001",
  observation: "layers/runtime/production/runtime-observation-envelope.md@RTB-001",
  controlPlane: "layers/runtime/production/runtime-control-plane-contract.md@RTB-002",
  maintenanceProcedure: "layers/procedure/production/runtime-maintenance-procedure.md@PRB-003",
  diagnosis: "layers/cognitive/production/runtime-operational-diagnosis.md@CB-CURRENT",
  disposition: "layers/cognitive/production/runtime-maintenance-disposition.md@CB-CURRENT",
  authority: "layers/authority/production/runtime-control-plane-authority-profile.md@AB-003",
  provenance: "layers/provenance/production/provenance-contract.md@PB-001",
});

export const DispositionForms = Object.freeze({
  NO_INTERVENTION: "NO_INTERVENTION",
  INSTRUCT: "INSTRUCT_MAINTENANCE",
  WITHHOLD: "WITHHOLD_MAINTENANCE",
  ESCALATE: "ESCALATE_STRUCTURAL_CONDITION",
});

export const EffectResults = Object.freeze({
  SUCCEEDED: "SUCCEEDED",
  FAILED: "FAILED",
  INDETERMINATE: "INDETERMINATE",
});

export const disclaimer =
  "Operational observation only; not a Cognitive, Authority, Provenance, Procedure, proof, completion, or mission finding.";

export function requireFields(value, fields, label) {
  const missing = fields.filter((field) => value?.[field] === undefined || value?.[field] === null || value?.[field] === "");
  if (missing.length) throw new Error(`${label}_MISSING:${missing.join(",")}`);
}

export function validateDisposition(disposition) {
  requireFields(disposition, [
    "id",
    "version",
    "form",
    "diagnosisId",
    "diagnosisVersion",
    "decisionMandateReference",
    "procedureReference",
    "environment",
    "component",
    "action",
    "scope",
  ], "DISPOSITION");
  if (disposition.contract !== Contracts.disposition) throw new Error("DISPOSITION_CONTRACT_MISMATCH");
  if (!Object.values(DispositionForms).includes(disposition.form)) throw new Error("DISPOSITION_FORM_UNKNOWN");
}

export function validatePlan(plan) {
  requireFields(plan, [
    "id",
    "version",
    "contract",
    "dispositionId",
    "dispositionVersion",
    "diagnosisId",
    "diagnosisVersion",
    "environment",
    "component",
    "action",
    "scope",
    "implementationVersion",
    "semanticMappingVersion",
    "authorityFindingReference",
    "correlationFindingReference",
    "procedureReference",
    "startCondition",
    "stopCondition",
    "abortCondition",
    "successCondition",
  ], "PLAN");
  if (plan.contract !== Contracts.controlPlane) throw new Error("PLAN_CONTRACT_MISMATCH");
}

export function validateObservation(observation) {
  const fields = [
    "observationId",
    "observationContract",
    "class",
    "result",
    "component",
    "subjectIdentity",
    "implementationVersion",
    "semanticMappingVersion",
    "observedAt",
    "clockSource",
    "secretRedactionStatus",
    "producer",
    "provenanceReferences",
    "knownGaps",
    "semanticDisclaimer",
  ];
  try {
    requireFields(observation, fields, "OBSERVATION");
  } catch {
    return false;
  }
  return observation.observationContract === Contracts.observation &&
    observation.semanticDisclaimer === disclaimer &&
    observation.secretRedactionStatus === "NO_SECRETS_RECORDED";
}
