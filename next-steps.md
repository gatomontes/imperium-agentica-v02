# Next Steps

## Status

Track A, B1, B2.1, B2.1a, and B2.2 are complete and closed.

B2.3 is active. The OpenBao-hosted Imperium Service Port decision merged through PR #71. Its repository-local executable client and static workflow definition are at the current merge gate.

B2 remains unimplemented as a live system.

## Track B

| Order | Leg | State |
|---:|---|---|
| B1 | Deployment authorization and authentication policy | closed |
| B2.1 | Secret custody and adapter boundary | closed |
| B2.1a | Credential-transfer convergence correction | closed as CB-006 |
| B2.2 | Store evaluation and selection | closed; OpenBao isolated single-node selected |
| B2.3 | Nonproduction adapter implementation | active; service-port executable candidate at merge gate |
| B2.4 | Empirical credential lifecycle and outage tests | blocked; future running instance |
| B2.5 | B2 evidence review and closure | blocked |
| B3 | Live Runtime/provider driver | not active |
| B4 | Integrated nonproduction staging | not active |
| B5 | Production admission and deployment | not active |

## B2.3 Candidate Sequence

1. asynchronous exact-version KV v2 backend and existing lease integration — merged through PR #70;
2. OpenBao-hosted Imperium Service Port decision and threat pressure — merged through PR #71;
3. executable Runtime-facing service-port client and pinned workflow definition — candidate review complete; merge gated;
4. pinned-binary synthetic workflow compatibility pressure — blocked on step 3 merge and separate authorization;
5. external-plugin escalation only if a required workflow primitive fails — evidence gated;
6. nonproduction adapter evidence review and B2.3 closure — blocked.

All B2.3 work remains repository-local, synthetic, deterministic, and network-free unless a later instruction changes that boundary.

## Current Gate

Require explicit authorization to merge the service-port executable candidate.

No VPS purchase, provisioning, installation, initialization, unseal, account, real token, real RoleID, real SecretID, real secret, real credential, network contact, plugin installation, OpenBao core fork, Runtime action, deployment, or external effect is authorized.
