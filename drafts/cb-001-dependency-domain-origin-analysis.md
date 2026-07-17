# CB-001 Dependency-Domain Origin Analysis

## Status

Draft working analysis.

This document does not demote, revise, or repartition Cognitive Baseline CB-001.

It records a structural question exposed while defining the procedural-layer boundary.

No new layer is admitted by this document.

---

## Question

A procedure may state what is supposed to happen.

It may reference an actor, authority condition, artifact, provenance requirement, or proof standard, but it must not create or refine any of them.

Therefore:

```text
If a procedure requires a definition,
that definition must have an origin outside the procedure.
```

The present question is whether CB-001 already provides legitimate origins for those dependencies, or whether it currently contains provisional domains that may later justify distinct layers.

---

## Corrected Procedural Boundary

```text
procedure:
what is supposed to happen,
in what order,
under which conditions
```

A procedure does not originate:

- responsibility
- authority
- ownership
- artifact meaning
- provenance requirements
- proof or verification standards
- implementation machinery

It may only cite admitted definitions of those concerns.

An absent definition is an exposed dependency gap. It is not permission for the procedure to invent one.

---

## Preliminary Origin Findings

| Concern | Present CB-001 origin | Preliminary finding |
|---|---|---|
| Responsibility | Individual entity files through responsibilities, products, and non-authority boundaries | The clearest existing origin. Responsibility appears genuinely cognitive. |
| Ownership | Entity files identify who authors, stewards, holds, assembles, records, or delivers each product | Often reducible to responsibility; a separate ownership layer is not yet justified. |
| Authority | Executive Mandate, Curia, CEO President, Armory/Locksmith grants, session-assignment limits, and closure contracts | Authority is locally bounded but lacks one general origin model. |
| Artifacts | `production-artifacts.md` plus entity-specific and cross-cutting contracts | Artifact semantics exist, but their definitions are distributed and sometimes provisional. |
| Provenance | Production-artifact traceability, Mission Correlation Spine, provider ledgers, concurrency/isolation, and exact-match closure rules | Strong invariant, unclear sovereign origin. |
| Proof | Pit Findings, mission evidence, Lazaretto non-verification, Curia assessment, mandate verification, and admission tests | No general proof standard is admitted; sufficiency appears contextual and distributed. |

These are preliminary origin findings, not final layer assignments.

---

## Definition-Tracing Method

The 36 CB-001 files will not be classified into primary and secondary domains.

Each file will instead be examined through four relations:

```text
Native concern:
what the file actually defines

Referenced dependency:
an external definition the file consumes

Restatement:
a definition repeated for orientation but originating elsewhere

Unresolved dependency:
a required definition whose legitimate origin cannot yet be found
```

A referenced dependency does not become secondary ownership.

A restatement does not become a competing origin.

An unresolved dependency does not authorize the reviewing file to fill the gap.

---

## Responsibility

Responsibility has the strongest local origin.

Each entity file defines:

- its core question
- its responsibilities
- its product
- its non-authority
- its relationship to adjacent entities

The cognitive maps and lifecycle summarize those definitions but should not silently become competing origins.

Current hypothesis:

> Entity responsibility belongs in the cognitive layer because it defines what the entity is.

This does not mean every workflow involving that entity belongs there.

---

## Ownership

CB-001 usually expresses ownership through responsibility verbs:

- Castellan forms and specifies
- Guildhall resolves and specifies
- Studium authors and stewards
- Foundry forges
- Garrison holds
- Muster assembles and later releases
- Armory and Locksmith own their provider records
- Chamber of Scribes reports
- Secretariat delivers

No separate abstract ownership system is currently demonstrated.

Current hypothesis:

> Product ownership may remain a consequence of admitted responsibility unless a later conflict requires independent ownership transfer, custody, or delegation rules.

---

## Authority

Authority is not absent, but it is fragmented by context.

Known local authority contracts include:

- Executive Mandate for CEO decision authority
- Tool Grant and Access Grant for mission-scoped capability
- Curia Session Assignment explicitly excluding executive authority
- Standing Curia Assignments separated from Executive Mandate
- Mission Closure Record and release authorization
- refusal and withheld-decision states when authority is absent or contested

However, `Mandating Principal` and `authority basis` are referenced without a general admitted authority-origin model.

CB-001 also explicitly excludes external-action authority.

Current hypothesis:

> CB-001 contains bounded authority contracts, but not yet an admitted governance or authority layer.

A separate layer is not justified merely because the concern exists. It must first prove an independent lifecycle, versioning need, or conflict that cognitive entity definitions cannot safely contain.

---

## Artifacts

`production-artifacts.md` names the artifact chain and supplies provisional meanings.

Several artifacts also have dedicated contracts, including:

- Executive Mandate
- Curia Session Assignment
- counsel availability
- mission concurrency and isolation
- mission closure and operative release
- provider intervention ledgers

Other artifacts exist only as sections inside entity or cross-cutting documents.

Current tension:

```text
artifact as meaning-bearing cognitive distinction
≠ artifact as information contract
≠ artifact as runtime data object
```

CB-001 properly excludes schemas and implementation objects, but it does not yet establish whether information contracts deserve an independent layer.

---

## Provenance

Provenance appears throughout CB-001 as a non-negotiable invariant:

- exact upstream version references
- immutable mission correlation
- provider, mission, deployment, ticket, and timestamp preservation
- supersession instead of overwrite
- exact-match closure and release
- cross-mission collision rejection

The rule is strong, but its origin is distributed.

Possible classifications to test:

1. constitutional repository invariant
2. information-record contract
3. evidence/assurance requirement
4. a cross-cutting rule that does not require its own layer

No classification is admitted yet.

---

## Proof And Verification

CB-001 carefully separates several forms of evaluation:

- Lazaretto sanitizes but does not substantively verify
- Pit stress-tests a persona candidate
- the Chief of Staff verifies Executive Mandate status and match
- Curia receives evidence, uncertainty, counsel, and dissent
- the CEO decides but does not thereby make evidence true
- constitutional tests support repository admission but not runtime validation

No universal definition of sufficient proof currently exists.

Current hypothesis:

> Proof is likely contextual. A universal proof layer may be premature unless repeated domains require shared evidence contracts and independent admission rules.

A procedure must never convert completion of its steps into proof that its claims are true.

---

## Candidate Domains — Not Admitted Layers

The investigation currently exposes these possible domains:

```text
ontology and responsibility
governance and authority
information and records
assurance and evidence
procedure
runtime
```

They are analytical lenses only.

A concern earns a separate layer only if it demonstrates:

- responsibility distinct from existing cognitive entities
- artifacts with an independent lifecycle
- independent admission and revision criteria
- repeated reuse across multiple procedures
- failure or ambiguity when left embedded
- a boundary that reduces rather than multiplies conceptual mass

---

## Completed 36-File Definition Trace

The following trace treats a file as an origin only for what it genuinely defines.

A reference does not confer ownership. A summary does not become a second origin.

### Intake, Persona Production, And Recruitment

| File | Native concern | Referenced dependencies | Restatements | Unresolved dependencies |
|---|---|---|---|---|
| `secretariat.md` | Administrative intake and delivery boundary; Petition shaping and Delivery Package handling | Operator identity and intent; authorized Final Report or terminal artifact | Adjacent mission-formation and reporting exclusions | Origin of the operator or Principal authority that makes an incoming request and outgoing delivery authorized |
| `castellan.md` | Mission Need and Work Specification formation | Petition, operator constraints, later profession and mission-assembly boundaries | Separation from Guildhall, Collegium, and Muster | Who or what grants final approval to the Work Specification |
| `guildhall.md` | Profession resolution and Profession Specification | Work Specification, professional evidence, Garrison availability | Persona reuse-before-construction branch | Source and sufficiency standard for a profession being legitimate |
| `studium.md` | Persona Governance Doctrine and Officer Governance Doctrine | Profession or advisory-role requirements; operator constraints; applicable authority | Authority and evidence boundaries later consumed by Foundry, Smith, Pit, and Spur | Source hierarchy for applicable law, represented authority, and operator constraints |
| `hagiography.md` | Saint evidence and Human-Trait Canon | Real-world performance evidence; profession and doctrine constraints | Foundry and Pit relationships | Evidence sufficiency and canonization threshold |
| `foundry.md` | Integration of admitted inputs into Persona Specification Candidate | Profession, doctrine, Human-Trait Canon, operator constraints, reusable patterns | Upstream non-authority and downstream Pit return path | Provenance and authorization of reusable persona patterns and operator constraints when they are not part of the cited upstream artifacts |
| `pit.md` | Persona pressure test and Pit Findings | Candidate, profession, doctrine, canon, test conditions | Upstream correction routes and Garrison admission boundary | Test sufficiency and the authority that converts a recommendation into admission |
| `garrison.md` | Holding and status of admitted canonical personas | Pit Findings, exact upstream versions, restrictions | Reuse and Conscription boundaries | Who admits a persona and on what authority when Pit only recommends |
| `conscription.md` | Deployment-medium transformation of admitted persona into Operative | Garrison persona and deployment-medium contract | Persona ≠ operative ≠ deployment | Origin and authorization of the deployment-medium contract and of the recruitment request |

### Citadel Officer Production And Curia Participation

| File | Native concern | Referenced dependencies | Restatements | Unresolved dependencies |
|---|---|---|---|---|
| `gesta.md` | Officer-Trait Canon from evidenced Officer excellence | Exemplars, performance evidence, Officer needs | Studium, Smith, and Spur boundaries | Evidence sufficiency and trait-canonization threshold |
| `collegium.md` | Advisory Role Requirement and suitability resolution | Mission counsel need, evidence duties, authority boundaries, Preceptory availability | Officer-production referral path | No distinct missing origin identified; it correctly stops when competence is absent |
| `preceptory.md` | Holding and status of admitted reusable Citadel Officers | Officer Fitness Findings, Officer specifications, standing and session assignments | Assignment and mandate distinctions | Who admits an Officer and on what authority when Spur only recommends |
| `smith.md` | Officer Specification Candidate | Advisory or standing role requirement, Officer Governance Doctrine, Officer-Trait Canon | Executive, Staff, and Advisory class distinctions | No distinct missing origin identified beyond its cited inputs |
| `spur.md` | Officer pressure test and Officer Fitness Findings | Officer candidate, class-specific doctrine, traits, evidence and authority boundaries | Preceptory admission boundary | Test sufficiency and the authority that converts a recommendation into admission |
| `session-assignment.md` | Mission-specific Advisory Officer participation contract | Collegium role requirement, Preceptory admission, CoS role, mission and Curia identities | Assignment ≠ admission ≠ mandate | The source of the Chief of Staff's power to bind participation is implied by role responsibility and Standing Curia Assignment but not independently expressed |
| `ceo-president.md` | CEO President role, decision responsibility, and non-authority | Officer qualification, Standing Curia Assignment, Executive Mandate, counsel and evidence | Executive Mandate conditions and vacancy rules | Mandating Principal and Principal authority basis |
| `chief-of-staff.md` | Curial Orchestration, Situation Picture, Minute, mandate verification, and handoff | Standing Curia Assignment, Executive Mandate, provider audit views, counsel assignments | CEO non-transfer and Muster boundary | Authority for mission-scoped provider audit access and authority that issues the standing assignment |
| `standing-curia-role-requirements.md` | Standing CEO and CoS qualification and placement requirements | Officer pipeline, standing assignment, Executive Mandate | Qualification ≠ admission ≠ assignment ≠ authority | The admitted authority that issues, replaces, or supersedes Standing Curia Assignments |
| `executive-mandate.md` | Versioned bounded executive-authority contract | Mandating Principal, Principal authority basis, grantee qualification and assignment | CEO and CoS authority-loss behavior | Final identity of the Mandating Principal and the origin of the Principal's authority; explicitly unresolved by CB-001 |
| `counsel-availability-contract.md` | Required-counsel absence, decision-withholding, and bounded responses | Advisory Role Requirement, Preceptory search, existing mission authority, escalation routes | No authority transfer and durable capability-gap path | External-advice acquisition and accountability path; admitted escalation destination when none exists |
| `curia.md` | Mission-specific convening surface and separation of decision, orchestration, and counsel | Nearly all Curia roles, assignments, mandates, returns, evidence, provider views, and Muster | Many definitions from dedicated role and contract files | Applicable evidence requirements, capacity criteria, standing-assignment authority, and provider-audit access authority |

### Mission Assembly, Boundary, Return, And Closure

| File | Native concern | Referenced dependencies | Restatements | Unresolved dependencies |
|---|---|---|---|---|
| `mission-closure-and-release-contract.md` | Semantic distinction and conditions for assessment, wind-down, closure, release, and reporting | Work Specification completion criteria, Executive Mandate, Terminal Field Packet, provider ledgers | CEO closes; Muster releases; Scribes report | Proof sufficiency for completion when Work Specification criteria are ambiguous; authority source for terminal safe-state disposition when no effective mandate exists |
| `mission-concurrency-and-isolation-contract.md` | Correlation spine, mission-state isolation, collision handling, and exact-match rules | Identities, versions, assignments, mandate, capacity constraints, safe-state instructions | Per-mission Curia and Muster boundaries | Origin of standing-role capacity constraints and of any preauthorized safe-state instruction |
| `provider-intervention-ledgers.md` | Provider-stage record semantics and prohibition on inferred success | Armory/Locksmith interventions, mission correlation, audit views | Provider fact ≠ mission judgment | Authority granting the CoS audit view and canonical owner of shared stage vocabulary |
| `muster.md` | Mission assembly, outbound operationalization, and release of mission binding | Work Specification, Operative, Mission Inquest, Tool Grant, Access Grant, Curia decision, closure authorization | Boundaries of Castellan, Conscription, Inquisition, providers, Curia, Iron Gate, and Theatre | Authority that creates the initial mission binding and authorizes initial launch |
| `la-cortine.md` | Non-acting namespace containing the three boundary ports | Iron Gate, Barbican, Lazaretto | Port distinctions and non-authority | None; it correctly has no acting dependencies of its own |
| `iron-gate.md` | Outward crossing and record of launch or later instruction traffic | Ready For Launch Deployment Package or authorized Muster instruction | Muster does not launch; Theatre executes | Authority for initial external launch; CB-001 explicitly excludes external-action authority |
| `barbican.md` | Continuing provider-support route | Provider ticket, Tool Grant, Access Grant, Armory and Locksmith | Credential custody and port exclusions | No distinct missing origin if provider authorization is resolved upstream |
| `inquisition.md` | Mission Inquest: terrain, facts, assumptions, risks, unknowns, and evidence needs | Work Specification, research sources, mission constraints | Muster assembly and Guildhall profession separation | Authority to acquire restricted evidence when acquisition exceeds ordinary observation; evidence-sufficiency rules remain contextual |
| `armory-locksmith.md` | Tool and access provision boundaries, credential custody, and intervention records | Mission constraints, provider capabilities, authorization, Barbican requests | Availability ≠ authorization; tools ≠ credentials | Who grants Tool and Access authority; real credential and permission authority remains explicitly unimplemented |
| `theatre.md` | External execution terrain and consequence/return boundary | Deployment Package, operative action, external systems and effects | Theatre ≠ Imperium internal production and return ≠ judgment | External-action authority and actual execution mechanism; both explicitly outside CB-001 |
| `lazaretto.md` | Inward sanitation, quarantine, transformation record, and Return Package | Sanitation, redaction, protected-data rules, mission correlation | Sanitation ≠ substantive verification | Origin and authority of sanitation/redaction rules; owner of substantive verification after sanitation |
| `chamber-of-scribes.md` | Final operator-facing report derived from closure evidence | Mission Closure Record, final Curia Minute, cited evidence | Scribes do not decide or alter disposition | No distinct missing origin if closure and reporting authorization are resolved upstream |

### Cross-Cutting Baseline Files

| File | Native concern | Referenced dependencies | Restatements | Unresolved dependencies |
|---|---|---|---|---|
| `cognitive-map.md` | Structural orientation: admitted entities, distinctions, relationships, and topology | All entity and contract files | Extensive summaries of nearly every CB-001 definition | It must not be treated as the canonical origin of the definitions it summarizes |
| `lifecycle.md` | Expected end-to-end ordering and branch sequence | All entity, authority, artifact, and boundary definitions | Entity responsibilities and anti-collapse distinctions | Its native concern matches the corrected definition of procedure; its admission inside the cognitive layer is now contested |
| `production-artifacts.md` | Artifact vocabulary, semantic distinctions, chain, and cross-cutting traceability | Entity authorship, dedicated contracts, authority conditions, versions | Many entity products and contract summaries | Whether this catalog or the entity/contract file is canonical when definitions differ; ownership of artifact-definition changes; final artifact terminology |

---

## Origin Findings

### 1. Responsibility Has A Legitimate Cognitive Origin

The individual entity files are the legitimate origins of entity identity, responsibility, product, and non-authority.

The map and lifecycle may summarize those definitions but do not own them.

### 2. Ownership Usually Follows Responsibility

Current product ownership is normally expressed by the entity's native responsibility:

```text
authors
stewards
holds
assembles
records
delivers
```

No independent ownership lifecycle has yet been demonstrated.

Disposition: `KEEP` as a consequence of cognitive responsibility.

Reopen only if custody transfer, delegation, competing claims, or independent ownership revision appears.

### 3. Authority Is Locally Bounded But Its Root Is Missing

CB-001 successfully prevents silent authority transfer.

It distinguishes qualification, admission, assignment, mandate, decision, launch, tool grant, access grant, closure, and release.

However, it repeatedly stops at unnamed or unresolved grantors:

- Mandating Principal
- authority issuing Standing Curia Assignments
- persona and Officer admission authority
- Tool Grant and Access Grant authority
- initial mission-binding authority
- initial external-launch authority
- provider-audit-view authority

The Executive Mandate is a valid local authority contract, but it cannot be the root of its own authority.

Disposition: `EXTRACT FOR TESTING`.

This means isolate the authority-origin question in draft analysis and pressure it independently. It does not yet authorize a governance layer.

### 4. Artifact Meaning Exists, But Canonical Definition Ownership Is Ambiguous

CB-001 distinguishes artifacts well enough to prevent collapse.

Yet definitions are distributed among:

- entity files
- dedicated contract files
- `production-artifacts.md`
- the map
- the lifecycle

The catalog often uses provisional descriptions or possible fields. Entity and contract files sometimes provide the stronger semantic definition.

Disposition: `EXTRACT FOR TESTING`.

The next test should determine whether artifact meaning requires an independent information-contract surface or only a strict canonical-origin rule inside the cognitive layer.

### 5. Provenance Is Strong But Its Origin Is Distributed

CB-001 consistently requires:

- exact versions
- immutable correlation
- supersession instead of overwrite
- provider-stage fidelity
- exact-match closure and release
- cross-mission collision rejection

Its current strongest general origin is the Traceability section of `production-artifacts.md`, specialized by concurrency, provider-ledger, assignment, mandate, and closure contracts.

Strength is not origin.

A procedure still cannot know which provenance definition is canonical, who may define or revise it, or which rule governs when the distributed requirements differ.

Disposition: `EXTRACT FOR TESTING`.

Test provenance as an origin problem across identity, lineage, version, correlation, transformation, custody, supersession, and exact-match requirements. This does not yet admit a provenance layer; the concern may ultimately belong to an information-and-record contract surface.

### 6. Proof Is Contextual, Not A Single Missing Universal Contract

CB-001 distinguishes sanitation, evidence collection, stress testing, verification, counsel, decision, completion claim, closure, and repository admission.

The absence of one universal proof standard is not automatically a defect.

Different contexts legitimately require different sufficiency rules:

- profession legitimacy
- Saint evidence
- persona fitness
- Officer fitness
- mission evidence
- mandate matching
- completion criteria
- repository admission

Disposition: `PARK` a general proof layer.

Continue tracing local evidence-sufficiency gaps. Extract only if repeated local contracts converge on a genuinely reusable assurance lifecycle.

### 7. The Lifecycle File Is Procedural Material

Under the corrected definition:

```text
procedure
= what is supposed to happen,
  in what order,
  under which conditions
```

`lifecycle.md` has a procedural native concern.

It does not merely define entities or relationships. It orders them through mission formation, production, recruitment, assembly, execution, control, closure, release, reporting, and delivery.

This does not make its content invalid.

It means its current cognitive-layer placement is contested by the newly clarified boundary.

Disposition: `EXTRACT FOR TESTING`.

Do not move or demote it yet. First determine whether it is:

1. a high-level procedure,
2. a family of procedures compressed into one orientation document, or
3. a cognitive topology whose prescriptive language should be removed.

### 8. The Cognitive Map Remains Primarily Cognitive

The map records entities, distinctions, and structural relationships.

Arrows alone do not make it procedural. Its procedural-looking loops should be treated as orientation summaries unless they prescribe mandatory order and branches.

Disposition: `KEEP`, with the map explicitly non-originating for authority, artifact, evidence, and procedure definitions.

---

## Candidate-Domain Dispositions

| Candidate concern | Disposition | Reason |
|---|---|---|
| Entity ontology and responsibility | `KEEP` | Clear native origin in entity files |
| Ownership | `KEEP` under responsibility | No independent lifecycle demonstrated |
| Authority origin and delegation | `EXTRACT FOR TESTING` | Multiple local contracts terminate at unresolved grantors |
| Artifact and information contracts | `EXTRACT FOR TESTING` | Definitions are distributed and canonical ownership is ambiguous |
| Provenance origin and lineage | `EXTRACT FOR TESTING` | Strong distributed rules do not provide one canonical origin |
| General proof or assurance layer | `PARK` | Sufficiency remains context-specific |
| Cognitive map | `KEEP` | Structural orientation remains cognitive |
| Lifecycle ordering | `EXTRACT FOR TESTING` | Native concern matches procedure |
| Procedural layer | `PARK` pending dependencies | Cannot safely originate missing authority or artifact definitions |
| Runtime layer | `PARK` | Explicitly outside current scope |

---

## Procedural Readiness Result

The minimal live mission return-and-direction statement currently depends on unresolved origins:

```text
Theatre return
→ sanitation under what authorized rule?
→ session admission under whose standing-assignment authority?
→ Situation Picture using which canonical artifact contract?
→ mandate verification against authority rooted where?
→ CEO decision
→ Curia Minute under which canonical record definition?
→ Muster instruction
→ Iron Gate crossing under what external-launch authority?
```

Result:

```text
PROCEDURAL LAYER: NOT READY
REASON: required dependencies exist, but several origins remain unresolved
```

The procedure must not repair these gaps.

---

## Recommended Next Work

1. Pressure authority origin and provenance origin together; both are required before procedure can safely cite an authorized, traceable transition.
2. Test whether one minimal authority model can cover assignment, admission, grants, mission binding, decision, and launch without rebuilding an upper-echelon institution.
3. Test whether provenance belongs to artifact/information contracts or demonstrates an independent lifecycle.
4. Resolve canonical artifact-definition ownership alongside provenance because lineage depends on stable artifact identity and version meaning.
5. Re-evaluate `lifecycle.md` after those origins are known.
6. Keep proof contextual unless new evidence forces extraction.
7. Do not create or populate `layers/procedural/` yet.

---

## Invalidation Conditions

Revise or discard this analysis if:

- the proposed domains merely rename distinctions already bounded by CB-001
- extraction duplicates rather than clarifies authority
- artifact contracts do not exhibit an independent lifecycle
- provenance gains a canonical origin without extraction or is adequately governed by an admitted information contract
- proof standards remain necessarily local
- the classification adds more conceptual mass than the ambiguity it removes
