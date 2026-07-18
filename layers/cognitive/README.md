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

Current baseline: `CB-003` — 33 files, admitted 2026-07-18 under Cognitive Production Admission Review 005 and Cognitive Constitutional Run 018.

CB-003 cites Authority Baseline `AB-002`, Provenance Baseline `PB-001`, and Procedure Baseline `PRB-001` for contracts native to those parallel concerns.

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
Cognitive Baseline: CB-003
Manifest: layers/cognitive/production/README.md
Evidence: tests/cognitive/constitutional-test-run-018.md
Admission: tests/cognitive/production-admission-review-004-cb-002.md
Result: 33 PASS / 0 FAIL
Dependencies: AB-002, PB-001, and PRB-001
```

The Cognitive, Authority, Provenance, and Procedure layers have admitted baselines. Runtime remains unadmitted.
