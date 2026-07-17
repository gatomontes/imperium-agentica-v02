# Next Steps

## Status

Operational queue.

This file is not doctrine, a roadmap, or architecture.

It is an ordered list of candidate next actions.

When a step becomes active, remove it from this file and place it in `current-step.md`. Do not duplicate active work across both files.

---

## Queue

### 1. Define concurrent mission isolation and standing-role capacity

Reason:

Concurrent missions create concurrent Muster instances and Curia sessions. The cognitive model must prevent packets, Minutes, provider records, counsel, authority references, and release actions from crossing mission boundaries. It must also state what happens when the standing CEO or CoS cannot responsibly serve all active sessions.

Relevant files:

- `layers/cognitive/drafts/curia.md`
- `layers/cognitive/drafts/chief-of-staff.md`
- `layers/cognitive/drafts/muster.md`
- `layers/cognitive/drafts/provider-intervention-ledgers.md`
- `layers/cognitive/drafts/mission-closure-and-release-contract.md`
- `tests/cognitive/constitutional-tests.md`

Promotion condition:

This becomes current after CEO authority provenance is bounded and tested.

Removal or demotion condition:

Remove or demote it if scenarios show that existing mission correlation and standing-role contracts already preserve isolation without an additional cognitive contract.

---

### 2. Run a concurrent-mission collision scenario

Reason:

A structural contract is insufficient until a trace pressures it. The scenario should interleave at least two missions, similar provider requests, conflicting Curia timing, and one closure event to test cross-mission contamination.

Promotion condition:

This becomes current after the concurrency contract identifies the entities, artifacts, and invariants under test.

Removal or demotion condition:

Remove or merge it if the concurrency contract itself includes a sufficiently concrete trace.

---

### 3. Review draft-to-production admission evidence

Reason:

The cognitive draft layer now has a substantial connected ontology and repeated theoretical tests. Production must remain empty until the evidence shows which contracts are stable enough for admission as a minimal coherent set.

Relevant files:

- `layers/cognitive/README.md`
- `layers/cognitive/drafts/`
- `layers/cognitive/production/README.md`
- `tests/cognitive/`

Promotion condition:

This becomes current only after authority provenance and concurrency have passed theoretical tests and the operator requests an admission review.

Removal or demotion condition:

Keep all artifacts in drafts if unresolved structural gaps still alter responsibilities or authority boundaries.

---

### 4. Reconsider Vellum only if closure records expose a record gap

Reason:

Mission Closure Record, Curia Minutes, Operative Release Record, and Final Report may already provide sufficient internal and operator-facing memory. Vellum should not return on name or precedent alone.

Promotion condition:

This becomes current only when repeated scenarios reveal a specific canonical mission-record behavior that existing artifacts cannot preserve.

Removal or demotion condition:

Remove it if the existing artifact set remains sufficient.

---

### 5. Begin procedural modeling only after structural stabilization

Reason:

The cognitive map is structural, not operational. Procedures should be derived from tested authority and artifact boundaries rather than used to conceal unresolved ontology.

Promotion condition:

This becomes current after the operator judges the cognitive structure sufficiently stable and explicitly authorizes procedural work.

Removal or demotion condition:

Demote it whenever new scenarios reopen structural ownership, authority, or boundary questions.
