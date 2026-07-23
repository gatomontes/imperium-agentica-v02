# B2.2 Secret-Store Evaluation Foundation 001

## Status

Evaluation foundation merged through PR #67 and squash commit `02fc149961632d888ac0da5b94cbbae358647587`.

OpenBao isolated single-node selection candidate active.

## Authorization

Prepared under the operator instruction:

> Let’s do it

This authorizes B2.2 investigation. It does not authorize a provider account, purchase, credential, deployment, implementation, or external effect.

## Question

Which store and deployment topology can satisfy the B2.1 custody boundary and CB-006 without importing hidden authority, bearer export, unmeasured outage risk, or unjustified provider coupling?

## Repository Preconditions

- CB-006 prevents credential material from entering Muster or the Deployment Package.
- The B2.1 Runtime draft defines exact request, binding, lease, custody, revocation, recovery, and redaction behavior.
- The synthetic secret-store port proves the adapter shape only against deterministic in-memory material.
- RTB-002 does not claim production credential safety, store availability, durable recovery, or secure erasure.
- B2.3 implementation remains blocked until B2.2 selects both a store and an operating topology.

## Evaluation Rule

Selection is two-dimensional:

```text
store product
× deployment topology
= selectable realization
```

A product name alone is not a deployment decision.

Examples:

- OpenBao on the same single VPS as Imperium;
- OpenBao on an isolated single node;
- OpenBao in a three-node Raft cluster;
- a cloud-managed secret store using workload identity.

These have materially different failure domains, bootstrap paths, recovery duties, and costs.

## Mandatory Gates

A selectable realization must demonstrate:

1. credential values remain inside the Runtime custody path;
2. workload authentication does not require a long-lived secret beside the workload;
3. least-privilege policy can bind exact store paths and operations;
4. version identity and rotation do not collapse generations;
5. lease or use lifetime can be bounded by the B2.1 intersection;
6. revocation can block future use and surface uncertainty;
7. audit evidence covers access attempts and failures without values;
8. audit failure behavior is known and can fail closed where required;
9. store outage and timeout produce explicit refusal;
10. recovery revalidates Authority, binding, version, and effect state;
11. backup and restore have an isolated verification path;
12. root-of-trust, initialization, unseal, and break-glass custody are explicit;
13. availability topology and failure domain are explicit;
14. adapter calls can be confined to the existing synthetic port boundary;
15. licensing and recurring cost are acceptable and traceable;
16. target resources support the complete deployment, not merely the store process;
17. provider coupling is acknowledged and reversible where required;
18. a pinned version can be empirically tested without live production effects.

## Candidate Triage

| Candidate family | Current disposition | Principal strength | Principal unresolved concern |
|---|---|---|---|
| OpenBao self-hosted | provisional leader | provider-neutral, MPL-2.0, integrated storage, auth, policy, leases, audit | topology, unseal/root-of-trust, operator burden, isolated recovery |
| HashiCorp Vault self-hosted | viable alternative | mature compatible capability model and ecosystem | BUSL/commercial trajectory and enterprise boundary |
| Infisical self-hosted | conditional alternative | machine identities and accessible platform workflow | PostgreSQL + Redis footprint; required audit evidence is paid |
| Infisical Cloud | conditional managed alternative | reduced platform operations | subscription, external trust boundary, audit tier, provider dependency |
| AWS/Azure/GCP managed store | conditional family | managed durability, IAM, logging, regional controls | deployment cloud unknown; identity and logging coupling; provider-specific rotation |
| SOPS/age/file/env/keychain | excluded as primary store | simple static-material protection | does not establish the complete Runtime lease, revocation, audit, outage, and recovery contract |

## Provisional Finding

OpenBao currently has the best architectural fit for a provider-neutral, self-hosted realization.

That is not yet a selection.

Its fit depends on whether Imperium's first nonproduction target accepts:

- a separately operated store;
- manual or externally anchored unseal;
- single-node blocking during failure, or the cost of an HA cluster;
- operator-owned backups, audit destinations, upgrades, and recovery exercises.

If Imperium will be anchored to AWS, Azure, or Google Cloud, that cloud's managed store may reduce operational risk enough to outweigh provider coupling.

## Required Operator Decisions

The repository does not establish:

1. first nonproduction host: existing VPS, separate VPS, local machine, or named cloud;
2. whether the store may share a failure domain with Imperium;
3. availability target: fail-closed single-node outage or HA service;
4. root-of-trust and unseal operator model;
5. monthly infrastructure and licensing ceiling;
6. permitted managed-service dependency;
7. expected tenant isolation and initial secret volume;
8. backup recovery-time and recovery-point objectives.

These facts materially change the correct selection and must not be invented.

## Result

```text
B2.2 REQUIREMENTS: SHAPED
STORE SELECTED: OPENBAO
TOPOLOGY SELECTED: ISOLATED SINGLE-NODE UBUNTU VPS
INSTANCE RUNNING: NO
B2.3 IMPLEMENTATION: BLOCKED UNTIL SELECTION MERGE AND CLOSURE
OPERATOR INPUT: RESOLVED FOR NONPRODUCTION TARGET
```

## Next Gate

Review and merge or reject the OpenBao selection candidate. No instance is required or authorized to run.