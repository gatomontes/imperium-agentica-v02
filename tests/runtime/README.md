# Runtime Tests

## Status

Runtime Baseline `RTB-002` remains admitted and unchanged.

Runtime Single-Node Durability 001 is merged as noncanonical evidence.

Runtime Distributed Concurrency and Recovery 001 is merged as noncanonical evidence.

Runtime Stable Nonproduction Reference Placement 001 is merged and verified.

Runtime Node Process-Supervisor Provider Adapter 001 is merged and verified.

Runtime Synthetic Credential Boundary 001 is merged and verified.

Runtime Synthetic Credential-to-Provider Projection 001 is merged and verified.

Runtime Synthetic Secret-Store Port 001 is the current candidate.

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

## Node Process-Supervisor Adapter Candidate

- baseline pressure: `runtime-node-process-provider-adapter-pressure-run-001.md` — 4 PASS / 9 FAIL
- corrected pressure: `runtime-node-process-provider-adapter-pressure-run-002.md` — 13 PASS / 0 FAIL
- focused adapter executable: 12 PASS / 0 FAIL
- combined successor executable: 52 PASS / 0 FAIL
- repository regression: `runtime-node-process-provider-adapter-repository-regression-001.md` — PASS
- candidate review: `runtime-node-process-provider-adapter-candidate-review-001.md`

## Synthetic Credential Boundary Candidate

- baseline pressure: `runtime-synthetic-credential-boundary-pressure-run-001.md` — 2 PASS / 11 FAIL
- corrected pressure: `runtime-synthetic-credential-boundary-pressure-run-002.md` — 13 PASS / 0 FAIL
- focused boundary executable: 12 PASS / 0 FAIL
- combined successor executable: 64 PASS / 0 FAIL
- repository regression: `runtime-synthetic-credential-boundary-repository-regression-001.md` — PASS
- candidate review: `runtime-synthetic-credential-boundary-candidate-review-001.md`

## Synthetic Provider Projection Candidate

- baseline pressure: `runtime-synthetic-provider-projection-pressure-run-001.md` — 3 PASS / 11 FAIL
- corrected pressure: `runtime-synthetic-provider-projection-pressure-run-002.md` — 14 PASS / 0 FAIL
- focused projection executable: 13 PASS / 0 FAIL
- combined successor executable: 77 PASS / 0 FAIL
- repository regression: `runtime-synthetic-provider-projection-repository-regression-001.md` — PASS
- candidate review: `runtime-synthetic-provider-projection-candidate-review-001.md`

## Synthetic Secret-Store Port Candidate

- baseline pressure: `runtime-synthetic-secret-store-port-pressure-run-001.md` — 4 PASS / 11 FAIL
- corrected pressure: `runtime-synthetic-secret-store-port-pressure-run-002.md` — 15 PASS / 0 FAIL
- focused port executable: 14 PASS / 0 FAIL
- combined successor executable: 91 PASS / 0 FAIL
- repository regression: `runtime-synthetic-secret-store-port-repository-regression-001.md` — PASS
- candidate review: `runtime-synthetic-secret-store-port-candidate-review-001.md`

## Evidence Limits

The file-backed adapter demonstrates deterministic single-process behavior on a test filesystem.

The distributed coordinator demonstrates effect-boundary behavior against a deterministic linearizable in-memory oracle.

Stable placement under `layers/runtime/reference/` establishes repository-local ownership and exports only.

The Node process-supervisor adapter demonstrates environment binding and result mapping through an injected driver only.

The synthetic credential broker demonstrates one-use, exact-bound lifecycle behavior for test bytes only.

The synthetic provider projection demonstrates least-data composition with the injected driver only.

The synthetic secret-store port demonstrates expiring acquisition and revocation behavior against an in-memory test backend only.

None is proof of production durability, a consensus protocol, real network partitions, durable quorum state, distributed correctness, secure erasure, real credential safety, real store durability or availability, provider authentication or idempotency, performance, deployment safety, or live recovery.


## B2.2 Secret-Store Evaluation Candidate

- evaluation gates: `b2-2-secret-store-evaluation-gates-001.md` — 22
- product families reviewed: 6
- provisional leader: OpenBao self-hosted
- store selected: no
- topology selected: no
- operator decisions required: 8

The evaluation distinguishes product capability from deployment topology. No real store, SDK, account, secret, credential, network, or external effect is introduced.


## B2.2 OpenBao Selection Candidate

- selected store: OpenBao
- selected topology: separate single-node Ubuntu VPS
- version family: 2.6.x; exact patch deferred to B2.3
- selection pressure: 18 PASS / 0 FAIL
- instance running: no
- implementation files changed: 0

Selection is a design decision, not operational evidence.
