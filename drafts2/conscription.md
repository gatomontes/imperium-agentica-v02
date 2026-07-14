# The Conscription

## Status

Draft.

This file defines the provisional Conscription for Imperium v02.

It does not admit automated staffing, runtime orchestration, permanent agent registry implementation, or full deployment authority.

---

## Purpose

The Conscription is operative orchestration.

It coordinates the raising, selection, or supply of operatives required by a mission.

It sits below the Castellan and above the operative-production loop.

---

## Core Question

```text
Which operative capability is needed, and can an admitted operative already satisfy it?
```

The Conscription searches before it builds.

---

## Primary Rule

```text
Reuse before recruitment.
Recruit before building.
Build before deployment.
Test before admission.
```

The Conscription must search the Garrison before commissioning the Foundry.

---

## Responsibilities

The Conscription may:

- receive operative capability requests from the Castellan
- search the Garrison roster for suitable admitted operatives
- request Guildhall profession research when capability is unclear
- prepare an operative commission for the Foundry
- coordinate the Foundry/Pit/Garrison production loop
- return operative availability or absence to the Castellan

---

## Relationship To Guildhall

Guildhall determines or researches profession patterns.

The Conscription does not determine professional truth.

The Conscription asks Guildhall for role intelligence when it needs to understand what kind of operative is required.

---

## Relationship To Foundry

The Foundry builds operatives.

The Conscription commissions the Foundry only when no suitable Garrisoned operative exists or when the required operative must be revised or newly raised.

---

## Relationship To Garrison

The Garrison is the roster of admitted operatives.

The Conscription searches the Garrison before requesting new construction.

If a suitable operative exists, the Conscription may recommend it to the Castellan or prepare it for Catapult handoff.

---

## Operative Supply Flow

```text
Castellan
→ Conscription
→ Search Garrison
→ If suitable: return operative availability
→ If not suitable: request Guildhall research
→ Commission Foundry
→ Pit test
→ Garrison admission
→ return operative availability
```

---

## Non-Authority

The Conscription must not:

- invent mission intent
- perform mission investigation
- determine professional truth by itself
- build operatives directly
- admit untested operatives
- launch operatives into Theatre
- issue tools or keys
- judge mission returns
- decide final disposition

---

## Boundary Maxim

```text
The Conscription coordinates operative supply.
It does not perform the profession, build the operative, or launch the mission.
```

---

## Failure Signals

Review or revise this draft if:

- every mission need becomes a new operative build
- Garrison search is skipped
- Conscription absorbs Guildhall research
- Conscription becomes a deployment commander
- Conscription confuses operative availability with mission readiness
