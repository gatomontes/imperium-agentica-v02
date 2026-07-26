import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import { ProfessionSpecification } from "./guildhall.js";

export type DoctrineFinding =
  | "DOCTRINE_CONFORMANT"
  | "DOCTRINE_REFUSED"
  | "DOCTRINE_UNRESOLVED";

export interface PersonaGovernanceDoctrine {
  professionRef: string;
  mandatoryConduct: string[];
  prohibitedConduct: string[];
  evidenceDuties: string[];
  refusalConditions: string[];
  escalationTriggers: string[];
  stopConditions: string[];
  finding: DoctrineFinding;
}

export interface DoctrineInput {
  profession: ArtifactEnvelope<ProfessionSpecification>;
  mandatoryConduct?: string[];
  prohibitedConduct?: string[];
  evidenceDuties?: string[];
  refusalConditions?: string[];
  escalationTriggers?: string[];
  stopConditions?: string[];
}

export class Studium {
  authorPersonaDoctrine(
    input: DoctrineInput,
  ): ArtifactEnvelope<PersonaGovernanceDoctrine> {
    const missing: string[] = [];
    if (!input.profession.payload.professionIdentity) missing.push("profession");
    if (!input.mandatoryConduct?.length) missing.push("mandatoryConduct");
    if (!input.prohibitedConduct?.length) missing.push("prohibitedConduct");
    if (!input.evidenceDuties?.length) missing.push("evidenceDuties");
    if (!input.refusalConditions?.length) missing.push("refusalConditions");
    if (!input.escalationTriggers?.length) missing.push("escalationTriggers");
    if (!input.stopConditions?.length) missing.push("stopConditions");

    const finding: DoctrineFinding =
      missing.length === 0 ? "DOCTRINE_CONFORMANT" : "DOCTRINE_UNRESOLVED";

    const professionRef = input.profession.identity + "@" + input.profession.version;
    return createArtifact(
      "PersonaGovernanceDoctrine",
      "Studium",
      input.profession.correlationId,
      {
        professionRef,
        mandatoryConduct: input.mandatoryConduct ?? [],
        prohibitedConduct: input.prohibitedConduct ?? [],
        evidenceDuties: input.evidenceDuties ?? [],
        refusalConditions: input.refusalConditions ?? [],
        escalationTriggers: input.escalationTriggers ?? [],
        stopConditions: input.stopConditions ?? [],
        finding,
      },
      [professionRef],
    );
  }
}
