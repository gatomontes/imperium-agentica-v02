# Terminology

## Status

Draft.

This file standardizes language to reduce ambiguity for operators and LLM sessions.

It does not admit architecture.

It does not prove that any named concept exists.

---

## Maxim

Language is architecture pressure.

Standardize terms before terms start pretending to be structure.

---

## Canonical Definition Mechanism

A canonical definition is marked with the `@canon:` prefix.

Format:

```text
@canon:<term-id>
Term: <display term>
Status: <term status>
Definition: <canonical definition>
Use when: <approved usage>
Do not use when: <restricted usage>
Notes: <optional clarification>
```

A term with an `@canon:` marker is the canonical definition for that term inside Imperium.

When an LLM encounters a controlled term, it must resolve the term here before using, redefining, renaming, or extending it.

If a term is not listed here, the LLM must not assume it is canonical.

If a proposed term conflicts with an existing canonical definition, the conflict must be surfaced before any write.

---

## Term Statuses

- **Constitutional** — governing orientation already established by `README.md`.
- **Operational** — used to coordinate work, not doctrine or architecture.
- **Draft** — shaped but unproven.
- **Directional** — points toward intended future architecture but is not admitted.
- **Restricted** — avoid unless context explicitly requires it.
- **Deprecated** — historical or superseded language.

---

## Canonical Terms

@canon:imperium
Term: Imperium
Status: Constitutional
Definition: The project concerned with discovering, testing, strengthening, and refining behaviors that produce reliable agentic patterns.
Use when: Referring to the whole project or its evolving system of artifacts, practices, and future mechanisms.
Do not use when: Referring to a specific future subsystem that has not been admitted.
Notes: Imperium v02 is a reset by discipline, not continuation by inertia.

@canon:assume-nothing
Term: Assume nothing
Status: Constitutional
Definition: The first law of Imperium v02; no concept, file, folder, name, behavior, or architecture is accepted without observed need and explicit assumptions.
Use when: Evaluating any proposed addition or continuation.
Do not use when: Treating prior conversations or previous versions as sufficient evidence.

@canon:conceptual-mass
Term: Conceptual mass
Status: Constitutional
Definition: Accumulated language, abstractions, files, structures, or doctrine whose weight exceeds proven behavior.
Use when: Identifying complexity that may be forming before structural integrity.
Do not use when: Criticizing necessary complexity that has survived evidence.

@canon:structural-integrity
Term: Structural integrity
Status: Constitutional
Definition: The degree to which an Imperium concept, artifact, or structure is supported by observed behavior, evidence, and removal criteria.
Use when: Testing whether complexity has earned its place.
Do not use when: Treating elegance, aesthetics, or familiarity as proof.

@canon:idea
Term: Idea
Status: Operational
Definition: A raw candidate thought, pressure, possibility, or concern that has not earned its own artifact.
Use when: Capturing something too unstable, vague, small, or early for `/drafts`.
Do not use when: The concept already has enough shape to become a draft.
Notes: Default location is `ideas.md`.

@canon:draft
Term: Draft
Status: Operational
Definition: A shaped but unproven artifact with enough form to review, but not enough evidence to treat as admitted architecture.
Use when: A concept has outgrown `ideas.md` but has not earned admission.
Do not use when: Treating existence as proof.
Notes: Default location is `drafts/`.

@canon:current-step
Term: Current step
Status: Operational
Definition: The active operational focus that gives future LLM sessions enough context to continue without relying on chat history.
Use when: Referring to the work currently being executed or evaluated.
Do not use when: Describing a roadmap or broad plan.
Notes: Default location is `current-step.md`.

@canon:next-step
Term: Next step
Status: Operational
Definition: A candidate operational action waiting behind the current step in an ordered queue.
Use when: Referring to pending operational work that may become current.
Do not use when: Describing a committed roadmap.
Notes: Default location is `next-steps.md`.

@canon:roadmap
Term: Roadmap
Status: Restricted
Definition: A projected plan toward a known destination.
Use when: Explicitly contrasting with `next-steps.md`.
Do not use when: Describing Imperium's operational queue.
Notes: Imperium v02 does not currently maintain a roadmap.

@canon:repository-provenance
Term: Repository provenance
Status: Constitutional
Definition: The principle that file location and movement record current evidentiary state, not permanent category.
Use when: Explaining why files begin, move, demote, promote, or disappear.
Do not use when: Treating folder layout as conventional organization.

@canon:imperium-governance
Term: Imperium governance
Status: Draft
Definition: The decision behavior governing admission, movement, revision, demotion, promotion, retirement, removal, and restoration of concepts within Imperium itself.
Use when: Evaluating concepts at the repository or system-evolution level.
Do not use when: Governing archetype validity or operative execution.
Notes: Global in scope, not yet a global layer.

@canon:archetype-governance
Term: Archetype governance
Status: Directional
Definition: A future governance scope that would concern the validity, strengthening, weakening, deployment readiness, revision, and retirement of reusable agentic patterns.
Use when: Discussing a possible future scope after archetypes exist.
Do not use when: Assuming such governance is already admitted.

@canon:operative-governance
Term: Operative governance
Status: Directional
Definition: A future governance scope that would concern permissions, constraints, evidence duties, stop conditions, drift signals, and revision triggers for patterns under execution.
Use when: Discussing a possible future scope after operatives exist.
Do not use when: Assuming such governance is already admitted.

@canon:archetype
Term: Archetype
Status: Directional
Definition: A reusable agentic pattern.
Use when: Referring to Imperium's intended future pattern form.
Do not use when: Naming a current implemented artifact type.
Notes: Archetypes are directional until evidence admits them.

@canon:fortified-archetype
Term: Fortified archetype
Status: Directional
Definition: The intended enduring artifact of Imperium: a reusable agentic pattern strengthened by evidence, constraints, governance, and refinement.
Use when: Referring to Imperium's main objective.
Do not use when: Claiming that the artifact type already exists.

@canon:operative
Term: Operative
Status: Directional
Definition: A deployed or executable formation derived from a fortified archetype.
Use when: Referring to the intended future execution form of a pattern.
Do not use when: Claiming operatives currently exist.

@canon:forge
Term: Forge
Status: Directional
Definition: A possible future mechanism or process for forming, strengthening, or refining archetypes and operatives.
Use when: Referring to future direction.
Do not use when: Assuming an admitted subsystem.

@canon:runtime
Term: Runtime
Status: Restricted
Definition: An execution environment or service for running admitted behavior.
Use when: A concrete behavior proves execution infrastructure is required.
Do not use when: Prematurely scaffolding an application or service.

@canon:agent
Term: Agent
Status: Restricted
Definition: A generic external term for an autonomous or semi-autonomous software actor.
Use when: Discussing external agent systems or historical language.
Do not use when: Naming Imperium components before behavior proves the term necessary.

---

## Batch Summary

Files changed:

- `drafts/terminology.md`

Assumptions introduced:

- Controlled terminology will reduce operator and LLM ambiguity.
- `@canon:` markers can act as pseudo-variables for canonical definitions.
- Canonical definitions can remain draft-bound until proven.

Behavior proven:

- Not yet proven.
- This draft creates a testable surface for canonical term resolution.

Risks remaining:

- The canonical marker may be too formal.
- The term list may become doctrine before use proves it.
- Some definitions may be too broad or too directional.

Recommended next smallest step:

- Update `prompt.md` so future LLM sessions must resolve controlled terms through `drafts/terminology.md` before using or extending them.
