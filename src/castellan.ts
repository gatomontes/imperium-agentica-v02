import { assertArtifactEnvelope } from "./schema.js";
import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import { Petition } from "./secretariat.js";

export interface WorkSpecification {
  missionNeed: string;
  requestedWork: string;
  constraints: string[];
  petitionRef: string;
}

export class Castellan {
  receivePetition(
    petition: ArtifactEnvelope<Petition>,
  ): ArtifactEnvelope<WorkSpecification> | null {
    assertArtifactEnvelope(petition);
    if (petition.status !== "CURRENT") return null;
    if (petition.payload.finding !== "PETITION_RECEIVED") return null;
    if (!petition.payload.normalizedContent) return null;

    return createArtifact(
      "WorkSpecification",
      "Castellan",
      petition.correlationId,
      {
        missionNeed: petition.payload.normalizedContent,
        requestedWork: petition.payload.normalizedContent,
        constraints: petition.payload.constraints,
        petitionRef: petition.identity + "@" + petition.version,
      },
      [petition.identity + "@" + petition.version],
    );
  }
}
