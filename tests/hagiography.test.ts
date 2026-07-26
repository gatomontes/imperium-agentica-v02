import { describe, expect, it } from "vitest";
import { Hagiography } from "../src/hagiography.js";

describe("Hagiography synthetic Canon evaluator", () => {
  it("preserves the evidence-to-trait chain", () => {
    const result = new Hagiography().canonize({
      syntheticSource: true,
      sourceRef: "synthetic-saint-001@1",
      performanceEvidence: "Resolved conflicting source reports.",
      observedBehavior: "Compared claims before deciding.",
      boundedTrait: "evidence-first comparison",
      conditions: ["when sources conflict"],
      limits: ["does not establish truth by itself"],
      counterweights: ["seek independent corroboration"],
      ec01Disposition: "ADMISSIBLE FOR CANON REVIEW",
    });

    expect(result.payload.finding).toBe("TRAIT_CANON_CONFORMANT");
    expect(result.payload.boundedTrait).toBe("evidence-first comparison");
    expect(result.payload.syntheticSource).toBe(true);
  });

  it("blocks incomplete or non-synthetic canonization", () => {
    const result = new Hagiography().canonize({
      syntheticSource: false,
      boundedTrait: "unsupported trait",
    });

    expect(result.payload.finding).toBe("TRAIT_CANON_UNRESOLVED");
  });
});
