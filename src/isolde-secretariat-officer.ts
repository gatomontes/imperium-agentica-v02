import { ArtifactContext, GovernedArtifactContext, GovernedArtifactEnvelope, createGovernedArtifact } from "./artifact.js";
import { ENACTED_IMPERIUM_LEXICON_V4 } from "./imperium-lexicon-v4.js";
import { ADMITTED_ISOLDE } from "./isolde-officer-profile.js";
import { LexiconAuthority, TerminologyConformanceGate } from "./senate-lexicon.js";
import { ADMITTED_SECRETARIAT_PROFILE } from "./secretariat-doctrine-profile.js";
import { CastellanInquiry, MissionDossier, MissionInquiryQuestion, MissionIntentRequest, OfficerAnswerMapping, OfficerInquiryPresentation, OperatorAnswer, PresentedQuestion, SecretariatMissionIntake } from "./secretariat-mission-dossier.js";

export type IntentField = "purpose" | "scope" | "constraints" | "acceptance_criteria" | "requested_outputs" | "supplied_claims" | "assumptions" | "unknowns" | "material_contradictions" | "authority_assertions" | "external_obligation_assertions" | "attachment_refs";
export interface IntentFieldInterpretation { field: IntentField; value: string; basis: "QUOTED" | "INFERRED"; sourceExcerpt: string; rationale?: string; }
export interface IsoldeIntentDraft { interpretations: IntentFieldInterpretation[]; }
export interface IsoldeIntentInterpretation { officerPersonaRef: string; authenticatedOperatorRef: string; rawUtterance: string; interpretations: IntentFieldInterpretation[]; }
export interface IsoldeAnswerMapping extends OfficerAnswerMapping { rawReply: string; }
export interface IsoldeCognitivePort {
  interpretIntent(rawUtterance: string): IsoldeIntentDraft;
  renderInquiry(questions: MissionInquiryQuestion[]): Array<{ questionId: string; customerFriendlyQuestion: string }>;
  mapAnswers(questions: PresentedQuestion[], rawReply: string): OperatorAnswer[];
}

const officerRef = ADMITTED_ISOLDE.identity + "@" + ADMITTED_ISOLDE.version;
const officeProfileRef = ADMITTED_SECRETARIAT_PROFILE.identity + "@" + ADMITTED_SECRETARIAT_PROFILE.version;
const doctrineRef = ADMITTED_SECRETARIAT_PROFILE.payload.coreDoctrineRef;
const lexiconRef = ADMITTED_SECRETARIAT_PROFILE.payload.lexiconRef;
const gate = new TerminologyConformanceGate(new LexiconAuthority(ENACTED_IMPERIUM_LEXICON_V4.lexicon, lexiconRef));
const arrayFields = new Set<IntentField>(["scope", "constraints", "acceptance_criteria", "requested_outputs", "supplied_claims", "assumptions", "unknowns", "material_contradictions", "authority_assertions", "external_obligation_assertions", "attachment_refs"]);

export class IsoldeSecretariatOfficer {
  private readonly intake = new SecretariatMissionIntake();
  constructor(private readonly cognition: IsoldeCognitivePort) { assertAdmitted(); }

  openMission(authenticatedOperatorRef: string, rawUtterance: string, correlationId: string, context: ArtifactContext = {}) {
    if (!authenticatedOperatorRef.trim() || !rawUtterance.trim()) throw new Error("authenticated Operator and raw utterance are required");
    const draft = this.cognition.interpretIntent(rawUtterance); validateInterpretations(rawUtterance, draft.interpretations);
    const governance = governed([["LEX-049", "officer"], ["LEX-011", "secretariat"], ["LEX-060", "cognitive_process"], ["LEX-010", "operator"]]); gate.assertGovernance(governance);
    const interpretation = createGovernedArtifact<IsoldeIntentInterpretation>("IsoldeIntentInterpretation", "Isolde", correlationId, { officerPersonaRef: officerRef, authenticatedOperatorRef: authenticatedOperatorRef.trim(), rawUtterance, interpretations: draft.interpretations.map(normalizeInterpretation) }, governance, [officerRef, officeProfileRef, doctrineRef, lexiconRef, authenticatedOperatorRef.trim()], context);
    const request = toMissionRequest(interpretation);
    const dossier = this.intake.open(request, correlationId, context);
    return { interpretation, dossier };
  }

  presentInquiry(dossier: GovernedArtifactEnvelope<MissionDossier>, inquiry: GovernedArtifactEnvelope<CastellanInquiry>, context: ArtifactContext = {}) {
    assertIsoldeDossier(dossier);
    const renderings = this.cognition.renderInquiry(inquiry.payload.questions); validateRenderings(inquiry.payload.questions, renderings);
    const governance = governed([["LEX-049", "officer"], ["LEX-011", "secretariat"], ["LEX-047", "clarification"], ["LEX-046", "inquiry"]]); gate.assertGovernance(governance);
    const presentation = createGovernedArtifact<OfficerInquiryPresentation>("OfficerInquiryPresentation", "Isolde", dossier.correlationId, { dossierRef: ref(dossier), inquiryRef: ref(inquiry), officerPersonaRef: officerRef, renderings }, governance, [ref(dossier), ref(inquiry), officerRef, officeProfileRef], context);
    return { presentation, dossier: this.intake.presentInquiry(dossier, inquiry, presentation) };
  }

  recordReply(dossier: GovernedArtifactEnvelope<MissionDossier>, rawReply: string, context: ArtifactContext = {}) {
    assertIsoldeDossier(dossier); if (!rawReply.trim()) throw new Error("raw Operator reply is required");
    const answers = this.cognition.mapAnswers(dossier.payload.presentedQuestions, rawReply); validateAnswers(dossier.payload.presentedQuestions, answers);
    const governance = governed([["LEX-049", "officer"], ["LEX-011", "secretariat"], ["LEX-047", "clarification"], ["LEX-010", "operator"]]); gate.assertGovernance(governance);
    const mapping = createGovernedArtifact<IsoldeAnswerMapping>("OfficerAnswerMapping", "Isolde", dossier.correlationId, { dossierRef: ref(dossier), officerPersonaRef: officerRef, rawReply, answers }, governance, [ref(dossier), officerRef, officeProfileRef], context);
    return { mapping, dossier: this.intake.recordAnswers(dossier, answers, mapping) };
  }

  prepareCastellanHandoff(dossier: GovernedArtifactEnvelope<MissionDossier>, context: ArtifactContext = {}) { assertIsoldeDossier(dossier); return this.intake.prepareCastellanHandoff(dossier, context); }
}

function toMissionRequest(artifact: GovernedArtifactEnvelope<IsoldeIntentInterpretation>): MissionIntentRequest {
  const values = (field: IntentField) => artifact.payload.interpretations.filter((item) => item.field === field).map((item) => item.value);
  return { authenticatedOperatorRef: artifact.payload.authenticatedOperatorRef, rawIntent: artifact.payload.rawUtterance, purpose: values("purpose")[0], scope: values("scope"), constraints: values("constraints"), acceptanceCriteria: values("acceptance_criteria"), requestedOutputs: values("requested_outputs"), suppliedClaims: values("supplied_claims"), assumptions: values("assumptions"), unknowns: values("unknowns"), materialContradictions: values("material_contradictions"), authorityAssertions: values("authority_assertions"), externalObligationAssertions: values("external_obligation_assertions"), attachmentRefs: values("attachment_refs"), officerPersonaRef: officerRef, officerInterpretationRef: ref(artifact) };
}
function validateInterpretations(raw: string, items: IntentFieldInterpretation[]): void { const purpose = items.filter((item) => item.field === "purpose"); if (purpose.length > 1) throw new Error("Isolde may propose at most one purpose"); for (const item of items) { if (!item.value.trim() || !item.sourceExcerpt.trim() || !raw.includes(item.sourceExcerpt)) throw new Error("every Isolde interpretation requires an exact source excerpt"); if (item.basis === "INFERRED" && !item.rationale?.trim()) throw new Error("every inferred interpretation requires rationale"); if (!arrayFields.has(item.field) && item.field !== "purpose") throw new Error("unsupported Isolde intent field"); } }
function validateRenderings(questions: MissionInquiryQuestion[], renderings: Array<{ questionId: string; customerFriendlyQuestion: string }>): void { const byId = new Map(renderings.map((item) => [item.questionId, item.customerFriendlyQuestion])); if (byId.size !== questions.length) throw new Error("Isolde requires one rendering per Castellan question"); for (const question of questions) if (!byId.get(question.questionId)?.includes(question.exactQuestion)) throw new Error("Isolde must preserve every exact Castellan question verbatim"); }
function validateAnswers(questions: PresentedQuestion[], answers: OperatorAnswer[]): void { const ids = new Set(questions.map((item) => item.questionId)); const seen = new Set<string>(); for (const answer of answers) { if (!ids.has(answer.questionId) || seen.has(answer.questionId) || !answer.rawAnswer.trim()) throw new Error("Isolde answer mapping requires unique exact presented questions and nonblank answers"); seen.add(answer.questionId); } }
function assertAdmitted(): void { if (ADMITTED_ISOLDE.payload.state !== "ADMITTED" || ADMITTED_ISOLDE.payload.officeProfileRef !== officeProfileRef) throw new Error("current admitted Isolde Persona is required"); }
function assertIsoldeDossier(dossier: GovernedArtifactEnvelope<MissionDossier>): void { if (dossier.payload.officerPersonaRef !== officerRef || dossier.payload.officeProfileRef !== officeProfileRef) throw new Error("exact Isolde-opened Secretariat dossier is required"); }
function normalizeInterpretation(item: IntentFieldInterpretation): IntentFieldInterpretation { return { ...item, value: item.value.trim(), sourceExcerpt: item.sourceExcerpt, rationale: item.rationale?.trim() }; }
function governed(uses: Array<[string, string]>): GovernedArtifactContext { return { coreDoctrineRef: doctrineRef, lexiconRef, officeProfileRef, vocabularyUses: uses.map(([termId, value]) => ({ termId, value, lexiconRef })) }; }
function ref(artifact: { identity: string; version: number }): string { return artifact.identity + "@" + artifact.version; }
