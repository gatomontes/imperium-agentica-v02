import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import { WorkSpecification } from "./castellan.js";

export type ProfessionFinding =
  | "PROFESSION_CONFORMANT"
  | "PROFESSION_REFUSED"
  | "PROFESSION_UNRESOLVED";

export interface ProfessionSpecification {
  professionIdentity: string;
  requiredCompetence: string[];
  practiceBoundaries: string[];
  suitabilityCriteria: string[];
  workSpecificationRef: string;
  finding: ProfessionFinding;
}

export interface ProfessionResolutionInput {
  professionIdentity?: string;
  requiredCompetence?: string[];
  practiceBoundaries?: string[];
  suitabilityCriteria?: string[];
}

export type CommitteeDispositionKind = "ADMIT" | "RECYCLE" | "DISCARD";

export interface CommitteeDisposition {
  candidateRef: string;
  pitFindingRef: string;
  decision: CommitteeDispositionKind;
  authority: "GUILDHALL_COMMITTEE";
}

export class Guildhall {
  resolve(
    work: ArtifactEnvelope<WorkSpecification>,
    input: ProfessionResolutionInput,
  ): ArtifactEnvelope<ProfessionSpecification> {
    const profession = input.professionIdentity?.trim();
    const competence = input.requiredCompetence ?? [];
    const boundaries = input.practiceBoundaries ?? [];
    const criteria = input.suitabilityCriteria ?? [];

    let finding: ProfessionFinding = "PROFESSION_CONFORMANT";
    if (!profession || competence.length === 0 || boundaries.length === 0 || criteria.length === 0) {
      finding = "PROFESSION_UNRESOLVED";
    }

    return createArtifact(
      "ProfessionSpecification",
      "Guildhall",
      work.correlationId,
      {
        professionIdentity: profession ?? "",
        requiredCompetence: competence,
        practiceBoundaries: boundaries,
        suitabilityCriteria: criteria,
        workSpecificationRef: work.identity + "@" + work.version,
        finding,
      },
      [work.identity + "@" + work.version],
    );
  }

  dispose(
    candidate: ArtifactEnvelope<import("./foundry.js").PersonaSpecificationCandidate>,
    pit: ArtifactEnvelope<import("./pit.js").PitResult>,
    decision: CommitteeDispositionKind,
  ): ArtifactEnvelope<CommitteeDisposition> {
    return createArtifact(
      "CommitteeDisposition",
      "GuildhallCommittee",
      candidate.correlationId,
      {
        candidateRef: candidate.identity + "@" + candidate.version,
        pitFindingRef: pit.identity + "@" + pit.version,
        decision,
        authority: "GUILDHALL_COMMITTEE",
      },
      [candidate.identity + "@" + candidate.version, pit.identity + "@" + pit.version],
    );
  }
}
