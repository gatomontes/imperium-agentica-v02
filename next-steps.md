# Next Steps

## Status

No active step.

This file is an ordered operational queue, not doctrine, architecture, or a roadmap.

## Queue

### 1. Execute atomic Procedure admission migration

Candidate transition:

```text
CB-002 → CB-003
AB-001 → AB-002
PB-001 → unchanged
Procedure production empty → PRB-001
```

Manifest:

`drafts/procedure-admission-migration-manifest-001.md`

Review:

`tests/cross-layer-procedure-migration-review-001.md`

Constraints:

- one atomic `main` transition
- normalize all draft citations to production paths
- verify all targets before deletion
- delete exactly:
  - `layers/cognitive/production/lifecycle.md`
  - `layers/cognitive/production/production-artifacts.md`
- preserve exact rollback parent
- do not admit Runtime, universal Proof, Ownership, or central Artifact layers

Activation condition: explicit operator execution approval.

### 2. Verify post-migration production

Required:

- PRB-001 manifest 3 / 3
- AB-002 manifest 5 / 5
- CB-003 manifest 33 / 33
- PB-001 unchanged 3 / 3
- source deletions 2 / 2
- canonical path scan
- corrected regression and convergence evidence
- merge SHA and rollback parent recorded

### 3. Begin Runtime boundary investigation

Activation condition:

- atomic Procedure migration completed and verified
- explicit operator approval

Runtime must implement admitted meanings without originating Cognitive, Authority, Provenance, Procedure, artifact, proof, or ownership semantics.

### 4. Reconsider Vellum only if a record gap appears

Activation condition: a scenario demonstrates a canonical record behavior existing artifacts cannot preserve.
