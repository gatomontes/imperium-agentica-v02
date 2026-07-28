import { describe, expect, it } from "vitest";
import { ArtifactEnvelope, AsyncArtifactStore } from "../src/artifact-store.js";
import { createArtifact } from "../src/artifact.js";
import { StoreHttpArtifactResolver } from "../src/store-http-resolver.js";

describe("store-backed HTTP resolver", () => {
  it("resolves identity and version references asynchronously", async () => {
    const artifact = createArtifact("Petition", "Secretariat", "resolver-test", {
      originalContent: "request",
      normalizedContent: "request",
      sessionReference: "resolver-test",
      constraints: [],
      attachments: [],
      finding: "PETITION_RECEIVED",
    });
    const store: AsyncArtifactStore = {
      save: async <T>(value: ArtifactEnvelope<T>) => value,
      get: async <T>(identity: string, version: number) =>
        identity === artifact.identity && version === 1
          ? (artifact as ArtifactEnvelope<T>)
          : undefined,
      findByCorrelationId: async () => [],
      supersede: async <T>(_previous: ArtifactEnvelope<T>, successor: ArtifactEnvelope<T>) =>
        successor,
    };

    const resolver = new StoreHttpArtifactResolver(store);
    await expect(resolver.resolvePetition(artifact.identity + "@1")).resolves.toEqual(
      artifact,
    );
    await expect(resolver.resolvePetition("malformed")).resolves.toBeUndefined();
  });
});
