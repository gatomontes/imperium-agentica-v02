# Authority Tests

## Purpose

Pressure authority-origin, grant, scope, delegation, loss, non-transfer, deployment authorization, and authentication-requirement satisfaction semantics.

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

## Merged B1.1 Draft Evidence

- baseline pressure: 5 PASS / 10 FAIL
- corrected pressure: 15 PASS / 0 FAIL
- cross-layer convergence: 12 PASS / 0 FAIL
- production semantic files changed: 0

## Active B1.2 Authentication-Proof Candidate

- baseline pressure: 7 PASS / 11 FAIL
- corrected pressure: 18 PASS / 0 FAIL
- cross-layer convergence: 14 PASS / 0 FAIL
- production semantic files changed: 0
- implementation files changed: 0

Candidate distinctions:

```text
authentication requirement ≠ proof presentation
proof presentation ≠ provider observation
provider observation ≠ Authority satisfaction
satisfaction ≠ deployment authorization
successful authentication ≠ Access Grant
credential possession ≠ custody authority
```

Decision: active B1.2 draft evidence; not admitted into AB-003.
