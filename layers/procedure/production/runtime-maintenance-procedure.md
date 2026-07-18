# Runtime Maintenance Procedure

## Status

Admitted Procedure production contract.

Baseline: `PRB-002`.

Admission: `Runtime Production Admission Review 001`.

Evidence:

- `Runtime Admission Pressure Run 001 — 55 PASS / 0 FAIL`
- `Runtime Admission Convergence 001 — 30 PASS / 0 FAIL`
- `Runtime Empirical Run 001 — 11 PASS / 0 FAIL`

Origin draft: `layers/procedure/drafts/runtime-maintenance-procedure.md`.

## Purpose

Define the expected path from a Runtime operating observation to bounded maintenance, withholding, or escalation without allowing Master Mason or Runtime to invent permission or semantic disposition.

## Native Dependencies

### Cognitive

- Master Mason: `layers/cognitive/production/master-mason.md`

### Authority

- CONTROL_PLANE profile: `layers/authority/production/runtime-control-plane-authority-profile.md`

### Provenance

- PB-001: `layers/provenance/production/provenance-contract.md`
- exact mission correlation when applicable: `layers/provenance/production/mission-correlation-and-isolation-contract.md`

### Runtime

- Observation Envelope: `layers/runtime/production/runtime-observation-envelope.md`
- Control Plane: `layers/runtime/production/runtime-control-plane-contract.md`
- Realization and Dispatch: `layers/runtime/production/runtime-realization-and-dispatch-contract.md`

All cited dependencies are admitted in the same atomic transition or an earlier baseline.

## Entry Conditions

Enter on either:

- a durable Runtime observation indicating degraded, failed, blocked, stalled, exhausted, crashed, or unavailable operation
- an authorized scheduled-maintenance condition
- a post-intervention observation requiring reassessment

An elapsed timer or alert alone does not authorize intervention.

## Expected Sequence

### 1. Assemble Operating Situation

Master Mason assembles:

- exact environment and component
- current Runtime observations
- active attempts, effects, quarantines, and recovery state
- affected mission and provider-boundary references
- applicable maintenance Procedure
- applicable CONTROL_PLANE finding
- PB-001 identity and lineage
- credential constraints when applicable

Missing or mismatched identity blocks action.

### 2. Diagnose

Master Mason issues one bounded finding:

```text
RUNTIME_HEALTHY
RUNTIME_MAINTENANCE_ELIGIBLE
RUNTIME_MAINTENANCE_BLOCKED
RUNTIME_CONDITION_INDETERMINATE
STRUCTURAL_CHANGE_REQUIRED
ESCALATION_REQUIRED
```

Diagnosis does not itself perform or authorize maintenance.

### 3. Classify Path

- `RUNTIME_HEALTHY` → exit without intervention
- `RUNTIME_MAINTENANCE_ELIGIBLE` → continue to eligibility gate
- `RUNTIME_MAINTENANCE_BLOCKED` → preserve blocker and safe state
- `RUNTIME_CONDITION_INDETERMINATE` → withhold consequential intervention and gather only independently permitted observations
- `STRUCTURAL_CHANGE_REQUIRED` → escalate to the external operator or later admitted responsibility
- `ESCALATION_REQUIRED` → follow only an admitted escalation route

### 4. Eligibility Gate

Before maintenance, require:

- exact Procedure match
- effective CONTROL_PLANE action and discretion mode
- exact environment, component, and action class
- current PB-001 correlation
- no unresolved external-effect repetition
- preservation of semantic mappings and history
- defined abort and observation conditions

Failure withholds maintenance.

### 5. Invoke Maintenance

Master Mason issues or invokes the exact bounded Maintenance Instruction.

Runtime rechecks Authority, correlation, current state, and version immediately before the effect.

Runtime performs the mechanism and emits durable observations.

### 6. Assess Result

Master Mason compares the result with the Procedure's operational exit condition.

- restored within bounds → record operational restoration
- unchanged or degraded → repeat only if Procedure and fresh Authority permit
- new indeterminacy → quarantine affected effect and withhold unsafe repeat
- structural consequence exposed → stop and escalate
- Authority unavailable → preserve state and withhold

Operational restoration does not establish mission success or semantic correctness.

### 7. Exit

Exit with one of:

```text
NO_INTERVENTION_REQUIRED
OPERATIONALLY_RESTORED
MAINTENANCE_WITHHELD
MAINTENANCE_EXHAUSTED
CONDITION_REMAINS_INDETERMINATE
STRUCTURAL_ESCALATION_REQUIRED
```

These are procedural exits relative to maintenance only.

## Prohibited Inference

```text
alert ≠ diagnosis
diagnosis ≠ Authority
administrator access ≠ permission
restart available ≠ restart safe
queue cleared ≠ semantic intent may be deleted
component healthy ≠ mission successful
maintenance exhausted ≠ mission closed
Runtime recovered ≠ external effect reversed
```

## Runtime Boundary

This procedure defines expected ordering and conditions.

It does not define services, commands, queues, locks, schedulers, health thresholds, retry intervals, or repair implementation.
