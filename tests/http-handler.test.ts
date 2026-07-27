import { describe, expect, it } from "vitest";
import { HttpTransportHandler } from "../src/http-handler.js";
import { DirectTransportAdapter } from "../src/direct-transport.js";

describe("framework-neutral HTTP handler", () => {
  it("wraps transport submission in a success envelope", () => {
    const handler = new HttpTransportHandler(new DirectTransportAdapter());
    const result = handler.submit(
      { content: "Define the professional pattern.", sessionReference: "http-session" },
      { requestId: "http-1", operatorInstanceId: "operator-1" },
    );

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.result.petition.payload.finding).toBe("PETITION_RECEIVED");
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
