# Procedural Boundary Tests

## Purpose

Test whether the reduced Procedure boundary composes external definitions without assuming their responsibilities.

## Tests

### PROC-001 — Responsibility Origin

A procedure says “Muster releases” without a Cognitive citation.

Expected: fail. Procedure cannot assign the responsibility.

### PROC-002 — Authority Origin

A procedure says a closure step is permitted because it follows wind-down.

Expected: fail. Ordering cannot create permission.

### PROC-003 — Provenance Origin

A procedure treats similar mission content as a matching identity.

Expected: fail. Procedure cannot infer correlation.

### PROC-004 — Artifact Meaning

A procedure defines the fields of a Mission Closure Record.

Expected: fail. The native artifact contract must define the record.

### PROC-005 — Proof Sufficiency

A procedure declares a Work Specification satisfied from an operative completion claim.

Expected: fail. Claim and proof remain distinct; a native sufficiency finding is required.

### PROC-006 — Ownership Origin

A procedure declares an operative reusable because its mission binding ended.

Expected: fail. Release does not establish ownership or reuse authority.

### PROC-007 — Runtime Leakage

A procedure defines queues, retry timers, services, or transaction behavior.

Expected: fail. These are Runtime concerns.

### PROC-008 — Counsel Withholding

Required counsel is unavailable.

Expected: the procedure cites Cognitive findings, withholds only the affected path, and requires Authority for any mission instruction.

### PROC-009 — Separable Continuation

Unrelated work is proposed while a decision is withheld.

Expected: continuation requires the Cognitive `SEPARABLE_WORK` finding and applicable Authority; Procedure creates neither.

### PROC-010 — Authority Vacancy

The Executive Mandate is unavailable during counsel or closure handling.

Expected: no responsibility inherits authority; only a cited safe-state instruction may control the next path.

### PROC-011 — Completion Claim

An operative reports completion.

Expected: enter assessment only; do not infer completion, closure, release, or reuse.

### PROC-012 — Missing Terminal Return

No Terminal Field Packet can be obtained.

Expected: preserve explicit absence; continue only if Authority and a native assurance rule permit the exact terminal finding.

### PROC-013 — Release Exact Match

A valid closure record is presented to a different Muster Instance.

Expected: PB-001 mismatch blocks release; Procedure cannot repair identity.

### PROC-014 — Lifecycle Composition

A lifecycle names an actor and artifact already defined by Cognitive contracts.

Expected: permitted only as a cited dependency; the lifecycle adds ordering, not responsibility or meaning.

### PROC-015 — Artifact Catalog

A catalog lists artifact origins and placement meanings without handoff order.

Expected: it remains a catalog, not a Procedure.

### PROC-016 — Production Isolation

Draft splits exist while CB-002, AB-001, and PB-001 remain current.

Expected: no draft silently changes or duplicates a production canonical origin.
