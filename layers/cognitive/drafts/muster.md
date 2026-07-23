# Muster

## Canonical Dependencies

This cognitive artifact cites the following admitted contracts as external canonical definitions; it does not originate or redefine them:

- `layers/provenance/production/mission-correlation-and-isolation-contract.md`

## Status

Unadmitted B2.1a draft candidate derived from the CB-005 production Muster.

Candidate evidence:

- `B2.1a Muster Credential-Transfer Pressure Run 002 — 16 PASS / 0 FAIL`
- `B2.1a Muster Credential-Transfer Convergence Review 001 — 18 PASS / 0 FAIL`

This file proposes a bounded correction to Muster for Imperium v02. It does not revise CB-005 unless separately admitted.

It does not admit live deployment automation, external execution authority, credential-management implementation, runtime orchestration, or a named launch institution.

---

## Purpose

Muster owns outbound mission orchestration.

It assembles an operative for initial deployment, operationalizes authorized Curia decisions for continuing missions, and releases the mission binding after authorized closure.

It receives a deployment-medium-specific operative from Conscription, incorporates mission intelligence, obtains authorized tools and access, binds mission instructions and constraints, and produces a mission-bound Deployment Package.

Muster does not forge the persona, recruit the operative, make Curia decisions, launch the deployment, execute the mission, or judge the return.

---

## Core Question

```text
What must be assembled around this operative for this particular mission?
```

---

## Mission Formation Is Not Mission Assembly

Castellan forms the Mission Need and Work Specification.

Conscription produces the operative.

Muster assembles the mission around that operative.

Professional competence does not replace mission instruction.

Operative existence does not imply mission readiness.

---

## Inputs

Muster may receive:

- mission need and approved Work Specification from Castellan
- deployment-medium-specific Operative from Conscription
- Mission Inquest from Inquisition
- authorized tools and usage constraints from Armory
- authorized non-secret credential-binding references, access tickets, Access Grant references, permission constraints, expiration and revocation conditions, and permitted access results or refusals from Locksmith
- operator constraints
- required reporting, escalation, return, and termination conditions

---

## Product

Muster produces a `Deployment Package`.

A Deployment Package may include:

```text
Deployment Package identity:
Mission reference:
Operative Binding identity:
Muster Instance identity:
Curia Session identity:
Work Specification reference:
Operative identity and version:
Canonical Persona reference:
Deployment medium:
Mission Inquest reference:
Mission Dossier:
Mission brief:
Tools issued:
Non-secret credential bindings / access references:
Rules of engagement:
Mission-specific constraints:
Reporting requirements:
Escalation triggers:
Return channel:
Launch conditions:
Termination conditions:
Unresolved blockers:
Assembly status:
```

The credential-binding and access-reference field may contain only non-secret, non-bearer references. It must never contain credential values, bearer tokens, private keys, replayable session material, or any opaque value capable of independent authentication.

A non-secret reference must not itself function as a bearer capability.

A permitted access result or refusal must be non-secret and non-replayable. It must not contain credential values, session material, or another value capable of independent authentication.

The Deployment Package is mission-specific and bound to exactly one Mission Identity, Operative Binding, and Muster Instance.

It is distinct from:

- the canonical persona held by Garrison
- the operative produced by Conscription
- the launched deployment encountered by Theatre

---

## Assembly States

```text
Assembly Pending
Blocked
Ready For Launch
Superseded
Cancelled
```

These states describe the Deployment Package.

They do not describe persona admission, operative recruitment, Theatre execution, or mission outcome.

`Ready For Launch` means required assembly conditions are satisfied.

It does not itself launch or authorize external execution beyond the authority already represented in the package.

---

## Relationship To Castellan

Castellan defines the mission need and approved work.

Muster must preserve that mission meaning while translating it into a concrete mission brief and Deployment Package.

Muster must return ambiguities or contradictions rather than silently redefining the mission.

---

## Relationship To Conscription

Conscription produces the deployment-medium-specific operative.

Muster binds that operative to one mission without altering its canonical profession, Persona Governance Doctrine, Human-Trait Canon, or recruitment provenance.

If the mission requires a materially different persona or operative, Muster returns the conflict to the appropriate upstream path.

---

## Relationship To Inquisition

Inquisition investigates the mission terrain and produces the Mission Inquest.

Muster uses that evidence to assemble the Mission Dossier and brief.

Muster must not fabricate missing mission intelligence.

---

## Relationship To Armory And Locksmith

Armory supplies authorized tools and constraints.

Locksmith retains responsibility for credential material and supplies only authorized non-secret credential-binding references, access tickets, Access Grant references, permission constraints, expiration and revocation conditions, and permitted access results or refusals.

Runtime retains credential custody and performs authorized authenticated operations only through a custody mechanism separately admitted for that purpose.

Muster assembles only those non-secret references, constraints, conditions, and permitted results into the Deployment Package. Muster does not receive, carry, resolve, or use credential material.

Availability is not authorization.

Access is not mission understanding.

---

## Relationship To Curia

Curia convenes Officers who understand, verify, deliberate, and authorize what must happen next.

Muster receives authorized Curia decisions and converts them into outbound mission instructions, Deployment Package amendments, pause/resume/recall/termination instructions, closure wind-down instructions, or other mission-control artifacts.

Muster preserves the authority, reasoning reference, mission meaning, and active deployment provenance.

Curia does not address Iron Gate directly.

---

## Relationship To Mission Concurrency

Every active mission has a separate Muster instance.

A Muster instance accepts only artifacts whose Mission Identity, Deployment identity, Operative Binding, Curia Session, and correlation references match its own mission spine.

It rejects `CROSS_MISSION_COLLISION` artifacts rather than inferring correlation from similar content.

The same immutable operative version may be referenced by another mission only through a separate authorized Operative Binding and Deployment Package. One active Operative Binding cannot serve multiple missions.

A Curia decision is operationalized only by the matching Muster instance. A direction from another mission has no authority here.

## Relationship To Closure And Release

Muster does not decide that a mission is complete.

When the CEO authorizes BEGIN_WIND_DOWN, Muster operationalizes the required stop, recall, finalization, or Terminal Field Packet instruction through Iron Gate.

Only after receiving an authorized MISSION_CLOSED and Mission Closure Record whose Mission Identity, Deployment identity, Operative Binding, Curia Session, Muster Instance, and release authorization all match does Muster terminate the mission binding around the operative.

Muster then:

- coordinates mission-scoped tool deactivation or return with Armory
- coordinates mission-scoped access revocation or expiry with Locksmith
- records unresolved provider obligations
- produces the Operative Release Record
- ends the mission-specific Muster instance

Release does not delete the operative, alter its canonical persona, erase history, or authorize reuse.

---

## Relationship To Theatre

Theatre is the execution terrain.

Muster prepares a Deployment Package for the launch boundary leading to Theatre.

Muster presents a Ready For Launch Deployment Package to the Iron Gate, La Cortine's dedicated deployment exit.

Muster does not manage continuing Barbican traffic and does not control what happens in Theatre and does not receive or judge Theatre returns.

---

## Non-Authority

Muster must not:

- invent mission purpose
- determine the profession
- forge or rewrite the canonical persona
- weaken Studium doctrine
- alter Hagiography canon
- duplicate Conscription's platform transformation
- fabricate mission research
- include credential material, bearer capability, or unauthorized tool or access reference
- treat assembly as launch
- execute the mission
- receive or judge mission results
- decide disposition or closure
- accept a foreign or ambiguously correlated artifact
- share mutable mission state with another Muster instance
- release an operative before an exactly correlated authorized MISSION_CLOSED

---

## Boundary Maxims

```text
Castellan specifies the mission.
Conscription produces the operative.
Inquisition investigates.
Armory equips.
Locksmith unlocks.
Muster assembles, operationalizes, and releases mission binding.
Iron Gate launches.
Barbican sustains continuing operations.
Theatre exposes consequence.
```

---

## Failure Signals

Review or revise this draft if:

- Muster becomes a sovereign mission commander
- mission assembly changes Castellan mission meaning
- Muster duplicates Conscription's platform work
- mission dossiers are written without Inquisition support
- tools or access appear without authorization provenance
- credential material or a bearer capability enters Muster or a Deployment Package
- Ready For Launch is mistaken for launched
- Muster becomes the unnamed execution layer
- Muster receives or interprets Theatre returns
