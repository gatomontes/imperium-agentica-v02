import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import { CanonicalPersona } from "./garrison.js";

export type OperativeFinding =
  | "OPERATIVE_PACKAGE_CONFORMANT"
  | "OPERATIVE_PACKAGE_REFUSED"
  | "OPERATIVE_PACKAGE_UNRESOLVED";

export type OperativePackageState =
  | "PACKAGED"
  | "ACTIVATION_PENDING"
  | "MISSION_BOUND"
  | "RELEASED"
  | "DEPLOYED";

/** Provisional autonomy classes; class is distinct from capability and authority. */
export type AutonomyClass = "A0" | "A1" | "A2" | "A3" | "A4";

export interface OperativePackage {
  personaRef: string;
  professionQueueRef?: string;
  queuePosition?: number;
  medium: string;
  autonomyClass: AutonomyClass;
  deviations: string[];
  finding: OperativeFinding;
  state: OperativePackageState;
}

export class Conscription {
  package(
    persona: ArtifactEnvelope<CanonicalPersona>,
    medium: string,
    autonomyClass: AutonomyClass,
    deviations: string[] = [],
  ): ArtifactEnvelope<OperativePackage> {
    const queueConformant =
      persona.payload.professionQueueRef === undefined ||
      (persona.payload.professionQueueRef.trim() !== "" && persona.payload.queuePosition !== undefined);
    const finding: OperativeFinding =
      persona.status === "CURRENT" &&
      persona.payload.finding === "CANONICAL_PERSONA_ADMITTED" &&
      medium.trim() &&
      queueConformant
        ? "OPERATIVE_PACKAGE_CONFORMANT"
        : "OPERATIVE_PACKAGE_UNRESOLVED";

    const personaRef = persona.identity + "@" + persona.version;
    return createArtifact(
      "OperativePackage",
      "Conscription",
      persona.correlationId,
      {
        personaRef,
        ...(persona.payload.professionQueueRef ? { professionQueueRef: persona.payload.professionQueueRef } : {}),
        ...(persona.payload.queuePosition !== undefined ? { queuePosition: persona.payload.queuePosition } : {}),
        medium: medium.trim(),
        autonomyClass,
        deviations,
        finding,
        state: finding === "OPERATIVE_PACKAGE_CONFORMANT" ? "PACKAGED" : "PACKAGED",
      },
      [personaRef],
    );
  }
}
