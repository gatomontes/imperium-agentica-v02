# Provenance Contract

## Status

Draft.

Derived from `drafts/provenance-origin-investigation.md`.

Evidence so far: theoretical Provenance Test Run P-001 — 8 PASS / 0 FAIL.

This contract does not make an artifact traceable by existing.

## Core Invariant

```text
No derived artifact or action may erase its lineage.

No missing lineage may be repaired by similarity,
plausibility, content matching, or authority.
```

## Provenance Subject

The artifact, record, action, decision, transformation, observation, or grant whose lineage is described.

## Provenance Assertion

A bounded statement connecting one subject to one source or lineage event.

Candidate relations:

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

Relations must remain semantically distinct.

## Provenance Chain

The traversable set of assertions connecting the subject to its cited origins.

A chain may be complete, partial, contested, broken, mismatched, or unresolved.

## Minimum Semantic Content

```text
Subject identity and version
Relation
Source identity and version
Producing or observing responsibility
Mission and subordinate correlation when applicable
Transformation description when applicable
Authority reference when the act required authority
Time or ordering reference
Custody or handoff reference when applicable
Supersession reference
Known gaps or contested links
Status
```

This is not a graph, event-store, ledger, or database schema.

## Provenance Findings

```text
PROVENANCE_COMPLETE
PROVENANCE_PARTIAL
PROVENANCE_CONTESTED
PROVENANCE_BROKEN
PROVENANCE_SCOPE_MISMATCH
PROVENANCE_SOURCE_UNRESOLVED
```

These findings do not determine truth, quality, authority, or mission success.

## Semantic Fidelity

Citation alone does not prove faithful derivation.

A derived artifact must not silently omit, invert, or replace a required source condition while claiming derivation from that source.

Semantic-fidelity requirements must remain bounded to the applicable artifact contract. Provenance does not become a universal proof engine.

## Authority Boundary

A provenance assertion may record that a subject was `AUTHORIZED_UNDER` a grant.

It does not determine whether the Principal was competent, the grant effective, or the action in scope.

Authority consumes provenance about its sources.

Provenance consumes artifact identities and authority references.

Neither owns the other.

## Artifact Boundary

Provenance requires stable subject and source identities and versions.

It does not define what those artifacts mean.

Canonical artifact-definition origin remains unresolved and external to this contract.

## Unresolved Questions

- What minimum assertions are required for every derived artifact?
- Which assertions are optional by artifact class?
- Who may revise the canonical relation vocabulary?
- Is semantic fidelity part of provenance or an artifact-specific assurance rule?
- What disposition applies to authorized but provenance-partial urgent action?
- Does custody require an independent relation when transformation and transfer are already recorded?

## Non-Admissions

This draft does not admit:

- truth verification
- evidence sufficiency
- authority validation
- artifact schemas
- universal audit machinery
- event stores or knowledge graphs
- hashes, signatures, or cryptographic guarantees
- databases, APIs, services, or runtime logging
- a provenance institution or Officer

## Required Next Evidence

- independent relation and status tests
- transformation and supersession tests
- authority-provenance convergence tests
- artifact-identity dependency tests
- semantic-fidelity boundary tests
- minimality test against a general information-and-record layer
