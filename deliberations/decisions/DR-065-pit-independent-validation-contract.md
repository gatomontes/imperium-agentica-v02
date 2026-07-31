# DR-065 — Pit Independent Validation Contract

## Status

Active admitted semantic contract for synthetic validation only.

## Contract

The Pit is an independent adversarial qualification surface between Foundry
and Guildhall disposition. Foundry creates and owns the Persona Specification
candidate; the Pit does not create, repair, rewrite, or admit it.

The Pit receives an exact, versioned candidate and its complete provenance.
It designs and executes bounded challenge cases against declared traits,
boundaries, evidence standards, refusal behavior, conflict handling, and
lineage. Each challenge produces an inspectable finding with the tested
candidate version, evidence, uncertainty, and failure classification.

The Pit may return a conformant result, a finding requiring Guildhall review,
or an escalation/refusal when the packet is incomplete, stale, contradictory,
or outside the declared challenge envelope. It may recommend Admit, Recycle,
or Discard, but it cannot make that disposition. Guildhall retains disposition
authority under DR-022 and Garrison remains the roster custodian.

Findings return to the native owner through an explicit, traceable handoff.
The Pit must not silently repair upstream material, compose cross-version
inputs, alter Foundry provenance, or route around a conflict owner.

## Boundary

This decision admits only semantic use and synthetic testing. It does not
authorize real-person intake, Persona production, Operative creation,
Recruitment, implementation, Runtime operation, credentials, activation,
deployment, live data, provider access, or external effects.
