# Runtime Realization And Dispatch Contract

## Status

Candidate revision to the admitted Runtime contract.

Not admitted or implemented. RTB-001 production remains canonical.

Investigation: `Runtime Maintenance Artifact Closure 001`.

## Purpose

Define the smallest operating contract by which Runtime realizes an admitted Procedure transition as actual state or effect without originating semantic meaning, diagnosis, direction, or permission.

## Realization Unit

One realization unit binds:

```text
realization identity
exact Procedure contract, branch, transition, and version
required Cognitive actors and artifact definitions
required Authority action and finding
required Provenance subjects and correlation findings
input artifact identities and versions
operational implementation and mapping version
current operational state
permitted operational next states
```

A realization unit does not become a new diagnosis, maintenance disposition, mission, decision, grant, lineage assertion, or procedure.

## Maintenance Input Gate

A Runtime maintenance realization requires:

- exact Runtime Operational Diagnosis identity and version
- exact Runtime Maintenance Disposition identity and version
- disposition form `INSTRUCT_MAINTENANCE`
- exact Runtime Maintenance Procedure branch and version
- effective CONTROL_PLANE Authority for the exact action
- exact PB-001 correlation

Runtime must refuse consequential realization for:

```text
NO_INTERVENTION
WITHHOLD_MAINTENANCE
ESCALATE_STRUCTURAL_CONDITION
```

Runtime does not convert any of those forms into an instruction.

## Operational States

Runtime-native states include:

```text
ACCEPTED
REFUSED
QUEUED
DISPATCH_PENDING
DISPATCHED
RUNNING
BLOCKED
RETRY_ELIGIBLE
QUARANTINED_INDETERMINATE
SUCCEEDED_OPERATIONALLY
FAILED_OPERATIONALLY
CANCELLED_OPERATIONALLY
CRASHED
RECOVERING
RECOVERED
```

These states describe implementation behavior only.

No operational state implies diagnosis, maintenance direction, Authority, Procedure outcome, artifact acceptance, mission disposition, closure, or release.

## Acceptance Gate

Runtime may accept a realization unit only when:

- all controlling contracts and versions are explicit
- the Procedure transition exists
- required inputs are present and exactly correlated
- the input artifact form permits realization
- the applicable Authority finding is effective for the exact action
- required semantic mappings are compatible
- no unresolved contradiction requires Runtime to invent meaning

Failure produces explicit refusal or block. Runtime does not repair missing semantic input.

## Dispatch Gate

Immediately before every externally consequential effect, including retry or recovered dispatch, Runtime must:

1. resolve the exact mission or bounded non-mission scope
2. resolve the exact subject, action, effect identity, and intended resource
3. pin the diagnosis, disposition, Procedure, Authority, Provenance, implementation, and mapping versions
4. confirm the disposition remains current and is `INSTRUCT_MAINTENANCE` when applicable
5. re-evaluate the applicable Authority finding
6. re-evaluate exact PB-001 correlation
7. confirm the cited Procedure branch still permits the effect
8. bind idempotency and concurrency policy
9. refuse closed on absence, mismatch, contest, expiry, supersession, or indeterminacy

An enqueue-time check is insufficient.

## Attempt And Effect Identity

```text
attempt identity ≠ effect identity
retry ≠ new semantic instruction
duplicate delivery ≠ duplicate intent
provider acknowledgement ≠ mission success
```

Multiple attempts may address one effect only when the current disposition, Procedure, and fresh Authority permit it.

## Retry And Replay

Runtime may calculate retry eligibility, delay, backoff, and exhaustion as operational facts.

Runtime may dispatch a retry only when:

- the prior effect is known not to have occurred or repetition is explicitly safe
- the current `INSTRUCT_MAINTENANCE` disposition permits the repeat
- Procedure permits another attempt
- fresh Authority permits the exact repeat
- PB-001 correlation remains exact
- the same or deliberately superseded effect identity is preserved

An indeterminate effect is never automatically retryable.

## Indeterminate Effects

When provider outcome cannot be established after dispatch:

1. mark the effect `QUARANTINED_INDETERMINATE`
2. preserve exact attempt, effect, request, resource, contract, disposition, and mapping references
3. prohibit automatic repeat, compensation, reinterpretation, or success/failure mapping
4. emit a durable Runtime Observation Envelope
5. wait for a new or superseding diagnosis, cited Procedure path, new disposition, and fresh Authority before any consequential next effect

Runtime may investigate transport facts. It may not decide the maintenance or mission meaning of the unknown effect.

## Concurrency And Idempotency

Runtime must prevent concurrent attempts from causing unauthorized duplicate effects.

Serialization, locking, deduplication, or refusal do not decide semantic ownership or permission.

Content similarity cannot substitute for exact disposition, effect, and scope identity.

## Crash And Recovery

A crash does not select another Procedure branch, produce a disposition, renew Authority, reverse an external effect, or establish mission failure.

Recovery must:

- restore or reconstruct the last durable operational state
- preserve incomplete and indeterminate attempts
- revalidate controlling versions and mappings
- recheck disposition, Authority, and correlation before any new effect
- refuse continuation when the prior effect cannot be safely classified

## Persistence And Mapping

Every persisted representation must cite the canonical contract and version whose meaning it carries.

```text
schema field ≠ semantic definition
database row ≠ canonical status
transaction commit ≠ semantic acceptance
local rollback ≠ external-effect rollback
implementation migration ≠ semantic revision
```

Lossy semantic mapping blocks execution or migration.

## Required Observations

Each acceptance, refusal, dispatch, effect result, quarantine, crash, recovery, retry decision, and terminal operational state affecting recovery or another layer must produce the cited Runtime Observation Envelope.

## Non-Admissions

This candidate selects no language, framework, queue, database, event bus, deployment topology, provider, credential system, or live environment.

It authorizes no execution or external effect.
