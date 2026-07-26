import { assertArtifactEnvelope } from "./schema.js";
import { randomUUID } from "node:crypto";

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

    const petition = createArtifact(
      "Petition",
      "Secretariat",
      randomUUID(),
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
    return assertArtifactEnvelope(petition);
  }

  requestClarification(
    petition: ArtifactEnvelope<Petition>,
    reason: string,
  ): ArtifactEnvelope<Petition> {
    if (petition.payload.finding !== "PETITION_RECEIVED") {
      throw new Error("only received petitions can require clarification");
    }
    return {
      ...petition,
      version: petition.version + 1,
      payload: {
        ...petition.payload,
        finding: "PETITION_NEEDS_CLARIFICATION",
        constraints: [...petition.payload.constraints, "clarification: " + reason],
      },
    };
  }

  resolveClarification(
    petition: ArtifactEnvelope<Petition>,
    correctedContent: string,
  ): ArtifactEnvelope<Petition> {
    if (petition.payload.finding !== "PETITION_NEEDS_CLARIFICATION") {
      throw new Error("petition is not awaiting clarification");
    }
    const normalizedContent = correctedContent.trim();
    if (!normalizedContent) {
      throw new Error("clarified content cannot be empty");
    }
    return {
      ...petition,
      version: petition.version + 1,
      payload: {
        ...petition.payload,
        originalContent: correctedContent,
        normalizedContent,
        finding: "PETITION_RECEIVED",
      },
    };
  }

  markRouted(
    petition: ArtifactEnvelope<Petition>,
  ): ArtifactEnvelope<Petition> {
    if (petition.payload.finding !== "PETITION_RECEIVED") {
      throw new Error("only received petitions can be routed");
    }
    return {
      ...petition,
      version: petition.version + 1,
      payload: { ...petition.payload, finding: "PETITION_ROUTED_TO_CASTELLAN" },
    };
  }
}
