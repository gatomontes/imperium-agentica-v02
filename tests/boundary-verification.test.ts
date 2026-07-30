import { describe, expect, it } from "vitest";
import { Castellan } from "../src/castellan.js";
import { Conscription } from "../src/conscription.js";
import { Foundry } from "../src/foundry.js";
import { Garrison } from "../src/garrison.js";
import { Guildhall } from "../src/guildhall.js";
import { InvalidationCoordinator } from "../src/invalidation.js";
import { Pit } from "../src/pit.js";
import { Secretariat } from "../src/secretariat.js";
import { Studium } from "../src/studium.js";

function baseArtifacts() {
  const petition = new Secretariat().receive({
    content: "Perform bounded research.",
    sessionReference: "negative-boundary-session",
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
  const candidate = new Foundry().integrate({
    profession,
    doctrineRef: doctrine.identity + "@" + doctrine.version,
    doctrine,
    canonRefs: ["canon-synthetic@1"],
    provenanceComplete: true,
  });
  return { candidate };
}

describe("reference boundary verification", () => {
  it("keeps incomplete Foundry input unresolved", () => {
    const { candidate } = baseArtifacts();
    expect(candidate.payload.finding).toBe("PERSONA_INPUTS_CONFORMANT");
    const unresolved = new Foundry().integrate({
      profession: candidate as never,
      provenanceComplete: false,
    });
    expect(unresolved.payload.finding).toBe("PERSONA_INPUTS_UNRESOLVED");
  });

  it("does not admit a candidate without a conformant Pit finding", () => {
    const { candidate } = baseArtifacts();
    const pit = new Pit().test(candidate, []);
    const persona = new Garrison().admit(candidate, pit, new Guildhall().dispose(candidate, pit, "ADMIT"));
    expect(pit.payload.finding).toBe("PERSONA_TEST_UNRESOLVED");
    expect(persona.payload.finding).toBe(
      "CANONICAL_PERSONA_ADMISSION_UNRESOLVED",
    );
    expect(persona.payload.status).toBe("NOT_ADMITTED");
  });

  it("does not package a non-admitted persona", () => {
    const { candidate } = baseArtifacts();
    const pit = new Pit().test(candidate, []);
    const persona = new Garrison().admit(candidate, pit, new Guildhall().dispose(candidate, pit, "ADMIT"));
  const packageResult = new Conscription().package(persona, "node-reference", "A2");
    expect(packageResult.payload.finding).toBe(
      "OPERATIVE_PACKAGE_UNRESOLVED",
    );
  });

  it("blocks downstream use when invalidation ownership is unresolved", () => {
    const result = new InvalidationCoordinator().record(
      "doctrine@2",
      ["candidate@1", "persona@1"],
      "doctrine changed",
      "DISPUTED",
    );
    expect(result.payload.status).toBe("OWNERSHIP_UNRESOLVED");
    expect(result.payload.requiredAction).toContain("resolve");
  });
});
