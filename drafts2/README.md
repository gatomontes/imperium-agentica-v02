# Drafts2 Artifact Map

## Status

Draft.

This directory captures the current Imperium v02 cognitive and artifact model.

These files are exploratory doctrine. They do not admit runtime architecture, automation, implementation hierarchy, database schema, service layout, UI contract, external authority, or final terminology.

Names from Imperium v01 may appear only as quarantined candidates or deliberately narrowed reuses.

---

## Current Official Draft Map

```text
drafts2/cognitive-map.md
```

Official means active for orientation, drafting, and constitutional testing.

Current map status: `Approved Draft Map`, verified 2026-07-15.

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
- `curia.md`
- `provider-intervention-ledgers.md`

The Gesta supplies evidenced Officer-Trait Canon to Collegium and Smith.

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
- `constitutional-tests.md`

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
Muster assembles mission-bound Deployment Packages.
Iron Gate launches initial deployments.
Barbican exposes continuing Armory and Locksmith support.
Lazaretto receives mission returns.
La Cortine merely contains these ports.
Inquisition investigates mission terrain.
Armory issues tools.
Locksmith issues keys and access.
Theatre exposes consequence.
Lazaretto sanitizes field packets and returns.
Curia convenes Officers around sanitized field data and produces findings.
Chamber of Scribes writes final reports.
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
finding ≠ report
```

Current operative states:

```text
admitted canonical persona
→ recruited operative
→ deployed operative
```

No separate activation state is admitted. Iron Gate is the dedicated launch port.

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
→ authorized Officer decision
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
drafts2/constitutional-tests.md
```

Results:

```text
tests/
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
- disposition authority
- before/after knowledge machinery
- Vellum as a v02 artifact

---

## Design Warnings

- Do not let old v01 names smuggle old machinery.
- Do not let strong names create sovereign offices.
- Do not confuse professional competence with mission instruction.
- Do not confuse procedural compression with authority collapse.
- Do not mutate canonical personas during recruitment.
- Do not mistake operative existence for deployment authority.
- Do not assign disposition before before/after knowledge exists.
- Do not overwrite provenance when doctrine, canon, persona, or operative versions change.

---

## Current Parked Issues

- Who or what eventually owns disposition?
- What before/after knowledge surface is required before disposition?
- Whether `Vellum` should return as an internal canonical mission record.
- Whether `Final Report` is sufficient for operator-facing closure.
- Which names survive use and which are only naming pressure.
- Whether the provisional artifact fields remain sufficient after repeated dry runs.
