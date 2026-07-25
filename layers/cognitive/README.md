# Cognitive Layer

## Purpose

The cognitive layer contains Imperium's conceptual entities, responsibilities, competence boundaries, cognitive artifact meanings, and cognitive maps.

It does not define runtime architecture, service topology, database schema, deployment infrastructure, or UI implementation.

## Structure

```text
layers/cognitive/
├── drafts/
├── production/
└── dumpster/
```

### Drafts

`drafts/` contains shaped cognitive artifacts and retained source drafts. Admission does not erase their traceable history.

Approval of a diagram or terminology does not by itself promote an artifact. Drafts remain contestable and may be revised, split, merged, demoted, or removed as scenarios expose defects.

### Production

`production/` contains the active CB-CURRENT pointer and cognitive artifacts admitted for current active use after sufficient scenario evidence.

Active standard: `CB-CURRENT`; current numbered snapshot: `CB-007`. The active pointer is `layers/cognitive/production/CB-CURRENT.md`. The numbered CB-007 manifest is retained as historical admission evidence.

CB-CURRENT cites Authority Baseline `AB-003`, Provenance Baseline `PB-001`, Procedure Baseline `PRB-003`, and Runtime Baseline `RTB-002` for contracts native to those parallel concerns. Numbered CBs preserve admitted progression; CB-DENIED records candidates never admitted.

Production means admitted, not permanent. An artifact may return to drafts when later evidence contests it.

### Dumpster

`dumpster/` contains non-authoritative material removed from active Cognitive reading surfaces. It preserves provenance but does not contribute current semantic authority.

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
Cognitive Standard: CB-CURRENT
Current snapshot: CB-007
Manifest: layers/cognitive/production/CB-CURRENT.md
Historical snapshot: layers/cognitive/production/README.md
Evidence: tests/runtime/runtime-maintenance-production-admission-review-001.md
Admission: tests/runtime/runtime-maintenance-production-admission-review-001.md
Result: focused pressure 15 PASS / 0 FAIL; convergence 35 PASS / 0 FAIL; repository regression PASS; empirical harness 11 PASS / 0 FAIL
Dependencies: AB-003, PB-001, PRB-003, and RTB-002
```

The Cognitive, Authority, Provenance, Procedure, and Runtime layers have admitted semantic baselines.
