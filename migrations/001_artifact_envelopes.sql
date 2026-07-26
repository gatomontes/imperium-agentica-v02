CREATE TABLE IF NOT EXISTS imperium_schema_migrations (
  version TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS artifact_envelopes (
  identity TEXT NOT NULL,
  version INTEGER NOT NULL CHECK (version > 0),
  artifact_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (
    status IN ('CURRENT', 'REFUSED', 'UNRESOLVED', 'SUPERSEDED', 'INVALIDATED')
  ),
  producer TEXT NOT NULL,
  correlation_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  payload JSONB NOT NULL,
  source_refs JSONB NOT NULL CHECK (jsonb_typeof(source_refs) = 'array'),
  supersedes TEXT,
  invalidation_reason TEXT,
  PRIMARY KEY (identity, version)
);

CREATE INDEX artifact_envelopes_correlation_history_idx
  ON artifact_envelopes (correlation_id, created_at, identity);

CREATE INDEX artifact_envelopes_supersedes_idx
  ON artifact_envelopes (supersedes)
  WHERE supersedes IS NOT NULL;

INSERT INTO imperium_schema_migrations (version)
VALUES ('001_artifact_envelopes')
ON CONFLICT (version) DO NOTHING;
