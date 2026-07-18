# Current Step

## Status

No active step.

Cross-layer migration preflight completed on 2026-07-17.

This file is not doctrine, a roadmap, or architecture.

It is the operational continuity surface for the currently active step.

---

## Last Completed Step

Prepare the first dependency-closed cross-layer migration manifest.

## Manifest

```text
drafts/cross-layer-migration-manifest-001.md
```

## Result

```text
Transition:
CB-001 → CB-002
empty Authority production → AB-001
empty Provenance production → PB-001

Dependency graph: COMPLETE FOR FIRST MANIFEST
Target drafts: 3 MISSING
Target specialization tests: MISSING
Cognitive regression run: MISSING
Production admission reviews: MISSING
Atomic migration: NOT READY
```

## Candidate Relocations

```text
layers/cognitive/production/executive-mandate.md
→ layers/authority/production/executive-mandate.md

layers/cognitive/production/mission-concurrency-and-isolation-contract.md
→ layers/provenance/production/mission-correlation-and-isolation-contract.md

layers/cognitive/production/provider-intervention-ledgers.md
→ layers/provenance/production/provider-intervention-ledgers.md
```

## Candidate Baselines

```text
AB-001: 3 artifacts
PB-001: 3 artifacts
CB-002: 33 cognitive artifacts
```

CB-002 may incorporate unchanged CB-001 artifact versions by exact manifest reference.

No unchanged file must be rewritten merely to change baseline membership.

## Production Status

```text
Authority production: EMPTY
Provenance production: EMPTY
CB-001 production: UNCHANGED
Migration: NOT AUTHORIZED
```

---

## Next Eligible Step

Materialize three target drafts without changing production:

```text
layers/authority/drafts/executive-mandate.md
layers/provenance/drafts/mission-correlation-and-isolation-contract.md
layers/provenance/drafts/provider-intervention-ledgers.md
```

Then run specialization, cognitive regression, and convergence tests and prepare four admission reviews.

No migration may occur until the completed package receives explicit operator approval.

See `next-steps.md`.

---

## Reading Set

1. `README.md`
2. `current-step.md`
3. `next-steps.md`
4. `drafts/cross-layer-migration-manifest-001.md`
5. `drafts/cb-001-layer-placement-review.md`
6. `layers/authority/drafts/authority-origin-contract.md`
7. `layers/authority/drafts/authority-grant-profiles.md`
8. `layers/provenance/drafts/provenance-contract.md`
9. `tests/authority-provenance-convergence-run-003.md`

---

## Invariants To Preserve

- No source production file is removed before verified target production exists.
- Target drafts do not create competing production origins.
- The final migration must be one atomic tree commit.
- Authority and provenance remain parallel.
- Artifact meaning follows native-concern ownership.
- Procedure remains parked.
- CB-001 remains current until approved migration.
