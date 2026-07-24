# Runtime Reference

## Status

Stable nonproduction placement for the dependency-free Runtime reference implementation.

This directory is Runtime-owned executable reference material. It is not part of the admitted `RTB-002` production manifest and does not represent a deployed or production-ready Runtime.

## Why This Location Exists

The implementation survived three separate evidence increments:

1. contract-bound reference dispatch
2. single-node filesystem recovery
3. deterministic distributed-concurrency pressure

Keeping the implementation under `tests/` made tests both owner and consumer. Repeated reuse now justifies one layer-owned nonproduction home while tests remain its independent consumers.

## Supported Reference Surface

The private package manifest exposes only these paths:

| Export | Purpose |
|---|---|
| `@imperium-agentica/runtime-reference` | `ReferenceRuntime` effect-boundary realization |
| `@imperium-agentica/runtime-reference/contracts` | exact admitted contract pins and validators |
| `@imperium-agentica/runtime-reference/adapters/in-memory` | deterministic in-memory stores and simulated ports |
| `@imperium-agentica/runtime-reference/adapters/file` | single-process append-and-fsync filesystem evidence |
| `@imperium-agentica/runtime-reference/coordination/deterministic` | linearizable in-memory quorum and fencing oracle |
| `@imperium-agentica/runtime-reference/providers/node-process-supervisor` | injected, credentialless Node process-supervisor reference adapter |
| `@imperium-agentica/runtime-reference/security/locksmith-access` | fixed-operation, provider-neutral Runtime boundary to Locksmith-owned fulfillment |

The placement and export names are stable enough for repository tests and future bounded investigations. Behavior remains revisable and contestable by evidence.

## Historical Retired Security Implementations

The following source modules and their direct-path tests remain repository evidence but are no longer exposed by the package API:

- `synthetic-credential-broker.mjs`
- `synthetic-credential-node-process-supervisor-adapter.mjs`
- `synthetic-secret-store-port.mjs`
- `openbao-kv-v2-secret-store-backend.mjs`
- `openbao-imperium-service-port-backend.mjs`

Their retention preserves deliberation and empirical history. It does not authorize active Runtime use. The sole active security-persistence-facing package export is `security/locksmith-access`.

## Node Process-Supervisor Adapter

The first environment-specific adapter targets the repository identity:

`node-process-supervisor-reference`

It accepts an injected driver and never imports a subprocess, network, credential, or deployment mechanism.

The driver receives only the effect identity, attempt identity, environment, component, scope, and action. The effect identity is an idempotency reference; the adapter does not prove provider-side idempotency.

| Driver result | Runtime effect result |
|---|---|
| `RECOVERY_INITIATED` | `SUCCEEDED` |
| `RECOVERY_REFUSED` | `FAILED` |
| unknown response or exception | `INDETERMINATE` |

`RECOVERY_INITIATED` means only that the injected driver accepted the operational request. It does not mean the component recovered, the Procedure completed, or a mission outcome was achieved.

## Historical Synthetic Credential Boundary

`SyntheticCredentialBroker` accepts only non-empty `Uint8Array` material explicitly classified as `SYNTHETIC_TEST_SECRET`.

Registration transfers test custody by copying the bytes and zeroing the caller's view. Consumption requires the exact environment, component, scope, and purpose binding; removes and zeroes broker custody before invoking one synchronous consumer; and zeroes the consumer view on return or failure. Handles are opaque capabilities and never appear in audit events. A separate non-capability identity supports redacted lifecycle evidence.

This is test evidence, not a real secret store. JavaScript cannot prevent a trusted consumer from copying bytes while its synchronous callback runs, and zeroing a view does not prove removal of every engine or operating-system copy. The broker has no environment-variable, file, keychain, transport, provider, encryption-at-rest, deployment, or real-credential mechanism.

## Historical Synthetic Provider Projection

`SyntheticCredentialNodeProcessSupervisorAdapter` composes the broker with the existing credentialless provider adapter.

The opaque handle is constructor-held and never enters a Runtime plan, observation, or provider request. The existing six-field operational request remains unchanged. After exact environment, component, scope, and purpose binding, the injected driver receives a temporary synthetic byte view as a separate second argument during one synchronous call.

Binding refusal or an absent/replayed handle maps to operational failure without invoking the driver. A driver exception, Promise result, or unknown provider response remains indeterminate. The broker zeroes the temporary view after the synchronous call.

This projection does not define a real credential format, header, environment variable, file, provider SDK, transport, authentication scheme, or live effect.

## Locksmith Access Port

`LocksmithAccessPort` accepts one fixed operation identity/version and an exact closed request containing non-secret Authority and Provenance finding references, the mission spine, expiry, and operation-specific parameters.

The caller cannot supply a persistence technology, backend path, mount, field, query, policy, authentication method, token, credential, or administrative operation. Unknown identities, versions, fields, parameters, expired requests, executor failures, and unexpected results refuse generically.

The injected executor represents Locksmith-owned fulfillment. It receives a frozen provider-neutral request. The port emits redacted staged observations without deciding Authority validity or Provenance sufficiency. It contains no persistence, transport, environment, credential, or provider mechanism.

This executable boundary does not implement a persistence adapter, select a device, admit exceptional Runtime credential custody, or authorize external effects.

## Synthetic Locksmith-Owned Adapter

`SyntheticLocksmithOwnedAdapter` is an internal, in-memory executor composed behind `LocksmithAccessPort`. It has no package export.

It accepts immutable non-secret operation records fixed to one operation version, Mission, Deployment, Operative Binding, provider, and exact operation parameters. Inactive records, unavailable state, mismatches, malformed configuration, duplicate effective records, and ticket replay refuse through the port's generic external surface.

The adapter contains no credential material, backend-native address, persistence mechanism, transport, environment reader, mutable administration API, or device selection. It demonstrates Locksmith ownership and boundary enforcement only.

## Historical Synthetic Secret-Store Port

`SyntheticSecretStorePort` separates acquisition from one-use consumption. Its external opaque lease maps privately to the broker capability, carries bounded acquisition and expiry metadata, and implements the broker-compatible `consume` surface used by the synthetic provider projection.

`InMemorySyntheticSecretStoreBackend` is a deterministic test backend. It accepts only synthetic byte material, zeroes the seed caller's view, and supports availability, replacement, revocation, and close pressure without persistence.

Lease binding covers environment, component, scope, and purpose. Expiry, explicit lease revocation, secret-reference revocation, store unavailability, absent references, and close fail without material disclosure. Audit events use a separate non-capability lease identity and omit both lease and broker handles.

`acquireAsync()` awaits an asynchronous backend and then uses the same broker registration and lease-construction path. The synchronous entry refuses a backend declared asynchronous before invoking it. Consumption remains synchronous.

This port does not itself select or emulate a real authentication method, SDK, network protocol, encryption scheme, file format, deployment, or availability guarantee.

## Historical OpenBao KV v2 Backend

`OpenBaoKvV2SecretStoreBackend` pins OpenBao 2.6.1 and maps configured opaque references to an exact mount, path, field, and positive KV version. It sends only method, path, and accepted media type through an injected authenticated transport. Missing references, response failures, malformed content, missing fields, and version mismatches refuse generically.

The injected transport owns authentication and network behavior. This package supplies no HTTP client, SDK, token header, AppRole bootstrap, environment variable, filesystem, or live connection. Health classification fails closed for unknown responses.

Mutable response bytes are zeroed after parsing. UTF-8 decoding and JSON parsing create immutable JavaScript strings, so this behavior does not prove complete memory erasure. Tests use only material classified as `SYNTHETIC_TEST_SECRET`.

## Historical OpenBao Imperium Service-Port Backend

`OpenBaoImperiumServicePortBackend` maps an opaque Runtime secret reference to one fixed operation ID and one positive secret version. Its injected transport receives only that operation ID and a fresh correlation ID; the Runtime client has no caller-selected OpenBao path, mount, field, policy, workflow, RoleID, token, credential header, or generic request surface.

The repository fixture pins an OpenBao 2.6.1 workflow that performs wrapping metadata lookup, conditional unwrap, AppRole login, one exact KV v2 read, token self-revocation, and minimum output. Its AppRole and policy contract bounds the SecretID to one use and the internal client token to two uses and a 30-second hard maximum. The exact KV version is supplied as internal logical request data, not as an HTTP query suffix.

This is repository-local synthetic evidence. The injected transport still owns wrapping-token custody, workflow endpoint selection, authentication, and network behavior. OpenBao 2.6.1 has not yet parsed or executed the HCL; no process, plugin, core fork, instance, credential, or network contact is included.

## Ownership Boundary

Runtime owns the operational implementation and adapter mechanics in this directory.

It consumes but does not own the cited Cognitive, Authority, Provenance, or Procedure contracts. Encoding those contracts in software does not transfer their semantic ownership.

## Nonproduction Boundary

`reference/` is intentionally parallel to `drafts/` and `production/`:

```text
layers/runtime/
├── drafts/       # retained semantic source drafts
├── production/   # admitted Runtime semantic artifacts
└── reference/    # nonproduction executable reference material
```

This placement does not establish:

- production admission or deployment
- consensus correctness or a networked cluster
- production durability or cross-platform power-loss safety
- provider integration or idempotency
- real credential custody or safety
- performance, availability, or live-recovery guarantees
- external-effect authority

## Verification

Executable consumers remain under:

`tests/runtime/reference-implementation-001/`

The test package imports this location directly and contains no duplicate source tree.
