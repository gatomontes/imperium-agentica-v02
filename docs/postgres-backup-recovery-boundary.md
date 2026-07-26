# PostgreSQL Backup and Recovery Boundary

Durable artifact history is not complete until recovery ownership is explicit.

## Minimum requirements

- backups must include the `artifact_envelopes` table and indexes;
- backup credentials must remain outside the repository;
- restore must be tested against a disposable database;
- restore verification must check schema validity and artifact-envelope counts;
- recovery must preserve `(identity, version)` uniqueness and supersession lineage;
- a failed restore must not be presented as a recovered Imperium state.

## Deferred operational decisions

- backup frequency and retention;
- provider and storage location;
- encryption and key ownership;
- recovery-point and recovery-time objectives;
- restore authority;
- archival versus active retention.

The application adapter does not own backups or recovery. Those responsibilities belong to the deployment/operations layer and must be admitted separately before production durability is claimed.
