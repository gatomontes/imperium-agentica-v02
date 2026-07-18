# Runtime Realization And Dispatch Contract

## Status

Admitted Runtime production contract.

Baseline: `RTB-001`.

Admission: `Runtime Production Admission Review 001`.

Evidence:

- `Runtime Admission Pressure Run 001 — 55 PASS / 0 FAIL`
- `Runtime Admission Convergence 001 — 30 PASS / 0 FAIL`
- `Runtime Empirical Run 001 — 11 PASS / 0 FAIL`

Origin draft: `layers/runtime/drafts/runtime-realization-and-dispatch-contract.md`.

## Purpose

Define the smallest operating contract by which Runtime realizes an admitted Procedure transition as actual state or effect without originating semantic meaning or permission.

## Realization Unit

One realization unit binds:

```text
realization identity
exact Procedure contract and version
exact Procedure branch and transition
required Cognitive actors and artifact definitions
required Authority action and finding
required Provenance subjects and correlation findings
input artifact identities and versions
operational implementation and mapping version
current operational state
permitted operational next states
```

A realization unit does not become a new mission, decision, grant, lineage assertion, or procedure.

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

No operational state implies a Cognitive finding, Authority finding, Procedure outcome, artifact acceptance, mission disposition, closure, or release.

## Acceptance Gate

Runtime may accept a realization unit only when:

- all controlling contracts and versions are explicit
- the Procedure transition exists
- required inputs are present and exactly correlated
- the applicable Authority finding is effective for the exact action
- required semantic mappings are compatible
- no unresolved contradiction requires Runtime to invent meaning

Failure produces an explicit refusal or block. Runtime does not repair the missing semantic input.

## Dispatch Gate

Immediately before every externally consequential effect, including retry or recovered dispatch, Runtime must:

1. resolve the exact mission or bounded non-mission scope
2. resolve the exact subject, action, effect identity, and intended provider or resource
3. pin the controlling contract and mapping versions
4. re-evaluate the applicable Authority finding
5. re-evaluate exact PB-001 correlation
6. confirm that the cited Procedure branch still permits the effect
7. bind an idempotency and concurrency policy
8. refuse closed on absence, mismatch, contest, expiry, supersession, or indeterminacy

An enqueue-time check is insufficient.

## Attempt And Effect Identity

An attempt is one Runtime execution effort.

An effect is the externally consequential result the attempt seeks.

```text
attempt identity ≠ effect identity
retry ≠ new semantic instruction
duplicate delivery ≠ duplicate intent
provider acknowledgement ≠ mission success
```

Multiple attempts may address one effect only when the admitted disposition and effective Authority permit it.

## Retry And Replay

Runtime may calculate retry eligibility, delay, backoff, and exhaustion as operational facts.

Runtime may dispatch a retry only when:

- the prior effect is known not to have occurred or repetition is explicitly safe
- Procedure permits another attempt
- fresh Authority permits the exact repeat
- PB-001 correlation remains exact
- the same or deliberately superseded effect identity is preserved

An indeterminate effect is never automatically retryable.

## Indeterminate Effects

When provider outcome cannot be established after dispatch:

1. mark the effect `QUARANTINED_INDETERMINATE`
2. preserve the exact attempt, effect, request, provider, contract, and mapping references
3. prohibit automatic repeat, compensation, reinterpretation, or success/failure mapping
4. emit a durable Runtime Observation Envelope
5. wait for a cited Procedure disposition and fresh Authority before any consequential next effect

Runtime may investigate operational transport facts. It may not decide the mission meaning of the unknown effect.

## Concurrency And Idempotency

Runtime must prevent two concurrent attempts from causing an unauthorized duplicate effect.

The implementation may serialize, lock, deduplicate, or refuse attempts. Those mechanisms do not decide semantic ownership or grant permission.

Content similarity cannot substitute for exact effect and mission identity.

## Crash And Recovery

A crash does not select another Procedure branch, renew Authority, reverse an external effect, or establish mission failure.

Recovery must:

- restore or reconstruct the last durable operational state
- preserve incomplete and indeterminate attempts
- revalidate controlling versions and mappings
- recheck Authority and correlation before any new effect
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

Each acceptance, refusal, dispatch, effect result, quarantine, crash, recovery, retry decision, and terminal operational state that affects recovery or another layer must produce the cited Runtime Observation Envelope.

## Non-Admissions

This contract does not select a language, framework, queue, database, event bus, deployment topology, provider, or credential system.

It authorizes no execution or external effect.
