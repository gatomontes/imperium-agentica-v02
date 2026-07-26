import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import { Petition } from "./secretariat.js";

export interface OperatorResponse {
  petitionRef: string;
  content: string;
  finding: "RESPONSE_PREPARED";
}

export function prepareOperatorResponse(
  petition: ArtifactEnvelope<Petition>,
  content: string,
): ArtifactEnvelope<OperatorResponse> {
  const normalized = content.trim();
  if (!normalized) throw new Error("response content cannot be empty");

  return createArtifact(
    "OperatorResponse",
    "Secretariat",
    petition.correlationId,
    {
      petitionRef: petition.identity + "@" + petition.version,
      content: normalized,
      finding: "RESPONSE_PREPARED",
    },
    [petition.identity + "@" + petition.version],
  );
}
