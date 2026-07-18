# Authority Layer

## Status

Boundary approved by the operator on 2026-07-17.

Authority Baseline `AB-002` is admitted for current authority use.

Manifest: `layers/authority/production/README.md` — 5 files.

Admission: `tests/authority/production-admission-review-002-ab-002.md`.

## Core Question

```text
May this exact action occur,
who may permit it,
and within what scope?
```

## Purpose

The authority layer defines how permission enters Imperium, how permission is bounded or delegated, and how it becomes unavailable.

It does not create authority.

Imperium may represent, constrain, verify, and preserve authority granted by a represented Principal whose authority basis exists independently of Imperium.

## Structure

```text
layers/authority/
├── drafts/
└── production/
```

### Drafts

Shaped authority contracts still under evaluation.

### Production

Authority contracts admitted for current use after independent and convergence testing.

Production means admitted, not implemented, externally validated, permanent, or self-executing.

## Owns

The layer may define:

- represented authority origin
- Authority Basis semantics
- bounded grants
- scope and conditions
- permitted delegation
- suspension, contest, withdrawal, expiry, and supersession
- authority findings for exact actions

## Does Not Own

The layer does not define:

- cognitive responsibility or competence
- provenance or lineage sufficiency
- artifact meaning
- evidence truth or sufficiency
- expected procedural ordering
- runtime permissions, ACLs, services, storage, or execution
- an upper-echelon institution

## Parallel Boundary

Authority and provenance are parallel.

An authority contract may require a provenance finding, but it must not define or repair provenance.

## Admission

An authority artifact may enter production only when:

- its authority source is explicit
- it cannot authorize itself
- scope and prohibited actions are bounded
- assignment, competence, capability, and authority remain distinct
- delegation cannot expand the parent grant
- authority-loss behavior is explicit
- provenance is referenced without being redefined
- pressure tests cover missing, contested, expired, withdrawn, superseded, mismatched, and over-delegated authority
- no runtime implementation is implied
