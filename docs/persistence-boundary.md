# Persistence Boundary

The reference implementation exposes persistence through `ArtifactStore`. Domain services depend on this contract, not on a database, ORM, filesystem, or network service.

## Required invariants

- The stable storage key is `identity@version`.
- Artifact envelopes are schema-validated before storage.
- Duplicate artifact versions are rejected.
- Supersession requires an explicit `supersedes` reference.
- Only a stored `CURRENT` predecessor may be superseded.
- Supersession is atomic: validation or conflict failure must not mutate the predecessor.
- Correlation history is queryable without collapsing superseded artifacts.
- Correlation results are ordered deterministically by `createdAt`, then identity.
- Mixed artifact payloads are returned as `unknown`; callers must narrow by artifact type.

## Deliberately undecided

This boundary does not select:

- SQL, document, graph, or key-value storage;
- local versus remote deployment;
- transaction technology;
- backup and recovery policy;
- retention or archival policy;
- multi-operator tenancy.

The in-memory repository is a reference implementation for contract tests, not the production persistence decision.
