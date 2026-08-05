import { describe, expect, it } from "vitest";
import { createArtifact } from "../src/artifact.js";
import { InProgressPersonaCandidate, PersonaCandidatePitDispatch } from "../src/persona-production-intake.js";
import { PersonaPitExaminer, PitPressureResult } from "../src/persona-pit-examination.js";
import { personaCandidateDigest } from "../src/persona-integrity.js";

const candidate = createArtifact<InProgressPersonaCandidate>("InProgressPersonaCandidate", "Artificer", "pit-001", {
  templateRef: "persona-template@0.1.0#sha256:synthetic", foundryEntryPacketRef: "entry@1", artificerQueueRef: "queue@1", hagiographyPacketRef: "research@1",
  queuePosition: 1, professionIdentity: "Certified Public Accountant",
  evidenceSections: { role: "CPA", identity: "Constructed professional", professionalMandate: "Review accounts", attributes: [{ name: "Discipline", behavioralExpression: "Checks", conditions: "Records", limits: "No invention", evidenceReference: "source@1" }], methods: [{ name: "Reconcile", application: "Compare", conditions: "Records", limits: "Disclose gaps", evidenceReference: "source@1" }], reasoning: { approach: "Evidence", evidenceStandard: "Traceable", uncertaintyBehavior: "Disclose" }, communication: { style: "Direct", requiredDisclosures: "Uncertainty", prohibitedRepresentations: "Unsupported assurance" }, interface: { expectedInputs: "Records", expectedOutputs: "Findings" }, acceptanceCriteria: ["Traceable"], authoredBy: "SANCTOGRAPHER", authenticationRef: "sanctographer@1" },
  doctrineSections: { governance: { authorizedConduct: "Review", mandatoryConduct: "Trace", prohibitedConduct: "Fabricate", refusalConditions: "No records", escalationTriggers: "Contradiction", stopConditions: "No authority" }, authoredBy: "NOTARY", authenticationRef: "notary@1" },
  state: "READY_FOR_PIT", artificerAuthoredSubstance: false, artificerAuthenticationRef: "artificer@1",
}, ["candidate-predecessor@1"], { identityFactory: () => "candidate" });
const dispatch = createArtifact<PersonaCandidatePitDispatch>("PersonaCandidatePitDispatch", "Artificer", "pit-001", {
  candidateRef: "candidate@1", candidateDigest: personaCandidateDigest(candidate), templateRef: candidate.payload.templateRef, queuePosition: 1, professionIdentity: candidate.payload.professionIdentity,
  recipient: "PIT", purpose: "PERSONA_EXAMINATION", admissionClaimed: false,
}, ["candidate@1", personaCandidateDigest(candidate), candidate.payload.templateRef], { identityFactory: () => "dispatch" });
const axes: PitPressureResult["axis"][] = ["COMPETENCE", "GOVERNANCE", "EVIDENCE", "UNCERTAINTY", "REFUSAL", "TRAITS", "COHERENCE"];
const passing = axes.map((axis) => ({ axis, passed: true, evidence: `${axis} pressure passed` } satisfies PitPressureResult));

describe("Persona Pit examination", () => {
  it("returns PASS to Foundry without claiming admission", () => {
    const brief = new PersonaPitExaminer().examine(dispatch, candidate, passing, "pit-agent@1", { identityFactory: () => "brief" });
    expect(brief.payload).toMatchObject({ candidateDigest: personaCandidateDigest(candidate), candidateRef: "candidate@1", finding: "PASS", recipient: "FOUNDRY", repairTargets: [], admissionClaimed: false });
  });
  it("returns FAIL and attributable repair targets to Artificer", () => {
    const results = passing.map((result) => result.axis === "GOVERNANCE" ? { ...result, passed: false, defect: "refusal boundary fails under pressure", repairTarget: "NOTARY" as const } : result);
    const brief = new PersonaPitExaminer().examine(dispatch, candidate, results, "pit-agent@1", { identityFactory: () => "brief" });
    expect(brief.payload).toMatchObject({ finding: "FAIL", recipient: "ARTIFICER", repairTargets: [{ axis: "GOVERNANCE", responsibleAuthor: "NOTARY" }], admissionClaimed: false });
  });
  it("refuses a content-substituted candidate even when identity and version are preserved", () => {
    const altered = { ...candidate, payload: { ...candidate.payload, professionIdentity: "Altered" } };
    expect(() => new PersonaPitExaminer().examine(dispatch, altered, passing, "pit-agent@1")).toThrow("exact current Artificer-dispatched");
  });
  it("refuses incomplete examination or unattributed failure", () => {
    expect(() => new PersonaPitExaminer().examine(dispatch, candidate, passing.slice(1), "pit-agent@1")).toThrow("every examination axis");
    const results = passing.map((result) => result.axis === "TRAITS" ? { ...result, passed: false } : result);
    expect(() => new PersonaPitExaminer().examine(dispatch, candidate, results, "pit-agent@1")).toThrow("explicit defect and responsible repair target");
  });
});
