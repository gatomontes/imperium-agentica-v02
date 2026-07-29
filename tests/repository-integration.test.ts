import { describe, expect, it } from "vitest";
import { createArtifact } from "../src/artifact.js";
import { InMemoryArtifactRepository } from "../src/repository.js";
import { InvalidationCoordinator } from "../src/invalidation.js";

describe("repository integration boundaries", () => {
  it("stores a version, supersedes it, and records downstream invalidation", () => {
    const repository = new InMemoryArtifactRepository();
    const source = createArtifact("ProfessionSpecification", "Guildhall", "corr-int", {
      profession: "research analyst",
    });
    const successor = {
      ...createArtifact("ProfessionSpecification", "Guildhall", "corr-int", {
        profession: "senior research analyst",
      }),
      supersedes: source.identity + "@" + source.version,
    };

    repository.save(source);
    repository.supersede(source, successor);

    const invalidation = new InvalidationCoordinator().record(
      successor.identity + "@" + successor.version,
      ["candidate@1", "persona@1"],
      "profession changed",
      "IDENTIFIED",
    );

    expect(repository.get(source.identity, source.version)?.status).toBe(
      "SUPERSEDED",
    );
    expect(invalidation.payload.status).toBe("SUSPENDED");
  });
});
