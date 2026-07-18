# Cognitive Lifecycle

## Canonical Dependencies

This cognitive artifact cites the following admitted contracts as external canonical definitions; it does not originate or redefine them:

- `layers/authority/production/executive-mandate.md`
- `layers/provenance/production/mission-correlation-and-isolation-contract.md`

## Status

Admitted.

Baseline: `CB-002`.

Admission: `Cognitive Production Admission Review 004`.

Evidence: `Constitutional Test Run 016 — 31 PASS / 0 FAIL`.

This file describes the provisional end-to-end Imperium v02 lifecycle.

It does not admit automation, runtime implementation, UI, database, service topology, a named launching entity or runtime implementation.

---

## Core Loop

```text
Operator
→ Secretariat
→ Castellan
→ Guildhall
→ Garrison search by resolved profession
    ├─ admitted persona found
    │    → Conscription
    └─ no suitable persona
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
→ Mission Correlation Spine + Operative Binding
→ Muster instance
↔ Inquisition
↔ Armory / Locksmith
→ Deployment Package
→ La Cortine / Iron Gate
→ Theatre
→ La Cortine / Lazaretto
→ mission-specific Curia Session
→ Mission Closure Record
→ Operative Release Record
→ Chamber of Scribes
→ Final Report
→ Secretariat
→ Operator
```

---

## Mission Formation

```text
Secretariat
→ Petition
→ Castellan
→ Mission Need
→ Work Specification
```

Castellan forms mission meaning and specifies required work.

Mission formation is not profession resolution, persona forging, recruitment, mission assembly, or execution.

---

## Persona Production

```text
Work Specification
→ Guildhall
→ Profession Specification
→ Garrison search
    ├─ persona found
    └─ persona absent
         → Studium doctrine
         → Hagiography canon when applicable
         → Foundry persona candidate
         → Pit findings
         → Garrison admission
```

Guildhall specifies profession.

Studium authors Persona Governance Doctrine.

Hagiography canonizes evidenced, transferable traits.

Foundry forges the Persona Specification Candidate.

Pit tests the integrated persona.

Garrison holds admitted canonical personas.

---

## Recruitment

```text
Admitted Canonical Persona
+ deployment-medium contract
→ Conscription
→ Operative
```

Conscription is recruitment.

The operative is medium-specific but not mission-bound or deployed.

It may be delivered directly to the operator.

---

## Mission Assembly

```text
Operative
+ Mission Identity and Operative Binding
+ Work Specification
+ Mission Inquest
+ tools
+ access
+ rules and constraints
+ reporting and return conditions
→ mission-specific Muster instance
→ Deployment Package
```

Inquisition investigates mission terrain.

Armory supplies authorized tools.

Locksmith supplies authorized access.

Muster assembles these around the operative for one mission.

A Deployment Package marked Ready For Launch is not itself launched.

---

## Execution Boundary

```text
Deployment Package
→ La Cortine / Iron Gate
→ Theatre
```

Iron Gate is La Cortine's dedicated launch port.

Muster does not launch or execute.

Theatre is mission execution terrain.

During continuing execution:

```text
Theatre ↔ La Cortine / Barbican ↔ Armory / Locksmith
```

Barbican carries provider tickets and results. Locksmith retains credentials.

---

## Live Mission Control Loop

```text
Theatre
→ Lazaretto
→ mission-specific Curia Session
→ CoS Session Admission Finding
→ effective Executive Mandate verification
→ authorized CEO decision
→ Muster
→ outbound mission instruction
→ Iron Gate
→ Theatre
```

The Chief of Staff orchestrates the mission-specific Curia session. When counsel is required, Collegium resolves suitability, Preceptory supplies the admitted Officer, and the Chief of Staff records a Curia Session Assignment. The CEO alone decides under an effective, matching Executive Mandate.

Muster owns outbound mission orchestration. It operationalizes the authorized Curia decision without changing its substance or authority.

Iron Gate carries the outward crossing. Curia does not address Iron Gate or Theatre directly.

Barbican provider traffic remains separate and bypasses Muster:

```text
Theatre ↔ Barbican ↔ Armory / Locksmith
```


## Return, Closure, And Release

```text
Theatre
→ Lazaretto
→ Curia closure assessment
→ effective Executive Mandate verification
→ CEO BEGIN_WIND_DOWN
→ Muster
→ Iron Gate
→ Theatre terminal return
→ Lazaretto
→ Curia terminal decision
→ MISSION_CLOSED + disposition
→ Mission Closure Record
→ exact-match Muster Operative Release Record
→ Chamber of Scribes
→ Final Report
→ Secretariat
→ Operator
```

An operative completion claim is evidence, not closure.

The CEO closes. Muster releases the mission binding. Scribes report from the closure record. Secretariat delivers.

```text
No correction without contrast.
No closure without disposition.
No release without closure.
```

---

## Anti-Collapse Rules

- Operator intent is not mission understanding.
- Mission formation is not mission assembly.
- Professional competence is not mission instruction.
- Canonical persona is not operative.
- Operative is not Deployment Package.
- Ready For Launch is not launched.
- Muster is not launch or execution.
- Theatre output is not judgment.
- Findings do not authorize correction.
- Completion claim is not closure.
- Closure is not operative release.
- Release is not reuse authority.
- Shared governed reference is not shared mission state.
- Curia Session Assignment is not Executive Mandate.
- One mission closure is not another mission release.
- Final Report is not automatically Vellum.
