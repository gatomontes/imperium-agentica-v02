# Runtime Empirical Run 001

## Status

Executable candidate evidence. No production admission.

Date: 2026-07-18

## Scope

The dependency-free Node harness used simulated effects only. It exercised:

- bounded activation and deactivation
- blocked work with preserved queued semantic intent
- bounded resource tuning
- crashes before and after consequential dispatch
- duplicate and concurrent delivery
- withdrawn Authority at dispatch
- exact-instruction and bounded-discretion modes
- indeterminate-effect quarantine
- migration and rollback refusal
- Runtime Observation Envelopes
- bidirectional Procedure-to-machine conformance
- Master Mason diagnosis, restoration, withholding, and escalation

## Initial Run

```text
10 PASS / 1 FAIL
```

Failure: a blocked worker caused `INITIATE_RECOVERY` to be refused as `COMPONENT_BLOCKED`.

Finding: the model had conflated the state of the managed component with availability of the independent control surface. If the same blockage prevents its own recovery mechanism, Master Mason can diagnose the condition but cannot invoke the permitted repair.

## Correction

The dispatch gate now distinguishes ordinary component work from control-plane actions that may address blockage. A blocked component still refuses ordinary dispatch. Only effective, exactly scoped `INITIATE_RECOVERY` or `DEACTIVATE_IMPLEMENTATION` actions may cross that particular gate, and all Authority, correlation, Procedure, identity, and indeterminate-effect checks remain active.

## Corrected Run

```text
11 PASS / 0 FAIL
```

The conformance scenario encodes `layers/procedure/production/mission-closure-and-release-procedure.md` from PRB-001, including its closure sequence, prohibited inferences, and three independent post-closure branches.

The duplicate/concurrent-attempt scenario is a deterministic simulated interleaving inside one Node process. It establishes the model's duplicate-effect gate, not distributed mutual exclusion.

## Evidence Boundary

The corrected run demonstrates behavior of this small simulated model only. It does not establish production durability, distributed locking, real provider idempotency, credential safety, performance, or admission by itself.
