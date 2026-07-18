# Runtime Node Process-Supervisor Adapter Pressure Run 002

## Status

Completed against the injected Node process-supervisor adapter on 2026-07-18.

No live provider or external effect.

## Result

```text
Adapter pressures: 13 PASS / 0 FAIL
Focused adapter executable tests: 12 PASS / 0 FAIL
Preserved successor tests: 40 PASS / 0 FAIL
Combined successor suite: 52 PASS / 0 FAIL
Historical harness: 11 PASS / 0 FAIL
```

| ID | Result | Candidate finding |
|---|---:|---|
| RNPA-001 | PASS | Private package exposes the named provider path. |
| RNPA-002 | PASS | Exact configured environment reaches the driver. |
| RNPA-003 | PASS | Different environment refuses before the driver. |
| RNPA-004 | PASS | Unsupported action refuses before the driver. |
| RNPA-005 | PASS | Component or scope widening refuses before the driver. |
| RNPA-006 | PASS | Driver receives six bounded operational fields. |
| RNPA-007 | PASS | Accepted recovery maps to operational success only. |
| RNPA-008 | PASS | Refused recovery maps to operational failure. |
| RNPA-009 | PASS | Unknown response and exception map to indeterminate. |
| RNPA-010 | PASS | Runtime observation remains operational and disclaimed. |
| RNPA-011 | PASS | Duplicate effect invokes the driver once. |
| RNPA-012 | PASS | Source contains no live mechanism or credential field. |
| RNPA-013 | PASS | All 40 prior successor tests remain green. |

## Evidence Limit

The injected driver is a test double. No real process supervisor, provider idempotency, or recovery outcome is proven.
