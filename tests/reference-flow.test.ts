import { describe, expect, it } from "vitest";
import { Castellan } from "../src/castellan.js";
import { Secretariat } from "../src/secretariat.js";

describe("Secretariat to Castellan reference flow", () => {
  it("preserves the request and creates a correlated Work Specification", () => {
    const secretariat = new Secretariat();
    const castellan = new Castellan();

    const petition = secretariat.receive({
      content: "Research the applicable professional pattern.",
      sessionReference: "opaque-session-001",
      responseChannel: "fixture",
      constraints: ["preserve uncertainty"],
    });

    const work = castellan.receivePetition(petition);

    expect(petition.payload.originalContent).toBe(
      "Research the applicable professional pattern.",
    );
    expect(petition.payload.finding).toBe("PETITION_RECEIVED");
    expect(work?.correlationId).toBe(petition.correlationId);
    expect(work?.payload.petitionRef).toBe(
      petition.identity + "@" + petition.version,
    );
  });

  it("blocks an empty request", () => {
    const secretariat = new Secretariat();
    const castellan = new Castellan();

    const petition = secretariat.receive({
      content: "   ",
      sessionReference: "opaque-session-002",
    });

    expect(petition.payload.finding).toBe("PETITION_UNRESOLVED");
    expect(castellan.receivePetition(petition)).toBeNull();
  });
});
