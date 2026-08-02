import { ArtifactContext, ArtifactEnvelope, GovernedArtifactContext, GovernedArtifactEnvelope, createGovernedArtifact } from "./artifact.js";
import { ENACTED_IMPERIUM_LEXICON_V4 } from "./imperium-lexicon-v4.js";
import { ADMITTED_SECRETARIAT_PROFILE } from "./secretariat-doctrine-profile.js";
import { LexiconAuthority, TerminologyConformanceGate } from "./senate-lexicon.js";
import { assertArtifactEnvelope } from "./schema.js";

export type MissionDossierState = "AWAITING_CASTELLAN_INQUIRY" | "AWAITING_OPERATOR" | "READY_FOR_CASTELLAN_EVALUATION";
export type MissionFormationPredicate = "purpose" | "scope" | "constraints" | "acceptance_criteria" | "requested_outputs" | "unknowns" | "material_contradictions" | "resource_requirements";
export interface MissionIntentRequest { authenticatedOperatorRef: string; rawIntent: string; suppliedClaims?: string[]; assumptions?: string[]; authorityAssertions?: string[]; externalObligationAssertions?: string[]; attachmentRefs?: string[]; officerPersonaRef?: string; }
export interface MissionInquiryQuestion { questionId: string; predicate: MissionFormationPredicate; exactQuestion: string; rationale: string; answerRequired: true; }
export interface CastellanInquiry { dossierRef: string; question: MissionInquiryQuestion; }
export interface OperatorAnswer { questionId: string; rawAnswer: string; }
export interface RecordedAnswer extends OperatorAnswer { responseReceiptRef?: string; }
export type DeterminationDerivation = "QUOTED" | "NORMALIZED" | "INFERRED";
export interface DeterminationEvidence { exactExcerpt: string; derivation: DeterminationDerivation; value?: string; rationale: string; }
export interface AcceptedMissionDetermination { questionId: string; predicate: MissionFormationPredicate; disposition: "RESOLVED" | "DECLARED_NONE"; values: string[]; rationale: string; sourceAnswerRef: string; evidence: DeterminationEvidence[]; assessmentRef: string; }
export type CastellanTurnAction = "ACCEPT_AND_ADVANCE" | "REQUERY_SAME_QUESTION" | "REQUEST_EXPLANATION";
export interface CastellanTurnDisposition { dossierRef: string; questionId: string; action: CastellanTurnAction; operatorFacingMessage: string; acceptedDetermination?: AcceptedMissionDetermination; authorityCreated: false; }
export interface IsoldeQuestionPresentation { dossierRef: string; inquiryRef: string; officerPersonaRef: string; questionId: string; exactQuestion: string; }
export interface IsoldeResponseReceipt { dossierRef: string; inquiryRef: string; officerPersonaRef: string; questionId: string; rawResponse: string; }
export interface IsoldeDispositionRelay { dossierRef: string; dispositionRef: string; officerPersonaRef: string; action: CastellanTurnAction; exactMessage: string; }
export interface SecretariatDossierHandoff { dossierRef: string; recipient: "Castellan"; purpose: "MISSION_EVALUATION"; authorityCreated: false; }
export interface MissionDossier {
  doctrineRef: string; lexiconRef: string; officeProfileRef: string; authenticatedOperatorRef: string; rawIntent: string;
  suppliedClaims: string[]; assumptions: string[]; authorityAssertions: string[]; externalObligationAssertions: string[]; attachmentRefs: string[];
  officerPersonaRef?: string; activeInquiryRef?: string; presentedQuestions: MissionInquiryQuestion[]; answers: RecordedAnswer[];
  acceptedDeterminations: AcceptedMissionDetermination[]; turnDispositionRefs: string[]; lastTurnAction?: CastellanTurnAction; state: MissionDossierState; revisionConditions: string[];
}

const profileRef = ADMITTED_SECRETARIAT_PROFILE.identity + "@" + ADMITTED_SECRETARIAT_PROFILE.version;
const doctrineRef = ADMITTED_SECRETARIAT_PROFILE.payload.coreDoctrineRef; const lexiconRef = ADMITTED_SECRETARIAT_PROFILE.payload.lexiconRef;
const gate = new TerminologyConformanceGate(new LexiconAuthority(ENACTED_IMPERIUM_LEXICON_V4.lexicon, lexiconRef));

export class SecretariatMissionIntake {
  open(request: MissionIntentRequest, correlationId: string, context: ArtifactContext = {}): GovernedArtifactEnvelope<MissionDossier> {
    if (!request.authenticatedOperatorRef.trim() || !request.rawIntent.trim()) throw new Error("authenticated Operator and raw intent are required");
    const governance = governed([["LEX-009", "mission_dossier"], ["LEX-011", "secretariat"], ["LEX-010", "operator"]]); gate.assertGovernance(governance);
    return createGovernedArtifact("MissionDossier", "Secretariat", correlationId, { doctrineRef, lexiconRef, officeProfileRef: profileRef, authenticatedOperatorRef: request.authenticatedOperatorRef.trim(), rawIntent: request.rawIntent, suppliedClaims: clean(request.suppliedClaims), assumptions: clean(request.assumptions), authorityAssertions: clean(request.authorityAssertions), externalObligationAssertions: clean(request.externalObligationAssertions), attachmentRefs: clean(request.attachmentRefs), officerPersonaRef: request.officerPersonaRef?.trim() || undefined, presentedQuestions: [], answers: [], acceptedDeterminations: [], turnDispositionRefs: [], state: "AWAITING_CASTELLAN_INQUIRY", revisionConditions: ["Operator supplies a response.", "Castellan issues or disposes one question turn.", "Controlling doctrine or profile changes."] }, governance, [request.authenticatedOperatorRef.trim(), doctrineRef, lexiconRef, profileRef, ...clean(request.attachmentRefs), ...(request.officerPersonaRef ? [request.officerPersonaRef] : [])], context);
  }
  presentInquiry(current: GovernedArtifactEnvelope<MissionDossier>, inquiry: ArtifactEnvelope<CastellanInquiry>, presentation?: ArtifactEnvelope<IsoldeQuestionPresentation>): GovernedArtifactEnvelope<MissionDossier> {
    assertDossier(current); assertArtifactEnvelope(inquiry); if (current.payload.state !== "AWAITING_CASTELLAN_INQUIRY") throw new Error("dossier is not accepting a Castellan question");
    if (inquiry.artifactType !== "CastellanInquiry" || inquiry.producer !== "Castellan" || inquiry.status !== "CURRENT" || inquiry.payload.dossierRef !== exactRef(current)) throw new Error("exact matching current Castellan inquiry is required");
    validateQuestion(inquiry.payload.question); if (presentation) validatePresentation(current, inquiry, presentation);
    return successor(current, { ...current.payload, activeInquiryRef: exactRef(inquiry), presentedQuestions: [...current.payload.presentedQuestions, structuredClone(inquiry.payload.question)], state: "AWAITING_OPERATOR" }, [exactRef(inquiry), ...(presentation ? [exactRef(presentation)] : [])]);
  }
  recordAnswers(current: GovernedArtifactEnvelope<MissionDossier>, answers: OperatorAnswer[], receipt?: ArtifactEnvelope<IsoldeResponseReceipt>): GovernedArtifactEnvelope<MissionDossier> {
    assertDossier(current); if (current.payload.state !== "AWAITING_OPERATOR" || !current.payload.activeInquiryRef) throw new Error("dossier is not awaiting one Operator response");
    if (answers.length !== 1) throw new Error("exactly one Operator response is required per turn"); const answer = answers[0]; const question = current.payload.presentedQuestions.at(-1)!;
    if (answer.questionId !== question.questionId || !answer.rawAnswer.trim()) throw new Error("response must match the one active question and remain nonblank");
    if (receipt) validateReceipt(current, answer, receipt);
    return successor(current, { ...current.payload, answers: [...current.payload.answers, { ...answer, responseReceiptRef: receipt ? exactRef(receipt) : undefined }], state: "READY_FOR_CASTELLAN_EVALUATION" }, receipt ? [exactRef(receipt)] : []);
  }
  prepareCastellanHandoff(current: GovernedArtifactEnvelope<MissionDossier>, context: ArtifactContext = {}): GovernedArtifactEnvelope<SecretariatDossierHandoff> {
    assertDossier(current); if (current.payload.state !== "READY_FOR_CASTELLAN_EVALUATION") throw new Error("only one answered question turn may be handed to Castellan"); const dossierRef = exactRef(current);
    const governance = governed([["LEX-042", "handoff"], ["LEX-011", "secretariat"], ["LEX-012", "castellan"]]); gate.assertGovernance(governance);
    return createGovernedArtifact("SecretariatDossierHandoff", "Secretariat", current.correlationId, { dossierRef, recipient: "Castellan", purpose: "MISSION_EVALUATION", authorityCreated: false }, governance, [dossierRef, profileRef], context);
  }
  recordCastellanDisposition(current: GovernedArtifactEnvelope<MissionDossier>, disposition: GovernedArtifactEnvelope<CastellanTurnDisposition>, relay?: ArtifactEnvelope<IsoldeDispositionRelay>): GovernedArtifactEnvelope<MissionDossier> {
    assertDossier(current); assertArtifactEnvelope(disposition); if (current.payload.state !== "READY_FOR_CASTELLAN_EVALUATION" || disposition.artifactType !== "CastellanTurnDisposition" || disposition.producer !== "Castellan" || disposition.status !== "CURRENT" || disposition.correlationId !== current.correlationId || disposition.payload.dossierRef !== exactRef(current) || disposition.payload.questionId !== current.payload.presentedQuestions.at(-1)?.questionId || disposition.payload.authorityCreated !== false || disposition.governance.coreDoctrineRef !== doctrineRef || disposition.governance.lexiconRef !== lexiconRef) throw new Error("exact matching Castellan turn disposition is required"); gate.assertGovernance(disposition.governance);
    if (!disposition.payload.operatorFacingMessage.trim()) throw new Error("Castellan disposition requires exact Operator-facing wording");
    if (disposition.payload.action === "ACCEPT_AND_ADVANCE" && (!disposition.payload.acceptedDetermination || disposition.payload.acceptedDetermination.assessmentRef.trim() === "" || !disposition.sourceRefs.includes(disposition.payload.acceptedDetermination.assessmentRef))) throw new Error("accepted turn requires exact determination lineage");
    if (disposition.payload.action !== "ACCEPT_AND_ADVANCE" && disposition.payload.acceptedDetermination) throw new Error("non-accepting disposition may not carry accepted determination");
    if (relay) validateRelay(current, disposition, relay);
    const accepted = disposition.payload.acceptedDetermination ? [...current.payload.acceptedDeterminations, structuredClone(disposition.payload.acceptedDetermination)] : current.payload.acceptedDeterminations;
    return successor(current, { ...current.payload, acceptedDeterminations: accepted, turnDispositionRefs: [...current.payload.turnDispositionRefs, exactRef(disposition)], lastTurnAction: disposition.payload.action, state: "AWAITING_CASTELLAN_INQUIRY" }, [exactRef(disposition), ...(relay ? [exactRef(relay)] : [])]);
  }
}

function assertDossier(value: GovernedArtifactEnvelope<MissionDossier>): void { assertArtifactEnvelope(value); if (value.artifactType !== "MissionDossier" || value.producer !== "Secretariat" || value.status !== "CURRENT" || value.payload.doctrineRef !== doctrineRef || value.payload.lexiconRef !== lexiconRef || value.payload.officeProfileRef !== profileRef || value.governance.officeProfileRef !== profileRef) throw new Error("exact current Secretariat Mission Dossier is required"); gate.assertGovernance(value.governance); }
function validateQuestion(q: MissionInquiryQuestion): void { if (!q.questionId.trim() || !q.exactQuestion.trim() || !q.rationale.trim() || q.answerRequired !== true) throw new Error("one complete exact Castellan question is required"); }
function validatePresentation(d: GovernedArtifactEnvelope<MissionDossier>, i: ArtifactEnvelope<CastellanInquiry>, p: ArtifactEnvelope<IsoldeQuestionPresentation>): void { assertArtifactEnvelope(p); if (p.artifactType !== "IsoldeQuestionPresentation" || p.producer !== "Isolde" || p.status !== "CURRENT" || p.correlationId !== d.correlationId || p.payload.dossierRef !== exactRef(d) || p.payload.inquiryRef !== exactRef(i) || p.payload.questionId !== i.payload.question.questionId || p.payload.exactQuestion !== i.payload.question.exactQuestion || p.payload.officerPersonaRef !== d.payload.officerPersonaRef) throw new Error("Isolde must transport the exact one-question Castellan turn"); }
function validateReceipt(d: GovernedArtifactEnvelope<MissionDossier>, a: OperatorAnswer, r: ArtifactEnvelope<IsoldeResponseReceipt>): void { assertArtifactEnvelope(r); if (r.artifactType !== "IsoldeResponseReceipt" || r.producer !== "Isolde" || r.status !== "CURRENT" || r.correlationId !== d.correlationId || r.payload.dossierRef !== exactRef(d) || r.payload.inquiryRef !== d.payload.activeInquiryRef || r.payload.questionId !== a.questionId || r.payload.rawResponse !== a.rawAnswer || r.payload.officerPersonaRef !== d.payload.officerPersonaRef) throw new Error("Isolde response receipt must preserve the exact raw response and active question"); }
function validateRelay(d: GovernedArtifactEnvelope<MissionDossier>, x: GovernedArtifactEnvelope<CastellanTurnDisposition>, r: ArtifactEnvelope<IsoldeDispositionRelay>): void { assertArtifactEnvelope(r); if (r.artifactType !== "IsoldeDispositionRelay" || r.producer !== "Isolde" || r.status !== "CURRENT" || r.correlationId !== d.correlationId || r.payload.dossierRef !== exactRef(d) || r.payload.dispositionRef !== exactRef(x) || r.payload.action !== x.payload.action || r.payload.exactMessage !== x.payload.operatorFacingMessage || r.payload.officerPersonaRef !== d.payload.officerPersonaRef) throw new Error("Isolde must relay the exact Castellan disposition"); }
function successor(current: GovernedArtifactEnvelope<MissionDossier>, payload: MissionDossier, refs: string[]): GovernedArtifactEnvelope<MissionDossier> { const currentRef = exactRef(current); return { ...current, version: current.version + 1, supersedes: currentRef, payload, sourceRefs: [...new Set([...current.sourceRefs, currentRef, ...refs])].sort() }; }
function governed(uses: Array<[string, string]>): GovernedArtifactContext { return { coreDoctrineRef: doctrineRef, lexiconRef, officeProfileRef: profileRef, vocabularyUses: uses.map(([termId, value]) => ({ termId, value, lexiconRef })) }; }
function exactRef(value: { identity: string; version: number }): string { return value.identity + "@" + value.version; }
function clean(values: string[] = []): string[] { return values.map((x) => x.trim()).filter(Boolean); }
