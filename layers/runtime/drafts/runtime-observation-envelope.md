# Runtime Observation Envelope

## Status

Candidate Runtime draft.

Not admitted or implemented.

## Purpose

Define the meaning and minimum content of a durable statement about Runtime's own operating behavior.

The envelope answers:

```text
What did the operating machinery observe about its own attempt,
resource, transport, persistence, or effect boundary?
```

It does not answer whether the mission succeeded, the action was substantively correct, the evidence is sufficient, or the governing contracts should change.

## Observation Boundary

A Runtime observation is native only when its subject is implementation behavior, such as:

- acceptance, refusal, queueing, dispatch, delivery, duplication, or expiry
- process, worker, adapter, resource, or transaction behavior
- operational success, failure, timeout, crash, or recovery
- retry eligibility, scheduling, or exhaustion
- effect acknowledgement, rejection, or indeterminacy
- implementation, mapping, or adapter version in use
- control-plane attempt and operational result

An observation about mission meaning, actor competence, permission validity, lineage sufficiency, completion, closure, or release is not Runtime-native.

## Ephemeral And Durable

Ephemeral telemetry may be implementation-specific when it:

- remains local to immediate diagnosis
- is not used for recovery
- is not transferred to another responsibility
- is not cited by another artifact or decision
- is not required to reconstruct an effect

An observation becomes durable when any of those conditions is false.

Durability does not make the observation canonical mission truth.

## Minimum Envelope

A durable Runtime observation must contain:

```text
Observation identity
Observation contract version
Operational observation class and result
Observed Runtime component or boundary
Mission identity when applicable
Non-mission scope identity when applicable
Subject identity
Realization identity
Attempt identity when applicable
Effect identity when applicable
Parent observation or attempt reference
Implementation, adapter, and semantic-mapping versions
Controlling semantic-contract identities and versions
Recorded Authority finding reference
Recorded Provenance correlation finding reference
Procedure branch and transition reference when applicable
Start, dispatch, and observation times when applicable
Clock source and known clock limitation
Operational details necessary to interpret the result
Indeterminate-effect flag and quarantine reference when applicable
Secret-redaction status
Producer responsibility and Runtime component
PB-001 lineage and transfer references
Known gaps, contest, or loss
Explicit semantic disclaimer
```

The semantic disclaimer states that the envelope records operational behavior and is not itself a Cognitive, Authority, Provenance, Procedure, proof, completion, or mission finding.

## Observation Classes

Candidate classes:

```text
ADMISSION
REFUSAL
QUEUE
DISPATCH
TRANSPORT
RESOURCE
PROCESS
TRANSACTION
ADAPTER
EXTERNAL_EFFECT
RETRY
RECOVERY
CONTROL_PLANE
SECURITY_HANDLING
```

Candidate operational results:

```text
OBSERVED
ACCEPTED
REFUSED
STARTED
COMPLETED_OPERATIONALLY
FAILED_OPERATIONALLY
TIMED_OUT
DUPLICATED
EXPIRED
UNAVAILABLE
ROLLED_BACK_LOCALLY
CRASHED
RECOVERED
INDETERMINATE
QUARANTINED
```

Implementations may specialize this vocabulary but may not silently collapse materially distinct results.

## Provenance Boundary

PB-001 owns identity, correlation, transformation, custody, version, and supersession relations.

This contract owns the Runtime meaning of the observation's operational fields.

```text
Runtime observation content ≠ provenance assertion
observation identity requirement ≠ Runtime ownership of identity semantics
log presence ≠ PROVENANCE_COMPLETE
```

When an envelope is transformed, transferred, aggregated, corrected, or superseded, PB-001 remains controlling.

## Authority Boundary

The envelope may record the Authority finding cited at dispatch.

It does not establish that the finding was valid, effective, or sufficient. Successful execution does not cure an unauthorized action.

## Procedure Boundary

The envelope may record which Procedure transition Runtime attempted to realize.

Operational completion does not establish that the semantic transition completed. Procedure and its native actors determine the required next semantic step.

## Secret Boundary

Credentials, tokens, private keys, session secrets, and equivalent access material must not enter the envelope.

The envelope may record a non-secret credential-binding reference, handling result, or redaction finding.

## Correction

An incorrect envelope is superseded; it is not silently rewritten.

Correction preserves:

- original identity and version
- corrected identity and version
- reason and producing responsibility
- PB-001 supersession lineage
- whether any recovery or decision consumed the prior version

## Non-Admissions

This draft does not define a log service, event store, database schema, telemetry vendor, retention policy, cryptographic guarantee, mission-wide log, Codex, or Vellum.
