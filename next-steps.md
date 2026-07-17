# Next Steps

## Status

Authority and Provenance boundary proposals are active in `current-step.md` and awaiting operator judgment.

This file is not doctrine, a roadmap, or architecture.

It is an ordered list of candidate next actions.

When a step becomes current, remove it from this file and place it in `current-step.md`. Do not duplicate active work across both files.

---

## Queue

### 1. Materialize approved Authority and Provenance layer drafts

Activation condition:

The operator approves the names, boundaries, repository shapes, and one-contract minimum.

Expected creation:

```text
layers/authority/README.md
layers/authority/drafts/README.md
layers/authority/production/README.md
layers/authority/drafts/authority-contract.md

layers/provenance/README.md
layers/provenance/drafts/README.md
layers/provenance/production/README.md
layers/provenance/drafts/provenance-contract.md
```

Constraints:

- no institution required
- no Codex, Vellum, station logs, or mission-wide log
- no runtime implementation
- no migration of CB-001 production files
- draft contracts cite existing evidence without claiming production admission

---

### 2. Establish independent Authority and Provenance tests

Reason:

Each draft contract must survive its own pressure suite before cross-layer convergence testing.

Candidate locations after drafts exist:

```text
tests/authority/
tests/provenance/
```

Activation condition:

The approved layer structures and first draft contracts exist.

---

### 3. Resolve canonical artifact-definition origin

Reason:

Authority and provenance reference artifact identity and version, but neither defines artifact meaning.

Questions:

- Is artifact meaning adequately cognitive?
- Should entity files remain canonical for their products?
- What role should `production-artifacts.md` retain?
- Does an information-contract layer have an independent question and lifecycle?
- How are definition conflicts resolved without making maps or procedures authoritative?

Activation condition:

Authority and Provenance draft boundaries exist.

---

### 4. Re-evaluate CB-001 placement without silent revision

Reason:

`lifecycle.md` has a procedural native concern. Authority, provenance, and artifact contracts also currently reside inside the cognitive baseline.

Expected product:

- KEEP, MOVE, SPLIT, or DEMOTE recommendation for contested files
- dependency impact analysis
- explicit operator approval
- new cognitive test run before any production movement

Activation condition:

Parallel dependency-layer boundaries and artifact-definition origin are resolved.

---

### 5. Redefine the procedural-layer boundary

Reason:

Procedure is only what is supposed to happen, in what order, and under which conditions.

It consumes externally defined responsibility, authority, artifact, provenance, and evidence dependencies.

Activation condition:

Required dependency origins are admitted or explicitly unresolved with an authorized stop rule.

---

### 6. Trace the first narrow procedure

Recommended candidate:

```text
Theatre return
→ Lazaretto sanitation
→ Curia session admission
→ Situation Picture
→ Executive Mandate verification
→ CEO decision
→ Curia Minute
→ Muster outbound instruction
```

Activation condition:

The reduced procedural boundary and structure are approved.

---

### 7. Establish procedural testing and admission

Activation condition:

At least one draft procedure exists.

---

### 8. Reconsider provenance devices only if a representation gap appears

Candidates include Codex, Vellum, station logs, a mission-wide record, or smaller unnamed devices.

Activation condition:

A scenario proves that required lineage cannot be preserved or accessed through existing artifacts.

A device must answer a demonstrated access or representation gap. It must not be created merely because provenance exists.

---

### 9. Reconsider Vellum only if a distinct mission-wide record gap appears

Activation condition:

Existing linked artifacts and Mission Correlation Spine cannot provide required mission-wide traversability without inference.
