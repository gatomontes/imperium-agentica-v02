# Runtime Tests

## Status

Runtime Baseline `RTB-002` remains admitted and unchanged.

Runtime Single-Node Durability 001 is a noncanonical candidate extension to the merged reference implementation evidence.

## Reference Implementation Evidence

- original successor: 15 PASS / 0 FAIL
- historical harness: 11 PASS / 0 FAIL
- merged execution record: `drafts/runtime-reference-implementation-execution-001.md`

## Single-Node Durability Candidate

- baseline pressure: `runtime-single-node-durability-pressure-run-001.md` — 3 PASS / 10 FAIL
- corrected pressure: `runtime-single-node-durability-pressure-run-002.md` — 13 PASS / 0 FAIL
- combined successor executable: 24 PASS / 0 FAIL
- repository regression: `runtime-single-node-durability-repository-regression-001.md` — PASS
- candidate review: `runtime-single-node-durability-candidate-review-001.md`

## Evidence Limits

The file-backed adapter demonstrates deterministic single-process behavior on a test filesystem.

It is not proof of production durability, power-loss safety across platforms, multi-process failover, distributed correctness, credential safety, provider idempotency, performance, deployment safety, or live recovery.
