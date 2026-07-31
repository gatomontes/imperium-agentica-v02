import { describe, expect, it } from "vitest";
import { InMemoryReferenceBoundary } from "../src/reference-boundary.js";
import { Secretariat } from "../src/secretariat.js";

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
    const petition = new Secretariat().receive({
      content: "Define the professional pattern.",
      sessionReference: "opaque-stale",
    });

    const stale = { ...petition, status: "SUPERSEDED" as const };
    expect(boundary.handoff(stale)).toBeNull();
  });
});
