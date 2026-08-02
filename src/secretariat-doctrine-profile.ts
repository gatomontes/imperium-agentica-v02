import { createArtifact } from "./artifact.js";
import { ENACTED_CORE_DOCTRINE_V4 } from "./enacted-core-doctrine-v4.js";
import {
  OfficeDoctrineProfileAdmissionDecision,
  OfficeDoctrineProfileContract,
  OfficeDoctrineProfileDraft,
  OfficeDoctrineProfileJudgment,
} from "./office-doctrine-profile.js";

export const SECRETARIAT_PROFILE_DECISION_REF = "DR-080";
export const SECRETARIAT_PROFILE_AUTHORITY_REF = "DR-073#office-profile-admission";
export const SECRETARIAT_PROFILE_STANDARD_REF = "secretariat-mission-intake-standard@1";
export const SECRETARIAT_PROFILE_EFFECTIVE_AT = "2026-08-02T10:00:00.000Z";

const doctrineRef = ENACTED_CORE_DOCTRINE_V4.doctrine.identity + "@" + ENACTED_CORE_DOCTRINE_V4.doctrine.version;
const contract = new OfficeDoctrineProfileContract(doctrineRef, ENACTED_CORE_DOCTRINE_V4.doctrine.payload.lexiconRef);

const rules: Record<string, [string, string, string, string]> = {
  "CORE-000": ["Use Core definitions literally when classifying intake state; an incomplete answer remains UNRESOLVED for the dependent handoff.", "Inspect every dossier state transition for an enacted predicate and explicit unresolved handling.", "mission-dossier state history", "A local synonym changes a Core-defined consequence."],
  "CORE-001": ["Record Operator authority assertions as assertions; Secretariat may perform only admitted intake and clarification actions and may not manufacture external-action authority.", "Verify every Secretariat action is intake, presentation, recording, or handoff and cites its governing profile.", "authenticated Operator reference and authority-assertion lineage", "Secretariat treats intent, access, or requested outcome as an authority grant."],
  "CORE-002": ["Preserve every parent authority reference and refuse dependent handling when a required parent is expired, withdrawn, invalidated, or superseded.", "Trace each effective authority prerequisite to its exact current parent.", "authority reference chain", "A derived reference widens or outlives its parent."],
  "CORE-003": ["Keep supplied claims, assumptions, unknowns, contradictions, uncertainty, and revision conditions distinct; Secretariat does not decide their truth.", "Compare raw intake and dossier claim records and inspect unresolved predicates.", "raw request and structured claim records", "A supplied claim is promoted to fact or an unsupported predicate decides readiness."],
  "CORE-004": ["Preserve supplied material without selecting or weighting it toward a desired mission conclusion.", "Diff raw supplied material against the dossier and inspect all presentation transformations.", "raw intake, attachment references, and transformation record", "Evidence is omitted, reweighted, or rewritten to favor an outcome."],
  "CORE-005": ["Every dossier, inquiry, presentation, answer, and handoff preserves exact source lineage.", "Traverse sourceRefs from each successor to the originating request and inquiry.", "complete artifact lineage", "Lineage is missing or repaired by content similarity."],
  "CORE-006": ["All governed dossier and inquiry updates are immutable successors with exact identity, version, and supersession.", "Attempt stale, mismatched, and cross-version updates and inspect refusal.", "identity/version/supersession record", "A mutable overwrite or implicit version substitution occurs."],
  "CORE-007": ["Mission Dossiers carry the Core minimum envelope plus exact doctrine and admitted Secretariat profile references, uncertainty, contradictions, and revision conditions.", "Validate every produced artifact against the envelope and Secretariat profile requirements.", "validated artifact envelope", "A required envelope field or justified applicability basis is absent."],
  "CORE-008": ["Secretariat owns Mission Dossier intake semantics but never rewrites Castellan inquiry meaning or claims stewardship over upstream artifacts.", "Compare inquiry input to customer-facing presentation and inspect ownership fields.", "semantic-preservation and stewardship evidence", "Consumption silently changes upstream meaning or lifecycle."],
  "CORE-009": ["Missing required intake or answers block only the dependent Castellan handoff and produce an explicit awaiting-operator or unresolved state.", "Exercise missing, blank, ambiguous, and stale prerequisites.", "fail-closed transition tests", "Uncertainty becomes success, total mission failure, or an unauthorized action."],
  "CORE-010": ["Secretariat may locally refuse use of defective inputs and report the basis; it may not authoritatively quarantine another steward's artifact.", "Inject defective upstream artifacts and inspect status and mutation behavior.", "local-containment refusal record", "Secretariat mutates upstream availability or calls containment quarantine."],
  "CORE-011": ["Secretariat performs customer-facing intake, presentation, recording, and handoff only; it does not legislate, judge, dispose, research, deploy, or execute.", "Inspect public methods and pressure-test prohibited power paths.", "bounded public API and negative tests", "Secretariat assumes another constitutional body's power."],
  "CORE-012": ["Secretariat records Tribunalis outputs when supplied but does not synthesize, average, score, or issue judgment.", "Inspect for judgment production or compensatory scoring paths.", "absence-of-judgment capability test", "Secretariat produces or alters chamber determinations or judgment."],
  "CORE-013": ["Secretariat does not turn judgment into operational disposition; it only communicates an authorized result or request.", "Trace any judgment-bearing input through presentation and handoff.", "judgment/disposition separation test", "Secretariat proceeds operationally because a judgment exists."],
  "CORE-014": ["Authenticated Operator intent opens bounded mission inquiry and records purpose, scope, constraints, acceptance criteria, and requested output without proving facts or authorizing external action.", "Inspect intake authentication, raw preservation, structured fields, and authority labels.", "Operator request and Mission Dossier", "Intent is treated as mission understanding, factual proof, standing authority, or external permission."],
  "CORE-015": ["Record external-obligation assertions and exact assessor references without deciding applicability or claiming conformity.", "Inspect obligation fields and attempt to obtain an applicability conclusion from Secretariat.", "external-obligation assertion lineage", "Secretariat determines law, regulation, contract, or duty applicability."],
  "CORE-016": ["Record asserted or determined recourse terms exactly; Secretariat may present them but cannot manufacture universal recourse.", "Inspect recourse records for independent source and applicability lineage.", "recourse source and applicability references", "A recourse right is inferred from Core Doctrine or customer friendliness."],
  "CORE-017": ["All claimed intake controls and conformance results state observable pass/fail evidence, limits, uncertainty, and invalidation conditions; synthetic evidence is labeled synthetic.", "Run declared acceptance and failure cases and inspect evidence labels.", "control pressure-test record", "Missing or synthetic evidence is represented as operational approval."],
  "CORE-018": ["Adopt doctrine changes only through the assigned Senator's propagation record and revalidate this profile and implementation independently.", "Match doctrine, propagation, profile, judgment, admission, and implementation evidence references.", "Senator propagation and Office conformance record", "Secretariat self-legislates, self-admits, or relies on another arena's conformance."],
};

export const SECRETARIAT_PROFILE_DRAFT: OfficeDoctrineProfileDraft = {
  officeId: "Secretariat",
  arena: "CITADEL",
  title: "Secretariat Office Doctrine Profile v1",
  purpose: "Govern Operator-facing mission intake, Castellan inquiry presentation, answer recording, and exact handoff without mission formation or operational authority.",
  issuerAuthorityRef: SECRETARIAT_PROFILE_AUTHORITY_REF,
  applications: ENACTED_CORE_DOCTRINE_V4.doctrine.payload.provisions.map((provision) => {
    const [applicationRule, verificationMethod, evidence, invalidation] = rules[provision.provisionId];
    return {
      provisionId: provision.provisionId,
      applicability: "APPLIES" as const,
      applicationRule,
      verificationMethod,
      evidenceRequirements: [evidence],
      invalidationConditions: [invalidation],
    };
  }),
  domainStandardRefs: [SECRETARIAT_PROFILE_STANDARD_REF],
  prohibitedInterpretations: [
    "Customer-friendly presentation permits semantic alteration.",
    "Operator intent proves facts or authorizes external action.",
    "Secretariat may determine mission sufficiency for Castellan.",
    "Secretariat may research, judge, deploy, supervise, or execute.",
  ],
  profileRevisionConditions: [
    "Core Doctrine or DR-073 changes.",
    "Secretariat jurisdiction, intake schema, or Castellan handoff changes.",
    "A pressure test reveals a material semantic, authority, or lineage defect.",
  ],
};

export const SECRETARIAT_PROFILE_CANDIDATE = contract.draft(
  ENACTED_CORE_DOCTRINE_V4.doctrine,
  SECRETARIAT_PROFILE_DRAFT,
  "secretariat-profile-001",
  { identityFactory: (prefix) => prefix + "-secretariat", now: () => SECRETARIAT_PROFILE_EFFECTIVE_AT },
);

export const SECRETARIAT_PROFILE_JUDGMENT = createArtifact<OfficeDoctrineProfileJudgment>(
  "OfficeDoctrineProfileJudgment",
  "Tribunalis",
  SECRETARIAT_PROFILE_CANDIDATE.correlationId,
  {
    profileCandidateRef: SECRETARIAT_PROFILE_CANDIDATE.identity + "@1",
    coreDoctrineRef: doctrineRef,
    result: "ACCEPTABLE",
    mandatoryConditions: [],
    conditionSatisfaction: [],
    findingRefs: ["tests/doctrine/lexicon-enforcement-correction-review-001.md"],
  },
  [SECRETARIAT_PROFILE_CANDIDATE.identity + "@1", doctrineRef],
  { identityFactory: (prefix) => prefix + "-secretariat", now: () => SECRETARIAT_PROFILE_EFFECTIVE_AT },
);

export const SECRETARIAT_PROFILE_ADMISSION_DECISION = createArtifact<OfficeDoctrineProfileAdmissionDecision>(
  "OfficeDoctrineProfileAdmissionDecision",
  "Senator:" + SECRETARIAT_PROFILE_CANDIDATE.payload.assignedSenatorId,
  SECRETARIAT_PROFILE_CANDIDATE.correlationId,
  {
    profileCandidateRef: SECRETARIAT_PROFILE_CANDIDATE.identity + "@1",
    conformanceJudgmentRef: SECRETARIAT_PROFILE_JUDGMENT.identity + "@1",
    admissionAuthorityRef: SECRETARIAT_PROFILE_AUTHORITY_REF,
    authorityFindingRef: SECRETARIAT_PROFILE_DECISION_REF + "#authority-effective",
    disposition: "ADMIT",
  },
  [SECRETARIAT_PROFILE_CANDIDATE.identity + "@1", SECRETARIAT_PROFILE_JUDGMENT.identity + "@1", SECRETARIAT_PROFILE_AUTHORITY_REF, SECRETARIAT_PROFILE_DECISION_REF + "#authority-effective"],
  { identityFactory: (prefix) => prefix + "-secretariat", now: () => SECRETARIAT_PROFILE_EFFECTIVE_AT },
);

export const ADMITTED_SECRETARIAT_PROFILE = contract.admit(
  SECRETARIAT_PROFILE_CANDIDATE,
  SECRETARIAT_PROFILE_JUDGMENT,
  SECRETARIAT_PROFILE_ADMISSION_DECISION,
);
