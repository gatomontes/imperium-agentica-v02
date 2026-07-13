# Work Order

## Status

Draft.

This file defines the provisional Work Order boundary for Imperium production.

It does not admit a production runtime, queue engine, automated router, Citadel, Foundry, operative hierarchy, pass engine, or implementation system.

It defines the authorization boundary that appears after a Petition is marked doable and before a Job begins.

---

## Core Thesis

A Petition requests evaluation.

A Work Order authorizes work.

A Job performs the authorized work.

A Product is the resulting artifact.

```text
Raw intent
→ Petition
→ Doability evaluation
→ Work Order
→ Job
→ Product
```

A Work Order is created only after a Petition is marked doable.

A Work Order is not the Job.

A Work Order does not itself perform production.

It authorizes a Job by naming the product type, production objective, authority boundary, constraints, reporting path, and initial conditions under which the Job may proceed.

---

## Relationship To Petition

A Petition may be conversational, exploratory, incomplete, or provisional.

A Work Order must be authorization-shaped.

A Petition becomes eligible for Work Order conversion only when it is marked doable and has a recognized product type.

Do not convert a Petition into a Work Order merely because it sounds actionable.

A Work Order should identify:

```text
Source petition:
Doability mark:
Authorized product type:
Production objective:
Authority granted:
Known constraints:
Required inputs:
Reporting path:
Job authorization:
Initial Job boundary:
Completion target:
```

The Petition asks whether work may be considered.

The Work Order says work may be attempted.

The Job defines how the work will be carried out.

---

## Relationship To Job

A Job is the organized work authorized by a Work Order.

A Job is the series of preparatory, execution, review, revision, and delivery steps involved in completing the authorized work.

A Work Order authorizes one Job unless explicitly stated otherwise.

A Job should identify:

```text
Source Work Order:
Job objective:
Expected product:
Required inputs:
Preparatory steps:
Execution steps:
Review or check steps:
Revision steps if needed:
Reporting moments:
Stop conditions:
Completion criteria:
Delivery target:
```

A Job may require multiple passes.

Those passes belong to the Job, not to the Work Order.

The Work Order preserves authorization.

The Job preserves execution structure.

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
- Job Form
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
What Petition authorized consideration?
What doability mark permits conversion?
What product type is authorized?
Why is this product being authorized?
What authority is granted to create the Job?
What constraints are known before the Job begins?
What information is required for the Job?
How will progress or output be reported?
What does completion mean for this authorization?
```

If these cannot be answered, the Petition may not be ready for Work Order conversion.

Incomplete information may still permit a Work Order if the authorized Job is explicitly exploratory, bounded, and reportable.

---

## Job Boundary

A Work Order does not need to solve the entire production path.

It must authorize the Job boundary.

The Job boundary should state the first organized movement of production.

The first Job movement may be:

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

The first Job movement must be smaller than the final product when the final product is uncertain.

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
- Job becomes a decorative synonym for task
- every Petition becomes a Work Order automatically
- every Work Order creates a Job automatically without explicit authorization
- the product catalog grows faster than actual use
- generic Template reappears without naming what it templates or who uses it
- Work Orders begin assigning private MGov tools as Imperium architecture
- Jobs begin hiding authority that should remain in the Work Order
- Job steps become too large for bounded production
- completion target is confused with final admission
- production mechanics are designed before Petition, Work Order, and Job boundaries are tested

---

## Batch Summary

Files changed:

- `drafts/work-order.md`

Assumptions introduced:

- Imperium needs a Work Order boundary after Petition doability.
- A Work Order authorizes a Job rather than performing production itself.
- A Job is the organized series of preparation, execution, review, revision, and delivery steps needed to complete the authorized work.
- Work Orders require a recognized product type.
- The initial product catalog can remain provisional and leanable.
- Production Form is clearer than generic Template.

Behavior proven:

- Not yet proven.
- This draft creates a test surface for converting a doable Petition into authorized Job production.

Risks remaining:

- Product types may still be too many.
- Work Order may become ceremony if not tested against a real Petition.
- Job may become ceremony if not tested against real production.
- Production mechanics may be overbuilt before first Job execution is understood.

Recommended next smallest step:

- Convert one real doable Petition into a Work Order, authorize a small Job, and decide whether the Petition → Work Order → Job distinction reduces ambiguity or creates ceremony.
