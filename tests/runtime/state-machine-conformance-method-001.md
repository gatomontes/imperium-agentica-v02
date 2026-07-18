# State-Machine Conformance Method 001

## Status

Candidate verification method.

Theoretical only. No implementation has been tested.

## Purpose

Determine whether one concrete state machine faithfully realizes one cited Procedure contract and version without omitting, merging, inventing, or reinterpreting semantic behavior.

## Required Inputs

- exact Procedure contract and version
- every native dependency cited by that Procedure
- implementation state-machine definition and version
- semantic-to-operational state mapping
- event and guard definitions
- side-effect declarations
- Runtime realization and dispatch contract version
- test traces and observation envelopes

## Conformance Matrix

For every Procedure entry, transition, condition, branch, withholding rule, loop, independent branch, correction path, and exit, record:

| Field | Required content |
|---|---|
| Procedure element | exact section and version |
| Native semantic inputs | cited definitions and findings |
| Operational states | one or more mapped states |
| Trigger | exact accepted event or condition |
| Guard | checks required before transition |
| Authority check | exact action and dispatch freshness |
| Provenance check | exact identity and correlation |
| Side effect | none or exact effect identity policy |
| Durable observation | required envelope and result |
| Alternate path | mapped refusal, hold, retry, or return |
| Prohibited transition | explicit negative test |
| Independence | concurrency or serialization justification |
| Recovery | crash point and resumed behavior |
| Test trace | evidence reference |

## Bidirectional Coverage

Conformance requires both:

```text
every Procedure element → at least one implementation mapping
every implementation semantic transition → exactly one cited Procedure basis
```

Operational-only transitions may lack a Procedure basis only when they cannot alter semantic state or cause an externally consequential effect.

## Required Proof Obligations

A candidate implementation must demonstrate:

1. entry completeness
2. transition completeness
3. branch completeness
4. withholding preservation
5. prohibited-transition exclusion
6. independent-branch preservation
7. loop and repeated-attempt identity
8. closure/release and other required distinctions
9. correction and supersession preservation
10. crash recovery without branch invention
11. dispatch-time Authority and PB-001 checks
12. version and mapping compatibility

## Negative Testing

At minimum, inject:

- missing and mismatched semantic inputs
- expired, withdrawn, contested, and stale Authority
- cross-mission identity
- duplicate delivery and concurrent attempts
- crash before and after durable transition recording
- crash before and after external dispatch
- indeterminate external effect
- contract-version change while queued
- mapping incompatibility during deployment or rollback
- omitted, merged, and invented branches

## Result Vocabulary

```text
CONFORMANT
NONCONFORMANT
INDETERMINATE
NOT_TESTED
```

A machine is `CONFORMANT` only when every applicable obligation passes.

Unknown coverage is `INDETERMINATE`, not a pass.

## Change Rule

Any change to the Procedure version, semantic mapping, state-machine definition, externally consequential guard, or recovery behavior invalidates the affected conformance finding and requires rerun.

## Boundary

This method verifies correspondence. It does not define Procedure, approve Authority, establish Provenance, judge mission outcomes, or authorize execution.
