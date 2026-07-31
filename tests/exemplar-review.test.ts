import { describe, expect, it } from "vitest";
import { ExemplarReview } from "../src/exemplar-review.js";

describe("automatic exemplar review boundary", () => {
  it("ranks by declared merit and records bounded operator review", () => {
    const review = new ExemplarReview();
    const proposal = review.rank("corr-1", "proposition-1", [
      { exemplarRef: "exemplar-a", score: 8, evidenceRefs: ["evidence-a"], uncertainty: [] },
      { exemplarRef: "exemplar-b", score: 9, evidenceRefs: ["evidence-b"], uncertainty: ["limited sample"] },
    ]);

    expect(proposal.payload.finding).toBe("EXEMPLARS_RANKED");
    expect(proposal.payload.selectedExemplarRef).toBe("exemplar-b");
    const operatorReview = review.recordOperatorReview(proposal, "REPLACE", "exemplar-b", "material uncertainty");
    expect(operatorReview?.payload).toMatchObject({
      action: "REPLACE",
      exemplarRef: "exemplar-b",
      authority: "OPERATOR_REVIEW",
    });
    expect(operatorReview?.payload).not.toHaveProperty("personaAdmission");
  });

  it("refuses incomplete merit evidence and does not accept an unranked review", () => {
    const review = new ExemplarReview();
    const proposal = review.rank("corr-2", "proposition-2", [
      { exemplarRef: "exemplar-a", score: 8, evidenceRefs: [], uncertainty: [] },
    ]);
    expect(proposal.payload.finding).toBe("EXEMPLARS_REFUSED");
    expect(review.recordOperatorReview(proposal, "APPROVE", "exemplar-a", "looks good")).toBeNull();
  });

  it("does not require operator attributes; Hagiography remains the trait-discovery owner", () => {
    const review = new ExemplarReview();
    const proposal = review.rank("corr-3", "legal-assistant", [
      { exemplarRef: "saint-a", score: 10, evidenceRefs: ["award-a"], uncertainty: [] },
    ]);

    expect(proposal.payload.finding).toBe("EXEMPLARS_RANKED");
    expect(proposal.payload).not.toHaveProperty("requestedAttributes");

    const withOptionalAttribute = review.rank("corr-4", "legal-assistant", [
      { exemplarRef: "saint-a", score: 10, evidenceRefs: ["award-a"], uncertainty: [] },
    ], ["rigorous legal drafting"]);
    expect(withOptionalAttribute.payload.requestedAttributes).toEqual(["rigorous legal drafting"]);
  });
});
