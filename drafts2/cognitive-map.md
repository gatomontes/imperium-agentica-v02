# Cognitive Map

## Status

Draft.

This file records the current official cognitive map for Imperium v02.

Official means active for orientation and future drafting.

Official does not mean admitted architecture, runtime design, implementation contract, service topology, database schema, UI plan, or final terminology.

This map may be revised, leaned, split, renamed, demoted, or removed when use exposes better boundaries.

---

## Core Thesis

Imperium v02 is currently understood as an operative-producing system.

It receives operator intent, forms a mission need, supplies or raises operatives, prepares deployment, receives returns, evaluates findings, writes a final report, and returns that report to the operator.

Imperium does not currently claim to be the external orchestration layer that executes all agentic work in the world.

Imperium raises, governs, tests, admits, deploys, receives, evaluates, and reports on operative work.

---

## Current Cognitive Spine

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

## Map Shape

```text
Secretariat
  point of entry and operator-facing administrative surface
        ↓
Castellan
  mission orchestration
        ↓
Conscription
  operative orchestration / recruitment
        ↔
Guildhall
  research of professions
        ↓
Garrison search
  reuse existing admitted operative when possible
        ↓ if no suitable operative exists
Foundry
  operative building
        ↔
Citadel
  operative governance doctrine
        ↓
Pit
  operative stress test
        ↓ admission
Garrison
  admitted operative roster and holding surface
        ↓ deployment activation
Catapult
  deployment and mission launch orchestration
        ↔
Inquisition
  mission intelligence
        ↔
Armory / Locksmith
  tools and keys/access
        ↓
Theatre
  outside-world mission terrain
        ↓
Lazaretto
  receiving dock for returns
        ↓
Judicature
  evaluation of returns and findings
        ↓
Chamber of Scribes
  final report composition
        ↓
Secretariat
  delivery and operator-facing administrative closure
```

---

## Orchestration Hierarchy

```text
Castellan = mission orchestration
Conscription = operative orchestration
Catapult = deployment orchestration
```

### Castellan

The Castellan sits above Conscription and Catapult.

It coordinates the mission as a mission.

It does not research professions, build operatives, issue tools, issue keys, launch deployments, receive returns, judge findings, or write final reports.

### Conscription

The Conscription sits under mission orchestration and owns operative supply.

It searches the Garrison before commissioning new work.

It consults the Guildhall when profession research is needed.

It commissions the Foundry only when an existing admitted operative cannot satisfy the need.

### Catapult

The Catapult sits under mission orchestration and owns deployment preparation and launch.

It receives the operative from the Garrison or Conscription path, obtains mission intelligence from the Inquisition, receives tools from the Armory, receives keys or access from the Locksmith, prepares the deployment package, and launches toward the Theatre.

The Catapult owns mission briefing closer to launch.

Mission formation is not mission briefing.

---

## Layer Split

### Intake

```text
Secretariat
```

The Secretariat receives operator intent, shapes administrative intake, asks delivery and packaging questions when needed, and returns final reports to the operator.

The Secretariat reports and delivers. It does not judge, build, deploy, or alter findings.

### Mission Formation

```text
Castellan
```

The Castellan coordinates mission formation and mission-level routing.

It may identify that operative capability is required and activate Conscription.

It may route toward Catapult when deployment preparation is needed.

### Operative Supply and Production

```text
Conscription
Guildhall
Garrison
Foundry
Citadel
Pit
```

This layer searches, researches, raises, builds, governs, tests, and admits operatives.

Foundry makes.

Pit tests.

Garrison holds what survives.

Guildhall researches profession patterns.

Citadel provides operative governance doctrine.

### Deployment Preparation and Launch

```text
Catapult
Inquisition
Armory
Locksmith
Theatre
```

The Catapult prepares and launches.

The Inquisition investigates mission terrain.

The Armory issues tools.

The Locksmith issues keys and access.

The Theatre is outside-world terrain.

### Return, Judgment, and Reporting

```text
Lazaretto
Judicature
Chamber of Scribes
Secretariat
```

The Lazaretto receives returns.

The Judicature evaluates returns and produces findings.

The Chamber of Scribes writes the final operator-facing report from findings.

The Secretariat delivers the report to the operator in the required format or package.

---

## Primary Doctrinal Lines

```text
The Secretariat receives and returns.
The Castellan forms and coordinates missions.
The Conscription supplies operatives.
The Guildhall researches professions.
The Foundry builds operatives.
The Citadel governs operative doctrine.
The Pit stress-tests operatives.
The Garrison holds admitted operatives.
The Catapult prepares and launches deployments.
The Inquisition investigates mission terrain.
The Armory issues tools.
The Locksmith issues keys and access.
The Theatre is the outside-world terrain.
The Lazaretto receives returns.
The Judicature evaluates findings.
The Chamber of Scribes writes the final report.
The Secretariat delivers it to the operator.
```

---

## Product and Reporting Flow

```text
Operator intent
→ Petition / intake record
→ Mission need
→ Operative need
→ Existing operative or new operative commission
→ Operative candidate
→ Tested operative
→ Admitted operative
→ Deployment package
→ Theatre action
→ Return material
→ Findings
→ Final Report
→ Operator delivery
```

---

## Mission Dossier Boundary

The mission dossier belongs near launch, not high in mission formation.

The Inquisition produces mission intelligence.

The Catapult assembles the mission dossier and deployment package.

The Castellan forms the mission need but does not need to issue detailed mission procedures.

```text
Mission formation is not mission briefing.
```

---

## Reuse Before Build

The Conscription must search the Garrison before commissioning the Foundry.

```text
Reuse before recruitment.
Recruit before building.
Build before deployment.
Test before admission.
```

A new operative should not be built merely because a new mission exists.

---

## Return Boundary

For now, the return path stops at findings and operator reporting.

```text
Theatre
→ Lazaretto
→ Judicature
→ Findings
→ Chamber of Scribes
→ Final Report
→ Secretariat
→ Operator
```

Disposition is not assigned.

Disposition requires before/after knowledge that has not yet been defined.

Judicature may produce findings, but it must not prescribe correction as if the comparative machinery already exists.

```text
No correction without contrast.
```

---

## Delivery Formats

The Secretariat may ask administrative delivery questions for the final report or reporting package.

Examples:

```text
email body
PDF
CSV
JSON
Markdown
ZIP bundle
archive only
```

A ZIP bundle may contain multiple final artifacts, such as:

```text
final-report.pdf
findings.csv
evidence-index.json
attachments/
readme.md
```

The Secretariat packages and delivers.

It must not change the substance of findings.

---

## Non-Admissions

This map does not admit:

- runtime architecture
- external autonomous execution authority
- service topology
- database schema
- UI implementation
- permanent pass engine
- product-specific workflow library
- disposition authority
- before/after knowledge machinery
- Vellum as a v02 artifact
- old v01 constitutional machinery by implication

---

## Risks

- Names may smuggle v01 machinery back into v02.
- Castellan may become too sovereign if mission orchestration is not bounded.
- Conscription may build too often if Garrison search is weak.
- Catapult may become execution layer instead of deployment preparation layer.
- Inquisition may overreach from investigation into command or judgment.
- Judicature may imply disposition before before/after comparison exists.
- Secretariat may drift from administrative communication into authorship or judgment.

---

## Batch Summary

Files changed:

- `drafts2/cognitive-map.md`

Assumptions introduced:

- The current diagram is the official draft cognitive map.
- Castellan, Conscription, and Catapult form distinct orchestration levels.
- Catapult owns mission briefing and deployment packaging.
- Disposition remains parked.

Behavior proven:

- Not yet proven.

Recommended next smallest step:

- Test one operator request through the map and identify which offices must act, which can remain dormant, and where the first ambiguity appears.
