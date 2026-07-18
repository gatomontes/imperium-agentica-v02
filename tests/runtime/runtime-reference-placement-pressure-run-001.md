# Runtime Reference Placement Pressure Run 001

## Status

Completed against the pre-placement merged reference evidence.

## Result

```text
5 PASS / 6 FAIL
```

| ID | Result | Pre-placement finding |
|---|---:|---|
| RRP-001 | FAIL | Executable source is owned by a test evidence directory. |
| RRP-002 | FAIL | Test owner and test consumer are the same package. |
| RRP-003 | FAIL | No layer-owned private package identity exists. |
| RRP-004 | FAIL | No explicit supported export map exists. |
| RRP-005 | FAIL | Tests import their own local implementation path. |
| RRP-006 | PASS | RTB-002 production manifest is unchanged. |
| RRP-007 | PASS | Existing boundaries refuse semantic ownership transfer. |
| RRP-008 | PASS | Contract pins cite exact admitted artifacts. |
| RRP-009 | PASS | Prior successor suite passes 35 / 35. |
| RRP-010 | PASS | Historical harness passes 11 / 11. |
| RRP-011 | FAIL | Test package identity is accidental rather than a declared reference surface. |
