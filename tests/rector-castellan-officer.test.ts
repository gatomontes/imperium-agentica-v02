import { describe, expect, it } from "vitest";
import { ADMITTED_CASTELLAN_PROFILE } from "../src/castellan-doctrine-profile.js";
import { PredicateDetermination } from "../src/castellan-mission-formation.js";
import { ADMITTED_RECTOR, RECTOR_ADMISSION_DECISION, RECTOR_CANDIDATE } from "../src/rector-officer-profile.js";
import { RECTOR_COGNITIVE_PORT, RectorCastellanOfficer, RectorCognitivePort } from "../src/rector-castellan-officer.js";
import { SecretariatMissionIntake } from "../src/secretariat-mission-dossier.js";
import type { CastellanInquiry } from "../src/secretariat-mission-dossier.js";
import type { GovernedArtifactEnvelope } from "../src/artifact.js";

const context = { identityFactory: (prefix: string) => prefix + "-rector-test", now: () => "2026-08-03T06:00:00.000Z" };
const intake = new SecretariatMissionIntake();
function open() { return intake.open({ authenticatedOperatorRef: "operator@1", rawIntent: "Improve support" }, "rector-mission", context); }
class FakeRectorCognition implements RectorCognitivePort {
  disposition: Partial<Record<string, PredicateDetermination["disposition"]>> = {};
  assessMissionPredicates(dossier: Parameters<RectorCognitivePort["assessMissionPredicates"]>[0]) { return { determinations: dossier.presentedQuestions.map((question) => { const none = ["constraints", "unknowns", "material_contradictions"].includes(question.predicate); const disposition = this.disposition[question.predicate] ?? (none ? "DECLARED_NONE" : "RESOLVED"); return { questionId: question.questionId, predicate: question.predicate, disposition, values: disposition === "RESOLVED" ? [question.predicate === "purpose" ? "Improve support" : "Resolved " + question.predicate] : [], rationale: disposition === "DECLARED_NONE" ? "Operator explicitly declared none." : "The exact answer resolves the predicate." }; }) }; }
}
function answered(officer: RectorCastellanOfficer) { const dossier = open(); const result = officer.initiateInquiry(dossier, context); if (!("questions" in result.payload)) throw new Error("expected inquiry"); const inquiry = result as GovernedArtifactEnvelope<CastellanInquiry>; const presented = intake.presentInquiry(dossier, inquiry); const complete = intake.recordAnswers(presented, inquiry.payload.questions.map((question) => ({ questionId: question.questionId, rawAnswer: "Answer for " + question.predicate }))); return { dossier: complete, handoff: intake.prepareCastellanHandoff(complete, context) }; }

describe("Rector, resident Castellan Officer", () => {
  it("admits Rector under the exact Castellan Profile by Imperator authority", () => {
    expect(RECTOR_CANDIDATE.payload).toMatchObject({ officerId: "rector", displayName: "Rector", officeId: "Castellan", officeProfileRef: ADMITTED_CASTELLAN_PROFILE.identity + "@2", state: "CANDIDATE" });
    expect(RECTOR_ADMISSION_DECISION).toMatchObject({ producer: "Imperator", payload: { authorityRef: "DR-091#imperator-approval", disposition: "ADMIT" } });
    expect(ADMITTED_RECTOR.payload).toMatchObject({ state: "ADMITTED", officeProfileRef: ADMITTED_CASTELLAN_PROFILE.identity + "@2" });
  });

  it("declares one provider-neutral Cognitive Port with no model, provider, or credential", () => {
    expect(RECTOR_COGNITIVE_PORT.payload).toMatchObject({ portId: "rector.mission_formation.v1", operations: ["assess_mission_predicates"] });
    expect(JSON.stringify(RECTOR_COGNITIVE_PORT.payload)).not.toMatch(/providerRef|modelRef|credentialLease|api[_-]?key/i);
  });

  it("initiates mandatory inquiry through Castellan without contacting the Operator", () => {
    const inquiry = new RectorCastellanOfficer(new FakeRectorCognition()).initiateInquiry(open(), context);
    expect(inquiry).toMatchObject({ artifactType: "CastellanInquiry", producer: "Castellan" });
    expect((inquiry.payload as { questions: unknown[] }).questions).toHaveLength(8);
  });

  it("turns Rector cognition into a governed interpretation and candidate specification", () => {
    const officer = new RectorCastellanOfficer(new FakeRectorCognition()); const { dossier, handoff } = answered(officer); const result = officer.evaluateHandoff(dossier, handoff, context);
    expect(result.interpretation).toMatchObject({ producer: "Rector", payload: { officerPersonaRef: ADMITTED_RECTOR.identity + "@2", dossierRef: dossier.identity + "@3", researchPerformed: false, judgmentRendered: false, authorityCreated: false } });
    expect(result.assessment.sourceRefs).toContain(result.interpretation.identity + "@1");
    expect(result.result).toMatchObject({ artifactType: "MissionSpecificationCandidate", producer: "Castellan", payload: { state: "CANDIDATE", authorityCreated: false } });
  });

  it.each(["AMBIGUOUS", "CONTRADICTORY", "UNUSABLE"] as const)("returns %s cognition to further inquiry", (disposition) => {
    const cognition = new FakeRectorCognition(); cognition.disposition.scope = disposition; const officer = new RectorCastellanOfficer(cognition); const { dossier, handoff } = answered(officer); const result = officer.evaluateHandoff(dossier, handoff, context);
    expect(result.result.artifactType).toBe("CastellanInquiry");
  });

  it("refuses incomplete, invented, or mismatched cognitive determinations", () => {
    const cognition = new FakeRectorCognition(); const officer = new RectorCastellanOfficer(cognition); const { dossier, handoff } = answered(officer);
    const original = cognition.assessMissionPredicates.bind(cognition); cognition.assessMissionPredicates = (value) => ({ determinations: original(value).determinations.slice(1) });
    expect(() => officer.evaluateHandoff(dossier, handoff, context)).toThrow("exactly one determination");
    cognition.assessMissionPredicates = (value) => ({ determinations: original(value).determinations.map((item, index) => index ? item : { ...item, questionId: "invented" }) });
    expect(() => officer.evaluateHandoff(dossier, handoff, context)).toThrow("exact answered question");
    expect(() => officer.evaluateHandoff(dossier, { ...handoff, payload: { ...handoff.payload, dossierRef: "other@1" } }, context)).toThrow("exact matching Secretariat handoff");
  });

  it("rejects bad receipt before invoking Rector cognition", () => {
    let calls = 0; const cognition: RectorCognitivePort = { assessMissionPredicates: () => { calls += 1; return { determinations: [] }; } }; const officer = new RectorCastellanOfficer(cognition); const baseline = answered(new RectorCastellanOfficer(new FakeRectorCognition()));
    expect(() => officer.evaluateHandoff(baseline.dossier, { ...baseline.handoff, payload: { ...baseline.handoff.payload, dossierRef: "other@1" } }, context)).toThrow("exact matching Secretariat handoff"); expect(calls).toBe(0);
  });

  it("does not expose the governed dossier payload to adapter mutation", () => {
    const baselineOfficer = new RectorCastellanOfficer(new FakeRectorCognition()); const baseline = answered(baselineOfficer); const purpose = baseline.dossier.payload.normalizedIntent;
    const cognition = new FakeRectorCognition(); cognition.assessMissionPredicates = (payload) => { payload.normalizedIntent = "mutated"; return FakeRectorCognition.prototype.assessMissionPredicates.call(cognition, payload); };
    new RectorCastellanOfficer(cognition).evaluateHandoff(baseline.dossier, baseline.handoff, context); expect(baseline.dossier.payload.normalizedIntent).toBe(purpose);
  });

  it("exposes only mission inquiry and handoff evaluation operations", () => {
    expect(Object.getOwnPropertyNames(RectorCastellanOfficer.prototype).sort()).toEqual(["constructor", "evaluateHandoff", "initiateInquiry"].sort());
  });
});
