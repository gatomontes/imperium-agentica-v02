export type ArtifactStatus =
  | "CURRENT"
  | "REFUSED"
  | "UNRESOLVED"
  | "SUPERSEDED"
  | "INVALIDATED";

export interface ArtifactEnvelope<T> {
  artifactType: string;
  identity: string;
  version: number;
  status: ArtifactStatus;
  producer: string;
  correlationId: string;
  createdAt: string;
  payload: T;
  sourceRefs: string[];
  supersedes?: string;
  invalidationReason?: string;
}

export function nextIdentity(prefix: string): string {
  return prefix + "-" + crypto.randomUUID();
}

export function createArtifact<T>(
  artifactType: string,
  producer: string,
  correlationId: string,
  payload: T,
  sourceRefs: string[] = [],
): ArtifactEnvelope<T> {
  return {
    artifactType,
    identity: nextIdentity(artifactType.toLowerCase()),
    version: 1,
    status: "CURRENT",
    producer,
    correlationId,
    createdAt: new Date().toISOString(),
    payload,
    sourceRefs,
  };
}
