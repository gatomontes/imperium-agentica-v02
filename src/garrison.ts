import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import { PersonaSpecificationCandidate } from "./foundry.js";
import { PitResult } from "./pit.js";

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
}

export class Garrison {
  admit(
    candidate: ArtifactEnvelope<PersonaSpecificationCandidate>,
    pit: ArtifactEnvelope<PitResult>,
  ): ArtifactEnvelope<CanonicalPersona> {
    const candidateRef = candidate.identity + "@" + candidate.version;
    const pitRef = pit.identity + "@" + pit.version;
    const conformant =
      candidate.payload.finding === "PERSONA_INPUTS_CONFORMANT" &&
      pit.payload.finding === "PERSONA_TEST_CONFORMANT";

    return createArtifact(
      "CanonicalPersona",
      "Garrison",
      candidate.correlationId,
      {
        candidateRef,
        pitFindingRef: pitRef,
        professionRef: candidate.payload.professionRef,
        status: conformant ? "ADMITTED" : "NOT_ADMITTED",
        finding: conformant
          ? "CANONICAL_PERSONA_ADMITTED"
          : "CANONICAL_PERSONA_ADMISSION_UNRESOLVED",
      },
      [candidateRef, pitRef],
    );
  }
}
