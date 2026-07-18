# Runtime Synthetic Secret-Store Port Necessity Analysis 001

## Status

Completed against the merged synthetic broker and provider projection.

## Question

What is the smallest store-facing boundary that tests acquisition metadata, expiry, revocation, and unavailable-store behavior without selecting a vendor or handling a real secret?

## Finding

A broker-compatible lease port over a deterministic in-memory synthetic backend is necessary and sufficient for this bounded experiment.

The existing broker and projection demonstrate one-use consumption after material already exists in process. They do not demonstrate:

- an acquisition interface
- secret reference and version metadata
- bounded lease lifetime
- store-unavailable behavior
- secret-reference revocation across active leases
- replacement of stored versions
- separation between an external lease and internal broker capability

## Alternatives

### Environment-variable or file source

Rejected.

Both introduce ambient access or persistence and do not model availability, version, or revocation cleanly.

### Real vendor SDK

Rejected.

This would combine port semantics with account selection, credentials, network behavior, billing, vendor contracts, and deployment.

### Extend the broker into a store

Rejected.

The broker's responsibility is one-use in-process custody. Acquisition, availability, version, and lease expiry are independent concerns.

### Synthetic backend plus lease port

Selected.

It preserves the broker boundary, permits deterministic time and failure pressure, and remains dependency-free and deletable.

## Required Behaviors

- synthetic classification and byte representation only
- caller seed view zeroed
- current version replacement
- opaque external lease distinct from broker handle and audit identity
- redacted acquisition, version, and expiry metadata
- exact binding and one-use broker handoff
- maximum TTL and exact expiry refusal
- lease, secret-reference, and close revocation
- absent and unavailable store fail closed with one error
- provider projection compatibility
- Runtime and audit records omit material and handles
- exceptional driver path consumes lease and zeros view
- no persistence, environment, keychain, network, SDK, process, provider, or deployment mechanism

## Result

```text
SYNTHETIC SECRET-STORE PORT EVIDENCE: NECESSARY
IN-MEMORY BACKEND PLUS BROKER-COMPATIBLE LEASE: MINIMAL
REAL STORE OR VENDOR SDK: NOT JUSTIFIED
```
