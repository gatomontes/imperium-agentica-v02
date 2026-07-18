# Runtime Boundary Pressure Run 001

## Status

Immutable first run against Runtime Boundary Candidate 001.

## Result

```text
34 PASS
6 FAIL
0 INDETERMINATE
```

## Passing Scope

RT-001 through RT-011, RT-013 through RT-017, RT-019, RT-021 through RT-026, RT-028 through RT-032, RT-034 through RT-036, RT-038, and RT-040 pass.

The candidate successfully separates:

- Runtime state from semantic finding
- state-machine realization from Procedure
- technical ability and credentials from Authority
- logs from Provenance
- serialization from artifact meaning
- worker/process outcomes from mission closure and release

## Failures

### RT-012 — Authority Check Timing

The candidate requires effective authority for each attempt but does not place the final check immediately before the externally consequential effect. A queued authorization result could become stale.

### RT-018 — Indeterminate External Effect

The candidate prohibits silently calling an indeterminate effect success or failure, but does not explicitly quarantine the effect identity and prohibit automatic repetition.

### RT-020 — Deployment And Rollback Control

The candidate permits Runtime to define deployment and rollback mechanics but does not explicitly state that activation, rollback, migration, and credential-loading actions require independently effective Authority when consequential.

### RT-027 — Durable Observation Minimum

The candidate permits Runtime-native observations but does not define the minimum envelope required when an observation leaves ephemeral telemetry.

### RT-033 — Queued Contract-Version Change

The candidate requires contract references but does not require attempts to pin or revalidate controlling versions at dispatch.

### RT-039 — Runtime Version Rollback

The candidate permits implementation rollback but does not require semantic mapping compatibility or an explicit blocked migration path.

## Decision

**REVISE AND RERUN**

The six failures are Runtime-boundary defects, not evidence that Runtime owns Authority, Provenance, Procedure, or Cognitive semantics.
