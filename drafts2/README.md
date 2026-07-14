# Drafts2 Artifact Map

## Status

Draft.

This directory captures the current Imperium v02 artifact map discussed by the operator.

These files are exploratory.

They do not admit runtime architecture, automation, implementation hierarchy, database schema, service layout, UI contract, or final terminology.

Names from Imperium v01 may appear here only as quarantined candidates or deliberately narrowed reuses.

---

## Core Mission

Imperium produces operatives.

Imperium does not primarily execute missions in the world.

Imperium receives operator intent, forms mission need, supplies or raises operatives, prepares deployment, receives returns, judges findings, and reports back to the operator.

Another orchestration or execution layer may later pick up admitted operatives for actual agentic work.

---

## Current Spine

```text
Operator
→ Secretariat
→ Castellan
→ Conscription
↔ Guildhall
→ Garrison search
→ Foundry if no suitable operative exists
↔ Citadel
→ Pit
→ Garrison
→ Catapult
↔ Inquisition
↔ Armory / Locksmith
→ Theatre
→ Lazaretto
→ Judicature
→ Findings
→ Chamber of Scribes
→ Final Report
→ Secretariat
→ Operator
```

---

## Layer Split

### Intake and Mission Formation

- `secretariat.md`
- `castellan.md`

### Operative Orchestration and Production

- `conscription.md`
- `guildhall.md`
- `foundry.md`
- `citadel.md`
- `pit.md`
- `garrison.md`

### Deployment Preparation and Launch

- `catapult.md`
- `inquisition.md`
- `armory-locksmith.md`
- `theatre.md`

### Return, Judgment, and Reporting

- `lazaretto.md`
- `judicature.md`
- `chamber-of-scribes.md`
- `secretariat.md`

---

## Primary Distinctions

```text
Secretariat receives and reports.
Castellan orchestrates missions.
Conscription orchestrates operatives.
Guildhall researches profession patterns.
Foundry builds operatives.
Citadel governs operative compliance.
Pit tests operatives.
Garrison holds admitted operatives.
Catapult prepares and launches deployments.
Inquisition investigates mission terrain.
Armory issues tools.
Locksmith issues keys.
Theatre is execution terrain.
Lazaretto receives returns.
Judicature evaluates returns.
Chamber of Scribes writes final reports.
Secretariat delivers final reports.
```

---

## Non-Admissions

This directory does not admit:

- autonomous runtime
- permanent pass engine
- product-specific workflow library
- executable deployment layer
- database schema
- service topology
- UI screens
- authority to act externally
- disposition authority
- before/after knowledge machinery
- Vellum as a v02 artifact

---

## Design Warnings

- Do not let old v01 names smuggle old v01 machinery.
- Do not let offices become sovereign because their names are strong.
- Do not create reusable workflows before repeated jobs prove need.
- Do not assume professional competence replaces mission instruction.
- Do not assume operator intent is already mission understanding.
- Do not assign disposition before before/after knowledge exists.

---

## Current Parked Issues

- Who or what eventually owns disposition?
- What before/after knowledge surface is required before disposition?
- Whether `Vellum` should return as internal canonical mission record.
- Whether `Final Report` is sufficient for operator-facing closure.
- Which names survive use and which are only naming pressure.
