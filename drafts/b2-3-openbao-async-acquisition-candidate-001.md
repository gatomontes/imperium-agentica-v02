# B2.3 OpenBao Asynchronous Acquisition Candidate 001

## Status

Repository-local candidate under pressure. Not admitted, deployed, or connected to OpenBao.

## Authorized Boundary

Operator approval:

> Approved

This approves the bounded resolution proposed after PR #69:

- OpenBao acquisition may be asynchronous;
- acquisition produces the existing one-use in-memory lease;
- credential consumption and provider dispatch remain synchronous;
- complete JavaScript memory erasure is not claimed;
- no running OpenBao instance or real credential is introduced.

## Candidate Design

```text
injected authenticated transport
  -> exact OpenBao KV v2 version read
  -> mutable response bytes
  -> synthetic test material
  -> SyntheticSecretStorePort.acquireAsync()
  -> existing one-use bound lease
  -> existing synchronous consume and provider dispatch
```

The authenticated transport owns authentication. The adapter request contains only method, path, and accepted media type. It contains no token, Authorization header, AppRole material, SecretID, environment variable, SDK object, or network mechanism.

## Exact Patch

OpenBao 2.6.1 is pinned by release tag, release commit, and the SHA-256 of the official checksum manifest. No `latest` reference is accepted.

A platform archive digest is deferred until B2.4 because no archive is selected or downloaded here.

## Runtime Boundary

`SyntheticSecretStorePort.acquireAsync()` awaits an asynchronous backend and then enters the same lease-construction path used by synchronous synthetic acquisition.

The synchronous `acquire()` path refuses a backend marked asynchronous before calling it. This prevents accidental Promise creation or material abandonment.

No Runtime dispatch contract becomes asynchronous.

## KV v2 Boundary

Each configured opaque secret reference resolves to exactly:

- one mount;
- one path;
- one value field;
- one positive integer version.

Missing references, implicit latest versions, non-200 responses, malformed JSON, missing values, version mismatches, and transport failures refuse behind one generic acquisition error.

## Health Boundary

Health responses classify as READY, UNINITIALIZED, SEALED, STANDBY, or UNAVAILABLE. Unknown statuses and transport failure are unavailable, never ready.

## Explicit Non-Claims

This candidate does not prove:

- real authentication or AppRole bootstrap;
- token renewal or revocation;
- TLS, DNS, network, SDK, or HTTP-client behavior;
- OpenBao policy or mount configuration;
- live KV compatibility;
- complete erasure of immutable strings created by UTF-8 decoding or JSON parsing;
- store durability, availability, backup, restore, or outage behavior;
- real credential safety;
- production admission or deployment.

## Next B2.3 Increment

If this candidate merges, the next bounded question is the authenticated-transport and bootstrap contract. That work must remain synthetic and network-free unless separately authorized.
