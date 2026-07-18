# Runtime Tests

## Status

Runtime Baseline `RTB-002` remains admitted and unchanged.

Runtime Single-Node Durability 001 is merged as noncanonical evidence.

Runtime Distributed Concurrency and Recovery 001 is merged as noncanonical evidence.

Runtime Stable Nonproduction Reference Placement 001 is the current candidate.

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

## Distributed-Concurrency Candidate

- baseline pressure: `runtime-distributed-concurrency-pressure-run-001.md` — 2 PASS / 10 FAIL
- corrected pressure: `runtime-distributed-concurrency-pressure-run-002.md` — 12 PASS / 0 FAIL
- focused distributed executable: 11 PASS / 0 FAIL
- combined successor executable: 35 PASS / 0 FAIL
- repository regression: `runtime-distributed-concurrency-repository-regression-001.md` — PASS
- candidate review: `runtime-distributed-concurrency-candidate-review-001.md`

## Stable-Placement Candidate

- baseline pressure: `runtime-reference-placement-pressure-run-001.md` — 5 PASS / 6 FAIL
- corrected pressure: `runtime-reference-placement-pressure-run-002.md` — 11 PASS / 0 FAIL
- focused placement executable: 5 PASS / 0 FAIL
- combined successor executable: 40 PASS / 0 FAIL
- repository regression: `runtime-reference-placement-repository-regression-001.md` — PASS
- candidate review: `runtime-reference-placement-candidate-review-001.md`

## Evidence Limits

The file-backed adapter demonstrates deterministic single-process behavior on a test filesystem.

The distributed coordinator demonstrates effect-boundary behavior against a deterministic linearizable in-memory oracle.

Stable placement under `layers/runtime/reference/` establishes repository-local ownership and exports only.

Neither is proof of production durability, a consensus protocol, real network partitions, durable quorum state, distributed correctness, credential safety, provider idempotency, performance, deployment safety, or live recovery.
