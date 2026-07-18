# Provenance Layer

## Status

Boundary approved by the operator on 2026-07-17.

Provenance Baseline `PB-001` is admitted for current provenance use.

Manifest: `layers/provenance/production/README.md` — 3 files.

Admission: `tests/provenance/production-admission-review-001.md`.

## Core Question

```text
What is this thing,
where did it come from,
what happened to it,
and can its lineage be followed without inference?
```

## Purpose

The provenance layer defines required lineage, correlation, transformation, custody, version, and supersession relations.

It does not decide truth, evidence sufficiency, authority, ownership, artifact meaning, procedure, or storage.

## Structure

```text
layers/provenance/
├── drafts/
└── production/
```

### Drafts

Shaped provenance contracts still under evaluation.

### Production

Provenance contracts admitted for current use after independent and convergence testing.

Production means admitted, not implemented, cryptographically verified, permanent, or stored by a runtime system.

## Owns

The layer may define:

- provenance subjects
- lineage relations
- correlation requirements
- transformation history
- custody and handoff lineage
- version and supersession lineage
- completeness, partiality, contest, breakage, mismatch, and unresolved-source findings

## Does Not Own

The layer does not define:

- cognitive responsibility
- artifact meaning or canonical content
- truth or evidence sufficiency
- authority validity
- expected procedural ordering
- runtime logs, event stores, graphs, schemas, cryptography, or storage

## Parallel Boundary

Provenance and authority are parallel.

A provenance assertion may cite an authority grant, but it must not validate or expand that grant.

## Admission

A provenance artifact may enter production only when:

- its subject and source relations are explicit
- identity and version requirements are bounded
- correlation cannot be inferred from content similarity
- transformations preserve source lineage
- supersession preserves historical addressability
- provenance remains distinct from truth, proof, authority, and ownership
- pressure tests cover broken, partial, contested, mismatched, and unresolved lineage
- no runtime storage model is implied
