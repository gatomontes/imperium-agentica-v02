# B2.1 Secret Custody and Adapter Pressure Run 001

## Subject

Existing repository contracts before the B2.1 draft boundary.

## Result

```text
10 PASS / 8 FAIL
```

## Pass

- Access Grant remains distinct from credential value.
- Locksmith retains credentials.
- Barbican does not carry credentials.
- provider acceptance does not create Authority.
- provider stages remain non-inferential.
- Runtime rechecks Authority before consequential dispatch.
- Runtime Observation Envelopes exclude credential values.
- Provider Intervention Ledgers exclude credential values.
- Provenance can preserve custody and version lineage.
- Runtime natively owns credential-custody mechanisms and provider adapters.

## Fail

1. no canonical Secret Binding Reference
2. no bounded Secret Operation Request
3. no Runtime-confined Custody Execution Context
4. no provider-neutral lifetime-intersection rule
5. no rotation-generation and supersession rule
6. no revocation/outage/recovery boundary specific to credentials
7. no explicit cache prohibition or bounded cache requirement
8. CB-005 Muster language contradicts the no-credential-transfer rule

## Finding

B2.1 is necessary.

The failures do not authorize implementation. They define the smallest candidate boundary and one production convergence blocker.
