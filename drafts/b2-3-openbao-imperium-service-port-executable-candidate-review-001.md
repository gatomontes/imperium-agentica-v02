# B2.3 OpenBao Imperium Service-Port Executable Candidate Review 001

## Status

Candidate review complete. Merge remains gated.

## Confirmed

- the client exposes an operation identifier, not a generic OpenBao request surface;
- wrapping proof custody remains behind the injected transport;
- no reusable OpenBao token enters Imperium;
- request correlation is fresh and response-bound;
- operation and exact secret version are response-bound;
- only the four-field service response is admitted;
- token-bearing or enlarged output refuses;
- mutable response bytes clear on success and refusal;
- workflow paths, RoleID placeholder, field, version, and response selection are static;
- wrapping creation-path comparison precedes unwrap;
- read precedes self-revoke and output follows self-revoke;
- SecretID and client-token uses are finitely bounded;
- token policy has no wildcard or administrative capability;
- the earlier one-use Runtime lease and synchronous dispatch contracts are unchanged;
- no OpenBao process, binary, network, credential, plugin, or fork exists.

## Correction Made During Review

The first parser revision treated the presence of a null `wrap_info` envelope field as credential leakage.

OpenBao responses may include `wrap_info: null`. The parser now permits only null or absent `wrap_info` while still refusing any non-null wrapping information and recursively refusing token-bearing keys.

The first workflow revision expressed the exact KV version as an HTTP query
suffix. OpenBao workflows construct internal logical requests instead: the
2.6.1 source copies `path` and `data` separately, and KV v2 reads `version`
from field data. The candidate now fixes the static path and supplies
`data.version = 7`; the test forbids query-version syntax in this workflow.

## Residual Risks

- static HCL shape is not proof that the pinned binary accepts or executes it;
- the creation-path `when` guard and skipped-dependency behavior require live synthetic pressure;
- exact two-use token behavior requires live synthetic pressure;
- workflow histories contain credential material internally and secure erasure is not established;
- trace denial, audit redaction, listener confinement, rate limiting, TLS, and outage behavior remain unproven;
- UTF-8 and JSON parsing create immutable JavaScript strings;
- the transport's wrapping-token custody mechanism remains undefined;
- local `revoke()` does not mutate the server secret.

## Conclusion

The candidate is coherent and appropriately bounded for merge as the second B2.3 implementation increment.

It does not close B2.3. The next increment should exercise the exact workflow against the pinned OpenBao 2.6.1 binary using synthetic material only.
