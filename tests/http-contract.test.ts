import { describe, expect, it } from "vitest";
import { HTTP_ENDPOINTS, HTTP_HEADERS, HttpFailure } from "../src/http-contract.js";

describe("HTTP transport contract", () => {
  it("defines stable endpoint and correlation headers", () => {
    expect(HTTP_ENDPOINTS.submit).toBe("POST /v1/requests");
    expect(HTTP_ENDPOINTS.clarify).toContain(":petitionRef");
    expect(HTTP_HEADERS.requestId).toBe("x-request-id");
    expect(HTTP_HEADERS.operatorInstance).toBe("x-imperium-operator-instance");
  });

  it("uses a transport-neutral failure envelope", () => {
    const failure: HttpFailure = {
      ok: false,
      requestId: "http-request-1",
      error: { code: "PETITION_UNRESOLVED", message: "request requires clarification" },
    };

    expect(failure.ok).toBe(false);
    expect(failure.error.code).toBe("PETITION_UNRESOLVED");
  });
});
