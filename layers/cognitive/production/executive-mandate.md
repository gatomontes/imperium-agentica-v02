# Executive Mandate

## Status

Admitted cognitive authority contract.

Baseline: `CB-001`.

Admission: `Production Admission Review 003`.

Evidence: `Constitutional Test Run 015 — 30 PASS / 0 FAIL`.

The Executive Mandate is the minimal artifact by which represented authority grants bounded Curia decision authority to a qualified and assigned CEO President.

It records authority. It does not create an upper-echelon institution, qualify an Officer, admit an Officer to Preceptory, or create a Standing Curia Assignment.

## Core Distinctions

```text
Officer qualification ≠ Standing Curia Assignment
Standing Curia Assignment ≠ Executive Mandate
Executive Mandate ≠ mission instruction
authority withdrawal ≠ Officer deletion
authority vacancy ≠ authority transfer
```

A CEO may decide only while all three are valid and mutually bound:

```text
qualified and Preceptory-admitted Executive Officer
+ active Standing Curia Assignment
+ effective Executive Mandate
= authorized CEO President
```

## Mandating Principal

The Mandating Principal is the represented authority competent to authorize Imperium's CEO President.

This is an artifact role, not a newly admitted office or institution.

The Principal may be the operator or another authority represented by the operator, but its final outer-echelon form remains deliberately unresolved.

The Executive Mandate must identify the Principal and the basis on which that Principal may issue, constrain, suspend, withdraw, or supersede the grant.

## Executive Mandate Record

```text
Mandate identity and version:
Mandating Principal:
Principal authority basis:
Grantee Officer identity and specification version:
Standing Curia Assignment reference:
Granted decision domain:
Mission or mission-class scope:
Permitted decisions:
Prohibited decisions:
Delegation rule:
Competence and counsel constraints:
Effective time:
Expiry or review condition:
Suspension conditions:
Withdrawal conditions:
Succession or supersession rule:
Authority-loss safe-state instruction:
Issued time:
Supersedes:
Status:
```

The mandate is versioned. Corrections and changes use supersession; history is not overwritten.

## Scope

A mandate may be bounded to:

- one mission
- an explicitly identified class of missions
- a standing domain
- a defined time or review interval

Silence does not expand scope.

A mission outside the mandate remains unauthorized even when the CEO is otherwise qualified and assigned.

The mandate cannot authorize the CEO beyond applicable governance doctrine, competence limits, mission purpose, or lawfully represented authority.

## States

```text
PROPOSED:
not effective

EFFECTIVE:
the named, qualified, assigned CEO may decide within scope

SUSPENDED:
temporarily ineffective; no new substantive decision authority

CONTESTED:
authority basis or scope is materially disputed; affected decisions are withheld

WITHDRAWN:
terminated by the Mandating Principal under the mandate

EXPIRED:
ended by its recorded time or review condition

SUPERSEDED:
replaced by a later mandate version
```

Only an EFFECTIVE mandate supports a new substantive Curia decision. Mandate scope does not prove that the standing CEO or CoS has capacity to serve a particular concurrent session.

## Authority Verification

Before presenting a decision for issuance, the Chief of Staff verifies and records:

- mandate identity and version
- status and effective interval
- named CEO and Standing Curia Assignment match
- mission and decision fall within scope
- no applicable suspension, withdrawal, expiry, or supersession
- any competence, counsel, or escalation condition is satisfied

The Chief of Staff verifies the authority record but does not grant, interpretively expand, or inherit authority.

A mismatch produces `AUTHORITY_UNAVAILABLE` or `AUTHORITY_CONTESTED`, not a decision.

## Authority Loss During A Mission

When the mandate becomes SUSPENDED, CONTESTED, WITHDRAWN, EXPIRED, or SUPERSEDED:

1. CoS records the state and affected decisions in a Curia Minute.
2. New substantive CEO decisions under that mandate stop at the effective time.
3. No authority passes to CoS, counselors, Collegium, Preceptory, Smith, Muster, or the operative.
4. Already authorized directions remain historical facts and are not retroactively invalidated merely by later authority loss.
5. The mission may continue only inside an already authorized envelope.
6. If that envelope contains an authority-loss safe-state instruction, Muster may operationalize that preauthorized hold, constraint, recall, or wind-down.
7. Otherwise, affected work enters `DECISION_WITHHELD — AUTHORITY_UNAVAILABLE`.
8. Mission closure requires an effective mandate unless an already authorized terminal safe-state instruction explicitly supplies the permitted disposition and conditions.

Authority loss does not itself declare a mission COMPLETED, FAILED, PARTIALLY_COMPLETED, or TERMINATED.

## Succession

A successor becomes authorized only when:

- the successor is qualified and Preceptory-admitted for the Executive Officer class
- a valid Standing Curia Assignment places the successor
- a new or superseding Executive Mandate names that Officer and assignment
- the new mandate is EFFECTIVE

Succession does not mutate the predecessor's Officer record, assignment, mandate, or historical Curia Minutes.

There is never an implicit acting CEO.

## Curia And Closure Records

Every Curia Minute records:

```text
Executive Mandate identity and version:
Mandate status:
Mandating Principal:
Decision scope match:
Authority verification:
Authority deficiency or contest:
```

Every Mission Closure Record cites the effective Executive Mandate supporting the terminal disposition.

## Non-Authority

The Executive Mandate must not:

- qualify or construct an Officer
- admit an Officer to Preceptory
- create a Standing Curia Assignment
- delegate decision authority to a group, vote, quorum, or CoS
- silently expand when mission scope changes
- erase competence or required-counsel limits
- retroactively rewrite historical decisions
- turn authority loss into an inferred mission disposition
- imply unlimited session capacity
- admit Praetorium or another upper-echelon institution by implication

## Boundary Maxim

```text
Studium and The Gesta shape fitness.
Smith constructs.
Spur tests.
Preceptory admits.
Standing assignment places.
The Executive Mandate authorizes.
The CEO decides.
The Chief of Staff verifies and records.
No vacancy transfers authority.
```
