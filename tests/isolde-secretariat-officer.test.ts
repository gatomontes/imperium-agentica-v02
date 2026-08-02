import { describe, expect, it } from "vitest";
import { CastellanMissionFormation } from "../src/castellan-mission-formation.js";
import { ADMITTED_ISOLDE, ISOLDE_ADMISSION_DECISION, ISOLDE_CANDIDATE } from "../src/isolde-officer-profile.js";
import { IntentFieldInterpretation, IsoldeCognitivePort, IsoldeSecretariatOfficer } from "../src/isolde-secretariat-officer.js";
import { CastellanInquiry, MissionInquiryQuestion, PresentedQuestion } from "../src/secretariat-mission-dossier.js";
import type { GovernedArtifactEnvelope } from "../src/artifact.js";

const context = { identityFactory: (p: string) => p + "-isolde-test", now: () => "2026-08-02T22:00:00.000Z" };
class FakeCognition implements IsoldeCognitivePort {
  interpretations: IntentFieldInterpretation[] = [
    { field: "purpose", value: "Reduce support resolution time", basis: "INFERRED", sourceExcerpt: "resolve support cases faster", rationale: "The requested improvement is expressed as faster case resolution." },
    { field: "supplied_claims", value: "The support backlog is growing", basis: "QUOTED", sourceExcerpt: "The support backlog is growing" },
  ];
  alterQuestion = false;
  interpretIntent() { return { interpretations: this.interpretations }; }
  renderInquiry(questions: MissionInquiryQuestion[]) { return questions.map((q) => ({ questionId: q.questionId, customerFriendlyQuestion: this.alterQuestion ? "Please explain something else." : "To help us prepare this correctly, " + q.exactQuestion })); }
  mapAnswers(questions: PresentedQuestion[], rawReply: string) { return questions.map((q) => ({ questionId: q.questionId, rawAnswer: rawReply + " — " + q.predicate })); }
}
const raw = "Please help us resolve support cases faster. The support backlog is growing.";
function asInquiry(value: ReturnType<CastellanMissionFormation["evaluate"]>) { if (!("questions" in value.payload)) throw new Error("expected inquiry"); return value as GovernedArtifactEnvelope<CastellanInquiry>; }

describe("Isolde, resident Secretariat Officer", () => {
  it("admits an exact Office-bound Persona under Imperator authority", () => {
    expect(ISOLDE_CANDIDATE.payload).toMatchObject({ officerId: "isolde", displayName: "Isolde", officeId: "Secretariat", role: "RESIDENT_OFFICER", state: "CANDIDATE" });
    expect(ISOLDE_CANDIDATE.governance.vocabularyUses).toEqual(expect.arrayContaining([{ termId: "LEX-021", value: "persona", lexiconRef: "imperiumlexicon-core-v1@3" }, { termId: "LEX-049", value: "officer", lexiconRef: "imperiumlexicon-core-v1@3" }]));
    expect(ISOLDE_ADMISSION_DECISION).toMatchObject({ producer: "Imperator", payload: { disposition: "ADMIT", authorityRef: "DR-086#imperator-approval" } });
    expect(ADMITTED_ISOLDE.payload).toMatchObject({ officerId: "isolde", state: "ADMITTED", officeProfileRef: "officedoctrineprofile-secretariat@2" });
  });

  it("opens a dossier through a governed interpretation while preserving raw Operator language", () => {
    const officer = new IsoldeSecretariatOfficer(new FakeCognition()); const { interpretation, dossier } = officer.openMission("operator-session@9", raw, "mission-isolde", context);
    expect(interpretation.payload.interpretations[0]).toMatchObject({ field: "purpose", basis: "INFERRED", sourceExcerpt: "resolve support cases faster" });
    expect(dossier.payload.rawIntent).toBe(raw); expect(dossier.payload.purpose).toBe("Reduce support resolution time");
    expect(dossier.payload.officerPersonaRef).toBe(ADMITTED_ISOLDE.identity + "@2"); expect(dossier.sourceRefs).toContain(interpretation.identity + "@1");
  });

  it("refuses unsupported or unattributed interpretation", () => {
    const cognition = new FakeCognition(); cognition.interpretations = [{ field: "purpose", value: "Sell more", basis: "INFERRED", sourceExcerpt: "resolve support cases faster" }];
    expect(() => new IsoldeSecretariatOfficer(cognition).openMission("operator@1", raw, "bad", context)).toThrow("inferred interpretation requires rationale");
    cognition.interpretations = [{ field: "purpose", value: "Sell more", basis: "QUOTED", sourceExcerpt: "words not spoken" }];
    expect(() => new IsoldeSecretariatOfficer(cognition).openMission("operator@1", raw, "bad", context)).toThrow("exact source excerpt");
  });

  it("presents Castellan questions conversationally without changing their exact semantic core", () => {
    const officer = new IsoldeSecretariatOfficer(new FakeCognition()); const opened = officer.openMission("operator@1", raw, "present", context); const inquiry = asInquiry(new CastellanMissionFormation().evaluate(opened.dossier, undefined, undefined, context));
    const result = officer.presentInquiry(opened.dossier, inquiry, context);
    expect(result.dossier.payload.presentedQuestions[0].customerFriendlyQuestion).toContain(inquiry.payload.questions[0].exactQuestion);
    expect(result.dossier.sourceRefs).toContain(result.presentation.identity + "@1");
  });

  it("refuses a friendly rendering that replaces Castellan's question", () => {
    const cognition = new FakeCognition(); cognition.alterQuestion = true; const officer = new IsoldeSecretariatOfficer(cognition); const opened = officer.openMission("operator@1", raw, "drift", context); const inquiry = asInquiry(new CastellanMissionFormation().evaluate(opened.dossier, undefined, undefined, context));
    expect(() => officer.presentInquiry(opened.dossier, inquiry, context)).toThrow("preserve every exact Castellan question verbatim");
  });

  it("maps raw replies to exact questions and reaches a lawful Castellan handoff", () => {
    const officer = new IsoldeSecretariatOfficer(new FakeCognition()); const opened = officer.openMission("operator@1", raw, "reply", context); const inquiry = asInquiry(new CastellanMissionFormation().evaluate(opened.dossier, undefined, undefined, context));
    const presented = officer.presentInquiry(opened.dossier, inquiry, context); const recorded = officer.recordReply(presented.dossier, "Here are my answers", context);
    expect(recorded.mapping.payload.rawReply).toBe("Here are my answers"); expect(recorded.dossier.payload.state).toBe("READY_FOR_CASTELLAN_EVALUATION");
    expect(recorded.dossier.sourceRefs).toContain(recorded.mapping.identity + "@1"); expect(officer.prepareCastellanHandoff(recorded.dossier, context).payload.dossierRef).toBe(recorded.dossier.identity + "@3");
  });

  it("exposes only Operator-interface cognition and Secretariat handoff operations", () => {
    expect(Object.getOwnPropertyNames(IsoldeSecretariatOfficer.prototype).sort()).toEqual(["constructor", "openMission", "prepareCastellanHandoff", "presentInquiry", "recordReply"].sort());
  });
});
