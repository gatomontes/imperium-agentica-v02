import { createHash } from "node:crypto";
import { ArtifactContext, ArtifactEnvelope, createArtifact } from "./artifact.js";
import { ProfessionSpecification } from "./guildhall.js";
import { ProfessionAdjudicationPacket } from "./guildhall-mission-committee.js";
import { ADMITTED_GUILDMASTER_AGENT } from "./guildmaster-agent-definition.js";

export type ProfessionResolutionDisposition = "REUSED_ADMITTED_PROFSPEC" | "PROFSPEC_CREATION_REQUIRED";

export interface ProfessionResolutionItem {
  position: number;
  professionIdentity: string;
  disposition: ProfessionResolutionDisposition;
  professionSpecificationRef?: string;
  professionSpecificationDigest?: string;
}

export interface ProfessionResolutionPacket {
  adjudicatedProfessionQueueRef: string;
  items: ProfessionResolutionItem[];
  finding: "ALL_PROFESSIONS_RESOLVED" | "PROFESSION_CREATION_REQUIRED";
  garrisonConsulted: false;
  personasSelected: false;
  operativesSelected: false;
}

/** Guildhall's admitted Profession Specification lookup boundary. Garrison is deliberately absent. */
export class GuildhallProfessionRegistry {
  constructor(private readonly admitted: ReadonlyArray<ArtifactEnvelope<ProfessionSpecification>>) {}

  resolve(queue: ArtifactEnvelope<ProfessionAdjudicationPacket>, context: ArtifactContext = {}): ArtifactEnvelope<ProfessionResolutionPacket> {
    assertAdjudicatedQueue(queue);
    const items = queue.payload.queue.map((item) => {
      const matches = this.admitted.filter((candidate) => isAdmittedMatch(candidate, item.professionIdentity));
      if (matches.length > 1) throw new Error(`multiple admitted Profession Specifications match ${item.professionIdentity}`);
      const specification = matches[0];
      if (!specification) return { position: item.position, professionIdentity: item.professionIdentity, disposition: "PROFSPEC_CREATION_REQUIRED" as const };
      return {
        position: item.position,
        professionIdentity: item.professionIdentity,
        disposition: "REUSED_ADMITTED_PROFSPEC" as const,
        professionSpecificationRef: ref(specification),
        professionSpecificationDigest: digestProfessionSpecification(specification),
      };
    });
    const allResolved = items.every((item) => item.disposition === "REUSED_ADMITTED_PROFSPEC");
    return createArtifact("ProfessionResolutionPacket", "Guildhall", queue.correlationId, {
      adjudicatedProfessionQueueRef: ref(queue),
      items,
      finding: allResolved ? "ALL_PROFESSIONS_RESOLVED" : "PROFESSION_CREATION_REQUIRED",
      garrisonConsulted: false,
      personasSelected: false,
      operativesSelected: false,
    }, [ref(queue), ...items.flatMap((item) => item.professionSpecificationRef ? [item.professionSpecificationRef] : [])], context);
  }
}

export function digestProfessionSpecification(specification: ArtifactEnvelope<ProfessionSpecification>): string {
  return "sha256:" + createHash("sha256").update(canonical(specification.payload)).digest("hex");
}

function assertAdjudicatedQueue(queue: ArtifactEnvelope<ProfessionAdjudicationPacket>): void {
  if (queue.artifactType !== "ProfessionAdjudicationPacket" || queue.producer !== "Guildmaster" || queue.status !== "CURRENT" || queue.payload.finding !== "PROFESSION_QUEUE_RECOMMENDED" || queue.payload.suitabilityDetermined !== true || queue.payload.guildmasterAgentDefinitionRef !== ref(ADMITTED_GUILDMASTER_AGENT) || !queue.sourceRefs.includes(ref(ADMITTED_GUILDMASTER_AGENT)) || queue.payload.queue.length === 0) throw new Error("exact current Guildmaster-approved profession queue is required");
}

function isAdmittedMatch(candidate: ArtifactEnvelope<ProfessionSpecification>, professionIdentity: string): boolean {
  return candidate.artifactType === "ProfessionSpecification" && candidate.producer === "Guildhall" && candidate.status === "CURRENT" && candidate.payload.finding === "PROFESSION_CONFORMANT" && candidate.payload.admissionState === "ADMITTED" && candidate.payload.admissionAuthorityRef === ref(ADMITTED_GUILDMASTER_AGENT) && normalize(candidate.payload.professionIdentity) === normalize(professionIdentity);
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return "[" + value.map(canonical).join(",") + "]";
  if (value && typeof value === "object") return "{" + Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => JSON.stringify(key) + ":" + canonical(item)).join(",") + "}";
  return JSON.stringify(value);
}
function normalize(value: string): string { return value.trim().toLowerCase(); }
function ref(value: { identity: string; version: number }): string { return value.identity + "@" + value.version; }
