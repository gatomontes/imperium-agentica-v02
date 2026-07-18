# Runtime Distributed Concurrency Conformance Plan 001

## Status

Candidate plan exercised by eleven focused distributed-boundary tests and twenty-four preserved successor tests.

## Conformance Axes

| Axis | Required behavior |
|---|---|
| Quorum | lease acquisition and use require a reachable majority |
| Fence | every accepted lease advances the term and fencing token |
| Stale leader | an older token cannot claim or dispatch |
| Effect claim | one effect identity has one current claim |
| Dispatch boundary | dispatch requires the current claim, attempt, term, node, and fence |
| Pre-dispatch takeover | old claim becomes abandoned and may be reclaimed |
| Post-dispatch takeover | old dispatch becomes quarantined indeterminate |
| Terminal result | completed result survives leadership change |
| Runtime integration | two Runtime instances reach the effect port at most once |
| Completion race | leadership loss after external dispatch remains indeterminate |
| Secret boundary | coordination evidence contains no credential material |
| Regression | all 24 prior successor tests and 11 historical tests remain green |

## Candidate Files

```text
tests/runtime/reference-implementation-001/
├── src/
│   ├── distributed-coordinator.mjs
│   └── reference-runtime.mjs
└── test/
    └── distributed-coordinator.test.mjs
```

## Merge Gate

Before candidate merge:

1. require combined successor 35 / 35
2. require historical harness 11 / 11
3. require repository regression PASS
4. verify zero production semantic changes
5. preserve the deterministic-oracle limitation
6. verify no network, database, provider, credential, or deployment mechanism

## Non-Goal

Passing this plan does not establish consensus correctness or production distributed operation.
