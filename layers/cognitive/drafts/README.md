# Cognitive Draft Artifact Map

## Status

Draft.

This directory captures the current Imperium v02 cognitive and artifact model.

These files are exploratory doctrine. They do not admit runtime architecture, automation, implementation hierarchy, database schema, service layout, UI contract, external authority, or final terminology.

Names from Imperium v01 may appear only as quarantined candidates or deliberately narrowed reuses.

---

## Current Official Draft Map

```text
layers/cognitive/drafts/cognitive-map.md
```

Official means active for orientation, drafting, and constitutional testing.

Current map status: `Approved Draft Map`, last structurally verified 2026-07-17.

---

## Core Mission

Imperium produces deployment-medium-specific operatives from governed, tested, reusable canonical personas.

```text
operator intent
→ work specification
→ profession specification
→ persona governance doctrine
→ applicable human-trait canon
→ persona candidate
→ tested and admitted canonical persona
→ recruited operative
→ optional deployment
```

An operative may be handed back to the operator without Imperium deploying it.

---

## Current Spine

```text
Operator
→ Secretariat
→ Castellan
→ Guildhall
→ Garrison search
    ├─ persona found → Conscription
    └─ persona absent
         → Studium
         → Hagiography when applicable
         → Foundry
         → Pit
         → Garrison
         → Conscription

Conscription
→ Operative
→ Operator handoff
   or
→ Muster
↔ Inquisition
↔ Armory / Locksmith
→ Deployment Package
→ La Cortine / Iron Gate
→ Theatre
→ La Cortine / Lazaretto
→ Curia
→ Mission Closure Record
→ Muster / Operative Release Record
→ Chamber of Scribes
→ Secretariat
→ Operator
```

---

## Layer Split

### Intake and Mission Formation

- `secretariat.md`
- `castellan.md`

### Profession and Persona Production

- `guildhall.md`
- `studium.md`
- `hagiography.md`
- `foundry.md`
- `pit.md`
- `garrison.md`

### Recruitment

- `conscription.md`

### Citadel Officers and Curia

- `gesta.md`
- `collegium.md`
- `preceptory.md`
- `smith.md`
- `spur.md`
- `commission.md`
- `ceo-president.md`
- `chief-of-staff.md`
- `standing-curia-role-requirements.md`
- `executive-mandate.md`
- `counsel-availability-contract.md`
- `mission-closure-and-release-contract.md`
- `curia.md`
- `provider-intervention-ledgers.md`

Studium supplies Officer Governance Doctrine to Smith. The Gesta supplies evidenced Officer-Trait Canon to Smith only.

`Praetorium` is reserved for future Imperium Officers and is not currently defined.

### Mission Assembly and Cortine Boundary

- `muster.md`
- `la-cortine.md`
- `iron-gate.md`
- `barbican.md`
- `inquisition.md`
- `armory-locksmith.md`
- `theatre.md`

### Return, Judgment, and Reporting

- `lazaretto.md`
- `curia.md`
- `chamber-of-scribes.md`
- `secretariat.md`

### Cross-Cutting Artifacts

- `cognitive-map.md`
- `lifecycle.md`
- `production-artifacts.md`

---

## Primary Distinctions

```text
Secretariat receives and delivers.
Castellan forms missions and specifies work.
Guildhall determines and specifies professions.
Studium authors Persona Governance Doctrine.
Hagiography derives Human-Trait Canon from evidenced Saints.
Foundry cognitively fits those inputs into canonical personas.
Pit tests integrated persona candidates.
Garrison holds admitted canonical personas.
Conscription recruits personas into deployment-medium-specific operatives.
Muster assembles Deployment Packages and orchestrates authorized outbound mission traffic.
Iron Gate carries outward mission traffic into Theatre.
Barbican exposes continuing Armory and Locksmith support.
Lazaretto receives and sanitizes mission returns.
La Cortine merely contains these ports.
Inquisition investigates mission terrain.
Armory provides authorized tools and records mission-scoped interventions.
Locksmith retains credentials, performs authorized access operations, and records their staged outcomes.
Theatre exposes consequence.
Curia receives sanitized field data; the Chief of Staff orchestrates and verifies authority, and the CEO alone decides under an effective Executive Mandate.
The CEO closes missions with a terminal disposition.
Muster releases the operative's mission binding after authorized closure.
Chamber of Scribes writes final reports from the closure record.
Secretariat delivers final reports.
```

---

## Artifact and State Distinctions

```text
Saint ≠ trait
trait canon ≠ persona
persona ≠ operative
operative ≠ deployment
return ≠ finding
finding ≠ decision
completion claim ≠ closure
closure ≠ operative release
operative release ≠ reuse authority
closure record ≠ final report
Officer qualification ≠ Standing Curia Assignment
Standing Curia Assignment ≠ Executive Mandate
```

Current operative states:

```text
admitted canonical persona
→ recruited operative
→ mission-bound operative
→ deployed operative
→ released operative
```

No separate activation state is admitted. Iron Gate is the dedicated outward mission port. Release ends one mission binding; it does not delete the operative or authorize reuse.

---

## Reuse Rule

```text
Resolve profession.
Search Garrison for a suitable admitted persona.
Recruit when found.
Construct, test, and admit when absent.
```

Reuse applies to canonical personas, not already deployed operatives.

---

## Minimal Cognitive Fitting

Persona construction may be procedurally compressed when the work is trivial, but the following decisions and artifacts must remain distinguishable:

- Guildhall profession decision
- Studium doctrine decision
- Hagiography trait-canon decision
- canonical persona specification
- Conscription's separate deployment-medium transformation

Compression does not transfer authority or erase artifacts.

---

## Provenance Rule

Derived artifacts preserve exact upstream version references.

```text
Curia decision
→ Executive Mandate version
→ CEO Standing Curia Assignment version
→ CEO Officer Specification version

Deployment
→ Operative
→ Canonical Persona
→ Pit Findings
→ Profession Specification
→ Persona Governance Doctrine
→ Human-Trait Canon when applicable
→ Saint evidence
```

Revisions create new versions or supersession records.

Existing operatives remain bound to the versions from which they were recruited. Applying a revised persona requires a new Conscription event.

---

## Live Mission Control Loop

```text
Theatre
→ Lazaretto
→ Curia
→ authorized CEO decision
→ Muster
→ outbound mission instruction
→ Iron Gate
→ Theatre
```

Curia convenes Officers to understand, verify, deliberate, and authorize.

Muster owns outbound mission orchestration. It operationalizes the authorized Curia decision without changing its substance or authority.

Iron Gate carries the outward crossing. Curia does not address Iron Gate or Theatre directly.

Barbican provider traffic remains separate and bypasses Muster:

```text
Theatre ↔ Barbican ↔ Armory / Locksmith
```


## Constitutional Tests

Suite:

```text
tests/cognitive/constitutional-tests.md
```

Results:

```text
tests/cognitive/
```

The retired Test Mission 001 chain has been deleted.

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
- separate activation state
- Conscription as operative orchestration
- Citadel as persona-governance steward
- Foundry as operative builder
- Garrison as operative inventory
- Vellum as a v02 artifact

---

## Design Warnings

- Do not let old v01 names smuggle old machinery.
- Do not let strong names create sovereign offices.
- Do not confuse professional competence with mission instruction.
- Do not confuse procedural compression with authority collapse.
- Do not mutate canonical personas during recruitment.
- Do not mistake operative existence for deployment authority.
- Do not treat an operative completion claim as mission closure.
- Do not release a mission binding before authorized closure.
- Do not overwrite provenance when doctrine, canon, persona, or operative versions change.

---

## Current Parked Issues

- Concurrent Curia-session isolation and standing-role capacity.
- Whether `Vellum` should return as an internal canonical mission record.
- Which names survive use and which are only naming pressure.
- Whether the provisional artifact fields remain sufficient after repeated dry runs.
