# Runtime Node Process-Supervisor Adapter Pressure Tests 001

## Status

Investigation suite.

No live provider or external effect.

## Tests

| ID | Pressure | Required finding |
|---|---|---|
| RNPA-001 | Package surface is inspected | named provider export exists |
| RNPA-002 | Exact environment is supplied | adapter reaches the driver |
| RNPA-003 | Different environment is supplied | adapter refuses before the driver |
| RNPA-004 | Unsupported action is supplied | adapter refuses before the driver |
| RNPA-005 | Component or scope widens | adapter refuses before the driver |
| RNPA-006 | Driver request is inspected | only six bounded fields are present, including effect identity |
| RNPA-007 | Driver accepts recovery | result is operational success only |
| RNPA-008 | Driver refuses recovery | result is operational failure |
| RNPA-009 | Driver outcome is unknown or throws | result is indeterminate |
| RNPA-010 | Adapter runs through Runtime | observation remains operational and disclaimed |
| RNPA-011 | Effect identity repeats | driver is invoked once |
| RNPA-012 | Adapter source is inspected | no subprocess, network, credential, or live mechanism exists |
| RNPA-013 | Candidate is added | all prior 40 successor tests remain green |

## Pass Condition

All thirteen pressures pass together.
