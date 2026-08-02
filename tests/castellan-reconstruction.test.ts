import { describe, expect, it } from "vitest";
import { CastellanMissionFormation } from "../src/castellan-mission-formation.js";
import { ADMITTED_CASTELLAN_PROFILE, CASTELLAN_PROFILE_CANDIDATE, CASTELLAN_PROFILE_JUDGMENT } from "../src/castellan-doctrine-profile.js";
import { SecretariatMissionIntake } from "../src/secretariat-mission-dossier.js";
import type { CastellanInquiry } from "../src/secretariat-mission-dossier.js";
import type { GovernedArtifactEnvelope } from "../src/artifact.js";

const intake = new SecretariatMissionIntake();
const castellan = new CastellanMissionFormation();
const context = { identityFactory: (p: string) => p + "-test", now: () => "2026-08-02T16:00:00.000Z" };
function initial() { return intake.open({ authenticatedOperatorRef: "operator@1", rawIntent: "Improve support", purpose: "Improve support", suppliedClaims: ["Backlog grew"], assumptions: ["Current tools remain"], unknowns: ["Volume"], materialContradictions: ["Speed and zero automation"], authorityAssertions: ["Internal inquiry approved"], externalObligationAssertions: ["Privacy rules may apply"] }, "mission-test", context); }

describe("Castellan reconstruction", () => {
  it("admits an exact Doctrine v5 and Lexicon v3 Office Profile", () => {
    expect(CASTELLAN_PROFILE_CANDIDATE.payload.applications).toHaveLength(19);
    expect(CASTELLAN_PROFILE_CANDIDATE.payload.terminologyGateEvidenceRefs).toEqual(["tests/castellan-reconstruction.test.ts"]);
    expect(CASTELLAN_PROFILE_JUDGMENT.payload.result).toBe("ACCEPTABLE");
    expect(ADMITTED_CASTELLAN_PROFILE.payload).toMatchObject({ state: "ADMITTED", coreDoctrineRef: "coredoctrine-core-v1@5", lexiconRef: "imperiumlexicon-core-v1@3" });
  });

  it("asks Secretariat exact questions for every unresolved mission-formation predicate", () => {
    const dossier = initial();
    const result = castellan.evaluate(dossier, undefined, context);
    expect(result.artifactType).toBe("CastellanInquiry");
    if (!("questions" in result.payload)) return;
    expect(result.payload.questions.map((q) => q.predicate)).toEqual(["scope", "constraints", "acceptance_criteria", "requested_outputs"]);
    expect(result.governance.vocabularyUses).toEqual(expect.arrayContaining([{ termId: "LEX-046", value: "inquiry", lexiconRef: "imperiumlexicon-core-v1@3" }]));
    expect(result.sourceRefs).toContain(dossier.identity + "@1");
  });

  it("forms a candidate only after Secretariat records answers and issues the exact handoff", () => {
    const dossier = initial();
    const inquiry = castellan.evaluate(dossier, undefined, context);
    if (!("questions" in inquiry.payload)) throw new Error("expected inquiry");
    const inquiryArtifact = inquiry as GovernedArtifactEnvelope<CastellanInquiry>;
    const presented = intake.presentInquiry(dossier, inquiryArtifact);
    const answered = intake.recordAnswers(presented, inquiry.payload.questions.map((q) => ({ questionId: q.questionId, rawAnswer: q.predicate === "constraints" ? "None declared" : "Operator answer for " + q.predicate })));
    expect(() => castellan.evaluate(answered, undefined, context)).toThrow("exact Secretariat handoff is required");
    const handoff = intake.prepareCastellanHandoff(answered, context);
    const result = castellan.evaluate(answered, handoff, context);
    expect(result).toMatchObject({ artifactType: "MissionSpecificationCandidate", producer: "Castellan", payload: { state: "CANDIDATE", authorityCreated: false, purpose: "Improve support", suppliedClaims: ["Backlog grew"], authorityAssertions: ["Internal inquiry approved"] } });
    expect(result.sourceRefs).toEqual(expect.arrayContaining([answered.identity + "@3", handoff.identity + "@1"]));
  });

  it("refuses mismatched handoff and dialect vocabulary", () => {
    const complete = intake.open({ authenticatedOperatorRef: "operator@1", rawIntent: "Improve support", purpose: "Improve support", scope: ["Support"], constraints: ["None"], acceptanceCriteria: ["Under four hours"], requestedOutputs: ["Plan"] }, "complete", context);
    const ready = { ...complete, payload: { ...complete.payload, state: "READY_FOR_CASTELLAN_EVALUATION" as const } };
    const handoff = intake.prepareCastellanHandoff(ready, context);
    expect(() => castellan.evaluate(ready, { ...handoff, payload: { ...handoff.payload, dossierRef: "other@1" } }, context)).toThrow("exact matching Secretariat handoff");
    const dialect = { ...ready, governance: { ...ready.governance, vocabularyUses: ready.governance.vocabularyUses.map((u) => u.termId === "LEX-011" ? { ...u, value: "Secretariat" } : u) } };
    expect(() => castellan.evaluate(dialect, handoff, context)).toThrow("exact canonical snake_case");
  });

  it("exposes no research, judgment, deployment, supervision, or execution operation", () => {
    expect(Object.getOwnPropertyNames(CastellanMissionFormation.prototype).sort()).toEqual(["constructor", "evaluate", "inquire"].sort());
  });
});
