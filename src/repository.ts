import { assertArtifactEnvelope } from "./schema.js";
import { ArtifactEnvelope } from "./artifact.js";
import { artifactKey, ArtifactStore } from "./artifact-store.js";

export class InMemoryArtifactRepository implements ArtifactStore {
  private readonly artifacts = new Map<string, ArtifactEnvelope<unknown>>();

  save<T>(artifact: ArtifactEnvelope<T>): ArtifactEnvelope<T> {
    assertArtifactEnvelope(artifact);
    const key = artifactKey(artifact.identity, artifact.version);
    if (this.artifacts.has(key)) {
      throw new Error("artifact version already exists: " + key);
    }
    this.artifacts.set(key, artifact as ArtifactEnvelope<unknown>);
    return artifact;
  }

  get<T>(identity: string, version: number): ArtifactEnvelope<T> | undefined {
    return this.artifacts.get(artifactKey(identity, version)) as
      | ArtifactEnvelope<T>
      | undefined;
  }

  findByCorrelationId<T>(correlationId: string): ArtifactEnvelope<T>[] {
    return [...this.artifacts.values()]
      .filter((artifact) => artifact.correlationId === correlationId)
      .sort((left, right) =>
        left.createdAt.localeCompare(right.createdAt) ||
        left.identity.localeCompare(right.identity),
      ) as ArtifactEnvelope<T>[];
  }

  supersede<T>(
    previous: ArtifactEnvelope<T>,
    successor: ArtifactEnvelope<T>,
  ): ArtifactEnvelope<T> {
    if (successor.supersedes !== artifactKey(previous.identity, previous.version)) {
      throw new Error("successor must explicitly supersede previous artifact");
    }
    const storedPrevious = this.get<T>(previous.identity, previous.version);
    if (!storedPrevious) throw new Error("previous artifact is not stored");
    if (storedPrevious.status !== "CURRENT") {
      throw new Error("previous artifact is not current");
    }
    assertArtifactEnvelope(successor);
    const successorKey = artifactKey(successor.identity, successor.version);
    if (this.artifacts.has(successorKey)) {
      throw new Error("artifact version already exists: " + successorKey);
    }

    const superseded: ArtifactEnvelope<T> = {
      ...storedPrevious,
      status: "SUPERSEDED",
    };
    this.artifacts.set(
      artifactKey(previous.identity, previous.version),
      superseded as ArtifactEnvelope<unknown>,
    );
    this.artifacts.set(successorKey, successor as ArtifactEnvelope<unknown>);
    return successor;
  }
}
