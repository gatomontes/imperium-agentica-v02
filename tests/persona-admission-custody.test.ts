import { describe, expect, it } from "vitest";
import { createArtifact } from "../src/artifact.js";
import { CastellanPersonaAdmission, GarrisonPersonaCustody } from "../src/persona-admission-custody.js";
import { FoundryReleasePacket } from "../src/persona-production-disposition.js";
import { InProgressPersonaCandidate } from "../src/persona-production-intake.js";

const candidate = createArtifact<InProgressPersonaCandidate>("InProgressPersonaCandidate", "Artificer", "admission-001", {
  templateRef: "persona-template@0.1.0#sha256:synthetic", foundryEntryPacketRef: "entry@1",
  artificerQueueRef: "queue@1", hagiographyPacketRef: "research@1", queuePosition: 1,
  professionIdentity: "Certified Public Accountant",
  evidenceSections: { role: "CPA", identity: "Constructed professional", professionalMandate: "Review accounts",
    attributes: [{ name: "Discipline", behavioralExpression: "Checks", conditions: "Records", limits: "No invention", evidenceReference: "source@1" }],
    methods: [{ name: "Reconcile", application: "Compare", conditions: "Records", limits: "Disclose gaps", evidenceReference: "source@1" }],
    reasoning: { approach: "Evidence", evidenceStandard: "Traceable", uncertaintyBehavior: "Disclose" },
    communication: { style: "Direct", requiredDisclosures: "Uncertainty", prohibitedRepresentations: "Unsupported assurance" },
    interface: { expectedInputs: "Records", expectedOutputs: "Findings" }, acceptanceCriteria: ["Traceable"],
    authoredBy: "SANCTOGRAPHER", authenticationRef: "sanctographer@1" },
  doctrineSections: { governance: { authorizedConduct: "Review", mandatoryConduct: "Trace", prohibitedConduct: "Fabricate",
    refusalConditions: "No records", escalationTriggers: "Contradiction", stopConditions: "No authority" },
    authoredBy: "NOTARY", authenticationRef: "notary@1" },
  state: "READY_FOR_PIT", artificerAuthoredSubstance: false, artificerAuthenticationRef: "artificer@1",
}, [], { identityFactory: () => "candidate" });

const release = createArtifact<FoundryReleasePacket>("FoundryReleasePacket", "Artificer", "admission-001", {
  candidateRef: "candidate@1", pitDispatchRef: "dispatch@1", passingPitBriefRef: "pass@1",
  templateRef: candidate.payload.templateRef, professionIdentity: candidate.payload.professionIdentity,
  productionApproved: true, recipient: "CASTELLAN", admissionClaimed: false,
  artificerAuthenticationRef: "artificer@approval",
}, ["candidate@1", "dispatch@1", "pass@1"], { identityFactory: () => "release" });

describe("Castellan admission and Garrison custody", () => {
  it("admits the exact release and lets Garrison preserve it without adjudication", () => {
    const admission = new CastellanPersonaAdmission().decide(release, candidate, "ADMIT", "Complete and suitable for roster admission", "castellan@1", { identityFactory: () => "admission" });
    const custody = new GarrisonPersonaCustody().accept(admission, release, candidate, "garrison@1", { identityFactory: () => "custody" });
    expect(admission.payload).toMatchObject({ disposition: "ADMIT", recipient: "GARRISON", candidateRef: "candidate@1", releasePacketRef: "release@1" });
    expect(custody.payload).toMatchObject({ admittedBy: "CASTELLAN", custodyAccepted: true, rosterStatus: "AVAILABLE", admissionAdjudicatedByGarrison: false });
  });

  it("returns a rejected Persona to Foundry and bars Garrison custody", () => {
    const rejection = new CastellanPersonaAdmission().decide(release, candidate, "REJECT", "Not admitted to the roster", "castellan@2");
    expect(rejection.payload).toMatchObject({ disposition: "REJECT", recipient: "FOUNDRY" });
    expect(() => new GarrisonPersonaCustody().accept(rejection, release, candidate, "garrison@1")).toThrow("Castellan-admitted");
  });

  it("refuses a release that does not bind the exact candidate", () => {
    const altered = { ...candidate, identity: "altered-candidate" };
    expect(() => new CastellanPersonaAdmission().decide(release, altered, "ADMIT", "admit", "castellan@1")).toThrow("exact production-approved");
  });

  it("refuses custody when the admitted release is substituted", () => {
    const admission = new CastellanPersonaAdmission().decide(release, candidate, "ADMIT", "admit", "castellan@1");
    const substituted = { ...release, identity: "substituted-release" };
    expect(() => new GarrisonPersonaCustody().accept(admission, substituted, candidate, "garrison@1")).toThrow("exact Castellan-admitted");
  });
});
