# Tests

## Purpose

Theoretical and empirical specifications, immutable run records, regression evidence, and admission reviews by concern.

## Current Admitted Baselines

- Cognitive: `CB-004` — 34 artifacts
- Authority: `AB-003` — 6 artifacts
- Provenance: `PB-001` — 3 artifacts
- Procedure: `PRB-002` — 5 artifacts
- Runtime: `RTB-001` — 3 artifacts

## Current Candidate Evidence

Runtime Maintenance Artifact Closure 001:

```text
Admitted-baseline defect: 9 PASS / 5 FAIL
Corrected focused pressure: 15 PASS / 0 FAIL
Repository-wide regression: PASS
Admission convergence: 35 PASS / 0 FAIL
Empirical harness rerun: 11 PASS / 0 FAIL
```

Candidate transition:

```text
CB-004 → CB-005: 34 → 36
AB-003 unchanged: 6
PB-001 unchanged: 3
PRB-002 → PRB-003: 5
RTB-001 → RTB-002: 3
```

Production staging and admission remain unauthorized.

## Evidence Discipline

Historical runs remain evidence of the state tested at their recorded time.

A superseded expectation is classified explicitly rather than silently rewritten.

Simulated or theoretical evidence is not overstated as live implementation, distributed-systems, provider, credential, deployment, or performance proof.
