# Runtime Synthetic Secret-Store Port Pressure Run 002

## Status

Completed against the in-memory synthetic store port on 2026-07-18.

No real store, secret, provider, process, network, or external effect.

## Result

```text
Store-port pressures: 15 PASS / 0 FAIL
Focused port executable tests: 14 PASS / 0 FAIL
Preserved successor tests: 77 PASS / 0 FAIL
Combined successor suite: 91 PASS / 0 FAIL
Historical harness: 11 PASS / 0 FAIL
```

| ID | Result | Candidate finding |
|---|---:|---|
| RSSP-001 | PASS | Private package exposes the named synthetic store port. |
| RSSP-002 | PASS | Backend accepts only classified bytes and zeroes caller view. |
| RSSP-003 | PASS | Replacement exposes only current version. |
| RSSP-004 | PASS | Acquisition returns bounded metadata and opaque external lease. |
| RSSP-005 | PASS | Exact lease discloses once and captured view becomes zero. |
| RSSP-006 | PASS | Binding mismatch refuses without consuming lease. |
| RSSP-007 | PASS | TTL is bounded and use refuses at exact expiry. |
| RSSP-008 | PASS | Lease revoke and port close prevent later disclosure. |
| RSSP-009 | PASS | Secret-reference revoke invalidates active and future use. |
| RSSP-010 | PASS | Unavailable and absent stores expose one generic error. |
| RSSP-011 | PASS | Store lease works with provider projection without request widening. |
| RSSP-012 | PASS | Runtime and audits omit material and capability handles. |
| RSSP-013 | PASS | Driver failure consumes lease, suppresses detail, and zeros view. |
| RSSP-014 | PASS | Source contains no real persistence, transport, keychain, SDK, process, or provider mechanism. |
| RSSP-015 | PASS | All 77 prior successor tests remain green. |

## Evidence Limit

The backend is deterministic in-memory evidence, not a real secret-store implementation or availability claim.
