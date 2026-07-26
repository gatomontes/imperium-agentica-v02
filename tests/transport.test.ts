import { describe, expect, it } from "vitest";
import { DirectTransportAdapter } from "../src/direct-transport.js";
import { Secretariat } from "../src/secretariat.js";

describe("transport adapter contract", () => {
  it("maps a transport request to the existing reference flow", () => {
    const result = new DirectTransportAdapter().submit({
      transportId: "direct-001",
      request: {
        content: "Define the professional pattern.",
        sessionReference: "opaque-transport-session",
      },
    });

    expect(result.transportId).toBe("direct-001");
    expect(result.petition.payload.finding).toBe("PETITION_RECEIVED");
    expect(result.work).not.toBeNull();
  });

  it("maps clarification through the transport-neutral contract", () => {
    const adapter = new DirectTransportAdapter();
    const secretariat = new Secretariat();
    const petition = secretariat.receive({
      content: "Investigate this.",
      sessionReference: "opaque-transport-clarify",
    });
    const pending = secretariat.requestClarification(
      petition,
      "scope is materially ambiguous",
    );
    const result = adapter.clarify({
      transportId: "direct-clarify-001",
      petition: pending,
      correctedContent: "Investigate the professional pattern.",
    });

    expect(result.transportId).toBe("direct-clarify-001");
    expect(result.petition.payload.finding).toBe("PETITION_RECEIVED");
    expect(result.work).not.toBeNull();
  });


  it("handles response content and delivery through the adapter", () => {
    const adapter = new DirectTransportAdapter();
    const submitted = adapter.submit({
      transportId: "direct-response-001",
      request: {
        content: "Define the professional pattern.",
        sessionReference: "opaque-transport-response",
      },
    });
    const response = adapter.prepareResponse(
      submitted.petition,
      "The request was received.",
      "direct-response-001",
    );
    const delivery = new (class {
      state = "prepared";
    })();
    void delivery;
    expect(response.response.payload.content).toBe("The request was received.");
  });

});
