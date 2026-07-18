# Runtime Maintenance Artifact Necessity Analysis 001

## Status

Working analysis. Not admitted.

Parent investigation:

`drafts/runtime-maintenance-artifact-closure-001.md`

## Defect Confirmed

The admitted path contains an undefined required artifact:

```text
Master Mason
→ exact bounded Maintenance Instruction
→ Runtime realization
```

Master Mason names the instruction but withholds its final artifact contract. Procedure invokes it without a canonical definition. Runtime cannot accept a realization unit whose required input meaning is undefined.

## Adjacent Finding

The problem is not limited to one missing noun.

Master Mason's finding vocabulary currently mixes three different stages:

- operating condition: `RUNTIME_HEALTHY`, `RUNTIME_DEGRADED`, `RUNTIME_CONDITION_INDETERMINATE`
- maintenance need or eligibility: `RUNTIME_MAINTENANCE_REQUIRED`, `RUNTIME_MAINTENANCE_ELIGIBLE`, `RUNTIME_MAINTENANCE_BLOCKED`, `RUNTIME_RECOVERY_REQUIRED`
- onward handling: `STRUCTURAL_CHANGE_REQUIRED`, `ESCALATION_REQUIRED`

The Runtime Maintenance Procedure asks Master Mason to issue `RUNTIME_MAINTENANCE_ELIGIBLE` before its separate Eligibility Gate checks Procedure, Authority, correlation, effect safety, mappings, and abort conditions.

Therefore `eligible` is asserted before the conditions establishing eligibility have been evaluated.

## Required Separation

```text
Runtime observations
→ operating situation assembly
→ operational diagnosis
→ Procedure and Authority eligibility gate
→ maintenance direction
→ Runtime control-plane plan
→ Runtime effect
→ Runtime observation
→ reassessment
```

Diagnosis, direction, plan, and effect are distinct.

## Artifact Necessity Findings

| Candidate | Crosses a boundary? | Stable semantics required? | Working disposition |
|---|---:|---:|---|
| Runtime Operating Situation | Not necessarily | Not yet | Keep as Master Mason's internal assembly unless transfer or citation is demonstrated |
| Runtime Operational Diagnosis | Yes: Procedure and CONTROL_PLANE discretion cite it | Yes | Canonical Cognitive artifact required |
| Maintenance Instruction | Yes: Runtime consumes it | Yes | Canonical Cognitive meaning required |
| Maintenance Withholding Finding | Yes when it controls safe non-action and later reassessment | Yes, but not necessarily separate | Treat as a post-gate direction form |
| Escalation Record | Yes when transferred outside Master Mason | Yes, but no separate file is yet justified | Treat as a post-gate direction form until a distinct escalation route proves otherwise |

## Minimal Candidate Model

Two canonical Cognitive artifacts appear sufficient:

### 1. Runtime Operational Diagnosis

Owns the bounded mechanical judgment about Runtime's observed condition.

It requires independent identity and version because Procedure, Authority, later reassessment, and provenance may cite it.

It does not establish permission, procedural eligibility, Runtime state, mission meaning, or selected intervention.

### 2. Runtime Maintenance Disposition

Working label only.

Owns Master Mason's post-gate bounded maintenance direction. It has mutually exclusive forms:

```text
NO_INTERVENTION
INSTRUCT_MAINTENANCE
WITHHOLD_MAINTENANCE
ESCALATE_STRUCTURAL_CONDITION
```

The instruction form carries exact semantic maintenance intent to Runtime.

The withholding form preserves why no consequential action may occur, the required safe state, and re-entry conditions.

The escalation form preserves the diagnosed condition, blocked boundary, requested external decision, and prohibited assumptions.

These forms do not become Procedure exits, Authority findings, Runtime states, or mission dispositions.

## Instruction Versus Control-Plane Plan

| Maintenance Instruction form | Runtime Control-Plane Plan |
|---|---|
| Cognitive maintenance intent | Runtime mechanical realization plan |
| Selected by Master Mason within bounded responsibility | Constructed or represented by Runtime/control surface |
| Cites diagnosis, Procedure, Authority, scope, action class, limits, and intended operational outcome | Pins implementations, mappings, compatibility, resources, backups, mechanics, and execution gates |
| Does not prescribe commands or service topology | May select exact mechanisms permitted by the instruction |
| Cannot perform an effect | Cannot widen or reinterpret the instruction |

One cannot substitute for the other.

## Likely Contract Revisions

- revise Master Mason to separate diagnosis from post-gate direction and replace its five-product list with the demonstrated artifact model
- add canonical Cognitive semantics for Runtime Operational Diagnosis and the selected post-gate direction artifact
- revise Runtime Maintenance Procedure so diagnosis precedes eligibility and direction follows it
- revise CONTROL_PLANE bounded-discretion citations to distinguish diagnosis from direction
- revise Runtime realization acceptance to cite the exact instruction form and prohibit realization of withholding or escalation forms
- update the Cognitive artifact catalog and Cognitive map
- preserve PB-001 as the owner of identity, correlation, lineage, transformation, and supersession

## Baseline Pressure

A correction would likely require:

```text
CB-004 → CB-005
AB-003 → AB-004 only if Authority wording changes semantically
PB-001 → unchanged unless pressure disproves sufficiency
PRB-002 → PRB-003
RTB-001 → RTB-002 only if Runtime acceptance semantics change
```

Version transitions remain hypotheses until exact diffs and pressure tests establish them.

## Rejected Shortcut

Defining only a field list named `Maintenance Instruction` would leave the premature eligibility finding and the undefined withholding and escalation transfers unresolved.

The smallest safe correction must close the whole diagnosis-to-direction boundary, not merely silence the review comment.
