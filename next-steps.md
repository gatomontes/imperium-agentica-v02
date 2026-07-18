# Next Steps

## Status

The synthetic credential/store evidence leg is merged, complete, and post-merge verified.

Track A0 is merged, complete, and post-merge verified.

Track A1 is approved. A1.1 Mission Need formation is merged and post-merge verified; its execution record is pending.

The operator approved a sequencing refinement:

1. define a thin operative-creation-to-deployment handoff
2. complete operative creation
3. resume deployment as a separate endeavor

This file remains a non-binding ordered operational forecast. It is not doctrine, admitted architecture, authority, a calendar commitment, or a production-readiness claim.

## Admitted-Meaning Boundary

`Castellan` and `Guildhall` are already admitted Cognitive artifacts with bounded responsibilities under CB-005.

Their admitted meanings do not by themselves instantiate deployed services, autonomous authorities, or Runtime components.

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
| A0 — complete | Creation-to-deployment handoff seam | exact medium-specific Operative identity/version, provenance and applicable authority references, preservation/deviation findings, dependency/resource/secret-class requirements, validation evidence, and a provider-neutral handoff assessment that creates no Operative readiness state | 1 completed | 2 completed |
| A1 — active | Castellan-side mission and work specification | bounded Mission Need, approved Work Specification, required capability, constraints, acceptance conditions, authority citation, and refusal/escalation without defining a profession or constructing an Operative | 1 completed; 1–2 remaining | 2 completed; 2–4 remaining |
| A2 | Guildhall-to-Conscription resolution and recruitment | resolve Profession Specification and admitted Persona, then transform that Persona into a versioned deployment-medium-specific Operative; test selection, referral, preservation, deviation, rejection, repair, and evidence without mission assembly or deployment | 3–5 | 6–10 |
| A3 | Creation closure and handoff conformance | cross-flow provenance, artifact versioning, reproducibility, handoff classification, and proof that downstream consumers can inspect the Operative without rewriting creation semantics | 1–2 | 2–4 |

Approximate remaining size to finish the operative-creation track after A1.1:

```text
5–9 evidence increments
10–18 merges
```

Track A is complete only when the creation flow produces a validated, versioned, deployment-medium-specific Operative and the provider-neutral handoff contract passes pressure. It does not bind a mission, declare `READY_FOR_LAUNCH`, deploy, or activate the Operative.

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
| Handoff seam proven and recorded | complete |
| Castellan-side specification behavior complete | 2–4 |
| Guildhall-to-Conscription resolution/recruitment complete | 8–14 cumulative |
| Operative-creation track closed | 10–18 cumulative |
| Later deployment track closed | 32–56 cumulative |

These are planning ranges, not targets. A leg may contract when existing evidence is sufficient or expand when pressure reveals an independent gate.

## Recommended Next Leg

`Castellan Work Specification formation and approval contract`

This next A1 increment should pressure exact Mission Need derivation, Work Specification minimum content, criterion and acceptance-condition completeness, separate `APPROVE_WORK_SPECIFICATION` authority, refusal/unresolved behavior, versioning, and clean handoff to Guildhall without resolving profession or constructing an Operative.

Expected size:

```text
1 evidence increment initially
2 merges initially
```

Beginning A1.2 requires the A1.1 execution record to merge. A third A1 increment remains possible only if Work Specification pressure exposes an independent closure gap.

## Preserved Gates

Completing operative creation does not deploy, activate, authorize, or prove the live safety of an operative.

Completion of the synthetic Runtime evidence does not prove secure erasure, real credential safety, store durability or availability, provider authentication or idempotency, component recovery, production readiness, or consensus; deploy Runtime; or authorize external effects.
