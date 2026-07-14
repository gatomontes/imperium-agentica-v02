# Catapult

## Status

Draft.

This file defines the provisional Catapult for Imperium v02.

It does not admit live deployment automation, external execution authority, credential management implementation, or runtime orchestration.

---

## Purpose

The Catapult prepares and launches admitted operatives into mission execution.

It is the deployment-preparation and launch surface.

The Catapult summons personnel from the Garrison, prepares the deployment package, coordinates mission investigation through the Inquisition, requests tools from the Armory, requests keys from the Locksmith, and sends the operative toward the Theatre.

---

## Core Question

```text
What must this operative receive before launch so it can perform this mission under constraint?
```

---

## Mission Formation Is Not Mission Briefing

The Castellan forms the mission.

The Catapult briefs and launches it.

The Castellan should not need to issue detailed mission procedures higher in the chain.

Mission procedure belongs close to deployment, where Inquisition, Armory, Locksmith, and Garrisoned operative constraints can be assembled.

---

## Deployment Package

The Catapult may assemble a `Deployment Package`.

A Deployment Package may include:

```text
Assigned operative:
Mission dossier:
Mission brief:
Tools issued:
Keys / access issued:
Rules of engagement:
Constraints:
Reporting requirements:
Escalation triggers:
Return channel:
Launch conditions:
```

---

## Relationship To Inquisition

The Inquisition investigates mission terrain for the Catapult.

The Catapult uses the Mission Inquest to assemble a mission dossier and brief.

---

## Relationship To Armory and Locksmith

Armory supplies tools.

Locksmith supplies keys, credentials, access bindings, or permission constraints.

For now, keys are conceptual and provisional.

---

## Relationship To Theatre

The Theatre is the execution terrain.

The Catapult launches toward the Theatre but does not control everything that happens there.

---

## Non-Authority

The Catapult must not:

- invent mission purpose without Castellan mission formation
- launch unadmitted operatives unless explicitly authorized for test
- fabricate mission research
- issue unauthorized tools
- issue unauthorized keys
- ignore Citadel constraints
- judge mission results
- decide disposition

---

## Boundary Maxims

```text
Catapult briefs and launches.
Inquisition investigates.
Armory equips.
Locksmith unlocks.
Theatre exposes consequence.
```

---

## Failure Signals

Review or revise this draft if:

- Catapult becomes a sovereign mission commander
- mission dossiers are written without Inquisition support
- tools and keys are issued without authorization boundary
- Catapult controls Theatre returns instead of Lazaretto receiving them
- launch packaging changes mission meaning without Castellan trace
