# Runtime Control Plane Contract

## Status

Candidate Runtime draft.

Not admitted or implemented.

## Purpose

Define the mechanics and operating safeguards for consequential changes to Runtime itself without allowing those mechanics to authorize their own use.

## Control-Plane Action Classes

Candidate actions:

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

An implementation may provide these capabilities. Capability does not authorize action.

## Control-Plane Plan

Every consequential action requires a versioned plan containing:

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

The plan describes mechanics. It does not create permission.

## Execution Gate

Immediately before the action, Runtime must require:

- an effective Authority finding for the exact action, environment, versions, time, and acting surface
- exact target identity
- current-state match
- compatibility evidence
- required backups or recovery points
- absence of unresolved conflicts that would require semantic invention
- durable observation readiness

A stale plan or changed target blocks execution until revalidated.

## Semantic Compatibility

A change is compatible only when every persisted or in-flight semantic subject can remain mapped to its canonical contract and version without silent loss, merge, invention, or reinterpretation.

Runtime must block when:

- a required semantic field has no target mapping
- distinct admitted states would collapse
- a prohibited transition becomes possible
- historical addressability would be lost
- queued work cannot pin or revalidate controlling versions
- rollback would require rewriting semantic history

## Credential Handling

Loading or rotating a credential binding requires exact Authority and Access Grant compatibility.

Runtime may handle credential material through an approved secret mechanism. It must not:

- infer Authority from possession
- place secret values in semantic artifacts or observation envelopes
- widen the grant scope
- retain the secret beyond authorized conditions
- treat successful authentication as mission success

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
- prior observations and recovery evidence

Migration success is operational, not semantic acceptance.

## Rollback And Recovery

Rollback may restore implementation code or mappings only when compatibility is demonstrated.

Rollback does not:

- reverse an external effect
- erase observations
- reopen or close a mission
- restore expired Authority
- convert indeterminate state into failure
- rewrite semantic history

Recovery after a crash is a separate control-plane action when it can cause consequential state change or effect dispatch.

## Observations

Every plan acceptance, refusal, dispatch, step result, migration, activation, credential-handling result, rollback, and recovery must emit a durable Runtime Observation Envelope.

## Non-Admissions

This draft selects no deployment platform, orchestration technology, database, secret manager, environment hierarchy, operator role, or live system.

It authorizes no control-plane action.
