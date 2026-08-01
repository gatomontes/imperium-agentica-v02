import { assertArtifactEnvelope } from "./schema.js";
import { randomUUID } from "node:crypto";

import { createArtifact, ArtifactEnvelope } from "./artifact.js";
import { MissionDossier, MissionDossierService } from "./mission-dossier.js";

export type PetitionFinding =
  | "PETITION_RECEIVED"
  | "PETITION_NEEDS_CLARIFICATION"
  | "PETITION_ROUTED_TO_CASTELLAN"
  | "PETITION_REFUSED"
  | "PETITION_UNRESOLVED";

export interface OperatorRequest {
  content: string;
  requestedOutput?: "PERSONA_SPECIFICATION";
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
  requestedOutput?: "PERSONA_SPECIFICATION";
  finding: PetitionFinding;
}

export class Secretariat {
  constructor(
    private readonly dossiers = new MissionDossierService(),
  ) {}

  openDossier(
    request: OperatorRequest,
    correlationId?: string,
  ): {
    petition: ArtifactEnvelope<Petition>;
    dossier: ArtifactEnvelope<MissionDossier>;
  } {
    const petition = this.receive(request, correlationId);
    return {
      petition,
      dossier: this.dossiers.open(petition),
    };
  }

  receivePersonaProduction(
    request: Omit<OperatorRequest, "requestedOutput">,
    correlationId?: string,
  ): ArtifactEnvelope<Petition> {
    return this.receive(
      { ...request, requestedOutput: "PERSONA_SPECIFICATION" },
      correlationId,
    );
  }

  receive(
    request: OperatorRequest,
    correlationId: string = randomUUID(),
  ): ArtifactEnvelope<Petition> {
    const normalizedContent = request.content.trim();
    const finding: PetitionFinding = normalizedContent && request.sessionReference.trim()
      ? "PETITION_RECEIVED"
      : "PETITION_UNRESOLVED";

    const petition = createArtifact(
      "Petition",
      "Secretariat",
      correlationId,
      {
        originalContent: request.content,
        normalizedContent,
        sessionReference: request.sessionReference,
        responseChannel: request.responseChannel,
        constraints: request.constraints ?? [],
        attachments: request.attachments ?? [],
        requestedOutput: request.requestedOutput,
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
