import { describe, expect, it } from "vitest";
import { InvalidationCoordinator } from "../src/invalidation.js";
import { ResponseDeliveryService } from "../src/delivery.js";

describe("invalidation and delivery boundaries", () => {
  it("suspends affected artifacts when ownership is identified", () => {
    const result = new InvalidationCoordinator().record(
      "profession-001@2",
      ["candidate-001@1", "persona-001@1"],
      "profession changed",
      "IDENTIFIED",
    );

    expect(result.payload.status).toBe("SUSPENDED");
    expect(result.payload.affectedRefs).toHaveLength(2);
  });

  it("blocks disputed invalidation ownership", () => {
    const result = new InvalidationCoordinator().record(
      "doctrine-001@2",
      ["candidate-001@1"],
      "doctrine changed",
      "DISPUTED",
    );

    expect(result.payload.status).toBe("OWNERSHIP_UNRESOLVED");
  });

  it("records response delivery retry and acknowledgement", () => {
    const service = new ResponseDeliveryService();
    const prepared = service.prepare("response-001@1", "corr-001", "fixture");
    const retry = service.dispatch(prepared, false);
    const acknowledged = service.dispatch(retry, true);

    expect(retry.supersedes).toBe(prepared.identity + "@1");
    expect(acknowledged.supersedes).toBe(retry.identity + "@2");
    expect(retry.payload.state).toBe("RESPONSE_RETRY_REQUIRED");
    expect(acknowledged.payload.state).toBe("RESPONSE_ACKNOWLEDGED");
    expect(acknowledged.payload.attempt).toBe(2);
  });

  it("rejects dispatch after acknowledgement", () => {
    const service = new ResponseDeliveryService();
    const prepared = service.prepare("response-002@1", "corr-002", "fixture");
    const acknowledged = service.dispatch(prepared, true);

    expect(() => service.dispatch(acknowledged, false)).toThrow(
      "response cannot be dispatched",
    );
  });

});
