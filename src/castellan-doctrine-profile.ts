import { createArtifact } from "./artifact.js";
import { ENACTED_CORE_DOCTRINE_V5 } from "./enacted-core-doctrine-v5.js";
import { OfficeDoctrineProfileAdmissionDecision, OfficeDoctrineProfileContract, OfficeDoctrineProfileDraft, OfficeDoctrineProfileJudgment } from "./office-doctrine-profile.js";

export const CASTELLAN_PROFILE_DECISION_REF = "DR-084";
export const CASTELLAN_PROFILE_AUTHORITY_REF = "DR-073#office-profile-admission";
export const CASTELLAN_PROFILE_EFFECTIVE_AT = "2026-08-02T15:00:00.000Z";
const doctrineRef = ENACTED_CORE_DOCTRINE_V5.doctrine.identity + "@5";
const contract = new OfficeDoctrineProfileContract(doctrineRef, ENACTED_CORE_DOCTRINE_V5.doctrine.payload.lexiconRef);

export const CASTELLAN_PROFILE_DRAFT: OfficeDoctrineProfileDraft = {
  officeId: "Castellan", arena: "CITADEL", title: "Castellan Office Doctrine Profile v1",
  purpose: "Govern internal mission formation by evaluating exact Secretariat Mission Dossiers, issuing exact clarification inquiries, and producing candidate Mission Specifications without research or external action.",
  issuerAuthorityRef: CASTELLAN_PROFILE_AUTHORITY_REF,
  applications: ENACTED_CORE_DOCTRINE_V5.doctrine.payload.provisions.map((provision) => ({
    provisionId: provision.provisionId, applicability: "APPLIES" as const,
    applicationRule: `Apply ${provision.provisionId} literally to Castellan mission formation; preserve authority, evidence, uncertainty, lineage, and institutional boundaries.`,
    verificationMethod: `Pressure-test Castellan inputs, outputs, refusals, and prohibited capabilities against ${provision.provisionId}.`,
    evidenceRequirements: ["tests/castellan-reconstruction.test.ts"],
    invalidationConditions: [`A Castellan path violates ${provision.provisionId}, changes governed meaning, or exceeds internal mission formation.`],
  })),
  domainStandardRefs: ["castellan-mission-formation-standard@1"],
  prohibitedInterpretations: [
    "Operator intent is already a Mission Specification.",
    "Castellan may research, deploy, supervise, execute, judge, or create external-action authority.",
    "A supplied claim, assertion, assumption, or answer is verified fact.",
    "Castellan may bypass Secretariat when asking the Operator for clarification.",
  ],
  profileRevisionConditions: ["Core Doctrine or Castellan jurisdiction changes.", "Mission Dossier or Mission Specification contracts change.", "Pressure testing reveals a material authority, semantic, or lineage defect."],
  terminologyGateEvidenceRefs: ["tests/castellan-reconstruction.test.ts"],
};

export const CASTELLAN_PROFILE_CANDIDATE = contract.draft(ENACTED_CORE_DOCTRINE_V5.doctrine, CASTELLAN_PROFILE_DRAFT, "castellan-profile-001", { identityFactory: (p) => p + "-castellan", now: () => CASTELLAN_PROFILE_EFFECTIVE_AT });
export const CASTELLAN_PROFILE_JUDGMENT = createArtifact<OfficeDoctrineProfileJudgment>("OfficeDoctrineProfileJudgment", "Tribunalis", CASTELLAN_PROFILE_CANDIDATE.correlationId, { profileCandidateRef: CASTELLAN_PROFILE_CANDIDATE.identity + "@1", coreDoctrineRef: doctrineRef, result: "ACCEPTABLE", mandatoryConditions: [], conditionSatisfaction: [], findingRefs: ["tests/castellan-reconstruction.test.ts"] }, [CASTELLAN_PROFILE_CANDIDATE.identity + "@1", doctrineRef], { identityFactory: (p) => p + "-castellan", now: () => CASTELLAN_PROFILE_EFFECTIVE_AT });
export const CASTELLAN_PROFILE_ADMISSION_DECISION = createArtifact<OfficeDoctrineProfileAdmissionDecision>("OfficeDoctrineProfileAdmissionDecision", "Senator:" + CASTELLAN_PROFILE_CANDIDATE.payload.assignedSenatorId, CASTELLAN_PROFILE_CANDIDATE.correlationId, { profileCandidateRef: CASTELLAN_PROFILE_CANDIDATE.identity + "@1", conformanceJudgmentRef: CASTELLAN_PROFILE_JUDGMENT.identity + "@1", admissionAuthorityRef: CASTELLAN_PROFILE_AUTHORITY_REF, authorityFindingRef: CASTELLAN_PROFILE_DECISION_REF + "#authority-effective", disposition: "ADMIT" }, [CASTELLAN_PROFILE_CANDIDATE.identity + "@1", CASTELLAN_PROFILE_JUDGMENT.identity + "@1", CASTELLAN_PROFILE_AUTHORITY_REF, CASTELLAN_PROFILE_DECISION_REF + "#authority-effective"], { identityFactory: (p) => p + "-castellan", now: () => CASTELLAN_PROFILE_EFFECTIVE_AT });
export const ADMITTED_CASTELLAN_PROFILE = contract.admit(CASTELLAN_PROFILE_CANDIDATE, CASTELLAN_PROFILE_JUDGMENT, CASTELLAN_PROFILE_ADMISSION_DECISION);
