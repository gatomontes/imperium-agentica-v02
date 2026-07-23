# DR-001 — Separate Risks, Programs, and Controls

## Date

2026-07-23

## Status

Recorded conclusion; not architecture or layer admission.

## Question

How should the MIT risk assessment and continuing Imperium improvement work be preserved without conflating external risks, broad deficiencies, and implemented behavior?

## Decision

Preserve:

- each external risk as an `AIR-*` record;
- each cross-cutting improvement area as an `ICP-*` program;
- each independently verifiable mitigation as a `CTRL-*` control;
- pending and implemented controls in separate directories;
- dated synthesis in `assessments/`;
- consequential conclusions in `decisions/`.

A risk is not implemented. A control is implemented.

Programs remain active while their controls may have different maturity and implementation states.

## Explicit Non-Decisions

This decision does not:

- admit a new Imperium layer;
- assign an institutional owner;
- admit any of the seven programs as production semantics;
- claim any control is implemented;
- activate a development leg;
- alter B1 or B2 authority;
- authorize infrastructure, credentials, Runtime action, deployment, or external effect.

## Evidence

- MIT AI Risk Initiative 24-risk taxonomy.
- 2026-07-23 Imperium comparison.
- Imperium repository principle that location records present burden of proof.
- Operator approval: `Sounds good. Approved.`

## Consequences

Future work can trace risks to programs and controls without duplicating cross-cutting deliberation or confusing semantic admission with operating enforcement.

## Supersession Conditions

Supersede if evidence shows the risk/program/control separation obscures ownership, proof, or implementation state.
