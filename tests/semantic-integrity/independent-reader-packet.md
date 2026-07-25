# Semantic Integrity — Independent-Reader Packet

## Purpose

This packet defines the smallest repository context from which an independent reader must reconstruct Imperium's current meaning.

The test is about whether the repository communicates its own ontology, authority boundaries, admission state, and current operational state. It is not a test of agreement with an evaluator's preferred interpretation.

## Reader Conditions

The reader must:

- use only the files listed below;
- read them in the listed order;
- not use conversation history, external explanations, commit-message interpretation, or unstated project assumptions;
- provide answers before receiving any expected interpretation;
- distinguish direct repository statements from inference;
- record uncertainty instead of resolving ambiguity by invention.

## Reading Order

1. `README.md`
2. `current-step.md`
3. `next-steps.md`
4. `deliberations/README.md`
5. `deliberations/registry.md`
6. `deliberations/decisions/DR-009-evidence-without-engineered-orientation.md`
7. `deliberations/decisions/DR-010-mission-scoped-observator-custos-operator-instance.md`
8. `layers/cognitive/README.md`
9. `layers/cognitive/production/CB-CURRENT.md`
10. `layers/cognitive/CB-DENIED.md`

## Required Reconstruction

Without consulting any answer key, the reader must provide:

### Ontology

1. What is an Observator/Custos (`OC`)?
2. Is OC one Imperium Operator instance, multiple components, a role performed by multiple actors, or something else?
3. What do “Observator” and “Custos” each designate?
4. What is OC explicitly not?

### Cognitive Baseline State

13. What is the sole active Cognitive standard?
14. What is the relationship between CB-CURRENT and numbered CB snapshots?
15. What is CB-DENIED, and how does it differ from a retired or superseded numbered snapshot?
16. What is the authority status of material in the Cognitive dumpster?

### Authority

5. What may OC observe, inspect, receive, ask, submit, or report?
6. What may OC not do?
7. Does OC possess execution, approval, veto, command, routing, or mission-state authority?
8. If an OC holder also has another role, under which role must consequential action be recorded?

### State and Admission

9. Is OC implementation currently authorized?
10. Is OC a current active implementation, a recorded decision, a future possibility, a draft, or another state?
11. What is the current operational step?
12. Which related work is deferred, parked, unauthorized, or future?

### Evidence Classification

For each answer, identify whether it is:

- an exact repository statement;
- a synthesis of multiple statements;
- an inference;
- unresolved or ambiguous.

Cite the file and the relevant section or heading. Do not treat a file's location, title, or commit history as proof of behavior unless the text explicitly supports that conclusion.

## Failure Categories

Interpretation results must be classified using one or more of these categories:

- **Ontology drift** — the reader assigns the wrong kind of thing to a named concept.
- **Authority drift** — the reader grants or removes a capability or authority.
- **State drift** — the reader confuses current, future, deferred, parked, historical, or completed work.
- **Admission drift** — the reader confuses admitted semantics with implementation, draft status, or authorization.
- **Scope drift** — the reader treats a bounded concept as the whole system or as a different system boundary.
- **Evidence drift** — the reader presents an inference as a repository statement or fails to identify uncertainty.
- **No drift observed** — the required meaning is recovered with traceable support.

## Test Integrity

The evaluator must preserve the reader's original response, including errors and uncertainty.

Do not correct, coach, summarize favorably, or rewrite the response before classification.

A clarification is successful only if a new independent reader recovers the intended meaning without access to the prior reader's answers or the expected answer key. For the Cognitive Baseline questions, the reader must distinguish active CB-CURRENT, historical numbered snapshots, never-admitted CB-DENIED candidates, and non-authoritative dumpster material.
