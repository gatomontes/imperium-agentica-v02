# Petition Lifecycle

## Status

Draft.

This file defines a provisional point of entry for Imperium work.

It does not admit Citadel, Foundry, runtime architecture, automation, a queue engine, or an operative system.

It defines the first governed shape of operator-facing intake.

---

## Core Thesis

Imperium needs a point of entry before it needs a production line.

Raw intent must not enter production directly.

Raw intent becomes a Petition.

A Petition is evaluated for doability.

A doable Petition may become a Work Order.

Only a Work Order enters production.

```text
Raw intent
→ Petition
→ Doability evaluation
→ Work Order
→ Production line
```

---

## Point Of Entry

The provisional point of entry is the Petition.

A Petition is the first governed form of a request.

It is operator-facing.

It may be formed through conversation.

The operator may speak loosely, explore intent, correct direction, reject assumptions, or clarify desired output.

The intake interaction exists to shape that conversation into a production request.

The conversation is not production.

The Petition is not execution.

The Petition is a request asking to become work.

---

## Petition Is Not Work

A Petition does not command production.

A Petition requests evaluation.

A Petition may be incomplete, ambiguous, exploratory, or provisional.

It must not be treated as a Work Order merely because it sounds actionable.

Imperium must not build directly from raw intent when the expected output, scope, or domain relevance is unclear.

---

## Operator-Facing Interface

The Petition interface exists to convert conversation into a governed request.

Its job is to fill the production request form with the least necessary friction.

It should ask for missing essentials, not interrogate unnecessarily.

The interface should help establish:

- what the operator is asking for
- whether the request belongs to Imperium's current domain
- the expected output type
- known constraints
- available source material or references
- desired reporting expectation
- whether enough information exists to begin

The interface must not silently decide that production has begun.

---

## Petition Form

A Petition should capture, when relevant:

```text
Petition title:
Raw request:
Operator intent:
Domain relevance:
Expected output type:
Desired outcome:
Known constraints:
Source material or references:
Reporting expectation:
Urgency or priority:
Missing information:
Doability mark:
Recommended next action:
```

Do not fill fields as ceremony.

Use only the fields needed to make the request governable and routeable.

---

## Expected Output Types

At this stage, doability depends heavily on whether the expected output is recognizable.

Recognized output types may include:

- persona
- operative
- report
- doctrine draft
- review
- template
- workflow
- production request
- revision of an existing artifact

This list is provisional.

It may grow only through use.

---

## Doability Evaluation

Doability is a routing threshold, not a success prediction.

A Petition is marked doable when it:

1. belongs to Imperium's current domain
2. has a recognizable expected output type
3. contains enough information to begin production
4. has no obvious blocker that prevents initial work

Doability does not guarantee correctness.

Doability does not guarantee completion.

Doability does not admit the final artifact.

Doability only means the Petition may become a Work Order.

---

## Doability Marks

A Petition may be marked:

### Doable

The Petition belongs to Imperium's current domain, has a recognizable expected output, and contains enough information to begin.

### Needs Clarification

The Petition may be doable, but required intake information is missing.

### Out Of Scope

The Petition does not belong to Imperium's current domain.

### Blocked

The Petition cannot begin because a required dependency, authority, source, or constraint is missing.

### Deferred

The Petition may matter later, but should not enter production now.

---

## Work Order Conversion

A doable Petition may be converted into a Work Order.

A Work Order is the admitted production item.

A Work Order should identify:

```text
Source petition:
Expected output:
Production objective:
Production lane:
Required inputs:
Constraints:
Reporting path:
First production pass:
```

The Work Order is where production begins.

The Petition is where production is requested.

The Work Order must not assume Mayo's private tools are Imperium components.

MGov Builder, MGov Reviewer, and Blackquill may be used by the operator to construct or inspect Imperium artifacts, but they are not admitted as Imperium production roles, routing stages, or architectural elements.

---

## Private Construction Tools Boundary

Mayo's private tools remain outside Imperium.

These include, at minimum:

- Mayo's Governance parent persona
- MGov Builder
- MGov Reviewer
- Blackquill as critique or refinement lens

They may shape Imperium.

They may help the operator draft, revise, or inspect Imperium artifacts.

They are not produced by Imperium.

They are not owned by Imperium.

They do not sit inside Imperium's production line.

```text
Mayo's private tools may build Imperium.
Imperium does not contain Mayo's private tools.
```

---

## Multi-Pass Production Boundary

Production may require multiple passes.

The Petition stage does not need to solve the full production path.

It only needs to decide whether the request is fit to enter production.

Later production mechanics may include drafting, building, reviewing, revising, compliance checking, and delivery.

Those mechanics are not admitted here.

This file only establishes the entry boundary.

---

## Non-Admissions

This draft does not admit:

- Citadel
- Foundry
- a queue engine
- a production runtime
- an automated router
- an approval authority
- a governance layer
- an operative hierarchy
- a database or ledger
- MGov Builder as an Imperium component
- MGov Reviewer as an Imperium component
- Blackquill as an Imperium component

Those may be proposed later only if repeated pressure proves them necessary.

---

## Failure Signals

Review or revise this draft if:

- Petition becomes a decorative name for ordinary chat
- the interface starts producing artifacts directly without work order conversion
- doability becomes overcomplicated too early
- every vague request is treated as doable
- every incomplete request is rejected instead of clarified
- the Petition becomes a hidden command authority
- Citadel or Foundry mechanics are reintroduced by implication
- Mayo's private tools are treated as Imperium architecture
- the production line is designed before the entry boundary is tested

---

## Batch Summary

Files changed:

- `drafts/petition-lifecycle.md`

Assumptions introduced:

- Imperium's provisional point of entry should be a Petition.
- The Petition can be operator-facing and conversation-shaped.
- Doability is a simple routing threshold at this stage.
- Work Orders, not Petitions, enter production.
- Mayo's private tools can help construct Imperium without becoming Imperium architecture.

Behavior proven:

- Not yet proven.
- This draft creates a test surface for converting operator conversation into production-ready requests.

Risks remaining:

- Petition may become another ceremonial noun.
- Doability may drift into either over-analysis or rubber-stamping.
- Work Order mechanics may be overbuilt before Petition intake is tested.
- The distinction between private construction tools and Imperium mechanics may need reinforcement through use.

Recommended next smallest step:

- Test the Petition interface against one real operator request and decide whether the resulting form is enough to mark it doable or request clarification.
