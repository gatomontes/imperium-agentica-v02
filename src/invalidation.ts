import { createArtifact, ArtifactEnvelope } from "./artifact.js";

export type InvalidationStatus =
  | "SUSPENDED"
  | "INVALIDATED"
  | "OWNERSHIP_UNRESOLVED"
  | "REVALIDATED";

export interface InvalidationRecord {
  sourceRef: string;
  affectedRefs: string[];
  reason: string;
  ownerStatus: "IDENTIFIED" | "DISPUTED" | "UNAVAILABLE" | "UNRESOLVED";
  status: InvalidationStatus;
  requiredAction: string;
}

export class InvalidationCoordinator {
  record(
    sourceRef: string,
    affectedRefs: string[],
    reason: string,
    ownerStatus: InvalidationRecord["ownerStatus"],
  ): ArtifactEnvelope<InvalidationRecord> {
    const unresolved = ownerStatus !== "IDENTIFIED";
    return createArtifact(
      "InvalidationRecord",
      "InvalidationCoordinator",
      "invalidation-" + sourceRef,
      {
        sourceRef,
        affectedRefs,
        reason,
        ownerStatus,
        status: unresolved ? "OWNERSHIP_UNRESOLVED" : "SUSPENDED",
        requiredAction: unresolved
          ? "resolve authorized invalidation ownership"
          : "reassess affected artifacts",
      },
      [sourceRef, ...affectedRefs],
    );
  }
}
