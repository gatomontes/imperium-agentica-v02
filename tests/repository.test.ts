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

  it("rejects an invalid artifact envelope at save time", () => {
    const repository = new InMemoryArtifactRepository();
    const artifact = createArtifact("Petition", "Secretariat", "corr-invalid", {
      content: "request",
    });
    const invalid = { ...artifact, version: 0 };

    expect(() => repository.save(invalid)).toThrow("invalid artifact envelope");
  });

  it("rejects replayed supersession of a non-current predecessor", () => {
    const repository = new InMemoryArtifactRepository();
    const previous = createArtifact("Petition", "Secretariat", "corr-replay", {
      content: "old",
    });
    const successor = {
      ...createArtifact("Petition", "Secretariat", "corr-replay", {
        content: "new",
      }),
      supersedes: previous.identity + "@" + previous.version,
    };

    repository.save(previous);
    repository.supersede(previous, successor);

    expect(() => repository.supersede(previous, successor)).toThrow(
      "previous artifact is not current",
    );
  });

  it("does not mutate the predecessor when the successor conflicts", () => {
    const repository = new InMemoryArtifactRepository();
    const previous = createArtifact("Petition", "Secretariat", "corr-conflict", {
      content: "old",
    });
    const successor = {
      ...createArtifact("Petition", "Secretariat", "corr-conflict", {
        content: "new",
      }),
      supersedes: previous.identity + "@" + previous.version,
    };

    repository.save(previous);
    repository.save(successor);

    expect(() => repository.supersede(previous, successor)).toThrow(
      "artifact version already exists",
    );
    expect(repository.get(previous.identity, previous.version)?.status).toBe(
      "CURRENT",
    );
  });

  it("does not mutate the predecessor when the successor is invalid", () => {
    const repository = new InMemoryArtifactRepository();
    const previous = createArtifact("Petition", "Secretariat", "corr-atomic", {
      content: "old",
    });
    const invalidSuccessor = {
      ...createArtifact("Petition", "Secretariat", "corr-atomic", {
        content: "new",
      }),
      version: 0,
      supersedes: previous.identity + "@" + previous.version,
    };

    repository.save(previous);
    expect(() => repository.supersede(previous, invalidSuccessor)).toThrow(
      "invalid artifact envelope",
    );
    expect(repository.get(previous.identity, previous.version)?.status).toBe(
      "CURRENT",
    );
  });
});
