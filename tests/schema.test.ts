import { describe, expect, it } from "vitest";
import { assertArtifactEnvelope } from "../src/schema.js";
import { createArtifact } from "../src/artifact.js";

describe("artifact JSON Schema boundary", () => {
  it("accepts a valid artifact envelope", () => {
    const artifact = createArtifact("Petition", "Secretariat", "corr-schema", {
      content: "request",
    });
    expect(assertArtifactEnvelope(artifact)).toEqual(artifact);
  });

  it("rejects an invalid artifact envelope", () => {
    const artifact = createArtifact("Petition", "Secretariat", "corr-schema", {
      content: "request",
    });
    const invalid = { ...artifact, version: 0 };
    expect(() => assertArtifactEnvelope(invalid)).toThrow(
      "invalid artifact envelope",
    );
  });
});
