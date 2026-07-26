import { describe, expect, it } from "vitest";
import { createArtifact } from "../src/artifact.js";
import {
  deserializeArtifact,
  serializeArtifact,
} from "../src/serialization.js";

describe("artifact JSON serialization", () => {
  it("round-trips a valid artifact", () => {
    const artifact = createArtifact("Petition", "Secretariat", "corr-json", {
      content: "request",
    });
    const restored = deserializeArtifact(serializeArtifact(artifact));

    expect(restored).toEqual(artifact);
  });

  it("rejects malformed JSON", () => {
    expect(() => deserializeArtifact("{not-json}")).toThrow(
      "invalid artifact JSON",
    );
  });

  it("rejects valid JSON that is not an artifact envelope", () => {
    expect(() => deserializeArtifact(JSON.stringify({ version: 0 }))).toThrow(
      "invalid artifact envelope",
    );
  });
});
