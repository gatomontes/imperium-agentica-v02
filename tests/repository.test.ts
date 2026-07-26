import { describe, expect, it } from "vitest";
import { createArtifact } from "../src/artifact.js";
import { InMemoryArtifactRepository } from "../src/repository.js";

describe("in-memory artifact repository", () => {
  it("rejects duplicate artifact versions", () => {
    const repository = new InMemoryArtifactRepository();
    const artifact = createArtifact("Petition", "Secretariat", "corr-1", {
      content: "request",
    });

    repository.save(artifact);
    expect(() => repository.save(artifact)).toThrow(
      "artifact version already exists",
    );
  });

  it("requires explicit supersession lineage", () => {
    const repository = new InMemoryArtifactRepository();
    const previous = createArtifact("Petition", "Secretariat", "corr-2", {
      content: "old",
    });
    const successor = createArtifact("Petition", "Secretariat", "corr-2", {
      content: "new",
    });

    repository.save(previous);
    expect(() => repository.supersede(previous, successor)).toThrow(
      "successor must explicitly supersede previous artifact",
    );
  });

  it("marks the prior version superseded and stores the successor", () => {
    const repository = new InMemoryArtifactRepository();
    const previous = createArtifact("Petition", "Secretariat", "corr-3", {
      content: "old",
    });
    const successor = {
      ...createArtifact("Petition", "Secretariat", "corr-3", {
        content: "new",
      }),
      supersedes: previous.identity + "@" + previous.version,
    };

    repository.save(previous);
    repository.supersede(previous, successor);

    expect(repository.get(previous.identity, previous.version)?.status).toBe(
      "SUPERSEDED",
    );
    expect(repository.get(successor.identity, successor.version)).toEqual(
      successor,
    );
  });
});
