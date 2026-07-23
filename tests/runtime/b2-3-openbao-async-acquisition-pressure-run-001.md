# B2.3 OpenBao Asynchronous Acquisition Pressure Run 001

## Date

2026-07-23

## Candidate

OpenBao 2.6.1 repository-local KV v2 backend plus asynchronous acquisition into the existing synthetic one-use lease.

## Results

| Gate | Result |
|---|---|
| exact release pin | PASS |
| exact KV v2 version request | PASS |
| segment encoding | PASS |
| implicit latest refusal | PASS |
| unknown reference pre-transport refusal | PASS |
| sealed/absent/malformed/version mismatch generic failure | PASS |
| transport-detail suppression | PASS |
| explicit health classification | PASS |
| health cleanup and failure closure | PASS |
| no network/environment/filesystem/SDK/auth-header mechanism | PASS |
| asynchronous backend refuses synchronous entry without invocation | PASS |
| asynchronous acquisition enters existing one-use lease | PASS |
| replay refused | PASS |
| changed executable syntax | PASS |

```text
Focused OpenBao executable: 10 PASS / 0 FAIL
Asynchronous lease integration: PASS
Changed executable syntax: 5 PASS / 0 FAIL
Pressure gates: 14 PASS / 0 FAIL
Network contact: 0
Real credentials: 0
OpenBao instances: 0
External effects: 0
```

## Evidence Limits

The focused executable ran against an injected deterministic transport.

The lease integration ran directly against the branch source and existing broker contract.

The full repository suite was not reconstructed in the transient workspace. Stable-placement and existing synthetic-port consumers were syntax-checked; repository CI remains the final combined regression gate if available.

UTF-8 decoding and JSON parsing create immutable JavaScript strings whose complete erasure cannot be demonstrated. Mutable response and credential byte views are cleared, but secure erasure is not claimed.

## Finding

The bounded asynchronous-acquisition design survives its first deterministic pressure. It is a candidate, not B2.3 closure.
