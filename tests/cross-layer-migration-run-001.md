# Cross-Layer Migration Run 001

## Status

Atomic migration package assembled on staging branch `migration/cross-layer-001`.

Operator execution approval: received.

Final admission becomes atomic on `main` only through the required squash merge.

## Transition

```text
CB-001 → CB-002
Authority production empty → AB-001
Provenance production empty → PB-001
```

## Target Manifest

### AB-001 — 3 / 3

- `layers/authority/production/authority-origin-contract.md`
- `layers/authority/production/authority-grant-profiles.md`
- `layers/authority/production/executive-mandate.md`

### PB-001 — 3 / 3

- `layers/provenance/production/provenance-contract.md`
- `layers/provenance/production/mission-correlation-and-isolation-contract.md`
- `layers/provenance/production/provider-intervention-ledgers.md`

### CB-002 — 33 / 33

Manifest: `layers/cognitive/production/README.md`.

## Superseded Source Paths

Exactly these three cognitive production paths are removed after their targets are verified:

- `layers/cognitive/production/executive-mandate.md`
- `layers/cognitive/production/mission-concurrency-and-isolation-contract.md`
- `layers/cognitive/production/provider-intervention-ledgers.md`

## Evidence

- Authority core: 10 PASS / 0 FAIL
- Authority profiles: 15 PASS / 0 FAIL
- Executive Mandate: 12 PASS / 0 FAIL
- Provenance core: 10 PASS / 0 FAIL
- Mission correlation: 12 PASS / 0 FAIL
- Provider ledgers: 12 PASS / 0 FAIL
- Cognitive regression: 31 PASS / 0 FAIL
- Authority–Provenance convergence Run 004: PASS
- Cross-Layer Migration Review 001: READY
- Operator decision: APPROVED

## Atomicity Rule

Intermediate staging commits are not production admission. The squash merge into `main` is the single repository transition. The pre-merge `main` head is the exact rollback point.

## Post-Merge Requirement

A separate verification record must capture the squash commit SHA and confirm target presence, source absence, manifest counts, and canonical dependency normalization.
