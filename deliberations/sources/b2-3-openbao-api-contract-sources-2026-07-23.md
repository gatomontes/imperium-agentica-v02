# B2.3 OpenBao API Contract Sources — 2026-07-23

## Status

Bounded official-source record for the B2.3 repository-local adapter candidate.

Accessed: 2026-07-23.

## Exact Release Pin

```text
Supported patch: OpenBao 2.6.1
Release tag: v2.6.1
Release commit: ba7ad88
SHA-256 of official checksums.txt: e6985523c63e527dc4f25f0121d53fc08c7e79bed955bb28d747d6724bc3535b
Unpinned latest reference: REFUSED
```

The install artifact is not downloaded in B2.3. A future B2.4 provisioning record must pin and verify the exact platform archive digest from the reviewed manifest before installation.

## Official Sources

- releases and signed v2.6.1 record: https://github.com/openbao/openbao/releases
- installation: https://openbao.org/docs/install/
- KV v2 HTTP API: https://openbao.org/api-docs/secret/kv/kv-v2/
- token authentication API: https://openbao.org/api-docs/auth/token/
- health API: https://openbao.org/api-docs/system/health/

## Contract Observations

- KV v2 exact-version reads use `GET /:mount/data/:path?version=:version`;
- secret values appear under `data.data`;
- response version metadata appears under `data.metadata.version`;
- health status 200 represents initialized, unsealed, active service;
- status 501 represents uninitialized service;
- status 503 represents sealed service;
- status 429 represents standby service.

## Evidence Limit

Documentation establishes the candidate HTTP mapping, not live compatibility, authentication, authorization, transport safety, availability, or credential custody.

No binary, package, SDK, instance, account, mount, token, AppRole, SecretID, secret, network contact, or external effect is introduced by this record.
