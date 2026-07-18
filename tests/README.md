# Tests

## Purpose

Theoretical and empirical specifications, immutable run records, regression evidence, and admission reviews by concern.

## Production-Staging Baselines

- Cognitive: `CB-005` — 36 artifacts
- Authority: `AB-003` — 6 artifacts, unchanged
- Provenance: `PB-001` — 3 artifacts, unchanged
- Procedure: `PRB-003` — 5 artifacts
- Runtime: `RTB-002` — 3 artifacts

## Runtime Maintenance Admission Evidence

```text
Admitted-baseline defect: 9 PASS / 5 FAIL
Corrected focused pressure: 15 PASS / 0 FAIL
Repository-wide regression: PASS
Admission convergence: 35 PASS / 0 FAIL
Empirical harness rerun: 11 PASS / 0 FAIL
```

The seven-target production tree is staged for verification. Merge remains separately gated.

## Evidence Discipline

Historical runs remain evidence of the state tested at their recorded time.

A superseded expectation is classified explicitly rather than silently rewritten.

Simulated or theoretical evidence is not overstated as live implementation, distributed-systems, provider, credential, deployment, or performance proof.
