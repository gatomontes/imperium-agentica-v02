# Runtime Single-Node Durability 001

## Status

Bounded candidate completed on 2026-07-18.

No production admission or deployment.

Branch:

`agent/runtime-single-node-durability-001`

Rollback parent:

`b4c22cd45496e347ba2ccda48e8c6b76eae93a76`

## Trigger

The operator continued with the recommended next evidence step:

`durable single-node store adapter and crash-recovery evidence`

## Candidate

The existing noncanonical reference implementation gains:

- `src/file-store.mjs`
- a small store interface shared with the in-memory adapter
- `test/file-store.test.mjs`

The file adapter uses only Node built-ins.

It maintains:

- an append-only versioned JSON-lines journal
- synchronous journal flush before in-memory application
- one in-process writer per store directory
- reconstruction of components, realizations, and effects
- durable reconstruction of required Runtime observations
- recovery quarantine for effects persisted as `DISPATCHED`
- strict refusal of corrupt tails, unknown schemas, and sequence mismatch

## Recovery Rule

```text
persisted DISPATCHED
→ process restart
→ QUARANTINED_INDETERMINATE
→ no automatic repeat
```

The adapter never converts an uncertain dispatched effect to success or failure.

## Results

```text
Pre-extension durability pressure: 3 PASS / 10 FAIL
Successor semantic regression: 15 PASS / 0 FAIL
Durability extension: 9 PASS / 0 FAIL
Combined successor suite: 24 PASS / 0 FAIL
Historical harness: 11 PASS / 0 FAIL
```

## Scope Boundary

This candidate demonstrates one-process filesystem recovery behavior only.

It does not demonstrate:

- database durability
- power-loss or kernel-failure guarantees
- filesystem-specific atomicity across every platform
- distributed locking or consensus
- multi-process failover
- provider idempotency
- credential safety
- performance
- deployment readiness
- live recovery

## Stop Condition

The adapter remains noncanonical and test-scoped.

No stable placement, production package, deployment, provider, credential, or distributed-systems claim without separate approval.
