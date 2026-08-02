import { ArtifactContext, ArtifactEnvelope, createArtifact } from "./artifact.js";
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
}

export interface MissionInquiryQuestion {
  questionId: string;
  exactQuestion: string;
  rationale: string;
  answerRequired: boolean;
}

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
  inquiryRef?: string;
  presentedQuestions: PresentedQuestion[];
  answers: RecordedAnswer[];
  state: MissionDossierState;
  revisionConditions: string[];
}

export interface SecretariatDossierHandoff {
  dossierRef: string;
  recipient: "Castellan";
  purpose: "MISSION_EVALUATION";
  authorityCreated: false;
}

const profileRef = ADMITTED_SECRETARIAT_PROFILE.identity + "@" + ADMITTED_SECRETARIAT_PROFILE.version;
const doctrineRef = ADMITTED_SECRETARIAT_PROFILE.payload.coreDoctrineRef;

export class SecretariatMissionIntake {
  open(
    request: MissionIntentRequest,
    correlationId: string,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<MissionDossier> {
    if (!request.authenticatedOperatorRef.trim()) throw new Error("authenticated Operator reference is required");
    if (!request.rawIntent.trim()) throw new Error("raw Operator intent is required");
    assertAdmittedCurrentProfile();
    return createArtifact(
      "MissionDossier",
      "Secretariat",
      correlationId,
      {
        doctrineRef,
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
        presentedQuestions: [],
        answers: [],
        state: "AWAITING_CASTELLAN_INQUIRY",
        revisionConditions: [
          "Operator corrects or supplements intent.",
          "Castellan issues an exact inquiry.",
          "Core Doctrine or Secretariat Office Profile changes.",
        ],
      },
      [request.authenticatedOperatorRef.trim(), doctrineRef, profileRef, ...cleanList(request.attachmentRefs)],
      context,
    );
  }

  presentInquiry(
    current: ArtifactEnvelope<MissionDossier>,
    inquiry: ArtifactEnvelope<CastellanInquiry>,
  ): ArtifactEnvelope<MissionDossier> {
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
    return successor(current, {
      ...current.payload,
      inquiryRef: exactRef(inquiry),
      presentedQuestions: inquiry.payload.questions.map((question) => ({
        ...question,
        customerFriendlyQuestion: friendly(question.exactQuestion),
      })),
      answers: [],
      state: "AWAITING_OPERATOR",
    }, [exactRef(inquiry)]);
  }

  recordAnswers(
    current: ArtifactEnvelope<MissionDossier>,
    answers: OperatorAnswer[],
  ): ArtifactEnvelope<MissionDossier> {
    assertDossier(current);
    if (current.payload.state !== "AWAITING_OPERATOR" || !current.payload.inquiryRef) {
      throw new Error("dossier is not awaiting Operator answers");
    }
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
    });
  }

  prepareCastellanHandoff(
    current: ArtifactEnvelope<MissionDossier>,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<SecretariatDossierHandoff> {
    assertDossier(current);
    if (current.payload.state !== "READY_FOR_CASTELLAN_EVALUATION") {
      throw new Error("only a dossier ready for Castellan evaluation may be handed off");
    }
    const dossierRef = exactRef(current);
    return createArtifact(
      "SecretariatDossierHandoff",
      "Secretariat",
      current.correlationId,
      { dossierRef, recipient: "Castellan", purpose: "MISSION_EVALUATION", authorityCreated: false },
      [dossierRef, doctrineRef, profileRef],
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

function assertDossier(dossier: ArtifactEnvelope<MissionDossier>): void {
  assertArtifactEnvelope(dossier);
  assertAdmittedCurrentProfile();
  if (dossier.artifactType !== "MissionDossier" || dossier.producer !== "Secretariat" || dossier.status !== "CURRENT") {
    throw new Error("exact current Secretariat Mission Dossier is required");
  }
  if (dossier.payload.doctrineRef !== doctrineRef || dossier.payload.officeProfileRef !== profileRef) {
    throw new Error("dossier doctrine or Office Profile is stale or mismatched");
  }
}

function successor(
  current: ArtifactEnvelope<MissionDossier>,
  payload: MissionDossier,
  extraRefs: string[] = [],
): ArtifactEnvelope<MissionDossier> {
  const currentRef = exactRef(current);
  return {
    ...current,
    version: current.version + 1,
    supersedes: currentRef,
    payload,
    sourceRefs: [...new Set([...current.sourceRefs, currentRef, ...extraRefs])].sort(),
  };
}

function validateQuestions(questions: MissionInquiryQuestion[]): void {
  if (questions.length === 0) throw new Error("Castellan inquiry requires at least one question");
  const ids = new Set<string>();
  for (const question of questions) {
    if (!question.questionId.trim() || !question.exactQuestion.trim() || !question.rationale.trim()) {
      throw new Error("every Castellan question requires identity, exact wording, and rationale");
    }
    if (ids.has(question.questionId)) throw new Error("duplicate Castellan question identity");
    ids.add(question.questionId);
  }
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
