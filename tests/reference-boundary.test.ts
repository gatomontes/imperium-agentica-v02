import { describe, expect, it } from "vitest";
import { InMemoryReferenceBoundary } from "../src/reference-boundary.js";
import { ArtifactEnvelope } from "../src/artifact.js";
import { Petition } from "../src/secretariat.js";

describe("dependency-free in-memory reference boundary", () => {
  it("coordinates valid ingress through Castellan without adding a transport", () => {
    const boundary = new InMemoryReferenceBoundary();
    const result = boundary.submit({
      content: "Define the professional pattern.",
      sessionReference: "opaque-increment-004",
    });

    expect(result.petition.payload.finding).toBe("PETITION_RECEIVED");
    expect(result.work?.payload.petitionRef).toBe(
      result.petition.identity + "@" + result.petition.version,
    );
    expect(result.work?.correlationId).toBe(result.petition.correlationId);
  });

  it("refuses unresolved ingress at the handoff", () => {
    const boundary = new InMemoryReferenceBoundary();
    const result = boundary.submit({
      content: " ",
      sessionReference: "opaque-unresolved",
    });

    expect(result.petition.payload.finding).toBe("PETITION_UNRESOLVED");
    expect(result.work).toBeNull();
  });

  it("does not hand off a non-current petition", () => {
    const boundary = new InMemoryReferenceBoundary();
    const petition = boundary.submit({
      content: "Define the professional pattern.",
      sessionReference: "opaque-stale",
    }).petition;

    const stale: ArtifactEnvelope<Petition> = {
      ...petition,
      status: "SUPERSEDED",
    };
    expect(boundary.handoff(stale)).toBeNull();
  });

  it("uses injected contracts exactly once and returns their refusal", () => {
    const petitions: ArtifactEnvelope<Petition>[] = [];
    let formationCalls = 0;
    const boundary = new InMemoryReferenceBoundary(
      {
        receive(request) {
          const petition = {
            artifactType: "Petition",
            identity: "petition-injected",
            version: 7,
            status: "CURRENT" as const,
            producer: "InjectedSecretariat",
            correlationId: "correlation-injected",
            createdAt: "2026-07-31T00:00:00.000Z",
            payload: {
              content: request.content,
              sessionReference: request.sessionReference,
              finding: "PETITION_RECEIVED" as const,
            },
            sourceRefs: [],
          };
          petitions.push(petition);
          return petition;
        },
      },
      {
        receivePetition(petition) {
          formationCalls += 1;
          expect(petition).toBe(petitions[0]);
          return null;
        },
      },
    );

    const result = boundary.submit({
      content: "Injected request",
      sessionReference: "opaque-injected",
    });

    expect(petitions).toHaveLength(1);
    expect(formationCalls).toBe(1);
    expect(result.work).toBeNull();
  });
});
