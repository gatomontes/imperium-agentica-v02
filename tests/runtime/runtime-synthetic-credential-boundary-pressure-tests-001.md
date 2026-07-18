# Runtime Synthetic Credential Boundary Pressure Tests 001

## Status

Investigation suite using synthetic bytes only.

## Tests

| ID | Pressure | Required finding |
|---|---|---|
| RSCB-001 | Package surface is inspected | named synthetic-credential export exists |
| RSCB-002 | Material admission is pressured | only non-empty bytes with exact synthetic classification are accepted |
| RSCB-003 | Registration completes | caller byte view is zeroed |
| RSCB-004 | Handle and audit are inspected | capability is opaque and audit uses a different identity |
| RSCB-005 | Any binding field differs | use refuses without disclosure or consumption |
| RSCB-006 | Exact binding is supplied | one synchronous callback receives exact bytes |
| RSCB-007 | Callback returns | captured callback view is zeroed |
| RSCB-008 | Callback returns a Promise | async use refuses and view is zeroed |
| RSCB-009 | Consumed handle repeats | replay is unknown and callback is not invoked |
| RSCB-010 | Revoke or close occurs | remaining handles cannot disclose |
| RSCB-011 | Callback throws material text | audit and surfaced error omit material and capability |
| RSCB-012 | Source is inspected | no real-secret acquisition, persistence, transport, keychain, or provider mechanism exists |
| RSCB-013 | Candidate is added | all prior 52 successor tests remain green |

## Pass Condition

All thirteen pressures pass together.
