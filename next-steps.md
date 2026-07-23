# Next Steps

## Status

Track A, B1, B2.1, B2.1a, and B2.2 are complete and closed.

B2.3 is active. The asynchronous exact-version KV v2 acquisition candidate merged through PR #70. An OpenBao-hosted Imperium Service Port is the current decision candidate.

B2 remains unimplemented as a live system.

## Track B

| Order | Leg | State |
|---:|---|---|
| B1 | Deployment authorization and authentication policy | closed |
| B2.1 | Secret custody and adapter boundary | closed |
| B2.1a | Credential-transfer convergence correction | closed as CB-006 |
| B2.2 | Store evaluation and selection | closed; OpenBao isolated single-node selected |
| B2.3 | Nonproduction adapter implementation | active; service-port decision at merge gate |
| B2.4 | Empirical credential lifecycle and outage tests | blocked; future running instance |
| B2.5 | B2 evidence review and closure | blocked |
| B3 | Live Runtime/provider driver | not active |
| B4 | Integrated nonproduction staging | not active |
| B5 | Production admission and deployment | not active |

## B2.3 Candidate Sequence

1. asynchronous exact-version KV v2 backend and existing lease integration — merged through PR #70;
2. OpenBao-hosted Imperium Service Port decision and threat pressure — candidate review complete; merge gated;
3. executable Runtime-facing service-port client and pinned workflow definition — blocked on step 2 merge;
4. pinned-binary synthetic workflow compatibility pressure — blocked;
5. external-plugin escalation only if a required workflow primitive fails — evidence gated;
6. nonproduction adapter evidence review and B2.3 closure — blocked.

All B2.3 work remains repository-local, synthetic, deterministic, and network-free unless a later instruction changes that boundary.

## Current Gate

Require explicit authorization to merge the service-port decision candidate.

No VPS purchase, provisioning, installation, initialization, unseal, account, token, RoleID, SecretID, secret, credential, network contact, plugin installation, OpenBao core fork, Runtime action, deployment, or external effect is authorized.
