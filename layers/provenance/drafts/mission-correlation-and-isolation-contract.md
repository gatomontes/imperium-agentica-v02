# Mission Correlation And Isolation Contract

## Status

Draft Provenance specialization.

Native concern: Provenance.

Origin:

```text
layers/cognitive/production/mission-concurrency-and-isolation-contract.md
Cognitive Baseline CB-001
```

Candidate target baseline: `PB-001`.

This draft specializes `provenance-contract.md`.

It does not define runtime concurrency, standing-role capacity policy, cognitive responsibility, or authority.

## Core Rule

```text
shared governed reference ≠ shared mission state
similar content ≠ same identity
one mission decision ≠ another mission authority
one closure ≠ another release
```

Every mission has one immutable Mission Identity and a distinct correlation spine.

## Mission Correlation Spine

Every mission-scoped subject must correlate to the Mission Identity and each applicable subordinate identity:

```text
Mission Identity
├── Work Specification version
├── Operative Binding identity
├── Deployment identity and Deployment Package version
├── Muster Instance identity
├── Curia Session identity
├── packet and return identities
├── provider ticket and ledger-entry identities
├── Curia Minute identities
├── Curia Session Assignment identities
├── Terminal Field Packet identity
├── Mission Closure Record identity
└── Operative Release Record identity
```

A title, provider, operation name, role, timestamp proximity, or semantic similarity is never sufficient correlation.

Identities are not recycled.

Corrections use supersession.

## Mission-Local Subjects

The contract requires distinct identities for:

- mission-specific Muster instance
- mission-specific Curia Session
- mission-specific Operative Binding
- versioned Deployment Packages
- provider tickets and observations
- packets and returns
- Minutes and counsel assignments
- closure and release records

The cognitive owners of these subjects remain defined in CB-001 or its successor.

This contract defines their correlation, not their responsibilities.

## Shared References

Immutable governed references may be cited across missions by exact identity and version.

Examples include persona, doctrine, canon, operative specification, Officer specification, admission, Standing Curia Assignment, and Authority Grants.

Shared reference does not create shared mutable mission state.

Every mission-specific decision snapshots the exact versions used.

## Curia Session Correlation

A Curia Session subject must correlate:

```text
Curia Session identity
Mission identity
Deployment identity
Muster Instance identity
CEO and Standing Assignment references
CoS and Standing Assignment references
Executive Mandate reference
Session-state reference
Session Admission Finding reference
Packets admitted
Provider views admitted
Curia Session Assignments
Minutes
Open and close ordering references
Supersession
```

Capacity and availability findings are externally defined cognitive or policy inputs.

This contract preserves their identity and correlation but does not decide capacity.

Session identity does not create or transfer authority.

## Provider Correlation

Every provider request and observation must correlate:

```text
Mission identity
Deployment identity
Operative Binding identity
Provider ticket identity
Requested operation identity
Correlation identity
Muster Instance identity when assembly-originated
Barbican exchange identity when Theatre-originated
```

A result for one ticket cannot satisfy, fail, close, or release another mission.

Cross-mission comparison is permitted only through an explicit provenance assertion. It never merges state or custody.

## Muster Correlation

Every artifact accepted by a Muster instance must exactly match its Mission Identity and applicable deployment, binding, Curia Session, decision, and instruction references.

Similar content cannot repair a mismatch.

One active Operative Binding cannot serve multiple missions.

## Closure And Release Correlation

`MISSION_CLOSED` applies only to the exact identities named by the authorized decision.

Release requires an exact match among:

```text
Mission Closure Record
Mission Identity
Deployment identity
Operative Binding identity
Muster Instance identity
Curia Session identity
release authorization
```

One mission's closure cannot close, revoke, end, or release another.

## Collision Finding

A mismatch produces:

```text
PROVENANCE_SCOPE_MISMATCH
+ CROSS_MISSION_COLLISION
```

Expected consequence is externally defined by the applicable cognitive, authority, and future procedural contracts.

The collision itself does not authorize quarantine, rejection, pause, closure, or release.

Lazaretto may preserve and quarantine under separately admitted responsibility and authority.

## Required Provenance Assertions

Applicable subjects must preserve:

- `CORRELATED_TO` exact mission and subordinate identities
- `DERIVED_FROM` exact source versions
- `SUPERSEDES` when corrected
- `PRODUCED_BY` or `OBSERVED_BY` applicable responsibility
- `AUTHORIZED_UNDER` applicable grants without validating them
- transfer or transformation relations when boundaries are crossed

Completeness is evaluated relative to each native artifact contract.

## Non-Authority

This contract does not:

- authorize a mission, decision, tool, access, launch, hold, closure, or release
- transfer authority during capacity failure
- define safe-state permission
- define cognitive owners
- infer identity
- merge sessions or instances
- schedule work
- implement locks, queues, threads, services, databases, or storage

## Boundary Maxim

```text
References may be shared by exact version.
Mission state may not.
Similarity never repairs identity.
Closure and release require exact correlation.
Provenance records; it does not authorize.
```
