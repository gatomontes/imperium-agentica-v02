import { describe, expect, it } from "vitest";
import { Castellan } from "../src/castellan.js";
import { Conscription } from "../src/conscription.js";
import { Foundry } from "../src/foundry.js";
import { Garrison } from "../src/garrison.js";
import { Guildhall } from "../src/guildhall.js";
import { Pit } from "../src/pit.js";
import { Secretariat } from "../src/secretariat.js";
import { Studium } from "../src/studium.js";

function candidate() {
  const petition = new Secretariat().receive({
    content: "Research the applicable professional pattern.",
    sessionReference: "status-boundary-session",
  });
  const work = new Castellan().receivePetition(petition)!;
  const profession = new Guildhall().resolve(work, {
    professionIdentity: "research analyst",
    requiredCompetence: ["source evaluation"],
    practiceBoundaries: ["no unsupported conclusions"],
    suitabilityCriteria: ["evidence discipline"],
  });
  const doctrine = new Studium().authorPersonaDoctrine({
    profession,
    mandatoryConduct: ["cite evidence"],
    prohibitedConduct: ["invent evidence"],
    evidenceDuties: ["state uncertainty"],
    refusalConditions: ["missing evidence"],
    escalationTriggers: ["material contradiction"],
    stopConditions: ["unsafe continuation"],
  });
  return new Foundry().integrate({
    profession,
    doctrineRef: doctrine.identity + "@" + doctrine.version,
    canonRefs: ["canon@1"],
    provenanceComplete: true,
  });
}

describe("superseded and invalidated artifact boundaries", () => {
  it("blocks a superseded Profession Specification at Foundry", () => {
    const current = candidate();
    const supersededProfession = {
      ...({ ...current, status: "SUPERSEDED" } as typeof current),
    };

    const result = new Foundry().integrate({
      profession: supersededProfession,
      doctrineRef: "doctrine@1",
      provenanceComplete: true,
    });

    expect(result.payload.finding).toBe("PERSONA_INPUTS_UNRESOLVED");
    expect(result.payload.unresolvedInputs).toContain("profession status");
  });

  it("blocks a superseded candidate at Pit", () => {
    const current = candidate();
    const superseded = { ...current, status: "SUPERSEDED" as const };
    const result = new Pit().test(superseded, ["pressure"]);

    expect(result.payload.finding).toBe("PERSONA_TEST_UNRESOLVED");
  });

  it("blocks invalidated candidate admission and packaging", () => {
    const current = candidate();
    const invalidated = { ...current, status: "INVALIDATED" as const };
    const pit = new Pit().test(invalidated, ["pressure"]);
    const persona = new Garrison().admit(invalidated, pit);
    const packaged = new Conscription().package(persona, "node-reference");

    expect(persona.payload.status).toBe("NOT_ADMITTED");
    expect(packaged.payload.finding).toBe("OPERATIVE_PACKAGE_UNRESOLVED");
  });
});
