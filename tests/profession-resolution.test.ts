import { describe, expect, it } from "vitest";
import { createArtifact } from "../src/artifact.js";
import { ProfessionSpecification } from "../src/guildhall.js";
import { ProfessionAdjudicationPacket } from "../src/guildhall-mission-committee.js";
import { GuildhallProfessionRegistry, digestProfessionSpecification } from "../src/profession-resolution.js";
import { ADMITTED_GUILDMASTER_AGENT } from "../src/guildmaster-agent-definition.js";

const guildmasterRef = `${ADMITTED_GUILDMASTER_AGENT.identity}@${ADMITTED_GUILDMASTER_AGENT.version}`;

function queue(...identities: string[]) {
  return createArtifact<ProfessionAdjudicationPacket>("ProfessionAdjudicationPacket", "Guildmaster", "resolution-001", {
    missionSpecificationCandidateRef: "mission@1", recommendationPacketRef: "recommendation@1", finding: "PROFESSION_QUEUE_RECOMMENDED",
    decisions: identities.map((professionIdentity) => ({ professionIdentity, disposition: "ADMIT", rationale: "distinct contribution" })),
    queue: identities.map((professionIdentity, index) => ({ position: index + 1, professionIdentity, contribution: "Professional capacity to contribute", rationale: "required", collaborationMode: "INDEPENDENT", dependsOn: [] })),
    capabilityRequirements: [], toolOrAccessRequirements: [], peopleSelected: false, operativesSelected: false, officersSelected: false,
    suitabilityDetermined: true, guildmasterAgentDefinitionRef: guildmasterRef,
  }, ["mission@1", "recommendation@1", guildmasterRef], { identityFactory: () => "adjudicated-queue" });
}

function profession(identity: string) {
  const candidate = createArtifact<ProfessionSpecification>("ProfessionSpecification", "Guildhall", "profession-catalogue", {
    professionIdentity: identity, requiredCompetence: ["domain competence"], practiceBoundaries: ["remain within domain"], suitabilityCriteria: ["demonstrated competence"], workSpecificationRef: "originating-work@1", finding: "PROFESSION_CONFORMANT",
  }, ["originating-work@1"], { identityFactory: () => `profession-${identity.toLowerCase().replaceAll(" ", "-")}` });
  return { ...candidate, version: 2, supersedes: `${candidate.identity}@1`, payload: { ...candidate.payload, admissionState: "ADMITTED" as const, admissionAuthorityRef: guildmasterRef, reuseScope: "PROFESSION_WIDE" as const }, sourceRefs: [...candidate.sourceRefs, `${candidate.identity}@1`, guildmasterRef] };
}

describe("Guildhall profession resolution", () => {
  it("reuses an exact admitted Profession Specification with version and digest lineage", () => {
    const dataScientist = profession("Data Scientist");
    const result = new GuildhallProfessionRegistry([dataScientist]).resolve(queue("Data Scientist"));
    expect(result.payload.finding).toBe("ALL_PROFESSIONS_RESOLVED");
    expect(result.payload.items[0]).toMatchObject({ disposition: "REUSED_ADMITTED_PROFSPEC", professionSpecificationRef: `${dataScientist.identity}@2`, professionSpecificationDigest: digestProfessionSpecification(dataScientist) });
    expect(result.payload.garrisonConsulted).toBe(false);
    expect(result.payload.personasSelected).toBe(false);
  });

  it("routes only missing specifications to profession creation and does not consult Garrison", () => {
    const result = new GuildhallProfessionRegistry([profession("Data Scientist")]).resolve(queue("Data Scientist", "Musicologist"));
    expect(result.payload.finding).toBe("PROFESSION_CREATION_REQUIRED");
    expect(result.payload.items.map((item) => item.disposition)).toEqual(["REUSED_ADMITTED_PROFSPEC", "PROFSPEC_CREATION_REQUIRED"]);
    expect(result.payload.items[1].professionSpecificationRef).toBeUndefined();
    expect(result.payload.garrisonConsulted).toBe(false);
  });

  it("does not reuse a merely conformant but unadmitted Profession Specification", () => {
    const admitted = profession("Data Scientist");
    const candidate = { ...admitted, version: 1, supersedes: undefined, payload: { ...admitted.payload, admissionState: "CANDIDATE" as const, admissionAuthorityRef: undefined } };
    const result = new GuildhallProfessionRegistry([candidate]).resolve(queue("Data Scientist"));
    expect(result.payload.items[0].disposition).toBe("PROFSPEC_CREATION_REQUIRED");
  });

  it("does not reuse a mission-scoped specification merely because its profession name matches", () => {
    const base = profession("Data Scientist");
    const admitted = { ...base, payload: { ...base.payload, reuseScope: "MISSION_SCOPED" as const, professionQueueRef: "different-mission-queue@1" } };
    const result = new GuildhallProfessionRegistry([admitted]).resolve(queue("Data Scientist"));
    expect(result.payload.items[0].disposition).toBe("PROFSPEC_CREATION_REQUIRED");
  });

  it("rejects ambiguous duplicate admitted specifications rather than selecting one", () => {
    expect(() => new GuildhallProfessionRegistry([profession("Data Scientist"), profession("data scientist")]).resolve(queue("Data Scientist"))).toThrow("multiple admitted Profession Specifications");
  });

  it("rejects a queue not approved by Guildmaster", () => {
    const unapproved = queue("Data Scientist");
    unapproved.payload.suitabilityDetermined = false as true;
    expect(() => new GuildhallProfessionRegistry([]).resolve(unapproved)).toThrow("Guildmaster-approved");
  });
});
