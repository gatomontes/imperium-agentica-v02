-- Explicit rollback for 001_artifact_envelopes.sql.
-- Destructive: this removes the complete artifact history.
-- Execute only after an approved backup/export and rollback decision.

DROP INDEX IF EXISTS artifact_envelopes_supersedes_idx;
DROP INDEX IF EXISTS artifact_envelopes_correlation_history_idx;
DROP TABLE IF EXISTS artifact_envelopes;
