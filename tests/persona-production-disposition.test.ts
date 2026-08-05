import { describe, expect, it } from "vitest";
import { createArtifact } from "../src/artifact.js";
import { ArtificerPersonaDisposition } from "../src/persona-production-disposition.js";
import { InProgressPersonaCandidate, PersonaCandidatePitDispatch } from "../src/persona-production-intake.js";
import { PersonaPitBrief } from "../src/persona-pit-examination.js";

const candidate = createArtifact<InProgressPersonaCandidate>("InProgressPersonaCandidate", "Artificer", "repair-001", {
  templateRef: "persona-template@0.1.0#sha256:synthetic", foundryEntryPacketRef: "entry@1", artificerQueueRef: "queue@1", hagiographyPacketRef: "research@1",
  queuePosition: 1, professionIdentity: "Certified Public Accountant",
  evidenceSections: { role: "CPA", identity: "Constructed professional", professionalMandate: "Review accounts", attributes: [{ name: "Discipline", behavioralExpression: "Checks", conditions: "Records", limits: "No invention", evidenceReference: "source@1" }], methods: [{ name: "Reconcile", application: "Compare", conditions: "Records", limits: "Disclose gaps", evidenceReference: "source@1" }], reasoning: { approach: "Evidence", evidenceStandard: "Traceable", uncertaintyBehavior: "Disclose" }, communication: { style: "Direct", requiredDisclosures: "Uncertainty", prohibitedRepresentations: "Unsupported assurance" }, interface: { expectedInputs: "Records", expectedOutputs: "Findings" }, acceptanceCriteria: ["Traceable"], authoredBy: "SANCTOGRAPHER", authenticationRef: "sanctographer@1" },
  doctrineSections: { governance: { authorizedConduct: "Review", mandatoryConduct: "Trace", prohibitedConduct: "Fabricate", refusalConditions: "No records", escalationTriggers: "Contradiction", stopConditions: "No authority" }, authoredBy: "NOTARY", authenticationRef: "notary@1" },
  state: "READY_FOR_PIT", artificerAuthoredSubstance: false, artificerAuthenticationRef: "artificer@1",
}, [], { identityFactory: () => "candidate" });
const dispatch = createArtifact<PersonaCandidatePitDispatch>("PersonaCandidatePitDispatch", "Artificer", "repair-001", {
  candidateRef: "candidate@1", templateRef: candidate.payload.templateRef, queuePosition: 1, professionIdentity: candidate.payload.professionIdentity,
  recipient: "PIT", purpose: "PERSONA_EXAMINATION", admissionClaimed: false,
}, ["candidate@1"], { identityFactory: () => "dispatch" });
const failed = createArtifact<PersonaPitBrief>("PersonaPitBrief", "Pit", "repair-001", {
  dispatchRef: "dispatch@1", candidateRef: "candidate@1", candidateTemplateRef: candidate.payload.templateRef,
  examination: [], finding: "FAIL", repairTargets: [{ axis: "GOVERNANCE", defect: "weak refusal", responsibleAuthor: "NOTARY" }],
  recipient: "ARTIFICER", pitAuthenticationRef: "pit@1", admissionClaimed: false,
}, ["dispatch@1", "candidate@1"], { identityFactory: () => "failed" });
const passing = createArtifact<PersonaPitBrief>("PersonaPitBrief", "Pit", "repair-001", {
  dispatchRef: "dispatch@1", candidateRef: "candidate@1", candidateTemplateRef: candidate.payload.templateRef,
  examination: [], finding: "PASS", repairTargets: [], recipient: "FOUNDRY", pitAuthenticationRef: "pit@2", admissionClaimed: false,
}, ["dispatch@1", "candidate@1"], { identityFactory: () => "passing" });

describe("Persona repair and Foundry production approval", () => {
  it("routes failure and creates a new immutable candidate version for full retest", () => {
    const disposition = new ArtificerPersonaDisposition();
    const commission = disposition.routeFailure(failed, candidate, { identityFactory: () => "repair" });
    const repairedDoctrine = { ...candidate.payload.doctrineSections!, authenticationRef: "notary@2" };
    const repaired = disposition.completeRepair(candidate, failed, commission, { doctrineSections: repairedDoctrine }, "artificer@2");
    expect(repaired).toMatchObject({ identity: "candidate", version: 2, supersedes: "candidate@1" });
    expect(repaired.sourceRefs).toEqual(expect.arrayContaining(["candidate@1", "failed@1", "repair@1", "notary@2"]));
    expect(commission.payload.fullRetestRequired).toBe(true);
  });

  it("refuses a targeted repair without new authentication from the responsible author", () => {
    const disposition = new ArtificerPersonaDisposition();
    const commission = disposition.routeFailure(failed, candidate);
    expect(() => disposition.completeRepair(candidate, failed, commission, {}, "artificer@2")).toThrow("newly authenticated doctrine");
  });

  it("approves production only for the exact candidate-dispatch-PASS chain", () => {
    const release = new ArtificerPersonaDisposition().approveProduction(dispatch, candidate, passing, "artificer@approval", { identityFactory: () => "release" });
    expect(release.payload).toMatchObject({ candidateRef: "candidate@1", pitDispatchRef: "dispatch@1", passingPitBriefRef: "passing@1", productionApproved: true, recipient: "CASTELLAN", admissionClaimed: false });
  });

  it("refuses production approval for a failed examination", () => {
    expect(() => new ArtificerPersonaDisposition().approveProduction(dispatch, candidate, failed, "artificer@approval")).toThrow("passing Pit brief");
  });
});
