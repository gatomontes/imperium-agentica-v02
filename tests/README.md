# Tests

## Purpose

Theoretical and empirical specifications, immutable run records, regression evidence, and admission reviews by concern.

## Current Admitted Baselines

- Cognitive: `CB-006` — 36 artifacts
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
Post-merge empirical harness: 11 PASS / 0 FAIL
Post-merge manifests: 53 / 53
Canonical targets: 7 / 7
```

Runtime Maintenance Artifact Closure 001 is admitted and post-merge verified.

## Reference Implementation Evidence

Runtime Reference Implementation 001 is merged as noncanonical executable evidence.

```text
Historical current-semantic pressure: 5 PASS / 10 FAIL
Historical executable regression: 11 PASS / 0 FAIL
Successor focused pressure: 15 PASS / 0 FAIL
Repository regression: PASS
Production semantic files changed: 0
```

## Single-Node Durability Evidence

```text
Pre-extension durability pressure: 3 PASS / 10 FAIL
Corrected durability pressure: 13 PASS / 0 FAIL
Combined successor suite: 24 PASS / 0 FAIL
Historical harness: 11 PASS / 0 FAIL
Repository regression: PASS
Production semantic files changed: 0
```

The durability extension is merged as noncanonical, test-scoped, single-node filesystem evidence.

## Distributed-Concurrency Evidence

```text
Pre-extension distributed pressure: 2 PASS / 10 FAIL
Corrected distributed pressure: 12 PASS / 0 FAIL
Combined successor suite: 35 PASS / 0 FAIL
Historical harness: 11 PASS / 0 FAIL
Repository regression: PASS
Production semantic files changed: 0
```

The distributed-concurrency extension is merged as noncanonical deterministic evidence.

## Stable-Placement Evidence

```text
Pre-placement pressure: 5 PASS / 6 FAIL
Corrected placement pressure: 11 PASS / 0 FAIL
Combined successor suite: 40 PASS / 0 FAIL
Historical harness: 11 PASS / 0 FAIL
Repository regression: PASS
Production manifest files changed: 0
```

Stable nonproduction placement is merged; tests remain independent consumers of `layers/runtime/reference/`.

## Current Provider-Adapter Candidate

```text
Pre-adapter pressure: 4 PASS / 9 FAIL
Corrected adapter pressure: 13 PASS / 0 FAIL
Combined successor suite: 52 PASS / 0 FAIL
Historical harness: 11 PASS / 0 FAIL
Repository regression: PASS
Production semantic files changed: 0
```

The Node process-supervisor adapter remains injected, credentialless, nonproduction, and free of live effects.

## Evidence Discipline

Historical runs remain evidence of the state tested at their recorded time.

A superseded expectation is classified explicitly rather than silently rewritten.

Simulated or theoretical evidence is not overstated as a consensus implementation, live distributed system, provider, credential, deployment, or performance proof.


## Muster Credential-Transfer Admission Evidence

```text
Admitted-baseline pressure: 12 PASS / 4 FAIL
Corrected draft pressure: 16 PASS / 0 FAIL
Cross-layer convergence: 18 PASS / 0 FAIL
Production admission: 20 PASS / 0 FAIL
Cognitive manifest: 36 / 36
Other admitted baselines changed: 0
Implementation files changed: 0
```

CB-006 revises only Muster's credential-transfer semantics. It does not select or implement a credential store, provider, adapter, or Runtime operation.
