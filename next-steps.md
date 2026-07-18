# Next Steps

## Status

Runtime Admission Preparation 001 is complete.

Production remains unchanged.

This file is an ordered operational queue, not doctrine, architecture, or a roadmap.

## Queue

### 1. Review the prepared admission package

Review:

- `drafts/runtime-admission-manifest-analysis-001.md`
- `tests/runtime/runtime-admission-pressure-run-001.md`
- `tests/runtime/runtime-admission-convergence-001.md`
- `drafts/runtime-admission-atomic-transition-001.md`
- `tests/runtime/runtime-production-admission-review-001.md`

### 2. Decide whether to authorize production admission

The prepared atomic transition is:

```text
CB-003 → CB-004
AB-002 → AB-003
PB-001 unchanged
PRB-001 → PRB-002
Runtime empty → RTB-001
```

Approval authorizes construction, verification, and one atomic squash merge of the seven semantic targets and their manifests.

It does not authorize deployment, credentials, providers, or live effects.

### 3. If approved, build a preverified staging tree

Require exact production paths, normalized citations, admission metadata, manifests resolving 34/34, 6/6, 3/3, 5/5, and 3/3, and no candidate-status residue.

### 4. Verify and squash-merge atomically

Record the exact rollback parent immediately before construction. Merge only when the branch is not behind `main` and every admission check passes.

### 5. Perform independent post-merge verification

Verify production manifests, canonical origins, draft historical status, citations, evidence references, and preserved exclusions.

### 6. Record the transition and choose the next investigation

No live Runtime implementation follows automatically from semantic admission.

### 7. Keep Compass and Praetorium parked

Reactivate only when their own distinct behaviors are demonstrated.
