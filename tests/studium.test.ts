import { describe, expect, it } from "vitest";
import { Castellan } from "../src/castellan.js";
import { Guildhall } from "../src/guildhall.js";
import { Secretariat } from "../src/secretariat.js";
import { Studium } from "../src/studium.js";

function profession() {
  const petition = new Secretariat().receive({
    content: "Research the applicable professional pattern.",
    sessionReference: "opaque-session-studium",
  });
  const work = new Castellan().receivePetition(petition)!;
  return new Guildhall().resolve(work, {
    professionIdentity: "research analyst",
    requiredCompetence: ["source evaluation"],
    practiceBoundaries: ["no unsupported conclusions"],
    suitabilityCriteria: ["evidence discipline"],
  });
}

describe("Studium Persona Doctrine evaluator", () => {
  it("produces a conformant Persona Governance Doctrine", () => {
    const result = new Studium().authorPersonaDoctrine({
      profession: profession(),
      mandatoryConduct: ["cite evidence"],
      prohibitedConduct: ["invent evidence"],
      evidenceDuties: ["state uncertainty"],
      refusalConditions: ["missing material evidence"],
      escalationTriggers: ["material contradiction"],
      stopConditions: ["unsafe continuation"],
    });

    expect(result.payload.finding).toBe("DOCTRINE_CONFORMANT");
    expect(result.payload.professionRef).toContain("professionspecification-");
  });

  it("blocks incomplete doctrine without entering the Officer path", () => {
    const result = new Studium().authorPersonaDoctrine({ profession: profession() });
    expect(result.payload.finding).toBe("DOCTRINE_UNRESOLVED");
  });

  it("does not advance an unresolved profession queue item into doctrine", () => {
    const petition = new Secretariat().receive({
      content: "Compose a Gothic Metal song.",
      sessionReference: "opaque-session-queue-studium",
    });
    const work = new Castellan().receivePetition(petition)!;
    const queue = new Guildhall().queue(work, [
      { position: 1, professionIdentity: "Lyricist", taskCluster: "write lyrics", rationale: "lyrics" },
      { position: 2, professionIdentity: "Chorus Specialist", taskCluster: "refine chorus", rationale: "chorus follows lyrics" },
    ]);
    const unresolved = new Guildhall().resolveQueueItem(work, queue, 2, {
      requiredCompetence: ["refrain analysis"],
      practiceBoundaries: ["preserve meaning"],
      suitabilityCriteria: ["memorability"],
    });
    const result = new Studium().authorPersonaDoctrine({
      profession: unresolved,
      mandatoryConduct: ["stay within scope"],
      prohibitedConduct: ["invent authority"],
      evidenceDuties: ["cite sources"],
      refusalConditions: ["missing evidence"],
      escalationTriggers: ["material uncertainty"],
      stopConditions: ["unsafe request"],
    });

    expect(result.payload.finding).toBe("DOCTRINE_UNRESOLVED");
  });
});
