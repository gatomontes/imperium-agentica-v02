import { describe, expect, it } from "vitest";
import { Castellan } from "../src/castellan.js";
import { Guildhall } from "../src/guildhall.js";
import { Secretariat } from "../src/secretariat.js";

function workSpecification() {
  const petition = new Secretariat().receive({
    content: "Research the applicable professional pattern.",
    sessionReference: "opaque-session-guildhall",
  });
  return new Castellan().receivePetition(petition)!;
}

describe("Guildhall reference resolver", () => {
  it("produces a conformant Profession Specification", () => {
    const work = workSpecification();
    const profession = new Guildhall().resolve(work, {
      professionIdentity: "research analyst",
      requiredCompetence: ["source evaluation"],
      practiceBoundaries: ["no unsupported conclusions"],
      suitabilityCriteria: ["evidence discipline"],
    });

    expect(profession.payload.finding).toBe("PROFESSION_CONFORMANT");
    expect(profession.payload.workSpecificationRef).toBe(
      work.identity + "@" + work.version,
    );
    expect(profession.correlationId).toBe(work.correlationId);
  });

  it("blocks incomplete professional resolution", () => {
    const profession = new Guildhall().resolve(workSpecification(), {
      professionIdentity: "research analyst",
    });

    expect(profession.payload.finding).toBe("PROFESSION_UNRESOLVED");
  });
});
