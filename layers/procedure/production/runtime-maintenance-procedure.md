# Runtime Maintenance Procedure

## Status

Admitted Procedure production contract under Procedure Baseline `PRB-003`.

Admission: `Runtime Maintenance Artifact Production Admission Review 001`.

Evidence:

- Runtime Maintenance Artifact Pressure Run 004 — 15 PASS / 0 FAIL
- Runtime Maintenance Repository Regression 001 — PASS
- Runtime Maintenance Admission Convergence Run 001 — 35 PASS / 0 FAIL
- empirical harness rerun — 11 PASS / 0 FAIL

Origin draft: `layers/procedure/drafts/runtime-maintenance-procedure.md`.

## Purpose

Define the expected path from Runtime observation through diagnosis, eligibility, maintenance direction, realization, reassessment, and exit without allowing Master Mason, Procedure, Authority, or Runtime to absorb another concern.

## Native Dependencies

### Cognitive

- Master Mason: `layers/cognitive/production/master-mason.md`
- Runtime Operational Diagnosis: `layers/cognitive/production/runtime-operational-diagnosis.md`
- Runtime Maintenance Disposition: `layers/cognitive/production/runtime-maintenance-disposition.md`

### Authority

- CONTROL_PLANE profile: `layers/authority/production/runtime-control-plane-authority-profile.md`

### Provenance

- PB-001: `layers/provenance/production/provenance-contract.md`
- exact mission correlation when applicable: `layers/provenance/production/mission-correlation-and-isolation-contract.md`

### Runtime

- Observation Envelope: `layers/runtime/production/runtime-observation-envelope.md`
- Control Plane: `layers/runtime/production/runtime-control-plane-contract.md`
- Realization and Dispatch: `layers/runtime/production/runtime-realization-and-dispatch-contract.md`

## Entry Conditions

Enter on either:

- a durable Runtime observation indicating degraded, failed, blocked, stalled, exhausted, crashed, or unavailable operation
- an authorized scheduled-maintenance condition
- a post-intervention observation requiring reassessment

An elapsed timer or alert alone does not establish a diagnosis, eligibility, or intervention.

## Expected Sequence

### 1. Assemble Operating Situation

Master Mason assembles:

- exact environment and component
- current Runtime observations
- active attempts, effects, quarantines, and recovery state
- affected mission and provider-boundary references
- applicable maintenance Procedure candidates
- applicable CONTROL_PLANE finding
- PB-001 identity and lineage
- credential constraints when applicable

The assembly is internal unless later transfer or citation proves a separate artifact necessary.

Missing or mismatched identity blocks consequential direction.

### 2. Diagnose

Master Mason produces one exact Runtime Operational Diagnosis.

The diagnosis records:

- one primary condition finding
- one response indication
- cited observations and scope
- known gaps and indeterminacy
- rationale and competence limits

Diagnosis does not establish eligibility, Authority, direction, or Runtime state.

### 3. Classify Diagnostic Path

- `NO_MAINTENANCE_INDICATED` → continue to the no-intervention direction
- `ROUTINE_MAINTENANCE_INDICATED` → continue to the eligibility gate
- `RECOVERY_INDICATED` → continue to the eligibility gate
- `OBSERVATION_ONLY_INDICATED` → continue to the withholding direction
- `STRUCTURAL_ESCALATION_INDICATED` → continue to the structural-escalation direction

Procedure selects the expected next step from the cited diagnosis. It does not choose or revise the diagnosis.

### 4. Evaluate Eligibility

For a potentially consequential maintenance direction, evaluate:

- exact admitted Procedure match
- qualified and assigned Master Mason acting surface
- effective assessment assignment for diagnosis
- effective maintenance-decision mandate for disposition
- effective CONTROL_PLANE action and discretion mode for consequential intervention
- exact environment, component, action class, and acting surface
- current PB-001 correlation
- no unresolved external-effect repetition or reinterpretation
- preservation of semantic mappings and history
- represented competence and bounded consequence
- defined safe state, abort, observation, and reassessment conditions

Every applicable condition must pass before `INSTRUCT_MAINTENANCE` may be produced.

CONTROL_PLANE Authority does not repair missing Master Mason qualification, assignment, or decision mandate.

### 5. Produce Maintenance Disposition

Master Mason produces one exact Runtime Maintenance Disposition:

- no maintenance indicated → `NO_INTERVENTION`
- all eligibility conditions pass → `INSTRUCT_MAINTENANCE`
- any condition blocks safe bounded maintenance → `WITHHOLD_MAINTENANCE`
- structural, semantic, incompatible-state, competence, authority-origin, or irreversible-consequence decision is required → `ESCALATE_STRUCTURAL_CONDITION`

Procedure defines the branch conditions. Master Mason owns the disposition finding and rationale.

### 6. Realize Instruction When Applicable

Only `INSTRUCT_MAINTENANCE` proceeds to Runtime realization.

Runtime:

1. validates the exact diagnosis, disposition, Procedure, Authority, and PB-001 references
2. constructs or resolves a Control-Plane Plan whose mechanics remain within the disposition
3. rechecks Authority, correlation, current state, versions, effect safety, and observation readiness immediately before the effect
4. refuses closed on absence, mismatch, expiry, supersession, contradiction, or indeterminacy
5. performs the permitted mechanism and emits durable Runtime Observation Envelopes

`NO_INTERVENTION`, `WITHHOLD_MAINTENANCE`, and `ESCALATE_STRUCTURAL_CONDITION` prohibit consequential maintenance realization under that disposition.

### 7. Reassess

Master Mason compares new Runtime observations with the disposition's operational outcome and reassessment conditions.

- restored within bounds → issue a new diagnosis when required and record operational restoration
- unchanged or degraded → repeat only through a new or superseding diagnosis, fresh eligibility evaluation, new disposition, and fresh Authority
- new indeterminacy → quarantine the affected effect and produce withholding or escalation as applicable
- structural consequence exposed → stop and produce structural escalation
- Authority unavailable or expired → produce withholding

Operational restoration does not establish mission success or semantic correctness.

### 8. Exit

Exit with one procedural result:

```text
NO_INTERVENTION_REQUIRED
OPERATIONALLY_RESTORED
MAINTENANCE_WITHHELD
MAINTENANCE_EXHAUSTED
CONDITION_REMAINS_INDETERMINATE
STRUCTURAL_ESCALATION_REQUIRED
```

These exits describe the Procedure path only.

They do not replace the Cognitive diagnosis or disposition, Authority finding, PB-001 lineage, or Runtime observations.

## Repeat Rule

```text
prior diagnosis ≠ current diagnosis
prior disposition ≠ renewed direction
prior Authority ≠ fresh Authority
prior plan ≠ current-state match
prior operational success ≠ permission to repeat
```

Every consequential repeat traverses diagnosis, eligibility, disposition, and dispatch gates again.

## Prohibited Inference

```text
alert ≠ diagnosis
diagnosis ≠ eligibility
eligibility ≠ Authority
maintenance disposition ≠ Runtime plan
administrator access ≠ permission
restart available ≠ restart safe
queue cleared ≠ semantic intent may be deleted
component healthy ≠ mission successful
maintenance exhausted ≠ mission closed
Runtime recovered ≠ external effect reversed
```

## Layer Boundary

This Procedure defines expected ordering and branch conditions.

It does not originate:

- diagnosis or disposition meaning
- Authority
- identity, correlation, or lineage
- Runtime states, plans, services, commands, queues, locks, schedulers, storage, or execution

## Non-Admissions

This contract authorizes no live maintenance, control-plane action, credentials, provider use, deployment, or external effect.

