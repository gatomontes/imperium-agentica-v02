# Next Steps

## Status

Track A, B1, B2.1, and B2.1a are complete and closed.

DR-004 is merged. B2.2's OpenBao selection is historical; replacement device selection remains deferred.

B2.3 is active. Cognitive sole-accessor pressure found 15 PASS / 7 FAIL; candidate review passed 12 / 0. A bounded CB-007 convergence correction is required. B2 remains unimplemented as a live system.

## Track B

| Order | Leg | State |
|---:|---|---|
| B1 | Deployment authorization and authentication policy | closed |
| B2.1 | Secret custody and adapter boundary | closed; sole-accessor convergence correction required |
| B2.1a | Credential-transfer convergence correction | closed as CB-006 |
| B2.2 | Store evaluation and selection | historical OpenBao decision superseded; replacement deferred |
| B2.3 | Nonproduction adapter implementation | active; reviewed Cognitive pressure record at merge gate |
| B2.4 | Empirical credential lifecycle and outage tests | blocked |
| B2.5 | B2 evidence review and closure | blocked |
| B3 | Live Runtime/provider driver | not active |
| B4 | Integrated nonproduction staging | not active |
| B5 | Production admission and deployment | not active |

## B2.3 Revised Sequence

1. merge reviewed PR #75;
2. prepare exact CB-007 draft revisions for Armory/Locksmith, Muster, and Barbican;
3. rerun all 22 sole-accessor pressures against the drafts;
4. conduct Authority–Cognitive and Provenance–Cognitive convergence reviews;
5. conduct Cognitive production admission and request explicit promotion authorization;
6. define the Runtime-facing Locksmith port without backend-native inputs;
7. remove direct secret-store implementations from active Runtime reference exports while preserving historical evidence;
8. implement and pressure a synthetic Locksmith-owned adapter without selecting a device;
9. review B2.3 evidence;
10. only then evaluate a concrete security-persistence device behind Locksmith.

## Current Gate

Require explicit authorization to merge PR #75.

No persistence technology, real credential, running service, network contact, provisioning, deployment, Runtime action, or external effect is authorized.
