# Runtime Single-Node Durability Conformance Plan 001

## Status

Candidate plan exercised by eight focused durability tests and fifteen preserved semantic tests.

## Conformance Axes

| Axis | Required behavior |
|---|---|
| Journal identity | exact schema identifier and monotonic sequence |
| Write ordering | append and flush before in-memory application |
| Writer scope | only one writer owns one directory |
| Reconstruction | components, realizations, and effects replay exactly |
| Completed effect | remains completed after restart |
| Dispatched uncertainty | becomes quarantined indeterminate after restart |
| Repeat safety | recovered indeterminate effect cannot dispatch again |
| Corruption | truncated or unparsable tail refuses the store |
| Version mismatch | unknown schema or sequence refuses the store |
| Secret boundary | journal carries no test credential material |
| Semantic regression | original successor suite remains 15 / 15 |
| Historical regression | original empirical harness remains 11 / 11 |

## Candidate Files

```text
tests/runtime/reference-implementation-001/
├── src/
│   ├── file-store.mjs
│   ├── in-memory-ports.mjs
│   └── reference-runtime.mjs
└── test/
    └── file-store.test.mjs
```

## Merge Gate

Before candidate merge:

1. require combined successor 23 / 23
2. require historical harness 11 / 11
3. require repository regression PASS
4. verify zero production semantic changes
5. verify only Node filesystem built-ins are used
6. preserve single-node and filesystem evidence limits

## Non-Goal

Passing this plan does not establish production durability or distributed correctness.
