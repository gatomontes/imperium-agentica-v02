import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import { ProfessionSpecification } from "./guildhall.js";
import { PersonaGovernanceDoctrine } from "./studium.js";
import { CanonEntry } from "./hagiography.js";

export type FoundryFinding =
  | "PERSONA_INPUTS_CONFORMANT"
  | "PERSONA_INPUTS_REFUSED"
  | "PERSONA_INPUTS_UNRESOLVED";

export interface FoundryInputs {
  profession: ArtifactEnvelope<ProfessionSpecification>;
  doctrineRef?: string;
  canonRefs?: string[];
  doctrine?: ArtifactEnvelope<PersonaGovernanceDoctrine>;
  canons?: ArtifactEnvelope<CanonEntry>[];
  provenanceComplete?: boolean;
  inputConflicts?: Array<{
    owner: string;
    claims: string[];
  }>;
}

export interface PersonaSpecificationCandidate {
  professionRef: string;
  doctrineRef: string;
  canonRefs: string[];
  finding: FoundryFinding;
  unresolvedInputs: string[];
  inputConflicts: Array<{
    owner: string;
    claims: string[];
  }>;
}

export class Foundry {
  integrate(
    inputs: FoundryInputs,
  ): ArtifactEnvelope<PersonaSpecificationCandidate> {
    const unresolved: string[] = [];
    const inputConflicts = inputs.inputConflicts ?? [];
    if (inputConflicts.length > 0) unresolved.push("conflicting inputs");
    if (inputs.profession.status !== "CURRENT") unresolved.push("profession status");
    if (!inputs.profession?.payload?.professionIdentity) unresolved.push("profession");
    if (!inputs.doctrineRef) unresolved.push("doctrine");
    if (inputs.doctrineRef && !inputs.doctrine) unresolved.push("doctrine evidence");
    if (!inputs.provenanceComplete) unresolved.push("provenance");
    if (inputs.doctrine && (
      inputs.doctrine.status !== "CURRENT" ||
      inputs.doctrine.payload.finding !== "DOCTRINE_CONFORMANT" ||
      inputs.doctrine.correlationId !== inputs.profession.correlationId ||
      inputs.doctrine.identity + "@" + inputs.doctrine.version !== inputs.doctrineRef
    )) unresolved.push("doctrine lineage");
    if (inputs.canons && inputs.canons.some((canon) =>
      canon.status !== "CURRENT" ||
      canon.payload.finding !== "TRAIT_CANON_CONFORMANT" ||
      canon.correlationId !== inputs.profession.correlationId ||
      !inputs.canonRefs?.includes(canon.identity + "@" + canon.version)
    )) unresolved.push("canon lineage");

    const finding: FoundryFinding =
      unresolved.length === 0
        ? "PERSONA_INPUTS_CONFORMANT"
        : inputConflicts.length > 0
          ? "PERSONA_INPUTS_REFUSED"
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
        inputConflicts,
      },
      [professionRef, ...(inputs.doctrine ? [inputs.doctrineRef!] : []), ...(inputs.canonRefs ?? [])],
    );
  }
}
