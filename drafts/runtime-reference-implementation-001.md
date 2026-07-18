# Runtime Reference Implementation 001

## Status

Bounded successor candidate constructed on 2026-07-18.

No production admission, deployment, provider integration, credential use, or external effect.

Branch:

`agent/runtime-reference-implementation-001`

Rollback parent:

`1786638a35bc3b061222a440d4ba24e3b8e36a37`

## Trigger

The operator selected:

`minimal successor Runtime reference implementation and conformance plan`

RTB-002 is admitted, but the existing executable empirical harness predates CB-005, PRB-003, and RTB-002 maintenance closure.

It remains useful historical evidence and still passes its 11 scenarios, but it is not an adequate current reference implementation.

## Confirmed Drift

The historical harness:

- uses `RUNTIME_MAINTENANCE_ELIGIBLE` as a diagnosis even though CB-005 prohibits that finding
- has no Runtime Maintenance Disposition artifact or form gate
- instantiates a `MasterMason` class without qualification, assignment, or decision mandate
- implements an Authority registry inside the Runtime test model
- cites draft observation and procedure identifiers
- has no Control-Plane Plan contract or conformance boundary
- checks only truthy correlation rather than consuming an exact PB-001 finding
- models PRB-001 closure conformance but not the current PRB-003 maintenance path

## Candidate

Location:

`tests/runtime/reference-implementation-001/`

The test-scoped location is deliberate. It avoids claiming a production implementation or introducing a new top-level implementation architecture before admission.

The dependency-free Node ESM candidate contains:

- pinned admitted contract identities
- a Runtime-only realization and dispatch component
- injected finding ports for Authority, Provenance correlation, and Procedure
- an injected simulated effect port
- an in-memory operational store and observation sink
- exact disposition and Control-Plane Plan guards
- deterministic conformance tests

## Ownership Boundary

The candidate does not implement:

- Master Mason
- diagnosis production
- disposition selection
- Authority issuance or validation semantics
- PB-001 provenance semantics
- Procedure branching semantics
- credentials, providers, deployment, or live effects

It consumes independently supplied findings and refuses closed.

## Candidate Result

```text
Historical harness executable regression: 11 PASS / 0 FAIL
Historical harness current-semantic pressure: 5 PASS / 10 FAIL
Successor reference implementation: 15 PASS / 0 FAIL
```

## Stop Condition

The candidate remains test-scoped and noncanonical.

Promotion, production placement, package naming beyond the candidate path, deployment, real adapters, durable storage, credentials, or external effects require separate review and approval.
