import { ArtifactContext, ArtifactEnvelope, createArtifact } from "./artifact.js";
import { CoreDoctrine } from "./senate.js";
import { assertArtifactEnvelope } from "./schema.js";

export type OfficeArena = "IMPERIUM" | "CITADEL" | "COLOSSEUM" | "SHARED";
export type ProvisionApplicability = "APPLIES" | "NOT_APPLICABLE";

export interface NonApplicabilityBasis {
  governingRuleRef: string;
  determinationAuthorityRef: string;
  evidenceRefs: string[];
  scope: string;
  expiresAt?: string;
  revisionConditions: string[];
}

export interface OfficeDoctrineApplication {
  provisionId: string;
  applicability: ProvisionApplicability;
  applicationRule: string;
  verificationMethod: string;
  evidenceRequirements: string[];
  invalidationConditions: string[];
  nonApplicabilityBasis?: NonApplicabilityBasis;
}

export interface OfficeDoctrineProfileDraft {
  officeId: string;
  arena: OfficeArena;
  title: string;
  purpose: string;
  issuerAuthorityRef: string;
  applications: OfficeDoctrineApplication[];
  domainStandardRefs: string[];
  prohibitedInterpretations: string[];
  profileRevisionConditions: string[];
  terminologyGateEvidenceRefs: string[];
}

export interface OfficeDoctrineProfile {
  officeId: string;
  arena: OfficeArena;
  title: string;
  purpose: string;
  coreDoctrineRef: string;
  lexiconRef: string;
  assignedSenatorId: string;
  issuerAuthorityRef: string;
  applications: OfficeDoctrineApplication[];
  domainStandardRefs: string[];
  prohibitedInterpretations: string[];
  profileRevisionConditions: string[];
  terminologyGateEvidenceRefs: string[];
  state: "CANDIDATE" | "ADMITTED";
  conformanceJudgmentRef?: string;
  admissionDecisionRef?: string;
}

export interface OfficeDoctrineProfileJudgment {
  profileCandidateRef: string;
  coreDoctrineRef: string;
  result: "ACCEPTABLE" | "ACCEPTABLE_WITH_CONDITIONS" | "NOT_ACCEPTABLE" | "UNRESOLVED";
  mandatoryConditions: string[];
  conditionSatisfaction: Array<{
    condition: string;
    evidenceRefs: string[];
  }>;
  findingRefs: string[];
}

export interface OfficeDoctrineProfileAdmissionDecision {
  profileCandidateRef: string;
  conformanceJudgmentRef?: string;
  conformanceEvidenceRefs?: string[];
  admissionAuthorityRef: string;
  authorityFindingRef: string;
  disposition: "ADMIT" | "DENY";
}

export class OfficeDoctrineProfileContract {
  constructor(readonly currentDoctrineRef: string, readonly currentLexiconRef: string) {
    if (!currentDoctrineRef.trim()) {
      throw new Error("current Core Doctrine reference is required");
    }
    if (!currentLexiconRef.trim()) throw new Error("current Imperium Lexicon reference is required");
  }

  draft(
    doctrine: ArtifactEnvelope<CoreDoctrine>,
    draft: OfficeDoctrineProfileDraft,
    correlationId: string,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<OfficeDoctrineProfile> {
    assertCurrentDoctrine(doctrine, this.currentDoctrineRef);
    if (doctrine.payload.lexiconRef !== this.currentLexiconRef) throw new Error("Office profile doctrine does not match the current Imperium Lexicon pointer");
    validateDraft(doctrine, draft);
    const doctrineRef = doctrine.identity + "@" + doctrine.version;
    return createArtifact(
      "OfficeDoctrineProfile",
      draft.officeId.trim(),
      correlationId,
      {
        officeId: draft.officeId.trim(),
        arena: draft.arena,
        title: draft.title.trim(),
        purpose: draft.purpose.trim(),
        coreDoctrineRef: doctrineRef,
        lexiconRef: doctrine.payload.lexiconRef,
        assignedSenatorId: doctrine.payload.assignedSenatorId,
        issuerAuthorityRef: draft.issuerAuthorityRef.trim(),
        applications: normalizeApplications(draft.applications),
        domainStandardRefs: uniqueSorted(draft.domainStandardRefs),
        prohibitedInterpretations: uniqueSorted(draft.prohibitedInterpretations),
        profileRevisionConditions: uniqueSorted(draft.profileRevisionConditions),
        terminologyGateEvidenceRefs: uniqueSorted(draft.terminologyGateEvidenceRefs),
        state: "CANDIDATE",
      },
      [doctrineRef, draft.issuerAuthorityRef, ...draft.domainStandardRefs, ...draft.terminologyGateEvidenceRefs],
      context,
    );
  }

  revise(
    current: ArtifactEnvelope<OfficeDoctrineProfile>,
    doctrine: ArtifactEnvelope<CoreDoctrine>,
    draft: OfficeDoctrineProfileDraft,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<OfficeDoctrineProfile> {
    assertArtifactEnvelope(current);
    if (current.artifactType !== "OfficeDoctrineProfile") {
      throw new Error("only an Office Doctrine Profile may be revised");
    }
    if (current.status !== "CURRENT") {
      throw new Error("only a current Office Doctrine Profile may be revised");
    }
    if (current.payload.officeId !== draft.officeId.trim()) {
      throw new Error("profile revision may not change Office identity");
    }
    const candidate = this.draft(
      doctrine,
      draft,
      current.correlationId,
      context,
    );
    const currentRef = current.identity + "@" + current.version;
    return {
      ...candidate,
      identity: current.identity,
      version: current.version + 1,
      supersedes: currentRef,
      sourceRefs: [currentRef, ...candidate.sourceRefs],
    };
  }

  admit(
    candidate: ArtifactEnvelope<OfficeDoctrineProfile>,
    judgment: ArtifactEnvelope<OfficeDoctrineProfileJudgment>,
    decision: ArtifactEnvelope<OfficeDoctrineProfileAdmissionDecision>,
  ): ArtifactEnvelope<OfficeDoctrineProfile> {
    assertArtifactEnvelope(candidate);
    assertArtifactEnvelope(judgment);
    assertArtifactEnvelope(decision);
    if (candidate.artifactType !== "OfficeDoctrineProfile" || candidate.payload.state !== "CANDIDATE") {
      throw new Error("admission requires a candidate Office Doctrine Profile");
    }
    const candidateRef = candidate.identity + "@" + candidate.version;
    const judgmentRef = judgment.identity + "@" + judgment.version;
    if (judgment.artifactType !== "OfficeDoctrineProfileJudgment" || judgment.producer !== "Tribunalis") {
      throw new Error("profile conformance requires a Tribunalis judgment");
    }
    if (judgment.payload.profileCandidateRef !== candidateRef || judgment.payload.coreDoctrineRef !== candidate.payload.coreDoctrineRef) {
      throw new Error("judgment does not match candidate and doctrine");
    }
    const acceptable = judgment.payload.result === "ACCEPTABLE" || judgment.payload.result === "ACCEPTABLE_WITH_CONDITIONS";
    if (!acceptable) throw new Error("profile judgment is not acceptable");
    if (judgment.payload.findingRefs.length === 0) {
      throw new Error("profile judgment requires finding evidence");
    }
    if (judgment.payload.result === "ACCEPTABLE_WITH_CONDITIONS") {
      const conditions = uniqueSorted(judgment.payload.mandatoryConditions);
      const satisfied = uniqueSorted(
        judgment.payload.conditionSatisfaction
          .filter((item) => item.evidenceRefs.length > 0)
          .map((item) => item.condition),
      );
      if (conditions.join("|") !== satisfied.join("|")) {
        throw new Error("every mandatory judgment condition requires exact satisfaction evidence");
      }
    }
    if (decision.artifactType !== "OfficeDoctrineProfileAdmissionDecision") {
      throw new Error("profile admission decision artifact is required");
    }
    if (decision.producer !== "Senator:" + candidate.payload.assignedSenatorId) {
      throw new Error("only the doctrine-assigned Senator may admit the profile");
    }
    if (decision.payload.profileCandidateRef !== candidateRef || decision.payload.conformanceJudgmentRef !== judgmentRef) {
      throw new Error("admission decision does not match candidate and judgment");
    }
    if (
      !decision.payload.admissionAuthorityRef.trim() ||
      !decision.payload.authorityFindingRef.trim() ||
      !decision.sourceRefs.includes(decision.payload.admissionAuthorityRef) ||
      !decision.sourceRefs.includes(decision.payload.authorityFindingRef) ||
      decision.payload.disposition !== "ADMIT"
    ) {
      throw new Error("effective profile admission authority is required");
    }
    const admittedVersion = candidate.version + 1;
    return {
      ...candidate,
      version: admittedVersion,
      supersedes: candidateRef,
      payload: {
        ...candidate.payload,
        state: "ADMITTED",
        conformanceJudgmentRef: judgmentRef,
        admissionDecisionRef: decision.identity + "@" + decision.version,
      },
      sourceRefs: uniqueSorted([
        ...candidate.sourceRefs,
        judgmentRef,
        decision.identity + "@" + decision.version,
        decision.payload.admissionAuthorityRef,
        decision.payload.authorityFindingRef,
      ]),
    };
  }

  admitByAssignedSenator(
    candidate: ArtifactEnvelope<OfficeDoctrineProfile>,
    decision: ArtifactEnvelope<OfficeDoctrineProfileAdmissionDecision>,
  ): ArtifactEnvelope<OfficeDoctrineProfile> {
    assertArtifactEnvelope(candidate);
    assertArtifactEnvelope(decision);
    if (candidate.artifactType !== "OfficeDoctrineProfile" || candidate.payload.state !== "CANDIDATE") throw new Error("admission requires a candidate Office Doctrine Profile");
    const candidateRef = candidate.identity + "@" + candidate.version;
    if (decision.artifactType !== "OfficeDoctrineProfileAdmissionDecision" || decision.producer !== "Senator:" + candidate.payload.assignedSenatorId) throw new Error("only the doctrine-assigned Senator may admit the profile");
    if (decision.payload.profileCandidateRef !== candidateRef || decision.payload.conformanceJudgmentRef) throw new Error("Senator-only admission must match the candidate and may not cite a judgment");
    const evidenceRefs = uniqueSorted(decision.payload.conformanceEvidenceRefs ?? []);
    if (!evidenceRefs.length || evidenceRefs.some((item) => !decision.sourceRefs.includes(item))) throw new Error("Senator-only admission requires exact conformance evidence lineage");
    if (!decision.payload.admissionAuthorityRef.trim() || !decision.payload.authorityFindingRef.trim() || !decision.sourceRefs.includes(decision.payload.admissionAuthorityRef) || !decision.sourceRefs.includes(decision.payload.authorityFindingRef) || decision.payload.disposition !== "ADMIT") throw new Error("effective profile admission authority is required");
    return {
      ...candidate,
      version: candidate.version + 1,
      supersedes: candidateRef,
      payload: { ...candidate.payload, state: "ADMITTED", admissionDecisionRef: decision.identity + "@" + decision.version },
      sourceRefs: uniqueSorted([...candidate.sourceRefs, ...decision.sourceRefs, decision.identity + "@" + decision.version]),
    };
  }
}

function assertCurrentDoctrine(
  doctrine: ArtifactEnvelope<CoreDoctrine>,
  currentDoctrineRef: string,
): void {
  assertArtifactEnvelope(doctrine);
  if (doctrine.artifactType !== "CoreDoctrine" || doctrine.producer !== "Senate" || doctrine.status !== "CURRENT" || doctrine.payload.state !== "ENACTED") {
    throw new Error("Office profile requires current Senate-enacted Core Doctrine");
  }
  if (doctrine.identity + "@" + doctrine.version !== currentDoctrineRef) {
    throw new Error("Office profile doctrine does not match the current doctrine pointer");
  }
}

function validateDraft(
  doctrine: ArtifactEnvelope<CoreDoctrine>,
  draft: OfficeDoctrineProfileDraft,
): void {
  if (!draft.officeId.trim() || !draft.title.trim() || !draft.purpose.trim()) {
    throw new Error("Office identity, title, and purpose are required");
  }
  if (!draft.issuerAuthorityRef.trim()) {
    throw new Error("profile issuer authority is required");
  }
  if (draft.profileRevisionConditions.length === 0) {
    throw new Error("profile revision conditions are required");
  }
  if (draft.terminologyGateEvidenceRefs.length === 0) throw new Error("Office profile requires terminology-conformance gate evidence");
  const required = doctrine.payload.provisions.map((provision) => provision.provisionId).sort();
  const supplied = draft.applications.map((application) => application.provisionId.trim()).sort();
  if (new Set(supplied).size !== supplied.length) {
    throw new Error("duplicate Core Doctrine application");
  }
  if (required.join("|") !== supplied.join("|")) {
    throw new Error("profile must address every exact Core Doctrine provision");
  }
  for (const application of draft.applications) validateApplication(application);
}

function validateApplication(application: OfficeDoctrineApplication): void {
  if (!application.applicationRule.trim() || !application.verificationMethod.trim()) {
    throw new Error("complete provision application and verification are required");
  }
  if (application.evidenceRequirements.length === 0 || application.invalidationConditions.length === 0) {
    throw new Error("application evidence and invalidation conditions are required");
  }
  if (application.applicability === "NOT_APPLICABLE") {
    const basis = application.nonApplicabilityBasis;
    if (!basis || !basis.governingRuleRef.trim() || !basis.determinationAuthorityRef.trim() || !basis.scope.trim() || basis.evidenceRefs.length === 0 || basis.revisionConditions.length === 0) {
      throw new Error("NOT_APPLICABLE requires exact governing, authority, evidence, scope, and revision basis");
    }
  } else if (application.nonApplicabilityBasis) {
    throw new Error("APPLIES may not carry a non-applicability basis");
  }
}

function normalizeApplications(applications: OfficeDoctrineApplication[]): OfficeDoctrineApplication[] {
  return applications
    .map((application) => ({
      ...application,
      provisionId: application.provisionId.trim(),
      applicationRule: application.applicationRule.trim(),
      verificationMethod: application.verificationMethod.trim(),
      evidenceRequirements: uniqueSorted(application.evidenceRequirements),
      invalidationConditions: uniqueSorted(application.invalidationConditions),
    }))
    .sort((a, b) => a.provisionId.localeCompare(b.provisionId));
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort();
}
