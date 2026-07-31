import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import { PersonaSpecificationCandidate } from "./foundry.js";
import { PitResult } from "./pit.js";
import { CommitteeDisposition } from "./guildhall.js";

export type GarrisonFinding =
  | "CANONICAL_PERSONA_ADMITTED"
  | "CANONICAL_PERSONA_REFUSED"
  | "CANONICAL_PERSONA_ADMISSION_UNRESOLVED";

export interface CanonicalPersona {
  candidateRef: string;
  pitFindingRef: string;
  professionRef: string;
  status: "ADMITTED" | "NOT_ADMITTED" | "SUPERSEDED" | "RETIRED";
  finding: GarrisonFinding;
  professionQueueRef?: string;
  queuePosition?: number;
}

export class Garrison {
  admit(
    candidate: ArtifactEnvelope<PersonaSpecificationCandidate>,
    pit: ArtifactEnvelope<PitResult>,
    disposition: ArtifactEnvelope<CommitteeDisposition>,
  ): ArtifactEnvelope<CanonicalPersona> {
    const candidateRef = candidate.identity + "@" + candidate.version;
    const pitRef = pit.identity + "@" + pit.version;
    const conformant =
      candidate.status === "CURRENT" &&
      pit.status === "CURRENT" &&
      candidate.payload.finding === "PERSONA_INPUTS_CONFORMANT" &&
      pit.payload.finding === "PERSONA_TEST_CONFORMANT" &&
      pit.payload.candidateRef === candidateRef &&
      disposition.status === "CURRENT" &&
      disposition.payload.decision === "ADMIT" &&
      disposition.payload.authority === "GUILDHALL_COMMITTEE" &&
      disposition.payload.candidateRef === candidateRef &&
      disposition.payload.pitFindingRef === pitRef;
    const queueConformant =
      candidate.payload.professionQueueRef === pit.payload.professionQueueRef &&
      candidate.payload.queuePosition === pit.payload.queuePosition &&
      (candidate.payload.professionQueueRef === undefined || candidate.payload.queuePosition !== undefined);
    const admitted = conformant && queueConformant;

    return createArtifact(
      "CanonicalPersona",
      "Garrison",
      candidate.correlationId,
      {
        candidateRef,
        pitFindingRef: pitRef,
        professionRef: candidate.payload.professionRef,
        status: admitted ? "ADMITTED" : "NOT_ADMITTED",
        finding: admitted
          ? "CANONICAL_PERSONA_ADMITTED"
          : "CANONICAL_PERSONA_ADMISSION_UNRESOLVED",
        ...(candidate.payload.professionQueueRef ? { professionQueueRef: candidate.payload.professionQueueRef } : {}),
        ...(candidate.payload.queuePosition !== undefined ? { queuePosition: candidate.payload.queuePosition } : {}),
      },
      [candidateRef, pitRef, disposition.identity + "@" + disposition.version],
    );
  }
}
