import { describe, expect, it } from "vitest";
import { createArtifact } from "../src/artifact.js";
import { ENACTED_CORE_DOCTRINE_V4 } from "../src/enacted-core-doctrine-v4.js";
import {
  ADMITTED_SECRETARIAT_PROFILE,
  SECRETARIAT_PROFILE_ADMISSION_DECISION,
  SECRETARIAT_PROFILE_CANDIDATE,
  SECRETARIAT_PROFILE_JUDGMENT,
} from "../src/secretariat-doctrine-profile.js";
import { CastellanInquiry, SecretariatMissionIntake } from "../src/secretariat-mission-dossier.js";

const intake = new SecretariatMissionIntake();
const context = { identityFactory: (prefix: string) => prefix + "-001", now: () => "2026-08-02T04:00:00.000Z" };

function open() {
  return intake.open({
    authenticatedOperatorRef: "operator-session@7",
    rawIntent: "  Help our support team resolve cases faster.  ",
    purpose: "Resolve support cases faster",
    suppliedClaims: ["Backlog is increasing"],
    authorityAssertions: ["I approve internal mission inquiry"],
    externalObligationAssertions: ["Customer data may be regulated"],
    attachmentRefs: ["operator-attachment@2"],
  }, "mission-001", context);
}

function inquiryFor(dossier = open()) {
  return createArtifact<CastellanInquiry>("CastellanInquiry", "Castellan", dossier.correlationId, {
    dossierRef: dossier.identity + "@" + dossier.version,
    questions: [
      { questionId: "Q-1", exactQuestion: "Which case types are in scope?", rationale: "Mission scope is unresolved.", answerRequired: true },
      { questionId: "Q-2", exactQuestion: "What outcome would count as success?", rationale: "Acceptance criteria are unresolved.", answerRequired: true },
    ],
  }, [dossier.identity + "@" + dossier.version], context);
}

describe("Secretariat reconstruction", () => {
  it("admits a complete exact-v2 Office Profile through Tribunalis and the assigned Senator", () => {
    expect(SECRETARIAT_PROFILE_CANDIDATE.payload.applications).toHaveLength(19);
    expect(SECRETARIAT_PROFILE_CANDIDATE.payload.coreDoctrineRef).toBe(ENACTED_CORE_DOCTRINE_V4.doctrine.identity + "@4");
    expect(SECRETARIAT_PROFILE_JUDGMENT).toMatchObject({ producer: "Tribunalis", payload: { result: "ACCEPTABLE" } });
    expect(SECRETARIAT_PROFILE_ADMISSION_DECISION.producer).toBe("Senator:senator-core-doctrine-001");
    expect(ADMITTED_SECRETARIAT_PROFILE).toMatchObject({ version: 2, payload: { state: "ADMITTED" } });
  });

  it("opens an exact dossier while preserving raw intent and keeping assertions unproven", () => {
    const dossier = open();
    expect(dossier.payload.rawIntent).toBe("  Help our support team resolve cases faster.  ");
    expect(dossier.payload.normalizedIntent).toBe("Help our support team resolve cases faster.");
    expect(dossier.payload.suppliedClaims).toEqual(["Backlog is increasing"]);
    expect(dossier.payload.authorityAssertions).toEqual(["I approve internal mission inquiry"]);
    expect(dossier.payload.externalObligationAssertions).toEqual(["Customer data may be regulated"]);
    expect(dossier.payload.state).toBe("AWAITING_CASTELLAN_INQUIRY");
    expect(dossier.payload.officeProfileRef).toBe(ADMITTED_SECRETARIAT_PROFILE.identity + "@2");
    expect(dossier.payload.lexiconRef).toBe("imperiumlexicon-core-v1@2");
    expect(dossier.governance).toMatchObject({
      coreDoctrineRef: "coredoctrine-core-v1@4",
      lexiconRef: "imperiumlexicon-core-v1@2",
      officeProfileRef: ADMITTED_SECRETARIAT_PROFILE.identity + "@2",
      vocabularyUses: expect.arrayContaining([
        { termId: "LEX-009", lexiconRef: "imperiumlexicon-core-v1@2", value: "mission_dossier" },
        { termId: "LEX-011", lexiconRef: "imperiumlexicon-core-v1@2", value: "secretariat" },
      ]),
    });
  });

  it("presents only exact Castellan questions and preserves their semantics", () => {
    const dossier = open();
    const inquiry = inquiryFor(dossier);
    const presented = intake.presentInquiry(dossier, inquiry);
    expect(presented.version).toBe(2);
    expect(presented.supersedes).toBe(dossier.identity + "@1");
    expect(presented.payload.presentedQuestions[0]).toMatchObject({
      questionId: "Q-1",
      exactQuestion: "Which case types are in scope?",
      customerFriendlyQuestion: "To make sure we understand your intent, Which case types are in scope?",
    });
    expect(presented.payload.state).toBe("AWAITING_OPERATOR");
  });

  it("records answers against exact question identities and returns readiness to Castellan", () => {
    const dossier = open();
    const presented = intake.presentInquiry(dossier, inquiryFor(dossier));
    const answered = intake.recordAnswers(presented, [
      { questionId: "Q-1", rawAnswer: "  Billing and account access. " },
      { questionId: "Q-2", rawAnswer: "Median resolution under four hours." },
    ]);
    expect(answered.payload.answers[0]).toEqual({ questionId: "Q-1", rawAnswer: "  Billing and account access. ", normalizedAnswer: "Billing and account access." });
    expect(answered.payload.state).toBe("READY_FOR_CASTELLAN_EVALUATION");
    expect(answered.supersedes).toBe(presented.identity + "@2");
    expect(intake.prepareCastellanHandoff(answered, context)).toMatchObject({
      artifactType: "SecretariatDossierHandoff",
      producer: "Secretariat",
      payload: { dossierRef: answered.identity + "@3", recipient: "Castellan", purpose: "MISSION_EVALUATION", authorityCreated: false },
    });
  });

  it("keeps missing or blank required answers awaiting the Operator", () => {
    const dossier = open();
    const presented = intake.presentInquiry(dossier, inquiryFor(dossier));
    expect(intake.recordAnswers(presented, [{ questionId: "Q-1", rawAnswer: " " }]).payload.state).toBe("AWAITING_OPERATOR");
  });

  it("refuses forged, stale, mismatched, duplicate, or unpresented inquiry data", () => {
    const dossier = open();
    expect(() => intake.presentInquiry(dossier, { ...inquiryFor(dossier), producer: "Secretariat" })).toThrow("exact current Castellan inquiry is required");
    expect(() => intake.presentInquiry(dossier, { ...inquiryFor(dossier), payload: { ...inquiryFor(dossier).payload, dossierRef: "other@1" } })).toThrow("inquiry does not target the exact current dossier");
    const presented = intake.presentInquiry(dossier, inquiryFor(dossier));
    expect(() => intake.recordAnswers(presented, [{ questionId: "Q-X", rawAnswer: "No" }])).toThrow("answer does not match a presented question");
    expect(() => intake.recordAnswers(presented, [{ questionId: "Q-1", rawAnswer: "A" }, { questionId: "Q-1", rawAnswer: "B" }])).toThrow("duplicate answer for question");
    expect(() => intake.presentInquiry(dossier, { ...inquiryFor(dossier), status: "SUPERSEDED" })).toThrow("exact current Castellan inquiry is required");
    const dialect = { ...dossier, governance: { ...dossier.governance, vocabularyUses: dossier.governance.vocabularyUses.map((use) => use.termId === "LEX-011" ? { ...use, value: "Secretariat" } : use) } };
    expect(() => intake.presentInquiry(dialect, inquiryFor(dialect))).toThrow("exact canonical snake_case");
  });

  it("exposes no research, judgment, deployment, supervision, or execution operation", () => {
    const methods = Object.getOwnPropertyNames(SecretariatMissionIntake.prototype);
    expect(methods.sort()).toEqual(["constructor", "open", "prepareCastellanHandoff", "presentInquiry", "recordAnswers"].sort());
  });

  it("refuses a Castellan handoff until every required answer is present", () => {
    const dossier = open();
    const presented = intake.presentInquiry(dossier, inquiryFor(dossier));
    expect(() => intake.prepareCastellanHandoff(presented)).toThrow("only a dossier ready for Castellan evaluation may be handed off");
  });
});
