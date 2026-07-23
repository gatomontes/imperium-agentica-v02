# ICP-03 — Enforceable deployment authorization

## Observed Deficiency

Translate exact provider-neutral authority into action-level enforcement, denial, evidence, revocation, and shutdown.

## Risks Served

AIR-04–AIR-05, AIR-08–AIR-10, AIR-12, AIR-17, AIR-19–AIR-20, AIR-24

## Current Imperium Coverage

B1.1–B1.3 provide draft/recorded provider-neutral Authority evidence; no Runtime enforcement or deployment exists.

## Required Behaviors

Provider translation; action check; denial; tamper-evident evidence; revocation; shutdown; reauthorization.

## Candidate Ownership

Unassigned. Ownership must be discovered and admitted from behavior; it must not be inferred from the program name.

## Candidate Layer Impact

Cross-layer and unresolved. Relevant responsibilities may cite Cognitive, Authority, Provenance, Procedure, Runtime, or external governance without moving their semantic ownership.

## Proposed Controls

- `CTRL-003 — Per-Action Authorization Enforcement`

This is a pending investigation record. It is not admitted or implemented.

## Evidence Required

- observed problem and affected scope;
- explicit assumptions;
- smallest proposed control;
- admission or implementation target;
- theoretical and operating evidence as applicable;
- failure behavior;
- residual uncertainty;
- invalidation conditions.

## Explicit Non-Claims

No provider, credential store, Runtime driver, deployment mechanism, external crossing, or deployment is selected or authorized.

## Open Questions

- Which smallest control should be investigated first?
- Who may originate, verify, enforce, contest, and supersede its finding?
- What evidence distinguishes semantic adequacy from implementation?

## Current Status

`CONTROL_CANDIDATE_RECORDED`

## Revision History

- 2026-07-23 — Initial program record.
- 2026-07-23 — RA Integration Review 001 linked `CTRL-003` as the smallest current pending control.
