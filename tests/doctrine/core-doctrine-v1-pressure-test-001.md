# Core Doctrine v1 Pressure Test 001

## Result

`PASS — 12/12 focused executable cases`

## Subject

- `doctrine/bills/core-doctrine-v1-bill-001.md`
- `src/core-doctrine-v1.ts`
- Senator-led propagation additions in `src/senate.ts`

## Covered boundaries

- exact and complete eighteen-provision bill;
- authority, evidence, provenance, identity, stewardship, containment,
  Tribunalis, Curia, Operator intent, obligations, recourse, and propagation;
- exclusion of implementation mechanisms from Core Doctrine;
- Senate-only enactment with mandatory Senator assignment;
- independent Citadel and Colosseum conformance;
- non-percentage, non-compensatory Tribunalis judgment;
- bounded fail-closed behavior;
- assigned-Senator-only propagation stewardship;
- evidenced completeness of affected-surface discovery before closure readiness;
- exact authority for propagation exemptions;
- unresolved propagation remains open; and
- resolved propagation requires evidence.

## Commands and evidence

```text
vitest run tests/senate.test.ts tests/core-doctrine-v1.test.ts
2 files PASS
12 tests PASS

tsc --noEmit [focused Senate/Core Doctrine surface]
PASS
```

## Adjacent baseline findings

The repository-wide scripted suite also ran 180 tests: 176 passed, two were
skipped, and two failed. The failures are inherited pre-Senate defects already
classified by DR-070 rather than changes introduced by this bill:

- `tests/in-memory-transport.test.ts` expects a source reference not preserved
  by the current transport implementation;
- repository-wide typecheck reports existing transport export divergence and
  stale Petition fixtures in `tests/reference-boundary.test.ts`.

These findings remain `REUSE_CANDIDATE_WITH_FINDINGS` / conformance-reset work.
They do not prevent focused constitutional review, and this record does not
claim repository-wide conformance.

## Independent review correction

The first focused pass allowed closure readiness after all supplied assessments
were resolved but did not prove that the Senator had discovered every affected
surface. The corrected contract requires an explicit `scopeComplete` finding
with evidence; otherwise propagation remains `IN_PROGRESS`. It also requires
an exact authority reference for `EXEMPTED` dispositions. The added case passes.

## Constitutional boundary

Passing tests establish internal bill/kernel consistency only. They do not
enact Core Doctrine v1, admit an Office profile, close Senator propagation, or
authorize operational work.

## Disposition

The bill is ready for independent Senate review and a separate enactment
decision.
