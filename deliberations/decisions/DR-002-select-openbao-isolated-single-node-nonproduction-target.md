# DR-002 — Select OpenBao Isolated Single-Node Nonproduction Target

## Date

2026-07-23

## Status

Approved B2.2 selection candidate. Not implemented, deployed, or operationally admitted.

## Question

Which concrete store × topology realization should B2.3 target without requiring a running instance during B2.2?

## Decision

Select this bounded nonproduction target:

```text
Store: OpenBao
Version family: 2.6.x
Exact patch: pin at B2.3 start after release and security review
Host: separate Ubuntu VPS
Topology: isolated single node
Storage: integrated Raft, one voter, no HA claim
Availability: fail closed while unavailable or sealed
Seal: manual operator-controlled Shamir initialization and unseal
Tenant scope: one initial Imperium tenant / namespace boundary
Audit: two configured destinations required before credential testing
Backup: encrypted off-host snapshot and isolated restore exercise
Exposure: private/restricted API; no public UI
License: MPL-2.0; no paid store feature assumed
State now: no instance provisioned or running
```

The single-node topology is selected for nonproduction evidence because it isolates the store from Imperium's host while avoiding premature three-node operational cost.

## Bootstrap Boundary

The initial workload-authentication design target is:

- non-secret AppRole RoleID;
- operator-delivered, response-wrapped, short-lived, single-use SecretID;
- bootstrap material accepted only through a root-owned transient channel;
- resulting token short-lived, renewable only within policy, process-confined, and never emitted;
- restart or bootstrap failure refuses closed;
- no root token retained for normal operation;
- B2.3 threat pressure may replace this method if it cannot satisfy the custody boundary.

This is a design target, not an admitted credential mechanism.

## Weighted Decision

| Criterion | Weight | Isolated OpenBao | Shared OpenBao | Three-node OpenBao | Managed cloud |
|---|---:|---:|---:|---:|---:|
| B2.1 boundary compatibility | 25 | 25 | 25 | 25 | 22 |
| failure-domain isolation | 15 | 15 | 3 | 15 | 15 |
| audit/evidence fit | 15 | 14 | 14 | 14 | 13 |
| operational simplicity | 10 | 7 | 9 | 4 | 10 |
| initial cost restraint | 10 | 8 | 10 | 3 | 7 |
| provider portability | 10 | 10 | 10 | 10 | 3 |
| backup/recovery fit | 10 | 7 | 5 | 9 | 9 |
| future HA path | 5 | 4 | 3 | 5 | 5 |
| **Decision score** | **100** | **90** | **79** | **85** | **84** |

Scores are architectural decision support, not empirical performance or security measurements.

## Explicit Non-Decisions

This decision does not:

- create or start an OpenBao instance;
- purchase or provision a VPS;
- select a VPS vendor, region, IP address, domain, or network;
- initialize or unseal a store;
- create a root token, AppRole, SecretID, token, policy, mount, secret, or credential;
- select an SDK or implement an adapter;
- admit the B2.1 Runtime draft into RTB-002;
- claim HA, durability, recovery, secure erasure, credential safety, or production readiness;
- activate B2.3 before B2.2 selection evidence merges and closes.

## Evidence

- B2.2 Secret-Store Evaluation Foundation 001.
- B2.2 Secret-Store Evaluation Gates 001.
- B2.2 OpenBao Selection Pressure Run 001.
- Official OpenBao 2.6.x documentation and release record.
- Operator approval: “If the OpenDao instance is not required to be running at this time, yes, approvved.”

The reference to “OpenDao” is interpreted as OpenBao from the immediately preceding question.

## Consequences

B2.3 may design and implement a nonproduction adapter against the pinned OpenBao HTTP API and deterministic test doubles without running a real instance.

Provisioning and live nonproduction credential tests remain later, separately bounded actions.

## Supersession Conditions

Reopen selection if B2.3 cannot meet custody, bootstrap, audit, recovery, cost, security-maintenance, or API-compatibility requirements.