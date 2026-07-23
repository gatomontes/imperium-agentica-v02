# B2.3 OpenBao Service-Port Executable Sources — 2026-07-23

## Status

Bounded official-source record for the repository-local executable service-port candidate.

Accessed: 2026-07-23.

## Exact Version

```text
OpenBao version: 2.6.1
Release tag: v2.6.1
Previously recorded release commit: ba7ad88
Previously recorded checksum-manifest SHA-256: e6985523c63e527dc4f25f0121d53fc08c7e79bed955bb28d747d6724bc3535b
```

No binary or archive is downloaded in this increment.

## Official Sources

- Profiles engine and workflow grammar: https://openbao.org/docs/concepts/profiles/
- Workflows management and execution API: https://openbao.org/api-docs/system/workflows/
- Response-wrapping lookup: https://openbao.org/api-docs/system/wrapping-lookup/
- Response-wrapping unwrap: https://openbao.org/api-docs/system/wrapping-unwrap/
- AppRole API: https://openbao.org/api-docs/auth/approle/
- Token self-revocation: https://openbao.org/api-docs/auth/token/
- KV v2 exact-version read: https://openbao.org/api-docs/secret/kv/kv-v2/

## Contract Findings

- workflow inputs can be required and typed;
- requests execute synchronously in definition order;
- unexpected failure stops later requests;
- input and prior response fields can supply later request data and tokens;
- output fields are explicitly selected;
- a wrapping token can authenticate lookup and unwrap without also being placed in request data;
- AppRole login returns its token under `auth.client_token`;
- AppRole can limit SecretID uses, token uses, token lifetime, policy, and token type;
- token self-revocation uses `POST auth/token/revoke-self`;
- exact KV v2 reads carry a positive `version` field.
- OpenBao `v2.6.1` workflow source copies `path` and `data` separately into
  the internal logical request; the KV v2 backend reads `version` from field
  data. Therefore the workflow uses a static path plus `data.version`, not an
  HTTP query suffix.

## Candidate Inference

The repository definition composes those documented primitives as:

```text
lookup wrapping metadata
  -> require exact creation path
  -> unwrap one-use SecretID
  -> AppRole login
  -> fixed exact-version KV read
  -> token self-revocation
  -> selected output
```

The definition limits the AppRole SecretID to one login and the generated token to two operations: read, then revoke.

## Evidence Limit

Repository tests establish client and static-definition conformance only.

They do not prove that OpenBao 2.6.1 accepts the HCL, that the `when` expression behaves as intended, that a two-use token can perform read then self-revoke, that audit history is adequately redacted, or that failure prevents output in the pinned binary.

Those remain pinned-binary synthetic compatibility pressure.
