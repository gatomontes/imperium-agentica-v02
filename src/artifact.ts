import { randomUUID } from "node:crypto";

export interface ArtifactContext {
  identityFactory?: (prefix: string) => string;
  now?: () => string;
}

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

export interface GovernedVocabularyUse {
  termId: string;
  lexiconRef: string;
  value: string;
}

export interface GovernedArtifactContext {
  coreDoctrineRef: string;
  lexiconRef: string;
  officeProfileRef: string;
  vocabularyUses: GovernedVocabularyUse[];
}

export interface GovernedArtifactEnvelope<T> extends ArtifactEnvelope<T> {
  governance: GovernedArtifactContext;
}

export function nextIdentity(prefix: string): string {
  return prefix + "-" + randomUUID();
}

export function createArtifact<T>(
  artifactType: string,
  producer: string,
  correlationId: string,
  payload: T,
  sourceRefs: string[] = [],
  context: ArtifactContext = {},
): ArtifactEnvelope<T> {
  return {
    artifactType,
    identity: context.identityFactory
      ? context.identityFactory(artifactType.toLowerCase())
      : nextIdentity(artifactType.toLowerCase()),
    version: 1,
    status: "CURRENT",
    producer,
    correlationId,
    createdAt: context.now ? context.now() : new Date().toISOString(),
    payload,
    sourceRefs,
  };
}

export function createGovernedArtifact<T>(
  artifactType: string,
  producer: string,
  correlationId: string,
  payload: T,
  governance: GovernedArtifactContext,
  sourceRefs: string[] = [],
  context: ArtifactContext = {},
): GovernedArtifactEnvelope<T> {
  if (!governance.coreDoctrineRef.trim() || !governance.lexiconRef.trim() || !governance.officeProfileRef.trim() || governance.vocabularyUses.length === 0) throw new Error("complete governed artifact lineage and vocabulary declarations are required");
  return { ...createArtifact(artifactType, producer, correlationId, payload, sourceRefs, context), governance };
}
