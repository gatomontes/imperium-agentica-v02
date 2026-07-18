# Cognitive Layer

## Purpose

The cognitive layer contains Imperium's conceptual entities, responsibilities, competence boundaries, cognitive artifact meanings, and cognitive maps.

It does not define runtime architecture, service topology, database schema, deployment infrastructure, or UI implementation.

## Structure

```text
layers/cognitive/
├── drafts/
└── production/
```

### Drafts

`drafts/` contains shaped cognitive artifacts and retained source drafts. Admission does not erase their traceable history.

Approval of a diagram or terminology does not by itself promote an artifact. Drafts remain contestable and may be revised, split, merged, demoted, or removed as scenarios expose defects.

### Production

`production/` contains cognitive artifacts admitted for current active use after sufficient scenario evidence.

Current baseline: `CB-004` — 34 files, admitted 2026-07-18 under Runtime Production Admission Review 001.

CB-004 cites Authority Baseline `AB-003`, Provenance Baseline `PB-001`, Procedure Baseline `PRB-002`, and Runtime Baseline `RTB-001` for contracts native to those parallel concerns.

Production means admitted, not permanent. An artifact may return to drafts when later evidence contests it.

## Admission

A cognitive artifact may move from drafts to production only when:

- its observed necessity is explicit
- its responsibility and non-authority are bounded
- its inputs and products are distinguishable
- its relationships do not collapse adjacent entities
- relevant cognitive scenarios have exercised it
- unresolved defects are recorded and do not invalidate admission
- the promotion decision is traceable

## Testing

Cognitive tests and theoretical run results live in:

```text
tests/cognitive/
```

Tests challenge cognitive structure, responsibility, competence, and its boundaries with authority and provenance. They do not imply runtime implementation.


## Current Baseline

```text
Cognitive Baseline: CB-004
Manifest: layers/cognitive/production/README.md
Evidence: tests/runtime/runtime-production-admission-review-001.md
Admission: tests/runtime/runtime-production-admission-review-001.md
Result: admission pressure 55 PASS / 0 FAIL; convergence 30 PASS / 0 FAIL
Dependencies: AB-003, PB-001, PRB-002, and RTB-001
```

The Cognitive, Authority, Provenance, Procedure, and Runtime layers have admitted semantic baselines.
