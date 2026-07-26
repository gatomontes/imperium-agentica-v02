import { describe, expect, it } from "vitest";
import { DirectTransportAdapter } from "../src/direct-transport.js";

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
});
