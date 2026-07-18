# Cross-Layer Migration Manifest 001

## Status

Draft preflight manifest.

```text
Migration: NOT AUTHORIZED
Production admission: NOT AUTHORIZED
Source production changes: NONE
Target production changes: NONE
```

This manifest defines the dependency-closed transition required to relocate three CB-001 artifacts into the approved Authority and Provenance layer boundaries.

---

## Migration Thesis

This is not a three-file move.

It is one atomic transition across three production manifests:

```text
Cognitive Baseline CB-001
→ Cognitive Baseline CB-002

Authority production empty
→ Authority Baseline AB-001

Provenance production empty
→ Provenance Baseline PB-001
```

The cognitive ontology remains active.

Native authority and provenance contracts gain canonical homes.

No procedure or runtime behavior is admitted.

---

## Source Relocations

| Current source | Target | Operation |
|---|---|---|
| `layers/cognitive/production/executive-mandate.md` | `layers/authority/production/executive-mandate.md` | Semantic relocation and metadata normalization |
| `layers/cognitive/production/mission-concurrency-and-isolation-contract.md` | `layers/provenance/production/mission-correlation-and-isolation-contract.md` | Split and rename around provenance-native correlation/isolation semantics |
| `layers/cognitive/production/provider-intervention-ledgers.md` | `layers/provenance/production/provider-intervention-ledgers.md` | Semantic relocation and metadata normalization |

The source paths are removed only inside the final atomic migration commit after all target blobs and revised manifests have been verified.

---

## Target Authority Baseline AB-001

Candidate manifest:

1. `authority-origin-contract.md`
2. `authority-grant-profiles.md`
3. `executive-mandate.md`

Evidence required:

- Authority Test Run 001 — 10 PASS / 0 FAIL
- Authority Grant Profile Run 001 — 15 PASS / 0 FAIL
- new Executive Mandate specialization run
- Authority–Provenance Convergence Run 003 — PASS
- production admission review

### Executive Mandate Target Requirements

The target draft must:

- declare Authority as its native concern
- cite `authority-origin-contract.md`
- specialize `EXECUTIVE_DECISION`
- cite the applicable Provenance Contract
- preserve CEO, Standing Curia Assignment, competence, counsel, scope, interval, status, authority-loss, succession, and closure distinctions
- replace the unresolved generic Principal language with the tested Authority Basis grammar
- preserve `Origin: Cognitive Baseline CB-001`
- record supersession of the cognitive source path
- avoid redefining CEO cognitive responsibility

---

## Target Provenance Baseline PB-001

Candidate manifest:

1. `provenance-contract.md`
2. `mission-correlation-and-isolation-contract.md`
3. `provider-intervention-ledgers.md`

Evidence required:

- Provenance Test Run 002 — 10 PASS / 0 FAIL
- new mission-correlation specialization run
- new provider-ledger specialization run
- Authority–Provenance Convergence Run 003 — PASS
- production admission review

### Mission Correlation Target Requirements

The target draft must preserve:

- Mission Identity
- subordinate mission identities
- Operative Binding
- Curia Session and Muster Instance isolation
- shared immutable version references
- exact-match closure and release
- cross-mission collision handling
- prohibition on content-based correlation inference

It must split or externally cite:

- standing-role capacity policy
- authority-loss safe-state permission
- cognitive responsibilities of Curia and Muster
- runtime scheduling, queues, locks, or concurrency machinery

The target name is:

```text
mission-correlation-and-isolation-contract.md
```

The rename reflects the native provenance concern. Runtime concurrency remains excluded.

### Provider Ledger Target Requirements

The target draft must preserve:

- staged observation semantics
- non-inference between stages
- provider fact ≠ mission judgment
- exact mission, deployment, operative, ticket, and time correlation
- unknown, pending, not-observed, and not-required distinctions
- read-only audit-view lineage

It must cite rather than own:

- Armory and Locksmith cognitive responsibility
- Tool and Access authority
- CoS access authority
- mission success or evidence sufficiency

---

## Candidate Cognitive Baseline CB-002

CB-002 is a manifest-level successor that removes three foreign-native contracts.

Unchanged artifacts may retain their CB-001 content admission metadata and be incorporated into CB-002 by exact blob/version reference.

Candidate manifest: 33 cognitive artifacts.

### Intake And Mission Formation

1. `secretariat.md`
2. `castellan.md`

### Profession And Persona Production

3. `guildhall.md`
4. `studium.md`
5. `hagiography.md`
6. `foundry.md`
7. `pit.md`
8. `garrison.md`

### Recruitment

9. `conscription.md`

### Citadel Officers And Curia

10. `gesta.md`
11. `collegium.md`
12. `preceptory.md`
13. `smith.md`
14. `spur.md`
15. `session-assignment.md`
16. `ceo-president.md`
17. `chief-of-staff.md`
18. `standing-curia-role-requirements.md`
19. `counsel-availability-contract.md`
20. `mission-closure-and-release-contract.md`
21. `curia.md`

### Mission Assembly And Boundary

22. `muster.md`
23. `la-cortine.md`
24. `iron-gate.md`
25. `barbican.md`
26. `inquisition.md`
27. `armory-locksmith.md`
28. `theatre.md`

### Return And Reporting

29. `lazaretto.md`
30. `chamber-of-scribes.md`

### Cross-Cutting Cognitive Baseline

31. `cognitive-map.md`
32. `lifecycle.md`
33. `production-artifacts.md`

CB-002 remains placement-contested for procedural candidates. This migration does not resolve or admit Procedure.

---

## Cognitive Reference-Normalization Set

The following cognitive files contain direct semantic dependencies on the relocating contracts and require review or canonical-path citations.

### Executive Mandate Consumers

- `session-assignment.md`
- `ceo-president.md`
- `standing-curia-role-requirements.md`
- `mission-closure-and-release-contract.md`
- `curia.md`
- `cognitive-map.md`
- `lifecycle.md`
- `production-artifacts.md`

### Mission Correlation Consumers

- `chief-of-staff.md`
- `curia.md`
- `muster.md`
- `cognitive-map.md`
- `lifecycle.md`
- `production-artifacts.md`

### Provider Ledger Consumers

- `chief-of-staff.md`
- `curia.md`
- `armory-locksmith.md`
- `production-artifacts.md`

### Required Normalization Rule

Each consumer may retain a brief boundary statement.

It must cite the canonical target contract and must not redefine:

- authority grant semantics
- provenance relation or finding semantics
- provider-stage vocabulary
- collision handling
- exact-match lineage requirements

---

## Index And Operational Files

The migration commit must update:

- `README.md`
- `current-step.md`
- `next-steps.md`
- `layers/cognitive/README.md`
- `layers/cognitive/production/README.md`
- `layers/authority/README.md`
- `layers/authority/drafts/README.md`
- `layers/authority/production/README.md`
- `layers/provenance/README.md`
- `layers/provenance/drafts/README.md`
- `layers/provenance/production/README.md`
- `tests/README.md`
- `tests/cognitive/README.md`
- `tests/authority/README.md`
- `tests/provenance/README.md`

Working analyses remain historical drafts and are not rewritten merely because paths move.

---

## Draft Materialization Required Before Admission

### Authority

Create:

```text
layers/authority/drafts/executive-mandate.md
```

Already present:

```text
layers/authority/drafts/authority-origin-contract.md
layers/authority/drafts/authority-grant-profiles.md
```

### Provenance

Create:

```text
layers/provenance/drafts/mission-correlation-and-isolation-contract.md
layers/provenance/drafts/provider-intervention-ledgers.md
```

Already present:

```text
layers/provenance/drafts/provenance-contract.md
```

No production source is deleted during draft materialization.

---

## Test Gates

### Authority

- current Authority suite remains PASS
- Executive Mandate specialization tests PASS
- root Principal and Authority Basis tests PASS
- authority-loss and succession tests PASS

### Provenance

- current Provenance suite remains PASS
- mission-correlation and isolation tests PASS
- provider-stage non-inference tests PASS
- artifact-relative completeness remains PASS

### Cognitive Regression

Add a cognitive test proving:

```text
canonical contract relocation
≠ cognitive responsibility transfer
≠ ontology change
```

All existing CT-001 through CT-030 must remain PASS.

### Cross-Layer Convergence

Test:

- cognitive roles cite but do not own target contracts
- Authority consumes Provenance without defining it
- Provenance cites Authority without validating it
- artifact native ownership remains singular
- no procedure or runtime is admitted by relocation

### Admission Reviews

Required:

- Authority Production Admission Review 001
- Provenance Production Admission Review 001
- Cognitive Baseline CB-002 Review 001
- Cross-Layer Migration Review 001

---

## Baseline And Artifact Version Rule

A baseline is a versioned manifest of exact artifact versions.

An unchanged artifact may be incorporated into a later baseline without rewriting its content admission metadata.

Therefore:

```text
CB-002 may incorporate unchanged CB-001 artifact versions
by exact repository blob/version reference.
```

Changed artifacts receive new versions and supersession records.

Moved artifacts preserve their CB-001 origin while receiving AB-001 or PB-001 admission metadata.

Historical evidence is not overwritten.

---

## Atomic Execution Rule

The final migration must be one repository commit constructed from preverified blobs and one complete tree.

Required order before moving the branch reference:

1. materialize all target and revised-source blobs
2. verify exact expected content and target paths
3. verify complete AB-001, PB-001, and CB-002 manifests
4. verify all test and admission records
5. build one tree containing:
   - target production creations
   - revised cognitive consumers and indexes
   - source-path deletions
   - all test and review records
6. create one commit from the current approved parent
7. advance `main` only after tree verification

No sequential production state may expose:

- duplicate canonical origins
- deleted sources without targets
- partial baseline indexes
- mixed old and new canonical paths

---

## Rollback

Rollback is the exact parent commit of the atomic migration commit.

No history rewrite is required.

If post-migration review finds a structural defect:

- revert the migration commit
- restore CB-001 as current production
- return target artifacts to drafts
- record the failed migration evidence
- do not silently patch production

---

## Preflight Result

```text
DEPENDENCY GRAPH: COMPLETE
TARGET DRAFTS: 3 / 3
TARGET SPECIALIZATION TESTS: PASS
COGNITIVE REGRESSION RUN: 31 PASS / 0 FAIL
CROSS-LAYER CONVERGENCE: PASS
PRODUCTION ADMISSION REVIEWS: 4 / 4
ATOMIC MIGRATION: READY FOR OPERATOR DECISION
```

## Next Required Step

Operator reviews the complete admission package.

Migration remains withheld until explicit execution approval.

No additional draft or test prerequisite is currently missing.
