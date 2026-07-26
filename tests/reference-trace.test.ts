import { describe, expect, it } from "vitest";
import { ReferenceCreationTrace } from "../src/reference-trace.js";

describe("reference creation trace", () => {
  it("preserves the full synthetic path and correlation", () => {
    const trace = new ReferenceCreationTrace().run();

    expect(trace.petition.correlationId).toBe(trace.work.correlationId);
    expect(trace.work.correlationId).toBe(trace.profession.correlationId);
    expect(trace.profession.correlationId).toBe(trace.operative.correlationId);
    expect(trace.persona.payload.finding).toBe("CANONICAL_PERSONA_ADMITTED");
    expect(trace.operative.payload.finding).toBe(
      "OPERATIVE_PACKAGE_CONFORMANT",
    );
  });
});
