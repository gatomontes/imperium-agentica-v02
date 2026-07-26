import { assertArtifactEnvelope } from "./schema.js";
import { ArtifactEnvelope } from "./artifact.js";

export class InMemoryArtifactRepository {
  private readonly artifacts = new Map<string, ArtifactEnvelope<unknown>>();

  save<T>(artifact: ArtifactEnvelope<T>): ArtifactEnvelope<T> {
    assertArtifactEnvelope(artifact);
    const key = artifact.identity + "@" + artifact.version;
    if (this.artifacts.has(key)) {
      throw new Error("artifact version already exists: " + key);
    }
    this.artifacts.set(key, artifact as ArtifactEnvelope<unknown>);
    return artifact;
  }

  get<T>(identity: string, version: number): ArtifactEnvelope<T> | undefined {
    return this.artifacts.get(identity + "@" + version) as
      | ArtifactEnvelope<T>
      | undefined;
  }

  supersede<T>(
    previous: ArtifactEnvelope<T>,
    successor: ArtifactEnvelope<T>,
  ): ArtifactEnvelope<T> {
    if (successor.supersedes !== previous.identity + "@" + previous.version) {
      throw new Error("successor must explicitly supersede previous artifact");
    }
    const storedPrevious = this.get<T>(previous.identity, previous.version);
    if (!storedPrevious) throw new Error("previous artifact is not stored");

    const superseded: ArtifactEnvelope<T> = {
      ...storedPrevious,
      status: "SUPERSEDED",
    };
    this.artifacts.set(
      previous.identity + "@" + previous.version,
      superseded as ArtifactEnvelope<unknown>,
    );
    return this.save(successor);
  }
}
