# Next Steps

## Status

Operational queue prepared for a fresh chat.

This file is not doctrine, a roadmap, or architecture.

It is an ordered list of candidate next actions.

When a step becomes active, remove it from this file and place it in `current-step.md`. Do not duplicate active work across both files.

---

## Queue

### 1. Define the procedural-layer boundary

Reason:

CB-001 admits the cognitive structure but deliberately leaves procedures at zero. Before writing workflows, the repository needs a minimal definition of what the procedural layer may express and what remains cognitive or runtime.

Required distinctions:

```text
cognitive entity:
owns meaning, authority, responsibility, or artifact boundaries

procedure:
orders admitted responsibilities and artifacts for a repeatable situation

runtime:
implements, stores, schedules, transports, or executes procedures
```

Questions:

- Should the layer use `layers/procedural/drafts/` and `layers/procedural/production/`?
- What admission criteria apply to a procedure?
- How must a procedure cite CB-001 entities, artifacts, versions, and authority?
- How are alternate paths, refusal, timeout, correction, and termination represented without choosing runtime machinery?
- What evidence would invalidate or demote a procedure?
- What narrow procedure should be traced first?

Expected product:

- a procedural-layer README proposal
- draft/production admission boundaries
- a minimal procedure artifact contract
- a recommended first procedure
- explicit non-admissions

Activation condition:

Explicit operator approval in the fresh chat.

Removal or demotion condition:

Defer if further cognitive scenarios are requested before procedural work.

---

### 2. Trace the first narrow procedure

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

This path exercises boundary crossing, sanitation, correlation, capacity, authority, decision recording, and outbound orchestration without attempting the entire lifecycle.

Constraints:

- cite production CB-001 artifacts
- do not redefine cognitive ownership
- preserve refusal and withheld-decision paths
- do not introduce services, queues, databases, or automation
- save theoretical results under `tests/procedural/` if that structure is approved

Activation condition:

The procedural boundary and repository structure are approved.

Removal or demotion condition:

Choose another narrow path if the operator identifies a more revealing first procedure.

---

### 3. Establish procedural testing and admission

Reason:

A procedure must be pressured before admission. Passing cognitive tests does not automatically validate ordering, handoffs, exceptional paths, or procedural completeness.

Candidate evidence:

- happy-path trace
- missing or quarantined return
- unavailable standing-role capacity
- unavailable or contested authority
- required counsel unavailable
- correlation mismatch
- remediation loop
- closure interaction where relevant

Activation condition:

At least one draft procedure exists.

---

### 4. Reconsider Vellum only if a record gap appears

Reason:

Mission Closure Record, Curia Minutes, Operative Release Record, Final Report, and Delivery Package currently preserve the required record chain.

Activation condition:

A cognitive or procedural scenario demonstrates a specific canonical record behavior these artifacts cannot preserve.

Removal or demotion condition:

Remove it if repeated use continues to show no distinct need.
