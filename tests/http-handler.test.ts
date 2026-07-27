import { describe, expect, it } from "vitest";
import { HttpTransportHandler } from "../src/http-handler.js";
import { DirectTransportAdapter } from "../src/direct-transport.js";

describe("framework-neutral HTTP handler", () => {
  it("enforces an injected authorizer", () => {
    const handler = new HttpTransportHandler(
      new DirectTransportAdapter(),
      {
        authorize: ({ authorization }) => {
          if (authorization !== "Bearer valid") throw new Error("invalid token");
        },
      },
    );

    const missing = handler.submit(
      { content: "request", sessionReference: "auth-handler" },
      { requestId: "http-auth-1", operatorInstanceId: "operator-1" },
    );
    expect(missing).toMatchObject({
      ok: false,
      error: { code: "HTTP_UNAUTHORIZED" },
    });

    const accepted = handler.submit(
      { content: "request", sessionReference: "auth-handler" },
      {
        requestId: "http-auth-2",
        operatorInstanceId: "operator-1",
        authorization: "Bearer valid",
      },
    );
    expect(accepted.ok).toBe(true);
  });

  it("wraps transport submission in a success envelope", () => {
    const handler = new HttpTransportHandler(new DirectTransportAdapter());
    const result = handler.submit(
      { content: "Define the professional pattern.", sessionReference: "http-session" },
      { requestId: "http-1", operatorInstanceId: "operator-1" },
    );

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.result.petition.payload.finding).toBe("PETITION_RECEIVED");
  });

  it("maps response preparation and dispatch", () => {
    const handler = new HttpTransportHandler(new DirectTransportAdapter());
    const submitted = handler.submit(
      { content: "Define the professional pattern.", sessionReference: "http-response" },
      { requestId: "http-3", operatorInstanceId: "operator-1" },
    );
    if (!submitted.ok) throw new Error("submission failed");

    const prepared = handler.prepareDelivery(
      submitted.result.petition,
      "fixture",
      { requestId: "http-4", operatorInstanceId: "operator-1" },
    );
    if (!prepared.ok) throw new Error("delivery preparation failed");

    const dispatched = handler.dispatchResponse(
      prepared.result.delivery,
      true,
      { requestId: "http-5", operatorInstanceId: "operator-1" },
    );

    expect(dispatched.ok).toBe(true);
    if (dispatched.ok) {
      expect(dispatched.result.delivery.payload.state).toBe(
        "RESPONSE_ACKNOWLEDGED",
      );
    }
  });

  it("rejects missing transport metadata before routing", () => {
    const handler = new HttpTransportHandler(new DirectTransportAdapter());
    const result = handler.submit(
      { content: "Define the professional pattern.", sessionReference: "http-session" },
      { requestId: "", operatorInstanceId: "" },
    );

    expect(result).toMatchObject({
      ok: false,
      requestId: "",
      error: {
        code: "HTTP_METADATA_INVALID",
      },
    });
  });

  it("maps domain failures into a stable failure envelope", () => {
    const handler = new HttpTransportHandler(new DirectTransportAdapter());
    const result = handler.submit(
      { content: "", sessionReference: "http-session" },
      { requestId: "http-2", operatorInstanceId: "operator-1" },
    );

    expect(result).toMatchObject({
      ok: false,
      requestId: "http-2",
      error: { code: "IMPERIUM_REQUEST_FAILED" },
    });
  });
});
