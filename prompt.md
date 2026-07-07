# Imperium Agentica v02 — Codex Cloud Prompt

Use this prompt when starting a Codex Cloud session for this repository.

---

## Load

Load `imperium-agentica-v02`.

The repository is the source of truth.

Do not continue from memory, prior conversations, prior versions, familiar patterns, or aesthetic preference.

This is not Imperium v01 continued by inertia.

This is Day 0.

The first law is:

> **Assume nothing.**

Initial command:

> **Assume nothing. Build only what survives.**

---

## Required Reading Order

Before proposing architecture, writing code, creating files, naming concepts, moving files, or continuing prior work, read:

1. `README.md` — constitutional orientation.
2. `current-step.md` — active operational context.
3. `next-steps.md` — pending operational queue.
4. `ideas.md` — raw pre-draft candidates, only if relevant.
5. `drafts/` — shaped but unproven artifacts, only if relevant.

Treat `README.md` as constitutional doctrine.

Treat `current-step.md` and `next-steps.md` as continuity surfaces, not doctrine and not a roadmap.

Treat `ideas.md` as pre-draft staging, not doctrine, not a backlog, and not an archive.

Treat `drafts/` as shaped but unproven work, not admitted architecture.

---

## Main Objective

Imperium exists to discover, test, strengthen, and refine behaviors that produce reliable agentic patterns.

Its ultimate direction is the engineering, governance, forging, deployment, and continuous refinement of fortified archetypes and the operatives formed from them.

But v02 does not begin by assuming that ecosystem.

Build only what strengthens the proven pattern or the operative formed from it.

Anything else is conceptual mass.

---

## Core Restraint

No abstraction is sacred.

No folder is inevitable.

Every abstraction must justify its existence through observed behavior.

Every file must have a reason to exist.

Every name must be delayed until the thing it names has proven stable.

Behavior leads.

Nouns follow.

---

## Seed Process

Use this invariant process:

```text
Observation
→ Explicit Assumptions
→ Evidence
→ Decision
→ Outcome
→ Revision
```

For every proposed change, state:

1. What observed problem requires it?
2. What assumption does it introduce?
3. What behavior proves it is necessary?
4. What is the smallest implementation that tests it?
5. What evidence would force its removal?
6. How does it strengthen the proven pattern or the operative formed from it?
7. Which governance scope does it belong to, if any?

If these cannot be answered, the concept is not ready.

---

## Repository Layout Principle

The repository layout is provenance.

A file's location records its present burden of proof.

Movement is not graduation.

Movement is current evidence.

No location is permanent.

No admission is irreversible.

No structure is sacred.

A concept may return to an earlier state when later complexity contests it.

It must then earn promotion again.

---

## Idea Lifecycle

`ideas.md` is the pre-draft staging surface.

Use it for raw candidate ideas that are too unstable, vague, small, or early for their own artifact.

When an idea becomes a draft, is rejected, is merged, is absorbed, or is superseded, remove it from `ideas.md`.

The repository history preserves movement.

---

## Draft Lifecycle

`drafts/` is the default home for shaped but unproven artifacts.

A draft has enough form to be reviewed, but not enough evidence to be admitted as architecture.

Drafts may be promoted, demoted, renamed, split, merged, retired, restored, or removed as evidence changes.

Do not treat a draft's existence as proof.

---

## Progress Lifecycle

Progress is not memory.

Progress must be visible.

`current-step.md` describes the active operational focus.

It must provide enough context for a future LLM session to continue without relying on chat history.

`next-steps.md` is an ordered queue of candidate next actions.

It is not a roadmap.

When a step becomes current, remove it from `next-steps.md` and place it in `current-step.md`.

Do not duplicate active work across both files.

If there is no active step, `current-step.md` must say so explicitly.

These files do not admit a planning layer.

They exist to reduce confusion for future LLM sessions.

---

## Governance Scope

Governance is not singular.

Only Imperium governance is currently under draft.

Imperium governance concerns admission, movement, revision, demotion, promotion, retirement, removal, and restoration of concepts within Imperium itself.

Imperium governance is global in scope, but not yet a global layer.

Archetype governance remains directional until archetypes exist.

Operative governance remains directional until operatives exist.

---

## Work Discipline

Work in small, reviewable batches.

Prefer documentation before code when behavior is not yet proven.

Prefer deletion over accumulation.

Prefer explicit assumptions over elegant architecture.

Prefer a tiny executable proof over a speculative framework.

Do not create a full application scaffold until the first behavior demands one.

Do not install dependencies until a concrete behavior requires them.

Do not introduce infrastructure until local proof becomes insufficient.

---

## Write Discipline

Before writing, moving, renaming, or removing repository files, require explicit approval in the current conversation.

When writing is approved, keep the batch narrow.

At the end of each batch, summarize:

- files changed
- assumptions introduced
- behavior proven
- risks remaining
- recommended next smallest step

Commit with a clear message.

Push when the batch is complete.
