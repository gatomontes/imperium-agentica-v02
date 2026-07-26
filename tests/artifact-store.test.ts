import { describe, expect, it } from "vitest";
import { artifactKey, ArtifactStore } from "../src/artifact-store.js";
import { createArtifact } from "../src/artifact.js";
import { InMemoryArtifactRepository } from "../src/repository.js";

describe("artifact persistence boundary", () => {
  it("uses identity and version as the stable storage key", () => {
    expect(artifactKey("petition-1", 2)).toBe("petition-1@2");
  });

  it("allows the domain to depend on the store contract", () => {
    const store: ArtifactStore = new InMemoryArtifactRepository();
    const artifact = createArtifact("Petition", "Secretariat", "corr-store", {
      content: "request",
    });

    expect(store.save(artifact)).toEqual(artifact);
    expect(store.get(artifact.identity, artifact.version)).toEqual(artifact);
  });

  it("does not expose a current-version shortcut that could hide history", () => {
    const store: ArtifactStore = new InMemoryArtifactRepository();
    const first = createArtifact("Petition", "Secretariat", "corr-history", {
      content: "first",
    });
    const second = {
      ...createArtifact("Petition", "Secretariat", "corr-history", {
        content: "second",
      }),
      supersedes: first.identity + "@" + first.version,
    };

    store.save(first);
    store.supersede(first, second);

    expect(store.get(first.identity, first.version)?.status).toBe("SUPERSEDED");
    expect(store.get(second.identity, second.version)).toEqual(second);
  });
});
