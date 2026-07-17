# Artifact-Definition Origin Investigation

## Status

Draft investigation.

This document does not admit an artifact, information, record, schema, or data layer.

It asks where the semantic definition of an artifact belongs after cognitive, authority, and provenance concerns are separated.

---

## Core Question

```text
What does this artifact mean,
which concern owns that meaning,
and which file is its canonical definition?
```

Artifact meaning is not:

- the responsibility to produce it
- the authority to issue or act on it
- its provenance
- its procedural position
- its runtime schema or storage representation

These concerns may meet in one artifact without sharing ownership.

---

## Current Problem

CB-001 distributes artifact definitions among:

- entity files
- dedicated contract files
- `production-artifacts.md`
- `cognitive-map.md`
- `lifecycle.md`

This creates possible competing origins.

The authority and provenance draft layers now define native contracts of their own.

A central artifact layer might appear attractive, but it could strip contracts from the concern that gives them meaning.

---

## Candidate Models

### Model A — Central Artifact Layer

Every semantic artifact contract lives in one artifact or information layer.

Risk:

- separates Executive Mandate from authority semantics
- separates Provenance Assertion from provenance semantics
- separates Work Specification from Castellan mission-formation meaning
- creates a universal contract warehouse
- encourages schema design before runtime

### Model B — Native-Concern Ownership

Each artifact contract originates in the layer whose core question gives the artifact its meaning.

Examples:

```text
Profession Specification → cognitive
Authority Grant → authority
Provenance Assertion → provenance
Procedure artifact → procedural
Runtime representation → runtime
```

Cross-layer artifacts choose one native owner and cite other layer contracts.

A catalog indexes canonical owners but does not redefine them.

### Model C — Dual Ownership

An artifact is simultaneously defined in every concern it touches.

Risk:

- competing canonical definitions
- synchronized revision burden
- silent divergence
- no clear admission authority

---

## Candidate Canonical-Origin Rule

```text
One artifact contract has one native concern.

Its canonical semantic definition lives in that concern's layer.

Other layers may reference or constrain it,
but may not restate themselves into co-ownership.
```

A composite artifact may cite contracts from multiple layers while retaining one native owner.

Native ownership is determined by the artifact's core question, not by who stores it, where it appears in a sequence, or how many concerns it references.

---

## File Roles

### Native Contract

Defines what the artifact means, its semantic obligations, distinctions, and invalidation conditions.

### Producer Entity File

Defines which cognitive responsibility produces, stewards, holds, or delivers the artifact.

It may summarize the product but should cite the native contract when one exists.

### Cross-Layer Constraint

Defines a constraint from another concern.

Examples:

- authority layer defines which grant permits issuance
- provenance layer defines required lineage
- procedure defines where an admitted artifact is expected
- runtime defines implementation representation

A constraint does not become artifact ownership.

### Catalog

Indexes artifact names and canonical contract locations.

It must not become a competing semantic source.

### Map Or Lifecycle

May show orientation or expected placement.

It never defines artifact meaning.

---

## Composite Artifact Examples

### Curia Minute

Native concern candidate:

- cognitive, because the Chief of Staff's Curial Orchestration produces the record of the session and CEO decision

Referenced contracts:

- authority finding and Executive Mandate
- provenance chain
- artifact-specific evidence and dissent requirements

Authority does not own the whole Minute merely because a decision is recorded.

Provenance does not own the whole Minute merely because lineage is required.

### Deployment Package

Native concern candidate:

- cognitive, because Muster's mission-assembly responsibility gives the package meaning

Referenced contracts:

- mission authority and launch authority
- operative and grant provenance
- future procedural expectations

### Executive Mandate

Native concern:

- authority

The CEO and Curia cognitive files reference it.

The provenance layer traces it.

The procedure may require an effective mandate finding.

### Provenance Assertion

Native concern:

- provenance

Artifact contracts identify which assertions are required.

Authority contracts may require provenance findings.

---

## Artifact Identity And Version

The native contract defines what counts as the artifact and which semantic changes require a new version.

Provenance defines lineage between identities and versions.

Runtime later implements identifiers and storage.

```text
artifact meaning defines version significance
provenance preserves version lineage
runtime represents the version
```

No layer substitutes for another.

---

## Required-Lineage Rule

The blocked provenance test can be resolved without giving provenance ownership of artifact meaning:

```text
native artifact contract
→ declares required provenance relations

provenance layer
→ evaluates whether those declared relations are present and coherent
```

Therefore, `PROVENANCE_COMPLETE` is always complete relative to a cited artifact-contract version.

There is no context-free universal completeness.

---

## Preliminary Disposition

```text
CENTRAL ARTIFACT LAYER: NOT JUSTIFIED
NATIVE-CONCERN OWNERSHIP RULE: JUSTIFIED
CATALOG: INDEX ONLY
MAP AND LIFECYCLE: NON-ORIGINATING
```

The existing `production-artifacts.md` should eventually become a canonical-location index or be split if it continues to define semantics.

No production change is authorized by this draft.

---

## Consequences For CB-001

Potential later movements or splits:

- Executive Mandate semantics may move to the authority layer while cognitive role files retain references.
- Shared provenance semantics may move to the provenance layer while cognitive files declare artifact-specific lineage needs.
- `production-artifacts.md` may lose competing definitions and retain only an index plus cognitive-native contracts.
- `lifecycle.md` remains contested as procedural material.
- entity files remain cognitive origins for responsibility, not universal artifact contracts.

Every movement requires dependency analysis, new tests, and explicit operator approval.

---

## Invalidation Conditions

Revise or reject the rule if:

- a composite artifact cannot identify one native core question
- cross-layer constraints require genuine co-ownership
- catalogs must define shared semantics to remain useful
- native ownership causes duplicated universal contract rules
- the model cannot resolve version significance without a central artifact authority
