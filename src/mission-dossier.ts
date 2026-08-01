import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import type { Petition } from "./secretariat.js";
import { assertArtifactEnvelope } from "./schema.js";

export type MissionDossierState =
  | "AWAITING_CASTELLAN_ASSESSMENT"
  | "INTAKE_UNRESOLVED";

export interface MissionDossier {
  operatorSessionReference: string;
  originalRequest: string;
  petitionRef: string;
  responseChannel?: string;
  state: MissionDossierState;
  artifactRefs: string[];
}

/**
 * Opens the living mission record at Secretariat intake.
 *
 * Opening a dossier records the request; it does not form, authorize, or
 * execute a mission. Castellan remains responsible for assessing intent.
 */
export class MissionDossierService {
  open(
    petition: ArtifactEnvelope<Petition>,
  ): ArtifactEnvelope<MissionDossier> {
    assertArtifactEnvelope(petition);
    if (petition.status !== "CURRENT") {
      throw new Error("only a current petition can open a mission dossier");
    }

    const petitionRef = petition.identity + "@" + petition.version;
    return createArtifact(
      "MissionDossier",
      "Secretariat",
      petition.correlationId,
      {
        operatorSessionReference: petition.payload.sessionReference,
        originalRequest: petition.payload.originalContent,
        petitionRef,
        responseChannel: petition.payload.responseChannel,
        state:
          petition.payload.finding === "PETITION_RECEIVED"
            ? "AWAITING_CASTELLAN_ASSESSMENT"
            : "INTAKE_UNRESOLVED",
        artifactRefs: [petitionRef],
      },
      [petitionRef],
    );
  }
}
