# Next Steps

## Status

Track A, B1, B2.1, B2.1a, and B2.2 are complete and closed.

B2.3 is active. OpenBao is preserved as historical evidence and deferred as an
active integration target. The local `.env` source adapter is the current
nonproduction bridge candidate.

B2 remains unimplemented as a live or production system.

## Track B

| Order | Leg | State |
|---:|---|---|
| B1 | Deployment authorization and authentication policy | closed |
| B2.1 | Secret custody and adapter boundary | closed |
| B2.1a | Credential-transfer convergence correction | closed as CB-006 |
| B2.2 | Store evaluation and selection | closed historically; OpenBao target deferred |
| B2.3 | Nonproduction adapter implementation | active; local-env bridge candidate at merge gate |
| B2.4 | Empirical credential lifecycle and outage tests | deferred until a real custody target is justified |
| B2.5 | B2 evidence review and closure | blocked |
| B3 | Live Runtime/provider driver | not active |
| B4 | Integrated nonproduction staging | not active |
| B5 | Production admission and deployment | not active |

## B2.3 Candidate Sequence

1. asynchronous exact-version OpenBao KV v2 backend — merged through PR #70;
2. OpenBao-hosted Imperium Service Port decision — merged through PR #71;
3. executable service-port client and workflow definition — merged through PR #72;
4. pinned-binary pressure — stopped after confirmed workflow-CAS defect;
5. local `.env` bridge decision and replaceable adapter — candidate review and merge gated;
6. existing lease-to-provider composition with the local source — next bounded increment;
7. B2.3 evidence review and closure as a nonproduction bridge — blocked.

The `.env` bridge must be replaced before real credentials, shared-host
custody, multi-process access, non-local deployment, B4, or production.

## Current Gate

Require explicit authorization to merge the local-environment bridge
candidate.

