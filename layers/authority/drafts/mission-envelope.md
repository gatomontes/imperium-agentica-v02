# Mission Envelope

## Status

Draft Authority specialization exposed by Procedural Split Investigation 001.

Candidate profile: `MISSION_ENVELOPE`.

Not admitted. AB-001 production remains unchanged.

## Canonical Dependencies

- Authority origin: `layers/authority/production/authority-origin-contract.md`
- grant profiles: `layers/authority/production/authority-grant-profiles.md`
- provenance: `layers/provenance/production/provenance-contract.md`
- mission correlation: `layers/provenance/production/mission-correlation-and-isolation-contract.md`

## Purpose

Represent bounded permission for Imperium to form, bind, support, direct, wind down, close, release, report, and deliver one exact mission.

The Mission Envelope permits listed classes of action.

It does not decide that an action should occur, define who is cognitively responsible, or specify procedural order.

## Action Classes

```text
FORM_MISSION
APPROVE_WORK_SPECIFICATION
BIND_OPERATIVE
PROCESS_RETURN
INITIAL_EXTERNAL_CROSSING
CONTINUING_EXTERNAL_INSTRUCTION
BEGIN_WIND_DOWN
TERMINAL_DISPOSITION
RELEASE_MISSION_BINDING
REPORT_AND_DELIVER
```

Silence does not authorize an action class.

An envelope may contain a strict subset.

## Minimum Semantic Content

```text
Grant identity and version
Authority profile: MISSION_ENVELOPE
Represented Principal
Authority Basis
Parent grant when applicable
Mission identity
Permitted action classes
Prohibited actions
Affected systems, resources, and external parties
Effective interval
Conditions and required counsel
Delegation rule
Tool and Access Grant constraints
Authority-loss safe-state instruction
Withdrawal, expiry, contest, and supersession
Required provenance findings
Status
```

This is a semantic Authority contract, not a runtime permission object.

## Pre-Formation Identity

An exact proposed Mission Identity may be allocated before substantive mission formation.

```text
identity allocation ≠ mission approval
identity allocation ≠ Authority Grant
identity allocation ≠ Work Specification approval
```

The proposed identity permits exact scoping of `FORM_MISSION` and `APPROVE_WORK_SPECIFICATION`.

If formation is refused, the identity and refusal remain historically addressable and are never recycled.

## Scope Rules

- one envelope applies to one exact Mission Identity unless an independently competent parent basis explicitly supports a bounded mission class
- a mission-class grant does not remove the need for one mission-specific envelope representation
- derived scope cannot exceed the parent Authority Basis or grant
- an Executive Mandate does not substitute for the Mission Envelope
- the Mission Envelope does not substitute for the Executive Mandate
- Tool and Access Grants must remain inside the envelope

## Closure And Release

`BEGIN_WIND_DOWN`, `TERMINAL_DISPOSITION`, and `RELEASE_MISSION_BINDING` are separate action classes.

Permission for one does not imply another.

```text
BEGIN_WIND_DOWN ≠ TERMINAL_DISPOSITION
TERMINAL_DISPOSITION ≠ RELEASE_MISSION_BINDING
```

The envelope grants bounded permission. It does not choose the disposition or prove completion.

## Authority-Loss Boundary

The envelope must cite an explicit safe-state instruction when loss of authority could strand active external effects.

A safe-state instruction:

- is bounded by the Authority Basis
- cannot expand the original grant
- cannot be invented by Procedure
- cannot become a terminal disposition unless the grant expressly says so
- remains subject to PB-001 correlation

## Terminal Administrative Tail

`TERMINAL_DISPOSITION` does not automatically expire the entire envelope.

When explicitly listed, `REPORT_AND_DELIVER` may remain effective after closure or release only for:

- preparing and delivering the terminal report or artifact
- communicating recorded unresolved conditions
- completing cited administrative obligations

The tail:

- permits no new field instruction
- cannot reactivate Tool or Access Grants
- cannot restore an Operative Binding
- ends on its recorded completion, withdrawal, expiry, or supersession condition

Operational capability grants end no later than release of their mission binding even when the administrative tail remains effective.

## Non-Procedure

This contract does not define:

- lifecycle order
- when assessment begins
- who performs an action
- which branch is expected next
- runtime execution

Those belong to admitted Cognitive responsibilities and Procedure contracts.

## Non-Admissions

This draft does not admit mission authority, external action, a Principal, a runtime envelope, or a Procedure baseline.
