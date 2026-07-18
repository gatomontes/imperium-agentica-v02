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
| `@imperium-agentica/runtime-reference/security/synthetic-credentials` | in-memory, one-use synthetic credential boundary for tests |
| `@imperium-agentica/runtime-reference/providers/node-process-supervisor/synthetic-credentials` | synthetic-only projection from the one-use broker to the injected supervisor driver |
| `@imperium-agentica/runtime-reference/security/synthetic-secret-store` | expiring synthetic lease port with an in-memory test backend |

The placement and export names are stable enough for repository tests and future bounded investigations. Behavior remains revisable and contestable by evidence.

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

## Synthetic Credential Boundary

`SyntheticCredentialBroker` accepts only non-empty `Uint8Array` material explicitly classified as `SYNTHETIC_TEST_SECRET`.

Registration transfers test custody by copying the bytes and zeroing the caller's view. Consumption requires the exact environment, component, scope, and purpose binding; removes and zeroes broker custody before invoking one synchronous consumer; and zeroes the consumer view on return or failure. Handles are opaque capabilities and never appear in audit events. A separate non-capability identity supports redacted lifecycle evidence.

This is test evidence, not a real secret store. JavaScript cannot prevent a trusted consumer from copying bytes while its synchronous callback runs, and zeroing a view does not prove removal of every engine or operating-system copy. The broker has no environment-variable, file, keychain, transport, provider, encryption-at-rest, deployment, or real-credential mechanism.

## Synthetic Provider Projection

`SyntheticCredentialNodeProcessSupervisorAdapter` composes the broker with the existing credentialless provider adapter.

The opaque handle is constructor-held and never enters a Runtime plan, observation, or provider request. The existing six-field operational request remains unchanged. After exact environment, component, scope, and purpose binding, the injected driver receives a temporary synthetic byte view as a separate second argument during one synchronous call.

Binding refusal or an absent/replayed handle maps to operational failure without invoking the driver. A driver exception, Promise result, or unknown provider response remains indeterminate. The broker zeroes the temporary view after the synchronous call.

This projection does not define a real credential format, header, environment variable, file, provider SDK, transport, authentication scheme, or live effect.

## Synthetic Secret-Store Port

`SyntheticSecretStorePort` separates acquisition from one-use consumption. Its external opaque lease maps privately to the broker capability, carries bounded acquisition and expiry metadata, and implements the broker-compatible `consume` surface used by the synthetic provider projection.

`InMemorySyntheticSecretStoreBackend` is a deterministic test backend. It accepts only synthetic byte material, zeroes the seed caller's view, and supports availability, replacement, revocation, and close pressure without persistence.

Lease binding covers environment, component, scope, and purpose. Expiry, explicit lease revocation, secret-reference revocation, store unavailability, absent references, and close fail without material disclosure. Audit events use a separate non-capability lease identity and omit both lease and broker handles.

This port does not select or emulate a real secret-store vendor, authentication method, SDK, network protocol, encryption scheme, file format, deployment, or availability guarantee.

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
