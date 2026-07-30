import { randomUUID } from "node:crypto";
import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import { PersonaSpecificationCandidate } from "./foundry.js";

export type PitFinding =
  | "PERSONA_TEST_CONFORMANT"
  | "PERSONA_TEST_REFUSED"
  | "PERSONA_TEST_UNRESOLVED";

export interface PitResult {
  candidateRef: string;
  testRef: string;
  retestOf?: string;
  pressures: string[];
  finding: PitFinding;
  failures: string[];
}

export class Pit {
  test(
    candidate: ArtifactEnvelope<PersonaSpecificationCandidate>,
    pressures: string[],
    retestOf?: string,
  ): ArtifactEnvelope<PitResult> {
    const failures = pressures.length === 0 ||
      candidate.status !== "CURRENT" ||
      candidate.payload.finding !== "PERSONA_INPUTS_CONFORMANT" ? [
      ...(pressures.length === 0 ? ["no pressures declared"] : []),
      ...(candidate.status !== "CURRENT" ? ["candidate is not current"] : []),
      ...(candidate.payload.finding !== "PERSONA_INPUTS_CONFORMANT"
        ? ["candidate inputs are not conformant"]
        : []),
    ] : [];
    const finding: PitFinding =
      failures.length === 0
        ? "PERSONA_TEST_CONFORMANT"
        : "PERSONA_TEST_UNRESOLVED";
    const candidateRef = candidate.identity + "@" + candidate.version;

    return createArtifact(
      "PitFinding",
      "Pit",
      candidate.correlationId,
      {
        candidateRef,
        testRef: "pit-test-" + randomUUID(),
        ...(retestOf ? { retestOf } : {}),
        pressures,
        finding,
        failures,
      },
      [candidateRef, ...(retestOf ? [retestOf] : [])],
    );
  }
}
