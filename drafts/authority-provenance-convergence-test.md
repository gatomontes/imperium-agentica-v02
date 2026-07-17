# Authority–Provenance Convergence Test

## Status

Draft theoretical test.

Authority and provenance remain parallel concerns.

This document tests where both must be satisfied before an expected transition may proceed.

It does not admit a procedure, layer, runtime gate, shared institution, or combined authority-provenance artifact.

---

## Independent Questions

```text
Authority:
May this exact action occur under this exact scope?

Provenance:
Can the exact subject, inputs, transformations, grant, and correlation be traced?
```

Neither answer supplies the other.

---

## Four Outcomes

| Authority | Provenance | Finding |
|---|---|---|
| Effective | Complete | Transition is eligible for procedural consideration |
| Effective | Broken or unresolved | Authorized but untraceable; transition withheld or constrained under an external rule |
| Missing or ineffective | Complete | Traceable but unauthorized; transition withheld |
| Missing or ineffective | Broken or unresolved | Neither admissible nor actionable |

“Eligible” does not mean executed, successful, true, or procedurally complete.

---

## Convergence Invariant

```text
No provenance claim grants authority.

No authority grant repairs provenance.

A procedure may require both findings,
but may define neither.
```

---

## Candidate Transition Interface

A future procedure might reference an externally produced transition finding:

```text
Expected transition:
subject
source state
target state or expected next event
required Authority Finding
required Provenance Finding
referenced artifact definitions
alternate path when either finding is not satisfied
```

The procedure states the expected branch.

Authority defines the permission finding.

Provenance defines the lineage finding.

Runtime later implements evaluation and movement.

---

## Test Path — Return To Outbound Direction

### 1. Theatre Return Appears

Authority question:

- Was the deployment authorized to produce and return this material?

Provenance question:

- Does the return identify the exact mission, deployment, operative, source, and version?

Neither question is answered by the procedure.

### 2. Lazaretto Transforms The Return

Authority question:

- Under what rule may Lazaretto sanitize, redact, quarantine, or release the material?

Provenance question:

- Is the raw source preserved and is every transformation traceable?

A safe-looking output without transformation lineage fails provenance.

A traceable transformation performed without applicable authorization fails authority.

### 3. Curia Session Receives The Return

Authority question:

- Are the standing assignments and Executive Mandate effective for this mission and session?

Provenance question:

- Does the packet match the exact Curia Session and Mission Correlation Spine?

Capacity, authority, and correlation remain distinct findings.

### 4. CEO Decides

Authority question:

- Does the effective Executive Mandate cover this decision?

Provenance question:

- Can the decision be traced to the exact mandate, assignment, Situation Picture, evidence, counsel, and dissent versions considered?

A valid mandate does not prove the inputs were the cited inputs.

Complete decision lineage does not make an out-of-scope decision authorized.

### 5. Muster Operationalizes

Authority question:

- Does the decision authorize this exact outbound instruction?

Provenance question:

- Does the instruction preserve the exact decision, Curia Minute, mission, deployment, Operative Binding, and Muster Instance lineage?

Muster may translate format and operational detail without changing authorized substance.

The transformation must remain traceable.

### 6. Iron Gate Carries Outward Traffic

Authority question:

- Is external crossing and action authorized?

Provenance question:

- Can the outward payload be traced to the matching Muster instruction and authority reference?

Internal decision authority does not automatically become external-launch authority.

---

## Results

The test exposes two independent origin gaps.

### Authority Gaps

- root Principal and Authority Basis
- standing-assignment issuer
- sanitation and redaction authority
- Tool and Access Grant authority
- initial mission-binding authority
- initial and continuing external-action authority

### Provenance Gaps

- canonical minimum provenance contract
- authority over provenance-rule revision
- canonical artifact identity and version definitions
- semantic fidelity across transformations
- required lineage at each boundary
- disposition when provenance is partial but action is urgent

---

## Structural Finding

Authority and provenance can be investigated in parallel because neither depends on the other's semantics.

They converge at action eligibility because an authorized but untraceable transition and a traceable but unauthorized transition are both defective in different ways.

The concerns should not be merged.

---

## Next Test Questions

### Authority

Can a minimal Represented Principal + Authority Basis + Authority Grant grammar resolve the known grants without creating an upper-echelon institution?

### Provenance

Can one cognitive cross-cutting contract provide a canonical minimum, or does provenance require an information-and-record contract surface?

### Joint

Who or what may decide the disposition of an authorized-but-untraceable transition?

That decision itself requires authority and provenance and must not be silently assigned to procedure.

---

## Theoretical Convergence Run AP-001

```text
Mode: parallel-origin and convergence evaluation
Path: Theatre return to outward direction
Result: PASS WITH BLOCKERS
```

### Passed Distinctions

- authority and provenance remain independently evaluable
- neither concern inherits or repairs the other
- both may be required for transition eligibility
- procedure can consume their findings without owning their definitions
- runtime implementation remains outside both concerns

### Remaining Blockers

Authority:

- root Principal and Authority Basis
- grant specialization and delegation rules
- launch and capability-grant authority

Provenance:

- minimum lineage contract
- canonical provenance-revision authority
- relationship to artifact identity and version meaning

Shared external dependency:

- canonical artifact definitions

### Structural Result

```text
Authority layer candidate ─┐
                           ├─→ Procedure consumes findings
Provenance layer candidate ┘

Artifact-definition origin remains separate and unresolved.
```

The two layer candidates are parallel, not sequential.

Their contracts may cross-reference:

- an authority grant cites provenance
- a provenance assertion may cite an authority grant

Cross-reference does not merge ownership.

