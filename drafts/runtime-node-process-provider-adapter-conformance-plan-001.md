# Runtime Node Process-Supervisor Adapter Conformance Plan 001

## Status

Candidate plan exercised by twelve focused adapter tests and forty preserved successor tests.

## Conformance Axes

| Axis | Required behavior |
|---|---|
| Package surface | stable private package exposes one named provider adapter |
| Environment | realization and plan match the configured environment exactly |
| Action | only `INITIATE_RECOVERY` reaches the driver |
| Component and scope | plan cannot widen the realization |
| Data minimization | driver receives six operational fields only |
| Operation identity | `effectId` becomes the provider operation reference |
| Accepted request | `RECOVERY_INITIATED` maps to operational success only |
| Refused request | `RECOVERY_REFUSED` maps to operational failure |
| Unknown outcome | unknown response or exception maps to indeterminate |
| Runtime integration | observation retains the semantic disclaimer |
| Duplicate effect | driver is invoked at most once per Runtime effect identity |
| Side-effect boundary | no live transport, subprocess, credential, or deployment mechanism |
| Regression | all 40 prior successor tests and 11 historical tests remain green |

## Merge Gate

Before candidate merge:

1. require combined successor 52 / 52
2. require historical harness 11 / 11
3. require repository regression PASS
4. verify zero production semantic or manifest changes
5. verify no dependency, subprocess, network, credential, deployment, or live effect
6. preserve the operational-only and provider-idempotency limits

## Non-Goal

Passing this plan does not select a real supervisor product or prove component recovery.
