# Runtime Maintenance Disposition

## Status

Candidate Cognitive artifact contract.

Working name under `Runtime Maintenance Artifact Closure 001`.

Not admitted. CB-004 remains canonical.

## Native Responsibility

Master Mason produces the Runtime Maintenance Disposition after the applicable Procedure and Authority eligibility gates have been evaluated.

It records the bounded maintenance direction selected for one exact diagnosed Runtime condition.

## Core Question

```text
Given this exact Runtime Operational Diagnosis, Procedure branch,
Authority finding, correlation state, and effect-safety state:
what bounded maintenance direction applies now?
```

## Required Semantic Content

Every disposition requires:

```text
Disposition identity and version
Producing Master Mason responsibility or acting-surface reference
Exact Runtime Operational Diagnosis identity and version
Exact environment and component scope
Mission identity or bounded non-mission scope when applicable
Disposition form
Cited Procedure contract, branch, and version
Cited Authority finding or explicit absence
Cited PB-001 correlation finding
Active realization, attempt, effect, quarantine, and recovery references
Eligibility findings by gate
Rationale
Required safe state
Effective and expiry conditions
Reassessment and re-entry conditions
Known gaps, dissent, and indeterminacy
PB-001 lineage references
Supersedes
```

This is semantic content, not a storage schema.

## Disposition Forms

Exactly one form is required:

```text
NO_INTERVENTION
INSTRUCT_MAINTENANCE
WITHHOLD_MAINTENANCE
ESCALATE_STRUCTURAL_CONDITION
```

### NO_INTERVENTION

Used when the diagnosis and Procedure require no consequential maintenance effect.

Additional content:

- continuation or observation condition
- condition that would require reassessment
- confirmation that no Runtime effect is requested

### INSTRUCT_MAINTENANCE

Carries exact bounded Cognitive maintenance intent to Runtime.

Additional content:

```text
Permitted control-plane action class
Exact target environment and components
Intended bounded operational outcome
Permitted current and target operational conditions
Applicable implementation and semantic-mapping constraints
Maximum attempts, time, resource, and consequence bounds
Required credential-handling constraints
Required pre-effect observations
Success, stop, abort, and reassessment conditions
Protected active and indeterminate effects
Prohibited actions and inferences
```

Runtime may construct a Control-Plane Plan only for this form.

The instruction does not select commands, services, storage, deployment topology, or other implementation mechanics.

### WITHHOLD_MAINTENANCE

Records deliberate safe non-action.

Additional content:

```text
Blocked or failed eligibility conditions
Withheld action classes
Required safe state
Permitted observation-only actions
Evidence or authority required for re-entry
Time or condition requiring reassessment
Escalation condition when the blocker persists or worsens
```

Withholding is not Runtime refusal, Authority refusal, diagnosis, or procedural exit, although it may cite those independently defined findings.

### ESCALATE_STRUCTURAL_CONDITION

Transfers a condition that exceeds Master Mason's bounded maintenance responsibility.

Additional content:

```text
Exceeded competence, semantic, structural, authority, or consequence boundary
Exact external decision or authorization required
Mechanical options and consequences without selecting among them
Required safe state while awaiting direction
Prohibited assumptions and interventions
Urgency and deterioration conditions
External operator or later admitted recipient
Return and supersession conditions
```

Master Mason does not decide the structural change by escalating it.

## Eligibility Rule

An `INSTRUCT_MAINTENANCE` disposition requires all applicable gates to pass:

- exact diagnosis and current observation scope
- admitted Procedure match
- effective CONTROL_PLANE Authority for the exact action and discretion mode
- exact PB-001 correlation
- no unsafe repeat or reinterpretation of an indeterminate effect
- preserved semantic mappings and history
- defined safe state, abort conditions, and durable observation readiness

Failure produces `WITHHOLD_MAINTENANCE` or `ESCALATE_STRUCTURAL_CONDITION`; it does not produce a weakened instruction.

## Instruction Versus Runtime Plan

```text
Maintenance Disposition = Cognitive direction
Control-Plane Plan = Runtime mechanical realization
Runtime effect = performed mechanism and consequence
```

A Control-Plane Plan must cite the exact `INSTRUCT_MAINTENANCE` disposition and may narrow mechanics to satisfy it.

It may not widen scope, change the action class, relax limits, resolve gaps, or reinterpret intent.

## Authority Boundary

The disposition does not create, renew, widen, or validate Authority.

Fresh Authority remains required immediately before every consequential effect, retry, rollback, or recovered continuation.

## Procedure Boundary

Procedure determines when the disposition is expected and which branch follows each form.

Procedure does not choose the form or originate its semantic content.

## Runtime Boundary

Runtime may realize only `INSTRUCT_MAINTENANCE`.

`NO_INTERVENTION`, `WITHHOLD_MAINTENANCE`, and `ESCALATE_STRUCTURAL_CONDITION` prohibit consequential maintenance realization under that disposition.

Runtime emits its own Observation Envelopes and operational states. It does not convert those observations into a new disposition.

## Provenance Boundary

PB-001 owns identity, correlation, lineage, transformation, custody, and supersession.

A new diagnosis, changed Authority finding, changed target, or changed effect-safety state requires a new or superseding disposition.

## Non-Admissions

This candidate does not admit:

- a live Maintenance Instruction
- a Runtime Control-Plane Plan or implementation
- Authority or access
- autonomous maintenance
- an escalation institution
- mission disposition, success, closure, or release
- a universal Artifact layer
