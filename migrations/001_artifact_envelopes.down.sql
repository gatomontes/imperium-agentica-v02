-- Explicit rollback for 001_artifact_envelopes.sql.
-- Destructive: this removes the complete artifact history.
-- Execute only after an approved backup/export and rollback decision.

DELETE FROM imperium_schema_migrations
 WHERE version = '001_artifact_envelopes';

DROP INDEX IF EXISTS artifact_envelopes_supersedes_idx;
DROP INDEX IF EXISTS artifact_envelopes_correlation_history_idx;
DROP TABLE IF EXISTS artifact_envelopes;

DROP TABLE IF EXISTS imperium_schema_migrations;
