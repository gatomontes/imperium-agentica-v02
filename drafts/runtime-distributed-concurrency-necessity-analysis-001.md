# Runtime Distributed Concurrency Necessity Analysis 001

## Status

Completed against Runtime Single-Node Durability 001.

## Question

What is the smallest evidence that contests the recorded lack of multi-node concurrency and leadership-recovery proof?

## Finding

A deterministic quorum-and-fencing oracle integrated at the final effect boundary is necessary and sufficient for the next bounded experiment.

The single-node adapter cannot demonstrate:

- majority refusal under a minority partition
- stale-leader fencing
- atomic effect claims across Runtime instances
- leadership takeover before versus after dispatch
- terminal effect preservation across leadership change

## Alternatives

### Real consensus implementation

Rejected.

Implementing Raft, Paxos, or another consensus protocol would combine the Runtime boundary question with transport, persistence, timing, membership, and protocol-correctness questions.

### Database-backed distributed lock

Rejected.

No evidence yet justifies selecting a database, lock service, schema, deployment topology, or failure contract.

### Provider idempotency key

Rejected.

Provider selection and provider-specific semantics remain separately gated.

### Deterministic quorum-and-fencing oracle

Selected.

It is dependency-free, reproducible, and sufficient to pressure the Runtime boundary without claiming a real distributed system.

## Required Behaviors

- majority availability before lease acquisition or use
- monotonically increasing term and fencing token
- stale-fence refusal
- atomic claim per effect identity
- dispatch requires the current claim and fence
- pre-dispatch takeover permits a bounded retry
- post-dispatch takeover quarantines uncertainty
- completed effects remain terminal
- two Runtime instances dispatch at most once
- no credential material in coordination evidence

## Result

```text
DISTRIBUTED CONCURRENCY EVIDENCE: NECESSARY
DETERMINISTIC QUORUM ORACLE: MINIMAL
REAL CONSENSUS OR DATABASE: NOT JUSTIFIED
```
