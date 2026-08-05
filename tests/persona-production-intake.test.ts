import { describe, expect, it } from "vitest";
import { createGovernedArtifact, createArtifact } from "../src/artifact.js";
import { MissionSpecificationCandidate } from "../src/castellan-mission-formation.js";
import { ADMITTED_GUILDMASTER_AGENT } from "../src/guildmaster-agent-definition.js";
import { ProfessionAdjudicationPacket } from "../src/guildhall-mission-committee.js";
import { ArtificerIntake, CastellanFoundryRouter, SanctographerResearchDesk } from "../src/persona-production-intake.js";

const correlationId = "persona-intake-001";
const mission = createGovernedArtifact<MissionSpecificationCandidate>("MissionSpecificationCandidate", "Castellan", correlationId, {
  dossierRef: "dossier@1", acceptedDeterminationRefs: ["assessment@1"], purpose: "Produce governed accounting personas",
  scope: ["accounting review"], constraints: ["synthetic only"], acceptanceCriteria: ["packet lineage preserved"], requestedOutputs: ["persona candidates"],
  suppliedClaims: [], assumptions: [], unknowns: [], materialContradictions: [], authorityAssertions: [], externalObligationAssertions: [],
  resourceRequirements: ["professional evidence"], unresolvedPredicates: [], state: "CANDIDATE", authorityCreated: false,
}, { coreDoctrineRef: "doctrine@1", lexiconRef: "lexicon@1", officeProfileRef: "castellan@1", vocabularyUses: [{ termId: "LEX-062", lexiconRef: "lexicon@1", value: "mission_specification" }] }, ["dossier@1"], { identityFactory: () => "mission" });
const missionRef = `${mission.identity}@${mission.version}`;
const guildmasterRef = `${ADMITTED_GUILDMASTER_AGENT.identity}@${ADMITTED_GUILDMASTER_AGENT.version}`;
const determination = createArtifact<ProfessionAdjudicationPacket>("ProfessionAdjudicationPacket", "Guildmaster", correlationId, {
  missionSpecificationCandidateRef: missionRef, recommendationPacketRef: "recommendation@1",
  decisions: [{ professionIdentity: "Certified Public Accountant", disposition: "ADMIT", rationale: "required" }],
  queue: [
    { position: 1, professionIdentity: "Certified Public Accountant", contribution: "Professional capacity to review accounts", rationale: "required", collaborationMode: "INDEPENDENT", dependsOn: [] },
    { position: 2, professionIdentity: "Internal Auditor", contribution: "Professional capacity to inspect controls", rationale: "follows accounting review", collaborationMode: "SEQUENTIAL", dependsOn: ["Certified Public Accountant"] },
  ], capabilityRequirements: [], toolOrAccessRequirements: [], finding: "PROFESSION_QUEUE_RECOMMENDED", peopleSelected: false,
  operativesSelected: false, officersSelected: false, suitabilityDetermined: true, guildmasterAgentDefinitionRef: guildmasterRef,
}, [missionRef, "recommendation@1", guildmasterRef], { identityFactory: () => "determination" });

describe("Castellan to Sanctographer persona-production intake", () => {
  it("preserves the admitted order and returns an authenticated packet for only the first profession", () => {
    const entry = new CastellanFoundryRouter().handoff(mission, determination, { identityFactory: () => "entry" });
    const queue = new ArtificerIntake().establishQueue(entry, determination, { identityFactory: () => "queue" });
    const commission = new ArtificerIntake().commissionFirst(entry, queue, { identityFactory: () => "commission" });
    const packet = new SanctographerResearchDesk().compile(commission, [{
      syntheticSource: true, sourceRef: "synthetic-exemplar@1", exemplar: "Synthetic exemplar", accomplishments: ["reconciled complex ledgers"],
      demonstratedMethods: ["independent verification"], evidencedAttributes: ["evidence discipline"], limitations: ["not a whole-person import"], uncertainty: [],
    }], "sanctographer-agent@1", { identityFactory: () => "research" });
    expect(queue.payload.items.map((item) => item.professionIdentity)).toEqual(["Certified Public Accountant", "Internal Auditor"]);
    expect(queue.payload.orderAltered).toBe(false);
    expect(commission.payload.profession.professionIdentity).toBe("Certified Public Accountant");
    expect(commission.payload.personaRecommendationRequested).toBe(false);
    expect(packet.payload).toMatchObject({ professionIdentity: "Certified Public Accountant", queuePosition: 1, finding: "RESEARCH_ACCEPTED", personaRecommended: false, syntheticOnly: true });
    expect(packet.producer).toBe("Sanctographer");
  });
  it("refuses an altered Artificer queue", () => {
    const entry = new CastellanFoundryRouter().handoff(mission, determination); const queue = new ArtificerIntake().establishQueue(entry, determination);
    (queue.payload as { orderAltered: boolean }).orderAltered = true;
    expect(() => new ArtificerIntake().commissionFirst(entry, queue)).toThrow("exact current Artificer queue");
  });
  it("refuses unauthenticated or incomplete Chronicler work", () => {
    const entry = new CastellanFoundryRouter().handoff(mission, determination); const queue = new ArtificerIntake().establishQueue(entry, determination);
    const commission = new ArtificerIntake().commissionFirst(entry, queue);
    expect(() => new SanctographerResearchDesk().compile(commission, [], "")).toThrow("acceptable synthetic Chronicler findings");
  });
});
