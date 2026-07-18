# Runtime Control Plane Contract

## Status

Candidate revision to the admitted Runtime control-plane contract.

Not admitted or implemented. RTB-001 production remains canonical.

Investigation: `Runtime Maintenance Artifact Closure 001`.

## Candidate Dependencies

- Runtime Maintenance Disposition: `layers/cognitive/drafts/runtime-maintenance-disposition.md`
- Runtime Maintenance Procedure: `layers/procedure/drafts/runtime-maintenance-procedure.md`
- CONTROL_PLANE Authority: `layers/authority/production/runtime-control-plane-authority-profile.md`
- PB-001 provenance: `layers/provenance/production/provenance-contract.md`
- Runtime Realization and Dispatch: `layers/runtime/production/runtime-realization-and-dispatch-contract.md`
- Runtime Observation Envelope: `layers/runtime/production/runtime-observation-envelope.md`

## Purpose

Define mechanics and safeguards for consequential changes to Runtime without allowing Runtime to diagnose, choose maintenance direction, or authorize its own use.

## Control-Plane Action Classes

```text
DEPLOY_IMPLEMENTATION
ACTIVATE_IMPLEMENTATION
DEACTIVATE_IMPLEMENTATION
CHANGE_CONFIGURATION
MIGRATE_STATE
LOAD_CREDENTIAL_BINDING
ROTATE_CREDENTIAL_BINDING
ROLL_BACK_IMPLEMENTATION
RESTORE_STATE
INITIATE_RECOVERY
ALTER_RESOURCE_LIMIT
```

Capability does not authorize action.

## Control-Plane Plan

Every consequential action requires a versioned plan containing:

- cited instruction source
- cited Runtime Operational Diagnosis and `INSTRUCT_MAINTENANCE` disposition when Master Mason maintenance applies
- action class
- exact target environment and components
- current and target implementation versions
- current and target semantic-mapping versions
- affected admitted contract versions
- expected operational effects
- state and schema compatibility assessment
- external-effect and credential exposure
- observation and rollback plan
- prohibited or irreversible consequences
- required Authority finding
- responsible acting surface
- start, stop, abort, and success conditions

The plan describes mechanics. It does not create permission or maintenance intent.

## Instruction Conformance

For Master Mason maintenance, the Control-Plane Plan must conform to the exact `INSTRUCT_MAINTENANCE` disposition.

The plan may:

- select mechanics that satisfy the instruction
- narrow execution to current safe conditions
- refuse when no conforming mechanism exists

The plan may not:

- widen environment, component, action class, time, resource, consequence, or credential scope
- relax safe state, stop, abort, or reassessment conditions
- reinterpret the intended operational outcome
- transform withholding or escalation into an instruction
- resolve a diagnostic gap or indeterminate effect

Mechanical infeasibility produces Runtime refusal and a new observation. It does not revise the disposition.

## Execution Gate

Immediately before the action, Runtime must require:

- a current instruction source and exact conformance
- effective Authority for the exact action, environment, versions, time, and acting surface
- exact target identity
- current-state match
- compatibility evidence
- required backups or recovery points
- absence of unresolved conflict requiring semantic invention
- durable observation readiness

A stale diagnosis, disposition, plan, Authority finding, or changed target blocks execution until the native responsibility supplies a valid successor.

## Managed Component And Control Surface

The managed component and the control surface acting upon it are distinct Runtime subjects.

A blocked, crashed, exhausted, inactive, or unavailable target does not by itself establish that the independent control surface is unavailable.

`INITIATE_RECOVERY` or `DEACTIVATE_IMPLEMENTATION` may address a blocked target only when:

- the exact control surface is independently available and identified
- the current disposition is `INSTRUCT_MAINTENANCE` when Master Mason maintenance applies
- the action is permitted by fresh CONTROL_PLANE Authority
- the cited Procedure admits the intervention
- PB-001 identity and correlation remain exact
- the action does not repeat or reinterpret an indeterminate effect
- abort, observation, and escalation conditions remain effective

This distinction bypasses only target-component availability. It bypasses no Cognitive, Authority, Procedure, Provenance, compatibility, version, quarantine, or observation gate.

If the control surface is unavailable or shares the same unclassified failure, Runtime withholds execution mechanically, emits an observation, and awaits native Cognitive reassessment.

## Semantic Compatibility

A change is compatible only when every persisted or in-flight semantic subject remains mapped to its canonical contract and version without silent loss, merge, invention, or reinterpretation.

Runtime blocks when:

- a required semantic field has no target mapping
- distinct admitted states would collapse
- a prohibited transition becomes possible
- historical addressability would be lost
- queued work cannot pin or revalidate controlling versions
- rollback would require rewriting semantic history

## Credential Handling

Loading or rotating a credential binding requires exact Authority and Access Grant compatibility.

Runtime must not:

- infer Authority from possession
- place secret values in semantic artifacts or observation envelopes
- widen grant or disposition scope
- retain secret material beyond authorized conditions
- treat authentication as operational or mission success

## Activation

Deployment and activation are distinct.

A version may be present but inactive. Activation requires its own permitted action class unless the controlling Authority contract explicitly joins them.

Health checks establish operational availability only.

## Migration

State migration must preserve:

- canonical contract and version references
- exact mission and subject correlation
- operational attempt and effect identities
- PB-001 lineage and supersession
- indeterminate and quarantined states
- independent Procedure branches
- diagnoses, dispositions, observations, and recovery evidence

Migration success is operational, not semantic acceptance.

## Rollback And Recovery

Rollback may restore implementation code or mappings only when compatibility is demonstrated.

Rollback does not:

- reverse an external effect
- erase observations, diagnoses, or dispositions
- reopen or close a mission
- restore expired Authority
- convert indeterminate state into failure
- rewrite semantic history

Recovery after a crash is a separate control-plane action when it can cause consequential state change or effect dispatch.

## Observations

Every plan acceptance, refusal, dispatch, step result, migration, activation, credential-handling result, rollback, and recovery must emit a durable Runtime Observation Envelope.

## Non-Admissions

This candidate selects no deployment platform, orchestration technology, database, secret manager, environment hierarchy, operator role, or live system.

It authorizes no control-plane action.
