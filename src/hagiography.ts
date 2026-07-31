import { randomUUID } from "node:crypto";

import { ArtifactEnvelope, createArtifact } from "./artifact.js";

export type CanonFinding =
  | "TRAIT_CANON_CONFORMANT"
  | "TRAIT_CANON_REFUSED"
  | "TRAIT_CANON_UNRESOLVED";

export interface CanonEntry {
  syntheticSource: boolean;
  sourceRef: string;
  performanceEvidence: string;
  observedBehavior: string;
  boundedTrait: string;
  conditions: string[];
  limits: string[];
  counterweights: string[];
  finding: CanonFinding;
  professionRef?: string;
  professionQueueRef?: string;
  queuePosition?: number;
}

export interface CanonInput {
  correlationId?: string;
  syntheticSource: boolean;
  sourceRef?: string;
  performanceEvidence?: string;
  observedBehavior?: string;
  boundedTrait?: string;
  conditions?: string[];
  limits?: string[];
  counterweights?: string[];
  ec01Disposition?: string;
  professionRef?: string;
  professionQueueRef?: string;
  queuePosition?: number;
  professionConformant?: boolean;
}

export class Hagiography {
  canonize(input: CanonInput): ArtifactEnvelope<CanonEntry> {
    const missing: string[] = [];
    if (!input.syntheticSource) missing.push("real-person processing is not enabled");
    if (!input.sourceRef) missing.push("sourceRef");
    if (!input.performanceEvidence) missing.push("performanceEvidence");
    if (!input.observedBehavior) missing.push("observedBehavior");
    if (!input.boundedTrait) missing.push("boundedTrait");
    if (!input.conditions?.length) missing.push("conditions");
    if (!input.limits?.length) missing.push("limits");
    if (!input.counterweights?.length) missing.push("counterweights");
    if (!input.ec01Disposition) missing.push("ec01Disposition");
    if (input.professionRef && input.professionConformant !== true) missing.push("profession assignment");

    const finding: CanonFinding =
      missing.length === 0 ? "TRAIT_CANON_CONFORMANT" : "TRAIT_CANON_UNRESOLVED";

    return createArtifact(
      "HumanTraitCanon",
      "Hagiography",
      input.correlationId ?? randomUUID(),
      {
        syntheticSource: input.syntheticSource,
        sourceRef: input.sourceRef ?? "",
        performanceEvidence: input.performanceEvidence ?? "",
        observedBehavior: input.observedBehavior ?? "",
        boundedTrait: input.boundedTrait ?? "",
        conditions: input.conditions ?? [],
        limits: input.limits ?? [],
        counterweights: input.counterweights ?? [],
        finding,
        ...(input.professionRef ? { professionRef: input.professionRef } : {}),
        ...(input.professionQueueRef ? { professionQueueRef: input.professionQueueRef } : {}),
        ...(input.queuePosition !== undefined ? { queuePosition: input.queuePosition } : {}),
      },
      input.sourceRef ? [input.sourceRef] : [],
    );
  }
}
