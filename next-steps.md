# Next Steps

## Status

The synthetic credential/store evidence leg is merged, complete, and post-merge verified.

No next leg is approved or active.

This file is a non-binding operational forecast. It is not doctrine, architecture, authority, a calendar commitment, or a production-readiness claim.

## Estimation Rule

One evidence increment normally requires:

1. one candidate merge
2. one execution-record merge

Therefore:

```text
1 evidence increment ≈ 2 merges
```

The estimates below assume clean pressure results and no scope split, rejected candidate, provider surprise, or corrective increment. Calendar time is intentionally not estimated.

## Approximate Leg Map

| Order | Leg | What it must establish | Approximate evidence increments | Approximate merges |
|---:|---|---|---:|---:|
| 0 | Synthetic credential/store evidence — complete | one-use custody, provider projection, expiring store lease | 3 completed | 6 completed |
| 1 | Secret-store authorization policy | exact subject, secret reference, purpose, scope, TTL, deny, and revocation policy using synthetic material | 1–2 | 2–4 |
| 2 | Provider authentication format | vendor-neutral credential shape, injection point, redaction, rotation, and failure vocabulary without a live account | 1–2 | 2–4 |
| 3 | Real secret-store provider | one selected store adapter, identity/authentication boundary, lease acquisition, rotation, revocation, and outage behavior | 2–3 | 4–6 |
| 4 | Live process-supervisor driver | one selected supervisor, sandboxed process control, provider idempotency evidence, and post-dispatch uncertainty | 2–3 | 4–6 |
| 5 | Integrated staging recovery | real-store-to-driver composition in a nonproduction environment, restart/recovery, audit, rollback, and fault injection | 2–4 | 4–8 |
| 6 | Production admission and deployment | production manifest decision, operational ownership, deployment/rollback, monitoring, incident response, and explicit admission | 3–5 | 6–10 |

Leg 4 can be investigated in parallel with Legs 2–3 after the relevant authorization boundary is fixed. Leg 5 requires both a bounded real-store path and a bounded live-driver path. Leg 6 requires successful staging evidence and separate production admission.

## Approximate Remaining Merge Range

From the current point:

| Milestone | Additional merges, approximately |
|---|---:|
| Vendor-neutral authorization and authentication boundaries complete | 4–8 |
| Bounded real secret-store adapter complete | 8–14 |
| Bounded live driver also complete | 12–20 |
| Integrated nonproduction staging evidence complete | 16–28 |
| Production admission/deployment leg complete | 22–38 |

These are planning ranges, not targets. A leg may contract when existing evidence is sufficient or expand when pressure reveals an independent gate.

## Recommended Next Leg

`secret-store authorization policy investigation`

It should establish which exact operational identity may acquire which secret reference, for which environment, component, scope, purpose, and maximum lease duration. It should use the synthetic backend and deny by default before any vendor or real credential is selected.

Expected size:

```text
1–2 evidence increments
2–4 merges
```

Starting this leg requires a new necessity analysis, bounded scope, pressure plan, and explicit operator approval.

## Preserved Gates

Completion of the synthetic leg does not prove secure erasure, real credential safety, store durability or availability, provider authentication or idempotency, component recovery, production readiness, or consensus; deploy Runtime; or authorize external effects.
