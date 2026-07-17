# Provenance-Origin Investigation

## Status

Draft investigation.

This document does not admit a provenance layer, ledger service, event store, database schema, cryptographic system, runtime audit implementation, or universal proof standard.

It examines what provenance means in Imperium, where CB-001 currently defines it, and whether the concern has an independent contract lifecycle.

---

## Core Question

```text
What is this thing,
where did it come from,
what happened to it,
and can its lineage be followed without inference?
```

Provenance is not truth, evidence sufficiency, authority, ownership, custody, correlation, versioning, or audit.

It may contain or connect those references without becoming them.

---

## First Invariant

```text
No derived artifact or action may erase its lineage.

No missing lineage may be repaired by similarity,
plausibility, content matching, or authority.
```

A traceable false claim remains false.

A valid authority grant with broken lineage remains untraceable.

A complete audit log does not prove authorization.

---

## Provenance Relations Found In CB-001

### Derivation Lineage

CB-001 requires downstream artifacts to cite exact upstream versions.

Examples:

- Persona Candidate → profession, doctrine, canon
- Operative → admitted persona
- Deployment Package → operative, mission, inquest, grants
- Final Report → closure record, Minute, cited evidence

This is derivation provenance.

### Mission Correlation

Mission Identity and subordinate identities prevent state from crossing missions by inference.

Examples:

- Deployment
- Operative Binding
- Muster Instance
- Curia Session
- provider ticket
- closure
- release

Correlation is scope provenance. It does not by itself prove derivation or truth.

### Transformation History

Lazaretto distinguishes:

- raw
- sanitized
- redacted
- quarantined
- released

Every transformation must be recorded.

Transformation history is provenance. Sanitation is not substantive verification.

### Provider Observation History

Armory and Locksmith Intervention Ledgers preserve observed stages without inferring later stages.

Examples:

- authorization
- authentication
- operation
- delivery
- mission interpretation

A later stage does not rewrite an earlier one.

### Version And Supersession History

CB-001 requires versioned artifacts and supersession instead of overwrite.

Historical decisions remain bound to the versions in force when they occurred.

Versioning supports provenance but is not the whole of provenance.

### Custody And Handoff

Credential custody remains with Locksmith.

Mission artifacts cross specific ports and surfaces.

Custody is one provenance dimension. Custody does not create ownership or authority.

### Authority Lineage

Curia Minutes cite the CEO specification, Standing Curia Assignment, and Executive Mandate versions.

An authority grant may cite a parent grant or external Authority Basis.

Authority lineage requires provenance, but provenance does not decide whether the authority is valid.

---

## Current Distributed Origins

| Provenance concern | Current strongest source |
|---|---|
| General upstream traceability | `production-artifacts.md` |
| Mission correlation and collision | `mission-concurrency-and-isolation-contract.md` |
| Provider-stage fidelity | `provider-intervention-ledgers.md` |
| Raw-to-sanitized transformation | `lazaretto.md` |
| Officer and mandate version snapshots | `ceo-president.md`, `chief-of-staff.md`, `standing-curia-role-requirements.md` |
| Assignment lineage | `session-assignment.md` |
| Closure and release exact match | `mission-closure-and-release-contract.md` |
| Artifact-specific upstream versions | entity and artifact contract files |

The rules are strong.

The origin is not unified.

No file currently establishes which provenance definition governs when two contracts differ, who may revise the shared rules, or what minimum lineage every derived artifact must preserve.

---

## Candidate Minimal Provenance Contract

This is a hypothesis for testing, not admitted terminology or schema.

### Provenance Subject

The artifact, record, action, decision, transformation, observation, or grant whose lineage is being described.

### Provenance Assertion

A bounded statement about one lineage relation.

Possible relations:

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

The vocabulary must remain small and semantically distinct.

### Provenance Chain

The traversable set of assertions connecting the subject to its cited origins.

A chain may be incomplete, contested, or broken.

### Minimum Semantic Content

Possible content:

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

This is a semantic contract, not a storage schema.

---

## Provenance Status Findings

Candidate findings:

```text
PROVENANCE_COMPLETE
PROVENANCE_PARTIAL
PROVENANCE_CONTESTED
PROVENANCE_BROKEN
PROVENANCE_SCOPE_MISMATCH
PROVENANCE_SOURCE_UNRESOLVED
```

These findings do not determine truth, quality, authority, or mission success.

A procedure may reference the applicable finding but must not calculate or redefine it.

---

## Origin And Revision

A provenance rule requires a canonical source.

Three candidates must be tested:

### Candidate P1 — Cognitive Cross-Cutting Contract

Provenance remains in CB-001 as a cognitive invariant, with one dedicated contract defining the shared minimum and entity files defining specializations.

Advantages:

- no new layer
- preserves cognitive distinctions
- smallest structural change

Risk:

- information lineage may continue to be mixed with entity responsibility

### Candidate P2 — Information-And-Record Contract Surface

Provenance becomes one concern within a broader artifact and record domain.

Advantages:

- artifact identity, versioning, supersession, lineage, custody, and correlation can be governed together
- may resolve canonical artifact-definition ownership

Risk:

- may become a premature data-model layer

### Candidate P3 — Independent Provenance Layer

Provenance receives its own layer.

Advantages:

- strongest separation

Risk:

- no independent actor is demonstrated
- likely duplicates information contracts
- high conceptual mass

Current hypothesis:

> P2 is more plausible than P3, but P1 must be disproven before any extraction.

---

## Authority Boundary

Authority and provenance are parallel.

At their convergence:

```text
Authority asks whether the action was permitted.
Provenance asks whether the grant and action lineage can be followed.
```

Authority may cite:

- Principal
- Authority Basis
- parent grant
- grant version
- decision or instruction

Provenance records those relations.

Provenance does not declare the Principal competent, the grant valid, or the action authorized.

---

## Proof Boundary

Provenance can show:

- which evidence was cited
- who produced it
- what transformations occurred
- which version was used
- where correlation broke

Provenance cannot show:

- that the evidence is true
- that the evidence is sufficient
- that the conclusion follows
- that the mission succeeded

Those remain evidence and assurance questions.

---

## Pressure Tests

### P-01 — Same Content, Different Mission

Two packets contain identical text but carry different Mission Identities.

Expected:

```text
content similarity does not merge provenance
foreign packet rejected or quarantined
```

### P-02 — Sanitized Packet Without Raw Reference

A safe-looking sanitized packet lacks a preserved raw source and transformation record.

Expected:

```text
PROVENANCE_BROKEN
substantive use withheld or explicitly constrained
sanitation is not inferred
```

### P-03 — Valid Grant Without Parent Lineage

An Authority Grant appears effective but cites an unresolved Authority Basis or missing parent grant.

Expected:

```text
PROVENANCE_SOURCE_UNRESOLVED
authority evaluation independently returns unresolved root
neither concern repairs the other
```

### P-04 — Provider Operation Completed

A provider ledger records operation `COMPLETED` but no result-delivery observation.

Expected:

```text
operation provenance preserved
delivery remains UNKNOWN or NOT_OBSERVED
mission success not inferred
```

### P-05 — Superseding Artifact

A new version corrects an earlier artifact.

Expected:

```text
new identity or version cites SUPERSEDES
prior artifact remains historically addressable
past decisions retain the version originally used
```

### P-06 — Final Report Omits Accepted Unresolved Matter

The Final Report cites the closure record but omits a recorded unresolved obligation.

Expected:

```text
lineage may be traceable
derivation fidelity fails
report cannot silently replace the closure record
```

This tests whether provenance requires semantic fidelity constraints beyond mere citation.

### P-07 — Complete Provenance, False Claim

A Theatre claim has complete producer, time, correlation, and transformation lineage but is later disproven.

Expected:

```text
PROVENANCE_COMPLETE
claim false under separate evidence evaluation
no retroactive erasure of lineage
```

### P-08 — Valid Action, Missing Provenance

An action was genuinely authorized, but its grant version and instruction lineage were not preserved.

Expected:

```text
authority may have existed historically
PROVENANCE_BROKEN
later procedure cannot infer the missing lineage
```

---

## Preliminary Finding

Provenance has:

- reusable semantics
- cross-entity application
- independent failure states
- version and supersession behavior
- pressure scenarios distinct from authority and proof

It therefore deserves independent testing.

However, no independent provenance actor or institution is demonstrated.

The strongest current hypothesis is that provenance belongs to a future information-and-record contract surface rather than its own sovereign layer.

No extraction is authorized yet.

---

## Invalidation Conditions

Discard or revise the candidate model if:

- relation vocabulary becomes a runtime graph schema
- citation is confused with semantic fidelity
- provenance begins deciding truth or authority
- every artifact receives bureaucratic lineage fields without demonstrated need
- an existing CB-001 contract already provides one adequate canonical origin
- an independent provenance layer adds no behavior beyond information contracts
