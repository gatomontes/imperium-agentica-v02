import { describe, expect, it } from "vitest";
import { DirectTransportAdapter } from "../src/direct-transport.js";
import { HttpTransportHandler } from "../src/http-handler.js";
import {
  createNodeHttpServer,
  shutdownNodeHttpServer,
} from "../src/node-http-server.js";
import { Secretariat } from "../src/secretariat.js";

describe("live Secretariat dossier intake", () => {
  it("opens a Mission Dossier without claiming mission formation", () => {
    const result = new Secretariat().openDossier(
      {
        content: "Find the top 10 enterprise uses for agentic AI.",
        sessionReference: "operator-session-001",
        responseChannel: "chat",
      },
      "request-001",
    );

    expect(result.petition.payload.finding).toBe("PETITION_RECEIVED");
    expect(result.dossier).toMatchObject({
      artifactType: "MissionDossier",
      producer: "Secretariat",
      correlationId: "request-001",
      payload: {
        operatorSessionReference: "operator-session-001",
        originalRequest: "Find the top 10 enterprise uses for agentic AI.",
        responseChannel: "chat",
        state: "AWAITING_CASTELLAN_ASSESSMENT",
      },
    });
    expect(result.dossier.payload.petitionRef).toBe(
      result.petition.identity + "@" + result.petition.version,
    );
    expect(result.dossier.sourceRefs).toEqual([
      result.dossier.payload.petitionRef,
    ]);
  });

  it("opens but does not advance an unresolved intake", () => {
    const result = new Secretariat().openDossier({
      content: " ",
      sessionReference: "operator-session-002",
    });

    expect(result.petition.payload.finding).toBe("PETITION_UNRESOLVED");
    expect(result.dossier.payload.state).toBe("INTAKE_UNRESOLVED");
  });

  it("exposes dossier intake through HTTP", async () => {
    const server = createNodeHttpServer(
      new HttpTransportHandler(new DirectTransportAdapter()),
    );
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("server did not bind");
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:${address.port}/v1/dossiers`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-request-id": "request-http-001",
            "x-imperium-operator-instance": "operator-001",
          },
          body: JSON.stringify({
            content: "Find the top 10 enterprise uses for agentic AI.",
            sessionReference: "operator-session-http-001",
          }),
        },
      );

      expect(response.status).toBe(201);
      await expect(response.json()).resolves.toMatchObject({
        ok: true,
        requestId: "request-http-001",
        result: {
          petition: { payload: { finding: "PETITION_RECEIVED" } },
          dossier: {
            artifactType: "MissionDossier",
            payload: { state: "AWAITING_CASTELLAN_ASSESSMENT" },
          },
        },
      });
    } finally {
      await shutdownNodeHttpServer(server, 1_000);
    }
  });
});
