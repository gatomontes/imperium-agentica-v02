import { ArtifactEnvelope } from "./artifact.js";

export type ArtifactKey = `${string}@${number}`;

export function artifactKey(identity: string, version: number): ArtifactKey {
  return identity + "@" + version;
}

/**
 * Persistence boundary for artifact history.
 *
 * Implementations own durability, concurrency, and recovery. The domain
 * services depend only on this contract; the current implementation remains
 * in-memory and is intentionally not a database choice.
 */
export interface ArtifactStore {
  save<T>(artifact: ArtifactEnvelope<T>): ArtifactEnvelope<T>;
  get<T>(identity: string, version: number): ArtifactEnvelope<T> | undefined;
  supersede<T>(
    previous: ArtifactEnvelope<T>,
    successor: ArtifactEnvelope<T>,
  ): ArtifactEnvelope<T>;
}
