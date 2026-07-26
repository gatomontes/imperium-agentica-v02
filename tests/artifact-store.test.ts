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

  it("finds the complete correlation trail in deterministic order", () => {
    const store: ArtifactStore = new InMemoryArtifactRepository();
    const later = createArtifact("WorkSpecification", "Castellan", "corr-trail", {
      work: "later",
    }, [], { now: () => "2026-07-26T12:00:00.000Z", identityFactory: () => "work-1" });
    const earlier = createArtifact("Petition", "Secretariat", "corr-trail", {
      content: "earlier",
    }, [], { now: () => "2026-07-26T11:00:00.000Z", identityFactory: () => "petition-1" });

    store.save(later);
    store.save(earlier);

    expect(store.findByCorrelationId("corr-trail").map((artifact) => artifact.identity)).toEqual([
      "petition-1",
      "work-1",
    ]);
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
