# Next Steps

## Status

The synthetic credential/store evidence leg is merged, complete, and post-merge verified.

No next leg is approved or active.

The operator approved a sequencing refinement:

1. define a thin operative-creation-to-deployment handoff
2. complete operative creation
3. resume deployment as a separate endeavor

This file remains a non-binding ordered operational forecast. It is not doctrine, admitted architecture, authority, a calendar commitment, or a production-readiness claim.

## Working-Label Boundary

`Castellan` and `Guildhall` are directional working labels for candidate behaviors.

They are not admitted institutions, roles, services, owners, or authorities. Their names survive only if repeated evidence demonstrates stable, independently necessary behavior.

## Estimation Rule

One evidence increment normally requires:

1. one candidate merge
2. one execution-record merge

Therefore:

```text
1 evidence increment ≈ 2 merges
```

The estimates below assume clean pressure results and no scope split, rejected candidate, provider surprise, or corrective increment. Calendar time is intentionally not estimated.

## Track A — Operative Creation

Deployment implementation pauses after the handoff seam is proven.

| Order | Approximate leg | What it must establish | Evidence increments | Approximate merges |
|---:|---|---|---:|---:|
| A0 | Creation-to-deployment handoff seam | immutable operative identity/version, provenance and authority references, capability/constraint manifest, dependency/resource/secret requirements, validation evidence, and a target-neutral `READY_FOR_DEPLOYMENT` state | 1–2 | 2–4 |
| A1 | Castellan-side operative specification | bounded intent, required capabilities, constraints, acceptance conditions, authority citation, and refusal/escalation behavior without constructing or deploying an operative | 2–3 | 4–6 |
| A2 | Guildhall-side construction and validation | transform an approved specification into a versioned operative artifact; deterministic assembly, validation, rejection, repair, and evidence without deployment | 3–5 | 6–10 |
| A3 | Creation closure and handoff conformance | cross-flow provenance, artifact immutability, reproducibility, readiness classification, and proof that deployment can consume the artifact without rewriting creation semantics | 1–2 | 2–4 |

Approximate remaining size to finish the operative-creation track:

```text
7–12 evidence increments
14–24 merges
```

Track A is complete only when the creation flow produces a validated, immutable, target-neutral operative artifact and the handoff contract passes pressure. It does not deploy or activate the operative.

## Track B — Operative Deployment, Parked

Track B resumes only after Track A closes and is recorded.

| Order | Approximate leg | What it must establish | Evidence increments | Approximate merges |
|---:|---|---|---:|---:|
| B1 | Deployment authorization and authentication policy | exact deployer identity, artifact eligibility, target scope, credential purpose, duration, deny/revoke behavior, and provider-neutral authentication format | 2–4 | 4–8 |
| B2 | Real secret-store adapter | one selected store, identity boundary, lease acquisition, rotation, revocation, outage behavior, redaction, and provider-specific limitations | 2–3 | 4–6 |
| B3 | Live Runtime/provider driver | one selected execution environment, sandboxed lifecycle control, idempotency evidence, status reconciliation, and post-dispatch uncertainty | 2–3 | 4–6 |
| B4 | Integrated nonproduction staging | real-store-to-driver composition, deployment/restart/recovery, audit, rollback, fault injection, and artifact-handoff conformance | 2–4 | 4–8 |
| B5 | Production admission and deployment | production manifest decision, operational ownership, release/rollback, monitoring, incident response, and explicit admission | 3–5 | 6–10 |

Approximate size of the later deployment track:

```text
11–19 evidence increments
22–38 merges
```

Tracks A and B are separate endeavors. Deployment findings may contest the handoff contract, but they must return as explicit evidence and revision rather than silently changing operative-creation semantics.

## Approximate Combined Range

From the current point:

| Milestone | Additional merges, approximately |
|---|---:|
| Handoff seam proven | 2–4 |
| Castellan-side specification behavior complete | 6–10 cumulative |
| Guildhall-side construction/validation complete | 12–20 cumulative |
| Operative-creation track closed | 14–24 cumulative |
| Later deployment track closed | 36–62 cumulative |

These are planning ranges, not targets. A leg may contract when existing evidence is sufficient or expand when pressure reveals an independent gate.

## Recommended Next Leg

`operative creation-to-deployment handoff contract investigation`

This should define the smallest target-neutral artifact boundary needed to let operative creation finish without depending on a provider, store, live Runtime, or deployment mechanism.

Expected size:

```text
1–2 evidence increments
2–4 merges
```

Starting this leg requires a new necessity analysis, bounded scope, pressure plan, and explicit operator approval.

## Preserved Gates

Completing operative creation does not deploy, activate, authorize, or prove the live safety of an operative.

Completion of the synthetic Runtime evidence does not prove secure erasure, real credential safety, store durability or availability, provider authentication or idempotency, component recovery, production readiness, or consensus; deploy Runtime; or authorize external effects.
