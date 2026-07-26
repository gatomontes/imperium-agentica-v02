import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Pool } from "pg";
import { createArtifact } from "../src/artifact.js";
import { PostgresArtifactStore } from "../src/postgres-store.js";

const enabled = process.env.IMPERIUM_POSTGRES_TEST === "1";

describe.skipIf(!enabled)("PostgresArtifactStore integration", () => {
  const pool = new Pool();
  const store = new PostgresArtifactStore(pool);
  const correlationId = "integration-" + Date.now();

  beforeAll(async () => {
    await pool.query(
      "DELETE FROM artifact_envelopes WHERE correlation_id = $1",
      [correlationId],
    );
  });

  afterAll(async () => {
    await pool.query(
      "DELETE FROM artifact_envelopes WHERE correlation_id = $1",
      [correlationId],
    );
    await pool.end();
  });

  it("persists, reads, and retrieves correlation history", async () => {
    const petition = createArtifact(
      "Petition",
      "Secretariat",
      correlationId,
      { content: "integration request" },
    );

    await store.save(petition);

    await expect(
      store.get(petition.identity, petition.version),
    ).resolves.toMatchObject({
      identity: petition.identity,
      correlationId,
      payload: { content: "integration request" },
    });

    await expect(store.findByCorrelationId(correlationId)).resolves.toHaveLength(
      1,
    );
  });

  it("commits supersession atomically", async () => {
    const previous = createArtifact(
      "Petition",
      "Secretariat",
      correlationId,
      { content: "before" },
    );
    const successor = {
      ...createArtifact(
        "Petition",
        "Secretariat",
        correlationId,
        { content: "after" },
      ),
      supersedes: previous.identity + "@" + previous.version,
    };

    await store.save(previous);
    await store.supersede(previous, successor);

    await expect(
      store.get(previous.identity, previous.version),
    ).resolves.toMatchObject({ status: "SUPERSEDED" });
    await expect(
      store.get(successor.identity, successor.version),
    ).resolves.toEqual(successor);
  });
});
