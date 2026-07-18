# Next Steps

## Status

Runtime Boundary Investigation 001 is active in `current-step.md`.

This file is an ordered operational queue, not doctrine, architecture, or a roadmap.

## Queue

### 1. Pressure-test the candidate Runtime boundary

Test:

- semantic state versus operational state
- Procedure versus state-machine realization
- Authority findings versus runtime enforcement
- Provenance versus logging and telemetry
- artifact meaning versus schemas and serialization
- retries, replay, crash recovery, concurrency, and external side effects
- credentials and provider adapters
- execution observations and return handling

### 2. Submit the Runtime boundary finding for operator review

Possible outcomes:

- reject Runtime as an independent concern
- continue investigation with explicit gaps
- approve a candidate Runtime layer for draft-contract development

No outcome admits Runtime production.

### 3. Reconsider Vellum only if a record gap appears

Activation condition: a scenario demonstrates a canonical record behavior existing artifacts cannot preserve.
