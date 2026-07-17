# Next Steps

## Status

Operational queue.

This file is not doctrine, a roadmap, or architecture.

It is an ordered list of candidate next actions.

When a step becomes active, remove it from this file and place it in `current-step.md`. Do not duplicate active work across both files.

---

## Queue

### 1. Define the procedural-layer boundary

Reason:

CB-001 admits the cognitive structure but deliberately leaves procedures at zero. Before writing workflows, the repository needs a minimal definition of what the procedural layer may express and what remains cognitive or runtime.

Questions:

- Does the layer use `layers/procedural/drafts` and `layers/procedural/production`?
- What is a procedure versus a cognitive responsibility?
- How does a procedure cite CB-001 without redefining it?
- What evidence admits a procedure?
- What procedure should be traced first?

Promotion condition:

Explicit operator approval to begin procedural-layer design.

Removal or demotion condition:

Defer if the operator wants further cognitive scenarios before procedural work.

---

### 2. Trace the first admitted cognitive path as a procedure

Reason:

After the procedural boundary exists, translate one narrow CB-001 path into an explicit procedure without attempting the whole lifecycle.

Candidate:

```text
Theatre return
→ Lazaretto sanitation
→ Curia session
→ CEO decision
→ Muster outbound instruction
```

Promotion condition:

The procedural boundary and draft structure are approved.

Removal or demotion condition:

Choose a different narrow path if it exposes procedural distinctions more effectively.

---

### 3. Reconsider Vellum only if a record gap appears

Reason:

Mission Closure Record, Curia Minutes, Operative Release Record, Final Report, and Delivery Package currently preserve the required record chain.

Promotion condition:

A cognitive or procedural scenario demonstrates a specific canonical record behavior these artifacts cannot preserve.

Removal or demotion condition:

Remove it if repeated use continues to show no distinct need.
