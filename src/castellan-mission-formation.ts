import { ArtifactContext, ArtifactEnvelope, GovernedArtifactContext, GovernedArtifactEnvelope, createGovernedArtifact } from "./artifact.js";
import { ADMITTED_CASTELLAN_PROFILE } from "./castellan-doctrine-profile.js";
import { ENACTED_IMPERIUM_LEXICON_V3 } from "./imperium-lexicon-v3.js";
import { LexiconAuthority, TerminologyConformanceGate } from "./senate-lexicon.js";
import { CastellanInquiry, MissionDossier, MissionFormationPredicate, SecretariatDossierHandoff } from "./secretariat-mission-dossier.js";
import { assertArtifactEnvelope } from "./schema.js";

export interface MissionSpecificationCandidate {
  dossierRef: string;
  purpose: string;
  scope: string[];
  constraints: string[];
  acceptanceCriteria: string[];
  requestedOutputs: string[];
  suppliedClaims: string[];
  assumptions: string[];
  unknowns: string[];
  materialContradictions: string[];
  authorityAssertions: string[];
  externalObligationAssertions: string[];
  unresolvedPredicates: string[];
  resourceRequirements: string[];
  state: "CANDIDATE";
  authorityCreated: false;
}

export type CastellanEvaluation = GovernedArtifactEnvelope<CastellanInquiry> | GovernedArtifactEnvelope<MissionSpecificationCandidate>;
const profileRef = ADMITTED_CASTELLAN_PROFILE.identity + "@" + ADMITTED_CASTELLAN_PROFILE.version;
const doctrineRef = ADMITTED_CASTELLAN_PROFILE.payload.coreDoctrineRef;
const lexiconRef = ADMITTED_CASTELLAN_PROFILE.payload.lexiconRef;
const gate = new TerminologyConformanceGate(new LexiconAuthority(ENACTED_IMPERIUM_LEXICON_V3.lexicon, lexiconRef));
const predicates: Array<[MissionFormationPredicate, string, string]> = [
  ["purpose", "What precise outcome should this mission accomplish?", "Mission purpose is unresolved."],
  ["scope", "What is explicitly in scope and out of scope?", "Mission scope is unresolved."],
  ["constraints", "What constraints apply? If none, state that explicitly.", "Mission constraints have not been declared."],
  ["acceptance_criteria", "What observable conditions would count as success?", "Acceptance criteria are unresolved."],
  ["requested_outputs", "What exact outputs should the mission produce?", "Requested outputs are unresolved."],
];

export class CastellanMissionFormation {
  evaluate(dossier: GovernedArtifactEnvelope<MissionDossier>, handoff?: GovernedArtifactEnvelope<SecretariatDossierHandoff>, context: ArtifactContext = {}): CastellanEvaluation {
    assertDossier(dossier);
    const values = resolvedValues(dossier);
    const missing = predicates.filter(([predicate]) => !values[predicate]?.length);
    if (missing.length) {
      if (dossier.payload.state !== "AWAITING_CASTELLAN_INQUIRY" && dossier.payload.state !== "READY_FOR_CASTELLAN_EVALUATION") throw new Error("dossier is not available for Castellan evaluation");
      return this.inquire(dossier, missing, context);
    }
    assertHandoff(dossier, handoff);
    const governance = governed([["LEX-062", "mission_specification"], ["LEX-063", "mission_formation"], ["LEX-012", "castellan"], ["LEX-083", "candidate"]]);
    gate.assertGovernance(governance);
    const dossierRef = ref(dossier);
    return createGovernedArtifact<MissionSpecificationCandidate>("MissionSpecificationCandidate", "Castellan", dossier.correlationId, {
      dossierRef, purpose: values.purpose[0], scope: values.scope, constraints: values.constraints,
      acceptanceCriteria: values.acceptance_criteria, requestedOutputs: values.requested_outputs,
      suppliedClaims: [...dossier.payload.suppliedClaims], assumptions: [...dossier.payload.assumptions], unknowns: [...dossier.payload.unknowns],
      materialContradictions: [...dossier.payload.materialContradictions], authorityAssertions: [...dossier.payload.authorityAssertions],
      externalObligationAssertions: [...dossier.payload.externalObligationAssertions], unresolvedPredicates: [], resourceRequirements: [], state: "CANDIDATE", authorityCreated: false,
    }, governance, [dossierRef, ref(handoff!), doctrineRef, lexiconRef, profileRef], context);
  }

  private inquire(dossier: GovernedArtifactEnvelope<MissionDossier>, missing: typeof predicates, context: ArtifactContext): GovernedArtifactEnvelope<CastellanInquiry> {
    const governance = governed([["LEX-046", "inquiry"], ["LEX-063", "mission_formation"], ["LEX-012", "castellan"], ["LEX-009", "mission_dossier"]]);
    gate.assertGovernance(governance);
    const dossierRef = ref(dossier);
    return createGovernedArtifact<CastellanInquiry>("CastellanInquiry", "Castellan", dossier.correlationId, { dossierRef, questions: missing.map(([predicate, exactQuestion, rationale]) => ({ questionId: `mission_formation.${predicate}`, predicate, exactQuestion, rationale, answerRequired: true })) }, governance, [dossierRef, doctrineRef, lexiconRef, profileRef], context);
  }
}

function resolvedValues(dossier: GovernedArtifactEnvelope<MissionDossier>): Record<MissionFormationPredicate, string[]> {
  const answer = (predicate: MissionFormationPredicate) => dossier.payload.presentedQuestions.flatMap((q) => q.predicate === predicate ? dossier.payload.answers.filter((a) => a.questionId === q.questionId).map((a) => a.normalizedAnswer).filter(Boolean) : []);
  return { purpose: dossier.payload.purpose ? [dossier.payload.purpose] : answer("purpose"), scope: dossier.payload.scope.length ? dossier.payload.scope : answer("scope"), constraints: dossier.payload.constraints.length ? dossier.payload.constraints : answer("constraints"), acceptance_criteria: dossier.payload.acceptanceCriteria.length ? dossier.payload.acceptanceCriteria : answer("acceptance_criteria"), requested_outputs: dossier.payload.requestedOutputs.length ? dossier.payload.requestedOutputs : answer("requested_outputs") };
}

function assertDossier(dossier: GovernedArtifactEnvelope<MissionDossier>): void {
  assertArtifactEnvelope(dossier);
  if (dossier.artifactType !== "MissionDossier" || dossier.producer !== "Secretariat" || dossier.status !== "CURRENT") throw new Error("exact current Secretariat Mission Dossier is required");
  gate.assertGovernance(dossier.governance);
  if (dossier.payload.doctrineRef !== doctrineRef || dossier.payload.lexiconRef !== lexiconRef || dossier.governance.coreDoctrineRef !== doctrineRef) throw new Error("dossier doctrine or Lexicon is stale or mismatched");
}
function assertHandoff(dossier: GovernedArtifactEnvelope<MissionDossier>, handoff?: GovernedArtifactEnvelope<SecretariatDossierHandoff>): void {
  if (!handoff) throw new Error("exact Secretariat handoff is required before Mission Specification formation");
  assertArtifactEnvelope(handoff);
  if (handoff.artifactType !== "SecretariatDossierHandoff" || handoff.producer !== "Secretariat" || handoff.status !== "CURRENT" || handoff.correlationId !== dossier.correlationId || handoff.payload.dossierRef !== ref(dossier) || handoff.payload.recipient !== "Castellan" || handoff.payload.authorityCreated !== false) throw new Error("exact matching Secretariat handoff is required");
  gate.assertGovernance(handoff.governance);
}
function governed(uses: Array<[string, string]>): GovernedArtifactContext { return { coreDoctrineRef: doctrineRef, lexiconRef, officeProfileRef: profileRef, vocabularyUses: uses.map(([termId, value]) => ({ termId, value, lexiconRef })) }; }
function ref(value: ArtifactEnvelope<unknown>): string { return value.identity + "@" + value.version; }
