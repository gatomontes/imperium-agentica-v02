# B2.3 Direct Security Export Retirement Pressure Run 001

## Date

2026-07-23

## Status

Complete against the active Runtime reference package surface.

## Results

| # | Pressure assertion | Result |
|---:|---|---|
| 1 | Locksmith access is the sole active security-persistence-facing export | PASS |
| 2 | the synthetic credential broker is not actively exported | PASS |
| 3 | the synthetic credential provider projection is not actively exported | PASS |
| 4 | the synthetic secret-store port is not actively exported | PASS |
| 5 | the OpenBao KV v2 backend is not actively exported | PASS |
| 6 | the OpenBao Imperium service-port backend is not actively exported | PASS |
| 7 | stable package-placement expectations match the retired surface | PASS |
| 8 | historical synthetic credential source remains present | PASS |
| 9 | historical synthetic store source remains present | PASS |
| 10 | historical OpenBao source remains present | PASS |
| 11 | historical focused tests remain present and executable by direct repository path | PASS |
| 12 | prior deliberations, decisions, and pressure evidence are not deleted or rewritten | PASS |
| 13 | no replacement adapter is introduced in this increment | PASS |
| 14 | no persistence device, credential, transport, or external effect is introduced | PASS |

```text
PASS: 14
FAIL: 0
```

## Focused Executable

```text
tests: 3
pass: 3
fail: 0
```

## Finding

The direct credential and persistence implementations are retired from the active package surface without erasing their historical evidence. A synthetic Locksmith-owned adapter remains the next bounded increment.
