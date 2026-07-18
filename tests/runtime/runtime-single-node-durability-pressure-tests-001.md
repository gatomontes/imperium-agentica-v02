# Runtime Single-Node Durability Pressure Tests 001

## Status

Investigation suite.

No production admission.

## Tests

| ID | Pressure | Required finding |
|---|---|---|
| RSD-001 | Process restarts | Components, realizations, and effects reconstruct |
| RSD-002 | State is accepted in memory | Journal entry is flushed before application |
| RSD-003 | Two writers open one directory | The second writer refuses |
| RSD-004 | Journal tail is truncated | Store refuses without inventing state |
| RSD-005 | Journal schema or sequence changes | Store refuses incompatible history |
| RSD-006 | Completed effect is recovered | Completion remains operationally completed |
| RSD-007 | Process stops after persisted dispatch | Effect becomes quarantined indeterminate |
| RSD-008 | Recovered effect is indeterminate | Runtime refuses automatic repeat |
| RSD-009 | Quarantine was already persisted | Restart preserves quarantine |
| RSD-010 | Journal is inspected | No secret material is present |
| RSD-011 | Durable adapter is added | Existing 15 semantic tests remain green |
| RSD-012 | Evidence is reported | No database, distributed, deployment, or live-recovery claim is inferred |

## Pass Condition

All twelve pressures pass together.
