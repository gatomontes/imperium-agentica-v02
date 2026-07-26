import type { Pool, PoolClient } from "pg";
import { ArtifactEnvelope } from "./artifact.js";
import { artifactKey, AsyncArtifactStore } from "./artifact-store.js";
import { assertArtifactEnvelope } from "./schema.js";

type ArtifactRow = {
  identity: string;
  version: number;
  artifact_type: string;
  status: ArtifactEnvelope<unknown>["status"];
  producer: string;
  correlation_id: string;
  created_at: Date | string;
  payload: unknown;
  source_refs: string[];
  supersedes: string | null;
  invalidation_reason: string | null;
};

function fromRow<T>(row: ArtifactRow): ArtifactEnvelope<T> {
  return {
    artifactType: row.artifact_type,
    identity: row.identity,
    version: row.version,
    status: row.status,
    producer: row.producer,
    correlationId: row.correlation_id,
    createdAt: new Date(row.created_at).toISOString(),
    payload: row.payload as T,
    sourceRefs: row.source_refs,
    ...(row.supersedes ? { supersedes: row.supersedes } : {}),
    ...(row.invalidation_reason
      ? { invalidationReason: row.invalidation_reason }
      : {}),
  };
}

export class PostgresArtifactStore implements AsyncArtifactStore {
  constructor(private readonly pool: Pool) {}

  async save<T>(artifact: ArtifactEnvelope<T>): Promise<ArtifactEnvelope<T>> {
    assertArtifactEnvelope(artifact);
    try {
      await this.pool.query(
      `INSERT INTO artifact_envelopes
        (identity, version, artifact_type, status, producer, correlation_id,
         created_at, payload, source_refs, supersedes, invalidation_reason)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9::jsonb, $10, $11)`,
      [
        artifact.identity,
        artifact.version,
        artifact.artifactType,
        artifact.status,
        artifact.producer,
        artifact.correlationId,
        artifact.createdAt,
        JSON.stringify(artifact.payload),
        JSON.stringify(artifact.sourceRefs),
        artifact.supersedes ?? null,
        artifact.invalidationReason ?? null,
      ],
      );
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new Error(
          "artifact version already exists: " +
            artifactKey(artifact.identity, artifact.version),
        );
      }
      throw error;
    }
    return artifact;
  }

  async get<T>(
    identity: string,
    version: number,
  ): Promise<ArtifactEnvelope<T> | undefined> {
    const result = await this.pool.query<ArtifactRow>(
      `SELECT identity, version, artifact_type, status, producer,
              correlation_id, created_at, payload, source_refs,
              supersedes, invalidation_reason
         FROM artifact_envelopes
        WHERE identity = $1 AND version = $2`,
      [identity, version],
    );
    return result.rows[0] ? fromRow<T>(result.rows[0]) : undefined;
  }

  async findByCorrelationId(
    correlationId: string,
  ): Promise<ArtifactEnvelope<unknown>[]> {
    const result = await this.pool.query<ArtifactRow>(
      `SELECT identity, version, artifact_type, status, producer,
              correlation_id, created_at, payload, source_refs,
              supersedes, invalidation_reason
         FROM artifact_envelopes
        WHERE correlation_id = $1
        ORDER BY created_at ASC, identity ASC`,
      [correlationId],
    );
    return result.rows.map(fromRow);
  }

  async supersede<T>(
    previous: ArtifactEnvelope<T>,
    successor: ArtifactEnvelope<T>,
  ): Promise<ArtifactEnvelope<T>> {
    if (successor.supersedes !== artifactKey(previous.identity, previous.version)) {
      throw new Error("successor must explicitly supersede previous artifact");
    }
    assertArtifactEnvelope(successor);

    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const stored = await client.query<ArtifactRow>(
        `SELECT identity, version, artifact_type, status, producer,
                correlation_id, created_at, payload, source_refs,
                supersedes, invalidation_reason
           FROM artifact_envelopes
          WHERE identity = $1 AND version = $2
          FOR UPDATE`,
        [previous.identity, previous.version],
      );
      if (!stored.rows[0]) throw new Error("previous artifact is not stored");
      if (stored.rows[0].status !== "CURRENT") {
        throw new Error("previous artifact is not current");
      }

      const duplicate = await client.query(
        `SELECT 1 FROM artifact_envelopes
          WHERE identity = $1 AND version = $2`,
        [successor.identity, successor.version],
      );
      if (duplicate.rowCount) {
        throw new Error(
          "artifact version already exists: " +
            artifactKey(successor.identity, successor.version),
        );
      }

      await client.query(
        `UPDATE artifact_envelopes
            SET status = 'SUPERSEDED'
          WHERE identity = $1 AND version = $2`,
        [previous.identity, previous.version],
      );
      await insertWithClient(client, successor);
      await client.query("COMMIT");
      return successor;
    } catch (error) {
      await client.query("ROLLBACK");
      if (isUniqueViolation(error)) {
        throw new Error(
          "artifact version already exists: " +
            artifactKey(successor.identity, successor.version),
        );
      }
      throw error;
    } finally {
      client.release();
    }
  }
}

async function insertWithClient<T>(
  client: PoolClient,
  artifact: ArtifactEnvelope<T>,
): Promise<void> {
  await client.query(
    `INSERT INTO artifact_envelopes
      (identity, version, artifact_type, status, producer, correlation_id,
       created_at, payload, source_refs, supersedes, invalidation_reason)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9::jsonb, $10, $11)`,
    [
      artifact.identity,
      artifact.version,
      artifact.artifactType,
      artifact.status,
      artifact.producer,
      artifact.correlationId,
      artifact.createdAt,
      JSON.stringify(artifact.payload),
      JSON.stringify(artifact.sourceRefs),
      artifact.supersedes ?? null,
      artifact.invalidationReason ?? null,
    ],
  );
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}
