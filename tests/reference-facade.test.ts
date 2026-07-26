import { describe, expect, it } from "vitest";
import { ImperiumReference } from "../src/reference.js";

describe("Imperium reference facade", () => {
  it("submits a request through Secretariat and Castellan", () => {
    const result = new ImperiumReference().submit({
      content: "Define the professional pattern.",
      sessionReference: "opaque-facade-session",
    });

    expect(result.petition.payload.finding).toBe("PETITION_RECEIVED");
    expect(result.work?.payload.petitionRef).toBe(
      result.petition.identity + "@" + result.petition.version,
    );
  });

  it("requires clarification before corrected resubmission", () => {
    const reference = new ImperiumReference();
    const submitted = reference.submit({
      content: "Investigate this.",
      sessionReference: "opaque-facade-clarification",
    });
    const pending = reference.requestClarification(
      submitted.petition,
      "scope is materially ambiguous",
    );

    expect(pending.payload.finding).toBe("PETITION_NEEDS_CLARIFICATION");
    expect(reference.clarify(pending, "Investigate the professional pattern.").work)
      .not.toBeNull();
  });
});
