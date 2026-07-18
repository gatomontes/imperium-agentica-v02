# Runtime Tests

## Status

Runtime Baseline `RTB-002` is admitted and post-merge verified on main.

Runtime Reference Implementation 001 is a noncanonical successor candidate.

## Admitted Runtime Evidence

- Runtime Maintenance Artifact Pressure Run 004: 15 PASS / 0 FAIL
- Runtime Maintenance Repository Regression 001: PASS
- Runtime Maintenance Admission Convergence Run 001: 35 PASS / 0 FAIL
- Runtime maintenance post-merge empirical rerun: 11 PASS / 0 FAIL

## Reference Implementation Candidate

- historical current-semantic pressure: `runtime-reference-implementation-pressure-run-001.md` — 5 PASS / 10 FAIL
- successor focused pressure: `runtime-reference-implementation-pressure-run-002.md` — 15 PASS / 0 FAIL
- repository regression: `runtime-reference-implementation-repository-regression-001.md` — PASS
- candidate review: `runtime-reference-implementation-candidate-review-001.md`
- executable candidate: `reference-implementation-001/`

## Evidence Limits

Both executable harnesses are deterministic single-process Node models.

They are not proof of distributed mutual exclusion, production durability, credential safety, provider idempotency, performance, deployment safety, or live recovery.

No concrete credential, provider integration, deployment environment, or external effect was evaluated.
