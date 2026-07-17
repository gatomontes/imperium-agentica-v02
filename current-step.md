# Current Step

## Status

No active step.

Authority-grant profile design completed on 2026-07-17.

This file is not doctrine, a roadmap, or architecture.

It is the operational continuity surface for the currently active step.

---

## Last Completed Step

Define and pressure the smallest authority-grant profile model.

## Verified Result

```text
Authority Origin Test Run 001:
10 PASS / 0 FAIL

Authority Grant Profile Run 001:
15 PASS / 0 FAIL

Provenance Test Run 002:
10 PASS / 0 FAIL

Artifact-Definition Origin Run 001:
8 PASS / 0 FAIL

Authority–Provenance Convergence Run 003:
PASS
```

## Admitted Draft Finding

Six authority profiles are sufficient:

```text
INTERNAL_ADMISSION
INTERNAL_PLACEMENT
MISSION_ENVELOPE
EXECUTIVE_DECISION
CAPABILITY_TOOL
CAPABILITY_ACCESS
```

Separate grant profiles are not justified for:

```text
launch
closure
release
individual instructions
```

Launch and terminal actions must be explicit Mission Envelope action classes.

Substantive decisions also require an effective Executive Decision grant.

Release is an authorized consequence of exactly matched closure.

## Root Boundary

```text
IMPERIUM_STEWARDSHIP
→ internal admission and placement only

CONTROLLED_RESOURCE
DELEGATED_AUTHORITY
LEGAL_OR_CONTRACTUAL_AUTHORITY
→ may support external mission action within represented scope
```

The operator may be the first internal Principal.

Operator stewardship of Imperium does not imply universal external authority.

## Production Status

```text
Authority production: EMPTY
Provenance production: EMPTY
CB-001 production: UNCHANGED
Migration: NOT AUTHORIZED
```

---

## Next Eligible Step

Prepare the first dependency-closed migration and production-admission manifest for:

```text
executive-mandate.md
→ authority

mission-concurrency-and-isolation-contract.md
→ provenance

provider-intervention-ledgers.md
→ provenance
```

The preflight must identify all references, required splits, target metadata, regression tests, atomic movement rules, and rollback conditions.

No production movement may occur without explicit operator approval after reviewing the manifest.

See `next-steps.md`.

---

## Reading Set

1. `README.md`
2. `current-step.md`
3. `next-steps.md`
4. `layers/authority/README.md`
5. `layers/authority/drafts/authority-origin-contract.md`
6. `layers/authority/drafts/authority-grant-profiles.md`
7. `layers/provenance/README.md`
8. `layers/provenance/drafts/provenance-contract.md`
9. `tests/authority/authority-test-run-001.md`
10. `tests/authority/authority-grant-profile-run-001.md`
11. `tests/provenance/provenance-test-run-002.md`
12. `tests/authority-provenance-convergence-run-003.md`
13. `drafts/cb-001-layer-placement-review.md`

---

## Invariants To Preserve

- Authority and provenance remain parallel.
- One artifact contract has one native concern.
- No grant profile implies an authority institution.
- Operator internal stewardship is not external authority.
- Instructions are not automatically grants.
- Procedure remains parked.
- Authority and provenance production remain empty.
- CB-001 remains unchanged until an approved atomic migration.
