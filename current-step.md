# Current Step

## Status

Active — authority and provenance boundary proposals complete; awaiting operator review.

Activated by operator on 2026-07-17.

This file is not doctrine, a roadmap, or architecture.

It is the operational continuity surface for the currently active step.

---

## Active Step

Define the minimal Authority and Provenance layer boundaries without creating institutions, representational devices, or runtime implementations.

## Working Analyses

```text
drafts/cb-001-dependency-domain-origin-analysis.md
drafts/authority-origin-investigation.md
drafts/provenance-origin-investigation.md
drafts/authority-provenance-convergence-test.md
drafts/authority-layer-boundary-proposal.md
drafts/provenance-layer-boundary-proposal.md
```

---

## Proposed Parallel Boundaries

### Authority

Core question:

```text
May this exact action occur,
under whose permission,
within what scope,
and under what continuing conditions?
```

Candidate minimum:

```text
Represented Principal
+ Authority Basis
+ specialized Authority Grant
```

Four levels:

```text
authority principle
→ authority contract
→ authority device
→ runtime implementation
```

The layer initially admits only principle and contract semantics.

### Provenance

Core question:

```text
What is this thing,
where did it come from,
what happened to it,
and can its lineage be followed without inference?
```

Four levels:

```text
provenance principle
→ provenance contract
→ provenance device
→ runtime implementation
```

The layer initially admits only principle and contract semantics.

Codex, Vellum, station logs, mission-wide logs, databases, event stores, and query systems remain unadmitted.

---

## Proposed Repository Shapes

Not yet authorized for creation:

```text
layers/authority/
├── README.md
├── drafts/
│   └── README.md
└── production/
    └── README.md

layers/provenance/
├── README.md
├── drafts/
│   └── README.md
└── production/
    └── README.md
```

Prospective first drafts:

```text
layers/authority/drafts/authority-contract.md
layers/provenance/drafts/provenance-contract.md
```

Testing directories remain deferred until those drafts exist.

---

## Principal Distinctions

- A layer is not an institution.
- A principle is not a contract.
- A contract is not a representational device.
- A representational device is not runtime storage.
- Authority and provenance are parallel.
- Authority may require provenance without defining it.
- Provenance may cite authority without validating it.
- Provenance requires mission-wide traversability, not a mission-wide log.
- Provenance requires transformation lineage, not a new log for every station.
- Artifact meaning remains a separate unresolved dependency.
- Procedure remains parked.

---

## Pending Operator Judgment

Approve, revise, or reject:

1. direct layer names: `Authority` and `Provenance`
2. the proposed parallel boundaries
3. the four-level distinction for each concern
4. the minimal repository shapes
5. one initial semantic contract per layer
6. continued non-admission of Codex, Vellum, and other provenance devices

No layer directory has been created.

No CB-001 production artifact has been changed or demoted.

---

## Current Constraints

- Do not create layer directories before explicit operator approval.
- Do not move existing CB-001 authority or provenance material yet.
- Do not define artifact meaning in either proposed layer.
- Do not create institutions or devices merely to host the concern.
- Do not introduce schemas, storage, services, UI, scheduling, automation, or enforcement implementation.

---

## Last Completed Evidence

```text
Authority Test Run A-001: 7 PASS / 0 FAIL
Provenance Test Run P-001: 8 PASS / 0 FAIL
Convergence Run AP-001: PASS WITH BLOCKERS
```

---

## Active-Step Reading Set

1. `README.md`
2. `current-step.md`
3. `next-steps.md`
4. `drafts/authority-layer-boundary-proposal.md`
5. `drafts/provenance-layer-boundary-proposal.md`
6. `drafts/authority-origin-investigation.md`
7. `drafts/provenance-origin-investigation.md`
8. `drafts/authority-provenance-convergence-test.md`
9. `drafts/cb-001-dependency-domain-origin-analysis.md`

---

## Invariants To Preserve

- CB-001 remains admitted until explicitly revised or demoted.
- Responsibility, authority, provenance, artifact meaning, procedure, and runtime remain distinct.
- Logical lineage is distinct from the device that exposes it.
- No missing authority or provenance may be repaired by procedure.
- No new layer is admitted merely because a concern can be named.
