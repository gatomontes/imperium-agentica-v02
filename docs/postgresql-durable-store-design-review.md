# PostgreSQL Durable Store Design Review

## Decision under review

When Imperium requires durable history, PostgreSQL is the first concrete persistence target. The domain remains dependent on `ArtifactStore`; PostgreSQL is an adapter behind that boundary.

This document is a design review, not an implementation authorization.

## Minimal relational model

Use one append-oriented artifact table:

- `identity` — text, unique with `version`
- `version` — positive integer
- `artifact_type` — text
- `status` — constrained artifact status
- `producer` — text
- `correlation_id` — text
- `created_at` — timestamptz
- `payload` — jsonb
- `source_refs` — jsonb array
- `supersedes` — nullable text
- `invalidation_reason` — nullable text

The natural key remains `(identity, version)). PostgreSQL-generated identifiers are not introduced; artifact identity remains an Imperium concern.

## Required indexes

- unique index on `(identity, version)`
- index on `correlation_id, created_at, identity`
- index on `supersedes`

Payload-specific indexes are deferred until an actual query requires them.

## Transaction boundary

`supersede(previous, successor)` must execute in one transaction:

1. Validate the successor envelope.
2. Lock the predecessor row.
3. Confirm the predecessor is stored and `CURRENT`.
4. Confirm the explicit lineage reference.
5. Confirm the successor key does not exist.
6. Mark the predecessor `SUPERSEDED`.
7. Insert the successor.
8. Commit.

Any failure rolls back both the predecessor update and successor insert.

## Concurrency

The predecessor row lock prevents two writers from superseding the same current artifact concurrently. The unique key prevents duplicate artifact versions. Serialization failures remain adapter-level errors and must not be translated into successful domain outcomes.

## Deferred decisions

- connection pooling and deployment topology;
- credentials and secret management;
- migrations tooling;
- backup, restore, retention, and archival;
- row-level security and tenancy;
- JSONB payload evolution policy;
- read replicas and event publication.

## Admission gate

Implementation should begin only after the operator approves:

- PostgreSQL as the durable target;
- the append-oriented artifact model;
- the transaction semantics;
- the migration and backup owner.
