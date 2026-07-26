import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import { CanonicalPersona } from "./garrison.js";

export type OperativeFinding =
  | "OPERATIVE_PACKAGE_CONFORMANT"
  | "OPERATIVE_PACKAGE_REFUSED"
  | "OPERATIVE_PACKAGE_UNRESOLVED";

export interface OperativePackage {
  personaRef: string;
  medium: string;
  deviations: string[];
  finding: OperativeFinding;
}

export class Conscription {
  package(
    persona: ArtifactEnvelope<CanonicalPersona>,
    medium: string,
    deviations: string[] = [],
  ): ArtifactEnvelope<OperativePackage> {
    const finding: OperativeFinding =
      persona.payload.finding === "CANONICAL_PERSONA_ADMITTED" && medium.trim()
        ? "OPERATIVE_PACKAGE_CONFORMANT"
        : "OPERATIVE_PACKAGE_UNRESOLVED";

    const personaRef = persona.identity + "@" + persona.version;
    return createArtifact(
      "OperativePackage",
      "Conscription",
      persona.correlationId,
      {
        personaRef,
        medium: medium.trim(),
        deviations,
        finding,
      },
      [personaRef],
    );
  }
}
