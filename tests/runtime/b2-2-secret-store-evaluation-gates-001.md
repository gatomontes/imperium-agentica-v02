# B2.2 Secret-Store Evaluation Gates 001

## Purpose

Define the evidence required before Imperium may select a real store and deployment topology.

## Gates

| ID | Gate | Required evidence |
|---|---|---|
| SSE-001 | Custody confinement | value cannot enter Cognitive artifacts, mission content, logs, ledgers, or caller output |
| SSE-002 | Exact operation | adapter resolves and uses material for one exact request and target |
| SSE-003 | Workload identity | bootstrap path avoids an unmanaged long-lived colocated secret |
| SSE-004 | Least privilege | policy narrows exact store path, operation, subject, and environment |
| SSE-005 | Version identity | generation and binding versions remain distinct and pinnable |
| SSE-006 | Lifetime intersection | effective use ends at the earliest controlling lifetime |
| SSE-007 | Revocation | future use blocks; active and provider-side uncertainty remains explicit |
| SSE-008 | Audit completeness | attempts, refusals, version, subject, and outcome are observable without values |
| SSE-009 | Audit failure | evidence-sink failure behavior is known and meets fail-closed policy |
| SSE-010 | Redaction | serialization and diagnostic paths exclude material and bearer capabilities |
| SSE-011 | Outage | unavailable, timeout, and indeterminate responses refuse without fallback |
| SSE-012 | Recovery | restart and retry revalidate request, Authority, binding, version, and effect |
| SSE-013 | Durability | documented persistence and corruption boundaries exist |
| SSE-014 | Backup/restore | isolated restore can be tested without production connectivity |
| SSE-015 | Availability topology | node, quorum, region, and shared-failure assumptions are explicit |
| SSE-016 | Root of trust | initialization, unseal, master-key, break-glass, and rotation custody are explicit |
| SSE-017 | Resource fit | CPU, memory, storage, database, network, and operator requirements fit target |
| SSE-018 | Cost/license | recurring cost, paid security features, and license constraints are accepted |
| SSE-019 | Adapter fit | pinned API/SDK can implement the synthetic port without widening exports |
| SSE-020 | Reversibility | bindings can migrate without exporting material through Imperium artifacts |
| SSE-021 | Tenant isolation | initial tenant/account/project boundary is explicit and testable |
| SSE-022 | Empirical plan | nonproduction outage, rotation, revocation, audit, restore, and leak tests exist |

## Decision Classes

- `PASS` — evidenced for one pinned realization.
- `CONDITIONAL` — capability exists but target configuration or operator fact is unresolved.
- `FAIL` — cannot satisfy the gate without violating an admitted boundary.
- `UNKNOWN` — documentation is insufficient; empirical evidence required.

A product-family claim cannot receive final PASS for topology-dependent gates.

## Selection Rule

One realization may be selected only when:

- SSE-001 through SSE-012 and SSE-016 are PASS;
- no gate is FAIL;
- every CONDITIONAL has an explicit accepted condition;
- every UNKNOWN has a bounded B2.3/B2.4 verification plan;
- cost, topology, and root-of-trust decisions are operator-approved.