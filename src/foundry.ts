import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import { ProfessionSpecification } from "./guildhall.js";

export type FoundryFinding =
  | "PERSONA_INPUTS_CONFORMANT"
  | "PERSONA_INPUTS_REFUSED"
  | "PERSONA_INPUTS_UNRESOLVED";

export interface FoundryInputs {
  profession: ArtifactEnvelope<ProfessionSpecification>;
  doctrineRef?: string;
  canonRefs?: string[];
  provenanceComplete?: boolean;
}

export interface PersonaSpecificationCandidate {
  professionRef: string;
  doctrineRef: string;
  canonRefs: string[];
  finding: FoundryFinding;
  unresolvedInputs: string[];
}

export class Foundry {
  integrate(
    inputs: FoundryInputs,
  ): ArtifactEnvelope<PersonaSpecificationCandidate> {
    const unresolved: string[] = [];
    if (!inputs.profession?.payload?.professionIdentity) unresolved.push("profession");
    if (!inputs.doctrineRef) unresolved.push("doctrine");
    if (!inputs.provenanceComplete) unresolved.push("provenance");

    const finding: FoundryFinding =
      unresolved.length === 0
        ? "PERSONA_INPUTS_CONFORMANT"
        : "PERSONA_INPUTS_UNRESOLVED";

    const professionRef = inputs.profession.identity + "@" + inputs.profession.version;
    return createArtifact(
      "PersonaSpecificationCandidate",
      "Foundry",
      inputs.profession.correlationId,
      {
        professionRef,
        doctrineRef: inputs.doctrineRef ?? "",
        canonRefs: inputs.canonRefs ?? [],
        finding,
        unresolvedInputs: unresolved,
      },
      [professionRef, ...(inputs.canonRefs ?? [])],
    );
  }
}
