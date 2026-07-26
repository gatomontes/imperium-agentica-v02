import { ArtifactEnvelope } from "./artifact.js";
import { assertArtifactEnvelope } from "./schema.js";

export function serializeArtifact<T>(
  artifact: ArtifactEnvelope<T>,
): string {
  return JSON.stringify(assertArtifactEnvelope(artifact));
}

export function deserializeArtifact<T>(
  serialized: string,
): ArtifactEnvelope<T> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(serialized);
  } catch {
    throw new Error("invalid artifact JSON");
  }
  return assertArtifactEnvelope(parsed as ArtifactEnvelope<T>);
}
