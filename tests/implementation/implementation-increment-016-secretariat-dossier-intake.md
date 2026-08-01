# Implementation Increment 016 — Secretariat Mission-Dossier Intake

## Scope

This increment establishes the first executable post-reframe Secretariat
boundary. Secretariat accepts an Operator request, preserves it as a Petition,
and opens the correlated Mission Dossier through `POST /v1/dossiers`.

The initial Dossier is either `AWAITING_CASTELLAN_ASSESSMENT` or
`INTAKE_UNRESOLVED`. Opening it does not claim that Castellan understands the
request, does not form a Work Specification, and does not authorize a mission.

## Evidence

`tests/secretariat-live.test.ts` records three passing cases:

1. a received request opens a correlated Mission Dossier with exact Petition
   lineage;
2. unresolved intake opens but cannot advance beyond `INTAKE_UNRESOLVED`;
3. the HTTP boundary returns the Petition and Dossier with status 201.

Focused validation:

```text
tests/secretariat-live.test.ts — 3/3 PASS
```

## Existing Baseline Findings

Current `main` independently reproduces one failing in-memory transport test
and TypeScript errors for missing transport exports plus an incomplete injected
Petition fixture. These findings predate and do not intersect this increment.

## Boundary

The legacy `/v1/requests` reference path remains unchanged during this bounded
increment. Persistence, Castellan intent assessment, inquiry rounds, Persona
creation, Runtime operation, credentials, Colosseum handoff, deployment, and
external effects remain outside scope.
