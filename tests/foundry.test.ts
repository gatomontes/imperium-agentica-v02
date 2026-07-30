import { describe, expect, it } from "vitest";
import { Castellan } from "../src/castellan.js";
import { Foundry } from "../src/foundry.js";
import { Guildhall } from "../src/guildhall.js";
import { Secretariat } from "../src/secretariat.js";

function profession() {
  const petition = new Secretariat().receive({
    content: "Research the applicable professional pattern.",
    sessionReference: "opaque-session-foundry",
  });
  const work = new Castellan().receivePetition(petition)!;
  return new Guildhall().resolve(work, {
    professionIdentity: "research analyst",
    requiredCompetence: ["source evaluation"],
    practiceBoundaries: ["no unsupported conclusions"],
    suitabilityCriteria: ["evidence discipline"],
  });
}

describe("Foundry input validator", () => {
  it("accepts a complete exact input set", () => {
    const result = new Foundry().integrate({
      profession: profession(),
      doctrineRef: "pgd-synthetic-001@1",
      canonRefs: ["canon-synthetic-001@1"],
      provenanceComplete: true,
    });

    expect(result.payload.finding).toBe("PERSONA_INPUTS_UNRESOLVED");
    expect(result.payload.unresolvedInputs).toEqual(["doctrine evidence"]);
  });

  it("blocks incomplete inputs without silent repair", () => {
    const result = new Foundry().integrate({
      profession: profession(),
      provenanceComplete: false,
    });

    expect(result.payload.finding).toBe("PERSONA_INPUTS_UNRESOLVED");
    expect(result.payload.unresolvedInputs).toEqual(["doctrine", "provenance"]);
  });
});
