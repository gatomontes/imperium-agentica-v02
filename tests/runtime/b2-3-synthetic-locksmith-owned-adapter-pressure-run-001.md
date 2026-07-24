# B2.3 Synthetic Locksmith-Owned Adapter Pressure Run 001

## Date

2026-07-23

## Status

Complete against the in-memory, device-neutral adapter composed behind the Locksmith access port.

## Results

| # | Pressure assertion | Result |
|---:|---|---|
| 1 | the adapter is not a package export | PASS |
| 2 | callers reach it only through the Locksmith access port | PASS |
| 3 | one exact active record fulfills the admitted fixed operation | PASS |
| 4 | inactive records refuse generically | PASS |
| 5 | unavailable state refuses generically | PASS |
| 6 | Mission mismatch refuses | PASS |
| 7 | Deployment mismatch refuses | PASS |
| 8 | Operative Binding mismatch refuses | PASS |
| 9 | provider mismatch refuses | PASS |
| 10 | operation-parameter mismatch refuses | PASS |
| 11 | one ticket cannot be replayed | PASS |
| 12 | malformed records fail construction | PASS |
| 13 | duplicate effective records fail construction | PASS |
| 14 | non-admitted operation records fail construction | PASS |
| 15 | records contain no credential or backend-native field | PASS |
| 16 | internal errors do not enter external refusal or evidence | PASS |
| 17 | staged redacted evidence is preserved by the port | PASS |
| 18 | source contains no device, transport, filesystem, environment, or credential mechanism | PASS |

```text
PASS: 18
FAIL: 0
```

## Executable Result

Focused adapter:

```text
tests: 9
pass: 9
fail: 0
```

Combined Locksmith port and adapter:

```text
tests: 19
pass: 19
fail: 0
```

## Boundary

This adapter stores only immutable non-secret synthetic operation bindings in memory. It does not store, derive, retrieve, rotate, revoke, or transfer credential material. Constructor records and an injected availability predicate are test fixture inputs, not admitted administration APIs.

## Finding

The synthetic Locksmith-owned adapter satisfies the bounded B2.3 implementation objective without selecting or emulating a security-persistence device.
