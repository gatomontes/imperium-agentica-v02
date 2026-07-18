# Next Steps

## Status

No active step.

This file is not doctrine, a roadmap, or architecture.

It is an ordered list of candidate next actions.

When a step becomes current, remove it from this file and place it in `current-step.md`. Do not duplicate active work across both files.

---

## Queue

### 1. Execute atomic cross-layer migration

Transition:

```text
CB-001 → CB-002
empty Authority production → AB-001
empty Provenance production → PB-001
```

Manifest:

`drafts/cross-layer-migration-manifest-001.md`

Admission decision package:

`tests/cross-layer-migration-review-001.md`

Constraints:

- one preverified tree
- one commit
- no partial production state
- exact parent preserved for rollback
- three target production artifacts plus Authority and Provenance native contracts
- three cognitive source deletions
- complete consumer and index normalization
- no Procedure or Runtime admission

Activation condition:

Explicit operator execution approval.

---

### 2. Verify post-migration production

Required:

- AB-001 manifest 3 / 3
- PB-001 manifest 3 / 3
- CB-002 manifest 33 / 33
- source deletions 3 / 3
- canonical path scan
- regression and convergence status
- operational tracker closure

Activation condition:

Atomic migration commit exists.

---

### 3. Split contested procedural candidates

Candidates:

- `counsel-availability-contract.md`
- `mission-closure-and-release-contract.md`
- `lifecycle.md`
- `production-artifacts.md`

Activation condition:

Cross-layer migration is verified and the procedural boundary is approved.

---

### 4. Redefine and test the procedural layer

Procedure remains:

```text
what is supposed to happen,
in what order,
under which conditions
```

It must cite admitted external definitions and may originate none of them.

---

### 5. Reconsider Vellum only if a record gap appears

Activation condition:

A scenario demonstrates a canonical record behavior existing artifacts cannot preserve.
