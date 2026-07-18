# Runtime Reference Implementation Necessity Analysis 001

## Status

Completed against admitted baselines CB-005, AB-003, PB-001, PRB-003, and RTB-002.

## Question

Is the historical empirical harness sufficient as the minimal current Runtime reference implementation?

## Finding

No.

Passing historical tests is not sufficient when their model encodes superseded semantic boundaries.

The harness proves useful mechanical behaviors, but current admission requires a successor that demonstrates those mechanics without:

- treating eligibility as diagnosis
- collapsing diagnosis and disposition
- instantiating unqualified or unassigned Master Mason behavior
- internalizing Authority ownership
- using draft contract identities
- bypassing the Control-Plane Plan boundary

## Alternatives

### Keep the historical harness unchanged as the reference

Rejected.

It would make superseded semantics look current.

### Rewrite the historical harness in place

Rejected.

Historical executable evidence must remain addressable. Silent replacement would erase what the earlier 11 / 11 actually demonstrated.

### Build a framework, service, database, or deployable control plane

Rejected.

No evidence requires those choices, and they would overclaim durability, integration, or live readiness.

### Add a successor test-scoped implementation

Selected.

It preserves history, exercises current admitted contracts, and remains easy to remove.

## Minimum Necessary Surface

```text
contract pins and structural guards
Runtime realization acceptance
Disposition-form gate
Control-Plane Plan conformance
fresh Authority finding consumption
exact correlation finding consumption
Procedure finding consumption
attempt/effect identity and quarantine
durable observation construction
simulated effect port
in-memory operational adapters
deterministic conformance tests
```

## Not Necessary

- framework
- HTTP or RPC API
- database
- queue
- scheduler
- distributed lock
- secret manager
- provider adapter
- deployment manifest
- production configuration
- Master Mason implementation
- Authority registry
- mission orchestration

## Result

```text
SUCCESSOR NECESSITY: DEMONSTRATED
TEST-SCOPED NODE CANDIDATE: MINIMAL
PRODUCTION IMPLEMENTATION: NOT JUSTIFIED
```
