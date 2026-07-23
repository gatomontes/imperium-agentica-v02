# B2.3 OpenBao Imperium Service-Port Executable Candidate 001

## Status

Repository-local executable and static-definition candidate. Review complete. Merge gated.

No OpenBao process, binary, network, account, credential, plugin, fork, deployment, or external effect is introduced.

## Authorization

Prepared under the operator instruction:

> Proceed

This activates the next bounded increment recorded after PR #71: an executable Runtime-facing client contract and pinned workflow-definition candidate using synthetic fixtures only.

## Client Contract

`OpenBaoImperiumServicePortBackend` maps an opaque secret reference to exactly:

- one admitted operation ID;
- one positive expected secret version.

The injected transport receives only:

- the admitted operation ID;
- a freshly generated non-secret service-port correlation ID.

The adapter sends no OpenBao path, method, mount, field, policy, workflow, RoleID, SecretID, wrapping token, client token, credential header, or network mechanism.

The transport owns delivery of the one-use wrapping proof and the fixed endpoint mapping. It may not reinterpret the operation ID as arbitrary caller authority.

## Response Contract

The client accepts a successful response only when `data` contains exactly:

- `operation_id`;
- `correlation_id`;
- `version`;
- `material`.

Operation, correlation, and version must match the request-side binding. Empty material, enlarged output, token-bearing keys, non-null `auth`, non-null `wrap_info`, malformed JSON, non-200 status, and transport failure all refuse behind one generic error.

Mutable response bytes are cleared on success and refusal. UTF-8 and JSON parsing still create immutable strings; complete erasure is not claimed.

## OpenBao Definition

The synthetic definition fixes:

- workflow operation: `synthetic-provider-recovery-v1`;
- AppRole: `imperium-service-port-synthetic`;
- wrapping creation path: `auth/approle/role/imperium-service-port-synthetic/secret-id`;
- KV binding: static internal path
  `imperium-synthetic/data/runtime/provider/recovery` with request data
  `version = 7`;
- selected field: `credential`;
- token revocation: `auth/token/revoke-self`;
- output order: after the revoke request;
- workflow mutation: check-and-set required;
- workflow execution: no pre-existing OpenBao client token;
- SecretID uses: 1;
- generated token uses: 2;
- token TTL and hard maximum: 30 seconds;
- default policy: excluded;
- policy paths: exact read and self-revoke only.

The caller supplies only a wrapping token and correlation ID to the fixed workflow. It cannot supply a path, mount, field, version, RoleID, policy, expression, or workflow.

## Existing Lease Boundary

The backend returns the same `{ material, classification, version }` contract already proven to enter `SyntheticSecretStorePort.acquireAsync()`.

No consume or provider-dispatch contract changes. Consumption remains synchronous, bound, expiring, and one-use.

Server-side secret revocation is not claimed by the client backend. Its `revoke()` response is `false`; local lease invalidation remains distinct from OpenBao secret mutation.

## Direct KV Candidate

The earlier direct KV v2 backend remains repository evidence for exact API parsing and health classification.

It is no longer the selected live authentication target because DR-003 requires the reusable OpenBao token to remain inside OpenBao.

## Non-Claims

This candidate does not prove:

- OpenBao HCL parsing or workflow admission;
- live wrapping lookup or unwrap;
- AppRole login;
- two-use token accounting;
- read-before-revoke and revoke-before-output behavior in OpenBao;
- audit redaction or trace denial;
- TLS, listener, policy installation, rate limiting, outage, restart, or recovery behavior;
- real credential safety;
- plugin or core-fork necessity;
- B2.3 closure.

## Next Gate

Merge or reject this candidate.

If merged, the next bounded increment is pinned-binary workflow compatibility pressure with synthetic material. It requires separate authorization because this increment downloads or starts no OpenBao binary.
