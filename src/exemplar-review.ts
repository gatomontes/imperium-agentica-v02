import { ArtifactEnvelope, createArtifact } from "./artifact.js";

export type ExemplarReviewFinding =
  | "EXEMPLARS_RANKED"
  | "EXEMPLARS_UNRESOLVED"
  | "EXEMPLARS_REFUSED";

export type OperatorExemplarAction = "APPROVE" | "REPLACE" | "DISCARD";

export interface ExemplarMeritAssessment {
  exemplarRef: string;
  score: number;
  evidenceRefs: string[];
  uncertainty: string[];
  refusalReasons?: string[];
}

export interface ExemplarReviewProposal {
  propositionRef: string;
  /** Optional operator-supplied emphasis; Hagiography still discovers the traits. */
  requestedAttributes?: string[];
  ranked: ExemplarMeritAssessment[];
  finding: ExemplarReviewFinding;
  selectedExemplarRef?: string;
}

export interface OperatorExemplarReview {
  proposalRef: string;
  action: OperatorExemplarAction;
  exemplarRef: string;
  reason: string;
  authority: "OPERATOR_REVIEW";
}

export class ExemplarReview {
  rank(
    correlationId: string,
    propositionRef: string,
    assessments: ExemplarMeritAssessment[],
    requestedAttributes: string[] = [],
  ): ArtifactEnvelope<ExemplarReviewProposal> {
    const valid = assessments.length > 0 && assessments.every((assessment) =>
      assessment.exemplarRef &&
      Number.isFinite(assessment.score) &&
      assessment.evidenceRefs.length > 0 &&
      !assessment.refusalReasons?.length,
    );
    const ranked = [...assessments].sort((a, b) => b.score - a.score);
    const finding: ExemplarReviewFinding = assessments.length === 0
      ? "EXEMPLARS_UNRESOLVED"
      : valid ? "EXEMPLARS_RANKED" : "EXEMPLARS_REFUSED";

    return createArtifact(
      "ExemplarReviewProposal",
      "Hagiography",
      correlationId,
      {
        propositionRef,
        ...(requestedAttributes.length > 0 ? { requestedAttributes } : {}),
        ranked,
        finding,
        selectedExemplarRef: finding === "EXEMPLARS_RANKED" ? ranked[0].exemplarRef : undefined,
      },
      [propositionRef, ...assessments.flatMap((assessment) => assessment.evidenceRefs)],
    );
  }

  recordOperatorReview(
    proposal: ArtifactEnvelope<ExemplarReviewProposal>,
    action: OperatorExemplarAction,
    exemplarRef: string,
    reason: string,
  ): ArtifactEnvelope<OperatorExemplarReview> | null {
    if (
      proposal.status !== "CURRENT" ||
      proposal.payload.finding !== "EXEMPLARS_RANKED" ||
      !proposal.payload.ranked.some((assessment) => assessment.exemplarRef === exemplarRef) ||
      !reason.trim()
    ) return null;

    return createArtifact(
      "OperatorExemplarReview",
      "Operator",
      proposal.correlationId,
      { proposalRef: proposal.identity + "@" + proposal.version, action, exemplarRef, reason, authority: "OPERATOR_REVIEW" },
      [proposal.identity + "@" + proposal.version, exemplarRef],
    );
  }
}
