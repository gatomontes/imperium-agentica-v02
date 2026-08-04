import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import { WorkSpecification } from "./castellan.js";
import { ADMITTED_GUILDMASTER_AGENT } from "./guildmaster-agent-definition.js";

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
  admissionState?: "CANDIDATE" | "ADMITTED";
  admissionAuthorityRef?: string;
  professionQueueRef?: string;
  queuePosition?: number;
}

export interface ProfessionResolutionInput {
  professionIdentity?: string;
  requiredCompetence?: string[];
  practiceBoundaries?: string[];
  suitabilityCriteria?: string[];
}

export interface ProfessionQueueItem {
  position: number;
  professionIdentity: string;
  taskCluster: string;
  rationale: string;
}

export interface ProfessionQueue {
  workSpecificationRef: string;
  items: ProfessionQueueItem[];
  finding: "QUEUE_CONFORMANT" | "QUEUE_UNRESOLVED";
}

export type CommitteeDispositionKind = "ADMIT" | "RECYCLE" | "DISCARD";

export interface CommitteeDisposition {
  candidateRef: string;
  pitFindingRef: string;
  decision: CommitteeDispositionKind;
  authority: "GUILDHALL_COMMITTEE";
}

export class Guildhall {
  admitProfessionSpecification(candidate: ArtifactEnvelope<ProfessionSpecification>, guildmasterAgentDefinitionRef: string): ArtifactEnvelope<ProfessionSpecification> {
    if (candidate.artifactType !== "ProfessionSpecification" || candidate.producer !== "Guildhall" || candidate.status !== "CURRENT" || candidate.payload.finding !== "PROFESSION_CONFORMANT" || candidate.payload.admissionState === "ADMITTED") throw new Error("exact current conformant Profession Specification candidate is required");
    if (guildmasterAgentDefinitionRef !== ADMITTED_GUILDMASTER_AGENT.identity + "@" + ADMITTED_GUILDMASTER_AGENT.version) throw new Error("exact admitted Guildmaster Agent Definition authority is required");
    return {
      ...candidate,
      version: candidate.version + 1,
      createdAt: new Date().toISOString(),
      supersedes: candidate.identity + "@" + candidate.version,
      payload: { ...candidate.payload, admissionState: "ADMITTED", admissionAuthorityRef: guildmasterAgentDefinitionRef },
      sourceRefs: [...new Set([...candidate.sourceRefs, candidate.identity + "@" + candidate.version, guildmasterAgentDefinitionRef])],
    };
  }

  queue(work: ArtifactEnvelope<WorkSpecification>, items: ProfessionQueueItem[]): ArtifactEnvelope<ProfessionQueue> {
    const valid = items.length > 0 && items.every((item, index) =>
      item.position === index + 1 && item.professionIdentity.trim() && item.taskCluster.trim() && item.rationale.trim(),
    );
    return createArtifact("ProfessionQueue", "Guildhall", work.correlationId, {
      workSpecificationRef: work.identity + "@" + work.version,
      items,
      finding: valid ? "QUEUE_CONFORMANT" : "QUEUE_UNRESOLVED",
    }, [work.identity + "@" + work.version]);
  }

  resolveQueueItem(
    work: ArtifactEnvelope<WorkSpecification>,
    queue: ArtifactEnvelope<ProfessionQueue>,
    position: number,
    input: Omit<ProfessionResolutionInput, "professionIdentity"> & { requiredCompetence?: string[]; practiceBoundaries?: string[]; suitabilityCriteria?: string[] },
    previous?: ArtifactEnvelope<ProfessionSpecification>,
  ): ArtifactEnvelope<ProfessionSpecification> {
    const item = queue.payload.items.find((candidate) => candidate.position === position);
    const professionIdentity = item?.professionIdentity;
    const competence = input.requiredCompetence ?? [];
    const boundaries = input.practiceBoundaries ?? [];
    const criteria = input.suitabilityCriteria ?? [];
    const previousValid = position === 1
      ? previous === undefined
      : previous?.status === "CURRENT" &&
        previous.payload.finding === "PROFESSION_CONFORMANT" &&
        previous.payload.professionQueueRef === queue.identity + "@" + queue.version &&
        previous.payload.queuePosition === position - 1;
    const valid = queue.status === "CURRENT" &&
      queue.payload.finding === "QUEUE_CONFORMANT" &&
      queue.payload.workSpecificationRef === work.identity + "@" + work.version &&
      !!item && !!professionIdentity?.trim() && previousValid &&
      competence.length > 0 && boundaries.length > 0 && criteria.length > 0;

    return createArtifact(
      "ProfessionSpecification",
      "Guildhall",
      work.correlationId,
      {
        professionIdentity: professionIdentity ?? "",
        requiredCompetence: competence,
        practiceBoundaries: boundaries,
        suitabilityCriteria: criteria,
        workSpecificationRef: work.identity + "@" + work.version,
        professionQueueRef: queue.identity + "@" + queue.version,
        queuePosition: position,
        finding: valid ? "PROFESSION_CONFORMANT" : "PROFESSION_UNRESOLVED",
        admissionState: "CANDIDATE",
      },
      [
        work.identity + "@" + work.version,
        queue.identity + "@" + queue.version,
        ...(previous ? [previous.identity + "@" + previous.version] : []),
      ],
    );
  }

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
        admissionState: "CANDIDATE",
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
