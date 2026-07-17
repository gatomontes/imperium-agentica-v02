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

These are preliminary classifications, not final layer assignments.

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

## Next Analysis

1. Classify all 36 CB-001 production artifacts by primary and secondary domain.
2. Distinguish true origins from maps, summaries, and restatements.
3. Locate unresolved references such as authority basis, evidence sufficiency, and artifact-definition ownership.
4. Identify which concerns are adequately cognitive.
5. Recommend `KEEP`, `EXTRACT FOR TESTING`, or `PARK` for each candidate domain.
6. Test the classification against a minimal statement of the live mission return-and-direction procedure.
7. Do not create a procedural layer until every dependency referenced by that statement has a legitimate origin or is explicitly recorded as unresolved.

---

## Invalidation Conditions

Revise or discard this analysis if:

- the proposed domains merely rename distinctions already bounded by CB-001
- extraction duplicates rather than clarifies authority
- artifact contracts do not exhibit an independent lifecycle
- provenance is adequately governed as a repository-wide invariant
- proof standards remain necessarily local
- the classification adds more conceptual mass than the ambiguity it removes
