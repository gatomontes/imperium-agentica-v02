# B2.3 OpenBao Asynchronous Acquisition Conformance Plan 001

## Status

Candidate plan exercised by repository-local deterministic tests.

## Conformance Axes

| Axis | Required behavior |
|---|---|
| release pin | exact OpenBao 2.6.1 tag, commit, and checksum-manifest digest |
| asynchronous seam | backend is awaited before entering the existing lease |
| synchronous preservation | provider consumption and Runtime dispatch remain synchronous |
| exact reference | mount, path, field, and positive version are configured |
| request minimum | method, encoded path, exact version, and accept type only |
| auth separation | no token or credential header enters the adapter request |
| KV response | only exact metadata version and configured string field are accepted |
| cleanup | mutable raw response bytes are zeroed on success and refusal |
| generic failure | transport and response detail do not escape acquisition |
| health | known statuses classified; unknown/failure unavailable |
| dependency boundary | no fetch, network module, SDK, environment, filesystem, or credential mechanism |
| one-use lease | asynchronous material enters the existing bound, expiring, one-use lease |
| evidence honesty | immutable JSON-parser string copies and secure-erasure uncertainty recorded |
| side effects | no network, process, file, provider, instance, credential, or deployment |

## Merge Gate

Before candidate merge:

1. focused OpenBao executable: 10 / 10;
2. asynchronous lease integration: PASS;
3. changed executable syntax: PASS;
4. package export and stable placement updated;
5. no production manifest or semantic admission change;
6. no real OpenBao instance, credential, network contact, or external effect;
7. independent candidate review records limitations and next pressure.

## Non-Goal

Passing this plan does not complete B2.3 or authorize B2.4.
