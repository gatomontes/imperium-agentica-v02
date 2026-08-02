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
    governance: {
      type: "object",
      required: ["coreDoctrineRef", "lexiconRef", "officeProfileRef", "vocabularyUses"],
      properties: {
        coreDoctrineRef: { type: "string", minLength: 1 },
        lexiconRef: { type: "string", minLength: 1 },
        officeProfileRef: { type: "string", minLength: 1 },
        vocabularyUses: { type: "array", minItems: 1, items: { type: "object", required: ["termId", "lexiconRef", "value"], properties: { termId: { type: "string", minLength: 1 }, lexiconRef: { type: "string", minLength: 1 }, value: { type: "string", minLength: 1 } }, additionalProperties: false } },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
} as const;

type AjvConstructor = new () => {
  compile(schema: object): ((data: unknown) => boolean) & {
    errors?: unknown;
  };
  errorsText(errors: unknown): string;
};

const AjvClass = Ajv as unknown as AjvConstructor;
const ajv = new AjvClass();
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
