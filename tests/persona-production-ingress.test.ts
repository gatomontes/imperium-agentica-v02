import { describe, expect, it } from "vitest";
import { Castellan } from "../src/castellan.js";
import { Secretariat } from "../src/secretariat.js";

describe("persona production ingress", () => {
  it("marks the requested output without requiring a profession", () => {
    const secretariat = new Secretariat();
    const petition = secretariat.receivePersonaProduction({
      content: "Produce a persona for writing Gothic Metal songs.",
      sessionReference: "persona-production-1",
    });

    expect(petition.payload.requestedOutput).toBe("PERSONA_SPECIFICATION");
    expect(petition.payload.finding).toBe("PETITION_RECEIVED");

    const work = new Castellan().receivePetition(petition);
    expect(work?.payload.requestedOutput).toBe("PERSONA_SPECIFICATION");
    expect(work?.payload.missionNeed).toContain("Gothic Metal");
  });
});
