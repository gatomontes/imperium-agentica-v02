import { describe, expect, it } from "vitest";
import { DirectTransportAdapter } from "../src/direct-transport.js";
import { HttpTransportHandler } from "../src/http-handler.js";
import { createNodeHttpServer } from "../src/node-http-server.js";

describe("Node HTTP adapter", () => {
  it("serves request submission over HTTP", async () => {
    const server = createNodeHttpServer(
      new HttpTransportHandler(new DirectTransportAdapter()),
    );
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("server did not bind");

    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/v1/requests`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-request-id": "node-http-1",
          "x-imperium-operator-instance": "operator-1",
        },
        body: JSON.stringify({
          content: "Define the professional pattern.",
          sessionReference: "node-http-session",
        }),
      });

      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toMatchObject({
        ok: true,
        requestId: "node-http-1",
        result: {
          petition: { payload: { finding: "PETITION_RECEIVED" } },
        },
      });
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });

  it("returns a client error for malformed JSON", async () => {
    const server = createNodeHttpServer(
      new HttpTransportHandler(new DirectTransportAdapter()),
    );
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("server did not bind");

    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/v1/requests`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-request-id": "node-http-3",
          "x-imperium-operator-instance": "operator-1",
        },
        body: "{not-json",
      });

      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toMatchObject({
        ok: false,
        requestId: "node-http-3",
        error: { code: "HTTP_INVALID_JSON" },
      });
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });

  it("returns a stable error for unknown routes", async () => {
    const server = createNodeHttpServer(
      new HttpTransportHandler(new DirectTransportAdapter()),
    );
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("server did not bind");

    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/unknown`, {
        headers: { "x-request-id": "node-http-2" },
      });

      expect(response.status).toBe(404);
      await expect(response.json()).resolves.toMatchObject({
        ok: false,
        requestId: "node-http-2",
        error: { code: "HTTP_ROUTE_NOT_FOUND" },
      });
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });
});
