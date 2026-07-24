# DR-005 — Park Credential Infrastructure and Refocus on Operative Creation and Selection

## Date

2026-07-24

## Status

Recorded decision.

## Context

B2.3 closed the bounded Locksmith sole-accessor implementation leg. The remaining B2.4 and B2.5 work would require a concrete credential-bearing integration, persistence device, topology, and operating authority that Imperium does not presently need.

Track A already admitted the Operative creation and selection chain. The current need is not to rebuild that chain by assumption, but to examine whether its decision points, evidence, failure behavior, and improvement obligations are adequate when tested against the recorded AI risks and pending controls.

## Decision

1. Close Locksmith-focused work for the present.
2. Park B2.4, B2.5, concrete device evaluation, and credential lifecycle implementation until a real authenticated integration creates an observed need.
3. Remove credential infrastructure from the active critical path.
4. Activate a bounded, deliberation-first review of the admitted Operative creation and selection process.
5. Preserve Track A as closed production history; do not silently reopen or revise its admitted contracts.
6. Require any proposed revision to originate from a recorded gap, survive layer-ownership review and pressure, and receive separate admission authority.

## Current Review Chain

```text
Petition / operator need
→ Castellan mission need and Work Specification
→ Guildhall profession resolution
→ Garrison suitability search
   ├─ suitable admitted persona
   │  → selection
   └─ no suitable persona
      → Foundry persona construction
      → Pit evaluation
      → Garrison admission
→ Conscription deployment-medium embodiment
→ Operative handoff
```

The review must preserve the distinctions among profession resolution, persona suitability, persona construction, persona admission, persona selection, Conscription, mission binding, and deployment.

## Deliberation Focus

The first review should determine:

- where selection decisions actually occur;
- what evidence supports capability and suitability;
- how absence, staleness, uncertainty, unequal performance, excessive capability, and platform degradation produce refusal or escalation;
- which recorded AIR risks materially attach to creation and selection;
- whether `CTRL-004 — Capability Suitability Finding` duplicates, strengthens, or exposes a gap in the admitted chain;
- which other pending controls are relevant without forcing them into the chain;
- what must be measured before any stronger assurance claim is made.

## What Was Not Decided

This decision does not:

- demote or revise CB-007;
- reopen Track A production;
- select a model, provider, evaluator, threshold, persona, operative, or deployment medium;
- admit or implement CTRL-004 or another pending control;
- abandon Locksmith's sole-accessor boundary;
- declare that credential persistence will never be required;
- authorize code, Runtime action, deployment, network contact, or external effect.

## Restart Trigger for Locksmith Work

Credential infrastructure may return to active consideration only when a concrete authenticated operation identifies:

- the provider and operation;
- the credential or authentication class;
- the deployment topology;
- the required lifecycle and outage behavior;
- the responsible operational authority;
- evidence that the existing Locksmith boundary is insufficient without a real device adapter.

## Authorization

User direction on 2026-07-24: close Locksmith's work for now and focus on the Operative creation/selection process and deliberations.

## Supersession

Supersede this decision only through a traceable record identifying the new observed need, affected continuity files, and renewed authority.
