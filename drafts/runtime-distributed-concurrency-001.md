# Runtime Distributed Concurrency and Recovery 001

## Status

Bounded candidate completed on 2026-07-18.

No production admission or deployment.

Branch:

`agent/runtime-distributed-concurrency-001`

Rollback parent:

`79aaed047ccad10b37dcb5c8ac80c92a904afd9b`

## Trigger

The operator approved the recommended next evidence step with `proceed`:

`distributed concurrency and recovery evidence`

## Candidate

The noncanonical reference implementation gains:

- `src/distributed-coordinator.mjs`
- an optional fenced execution gate at the final Runtime effect boundary
- `test/distributed-coordinator.test.mjs`

The candidate uses only deterministic in-memory state and Node built-ins.

It models:

- a three-member quorum with majority availability
- monotonically increasing terms and fencing tokens
- atomic effect claims
- stale-leader refusal before dispatch
- pre-dispatch claim abandonment after leadership change
- post-dispatch indeterminate quarantine after leadership change
- terminal preservation of completed effects
- at-most-once dispatch pressure across two Runtime instances

## Recovery Audit Correction

The first candidate revision quarantined local state when leadership changed after external dispatch, but still emitted an operational-completion observation.

Before review, the completion-race path was corrected to emit `QUARANTINED` with `indeterminateEffect: true`, and the focused test now asserts both state and observation.

## Recovery Rule

```text
old CLAIMED + new quorum lease -> ABANDONED_PRE_DISPATCH -> retry permitted
old DISPATCHED + new quorum lease -> QUARANTINED_INDETERMINATE -> retry refused
old terminal result + new quorum lease -> terminal result preserved
```

## Results

```text
Pre-extension distributed pressure: 2 PASS / 10 FAIL
Corrected distributed pressure: 12 PASS / 0 FAIL
Focused distributed tests: 11 PASS / 0 FAIL
Preserved successor tests: 24 PASS / 0 FAIL
Combined successor suite: 35 PASS / 0 FAIL
Historical harness: 11 PASS / 0 FAIL
```

## Scope Boundary

The coordinator is a deterministic linearizable reference oracle, not a consensus algorithm or networked cluster.

It does not demonstrate real message transport, clock or lease expiry, quorum persistence, consensus safety, membership change, Byzantine behavior, provider idempotency, production durability, credentials, performance, deployment readiness, or live recovery.

## Stop Condition

The candidate remains noncanonical and test-scoped.

No stable placement, production package, network service, database, provider, credential, deployment, or distributed-correctness claim without separate approval.
