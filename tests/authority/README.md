# Authority Tests

## Purpose

Pressure authority-origin, grant, scope, delegation, loss, and non-transfer semantics.

## Admitted Evidence

Current admitted baseline:

- `AB-003`

The original AB-002 admission evidence remains:

- authority core: 10 PASS / 0 FAIL
- grant profiles: 15 PASS / 0 FAIL
- Executive Mandate: 12 PASS / 0 FAIL
- Mission Envelope Run 002: 15 PASS / 0 FAIL
- Capability Grant Run 002: 15 PASS / 0 FAIL
- aggregate Authority Regression Run 002: 67 PASS / 0 FAIL
- corrected convergence: 21 PASS / 0 FAIL

Later Runtime-maintenance admission advanced the manifest to AB-003 without changing the five core Authority contracts.

## Active Provider-Neutral Deployment Authorization Candidate

- baseline pressure: 5 PASS / 10 FAIL
- corrected pressure: 15 PASS / 0 FAIL
- cross-layer convergence: 12 PASS / 0 FAIL
- preserved Runtime successor suite: 91 PASS / 0 FAIL
- repository regression: PASS
- production semantic files changed: 0

Candidate distinctions:

```text
handoff eligibility ≠ deployment authorization
authentication ≠ authorization
Access Grant ≠ credential value
READY_FOR_LAUNCH ≠ deployment authorization
provider acceptance ≠ Authority source
authorization ≠ deployment execution
```

Decision: active B1.1 draft evidence; not admitted into AB-003.