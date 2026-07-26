import { describe, expect, it } from "vitest";
import { Conscription } from "../src/conscription.js";
import { transitionOperativePackage } from "../src/lifecycle.js";
import { ReferenceCreationTrace } from "../src/reference-trace.js";

describe("Operative Package lifecycle guard", () => {
  it("requires explicit sequential transitions", () => {
    const trace = new ReferenceCreationTrace().run();
    const pending = transitionOperativePackage(
      trace.operative,
      "ACTIVATION_PENDING",
    );
    const bound = transitionOperativePackage(pending, "MISSION_BOUND");

    expect(bound.payload.state).toBe("MISSION_BOUND");
    expect(bound.version).toBe(trace.operative.version + 2);
  });

  it("rejects packaging directly to deployment", () => {
    const trace = new ReferenceCreationTrace().run();
    expect(() =>
      transitionOperativePackage(trace.operative, "DEPLOYED"),
    ).toThrow("invalid Operative Package transition");
  });
});
