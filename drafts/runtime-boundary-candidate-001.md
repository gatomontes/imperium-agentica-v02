# Runtime Boundary Candidate 001

## Status

Revised draft cross-layer boundary derived from admitted CB-003, AB-002, PB-001, and PRB-001.

Revision: Runtime Boundary Correction 001 after Pressure Run 001.

Not admitted.

## Core Question

```text
How are admitted meanings and procedures realized as actual state and effects
without Runtime changing those meanings,
inventing a transition,
or authorizing itself?
```

## Candidate Definition

Runtime is the implementation concern that realizes cited admitted contracts through executable state, resource control, transport, persistence, scheduling, adapters, and effects.

Runtime may decide how to realize an already-defined obligation within admitted constraints.

Runtime may not decide what the obligation means, whether it should exist, or whether an unauthorized semantic transition is acceptable.

## Native Inputs

A Runtime realization must cite the applicable versions of:

- Cognitive responsibility and artifact meanings
- Authority findings for the exact action and scope
- Provenance identity, correlation, and lineage findings
- Procedure entry, ordering, branch, withholding, and exit conditions
- any artifact-relative assurance rule required by the Procedure

Missing or conflicting inputs cause an explicit operational refusal or hold. Runtime must not repair them semantically.

## May Define

Runtime may define:

- executable component and service boundaries
- process, worker, and deployment topology
- queues, event transport, routing, and delivery mechanics
- schedulers, timers, retry mechanics, and backoff
- state-machine realization of admitted Procedure
- runtime-native operational states such as queued, running, blocked, retrying, timed out, crashed, and recovered
- persistence schemas and serialization mappings that preserve canonical meanings
- transaction, idempotency, locking, concurrency, and isolation mechanisms
- credential custody, secret storage, and provider adapter behavior
- tool, API, network, and external-effect execution
- resource limits, health checks, circuit breakers, and recovery
- telemetry, metrics, traces, and operational logs
- deployment, rollback, and implementation versioning

## May Not Define

Runtime may not originate or revise:

- actors, cognitive responsibility, competence, or substantive judgment
- authority source, grant, scope, delegation, validity, or permission findings
- identity, correlation, lineage, custody meaning, or provenance sufficiency
- expected procedural order, branches, withholding conditions, or semantic exit
- canonical artifact meaning, required semantic content, or completion sufficiency
- truth, proof, evidence acceptance, or mission success
- organizational or asset ownership
- a semantic substitute for a missing native contract
- permission from credential possession, technical capability, successful execution, urgency, or prior attempts
- mission completion from process cessation or successful transport
- operative release from worker termination
- provenance merely from log presence

## Runtime-Native Facts

Runtime may originate observations about its own implementation behavior:

```text
attempt accepted or refused
process started or stopped
message enqueued, delivered, duplicated, or expired
adapter invoked or unavailable
effect acknowledged, rejected, timed out, or indeterminate
resource exhausted
transaction committed or rolled back
worker crashed or recovered
retry count and retry schedule
implementation version used
```

These observations are not automatically Cognitive findings, Authority findings, Provenance findings, Procedure outcomes, evidence sufficiency, or mission conclusions.

When preserved outside ephemeral telemetry, their identity and lineage must use PB-001.

## Enforcement Rule

Runtime enforces admitted Authority findings; it does not create them.

For each externally consequential attempt:

1. resolve the exact action, subject, mission, scope, and contract versions
2. require an effective Authority finding for that attempt
3. require exact Provenance correlation
4. require that the attempt is currently permitted by the cited Procedure branch
5. refuse closed on absence, mismatch, contest, expiry, or indeterminate state
6. preserve the operational observation without converting it into a semantic conclusion

A retry is another attempt. Retry mechanics alone do not preserve or renew authority.

## Procedure Realization Rule

A state machine may realize a Procedure but must keep separate:

- operational state from semantic finding
- transition scheduling from transition authorization
- branch evaluation from branch invention
- timeout from semantic expiry
- worker completion from mission completion
- crash recovery from procedural rollback
- replay from permission to repeat an external effect

The admitted Procedure remains controlling when implementation topology changes.

## Schema And Artifact Rule

Runtime may serialize and persist canonical artifacts, but:

```text
schema field ≠ semantic definition
database row ≠ canonical status
serialization success ≠ artifact acceptance
record existence ≠ evidence sufficiency
implementation migration ≠ semantic revision
```

Every mapping must identify the canonical contract and version it realizes.

## Credential And Capability Rule

Runtime may store, retrieve, rotate, present, or withhold credentials under admitted constraints.

It must preserve:

```text
credential ≠ authority
capability ≠ permission
provider acceptance ≠ mission success
technical access ≠ authorized scope
```

Credential use without a matching effective grant is prohibited even if technically possible.

## Failure And Recovery Rule

Runtime failure must remain operationally explicit.

It must not silently map:

- timeout to refusal
- crash to termination
- duplicate delivery to duplicate semantic intent
- indeterminate external effect to failure or success
- rollback of local state to rollback of an external effect
- recovery to permission to continue
- exhausted retries to mission closure

## Dispatch Integrity Rule

Before every externally consequential effect, including every retry or recovered attempt, Runtime must:

1. pin the exact action, mission, subject, artifact, grant, Procedure branch, and controlling contract versions
2. re-evaluate Authority immediately before dispatch
3. re-evaluate exact PB-001 correlation immediately before dispatch
4. confirm the cited Procedure still permits the effect
5. bind one effect identity and idempotency policy to the attempt
6. refuse dispatch when any value is stale, missing, mismatched, contested, or indeterminate

A check performed only at enqueue time is insufficient.

An indeterminate external effect enters an operational quarantine keyed by exact effect identity. Runtime must not repeat, compensate, or reinterpret it until a cited native contract supplies the required disposition and fresh Authority permits the next effect.

## Durable Runtime Observation Envelope

Ephemeral telemetry may remain implementation-specific.

A Runtime observation that is preserved, transferred, used for recovery, or offered to another layer must include at minimum:

- observation identity
- exact mission and subject correlation
- effect or attempt identity
- implementation and adapter version
- controlling contract versions
- start and observation times, with clock source
- operational result vocabulary
- indeterminate-state flag when applicable
- parent observation or attempt reference
- transformation and transfer lineage under PB-001
- explicit statement that the observation is not a semantic finding

Runtime defines the operational observation vocabulary. PB-001 remains controlling for identity and lineage.

## Deployment And Rollback Control

Runtime may define deployment, migration, credential-loading, activation, rollback, and recovery mechanics.

The mechanics do not authorize their use.

Any consequential control-plane action requires:

- an independently effective Authority finding for the exact environment and action
- exact implementation and semantic-mapping versions
- a compatibility check against the admitted contract versions
- a blocked path when stored state cannot be mapped without semantic loss
- preservation of pre-change observations and lineage

Rollback of implementation code does not authorize rollback of semantic history or external effects.

## Non-Admissions

This candidate does not admit:

- a Runtime production baseline
- a service architecture
- a database or event-store choice
- autonomous execution
- live credentials, integrations, or external action
- a universal Proof, Ownership, or Artifact layer

## Open Questions

1. Should durable Runtime observations have one minimal native contract, or remain implementation-specific telemetry mapped into PB-001 only when preserved?
2. What freshness rule is required for Authority findings at retry and crash recovery?
3. How is an indeterminate external effect reconciled without Runtime deciding semantic outcome?
4. What minimum mapping evidence proves that a state machine preserves an admitted Procedure?
5. Which deployment and rollback actions require their own Authority profiles?
6. Does provider adapter custody require an additional PB-001 specialization, or are current intervention ledgers sufficient?
