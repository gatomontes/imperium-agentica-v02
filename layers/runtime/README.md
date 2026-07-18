# Runtime Layer

## Status

Runtime Baseline `RTB-002` is admitted for current Runtime semantics.

Manifest: `layers/runtime/production/README.md` — 3 files.

Admission: `tests/runtime/runtime-maintenance-production-admission-review-001.md`.

## Core Question

```text
How are admitted meanings and procedures realized as operating machinery
without Runtime changing those meanings,
inventing a transition,
or authorizing itself?
```

## Definition

Runtime is the concern that realizes cited admitted contracts through executable state, resources, transport, persistence, scheduling, adapters, and effects.

Runtime is not synonymous with code.

```text
Code
= static instructions, declarations, and configuration

Runtime
= operating machinery produced when implementation is instantiated
  with actual state, resources, concurrency, failures, and effects
```

Code expressing a Cognitive, Authority, Provenance, or Procedure contract remains semantically owned by that layer. Runtime consumes and enforces the contract; software encoding does not transfer semantic ownership.

## Structure

```text
layers/runtime/
├── drafts/
└── production/
```

## May Define

Runtime may define:

- executable topology and component boundaries
- queues, event transport, scheduling, timers, and retry mechanics
- operational state and state-machine realization
- storage mappings, transactions, idempotency, locks, and isolation
- credential custody mechanisms and provider adapters
- external-effect dispatch
- deployment, migration, rollback, health, and recovery mechanics
- Runtime-native operational observations

## May Not Define

Runtime may not originate or repair:

- Cognitive responsibility, competence, judgment, or artifact meaning
- Authority source, permission, scope, delegation, or validity
- Provenance identity, correlation, lineage, or sufficiency
- Procedure order, branch, withholding, or semantic exit
- truth, proof, completion sufficiency, ownership, or mission outcome

## Boundary Rule

Runtime is parallel in ownership and downstream in operation.

```text
operational fact ≠ semantic finding
technical capability ≠ authority
state machine ≠ Procedure
record presence ≠ Provenance
process completion ≠ mission completion
```

## Admission

A Runtime artifact may enter production only when:

- every semantic input cites an admitted native contract
- dispatch rechecks exact Authority, Provenance correlation, and Procedure permission
- retries, replay, crashes, and indeterminate effects cannot invent semantic intent
- durable observations have independently tested Runtime meaning and PB-001 lineage
- state-machine conformance to admitted Procedure is demonstrated
- control-plane actions cannot authorize themselves
- empirical evidence covers simulated failure, concurrency interleaving, recovery, and migration, with its limits explicit
- cross-layer convergence passes without semantic ownership transfer
