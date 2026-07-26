import { createArtifact, ArtifactEnvelope } from "./artifact.js";

export type PetitionFinding =
  | "PETITION_RECEIVED"
  | "PETITION_NEEDS_CLARIFICATION"
  | "PETITION_ROUTED_TO_CASTELLAN"
  | "PETITION_REFUSED"
  | "PETITION_UNRESOLVED";

export interface OperatorRequest {
  content: string;
  sessionReference: string;
  responseChannel?: string;
  constraints?: string[];
  attachments?: string[];
}

export interface Petition {
  originalContent: string;
  normalizedContent: string;
  sessionReference: string;
  responseChannel?: string;
  constraints: string[];
  attachments: string[];
  finding: PetitionFinding;
}

export class Secretariat {
  receive(request: OperatorRequest): ArtifactEnvelope<Petition> {
    const normalizedContent = request.content.trim();
    const finding: PetitionFinding = normalizedContent
      ? "PETITION_RECEIVED"
      : "PETITION_UNRESOLVED";

    return createArtifact(
      "Petition",
      "Secretariat",
      crypto.randomUUID(),
      {
        originalContent: request.content,
        normalizedContent,
        sessionReference: request.sessionReference,
        responseChannel: request.responseChannel,
        constraints: request.constraints ?? [],
        attachments: request.attachments ?? [],
        finding,
      },
    );
  }

  markRouted(
    petition: ArtifactEnvelope<Petition>,
  ): ArtifactEnvelope<Petition> {
    return {
      ...petition,
      version: petition.version + 1,
      payload: { ...petition.payload, finding: "PETITION_ROUTED_TO_CASTELLAN" },
    };
  }
}
