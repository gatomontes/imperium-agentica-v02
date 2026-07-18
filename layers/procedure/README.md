# Procedure Layer

## Status

Reduced boundary approved on 2026-07-18.

Procedure Baseline `PRB-001` is admitted for current procedural use.

Manifest: `layers/procedure/production/README.md` — 3 files.

Admission: `tests/procedure/production-admission-review-001.md`.

The admitted layer uses the reduced definition:

```text
what is supposed to happen,
in what order,
under which conditions
```

## Core Question

```text
Given externally defined actors, artifacts, findings, permissions, and states:
what transition is expected next,
what must precede it,
and what conditions select, withhold, repeat, or end the path?
```

## Purpose

The Procedure layer composes admitted definitions into expected sequences.

It does not originate the definitions it composes.

A procedure may name an actor, artifact, finding, grant, state, or record only by citing the native contract that already defines it.

## Structure

```text
layers/procedure/
├── drafts/
└── production/
```

## May Define

Procedure may define:

- entry conditions
- expected ordering and precedence
- required transitions among externally defined states
- branch and continuation conditions
- wait, withhold, stop, retry, and return paths
- required handoffs between externally defined responsibilities
- exit and completion conditions
- the consequence of receiving an externally defined finding

## May Not Define

Procedure may not originate or repair:

- actors, responsibility, competence, or cognitive ownership
- authority source, grant, permission, delegation, or validity
- identity, correlation, lineage, custody, version, or provenance findings
- artifact meaning, required semantic content, or native ownership
- truth, proof, evidence sufficiency, or acceptance standards
- organizational or asset ownership
- runtime state machines, services, queues, schedulers, storage, or execution
- missing definitions in another layer

## Citation Rule

```text
native contract defines the noun
Procedure connects the defined nouns with expected verbs
Runtime may later implement the transitions
```

If a required noun or condition has no canonical origin, the procedure is blocked. It must expose the gap rather than assume a definition.

## Parallel Boundaries

Procedure consumes Cognitive, Authority, and Provenance definitions without subordinating them.

It may require all three findings for one transition. It may not infer that one substitutes for another.

## Admission

A Procedure artifact may enter production only when:

- every actor and responsibility has a cited cognitive origin
- every permission and authority condition has a cited Authority origin
- every identity and lineage condition has a cited Provenance origin
- every artifact and state has a cited native semantic origin
- every evidence or proof condition cites an admitted sufficiency rule
- ordering adds no hidden responsibility or permission
- missing definitions block admission explicitly
- pressure tests cover alternate, withheld, failed, repeated, and terminal paths
- no runtime implementation is implied
