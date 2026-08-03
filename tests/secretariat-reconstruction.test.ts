import { describe, expect, it } from "vitest";
import { createArtifact } from "../src/artifact.js";
import { ADMITTED_SECRETARIAT_PROFILE } from "../src/secretariat-doctrine-profile.js";
import { CastellanInquiry, SecretariatMissionIntake } from "../src/secretariat-mission-dossier.js";
const context = { identityFactory: (p: string) => p + "-secretariat-test", now: () => "2026-08-03T07:00:00.000Z" }; const intake = new SecretariatMissionIntake();
function open() { return intake.open({ authenticatedOperatorRef: "operator@1", rawIntent: " exact raw intent ", residentOfficerContractRef: "officer@2" }, "single-turn", context); }
function inquiry(d = open()) { return createArtifact<CastellanInquiry>("CastellanInquiry", "Castellan", d.correlationId, { dossierRef: d.identity + "@" + d.version, question: { questionId: "Q1", predicate: "purpose", exactQuestion: "What outcome?", rationale: "Purpose required.", answerRequired: true } }, [d.identity + "@" + d.version], context); }
describe("Secretariat single-turn dossier", () => {
  it("opens exact current governed transport state", () => { const d = open(); expect(d.payload).toMatchObject({ rawIntent: " exact raw intent ", state: "AWAITING_CASTELLAN_INQUIRY", officeProfileRef: ADMITTED_SECRETARIAT_PROFILE.identity + "@2" }); });
  it("refuses a batch inquiry", () => { const d = open(); const forged = { ...inquiry(d), payload: { dossierRef: d.identity + "@1", questions: [inquiry(d).payload.question, inquiry(d).payload.question] } } as unknown as ReturnType<typeof inquiry>; expect(() => intake.presentInquiry(d, forged)).toThrow(); });
  it("records exactly one active response and permits immediate handoff", () => { const d = open(), p = intake.presentInquiry(d, inquiry(d)); expect(() => intake.recordAnswers(p, [])).toThrow("exactly one"); expect(() => intake.recordAnswers(p, [{ questionId: "Q1", rawAnswer: "A" }, { questionId: "Q1", rawAnswer: "B" }])).toThrow("exactly one"); const a = intake.recordAnswers(p, [{ questionId: "Q1", rawAnswer: " A " }]); expect(a.payload.answers.at(-1)?.rawAnswer).toBe(" A "); expect(intake.prepareCastellanHandoff(a, context).payload.dossierRef).toBe(a.identity + "@3"); });
  it("has no semantic interpretation or multi-answer operation", () => { expect(Object.getOwnPropertyNames(SecretariatMissionIntake.prototype).sort()).toEqual(["constructor", "open", "prepareCastellanHandoff", "presentInquiry", "recordAnswers", "recordCastellanDisposition"].sort()); });
});
