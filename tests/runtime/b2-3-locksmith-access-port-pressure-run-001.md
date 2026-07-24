# B2.3 Locksmith Access-Port Pressure Run 001

## Date

2026-07-23

## Status

Complete against the executable Runtime-facing Locksmith port candidate.

## Results

| # | Pressure assertion | Result |
|---:|---|---|
| 1 | the caller selects only an admitted fixed operation identity and version | PASS |
| 2 | unknown operation identities refuse before execution | PASS |
| 3 | unknown operation versions refuse before execution | PASS |
| 4 | an Authority-produced finding reference is mandatory | PASS |
| 5 | a Provenance correlation finding reference is mandatory | PASS |
| 6 | Mission, Deployment, Operative Binding, ticket, and provider identities are mandatory | PASS |
| 7 | expired requests refuse before execution | PASS |
| 8 | the top-level request is an exact closed schema | PASS |
| 9 | operation parameters are an exact operation-specific closed schema | PASS |
| 10 | caller-supplied backend path, mount, field, query, policy, token, or credential inputs refuse | PASS |
| 11 | the executor receives a frozen provider-neutral request | PASS |
| 12 | the accepted result surface is operation-specific and closed | PASS |
| 13 | executor exceptions become one generic external refusal | PASS |
| 14 | error details do not enter the result or observation | PASS |
| 15 | result-shape violations produce internal result-validation evidence | PASS |
| 16 | evidence contains no credential material or capability handle | PASS |
| 17 | evidence-sink failure cannot expand the external result | PASS |
| 18 | the port contains no persistence, transport, environment, or provider mechanism | PASS |

```text
PASS: 18
FAIL: 0
```

## Executable Result

```text
tests: 10
pass: 10
fail: 0
```

## Boundary

The injected executor represents Locksmith-owned fulfillment. This increment defines and pressures only the Runtime-facing port. It does not implement a persistence adapter, select a device, validate Authority findings, decide Provenance sufficiency, transfer credentials to Runtime, or contact an external provider.

## Finding

The port is eligible for the bounded nonproduction reference merge. Direct secret-store exports remain active until the separate retirement increment.
