# Next Steps

## Status

Track A, B1, B2.1, and B2.1a are complete and closed.

B2.2's OpenBao selection is historical and no longer controls active implementation. Device selection is deferred until the Locksmith sole-accessor boundary is admitted and executable.

B2.3 is active at a superseding decision merge gate. B2 remains unimplemented as a live system.

## Track B

| Order | Leg | State |
|---:|---|---|
| B1 | Deployment authorization and authentication policy | closed |
| B2.1 | Secret custody and adapter boundary | closed; convergence review pending |
| B2.1a | Credential-transfer convergence correction | closed as CB-006 |
| B2.2 | Store evaluation and selection | historical OpenBao decision superseded; replacement deferred |
| B2.3 | Nonproduction adapter implementation | active; reset to Locksmith sole-accessor boundary |
| B2.4 | Empirical credential lifecycle and outage tests | blocked |
| B2.5 | B2 evidence review and closure | blocked |
| B3 | Live Runtime/provider driver | not active |
| B4 | Integrated nonproduction staging | not active |
| B5 | Production admission and deployment | not active |

## B2.3 Revised Sequence

1. merge the Locksmith sole-accessor decision candidate;
2. pressure admitted Cognitive contracts for device-access, custody, bearer, replay, cross-mission, expiry, revocation, confused-deputy, and outage cases;
3. admit the minimum Cognitive convergence correction if required;
4. define the Runtime-facing Locksmith port without backend-native inputs;
5. remove direct secret-store implementations from active Runtime reference exports while preserving historical evidence;
6. implement and pressure a synthetic Locksmith-owned adapter without selecting a device;
7. review the B2.3 evidence;
8. only then evaluate a concrete security-persistence device behind Locksmith.

## Current Gate

Require explicit authorization to merge the Locksmith sole-accessor decision candidate.

No persistence technology, real credential, running service, network contact, provisioning, deployment, Runtime action, or external effect is authorized.
