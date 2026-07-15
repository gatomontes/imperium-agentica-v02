# Cognitive Map

## Status

Draft.

This file records the current official cognitive map for Imperium v02.

Official means active for orientation, drafting, and constitutional testing.

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
→ unnamed launch boundary
→ Theatre
→ Lazaretto
→ Judicature
→ Findings
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
→ Deployment
→ Return Material
→ Findings
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

Translates the governable dimensions of professional practice into Persona Governance Doctrine.

```text
Product: Persona Governance Doctrine
Does not: redefine profession, forge persona, recruit, or deploy
```

Studium supersedes the narrowed v02 Citadel in this production path.

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

### Muster

Assembles an existing operative for a particular mission.

```text
Input: Operative + authorized mission requirements
Product: mission-bound Deployment Package
Does not: select or forge persona, recruit, launch, execute, rewrite doctrine, or judge returns
```

Muster obtains mission intelligence from Inquisition, tools from Armory, and authorized access from Locksmith. It binds them with the operative, mission brief, rules, reporting, return, launch, and termination conditions.

The current doctrine does not name a separate launching entity.

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
return ≠ finding
finding ≠ Final Report
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
→ unnamed launch boundary
→ Theatre
```

Tools are not authority.

Credentials are not mission understanding.

The existence of an operative does not authorize launch.

---

## Return Boundary

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

Disposition remains unassigned.

Disposition requires before/after knowledge that has not yet been defined.

```text
No correction without contrast.
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
Castellan = mission orchestration
Muster = mission assembly
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
- a named launching entity
- Conscription as operative orchestration
- Citadel as persona-governance steward
- Foundry as operative builder
- Garrison as operative inventory
- disposition authority
- before/after knowledge machinery
- Vellum as a v02 artifact

---

## Constitutional Summary

```text
Castellan specifies the work.
Guildhall specifies the profession.
Studium authors its Persona Governance Doctrine.
Hagiography canonizes applicable human traits from Saints.
Foundry forges the canonical persona.
Pit tests the whole persona.
Garrison holds admitted personas.
Conscription recruits a persona into an operative.
Muster assembles the operative into a mission-bound Deployment Package.
The launch boundary remains unnamed.
Lazaretto receives.
Judicature finds.
Chamber of Scribes reports.
Secretariat delivers.
```
