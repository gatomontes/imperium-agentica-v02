# Cognitive Layer

## Purpose

The cognitive layer contains Imperium's conceptual entities, boundaries, artifact contracts, authority distinctions, and cognitive maps.

It does not define runtime architecture, service topology, database schema, deployment infrastructure, or UI implementation.

## Structure

```text
layers/cognitive/
├── drafts/
└── production/
```

### Drafts

`drafts/` contains shaped cognitive artifacts still under evaluation.

Approval of a diagram or terminology does not by itself promote an artifact. Drafts remain contestable and may be revised, split, merged, demoted, or removed as scenarios expose defects.

### Production

`production/` contains cognitive artifacts admitted for current active use after sufficient scenario evidence.

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

Tests challenge cognitive structure and authority. They do not imply runtime implementation.
