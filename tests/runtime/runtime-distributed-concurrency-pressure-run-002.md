# Runtime Distributed Concurrency Pressure Run 002

## Status

Completed against the deterministic quorum candidate on 2026-07-18.

No production admission.

## Result

```text
Distributed pressures: 12 PASS / 0 FAIL
Focused distributed executable tests: 11 PASS / 0 FAIL
Preserved successor tests: 24 PASS / 0 FAIL
Combined successor suite: 35 PASS / 0 FAIL
Historical harness: 11 PASS / 0 FAIL
```

| ID | Result | Candidate finding |
|---|---:|---|
| RDC-001 | PASS | Majority leases advance term and fence monotonically. |
| RDC-002 | PASS | Minority acquisition and use refuse closed. |
| RDC-003 | PASS | Newer lease fences the prior leader. |
| RDC-004 | PASS | One effect identity has one accepted current claim. |
| RDC-005 | PASS | Stale leader cannot cross the dispatch boundary. |
| RDC-006 | PASS | Undispatched old claim becomes reclaimable. |
| RDC-007 | PASS | Dispatched old claim becomes quarantined indeterminate. |
| RDC-008 | PASS | Completed result remains terminal. |
| RDC-009 | PASS | Two Runtime instances call the effect port once. |
| RDC-010 | PASS | Leadership loss after external dispatch stays indeterminate. |
| RDC-011 | PASS | Coordination evidence contains no credential material. |
| RDC-012 | PASS | All 24 prior successor tests remain green. |

## Evidence Limit

The run demonstrates deterministic behavior against a linearizable in-memory reference oracle only.
