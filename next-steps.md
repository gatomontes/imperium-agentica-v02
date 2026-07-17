# Next Steps

## Status

CB-001 dependency-domain origin analysis is active in `current-step.md`.

This file is not doctrine, a roadmap, or architecture.

It is an ordered list of candidate next actions.

When a step becomes current, remove it from this file and place it in `current-step.md`. Do not duplicate active work across both files.

---

## Queue

### 1. Decide the disposition of candidate dependency domains

Reason:

The active analysis may show that authority, artifact meaning, provenance, or proof has no single legitimate origin, or that the concern is already adequately bounded inside the cognitive layer.

Candidate decisions:

```text
KEEP
EXTRACT FOR TESTING
PARK
```

Constraints:

- do not create a layer merely because a concern can be named
- do not demote or repartition CB-001 without separate evidence and approval
- prefer cross-cutting invariants over institutions when no independent lifecycle exists
- preserve existing admitted distinctions during evaluation

Activation condition:

The 36-file definition trace is complete.

---

### 2. Redefine the procedural-layer boundary

Reason:

Procedure must be reduced to what is supposed to happen, in what order, and under which conditions.

It may reference admitted external definitions but must not originate responsibility, authority, ownership, artifacts, provenance, or proof standards.

Expected product:

- reduced procedural definition
- minimal procedure artifact shape
- dependency-reference rule
- unresolved-dependency stop rule
- smallest justified repository structure
- explicit non-admissions

Activation condition:

The candidate dependency-origin disposition is approved.

---

### 3. Trace the first narrow procedure

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

Reason:

This path exercises expected ordering and conditional branches without attempting the entire lifecycle.

Constraints:

- procedure states only what is supposed to happen
- every responsibility, authority, artifact, provenance, and proof dependency must cite an admitted external origin
- an unresolved dependency stops the trace
- do not introduce services, queues, databases, automation, or runtime proof
- closure remains outside the first trace

Activation condition:

The reduced procedural boundary and repository structure are approved.

Removal or demotion condition:

Choose another narrow path if the operator identifies a more revealing first procedure.

---

### 4. Establish procedural testing and admission

Reason:

A procedure must be pressured before admission. Passing cognitive tests does not validate expected ordering, branches, omissions, or stop conditions.

Activation condition:

At least one draft procedure exists.

---

### 5. Reconsider Vellum only if a record gap appears

Reason:

Mission Closure Record, Curia Minutes, Operative Release Record, Final Report, and Delivery Package currently preserve the required record chain.

Activation condition:

A cognitive or procedural scenario demonstrates a specific canonical record behavior these artifacts cannot preserve.

Removal or demotion condition:

Remove it if repeated use continues to show no distinct need.
