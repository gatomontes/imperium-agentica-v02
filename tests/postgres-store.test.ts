import { describe, expect, it } from "vitest";
import type { Pool } from "pg";
import { createArtifact } from "../src/artifact.js";
import { PostgresArtifactStore } from "../src/postgres-store.js";

describe("PostgresArtifactStore", () => {
  it("uses parameterized SQL for artifact insertion", async () => {
    const calls: Array<{ text: string; values: unknown[] }> = [];
    const pool = {
      query: async (text: string, values: unknown[]) => {
        calls.push({ text, values });
        return { rows: [], rowCount: 1 };
      },
    } as unknown as Pool;

    const store = new PostgresArtifactStore(pool);
    const artifact = createArtifact(
      "Petition",
      "Secretariat",
      "corr-pg",
      { content: "request" },
      ["operator-input"],
      {
        identityFactory: () => "petition-pg-1",
        now: () => "2026-07-26T12:00:00.000Z",
      },
    );

    await store.save(artifact);

    expect(calls).toHaveLength(1);
    expect(calls[0].text).toContain("VALUES ($1, $2, $3");
    expect(calls[0].text).not.toContain(artifact.payload.content);
    expect(calls[0].values).toEqual([
      "petition-pg-1",
      1,
      "Petition",
      "CURRENT",
      "Secretariat",
      "corr-pg",
      "2026-07-26T12:00:00.000Z",
      JSON.stringify({ content: "request" }),
      JSON.stringify(["operator-input"]),
      null,
      null,
    ]);
  });
  it("maps database rows back to artifact envelopes", async () => {
    const pool = {
      query: async () => ({
        rows: [
          {
            identity: "petition-pg-2",
            version: 1,
            artifact_type: "Petition",
            status: "CURRENT",
            producer: "Secretariat",
            correlation_id: "corr-pg-read",
            created_at: "2026-07-26T12:00:00.000Z",
            payload: { content: "request" },
            source_refs: ["operator-input"],
            supersedes: null,
            invalidation_reason: null,
          },
        ],
        rowCount: 1,
      }),
    } as unknown as Pool;

    const store = new PostgresArtifactStore(pool);
    await expect(store.get("petition-pg-2", 1)).resolves.toEqual({
      artifactType: "Petition",
      identity: "petition-pg-2",
      version: 1,
      status: "CURRENT",
      producer: "Secretariat",
      correlationId: "corr-pg-read",
      createdAt: "2026-07-26T12:00:00.000Z",
      payload: { content: "request" },
      sourceRefs: ["operator-input"],
    });
  });

  it("returns correlation history in database-defined order", async () => {
    const pool = {
      query: async () => ({
        rows: [
          {
            identity: "petition-pg-3",
            version: 1,
            artifact_type: "Petition",
            status: "CURRENT",
            producer: "Secretariat",
            correlation_id: "corr-pg-history",
            created_at: "2026-07-26T11:00:00.000Z",
            payload: { content: "request" },
            source_refs: [],
            supersedes: null,
            invalidation_reason: null,
          },
          {
            identity: "work-pg-3",
            version: 1,
            artifact_type: "WorkSpecification",
            status: "CURRENT",
            producer: "Castellan",
            correlation_id: "corr-pg-history",
            created_at: "2026-07-26T12:00:00.000Z",
            payload: { work: "form" },
            source_refs: ["petition-pg-3@1"],
            supersedes: null,
            invalidation_reason: null,
          },
        ],
        rowCount: 2,
      }),
    } as unknown as Pool;

    const store = new PostgresArtifactStore(pool);
    await expect(store.findByCorrelationId("corr-pg-history")).resolves.toHaveLength(2);
    await expect(store.findByCorrelationId("corr-pg-history")).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ identity: "petition-pg-3" }),
        expect.objectContaining({ identity: "work-pg-3" }),
      ]),
    );
  });

  it("normalizes duplicate-key failures", async () => {
    const pool = {
      query: async () => {
        throw Object.assign(new Error("duplicate key"), { code: "23505" });
      },
    } as unknown as Pool;

    const store = new PostgresArtifactStore(pool);
    const artifact = createArtifact("Petition", "Secretariat", "corr-pg-duplicate", {
      content: "request",
    });

    await expect(store.save(artifact)).rejects.toThrow(
      "artifact version already exists",
    );
  });
});
