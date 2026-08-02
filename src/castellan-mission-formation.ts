import { ArtifactContext, ArtifactEnvelope, GovernedArtifactContext, GovernedArtifactEnvelope, createGovernedArtifact } from "./artifact.js";
import { ADMITTED_CASTELLAN_PROFILE } from "./castellan-doctrine-profile.js";
import { ENACTED_IMPERIUM_LEXICON_V4 } from "./imperium-lexicon-v4.js";
import { ADMITTED_RECTOR } from "./rector-officer-profile.js";
import { ADMITTED_SECRETARIAT_PROFILE } from "./secretariat-doctrine-profile.js";
import { LexiconAuthority, TerminologyConformanceGate } from "./senate-lexicon.js";
import { CastellanInquiry, MissionDossier, MissionFormationPredicate, SecretariatDossierHandoff } from "./secretariat-mission-dossier.js";
import { assertArtifactEnvelope } from "./schema.js";

export type PredicateDisposition = "RESOLVED" | "DECLARED_NONE" | "AMBIGUOUS" | "CONTRADICTORY" | "UNUSABLE";
export interface PredicateDetermination { questionId: string; predicate: MissionFormationPredicate; disposition: PredicateDisposition; values: string[]; rationale: string; }
export interface CastellanPredicateAssessment { dossierRef: string; handoffRef: string; rectorInterpretationRef: string; determinations: PredicateDetermination[]; }
export interface RectorPredicateInterpretationContract { officerPersonaRef: string; dossierRef: string; handoffRef: string; determinations: PredicateDetermination[]; researchPerformed: false; judgmentRendered: false; authorityCreated: false; }
export interface MissionSpecificationCandidate {
  dossierRef: string; predicateAssessmentRef: string; purpose: string; scope: string[]; constraints: string[]; acceptanceCriteria: string[]; requestedOutputs: string[];
  suppliedClaims: string[]; assumptions: string[]; unknowns: string[]; materialContradictions: string[]; resolutionNotes: string[];
  authorityAssertions: string[]; externalObligationAssertions: string[]; unresolvedPredicates: string[]; resourceRequirements: string[];
  state: "CANDIDATE"; authorityCreated: false;
}
export type CastellanEvaluation = GovernedArtifactEnvelope<CastellanInquiry> | GovernedArtifactEnvelope<MissionSpecificationCandidate>;

const profileRef = ADMITTED_CASTELLAN_PROFILE.identity + "@" + ADMITTED_CASTELLAN_PROFILE.version;
const rectorRef = ADMITTED_RECTOR.identity + "@" + ADMITTED_RECTOR.version;
const secretariatProfileRef = ADMITTED_SECRETARIAT_PROFILE.identity + "@" + ADMITTED_SECRETARIAT_PROFILE.version;
const doctrineRef = ADMITTED_CASTELLAN_PROFILE.payload.coreDoctrineRef;
const lexiconRef = ADMITTED_CASTELLAN_PROFILE.payload.lexiconRef;
const gate = new TerminologyConformanceGate(new LexiconAuthority(ENACTED_IMPERIUM_LEXICON_V4.lexicon, lexiconRef));
const predicateQuestions: Record<MissionFormationPredicate, [string, string]> = {
  purpose: ["What precise outcome should this mission accomplish?", "Castellan must establish the Operator's intended purpose."],
  scope: ["What is explicitly in scope and out of scope?", "Mission scope requires explicit inclusion and exclusion boundaries."],
  constraints: ["What constraints apply? If none, state that explicitly.", "Constraints require an explicit declaration."],
  acceptance_criteria: ["What observable conditions would count as success?", "Mission success requires testable acceptance criteria."],
  requested_outputs: ["What exact outputs should the mission produce?", "Requested outputs require exact definition."],
  unknowns: ["What material facts remain unknown? If none, state that explicitly.", "Material unknowns must be exposed or explicitly cleared."],
  material_contradictions: ["What contradictions or incompatible requirements remain? If none, state that explicitly.", "Material contradictions must be resolved or explicitly cleared."],
  resource_requirements: ["What people, capabilities, tools, data, access, time, or budget might the mission require? If none, state that explicitly.", "Resource requirements may not be silently invented or omitted."],
};
const allPredicates = Object.keys(predicateQuestions) as MissionFormationPredicate[];
const noneAllowed = new Set<MissionFormationPredicate>(["constraints", "unknowns", "material_contradictions", "resource_requirements"]);

export class CastellanOperatingLayer {
  recordAssessment(dossier: GovernedArtifactEnvelope<MissionDossier>, handoff: GovernedArtifactEnvelope<SecretariatDossierHandoff>, interpretation: GovernedArtifactEnvelope<RectorPredicateInterpretationContract>, context: ArtifactContext = {}): GovernedArtifactEnvelope<CastellanPredicateAssessment> {
    assertDossier(dossier); assertHandoff(dossier, handoff); assertRectorInterpretation(dossier, handoff, interpretation); validateDeterminations(dossier, interpretation.payload.determinations);
    const governance = governed([["LEX-060", "cognitive_process"], ["LEX-063", "mission_formation"], ["LEX-012", "castellan"]]); gate.assertGovernance(governance);
    return createGovernedArtifact("CastellanPredicateAssessment", "CastellanOperatingLayer", dossier.correlationId, { dossierRef: ref(dossier), handoffRef: ref(handoff), rectorInterpretationRef: ref(interpretation), determinations: interpretation.payload.determinations.map((item) => ({ ...item, values: clean(item.values), rationale: item.rationale.trim() })) }, governance, [ref(dossier), ref(handoff), ref(interpretation), dossier.payload.inquiryRef!, rectorRef, doctrineRef, lexiconRef, profileRef], context);
  }
}

export class CastellanMissionFormation {
  evaluate(dossier: GovernedArtifactEnvelope<MissionDossier>, handoff?: GovernedArtifactEnvelope<SecretariatDossierHandoff>, assessment?: GovernedArtifactEnvelope<CastellanPredicateAssessment>, context: ArtifactContext = {}): CastellanEvaluation {
    assertDossier(dossier);
    if (!dossier.payload.inquiryRef || dossier.payload.presentedQuestions.length === 0) return inquire(dossier, [], context);
    assertHandoff(dossier, handoff); assertAssessment(dossier, handoff!, assessment);
    const adverse = assessment!.payload.determinations.filter((item) => item.disposition === "AMBIGUOUS" || item.disposition === "CONTRADICTORY" || item.disposition === "UNUSABLE" || (item.disposition === "DECLARED_NONE" && !noneAllowed.has(item.predicate)));
    const uncleared = assessment!.payload.determinations.filter((item) => (item.predicate === "unknowns" || item.predicate === "material_contradictions") && item.disposition !== "DECLARED_NONE");
    if (adverse.length || uncleared.length) return inquire(dossier, [...new Set([...adverse, ...uncleared].map((item) => item.predicate))], context);
    const byPredicate = new Map(assessment!.payload.determinations.map((item) => [item.predicate, item]));
    const values = (predicate: MissionFormationPredicate) => byPredicate.get(predicate)!.disposition === "DECLARED_NONE" ? [] : clean(byPredicate.get(predicate)!.values);
    const governance = governed([["LEX-062", "mission_specification"], ["LEX-063", "mission_formation"], ["LEX-012", "castellan"], ["LEX-083", "candidate"]]); gate.assertGovernance(governance);
    return createGovernedArtifact<MissionSpecificationCandidate>("MissionSpecificationCandidate", "Castellan", dossier.correlationId, {
      dossierRef: ref(dossier), predicateAssessmentRef: ref(assessment!), purpose: values("purpose")[0], scope: values("scope"), constraints: values("constraints"), acceptanceCriteria: values("acceptance_criteria"), requestedOutputs: values("requested_outputs"),
      suppliedClaims: [...dossier.payload.suppliedClaims], assumptions: [...dossier.payload.assumptions], unknowns: [], materialContradictions: [],
      resolutionNotes: assessment!.payload.determinations.filter((item) => item.predicate === "unknowns" || item.predicate === "material_contradictions").map((item) => `${item.predicate}: ${item.rationale}`),
      authorityAssertions: [...dossier.payload.authorityAssertions], externalObligationAssertions: [...dossier.payload.externalObligationAssertions], unresolvedPredicates: [], resourceRequirements: values("resource_requirements"), state: "CANDIDATE", authorityCreated: false,
    }, governance, [ref(dossier), ref(handoff!), ref(assessment!), doctrineRef, lexiconRef, profileRef], context);
  }
}

function inquire(dossier: GovernedArtifactEnvelope<MissionDossier>, adverse: MissionFormationPredicate[], context: ArtifactContext): GovernedArtifactEnvelope<CastellanInquiry> {
  if (dossier.payload.state !== "AWAITING_CASTELLAN_INQUIRY" && dossier.payload.state !== "READY_FOR_CASTELLAN_EVALUATION") throw new Error("dossier is not available for Castellan inquiry");
  const governance = governed([["LEX-046", "inquiry"], ["LEX-063", "mission_formation"], ["LEX-012", "castellan"], ["LEX-009", "mission_dossier"]]); gate.assertGovernance(governance);
  return createGovernedArtifact("CastellanInquiry", "Castellan", dossier.correlationId, { dossierRef: ref(dossier), questions: allPredicates.map((predicate) => ({ questionId: `mission_formation.${predicate}.${dossier.version}`, predicate, exactQuestion: adverse.includes(predicate) ? `Your previous answer was not usable as a final determination. ${predicateQuestions[predicate][0]}` : predicateQuestions[predicate][0], rationale: adverse.includes(predicate) ? `Further clarification is required for ${predicate}.` : predicateQuestions[predicate][1], answerRequired: true })) }, governance, [ref(dossier), doctrineRef, lexiconRef, profileRef], context);
}
function validateDeterminations(dossier: GovernedArtifactEnvelope<MissionDossier>, determinations: PredicateDetermination[]): void {
  const questions = new Map(dossier.payload.presentedQuestions.map((item) => [item.questionId, item])); const answers = new Set(dossier.payload.answers.filter((item) => item.normalizedAnswer).map((item) => item.questionId));
  if (determinations.length !== allPredicates.length || new Set(determinations.map((item) => item.predicate)).size !== allPredicates.length) throw new Error("assessment requires exactly one determination for every mission predicate");
  for (const item of determinations) { const question = questions.get(item.questionId); if (!question || question.predicate !== item.predicate || !answers.has(item.questionId)) throw new Error("determination requires an exact answered question"); if (!item.rationale.trim()) throw new Error("determination rationale is required"); if (item.disposition === "DECLARED_NONE" && item.values.length) throw new Error("DECLARED_NONE may not carry values"); if (item.disposition === "RESOLVED" && clean(item.values).length === 0) throw new Error("RESOLVED requires exact values"); }
}
function assertDossier(dossier: GovernedArtifactEnvelope<MissionDossier>): void { assertArtifactEnvelope(dossier); if (dossier.artifactType !== "MissionDossier" || dossier.producer !== "Secretariat" || dossier.status !== "CURRENT") throw new Error("exact current Secretariat Mission Dossier is required"); gate.assertGovernance(dossier.governance); if (dossier.payload.doctrineRef !== doctrineRef || dossier.payload.lexiconRef !== lexiconRef || dossier.payload.officeProfileRef !== secretariatProfileRef || dossier.governance.coreDoctrineRef !== doctrineRef || dossier.governance.lexiconRef !== lexiconRef || dossier.governance.officeProfileRef !== secretariatProfileRef) throw new Error("dossier doctrine, Lexicon, or Secretariat profile is stale or mismatched"); }
function assertHandoff(dossier: GovernedArtifactEnvelope<MissionDossier>, handoff?: GovernedArtifactEnvelope<SecretariatDossierHandoff>): void { if (!handoff) throw new Error("exact Secretariat handoff is required before answer assessment"); assertArtifactEnvelope(handoff); if (dossier.payload.state !== "READY_FOR_CASTELLAN_EVALUATION" || handoff.artifactType !== "SecretariatDossierHandoff" || handoff.producer !== "Secretariat" || handoff.status !== "CURRENT" || handoff.correlationId !== dossier.correlationId || handoff.payload.dossierRef !== ref(dossier) || handoff.payload.recipient !== "Castellan" || handoff.payload.authorityCreated !== false || handoff.governance.officeProfileRef !== secretariatProfileRef) throw new Error("exact matching Secretariat handoff is required"); gate.assertGovernance(handoff.governance); }
function assertAssessment(dossier: GovernedArtifactEnvelope<MissionDossier>, handoff: GovernedArtifactEnvelope<SecretariatDossierHandoff>, assessment?: GovernedArtifactEnvelope<CastellanPredicateAssessment>): void { if (!assessment) throw new Error("exact Castellan predicate assessment is required"); assertArtifactEnvelope(assessment); if (assessment.artifactType !== "CastellanPredicateAssessment" || assessment.producer !== "CastellanOperatingLayer" || assessment.status !== "CURRENT" || assessment.correlationId !== dossier.correlationId || assessment.payload.dossierRef !== ref(dossier) || assessment.payload.handoffRef !== ref(handoff) || !assessment.payload.rectorInterpretationRef.trim() || !assessment.sourceRefs.includes(assessment.payload.rectorInterpretationRef) || !assessment.sourceRefs.includes(rectorRef) || assessment.governance.officeProfileRef !== profileRef) throw new Error("exact matching Castellan predicate assessment is required"); gate.assertGovernance(assessment.governance); validateDeterminations(dossier, assessment.payload.determinations); }
function assertRectorInterpretation(dossier: GovernedArtifactEnvelope<MissionDossier>, handoff: GovernedArtifactEnvelope<SecretariatDossierHandoff>, interpretation: GovernedArtifactEnvelope<RectorPredicateInterpretationContract>): void { assertArtifactEnvelope(interpretation); if (interpretation.artifactType !== "RectorPredicateInterpretation" || interpretation.producer !== "Rector" || interpretation.status !== "CURRENT" || interpretation.correlationId !== dossier.correlationId || interpretation.payload.officerPersonaRef !== rectorRef || interpretation.payload.dossierRef !== ref(dossier) || interpretation.payload.handoffRef !== ref(handoff) || interpretation.payload.researchPerformed !== false || interpretation.payload.judgmentRendered !== false || interpretation.payload.authorityCreated !== false || interpretation.governance.officeProfileRef !== profileRef || !interpretation.sourceRefs.includes(rectorRef) || !interpretation.sourceRefs.includes(ref(dossier)) || !interpretation.sourceRefs.includes(ref(handoff))) throw new Error("exact matching Rector predicate interpretation is required"); gate.assertGovernance(interpretation.governance); }
export function assertCastellanHandoffReceipt(dossier: GovernedArtifactEnvelope<MissionDossier>, handoff: GovernedArtifactEnvelope<SecretariatDossierHandoff>): void { assertDossier(dossier); assertHandoff(dossier, handoff); }
function governed(uses: Array<[string, string]>): GovernedArtifactContext { return { coreDoctrineRef: doctrineRef, lexiconRef, officeProfileRef: profileRef, vocabularyUses: uses.map(([termId, value]) => ({ termId, value, lexiconRef })) }; }
function ref(value: ArtifactEnvelope<unknown>): string { return value.identity + "@" + value.version; }
function clean(values: string[]): string[] { return values.map((item) => item.trim()).filter(Boolean); }
