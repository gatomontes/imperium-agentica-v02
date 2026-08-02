import { createArtifact } from "./artifact.js";
import { ENACTED_CORE_DOCTRINE_V6 } from "./enacted-core-doctrine-v6.js";
import { OfficeDoctrineProfileAdmissionDecision, OfficeDoctrineProfileContract, OfficeDoctrineProfileDraft } from "./office-doctrine-profile.js";

export const CASTELLAN_PROFILE_DECISION_REF = "DR-092";
export const CASTELLAN_PROFILE_AUTHORITY_REF = "DR-073#office-profile-admission";
export const CASTELLAN_PROFILE_EFFECTIVE_AT = "2026-08-03T08:00:00.000Z";
const doctrineRef = ENACTED_CORE_DOCTRINE_V6.doctrine.identity + "@6";
const evidenceRef = "tests/castellan-reconstruction.test.ts";
const reviewRef = "reviews/castellan-blackquill-correction-review-001.md";
const contract = new OfficeDoctrineProfileContract(doctrineRef, ENACTED_CORE_DOCTRINE_V6.doctrine.payload.lexiconRef);

const applications: Record<string, [string, string, string]> = {
  "CORE-000": ["Classify every mission predicate using only enacted definitions and exact dispositions.", "Exercise every predicate and disposition transition.", "A local meaning changes a governed consequence."],
  "CORE-001": ["Treat Operator authority statements only as assertions and create no external authority.", "Attempt specification formation with asserted authority only.", "An assertion is promoted to authority."],
  "CORE-002": ["Refuse stale or mismatched doctrine, profile, dossier, handoff, and assessment parents.", "Substitute every exact parent reference.", "A dependent artifact outlives or widens a parent."],
  "CORE-003": ["Keep claims, assumptions, unknowns, contradictions, assessments, and conclusions distinct.", "Trace each category into inquiry and specification outcomes.", "Any category is silently promoted or erased."],
  "CORE-004": ["Preserve supplied material without selecting evidence toward a preferred mission.", "Diff dossier categories against the candidate.", "Supplied material is omitted or reweighted."],
  "CORE-005": ["Carry exact dossier, handoff, assessment, doctrine, Lexicon, and profile lineage.", "Traverse every output source reference.", "Lineage is inferred rather than exact."],
  "CORE-006": ["Consume only exact current immutable artifact versions.", "Inject stale and cross-version artifacts.", "A stale or mutable artifact is accepted."],
  "CORE-007": ["Emit complete governed envelopes for inquiry and candidate specification.", "Validate every required envelope field.", "A required envelope field is absent."],
  "CORE-008": ["Steward Mission Specification semantics without rewriting Secretariat-owned dossier history.", "Inspect ownership and mutation behavior.", "Castellan mutates or claims Secretariat artifacts."],
  "CORE-009": ["Block only dependent formation predicates and issue bounded follow-up inquiry.", "Exercise missing, ambiguous, contradictory, and unusable outcomes.", "Uncertainty becomes success or total failure."],
  "CORE-010": ["Refuse defective inputs locally without quarantining another Office's artifact.", "Inject defects and inspect upstream state.", "Castellan mutates upstream availability."],
  "CORE-011": ["Perform internal mission formation only; expose no research, judgment, deployment, supervision, or execution operation.", "Inspect the public runtime surface.", "Another institution's power appears."],
  "CORE-012": ["Do not produce or consume institutional judgment in Castellan profile admission or mission formation.", "Search exports, profile lineage, and runtime inputs for judgment dependencies.", "Institutional judgment becomes part of Castellan."],
  "CORE-013": ["Produce no operational disposition from a Mission Specification Candidate.", "Attempt to derive activation or deployment from candidate state.", "Candidate status triggers operation."],
  "CORE-014": ["Require Castellan inquiry even when Secretariat receives apparently complete intent.", "Submit a complete initial dossier and require inquiry.", "Structured intake is treated as understood mission."],
  "CORE-015": ["Preserve external-obligation assertions without deciding applicability.", "Trace assertions through the candidate.", "Castellan claims legal or contractual applicability."],
  "CORE-016": ["Preserve independently supplied recourse terms without inventing them.", "Inspect candidate and inquiry text for fabricated recourse.", "Castellan manufactures recourse."],
  "CORE-017": ["Require observable predicate-assessment evidence and label unresolved dispositions exactly.", "Run resolved and adverse assessment matrices.", "Presence or synthetic evidence is represented as semantic resolution."],
  "CORE-018": ["Adopt doctrine only through assigned-Senator profile propagation and exact revalidation evidence.", "Match doctrine, profile, decision, and evidence lineage.", "Castellan self-legislates or self-admits."],
};

export const CASTELLAN_PROFILE_DRAFT: OfficeDoctrineProfileDraft = {
  officeId: "Castellan", arena: "CITADEL", title: "Castellan Office Doctrine Profile v4",
  purpose: "Govern internal mission formation through mandatory intent inquiry, exact cognitive predicate assessment, bounded follow-up inquiry, and candidate Mission Specification production.",
  issuerAuthorityRef: CASTELLAN_PROFILE_AUTHORITY_REF,
  applications: ENACTED_CORE_DOCTRINE_V6.doctrine.payload.provisions.map((provision) => {
    const rule = applications[provision.provisionId];
    if (!rule) throw new Error("missing Castellan application for " + provision.provisionId);
    return { provisionId: provision.provisionId, applicability: "APPLIES" as const, applicationRule: rule[0], verificationMethod: rule[1], evidenceRequirements: [evidenceRef, reviewRef], invalidationConditions: [rule[2]] };
  }),
  domainStandardRefs: ["castellan-mission-formation-standard@2"],
  prohibitedInterpretations: ["Operator intent is already understood.", "A nonblank answer is semantically resolved.", "Castellan may research, judge, deploy, supervise, execute, or create authority.", "Unknowns or contradictions may be hidden by an empty unresolved list."],
  profileRevisionConditions: ["Core Doctrine or Castellan jurisdiction changes.", "Mission Dossier, predicate assessment, or Mission Specification contracts change.", "Pressure testing reveals a material defect."],
  terminologyGateEvidenceRefs: [evidenceRef],
};

export const CASTELLAN_PROFILE_CANDIDATE = contract.draft(ENACTED_CORE_DOCTRINE_V6.doctrine, CASTELLAN_PROFILE_DRAFT, "castellan-profile-004", { identityFactory: (p) => p + "-castellan-v4", now: () => CASTELLAN_PROFILE_EFFECTIVE_AT });
export const CASTELLAN_PROFILE_ADMISSION_DECISION = createArtifact<OfficeDoctrineProfileAdmissionDecision>("OfficeDoctrineProfileAdmissionDecision", "Senator:" + CASTELLAN_PROFILE_CANDIDATE.payload.assignedSenatorId, CASTELLAN_PROFILE_CANDIDATE.correlationId, { profileCandidateRef: CASTELLAN_PROFILE_CANDIDATE.identity + "@1", conformanceEvidenceRefs: [evidenceRef, reviewRef], admissionAuthorityRef: CASTELLAN_PROFILE_AUTHORITY_REF, authorityFindingRef: CASTELLAN_PROFILE_DECISION_REF + "#authority-effective", disposition: "ADMIT" }, [CASTELLAN_PROFILE_CANDIDATE.identity + "@1", evidenceRef, reviewRef, CASTELLAN_PROFILE_AUTHORITY_REF, CASTELLAN_PROFILE_DECISION_REF + "#authority-effective"], { identityFactory: (p) => p + "-castellan-v4", now: () => CASTELLAN_PROFILE_EFFECTIVE_AT });
export const ADMITTED_CASTELLAN_PROFILE = contract.admitByAssignedSenator(CASTELLAN_PROFILE_CANDIDATE, CASTELLAN_PROFILE_ADMISSION_DECISION);
