# Procedure Admission Migration Run 001

## Status

Staging verification passed. Atomic merge and post-merge verification pending.

## Authorization

Explicit operator execution approval received on 2026-07-18.

## Transition

```text
CB-002 → CB-003
AB-001 → AB-002
PB-001 → unchanged
Procedure production empty → PRB-001
Runtime → unchanged and unadmitted
```

## Migration Source

- manifest: `drafts/procedure-admission-migration-manifest-001.md`
- review: `tests/cross-layer-procedure-migration-review-001.md`
- staging branch: `agent/procedure-admission-001`
- rollback parent: `8b2a2893d3d1e9686648fc61e24e12bcbb00b11d`
- merge SHA: pending

## Pre-Deletion Verification

All target manifest entries resolved before deletion:

- PRB-001: 3 / 3
- AB-002: 5 / 5
- CB-003: 33 / 33
- PB-001: 3 / 3 unchanged
- total resolved entries: 44 / 44
- migrated-contract draft-citation scan: 0 live stale citations
- unadmitted-status scan: 0 failures

## Approved Deletions

Exactly two superseded Cognitive production sources were removed after target verification:

1. `layers/cognitive/production/lifecycle.md`
2. `layers/cognitive/production/production-artifacts.md`

Both paths returned absent on the staging branch after deletion.

## Evidence Preserved

- Procedural Split Run 001 — 16 PASS / 0 FAIL
- Procedure Pressure Run 002 — 35 PASS / 0 FAIL
- Mission Envelope Run 002 — 15 PASS / 0 FAIL
- Capability Grant Run 002 — 15 PASS / 0 FAIL
- Completion Assessment Run 001 — 10 PASS / 0 FAIL
- Cognitive Constitutional Run 018 — 33 PASS / 0 FAIL
- Authority Regression Run 002 — 67 PASS / 0 FAIL
- Provenance Regression Run 003 — 34 PASS / 0 FAIL
- Procedure Convergence Run 002 — 21 PASS / 0 FAIL

The first convergence run remains explicitly superseded by the corrected reassessment.

## Non-Admissions

This migration does not admit:

- Runtime
- a universal Proof layer
- an Ownership layer
- a central Artifact layer

## Post-Merge Requirements

- record the squash merge SHA
- confirm the rollback parent
- resolve all four manifests on `main`
- confirm both deleted paths remain absent
- repeat the production draft-citation and status scans
