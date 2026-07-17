# Muster

## Status

Draft.

This file defines the provisional Muster for Imperium v02.

It does not admit live deployment automation, external execution authority, credential-management implementation, runtime orchestration, or a named launch institution.

---

## Purpose

Muster owns outbound mission orchestration.

It assembles an operative for initial deployment and operationalizes authorized Curia decisions for continuing missions.

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
- authorized credentials, access bindings, and permission constraints from Locksmith
- operator constraints
- required reporting, escalation, return, and termination conditions

---

## Product

Muster produces a `Deployment Package`.

A Deployment Package may include:

```text
Deployment Package identity:
Mission reference:
Work Specification reference:
Operative identity and version:
Canonical Persona reference:
Deployment medium:
Mission Inquest reference:
Mission Dossier:
Mission brief:
Tools issued:
Credentials / access issued:
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

The Deployment Package is mission-specific.

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

Locksmith supplies authorized credentials, access bindings, permission constraints, and revocation conditions.

Muster assembles these into the Deployment Package.

Availability is not authorization.

Access is not mission understanding.

---

## Relationship To Curia

Curia convenes Officers who understand, verify, deliberate, and authorize what must happen next.

Muster receives authorized Curia decisions and converts them into outbound mission instructions, Deployment Package amendments, pause/resume/recall/termination instructions, or other mission-control artifacts.

Muster preserves the authority, reasoning reference, mission meaning, and active deployment provenance.

Curia does not address Iron Gate directly.

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
- issue unauthorized tools or credentials
- treat assembly as launch
- execute the mission
- receive or judge mission results
- decide disposition

---

## Boundary Maxims

```text
Castellan specifies the mission.
Conscription produces the operative.
Inquisition investigates.
Armory equips.
Locksmith unlocks.
Muster assembles.
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
- Ready For Launch is mistaken for launched
- Muster becomes the unnamed execution layer
- Muster receives or interprets Theatre returns
