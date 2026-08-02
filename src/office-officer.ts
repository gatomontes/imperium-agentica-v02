import { ArtifactContext, ArtifactEnvelope, GovernedArtifactEnvelope, createGovernedArtifact } from "./artifact.js";
import { OfficeDoctrineProfile } from "./office-doctrine-profile.js";
import { assertArtifactEnvelope } from "./schema.js";

export interface OfficerPersonaSpecification {
  officerId: string;
  displayName: string;
  officeId: string;
  officeProfileRef: string;
  doctrineRef: string;
  lexiconRef: string;
  role: "RESIDENT_OFFICER";
  cognition: string[];
  traits: string[];
  evidenceRules: string[];
  boundaries: string[];
  refusalConditions: string[];
  revisionConditions: string[];
  state: "CANDIDATE" | "ADMITTED";
  admissionDecisionRef?: string;
}

export interface OfficerPersonaAdmissionDecision {
  candidateRef: string;
  officeProfileRef: string;
  authorityRef: string;
  authorityFindingRef: string;
  conformanceEvidenceRefs: string[];
  disposition: "ADMIT" | "DENY";
}

export class OfficeOfficerContract {
  draft(profile: ArtifactEnvelope<OfficeDoctrineProfile>, draft: Omit<OfficerPersonaSpecification, "officeProfileRef" | "doctrineRef" | "lexiconRef" | "state">, correlationId: string, context: ArtifactContext = {}): GovernedArtifactEnvelope<OfficerPersonaSpecification> {
    assertArtifactEnvelope(profile);
    if (profile.artifactType !== "OfficeDoctrineProfile" || profile.status !== "CURRENT" || profile.payload.state !== "ADMITTED") throw new Error("current admitted Office Profile is required");
    if (profile.payload.officeId !== draft.officeId) throw new Error("Officer candidate must match its Office Profile");
    for (const list of [draft.cognition, draft.traits, draft.evidenceRules, draft.boundaries, draft.refusalConditions, draft.revisionConditions]) if (!list.length || list.some((item) => !item.trim())) throw new Error("complete Officer cognition, traits, evidence, boundaries, refusal, and revision rules are required");
    const profileRef = ref(profile);
    return createGovernedArtifact("OfficerPersonaSpecification", "Secretariat", correlationId, { ...draft, officeProfileRef: profileRef, doctrineRef: profile.payload.coreDoctrineRef, lexiconRef: profile.payload.lexiconRef, state: "CANDIDATE" }, { coreDoctrineRef: profile.payload.coreDoctrineRef, lexiconRef: profile.payload.lexiconRef, officeProfileRef: profileRef, vocabularyUses: [{ termId: "LEX-021", value: "persona", lexiconRef: profile.payload.lexiconRef }, { termId: "LEX-048", value: "agent", lexiconRef: profile.payload.lexiconRef }, { termId: "LEX-049", value: "officer", lexiconRef: profile.payload.lexiconRef }] }, [profileRef, profile.payload.coreDoctrineRef, profile.payload.lexiconRef], context);
  }

  admit(candidate: ArtifactEnvelope<OfficerPersonaSpecification>, decision: ArtifactEnvelope<OfficerPersonaAdmissionDecision>): ArtifactEnvelope<OfficerPersonaSpecification> {
    assertArtifactEnvelope(candidate); assertArtifactEnvelope(decision);
    if (candidate.artifactType !== "OfficerPersonaSpecification" || candidate.status !== "CURRENT" || candidate.payload.state !== "CANDIDATE") throw new Error("exact current Officer Persona candidate is required");
    if (decision.artifactType !== "OfficerPersonaAdmissionDecision" || decision.producer !== "Imperator") throw new Error("Imperator Officer admission decision is required");
    if (decision.payload.candidateRef !== ref(candidate) || decision.payload.officeProfileRef !== candidate.payload.officeProfileRef || decision.payload.disposition !== "ADMIT") throw new Error("Officer admission decision does not match candidate and Office");
    if (!decision.payload.authorityRef.trim() || !decision.payload.authorityFindingRef.trim() || !decision.sourceRefs.includes(decision.payload.authorityRef) || !decision.sourceRefs.includes(decision.payload.authorityFindingRef)) throw new Error("exact Officer admission authority is required");
    if (!decision.payload.conformanceEvidenceRefs.length || decision.payload.conformanceEvidenceRefs.some((item) => !decision.sourceRefs.includes(item))) throw new Error("exact Officer conformance evidence is required");
    return { ...candidate, version: candidate.version + 1, supersedes: ref(candidate), payload: { ...candidate.payload, state: "ADMITTED", admissionDecisionRef: ref(decision) }, sourceRefs: unique([...candidate.sourceRefs, ...decision.sourceRefs, ref(decision)]) };
  }
}

function ref(artifact: ArtifactEnvelope<unknown>): string { return artifact.identity + "@" + artifact.version; }
function unique(values: string[]): string[] { return [...new Set(values)].sort(); }
