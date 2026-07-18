# Next Steps

## Status

No active step.

Runtime Boundary Investigation 001 awaits operator decision.

The Runtime/code distinction has been clarified in `current-step.md`; no boundary approval is inferred from that clarification.

This file is an ordered operational queue, not doctrine, architecture, or a roadmap.

## Queue

### 1. Decide the candidate Runtime boundary

Decision artifact:

`drafts/runtime-boundary-investigation-001.md`

Decision basis:

```text
Code describes or configures machinery.
Runtime is that machinery operating with actual state and effects.
Runtime does not own every semantic contract expressed in code.
```

Options:

- approve candidate Runtime layer and draft-contract development
- revise the boundary and rerun affected tests
- reject Runtime as an independent concern

No option admits Runtime production.

### 2. If approved, create the candidate Runtime layer

Candidate drafts only:

- Runtime realization and dispatch
- Runtime observation envelope
- Runtime control plane

Also investigate:

- Authority control-plane profile refinement
- Procedure indeterminate-effect disposition refinement
- state-machine conformance method

Activation condition: explicit operator approval.

### 3. Resolve the empirical blocker only after draft convergence

Build a minimal reference implementation or test harness only after the Runtime-native contracts, Authority refinement, Procedure refinement, and conformance method have passed independently and together.

The implementation must produce evidence for failure, recovery, concurrency, stale authority, duplicate delivery, partial rollback, and indeterminate external effects.

Activation condition: successful draft and convergence testing plus separate implementation approval.

### 4. Reconsider Vellum only if a record gap appears

Activation condition: a scenario demonstrates a canonical record behavior existing artifacts cannot preserve.
