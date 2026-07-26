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
