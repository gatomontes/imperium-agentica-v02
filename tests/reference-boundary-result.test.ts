import { describe, expect, it } from "vitest";
import { InMemoryReferenceBoundary } from "../src/reference-boundary.js";
import { ArtifactEnvelope } from "../src/artifact.js";
import { Petition } from "../src/secretariat.js";

const petition = (status: ArtifactEnvelope<Petition>["status"] = "CURRENT"): ArtifactEnvelope<Petition> => ({
  artifactType: "Petition", identity: "petition-result", version: 1, status, producer: "Test",
  correlationId: "correlation-result", createdAt: "2026-07-31T00:00:00.000Z",
  payload: { originalContent: "request", normalizedContent: "request", sessionReference: "session",
    constraints: [], attachments: [], finding: "PETITION_RECEIVED" }, sourceRefs: [],
});

describe("reference-boundary result envelope", () => {
  it("returns ACCEPTED with formed work and complete petition envelope", () => {
    const result = new InMemoryReferenceBoundary().submit({ content: "Define the professional pattern.", sessionReference: "accepted" });
    expect(result.disposition).toBe("ACCEPTED");
    expect(result.petition.artifactType).toBe("Petition");
    expect(result.work?.payload.petitionRef).toBe(result.petition.identity + "@" + result.petition.version);
  });
  it("returns UNRESOLVED without invoking formation", () => {
    let calls = 0;
    const boundary = new InMemoryReferenceBoundary(undefined, { receivePetition: () => { calls += 1; return null; } });
    const result = boundary.submit({ content: " ", sessionReference: "unresolved" });
    expect(result.disposition).toBe("UNRESOLVED");
    expect(result.work).toBeNull();
    expect(calls).toBe(0);
  });
  it("preserves an explicit UNRESOLVED petition status", () => {
    const result = new InMemoryReferenceBoundary().handoffResult(petition("UNRESOLVED"));
    expect(result.petition).toEqual(petition("UNRESOLVED"));
    expect(result.disposition).toBe("UNRESOLVED");
    expect(result.work).toBeNull();
  });
  it.each([["SUPERSEDED", "STALE"], ["INVALIDATED", "INVALIDATED"]] as const)("classifies %s", (status, disposition) => {
    const result = new InMemoryReferenceBoundary().handoffResult(petition(status));
    expect(result.petition).toEqual(petition(status));
    expect(result.disposition).toBe(disposition);
    expect(result.work).toBeNull();
  });
  it("returns REFUSED when formation declines a valid petition", () => {
    const result = new InMemoryReferenceBoundary(undefined, { receivePetition: () => null }).handoffResult(petition());
    expect(result.petition).toEqual(petition());
    expect(result.disposition).toBe("REFUSED");
    expect(result.work).toBeNull();
  });
});
