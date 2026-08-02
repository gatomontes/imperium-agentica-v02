import { ArtifactContext, ArtifactEnvelope, GovernedArtifactEnvelope, GovernedArtifactContext, createGovernedArtifact } from "./artifact.js";
import { ENACTED_IMPERIUM_LEXICON_V4 } from "./imperium-lexicon-v4.js";
import { LexiconAuthority, TerminologyConformanceGate } from "./senate-lexicon.js";
import { assertArtifactEnvelope } from "./schema.js";
import { ADMITTED_SECRETARIAT_PROFILE } from "./secretariat-doctrine-profile.js";

export type MissionDossierState =
  | "INTAKE_OPEN"
  | "AWAITING_CASTELLAN_INQUIRY"
  | "AWAITING_OPERATOR"
  | "READY_FOR_CASTELLAN_EVALUATION";

export interface MissionIntentRequest {
  authenticatedOperatorRef: string;
  rawIntent: string;
  purpose?: string;
  scope?: string[];
  constraints?: string[];
  acceptanceCriteria?: string[];
  requestedOutputs?: string[];
  suppliedClaims?: string[];
  assumptions?: string[];
  unknowns?: string[];
  materialContradictions?: string[];
  authorityAssertions?: string[];
  externalObligationAssertions?: string[];
  attachmentRefs?: string[];
  officerPersonaRef?: string;
  officerInterpretationRef?: string;
}

export interface MissionInquiryQuestion {
  questionId: string;
  predicate: MissionFormationPredicate;
  exactQuestion: string;
  rationale: string;
  answerRequired: boolean;
}

export type MissionFormationPredicate = "purpose" | "scope" | "constraints" | "acceptance_criteria" | "requested_outputs" | "unknowns" | "material_contradictions" | "resource_requirements";

export interface CastellanInquiry {
  dossierRef: string;
  questions: MissionInquiryQuestion[];
}

export interface OperatorAnswer {
  questionId: string;
  rawAnswer: string;
}

export interface RecordedAnswer extends OperatorAnswer {
  normalizedAnswer: string;
}

export interface PresentedQuestion extends MissionInquiryQuestion {
  customerFriendlyQuestion: string;
}

export interface MissionDossier {
  doctrineRef: string;
  lexiconRef: string;
  officeProfileRef: string;
  authenticatedOperatorRef: string;
  rawIntent: string;
  normalizedIntent: string;
  purpose?: string;
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
  attachmentRefs: string[];
  officerPersonaRef?: string;
  officerInterpretationRef?: string;
  inquiryRef?: string;
  presentedQuestions: PresentedQuestion[];
  answers: RecordedAnswer[];
  state: MissionDossierState;
  revisionConditions: string[];
}

export interface OfficerInquiryPresentation {
  dossierRef: string;
  inquiryRef: string;
  officerPersonaRef: string;
  renderings: Array<{ questionId: string; customerFriendlyQuestion: string }>;
}

export interface OfficerAnswerMapping {
  dossierRef: string;
  officerPersonaRef: string;
  answers: OperatorAnswer[];
}

export interface SecretariatDossierHandoff {
  dossierRef: string;
  recipient: "Castellan";
  purpose: "MISSION_EVALUATION";
  authorityCreated: false;
}

const profileRef = ADMITTED_SECRETARIAT_PROFILE.identity + "@" + ADMITTED_SECRETARIAT_PROFILE.version;
const doctrineRef = ADMITTED_SECRETARIAT_PROFILE.payload.coreDoctrineRef;
const lexiconRef = ADMITTED_SECRETARIAT_PROFILE.payload.lexiconRef;
const vocabularyAuthority = new LexiconAuthority(ENACTED_IMPERIUM_LEXICON_V4.lexicon, lexiconRef);
const terminologyGate = new TerminologyConformanceGate(vocabularyAuthority);

export class SecretariatMissionIntake {
  open(
    request: MissionIntentRequest,
    correlationId: string,
    context: ArtifactContext = {},
  ): GovernedArtifactEnvelope<MissionDossier> {
    if (!request.authenticatedOperatorRef.trim()) throw new Error("authenticated Operator reference is required");
    if (!request.rawIntent.trim()) throw new Error("raw Operator intent is required");
    if (!!request.officerPersonaRef !== !!request.officerInterpretationRef) throw new Error("Officer Persona and interpretation references must be supplied together");
    assertAdmittedCurrentProfile();
    if (!lexiconRef) throw new Error("current Secretariat Office Profile requires an exact Imperium Lexicon");
    const governance = governedVocabulary([
      ["LEX-009", "mission_dossier"],
      ["LEX-011", "secretariat"],
      ["LEX-010", "operator"],
    ]);
    terminologyGate.assertGovernance(governance);
    return createGovernedArtifact(
      "MissionDossier",
      "Secretariat",
      correlationId,
      {
        doctrineRef,
        lexiconRef,
        officeProfileRef: profileRef,
        authenticatedOperatorRef: request.authenticatedOperatorRef.trim(),
        rawIntent: request.rawIntent,
        normalizedIntent: request.rawIntent.trim(),
        purpose: cleanOptional(request.purpose),
        scope: cleanList(request.scope),
        constraints: cleanList(request.constraints),
        acceptanceCriteria: cleanList(request.acceptanceCriteria),
        requestedOutputs: cleanList(request.requestedOutputs),
        suppliedClaims: cleanList(request.suppliedClaims),
        assumptions: cleanList(request.assumptions),
        unknowns: cleanList(request.unknowns),
        materialContradictions: cleanList(request.materialContradictions),
        authorityAssertions: cleanList(request.authorityAssertions),
        externalObligationAssertions: cleanList(request.externalObligationAssertions),
        attachmentRefs: cleanList(request.attachmentRefs),
        officerPersonaRef: cleanOptional(request.officerPersonaRef),
        officerInterpretationRef: cleanOptional(request.officerInterpretationRef),
        presentedQuestions: [],
        answers: [],
        state: "AWAITING_CASTELLAN_INQUIRY",
        revisionConditions: [
          "Operator corrects or supplements intent.",
          "Castellan issues an exact inquiry.",
          "Core Doctrine or Secretariat Office Profile changes.",
        ],
      },
      governance,
      [request.authenticatedOperatorRef.trim(), doctrineRef, lexiconRef, profileRef, ...cleanList(request.attachmentRefs), ...cleanList([request.officerPersonaRef ?? "", request.officerInterpretationRef ?? ""])],
      context,
    );
  }

  presentInquiry(
    current: GovernedArtifactEnvelope<MissionDossier>,
    inquiry: ArtifactEnvelope<CastellanInquiry>,
    presentation?: ArtifactEnvelope<OfficerInquiryPresentation>,
  ): GovernedArtifactEnvelope<MissionDossier> {
    assertDossier(current);
    assertArtifactEnvelope(inquiry);
    const currentRef = exactRef(current);
    if (current.payload.state !== "AWAITING_CASTELLAN_INQUIRY" && current.payload.state !== "READY_FOR_CASTELLAN_EVALUATION") {
      throw new Error("dossier is not accepting a Castellan inquiry");
    }
    if (inquiry.artifactType !== "CastellanInquiry" || inquiry.producer !== "Castellan" || inquiry.status !== "CURRENT") {
      throw new Error("exact current Castellan inquiry is required");
    }
    if (inquiry.payload.dossierRef !== currentRef) throw new Error("inquiry does not target the exact current dossier");
    validateQuestions(inquiry.payload.questions);
    const renderings = presentation ? validatePresentation(current, inquiry, presentation) : new Map<string, string>();
    return successor(current, {
      ...current.payload,
      inquiryRef: exactRef(inquiry),
      presentedQuestions: inquiry.payload.questions.map((question) => ({
        ...question,
        customerFriendlyQuestion: renderings.get(question.questionId) ?? friendly(question.exactQuestion),
      })),
      answers: [],
      state: "AWAITING_OPERATOR",
    }, [exactRef(inquiry), ...(presentation ? [exactRef(presentation)] : [])]);
  }

  recordAnswers(
    current: GovernedArtifactEnvelope<MissionDossier>,
    answers: OperatorAnswer[],
    mapping?: ArtifactEnvelope<OfficerAnswerMapping>,
  ): GovernedArtifactEnvelope<MissionDossier> {
    assertDossier(current);
    if (current.payload.state !== "AWAITING_OPERATOR" || !current.payload.inquiryRef) {
      throw new Error("dossier is not awaiting Operator answers");
    }
    if (mapping) validateAnswerMapping(current, answers, mapping);
    const questions = new Map(current.payload.presentedQuestions.map((question) => [question.questionId, question]));
    const seen = new Set<string>();
    const recorded = answers.map((answer) => {
      if (!questions.has(answer.questionId)) throw new Error("answer does not match a presented question");
      if (seen.has(answer.questionId)) throw new Error("duplicate answer for question");
      seen.add(answer.questionId);
      return { questionId: answer.questionId, rawAnswer: answer.rawAnswer, normalizedAnswer: answer.rawAnswer.trim() };
    });
    const missingRequired = current.payload.presentedQuestions.some(
      (question) => question.answerRequired && !recorded.some((answer) => answer.questionId === question.questionId && answer.normalizedAnswer),
    );
    return successor(current, {
      ...current.payload,
      answers: recorded,
      state: missingRequired ? "AWAITING_OPERATOR" : "READY_FOR_CASTELLAN_EVALUATION",
    }, mapping ? [exactRef(mapping)] : []);
  }

  prepareCastellanHandoff(
    current: GovernedArtifactEnvelope<MissionDossier>,
    context: ArtifactContext = {},
  ): GovernedArtifactEnvelope<SecretariatDossierHandoff> {
    assertDossier(current);
    if (current.payload.state !== "READY_FOR_CASTELLAN_EVALUATION") {
      throw new Error("only a dossier ready for Castellan evaluation may be handed off");
    }
    const dossierRef = exactRef(current);
    const governance = governedVocabulary([
      ["LEX-042", "handoff"],
      ["LEX-011", "secretariat"],
      ["LEX-012", "castellan"],
    ]);
    terminologyGate.assertGovernance(governance);
    return createGovernedArtifact(
      "SecretariatDossierHandoff",
      "Secretariat",
      current.correlationId,
      { dossierRef, recipient: "Castellan", purpose: "MISSION_EVALUATION", authorityCreated: false },
      governance,
      [dossierRef, doctrineRef, lexiconRef!, profileRef],
      context,
    );
  }
}

function assertAdmittedCurrentProfile(): void {
  assertArtifactEnvelope(ADMITTED_SECRETARIAT_PROFILE);
  if (ADMITTED_SECRETARIAT_PROFILE.payload.state !== "ADMITTED" || ADMITTED_SECRETARIAT_PROFILE.status !== "CURRENT") {
    throw new Error("current admitted Secretariat Office Profile is required");
  }
}

function assertDossier(dossier: GovernedArtifactEnvelope<MissionDossier>): void {
  assertArtifactEnvelope(dossier);
  assertAdmittedCurrentProfile();
  if (dossier.artifactType !== "MissionDossier" || dossier.producer !== "Secretariat" || dossier.status !== "CURRENT") {
    throw new Error("exact current Secretariat Mission Dossier is required");
  }
  if (dossier.payload.doctrineRef !== doctrineRef || dossier.payload.lexiconRef !== lexiconRef || dossier.payload.officeProfileRef !== profileRef) {
    throw new Error("dossier doctrine, Lexicon, or Office Profile is stale or mismatched");
  }
  terminologyGate.assertGovernance(dossier.governance);
  if (dossier.governance.coreDoctrineRef !== doctrineRef || dossier.governance.officeProfileRef !== profileRef) throw new Error("governed dossier doctrine or Office Profile lineage is stale or mismatched");
}

function successor(
  current: GovernedArtifactEnvelope<MissionDossier>,
  payload: MissionDossier,
  extraRefs: string[] = [],
): GovernedArtifactEnvelope<MissionDossier> {
  const currentRef = exactRef(current);
  return {
    ...current,
    version: current.version + 1,
    supersedes: currentRef,
    payload,
    sourceRefs: [...new Set([...current.sourceRefs, currentRef, ...extraRefs])].sort(),
  };
}

function governedVocabulary(uses: Array<[string, string]>): GovernedArtifactContext {
  return {
    coreDoctrineRef: doctrineRef,
    lexiconRef,
    officeProfileRef: profileRef,
    vocabularyUses: uses.map(([termId, value]) => ({ termId, value, lexiconRef })),
  };
}

function validateQuestions(questions: MissionInquiryQuestion[]): void {
  if (questions.length === 0) throw new Error("Castellan inquiry requires at least one question");
  const ids = new Set<string>();
  for (const question of questions) {
    if (!question.questionId.trim() || !question.predicate || !question.exactQuestion.trim() || !question.rationale.trim()) {
      throw new Error("every Castellan question requires identity, exact wording, and rationale");
    }
    if (ids.has(question.questionId)) throw new Error("duplicate Castellan question identity");
    ids.add(question.questionId);
  }
}

function validatePresentation(
  dossier: GovernedArtifactEnvelope<MissionDossier>,
  inquiry: ArtifactEnvelope<CastellanInquiry>,
  presentation: ArtifactEnvelope<OfficerInquiryPresentation>,
): Map<string, string> {
  assertArtifactEnvelope(presentation);
  if (presentation.artifactType !== "OfficerInquiryPresentation" || presentation.producer !== "Isolde" || presentation.status !== "CURRENT") throw new Error("exact current Isolde inquiry presentation is required");
  if (!dossier.payload.officerPersonaRef || presentation.payload.officerPersonaRef !== dossier.payload.officerPersonaRef || presentation.payload.dossierRef !== exactRef(dossier) || presentation.payload.inquiryRef !== exactRef(inquiry) || presentation.correlationId !== dossier.correlationId) throw new Error("Isolde presentation lineage does not match dossier and inquiry");
  const byId = new Map(presentation.payload.renderings.map((item) => [item.questionId, item.customerFriendlyQuestion.trim()]));
  if (byId.size !== inquiry.payload.questions.length) throw new Error("Isolde presentation requires one rendering per exact question");
  for (const question of inquiry.payload.questions) {
    const rendering = byId.get(question.questionId);
    if (!rendering || !rendering.includes(question.exactQuestion)) throw new Error("Isolde presentation must preserve the exact Castellan question verbatim");
  }
  return byId;
}

function validateAnswerMapping(
  dossier: GovernedArtifactEnvelope<MissionDossier>,
  answers: OperatorAnswer[],
  mapping: ArtifactEnvelope<OfficerAnswerMapping>,
): void {
  assertArtifactEnvelope(mapping);
  if (mapping.artifactType !== "OfficerAnswerMapping" || mapping.producer !== "Isolde" || mapping.status !== "CURRENT") throw new Error("exact current Isolde answer mapping is required");
  if (!dossier.payload.officerPersonaRef || mapping.payload.officerPersonaRef !== dossier.payload.officerPersonaRef || mapping.payload.dossierRef !== exactRef(dossier) || mapping.correlationId !== dossier.correlationId) throw new Error("Isolde answer mapping lineage does not match dossier");
  if (JSON.stringify(mapping.payload.answers) !== JSON.stringify(answers)) throw new Error("recorded answers must exactly match Isolde mapping");
}

function friendly(exactQuestion: string): string {
  return "To make sure we understand your intent, " + exactQuestion.trim();
}

function exactRef(artifact: ArtifactEnvelope<unknown>): string {
  return artifact.identity + "@" + artifact.version;
}

function cleanOptional(value?: string): string | undefined {
  const cleaned = value?.trim();
  return cleaned || undefined;
}

function cleanList(values: string[] = []): string[] {
  return values.map((value) => value.trim()).filter(Boolean);
}
