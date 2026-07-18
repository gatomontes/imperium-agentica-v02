# Runtime Single-Node Durability Pressure Run 002

## Status

Completed against the file-backed candidate on 2026-07-18.

No production admission.

## Result

```text
Durability pressures: 12 PASS / 0 FAIL
Focused durability executable tests: 8 PASS / 0 FAIL
Preserved successor semantic tests: 15 PASS / 0 FAIL
Combined successor suite: 23 PASS / 0 FAIL
Historical harness: 11 PASS / 0 FAIL
```

| ID | Result | Candidate finding |
|---|---:|---|
| RSD-001 | PASS | Components, realizations, and effects reconstruct. |
| RSD-002 | PASS | Each entry is appended and fsynced before application. |
| RSD-003 | PASS | Exclusive lock file permits one writer. |
| RSD-004 | PASS | Truncated or corrupt tail refuses closed. |
| RSD-005 | PASS | Unknown schema or sequence mismatch refuses closed. |
| RSD-006 | PASS | Completed effect remains completed. |
| RSD-007 | PASS | Recovered dispatched effect becomes quarantined indeterminate. |
| RSD-008 | PASS | Runtime refuses repeat of recovered indeterminate effect. |
| RSD-009 | PASS | Existing quarantine survives restart. |
| RSD-010 | PASS | Journal test evidence contains no secret material. |
| RSD-011 | PASS | All 15 original successor tests remain green. |
| RSD-012 | PASS | Evidence limits remain explicit. |

## Evidence Limit

The run demonstrates deterministic single-process behavior on the test filesystem only.
