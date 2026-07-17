# Authority Layer Boundary Proposal

## Status

Draft proposal.

This document proposes a layer boundary and smallest repository shape.

It does not create the layer, admit its name, move CB-001 artifacts, define an authority institution, or implement permissions.

---

## Proposed Name

```text
Authority
```

The direct name is preferred until a demonstrated institutional responsibility justifies another term.

A layer is not an institution.

---

## Core Question

```text
May this exact action occur,
under whose permission,
within what scope,
and under what continuing conditions?
```

---

## Boundary

The Authority layer defines:

- how authority enters Imperium from a represented Principal
- how the Principal's authority basis is referenced
- how permission is granted to a bounded grantee or acting surface
- scope, conditions, prohibitions, and effective interval
- whether delegation is permitted
- how derived authority remains within its parent
- suspension, contest, withdrawal, expiry, and supersession
- authority-loss safe-state constraints
- semantic authority findings

The Authority layer does not define:

- cognitive identity or responsibility
- competence or qualification
- placement or participation
- provenance
- artifact meaning
- evidence truth or sufficiency
- procedure
- execution
- runtime access control
- legal validity outside the represented basis

---

## Four Levels

```text
Authority principle
→ authority cannot be manufactured inside Imperium

Authority contract
→ Principal, basis, grant, scope, conditions, status

Authority device
→ Executive Mandate, Tool Grant, Access Grant,
  or another concrete artifact representing a particular grant

Runtime implementation
→ permissions, tokens, ACLs, policy engines, or enforcement
```

The layer initially defines the principle and common contract.

It may recognize existing devices without absorbing their specialized meanings.

It does not define runtime implementation.

---

## Minimal Semantic Contract

One initial draft is sufficient:

```text
authority-contract.md
```

It should contain:

- Represented Principal
- Authority Basis
- Authority Grant
- parent and derived grant rules
- exact scope matching
- delegation constraints
- effective and ineffective findings
- supersession and historical preservation
- provenance-reference requirement
- non-authority distinctions

Specialized artifacts remain specialized:

- Executive Mandate
- Tool Grant
- Access Grant
- mission authorization
- launch authorization
- closure authorization

The common contract supplies their authority grammar. It does not collapse them into one artifact.

---

## Relationship To Provenance

Authority requires provenance for:

- Principal identity
- Authority Basis
- grant lineage
- parent grant
- exact grant version
- suspension, withdrawal, expiry, or supersession event

The Authority layer cites the Provenance layer's findings.

It does not define how lineage is represented or whether it is complete.

```text
AUTHORITY_EFFECTIVE
requires applicable provenance
but is not produced by provenance
```

---

## Relationship To Cognitive Layer

The Cognitive layer defines:

- what an entity is
- its responsibility
- its competence boundaries
- its products and non-authority

The Authority layer defines whether a bounded action by that entity is permitted.

Responsibility does not create authority.

Authority does not rewrite responsibility.

---

## Relationship To Procedure

Procedure may state:

```text
if the required Authority Finding is effective,
the expected transition is X;
otherwise the expected alternate path is Y
```

Procedure does not define the grant, evaluate its root, expand its scope, or choose its status.

---

## Proposed Repository Shape

Not yet authorized for creation:

```text
layers/authority/
├── README.md
├── drafts/
│   └── README.md
└── production/
    └── README.md
```

First prospective draft after structure approval:

```text
layers/authority/drafts/authority-contract.md
```

Do not create `tests/authority/` until the first layer draft exists.

---

## Draft Admission Boundary

Authority drafts may contain:

- bounded semantic contracts
- authority distinctions
- grant and delegation rules
- findings and failure modes
- references to specialized devices
- theoretical pressure cases

They may not:

- grant real authority
- create Principals
- invent legal basis
- define cognitive responsibilities
- define provenance
- create institutions
- implement permissions

---

## Production Admission Criteria

An Authority artifact may enter production only when:

- its core authority question is independent
- Principal and Authority Basis remain external or previously admitted
- responsibility, competence, assignment, and capability remain distinct
- derived scope cannot exceed parent scope
- authority loss cannot transfer authority by vacancy
- specialized grants remain semantically distinct
- required provenance is cited but not absorbed
- missing or contested authority produces a bounded finding
- pressure tests cover root absence, scope mismatch, delegation excess, withdrawal, and cross-mission misuse
- no runtime machinery is implied
- invalidation conditions are explicit

Production would mean admitted semantic authority contract, not real permission or enforcement.

---

## First Application Test

Apply the common contract to:

1. Executive Mandate
2. Standing Curia Assignment issuer
3. persona and Officer admission decision
4. Tool Grant
5. Access Grant
6. initial mission authorization
7. external-launch authorization
8. closure authorization

The test succeeds only if the common grammar clarifies all eight without making them one artifact.

---

## Explicit Non-Admissions

This proposal does not admit:

- Praetorium
- a sovereign authority office
- a legal department
- a universal approval engine
- a permission service
- ACLs, roles, tokens, secrets, or policy code
- automatic delegation
- authority inferred from competence, custody, availability, or procedure
- authority as proof
- authority as provenance

---

## Invalidation Conditions

Revise or reject this boundary if:

- authority cannot be expressed independently of cognitive responsibility
- specialized grants collapse under a common grammar
- the layer creates authority rather than representing it
- every internal act becomes burdened by unnecessary grants
- provenance becomes subordinate to authority
- the layer exists only to rename Executive Mandate
