# Runtime Reference

## Status

Stable nonproduction placement for the dependency-free Runtime reference implementation.

This directory is Runtime-owned executable reference material. It is not part of the admitted `RTB-002` production manifest and does not represent a deployed or production-ready Runtime.

## Why This Location Exists

The implementation survived three separate evidence increments:

1. contract-bound reference dispatch
2. single-node filesystem recovery
3. deterministic distributed-concurrency pressure

Keeping the implementation under `tests/` made tests both owner and consumer. Repeated reuse now justifies one layer-owned nonproduction home while tests remain its independent consumers.

## Supported Reference Surface

The private package manifest exposes only these paths:

| Export | Purpose |
|---|---|
| `@imperium-agentica/runtime-reference` | `ReferenceRuntime` effect-boundary realization |
| `@imperium-agentica/runtime-reference/contracts` | exact admitted contract pins and validators |
| `@imperium-agentica/runtime-reference/adapters/in-memory` | deterministic in-memory stores and simulated ports |
| `@imperium-agentica/runtime-reference/adapters/file` | single-process append-and-fsync filesystem evidence |
| `@imperium-agentica/runtime-reference/coordination/deterministic` | linearizable in-memory quorum and fencing oracle |

The placement and export names are stable enough for repository tests and future bounded investigations. Behavior remains revisable and contestable by evidence.

## Ownership Boundary

Runtime owns the operational implementation and adapter mechanics in this directory.

It consumes but does not own the cited Cognitive, Authority, Provenance, or Procedure contracts. Encoding those contracts in software does not transfer their semantic ownership.

## Nonproduction Boundary

`reference/` is intentionally parallel to `drafts/` and `production/`:

```text
layers/runtime/
├── drafts/       # retained semantic source drafts
├── production/   # admitted Runtime semantic artifacts
└── reference/    # nonproduction executable reference material
```

This placement does not establish:

- production admission or deployment
- consensus correctness or a networked cluster
- production durability or cross-platform power-loss safety
- provider integration or idempotency
- credential custody or safety
- performance, availability, or live-recovery guarantees
- external-effect authority

## Verification

Executable consumers remain under:

`tests/runtime/reference-implementation-001/`

The test package imports this location directly and contains no duplicate source tree.
