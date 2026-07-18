# Runtime Single-Node Durability Necessity Analysis 001

## Status

Completed against Runtime Reference Implementation 001.

## Question

What is the smallest evidence that contests the reference implementation's recorded lack of durability and crash-recovery proof?

## Finding

A single-node append-only filesystem adapter is necessary and sufficient for the next bounded experiment.

The in-memory adapter cannot demonstrate:

- state reconstruction after process loss
- required observation reconstruction after process loss
- durable preservation of indeterminate effects
- refusal of corrupt persisted state
- in-process writer exclusion for one local store

## Alternatives

### Database

Rejected.

No evidence yet requires a database engine, schema language, transaction manager, or migration framework.

### Distributed store or lock service

Rejected.

This would combine single-node durability with a separate distributed-concurrency question.

### Snapshot-only file

Rejected.

An interrupted replacement could erase the last known effect state without a recoverable append history.

### Append-only local journal

Selected.

It is dependency-free, inspectable, easy to delete, and sufficient to test restart reconstruction and uncertainty preservation.

## Required Behaviors

- versioned journal schema
- monotonic sequence
- flush before state is considered applied
- one in-process writer per directory
- deterministic replay
- durable Runtime observation replay
- corrupt-tail refusal
- unknown-schema refusal
- persisted dispatched-effect quarantine on restart
- no automatic replay of indeterminate effects
- no secret material in test evidence

## Result

```text
SINGLE-NODE DURABILITY EVIDENCE: NECESSARY
APPEND-ONLY NODE FILE ADAPTER: MINIMAL
DATABASE OR DISTRIBUTED SYSTEM: NOT JUSTIFIED
```
