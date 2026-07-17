# Cognitive Map

## Status

Approved Draft Map.

Verified against the full Imperium Agentica cognitive diagram on 2026-07-15.

This file records the current official cognitive map for Imperium v02.

Official means active for orientation, drafting, and constitutional testing.

The verified diagram preserves both conditional production searches, the Curial Officer line, outbound mission orchestration, and the three dedicated Cortine ports. Concurrent missions instantiate separate mission-bound Muster and Curia surfaces.

The Curia composition has since been refined: a standing CEO President is the sole decision-maker under an effective Executive Mandate; a standing Chief of Staff owns Curial Orchestration and verifies mandate status and scope; the Chief of Staff directly reads permitted mission-scoped provider audit views; and Collegium is engaged on demand by the Chief of Staff when distinct counsel becomes necessary.

It does not admit runtime architecture, implementation topology, database schema, service layout, UI design, autonomous external authority, or final terminology.

---

## Core Thesis

Imperium v02 produces operatives from governed, tested, reusable personas.

Its primary production distinction is:

```text
profession
→ governance doctrine
→ human-trait canon
→ canonical persona
→ deployment-medium-specific operative
→ deployment
```

Imperium may also prepare deployment, receive returns, evaluate findings, write a final report, and return that report to the operator.

---

## Current Cognitive Spine

```text
Operator
→ Secretariat
→ Castellan
→ Guildhall
→ Garrison search by resolved profession
    ├─ suitable admitted persona found
    │    → Conscription
    │
    └─ no suitable admitted persona
         → Studium
         → Hagiography when human-trait canon is applicable
         → Foundry
         ↔ Guildhall / Studium / Hagiography for revision
         → Pit
         ↔ Foundry / Studium / Hagiography / Guildhall from findings
         → Garrison
         → Conscription

Conscription
→ Operative
→ handoff to Operator
   or
→ Muster
↔ Inquisition
↔ Armory / Locksmith
→ Deployment Package
→ La Cortine / Iron Gate
→ Theatre
↔ La Cortine / Barbican ↔ Armory / Locksmith
→ Lazaretto
→ Curia
→ Mission Closure Record
→ Operative Release Record
→ Chamber of Scribes
→ Final Report
→ Secretariat
→ Operator
```

A branch may stop when its requested product has been delivered.

An operative may be handed back without being deployed by Imperium.

---

## Canonical Artifact Chain

```text
Operator intent
→ Petition
→ Mission Need
→ Work Specification
→ Profession Specification
→ Persona Governance Doctrine
→ Human-Trait Canon when applicable
→ Persona Specification Candidate
→ Pit Findings
→ Admitted Canonical Persona
→ Operative
→ Deployment Package
+ effective Executive Mandate for Curia decisions
→ Deployment
→ Return Material
→ Terminal Field Packet
→ Mission Closure Record
→ Operative Release Record
→ Final Report
```

The chain may iterate or stop.

Artifacts must not be collapsed merely because the work appears simple.

---

## Production Map

### Secretariat

Receives operator intent, shapes administrative intake, and delivers final reports or requested artifacts.

```text
Product: Petition / delivery
Does not: form missions, define professions, forge personas, recruit, deploy, or judge
```

### Castellan

Forms the mission need and issues the approved Work Specification.

```text
Product: Mission Need + Work Specification
Does not: determine profession, forge persona, recruit, brief, or deploy
```

### Guildhall

Maps the Work Specification to a legitimate profession and produces the Profession Specification.

After resolving the profession, Guildhall may search Garrison for a suitable admitted persona. If none exists, it issues persona-construction work toward the production path.

```text
Product: Profession Specification
Does not: author persona governance, canonize traits, forge, recruit, or deploy
```

### Studium

Stewards distinct governance doctrine for professional personas and Curial Officers.

```text
Guildhall input → Persona Governance Doctrine → Foundry
Collegium input → Officer Governance Doctrine → Smith

Does not: redefine profession or advisory role, forge persona or Officer, canonize traits, recruit, or deploy
```

The two doctrine artifacts share a steward but remain cognitively distinct.

### Hagiography

Studies high-performing real-world humans called Saints and canonizes evidenced, transferable traits.

Saints are sources of evidence, not whole-person templates.

```text
Product: Human-Trait Canon
Does not: define profession, author doctrine, forge persona, recruit, or deploy
```

Hagiography may remain dormant when no distinct human-trait canon is applicable, but that determination must be explicit rather than silently assumed.

### Foundry

Cognitively fits profession, governance doctrine, applicable human-trait canon, and preserved operator constraints into a concrete Persona Specification Candidate.

```text
Product: Persona Specification Candidate
Does not: produce an operative, package for a platform, admit, recruit, or deploy
```

Foundry may return conflicts to Guildhall, Studium, or Hagiography.

### Pit

Stress-tests the integrated Persona Specification Candidate for professional competence, governable boundaries, and human coherence.

```text
Product: Pit Findings + recommendation
Does not: forge, repair its own test subject, admit, recruit, or deploy
```

Failures return to the responsible upstream sources with preserved evidence.

### Garrison

Holds admitted canonical personas and their qualification, restriction, test, and revision references.

```text
Product: admitted persona inventory
Does not: hold active mission state, recruit, grant tools or credentials, or deploy
```

### Conscription

Performs recruitment.

It selects an admitted persona from Garrison and converts it into the concrete asset required by a deployment medium.

```text
Input: Admitted Canonical Persona + deployment-medium contract
Product: Operative
Does not: define profession, forge persona, alter doctrine or traits, or deploy
```

If the medium cannot preserve required competence, doctrine, or traits, Conscription refuses the transformation.

### CEO-Led Curia And Citadel Officer Line

Curia initially consists of a standing Executive Officer assigned as CEO President and a standing Staff Officer assigned as Chief of Staff.

Both are produced through Studium + The Gesta → Smith → Spur → Preceptory and placed through versioned Standing Curia Assignments. The CEO's decision authority is granted separately by a versioned Executive Mandate.

The Chief of Staff owns Curial Orchestration, directly reads permitted mission-scoped provider audit views, and verifies the Executive Mandate. The CEO is the sole decision-maker only while the mandate is effective, matching, and in scope.

Curia Officer classes remain distinct:

```text
Standing Role Requirement → Studium + The Gesta → Smith → Spur → Preceptory
    ├── Executive Officer → Standing Curia Assignment → CEO President
    ├── Staff Officer → Standing Curia Assignment → Chief of Staff
    └── Advisory Officer → Curia Session Assignment → Counselor
```

```text
active Curia session
→ counsel need arises
→ Chief of Staff engages Collegium
→ Advisory Role Requirement
→ Preceptory search
    ├── suitable standing Officer found → Curia session assignment
    └── no suitable standing Officer
         → COUNSEL_UNAVAILABLE
         → DECISION_WITHHELD for affected path
         → Capability Gap Record
         → if durable: Collegium → Studium + The Gesta → Smith → Spur → Preceptory
→ assigned Officer advises when available
→ Chief of Staff organizes counsel and record
→ CoS verifies Executive Mandate
→ CEO decides within scope
→ Curia Minute
→ Chief of Staff hands authorized decision to Muster
```

The counselor is standing; the counsel is mission-specific.

Preceptory holds reusable Citadel Officers. Smith creates an Officer only for a justified durable capability gap, not merely for one mission.

Commission is dormant and is not required for the CEO, Chief of Staff, or ordinary advisory session assignments.

Praetorium is reserved for future Imperium Officers at the outer echelon and is not currently admitted.

### Muster

Assembles an existing operative for a particular mission.

```text
Input: Operative + authorized mission requirements
Per mission: unique Operative Binding + Muster Instance + Curia Session correlation
Product: mission-bound Deployment Package
Does not: select or forge persona, recruit, launch, execute, rewrite doctrine, or judge returns
```

Muster obtains mission intelligence from Inquisition, tools from Armory, and authorized access from Locksmith. It binds them with the operative, mission brief, rules, reporting, return, launch, and termination conditions.

Iron Gate is La Cortine's dedicated deployment exit.

---

## State Distinctions

```text
Saint ≠ trait
trait ≠ Human-Trait Canon
Human-Trait Canon ≠ persona
Persona Specification Candidate ≠ admitted persona
admitted persona ≠ operative
operative ≠ Deployment Package
Deployment Package ≠ deployment
deployment ≠ return
completion claim ≠ closure
closure ≠ operative release
operative release ≠ reuse authority
shared governed reference ≠ shared mission state
standing role ≠ unlimited capacity
one mission closure ≠ another mission release
Mission Closure Record ≠ Final Report
```

The current state vocabulary is:

```text
admitted canonical persona
→ recruited operative
→ deployed operative
```

No separate activation state is currently admitted.

---

## Reuse Before Construction

Reuse applies to personas.

```text
Resolve profession.
Search Garrison for a suitable admitted persona.
If found, recruit it through Conscription.
If absent, construct and test a new persona.
```

Existing does not mean suitable.

Admitted does not mean recruitable into every medium.

Operative does not mean deployed.

---

## Procedural Compression

Some persona construction may be cognitively minimal.

Procedural steps may be performed together or without a separately operating Foundry agency only when the following remain explicit and distinguishable:

- Guildhall owns the profession decision
- Studium owns the doctrine decision, including an explicit finding that no distinct doctrine is required
- Hagiography owns the trait-canon decision, including an explicit finding that no distinct canon is required
- a canonical persona specification exists before Conscription
- Conscription only performs deployment-medium transformation

Compression is procedural economy.

It is not authority transfer or artifact erasure.

---

## Deployment Boundary

The operative can be handed to the operator without Imperium deployment.

When deployment is requested:

```text
Operative
→ Muster
↔ Inquisition
↔ Armory
↔ Locksmith
→ Deployment Package
→ Iron Gate
→ Theatre
```

Tools are not authority.

Credentials are not mission understanding.

The existence of an operative does not authorize launch.

---

## La Cortine Boundary

La Cortine is the non-acting cognitive namespace for the wall between Citadel and Theatre.

```text
La Cortine
├── Iron Gate — initial deployment exit
├── Barbican — continuing operational-support port
└── Lazaretto — mission-return entry
```

La Cortine does not route or authorize. Each port has dedicated traffic.

```text
Muster → Iron Gate → Theatre
Theatre ↔ Barbican ↔ Armory / Locksmith
Theatre → Lazaretto → Curia
```

Credentials remain with Locksmith. Barbican carries tickets and permitted results, never secrets.

---

## Live Mission Control Loop

```text
Theatre
→ Lazaretto
→ Curia
→ CEO President decision recorded in Curia Minute
→ Muster
→ outbound mission instruction
→ Iron Gate
→ Theatre
```

Each mission has a distinct Curia Session identity. Curia begins with the standing CEO President and the standing Chief of Staff. The Chief of Staff reads applicable provider audit views and orchestrates the session and engages Collegium when counsel is needed. Officers advise; the CEO alone decides. The Chief of Staff records and hands the authorized decision to Muster.

Muster owns outbound mission orchestration. It operationalizes the authorized Curia decision without changing its substance or authority.

Iron Gate carries the outward crossing. Curia does not address Iron Gate or Theatre directly.

When required counsel is unavailable, the affected decision path enters `DECISION_WITHHELD`. The CEO may hold, constrain, defer, or use an already admitted escalation route without deciding the missing substance. Unrelated work requires an explicit separability finding.

Internal Curia observability does not use Barbican:

```text
Chief of Staff → mission-scoped read-only audit view → Armory / Locksmith ledgers
```

Barbican provider traffic remains separate and bypasses Muster:

```text
Theatre ↔ Barbican ↔ Armory / Locksmith
```


## Return, Closure, And Release Boundary

```text
Theatre
→ Lazaretto
→ Curia closure assessment
→ CEO BEGIN_WIND_DOWN
→ Muster → Iron Gate → Theatre
→ Terminal Field Packet → Lazaretto
→ CEO MISSION_CLOSED + disposition
→ Mission Closure Record
→ Muster Operative Release Record
→ Chamber of Scribes
→ Final Report
→ Secretariat
→ Operator
```

Closure and release require an exact Mission, Deployment, Operative Binding, Curia Session, and Muster Instance match. One mission cannot close or release another.

An operative completion claim is not closure. Lazaretto does not decide completion. The CEO closes. Muster releases the mission binding. Scribes report.

```text
No closure without disposition.
No release without closure.
```

---

## Traceability Requirement

Every derived artifact must preserve references to the exact upstream versions from which it was produced.

Minimum chain:

```text
Deployment
→ Operative version
→ Canonical Persona version
→ Pit Findings version
→ Profession Specification version
→ Persona Governance Doctrine version
→ Human-Trait Canon version when applicable
→ Saint evidence records
```

Revisions create new versions or supersession records.

They do not overwrite historical evidence.

Existing operatives remain bound to the persona, doctrine, and canon versions from which they were recruited. Applying a revised canonical persona requires a new Conscription event and a new operative version.

---

## Orchestration Boundaries

```text
Castellan = mission formation
Chief of Staff = Curial Orchestration
Muster = outbound mission orchestration
Conscription = recruitment process, not orchestration
```

The current map does not admit a separate operative-orchestration or launch sovereign.

Guildhall resolves profession and persona availability. Production entities create missing persona artifacts. Conscription transforms the selected admitted persona.

---

## Non-Admissions

This map does not admit:

- runtime architecture
- external autonomous authority
- service topology
- database schema
- UI implementation
- permanent pass engine
- product-specific workflow library
- separate activation state
- Conscription as operative orchestration
- Citadel as persona-governance steward
- Foundry as operative builder
- Garrison as operative inventory
- before/after knowledge machinery
- Vellum as a v02 artifact

---

## Constitutional Summary

```text
Castellan specifies the work.
Guildhall specifies the profession.
Studium authors Persona Governance Doctrine and Officer Governance Doctrine.
Hagiography canonizes applicable human traits from Saints.
Foundry forges the canonical persona.
Pit tests the whole persona.
Garrison holds admitted personas.
Conscription recruits a persona into an operative.
Muster assembles the operative into a mission-bound Deployment Package and later releases that binding after authorized closure.
Iron Gate performs the launch crossing.
Lazaretto receives.
The Chief of Staff orchestrates Curia.
The Executive Mandate authorizes. The CEO decides and closes within scope.
Muster releases the mission binding.
Chamber of Scribes reports.
Secretariat delivers.
```
