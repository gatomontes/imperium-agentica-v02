# Provenance Layer Boundary Proposal

## Status

Draft proposal.

This document proposes a layer boundary and smallest repository shape.

It does not create the layer, admit its name, move CB-001 artifacts, restore Codex or Vellum, define station logs, or implement storage.

---

## Proposed Name

```text
Provenance
```

The direct name is preferred until another term proves semantically superior.

A layer is not an institution or representational device.

---

## Core Question

```text
What is this thing,
where did it come from,
what happened to it,
and can its lineage be followed without inference?
```

---

## Boundary

The Provenance layer defines:

- minimum lineage requirements
- derivation relations
- producer and observer relations
- mission and subordinate correlation
- transformation history
- custody and handoff lineage
- version and supersession lineage
- authority-reference lineage without validating authority
- complete, partial, contested, broken, mismatch, and unresolved-source findings
- semantic fidelity requirements where mere citation is insufficient

The Provenance layer does not define:

- cognitive identity or responsibility
- authority validity
- artifact meaning
- truth or evidence sufficiency
- expected procedure
- mission success
- storage, retrieval, or query implementation
- which representational device must exist

---

## Four Levels

```text
Provenance principle
→ lineage must remain knowable and may not be repaired by inference

Provenance contract
→ required relations, minimum references, and findings

Provenance device
→ Codex, Vellum, station ledger, transformation record,
  mission record, manifest, or another concrete representation

Runtime implementation
→ database, file, event store, API, graph, or query system
```

The layer initially defines the principle and contract.

It does not yet define or require a provenance device.

---

## Representational Device Boundary

v01 used named devices such as Codex and Vellum to make provenance addressable.

Those devices were representations of provenance, not provenance itself.

A device becomes justified only when a scenario proves that the lineage contract cannot be satisfied or accessed through existing artifacts.

Current rule:

```text
mission-wide traversability: required
mission-wide log device: not yet required

local transformation lineage: required
a new station-log artifact for every station: not yet required
```

Existing devices or records may satisfy parts of the contract:

- Armory and Locksmith Intervention Ledgers
- Lazaretto Transformation Record
- Curia Minute
- Iron Gate outward-traffic record
- Mission Closure Record
- Operative Release Record

The Provenance layer does not take ownership of their substantive meanings.

---

## Minimal Semantic Contract

One initial draft is sufficient:

```text
provenance-contract.md
```

It should contain:

- Provenance Subject
- bounded lineage relations
- source and subject identity/version references
- producer or observer reference
- correlation requirements
- transformation and custody requirements when applicable
- supersession requirements
- authority reference when the act required authority
- semantic fidelity constraint
- provenance findings
- unresolved-lineage behavior
- non-provenance distinctions

Candidate relation vocabulary:

```text
DERIVED_FROM
PRODUCED_BY
TRANSFORMED_FROM
SUPERSEDES
CORRELATED_TO
OBSERVED_BY
TRANSFERRED_FROM
TRANSFERRED_TO
AUTHORIZED_UNDER
CITES
```

The vocabulary must remain semantic and implementation-neutral.

---

## Relationship To Authority

Provenance records the lineage of:

- Principal identity
- Authority Basis
- Authority Grant
- parent grant
- decision
- instruction
- withdrawal or supersession

It does not declare any of them valid.

```text
traceable grant ≠ valid grant
valid grant ≠ traceable grant
```

---

## Relationship To Artifact Meaning

Provenance requires stable artifact identity and version references.

It does not define what Petition, Work Specification, Curia Minute, Deployment Package, or any other artifact means.

Canonical artifact-definition ownership remains a separate unresolved concern.

This prevents provenance from silently becoming a general information layer.

---

## Relationship To Procedure

Procedure may require a Provenance Finding before an expected transition.

Procedure does not define lineage relations, repair missing lineage, infer mission correlation, or choose a provenance device.

---

## Proposed Repository Shape

Not yet authorized for creation:

```text
layers/provenance/
├── README.md
├── drafts/
│   └── README.md
└── production/
    └── README.md
```

First prospective draft after structure approval:

```text
layers/provenance/drafts/provenance-contract.md
```

Do not create `tests/provenance/` until the first layer draft exists.

---

## Draft Admission Boundary

Provenance drafts may contain:

- semantic lineage relations
- minimum reference requirements
- correlation and transformation distinctions
- provenance findings and failure modes
- device-neutral traversability requirements
- theoretical pressure cases

They may not:

- define artifact meaning
- decide truth or evidence sufficiency
- validate authority
- create Codex, Vellum, station logs, or a mission log
- prescribe storage or query mechanisms
- require universal logging without demonstrated need

---

## Production Admission Criteria

A Provenance artifact may enter production only when:

- its core lineage question remains independent
- relations remain semantically distinct
- content similarity cannot replace identity or correlation
- transformation cannot erase source lineage
- supersession cannot overwrite history
- citation cannot silently replace derivation fidelity
- complete provenance cannot be confused with truth
- authority references are preserved without authority evaluation
- artifact meaning remains externally defined
- the contract works across multiple existing record devices
- no particular representational or runtime device is assumed
- invalidation conditions are explicit

Production would mean admitted semantic lineage contract, not a working log or audit system.

---

## First Application Test

Apply the common contract to:

1. Persona Candidate derivation
2. Operative derivation
3. Deployment Package derivation
4. Lazaretto transformation
5. provider intervention stages
6. Curia Minute inputs and authority references
7. Iron Gate outward traffic
8. closure and release exact match
9. Final Report derivation

The test succeeds only if the common contract preserves lineage across all nine without redefining their artifacts.

---

## Device Admission Trigger

Investigate a concrete provenance device only when testing demonstrates one of these gaps:

- an important event or transformation has no existing record
- lineage cannot be traversed across distributed artifacts
- a required view cannot be produced without inventing inference
- one record must canonically aggregate multiple existing records
- existing devices disagree and require an authoritative reconciliation surface

Even then, the smallest device should be tested first.

Codex, Vellum, station logs, and mission-wide logs remain unadmitted until such evidence exists.

---

## Explicit Non-Admissions

This proposal does not admit:

- Codex
- Vellum
- a mission-wide log
- universal station logs
- a provenance office
- a provenance graph
- event sourcing
- an audit database
- cryptographic verification
- truth determination
- evidence sufficiency
- runtime observability

---

## Invalidation Conditions

Revise or reject this boundary if:

- provenance cannot be expressed independently of artifact meaning
- the contract becomes a generic runtime event schema
- relation vocabulary adds bureaucracy without resolving lineage
- provenance begins validating truth or authority
- a separate layer adds no clarity beyond one cognitive cross-cutting rule
- device-neutral provenance cannot be practically reasoned about
