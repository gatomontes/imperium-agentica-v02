import Ajv from "ajv";
import { ArtifactEnvelope } from "./artifact.js";

const artifactEnvelopeSchema = {
  type: "object",
  required: [
    "artifactType",
    "identity",
    "version",
    "status",
    "producer",
    "correlationId",
    "createdAt",
    "payload",
    "sourceRefs",
  ],
  properties: {
    artifactType: { type: "string", minLength: 1 },
    identity: { type: "string", minLength: 1 },
    version: { type: "integer", minimum: 1 },
    status: { type: "string", minLength: 1 },
    producer: { type: "string", minLength: 1 },
    correlationId: { type: "string", minLength: 1 },
    createdAt: { type: "string", minLength: 1 },
    payload: { type: "object" },
    sourceRefs: { type: "array", items: { type: "string" } },
    supersedes: { type: "string" },
    invalidationReason: { type: "string" },
  },
  additionalProperties: false,
} as const;

const ajv = new Ajv();
const validateEnvelope = ajv.compile(artifactEnvelopeSchema);

export function assertArtifactEnvelope<T>(
  artifact: ArtifactEnvelope<T>,
): ArtifactEnvelope<T> {
  if (!validateEnvelope(artifact)) {
    throw new Error(
      "invalid artifact envelope: " +
        ajv.errorsText(validateEnvelope.errors),
    );
  }
  return artifact;
}
