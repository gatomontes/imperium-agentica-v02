# Work Order

## Status

Draft.

This file defines the provisional Work Order boundary for Imperium production.

It does not admit a production runtime, queue engine, automated router, Citadel, Foundry, operative hierarchy, or implementation system.

It defines the first governed production request formed after a Petition is marked doable.

---

## Core Thesis

A Petition requests evaluation.

A Work Order begins production.

A Work Order is created only after a Petition is marked doable.

```text
Raw intent
→ Petition
→ Doability evaluation
→ Work Order
→ Production line
```

The Work Order is not the final product.

It is the admitted production item that tells Imperium what kind of product is being made, why it is being made, and what minimum boundaries govern the first production pass.

---

## Relationship To Petition

A Petition may be conversational, exploratory, incomplete, or provisional.

A Work Order must be production-shaped.

A Work Order must identify:

```text
Source petition:
Product type:
Production objective:
Required inputs:
Known constraints:
Reporting path:
First production pass:
Completion target:
```

Do not convert a Petition into a Work Order merely because it sounds actionable.

A Petition becomes a Work Order only when it is marked doable and has a recognized product type.

---

## Product Catalog

Imperium may currently accept Work Orders for the following provisional product types:

1. Persona
2. Operative
3. Doctrine Draft
4. Review Report
5. Workflow / Protocol
6. End Report
7. Revision / Refinement
8. Production Form

This catalog is provisional.

It may be leaned, merged, renamed, split, or removed through use.

No product type is permanent merely because it appears here.

---

## Product Type Definitions

### Persona

A governed thinking posture used to shape behavior, judgment, tone, or review stance.

A Persona helps think.

It is not automatically an operative, authority, runtime, or Imperium component.

A Persona Work Order should identify:

- purpose
- posture
- scope
- non-scope
- response behavior
- failure signals
- authority limitations

---

### Operative

A bounded agentic artifact designed to perform a specific kind of work.

An Operative performs bounded work.

It must not be created without explicit scope, non-scope, authority envelope, reporting path, stop conditions, and expected outputs.

An Operative Work Order should identify:

- task domain
- expected outputs
- authority envelope
- reporting authority
- command, review, and approval distinctions if relevant
- stop conditions
- escalation conditions
- evidence duties

---

### Doctrine Draft

A provisional governing principle, rule set, or behavioral discipline.

Doctrine governs behavior.

A Doctrine Draft is not admitted law merely because it is written.

A Doctrine Draft Work Order should identify:

- observed pressure
- governing principle
- intended behavior
- scope
- non-scope
- rules or constraints
- non-admissions
- revision or removal criteria

---

### Review Report

A structured judgment of an artifact, proposal, output, or concept.

A Review Report judges readiness, risk, gaps, or compliance.

A Review Report is not approval unless approval authority is explicitly granted elsewhere.

A Review Report Work Order should identify:

- artifact reviewed
- review question
- criteria
- expected verdict type
- required evidence
- known risks
- requested output format

---

### Workflow / Protocol

A repeatable sequence for performing work.

A Workflow or Protocol defines how work proceeds.

It should not be created before repeated need or ambiguity proves that sequence matters.

A Workflow / Protocol Work Order should identify:

- trigger
- inputs
- steps
- participants or roles if needed
- expected outputs
- stop conditions
- escalation conditions
- handoff points

---

### End Report

A final or interim explanation of work performed, findings, conclusions, and remaining uncertainty.

An End Report explains outcomes.

It does not by itself admit the work product unless admission authority is granted elsewhere.

An End Report Work Order should identify:

- question answered
- work performed
- evidence considered
- conclusion type
- uncertainty
- recommendations
- next action

---

### Revision / Refinement

A targeted improvement to an existing artifact.

Revision improves what already exists.

It must preserve known constraints unless the Work Order explicitly authorizes changing them.

A Revision / Refinement Work Order should identify:

- source artifact
- reason for revision
- required changes
- preserved constraints
- permitted changes
- replacement or patch output
- review need after revision

---

### Production Form

A reusable structured artifact used to standardize a recurring Imperium process.

A Production Form shapes future production.

It is not a generic template.

Examples may include:

- Petition Form
- Work Order Form
- Review Form
- Operative Spec Form
- End Report Form

A Production Form Work Order should identify:

- process supported
- who or what uses it
- fields captured
- required fields
- optional fields
- decision or output enabled
- completion criteria

---

## Product Catalog Discipline

The product catalog should remain lean.

Do not add product types because a word sounds useful.

Add, split, merge, or remove product types only when use shows that the existing catalog cannot classify a real Petition cleanly.

If a Petition appears to request an unknown product type, mark it as Needs Clarification, Out Of Scope, or Deferred rather than expanding the catalog immediately.

---

## Work Order Formation

A Work Order should answer:

```text
What product is being made?
Why is it being made?
What Petition authorized production?
What information is required?
What constraints are known?
What is the first production pass?
How will progress or output be reported?
What does completion mean for this Work Order?
```

If these cannot be answered, the Petition may not be ready for Work Order conversion.

Incomplete information may still permit a Work Order if the first production pass is explicitly exploratory, bounded, and reportable.

---

## First Production Pass

A Work Order does not need to solve the entire production path.

It must identify the first production pass.

The first pass may be:

- draft
- outline
- classification
- review
- revision
- extraction
- synthesis
- report
- form completion
- bounded prototype

The first pass must be smaller than the final product when the final product is uncertain.

---

## Non-Admissions

This draft does not admit:

- Citadel
- Foundry
- production runtime
- queue engine
- automated routing
- approval authority
- operative hierarchy
- database or ledger
- pass engine
- implementation architecture

Those may be proposed later only if repeated production pressure proves them necessary.

---

## Failure Signals

Review or revise this draft if:

- Work Order becomes a decorative synonym for task
- every Petition becomes a Work Order automatically
- the product catalog grows faster than actual use
- generic Template reappears without naming what it templates or who uses it
- Work Orders begin assigning private MGov tools as Imperium architecture
- the first production pass becomes too large
- completion target is confused with final admission
- production mechanics are designed before Petition and Work Order boundaries are tested

---

## Batch Summary

Files changed:

- `drafts/work-order.md`

Assumptions introduced:

- Imperium needs a Work Order boundary after Petition doability.
- Work Orders require a recognized product type.
- The initial product catalog can remain provisional and leanable.
- Production Form is clearer than generic Template.

Behavior proven:

- Not yet proven.
- This draft creates a test surface for converting a doable Petition into a production-shaped request.

Risks remaining:

- Product types may still be too many.
- Work Order may become ceremony if not tested against a real Petition.
- Production mechanics may be overbuilt before first-pass production is understood.

Recommended next smallest step:

- Convert one real doable Petition into a Work Order and decide whether the fields are sufficient or excessive.
