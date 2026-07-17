# Mission Concurrency And Isolation Contract

## Status

Admitted cognitive contract.

Baseline: `CB-001`.

Admission: `Production Admission Review 003`.

Evidence: `Constitutional Test Run 015 — 30 PASS / 0 FAIL`.

This contract defines the minimum structural boundaries required when more than one mission exists at the same time.

It does not define scheduling algorithms, queues, locks, databases, worker pools, threads, services, or runtime concurrency.

## Core Rule

Every mission owns a separate correlation spine and mutable mission state.

```text
shared governed reference ≠ shared mission state
similar request ≠ same ticket
same provider ≠ same intervention
standing role ≠ unlimited capacity
authority scope ≠ session availability
one closure ≠ another release
```

## Mission Correlation Spine

Every mission receives an immutable Mission Identity.

Every mission-scoped artifact or event must bind to that identity and, where applicable, the exact subordinate identity:

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
├── Advisory Session Assignment identities
├── Terminal Field Packet identity
├── Mission Closure Record identity
└── Operative Release Record identity
```

A human-readable title, provider, operation name, operative role, timestamp proximity, or semantic similarity is never sufficient correlation.

Corrections use supersession. Identities are not rewritten or recycled.

## Mission-Local Instances

Each active mission has:

- one mission-specific Muster instance
- one mission-specific Curia Session identity
- one mission-specific Operative Binding
- one or more versioned Deployment Packages under that binding
- mission-scoped provider tickets and ledger entries
- mission-scoped Minutes, counsel assignments, closure, and release records

A Muster instance may act only on artifacts bound to its Mission Identity.

A Curia session may admit only packets, records, Officers, counsel, and decisions explicitly correlated to its Mission Identity.

An Operative Binding belongs to exactly one active mission. Another mission requires a separate authorized binding and Deployment Package even when it references the same immutable operative version.

## Shared Governed References

The following may be referenced across missions when their versions are explicit:

- Profession Specification
- Persona Governance Doctrine
- Human-Trait Canon
- Canonical Persona
- immutable operative specification
- Officer Governance Doctrine
- Officer-Trait Canon
- Officer Specification
- Preceptory admission
- Standing Curia Assignment
- Executive Mandate when its scope covers each mission

These are shared references, not shared mutable session state.

A decision in each Curia Minute snapshots the exact standing-role, mandate, doctrine, persona, operative, and mission-artifact versions used.

## Curia Session Isolation

A Curia Session Record includes:

```text
Curia Session identity:
Mission identity:
Deployment identity:
Muster Instance identity:
CEO Officer + Standing Assignment:
CoS Officer + Standing Assignment:
Executive Mandate version and scope match:
Session state:
Standing-role capacity finding:
Packets admitted:
Provider views admitted:
Advisory Session Assignments:
Minutes:
Opened time:
Closed time:
Supersedes:
```

Possible cognitive session states:

```text
PENDING_STANDING_ROLE
OPEN
DECISION_WITHHELD_CAPACITY
CLOSURE_PENDING
CLOSED
```

Session state does not create or transfer decision authority.

Counsel assigned to one Curia session cannot advise another session without a distinct Curia Session Assignment.

## Standing-Role Capacity

A Standing Curia Assignment proves placement, not unlimited capacity.

Before a session becomes OPEN, CoS records a Session Admission Finding that verifies:

- CEO availability for responsible decision participation
- CoS availability for faithful orchestration and record integrity
- effective Executive Mandate coverage
- absence of a conflicting session commitment that would violate role doctrine
- any declared capacity constraint

This is a fitness and availability finding, not a substantive mission decision.

If either standing role is unavailable:

```text
SESSION_CAPACITY_UNAVAILABLE
→ PENDING_STANDING_ROLE or DECISION_WITHHELD_CAPACITY
→ already authorized mission envelope or safe state only
```

Capacity unavailability:

- does not create an acting CEO or acting CoS
- does not transfer authority to a counselor, Collegium, Preceptory, Smith, Muster, or an operative
- does not justify merging Curia sessions
- does not authorize an inferred pause, recall, termination, or closure
- does not imply a permanent numerical concurrency limit

The mission may continue only within its already authorized envelope. Any hold or safe state must already be authorized by the Deployment Package, Executive Mandate, or a valid prior Curia decision.

## Provider Isolation

Every Armory or Locksmith request and ledger entry includes at least:

```text
Mission identity:
Deployment identity:
Operative Binding identity:
Provider ticket identity:
Requested operation identity:
Correlation identity:
Muster Instance identity when originating from initial assembly:
Barbican exchange identity when originating during Theatre execution:
```

Provider audit queries are mission-scoped. CoS may not combine same-provider or same-operation entries across missions as one intervention.

A result for one ticket cannot satisfy, fail, close, or release another mission.

Cross-mission comparison is allowed only as an explicit evidence reference. It never merges state or custody.

## Muster Isolation

Each Muster instance:

- assembles and versions only its mission's Deployment Package
- operationalizes only decisions from the matching Curia session and Minute
- verifies mission, deployment, operative binding, mandate, and instruction correlation
- rejects foreign or ambiguous artifacts
- ends only after its mission's exact Operative Release Record is complete

A direction cannot be copied into another mission merely because its content appears applicable.

## Closure And Release Isolation

MISSION_CLOSED applies only to the Mission Identity, Deployment identity, Operative Binding, Curia Session, and Closure Record explicitly named by the CEO decision.

Muster releases only when all of these exactly match its instance:

```text
Mission Closure Record
+ Mission Identity
+ Deployment identity
+ Operative Binding identity
+ Muster Instance identity
+ release authorization
```

Closure of Mission A cannot:

- close Mission B
- satisfy Mission B's terminal return
- revoke Mission B's tools or access
- end Mission B's Curia Session
- release Mission B's Operative Binding
- end Mission B's Muster instance

## Collision Handling

A correlation mismatch produces:

```text
CROSS_MISSION_COLLISION
→ quarantine or reject affected artifact
→ preserve both mission states
→ Curia Minute in each affected session when material
→ no inferred merge, decision, closure, or release
```

Lazaretto may quarantine a mismatched return. It does not repair the correlation by inference.

## Non-Authority

This contract does not allow:

- global mutable mission state
- identity inference from semantic similarity
- reuse of provider ticket identities
- a shared Muster instance across active missions
- a shared mutable Curia session across missions
- capacity exhaustion to transfer authority
- one mission's Minute to authorize another
- one mission's closure to release another
- concurrent use of one active Operative Binding by multiple missions
- automatic scheduling or runtime machinery

## Boundary Maxim

```text
References may be shared by version.
Mission state may not.
Each mission has its own Curia session.
Each mission has its own Muster instance.
Capacity failure withholds; it does not transfer.
Closure and release require exact correlation.
```
