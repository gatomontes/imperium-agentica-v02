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

  it("requires clarification before routing an ambiguous request", () => {
    const secretariat = new Secretariat();
    const petition = secretariat.receive({
      content: "Investigate this.",
      sessionReference: "opaque-session-clarification",
    });
    const clarified = secretariat.requestClarification(
      petition,
      "scope is materially ambiguous",
    );
    expect(clarified.payload.finding).toBe("PETITION_NEEDS_CLARIFICATION");
    expect(() => new Castellan().receivePetition(clarified)).not.toThrow();
    expect(new Castellan().receivePetition(clarified)).toBeNull();

    const resolved = secretariat.resolveClarification(
      clarified,
      "Investigate the applicable professional pattern.",
    );
    expect(resolved.version).toBe(clarified.version + 1);
    expect(resolved.payload.finding).toBe("PETITION_RECEIVED");
    expect(new Castellan().receivePetition(resolved)).not.toBeNull();
  });


  it("rejects routing before clarification is resolved", () => {
    const secretariat = new Secretariat();
    const petition = secretariat.receive({
      content: "Investigate this.",
      sessionReference: "opaque-session-routing",
    });
    const clarified = secretariat.requestClarification(
      petition,
      "scope required",
    );

    expect(() => secretariat.markRouted(clarified)).toThrow(
      "only received petitions can be routed",
    );
  });

});
