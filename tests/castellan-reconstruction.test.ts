import { describe, expect, it } from "vitest";
import { CastellanMissionFormation, CastellanOperatingLayer, PredicateDetermination } from "../src/castellan-mission-formation.js";
import { ADMITTED_CASTELLAN_PROFILE, CASTELLAN_PROFILE_ADMISSION_DECISION, CASTELLAN_PROFILE_CANDIDATE } from "../src/castellan-doctrine-profile.js";
import { SecretariatMissionIntake } from "../src/secretariat-mission-dossier.js";
import type { CastellanInquiry } from "../src/secretariat-mission-dossier.js";
import type { GovernedArtifactEnvelope } from "../src/artifact.js";

const intake = new SecretariatMissionIntake(); const castellan = new CastellanMissionFormation(); const operatingLayer = new CastellanOperatingLayer();
const context = { identityFactory: (p: string) => p + "-test", now: () => "2026-08-02T19:00:00.000Z" };
function open(complete = false) { return intake.open({ authenticatedOperatorRef: "operator@1", rawIntent: "Improve support", purpose: complete ? "Improve support" : undefined, scope: complete ? ["Support"] : [], constraints: complete ? ["No external action"] : [], acceptanceCriteria: complete ? ["Resolution under four hours"] : [], requestedOutputs: complete ? ["Plan"] : [], suppliedClaims: ["Backlog grew"], assumptions: ["Current tools remain"], unknowns: ["Volume"], materialContradictions: ["Speed and zero automation"], authorityAssertions: ["Internal inquiry approved"], externalObligationAssertions: ["Privacy rules may apply"] }, "mission-test", context); }
function inquiryFor(dossier = open()) { const result = castellan.evaluate(dossier, undefined, undefined, context); if (!("questions" in result.payload)) throw new Error("expected inquiry"); return result as GovernedArtifactEnvelope<CastellanInquiry>; }
function answerAndHandoff(dossier = open()) { const inquiry = inquiryFor(dossier); const presented = intake.presentInquiry(dossier, inquiry); const answered = intake.recordAnswers(presented, inquiry.payload.questions.map((q) => ({ questionId: q.questionId, rawAnswer: "Operator answer for " + q.predicate }))); return { inquiry, answered, handoff: intake.prepareCastellanHandoff(answered, context) }; }
function determinations(dossier: ReturnType<typeof open>, disposition: Partial<Record<string, PredicateDetermination["disposition"]>> = {}): PredicateDetermination[] { return dossier.payload.presentedQuestions.map((q) => { const declaredNone = q.predicate === "constraints" || q.predicate === "unknowns" || q.predicate === "material_contradictions"; const selected = disposition[q.predicate] ?? (declaredNone ? "DECLARED_NONE" : "RESOLVED"); return { questionId: q.questionId, predicate: q.predicate, disposition: selected, values: selected === "RESOLVED" ? [q.predicate === "purpose" ? "Improve support" : "Resolved " + q.predicate] : [], rationale: selected === "DECLARED_NONE" ? "Operator explicitly declared none." : "Operating layer found the answer exact and usable." }; }); }

describe("Castellan reconstruction correction", () => {
  it("admits through the assigned Senator with provision-specific evidence and no judgment dependency", () => {
    expect(CASTELLAN_PROFILE_CANDIDATE.payload.applications).toHaveLength(19);
    expect(new Set(CASTELLAN_PROFILE_CANDIDATE.payload.applications.map((a) => a.applicationRule)).size).toBe(19);
    expect(CASTELLAN_PROFILE_ADMISSION_DECISION.payload.conformanceJudgmentRef).toBeUndefined();
    expect(CASTELLAN_PROFILE_ADMISSION_DECISION.payload.conformanceEvidenceRefs).toEqual(["tests/castellan-reconstruction.test.ts", "reviews/castellan-blackquill-correction-review-001.md"]);
    expect(ADMITTED_CASTELLAN_PROFILE.payload).toMatchObject({ state: "ADMITTED", coreDoctrineRef: "coredoctrine-core-v1@5", lexiconRef: "imperiumlexicon-core-v1@3" });
    expect(ADMITTED_CASTELLAN_PROFILE.payload.conformanceJudgmentRef).toBeUndefined();
  });

  it("always inquires into intent, even when Secretariat intake appears complete", () => {
    const result = inquiryFor(open(true));
    expect(result.payload.questions.map((q) => q.predicate)).toEqual(["purpose", "scope", "constraints", "acceptance_criteria", "requested_outputs", "unknowns", "material_contradictions", "resource_requirements"]);
  });

  it("forms a candidate only through lawful answer, handoff, and cognitive-assessment lineage", () => {
    const { answered, handoff } = answerAndHandoff();
    expect(() => castellan.evaluate(answered, handoff, undefined, context)).toThrow("predicate assessment is required");
    const assessment = operatingLayer.recordAssessment(answered, handoff, determinations(answered), context);
    const result = castellan.evaluate(answered, handoff, assessment, context);
    expect(result).toMatchObject({ artifactType: "MissionSpecificationCandidate", payload: { purpose: "Improve support", constraints: [], unknowns: [], materialContradictions: [], unresolvedPredicates: [], authorityCreated: false } });
    expect(result.sourceRefs).toEqual(expect.arrayContaining([answered.identity + "@3", handoff.identity + "@1", assessment.identity + "@1"]));
  });

  it.each(["AMBIGUOUS", "CONTRADICTORY", "UNUSABLE"] as const)("issues further inquiry when an answer is %s", (bad) => {
    const { answered, handoff } = answerAndHandoff(); const assessment = operatingLayer.recordAssessment(answered, handoff, determinations(answered, { scope: bad }), context);
    const result = castellan.evaluate(answered, handoff, assessment, context); if (!("questions" in result.payload)) throw new Error("expected follow-up inquiry");
    expect(result.payload.questions.find((q) => q.predicate === "scope")?.exactQuestion).toContain("previous answer was not usable");
  });

  it("does not allow unresolved unknowns or contradictions to disappear", () => {
    const { answered, handoff } = answerAndHandoff(); const assessment = operatingLayer.recordAssessment(answered, handoff, determinations(answered, { unknowns: "RESOLVED" }), context);
    const result = castellan.evaluate(answered, handoff, assessment, context); expect(result.artifactType).toBe("CastellanInquiry");
  });

  it("refuses forged lifecycle state, stale profile lineage, mismatched handoff, and incomplete assessments", () => {
    const dossier = open(true); expect(() => intake.prepareCastellanHandoff(dossier)).toThrow("only a dossier ready");
    const { answered, handoff } = answerAndHandoff(dossier);
    expect(() => castellan.evaluate(answered, { ...handoff, payload: { ...handoff.payload, dossierRef: "other@1" } }, undefined, context)).toThrow("exact matching Secretariat handoff");
    const stale = { ...answered, payload: { ...answered.payload, officeProfileRef: "secretariat-old@1" } }; expect(() => castellan.evaluate(stale, handoff, undefined, context)).toThrow("Secretariat profile is stale");
    expect(() => operatingLayer.recordAssessment(answered, handoff, determinations(answered).slice(1), context)).toThrow("exactly one determination");
  });

  it("keeps mission formation free of research, judgment, deployment, supervision, and execution operations", () => {
    expect(Object.getOwnPropertyNames(CastellanMissionFormation.prototype)).toEqual(["constructor", "evaluate"]);
    expect(Object.getOwnPropertyNames(CastellanOperatingLayer.prototype)).toEqual(["constructor", "recordAssessment"]);
  });
});
