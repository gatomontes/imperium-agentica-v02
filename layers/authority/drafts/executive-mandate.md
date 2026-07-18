# Executive Mandate

## Status

Draft Authority specialization.

Native concern: Authority.

Origin:

```text
layers/cognitive/production/executive-mandate.md
Cognitive Baseline CB-001
```

Candidate target baseline: `AB-001`.

This draft specializes:

- `authority-origin-contract.md`
- `authority-grant-profiles.md#EXECUTIVE_DECISION`

It cites the Provenance Contract for lineage and does not define CEO cognitive responsibility.

## Purpose

The Executive Mandate is the specialized Authority Grant by which a represented Principal grants bounded Curia decision authority to one qualified and placed CEO President.

It does not qualify, admit, place, or construct the CEO.

## Core Distinctions

```text
Officer qualification ≠ Standing Curia Assignment
Standing Curia Assignment ≠ Executive Mandate
Executive Mandate ≠ Mission Envelope
Executive Mandate ≠ mission instruction
authority loss ≠ Officer deletion
authority vacancy ≠ authority transfer
```

A CEO may decide only while:

```text
qualified and admitted Executive Officer
+ active Standing Curia Assignment
+ effective Executive Mandate
+ applicable Mission Envelope when mission-scoped
= authority-eligible CEO decision
```

## Principal And Authority Basis

The Mandating Principal is the represented Principal competent to grant the decision domain.

The mandate must cite one applicable Authority Basis:

```text
IMPERIUM_STEWARDSHIP
CONTROLLED_RESOURCE
DELEGATED_AUTHORITY
LEGAL_OR_CONTRACTUAL_AUTHORITY
```

`IMPERIUM_STEWARDSHIP` may support internal Imperium governance decisions.

It cannot support external mission action by itself.

Mission-scoped decisions with external consequence require an Authority Basis capable of supporting the matching Mission Envelope.

The mandate cannot serve as its own Authority Basis.

## Mandate Contract

```text
Mandate identity and version
Authority Grant profile: EXECUTIVE_DECISION
Mandating Principal identity
Authority Basis identity and version
Parent grant when applicable
Grantee Officer identity and specification version
Standing Curia Assignment identity and version
Granted decision domain
Mission or mission-class scope
Permitted decisions
Prohibited decisions
Delegation rule
Competence and counsel constraints
Effective interval
Expiry or review condition
Suspension conditions
Withdrawal conditions
Succession or supersession rule
Authority-loss safe-state reference when applicable
Required provenance relations
Issued time
Supersedes
Status
```

This is a semantic authority contract, not a runtime permission object.

## Scope

A mandate may be bounded to:

- one mission
- an identified mission class
- an internal Imperium decision domain
- an explicit interval or review condition

Silence does not expand scope.

The mandate cannot authorize beyond:

- its Authority Basis
- any parent grant
- applicable Mission Envelope
- governance doctrine
- competence and counsel constraints
- represented legal or contractual boundaries

## Status Findings

The native Authority findings apply:

```text
AUTHORITY_EFFECTIVE
AUTHORITY_UNAVAILABLE
AUTHORITY_CONTESTED
AUTHORITY_EXPIRED
AUTHORITY_WITHDRAWN
AUTHORITY_SUPERSEDED
AUTHORITY_SCOPE_MISMATCH
AUTHORITY_ROOT_UNRESOLVED
AUTHORITY_DELEGATION_EXCEEDED
```

Only `AUTHORITY_EFFECTIVE` for the exact decision supports a new CEO decision.

## Verification

Before a decision is issued, the Chief of Staff cognitively performs the admitted verification responsibility and records the Authority finding.

The finding must cover:

- mandate identity and version
- provenance finding
- Principal and Authority Basis
- parent grant when any
- status and effective interval
- CEO and Standing Assignment match
- mission, object, and decision scope
- applicable Mission Envelope
- competence and counsel conditions
- suspension, contest, withdrawal, expiry, or supersession

The Chief of Staff does not grant, expand, or inherit authority.

## Authority Loss

When the mandate becomes ineffective:

- new substantive decisions stop at the effective time
- no authority transfers by vacancy
- earlier authorized decisions remain historical facts
- the mission remains only within its still-effective Mission Envelope
- a safe-state action is available only when already authorized
- otherwise the affected decision is withheld

Authority loss does not itself choose a mission disposition.

## Succession

A successor requires:

- admitted qualification
- a valid Standing Curia Assignment
- a new or superseding Executive Mandate
- an effective Authority finding

Succession does not mutate predecessor records or historical decisions.

There is no implicit acting CEO.

## Required Provenance

The mandate and every use of it require lineage for:

- Principal
- Authority Basis
- parent grant
- mandate identity and version
- grantee Officer
- Standing Curia Assignment
- Mission Envelope when applicable
- status transitions
- supersession
- Curia Minute and decision

Complete provenance does not make an ineffective mandate valid.

## Closure Relationship

Terminal disposition requires:

```text
effective Mission Envelope
with applicable terminal action class
+ effective Executive Mandate
covering the disposition
+ exact provenance match
```

Release is an authorized consequence of exactly matched closure. It is not a new Executive grant.

## Non-Authority

The mandate must not:

- qualify, admit, construct, or place an Officer
- create a Mission Envelope
- become launch authority through inference
- delegate to a group, vote, quorum, or Chief of Staff
- expand when mission scope changes
- erase competence or counsel requirements
- repair missing provenance
- retroactively rewrite decisions
- imply unlimited session capacity
- admit Praetorium or another institution

## Boundary Maxim

```text
Cognition qualifies and places.
Authority grants and constrains.
Provenance preserves lineage.
The CEO decides.
The Chief of Staff verifies and records.
No vacancy transfers authority.
```
