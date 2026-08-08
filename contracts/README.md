# Artifact Contracts

This directory defines machine-readable exchange contracts shared by Offices.
The contracts do not create cognitive authority. They make the identity,
lineage, state, and evidence required by doctrine structurally explicit.

- [`profile-artifact.md`](profile-artifact.md) defines the constitutional
  Profile artifact and lifecycle.
- [`profile-artifact.schema.json`](profile-artifact.schema.json) validates the
  immutable Profile envelope. Lifecycle attestations are separate records that
  bind the envelope's `profile_id`, `profile_version`, and `content_digest`.
- [`profile-attestation.schema.json`](profile-attestation.schema.json)
  validates those append-only lifecycle records.

