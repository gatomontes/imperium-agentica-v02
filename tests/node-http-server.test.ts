import { describe, expect, it } from "vitest";
import { DirectTransportAdapter } from "../src/direct-transport.js";
import { createArtifact } from "../src/artifact.js";
import { HttpTransportHandler } from "../src/http-handler.js";
import { createNodeHttpServer, shutdownNodeHttpServer } from "../src/node-http-server.js";

describe("Node HTTP adapter", () => {
  it("enforces injected authorization over HTTP", async () => {
    const handler = new HttpTransportHandler(
      new DirectTransportAdapter(),
      {
        authorize: ({ authorization }) => {
          if (authorization !== "Bearer valid") throw new Error("invalid token");
        },
      },
    );
    const server = createNodeHttpServer(handler);
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("server did not bind");

    try {
      const rejected = await fetch(`http://127.0.0.1:${address.port}/v1/requests`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-request-id": "node-auth-1",
          "x-imperium-operator-instance": "operator-1",
        },
        body: JSON.stringify({
          content: "request",
          sessionReference: "node-auth",
        }),
      });
      expect(rejected.status).toBe(400);
      await expect(rejected.json()).resolves.toMatchObject({
        error: { code: "HTTP_UNAUTHORIZED" },
      });

      const accepted = await fetch(`http://127.0.0.1:${address.port}/v1/requests`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer valid",
          "x-request-id": "node-auth-2",
          "x-imperium-operator-instance": "operator-1",
        },
        body: JSON.stringify({
          content: "request",
          sessionReference: "node-auth",
        }),
      });
      expect(accepted.status).toBe(200);
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });


  it("shuts down a listening server cleanly", async () => {
    const server = createNodeHttpServer(
      new HttpTransportHandler(new DirectTransportAdapter()),
    );
    await new Promise<void>((resolve) => server.listen(0, resolve));
    await expect(shutdownNodeHttpServer(server, 1_000)).resolves.toBeUndefined();
  });

  it("applies bounded timeout defaults and overrides", () => {
    const defaults = createNodeHttpServer(
      new HttpTransportHandler(new DirectTransportAdapter()),
    );
    const custom = createNodeHttpServer(
      new HttpTransportHandler(new DirectTransportAdapter()),
      {
        requestTimeoutMs: 5_000,
        headersTimeoutMs: 2_000,
        keepAliveTimeoutMs: 1_500,
        maxConnections: 25,
      },
    );

    expect(defaults.requestTimeout).toBe(30_000);
    expect(defaults.headersTimeout).toBe(10_000);
    expect(defaults.keepAliveTimeout).toBe(5_000);
    expect(defaults.maxConnections).toBe(100);
    expect(custom.requestTimeout).toBe(5_000);
    expect(custom.headersTimeout).toBe(2_000);
    expect(custom.keepAliveTimeout).toBe(1_500);
    expect(custom.maxConnections).toBe(25);

  });



  it("separates readiness from liveness", async () => {
    const server = createNodeHttpServer(
      new HttpTransportHandler(new DirectTransportAdapter()),
      { readinessCheck: async () => false },
    );
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("server did not bind");
    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/ready`);
      expect(response.status).toBe(503);
      await expect(response.json()).resolves.toMatchObject({
        ok: false,
        status: "not_ready",
      });
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });



  it("routes petition clarification", async () => {
    const petition = createArtifact("Petition", "Secretariat", "http-clarify", {
      originalContent: "ambiguous",
      normalizedContent: "ambiguous",
      sessionReference: "http-clarify",
      constraints: ["clarification: scope"],
      attachments: [],
      finding: "PETITION_NEEDS_CLARIFICATION",
    });
    const server = createNodeHttpServer(
      new HttpTransportHandler(new DirectTransportAdapter()),
      {
        artifactResolver: {
          resolvePetition: (ref) => ref === petition.identity ? petition : undefined,
          resolveDelivery: () => undefined,
        },
      },
    );
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("server did not bind");
    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/v1/petitions/${petition.identity}/clarifications`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-request-id": "http-clarify-1",
          "x-imperium-operator-instance": "operator-1",
        },
        body: JSON.stringify({ correctedContent: "bounded request" }),
      });
      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toMatchObject({
        ok: true,
        result: { petition: { payload: { finding: "PETITION_RECEIVED" } } },
      });
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });

  it("routes response preparation and delivery dispatch", async () => {
    const petition = createArtifact("Petition", "Secretariat", "http-lifecycle", {
      originalContent: "request",
      normalizedContent: "request",
      sessionReference: "http-lifecycle",
      constraints: [],
      attachments: [],
      finding: "PETITION_RECEIVED",
    });
    const delivery = createArtifact("ResponseDelivery", "Secretariat", "http-lifecycle", {
      responseRef: "response-1@1",
      channel: "fixture",
      state: "RESPONSE_PREPARED",
      attempt: 0,
    });
    const resolver = {
      resolvePetition: (ref: string) => ref === petition.identity ? petition : undefined,
      resolveDelivery: (ref: string) => ref === delivery.identity ? delivery : undefined,
    };
    const server = createNodeHttpServer(
      new HttpTransportHandler(new DirectTransportAdapter()),
      { artifactResolver: resolver },
    );
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("server did not bind");
    try {
      const base = `http://127.0.0.1:${address.port}`;
      const prepared = await fetch(`${base}/v1/petitions/${petition.identity}/deliveries`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-request-id": "http-route-1",
          "x-imperium-operator-instance": "operator-1",
        },
        body: JSON.stringify({ channel: "fixture" }),
      });
      expect(prepared.status).toBe(200);

      const dispatched = await fetch(`${base}/v1/deliveries/${delivery.identity}/dispatch`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-request-id": "http-route-2",
          "x-imperium-operator-instance": "operator-1",
        },
        body: JSON.stringify({ successful: true }),
      });
      expect(dispatched.status).toBe(200);
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });


  it("validates lifecycle route bodies", async () => {
    const delivery = createArtifact("ResponseDelivery", "Secretariat", "http-validation", {
      responseRef: "response-validation@1",
      channel: "fixture",
      state: "RESPONSE_PREPARED",
      attempt: 0,
    });
    const server = createNodeHttpServer(
      new HttpTransportHandler(new DirectTransportAdapter()),
      {
        artifactResolver: {
          resolvePetition: () => undefined,
          resolveDelivery: (ref) => ref === delivery.identity ? delivery : undefined,
        },
      },
    );
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("server did not bind");
    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/v1/deliveries/${delivery.identity}/dispatch`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ successful: "yes" }),
      });
      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toMatchObject({
        error: { code: "HTTP_INVALID_BODY" },
      });
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });

  it("serves an unauthenticated health endpoint", async () => {
    const server = createNodeHttpServer(
      new HttpTransportHandler(new DirectTransportAdapter()),
    );
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("server did not bind");
    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/health`);
      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toMatchObject({
        ok: true,
        status: "healthy",
      });
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });

  it("rejects unsupported methods", async () => {
    const server = createNodeHttpServer(
      new HttpTransportHandler(new DirectTransportAdapter()),
    );
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("server did not bind");
    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/v1/requests`, {
        method: "GET",
        headers: { "x-request-id": "node-method-1" },
      });
      expect(response.status).toBe(405);
      expect(response.headers.get("allow")).toBe("POST");
      await expect(response.json()).resolves.toMatchObject({
        error: { code: "HTTP_METHOD_NOT_ALLOWED" },
      });
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });

  it("rejects invalid request body shapes", async () => {
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
          "x-request-id": "node-body-1",
          "x-imperium-operator-instance": "operator-1",
        },
        body: JSON.stringify({ content: 42, sessionReference: true }),
      });
      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toMatchObject({
        error: { code: "HTTP_INVALID_BODY" },
      });
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });

  it("generates a request ID when the client omits one", async () => {
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
          "x-imperium-operator-instance": "operator-1",
        },
        body: JSON.stringify({
          content: "request",
          sessionReference: "generated-request-id",
        }),
      });

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.requestId).toMatch(/^http-[0-9a-f-]{36}$/);
      expect(response.headers.get("x-request-id")).toBe(body.requestId);
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });

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
      expect(response.headers.get("x-request-id")).toBe("node-http-1");
      expect(response.headers.get("cache-control")).toBe("no-store");
      expect(response.headers.get("x-content-type-options")).toBe("nosniff");
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

  it("rejects unsupported content types", async () => {
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
          "content-type": "text/plain",
          "x-request-id": "node-http-4",
          "x-imperium-operator-instance": "operator-1",
        },
        body: "{}",
      });

      expect(response.status).toBe(415);
      await expect(response.json()).resolves.toMatchObject({
        ok: false,
        error: { code: "HTTP_UNSUPPORTED_CONTENT_TYPE" },
      });
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });

  it("rejects bodies larger than 1 MiB", async () => {
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
          "x-request-id": "node-http-5",
          "x-imperium-operator-instance": "operator-1",
        },
        body: "x".repeat(1024 * 1024 + 1),
      });

      expect(response.status).toBe(413);
      await expect(response.json()).resolves.toMatchObject({
        ok: false,
        error: { code: "HTTP_BODY_TOO_LARGE" },
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
