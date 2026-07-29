# DR-028 — Courtyard Cross-Office Consistency Review

## Status

Recorded semantic decision. This review tests the Courtyard institutional contracts against the admitted boundaries of the principal Citadel offices and the external interfaces. It authorizes no implementation, Runtime action, activation, deployment, credential use, or external effect.

## Review Finding

The Courtyard contract remains coherent when applied across the admitted office boundaries:

| Institution | Boundary preserved |
|---|---|
| Guildhall | profession discovery, candidate deliberation, and disposition remain Guildhall responsibilities |
| Studium | doctrinal fitting and issuance remain distinct from persona production and officer governance |
| Hagiography | exemplar evidence and Human-Trait Canon stewardship remain distinct from office execution |
| Foundry | Persona Specification production remains Foundry responsibility, performed through bounded resident stations |
| Pit | adversarial examination and recommendation remain distinct from Guildhall disposition |
| Garrison | roster and availability custody remain distinct from Officer residence and office governance |
| Recruitment/Conscription | deployment-medium-specific packaging remains distinct from persona forging and mission orchestration |
| Muster | outbound mission orchestration remains distinct from Courtyard’s internal office operation |
| Curia | mission-level decision authority remains distinct from office-level work and handoffs |
| La Cortine | external boundary and routing remain outside Courtyard |
| Lazaretto | return quarantine and sanitization remain outside Courtyard |

Courtyard provides the institutional operating surface in which these offices and their bounded stations perform work and exchange traceable artifacts. It does not become an additional decision-maker, governance layer, orchestration layer, Runtime component, execution surface, or external boundary.

Receipt, proximity, participation, or artifact custody does not transfer authority. Each office remains responsible for its own release conditions, receiving conditions, refusal behavior, provenance, and disposition within its admitted contract. A handoff can transport work; it cannot silently merge responsibilities or create permission.

## Consequences

- Existing office boundaries remain composable without being flattened into Courtyard.
- Inter-office artifacts must preserve sender responsibility, recipient responsibility, provenance, version, status, and return rationale.
- Any future implementation review must trace each proposed component to an admitted office or station contract before implementation is considered.
- Runtime, activation, deployment, credentials, live data, and external effects remain outside this semantic review.

## Gate

This decision is semantic and architectural only. No implementation, Runtime action, activation, deployment, credential use, live data, or external effect is authorized.
