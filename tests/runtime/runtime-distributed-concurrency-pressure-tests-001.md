# Runtime Distributed Concurrency Pressure Tests 001

## Status

Investigation suite.

No production admission.

## Tests

| ID | Pressure | Required finding |
|---|---|---|
| RDC-001 | A majority is reachable | lease term and fence advance monotonically |
| RDC-002 | Only a minority is reachable | acquisition and use refuse |
| RDC-003 | A newer lease exists | prior leader is fenced |
| RDC-004 | Two attempts claim one effect | only one claim is accepted |
| RDC-005 | Leadership changes after claim | stale leader cannot dispatch |
| RDC-006 | Old claim never dispatched | new leader may recover and reclaim |
| RDC-007 | Old claim was dispatched | new leader quarantines and refuses replay |
| RDC-008 | Old effect completed | terminal result is preserved |
| RDC-009 | Two Runtime nodes contend | effect port is called at most once |
| RDC-010 | Leadership changes after external dispatch | outcome remains indeterminate |
| RDC-011 | Coordination evidence is inspected | no credential material is present |
| RDC-012 | Candidate is added | all 24 prior successor tests remain green |

## Pass Condition

All twelve pressures pass together.
