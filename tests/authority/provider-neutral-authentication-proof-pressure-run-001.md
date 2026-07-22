# Provider-Neutral Authentication-Proof Pressure Run 001

## Baseline

Existing production and B1.1 semantics were tested against eighteen authentication-proof pressures.

```text
PASS: 7
FAIL: 11
```

## Passing Coverage

- authentication remains distinct from authorization
- Access Grant contains no credential value
- provider ledgers preserve staged authentication observations
- Provenance preserves identity and correlation
- provider acceptance cannot originate Authority
- credentials do not imply permission
- infrastructure selection remains outside the current scope

## Failing Gaps

The baseline does not yet consolidate:

- one exact presentation identity and version
- exact requirement-to-presentation correlation
- acceptable and prohibited evidence classes
- verifier responsibility class
- audience, purpose, environment, and mission binding
- freshness and replay-resistance evaluation
- compromise and revocation handling
- explicit satisfied, not-satisfied, and unresolved outcomes
- disclosure minimization
- supersession and reassessment
- separation of provider observation from institutional satisfaction

## Result

A bounded B1.2 refinement is necessary.
