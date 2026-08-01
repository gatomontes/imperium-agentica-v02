import { describe, expect, it } from "vitest";
import { InMemoryTransportAdapter } from "../src/in-memory-transport.js";
import { Secretariat } from "../src/secretariat.js";

describe("in-memory transport adapter", () => {
  it("preserves transport correlation through ingress and handoff", () => {
    const result = new InMemoryTransportAdapter().submit({
      transportId: "mem-001",
      request: {
        content: "Define the professional pattern.",
        sessionReference: "session-001",
      },
    });

    expect(result.transportId).toBe("mem-001");
    expect(result.petition.correlationId).toBe(result.work?.correlationId);
    expect(result.work?.payload.petitionRef).toContain(result.petition.identity);
  });

  it("refuses unresolved input without forming work", () => {
    const result = new InMemoryTransportAdapter().submit({
      transportId: "mem-002",
      request: { content: " ", sessionReference: "session-002" },
    });

    expect(result.petition.payload.finding).toBe("PETITION_UNRESOLVED");
    expect(result.work).toBeNull();
  });

  it("keeps clarification and response artifacts on the same correlation", () => {
    const adapter = new InMemoryTransportAdapter();
    const secretariat = new Secretariat();
    const petition = secretariat.receive(
      { content: "Investigate this.", sessionReference: "session-003" },
      "corr-003",
    );
    const pending = secretariat.requestClarification(petition, "scope");
    const result = adapter.clarify({
      transportId: "mem-003",
      petition: pending,
      correctedContent: "Investigate the professional pattern.",
    });
    const response = adapter.prepareResponse(
      result.petition,
      "Received.",
      "mem-003",
    );

    expect(result.petition.correlationId).toBe("corr-003");
    expect(result.work?.correlationId).toBe("corr-003");
    expect(response.response.correlationId).toBe("corr-003");
  });
});
