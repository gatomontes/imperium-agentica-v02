# Persistence Admission Record

## Admitted

- TypeScript/Node remains the implementation stack.
- `ArtifactStore` is the synchronous reference boundary.
- `AsyncArtifactStore` is the durable-store boundary.
- PostgreSQL is the first durable persistence target.
- Artifact history is append-oriented.
- Schema version is tracked in `imperium_schema_migrations`.
- `(identity, version)` is the storage key.
- Supersession is transactional and row-locked.
- Correlation history is queryable and deterministic.
- The PostgreSQL adapter receives an external `pg.Pool`.
- Local integration tests are opt-in.

## Not admitted

- production database deployment;
- credentials or secret-management implementation;
- automatic migration execution;
- backup provider or retention policy;
- CI database provisioning;
- tenancy or row-level security;
- HTTP or message transport;
- Operative execution/runtime activation.

## Current verification state

The repository contains the schema migration, rollback artifact, adapter, unit coverage, and opt-in integration coverage. Full build and test execution remains a local verification step.
