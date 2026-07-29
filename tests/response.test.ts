import { describe, expect, it } from "vitest";
import { prepareOperatorResponse } from "../src/response.js";
import { Secretariat } from "../src/secretariat.js";

describe("operator response artifact", () => {
  it("preserves Petition correlation separately from delivery", () => {
    const petition = new Secretariat().receive({
      content: "Define the professional pattern.",
      sessionReference: "opaque-response-content",
    });
    const response = prepareOperatorResponse(
      petition,
      "The request was received.",
    );

    expect(response.correlationId).toBe(petition.correlationId);
    expect(response.payload.petitionRef).toBe(
      petition.identity + "@" + petition.version,
    );
  });

  it("rejects empty response content", () => {
    const petition = new Secretariat().receive({
      content: "Define the professional pattern.",
      sessionReference: "opaque-response-empty",
    });
    expect(() => prepareOperatorResponse(petition, " ")).toThrow(
      "response content cannot be empty",
    );
  });
});
