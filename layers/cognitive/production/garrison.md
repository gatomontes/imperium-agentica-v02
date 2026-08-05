# Garrison

## Status

Admitted.

Baseline: `CB-CURRENT`.

Admission: `Production Admission Review 003`.

Evidence: `Constitutional Test Run 015 — 30 PASS / 0 FAIL`.

This file defines the provisional Garrison for Imperium v02.

It does not admit implementation storage, deployment automation, persistent registry schema, or external orchestration authority.

---

## Purpose

The Garrison holds admitted, versioned Personas.

It is the inventory of tested, reusable professional personas available for Conscription, delivery, adaptation, or future revision.

A persona in Garrison is not an operative.

It remains a canonical, portable specification until Conscription embodies it for a deployment medium.

---

## Core Question

```text
Which admitted personas are available, qualified, constrained, superseded, or retired?
```

---

## Responsibilities

The Garrison may preserve:

- admitted persona identity
- exact Persona identity, version, and SHA-256 digest
- Castellan admission record
- Foundry Release Packet reference
- exact passing Pit Brief reference
- Persona Template and upstream artifact fingerprints
- purpose
- capabilities and competencies
- governable boundaries
- known limits
- test history
- revision history
- qualification status
- availability for Conscription
- operative forms previously derived from the persona

---

## Relationship To Castellan

Garrison accepts a Persona only from Castellan with an immutable admission record bound to the exact Persona version and digest and its complete Foundry Release Packet.

Garrison verifies package identity and records custody. It does not reconsider the Pit examination, grant Foundry production approval, or adjudicate admission. A malformed, mismatched, incomplete, or unauthenticated admission package must be refused and returned to Castellan without creating a roster entry.

Once custody is recorded, the admitted Persona may be marked available for downstream suitability determination and Conscription under their separate contracts.

---

## Garrison Custody Record Contract

For every accepted admission package, Garrison creates an immutable custody record containing:

- `custody_record_id`, record version, and record SHA-256 digest
- exact Persona identity, version, and SHA-256 digest
- exact Castellan Admission Record identity, version, and SHA-256 digest
- exact Foundry Release Packet identity, version, and SHA-256 digest
- exact passing Pit Brief identity, version, and SHA-256 digest
- exact Persona Template and upstream-artifact fingerprints
- custody status and status-effective time
- Garrison receiving identity, verification record, and receipt time
- handoff correlation identity matching Castellan's admitted package

Garrison must verify the complete identity chain before creating the roster entry:

```text
Persona
↔ passing Pit Brief
↔ Foundry Release Packet
↔ Castellan Admission Record
↔ Garrison Custody Record
```

Any mismatch, omission, mutable reference, or broken correlation requires refusal and return to Castellan. Garrison records the refusal separately and must not create a provisional admitted entry.

## Relationship To Conscription

Conscription searches Garrison for an admitted persona that satisfies the requested professional capability.

Conscription recruits the selected persona into a deployment-medium-specific operative.

Garrison does not perform that transformation.

---

## Possible Statuses

```text
Admitted
Available
Reserved
Needs Review
Needs Revision
Superseded
Quarantined
Retired
```

These statuses are provisional and describe persona inventory, not operative mission state.

---

## Non-Authority

The Garrison must not:

- forge personas
- admit, reject, or otherwise adjudicate Persona candidates
- accept a Persona without Castellan's exact admission record and complete release package
- determine mission needs
- recruit personas into operatives
- write mission dossiers
- issue tools or credentials
- deploy operatives
- judge mission returns

---

## Boundary Maxims

```text
Pit certifies examination.
Foundry approves production.
Castellan admits.
Garrison preserves exactly what Castellan admitted.
Conscription recruits what is selected.
Muster assembles the resulting operative for a mission.
```

---

## Failure Signals

Review or revise this draft if:

- Garrison becomes a deployment controller
- Garrison accepts a Persona without exact Castellan admission
- Garrison treats custody verification as admission authority
- persona inventory status is confused with operative mission state
- Garrison begins owning deployment-medium transformation
