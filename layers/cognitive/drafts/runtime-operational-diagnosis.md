# Runtime Operational Diagnosis

## Status

Candidate Cognitive artifact contract.

Not admitted. CB-004 remains canonical.

Investigation: `Runtime Maintenance Artifact Closure 001`.

## Native Responsibility

Master Mason produces the Runtime Operational Diagnosis.

The artifact records bounded Cognitive judgment about Runtime's observed mechanical condition.

It does not record raw Runtime state as though observation and diagnosis were the same thing.

## Core Question

```text
Given the exact Runtime observations and known limitations,
what bounded mechanical condition is supported,
and what class of response is indicated without deciding eligibility?
```

## Required Semantic Content

```text
Diagnosis identity and version
Producing Master Mason responsibility or acting-surface reference
Represented competence and limits
Diagnosis time and observation horizon
Exact environment and component scope
Mission identity or bounded non-mission scope when applicable
Cited Runtime Observation Envelopes
Active realization, attempt, effect, quarantine, and recovery references
Known operating facts
Known gaps, contradictions, and indeterminacy
Condition finding
Response indication
Rationale
Applicable Procedure candidates without eligibility inference
Semantic or structural risk flags
PB-001 correlation and lineage references
Supersedes
```

This is semantic content, not a storage schema.

## Condition Findings

Exactly one primary condition finding is required:

```text
RUNTIME_HEALTHY
RUNTIME_DEGRADED
RUNTIME_INOPERABLE
RUNTIME_CONDITION_INDETERMINATE
STRUCTURAL_CHANGE_INDICATED
```

Definitions:

- `RUNTIME_HEALTHY` — cited observations support normal operation within the represented diagnostic scope.
- `RUNTIME_DEGRADED` — operation continues, but a bounded mechanical impairment or exhaustion condition is supported.
- `RUNTIME_INOPERABLE` — the scoped Runtime component cannot presently perform its admitted operating function.
- `RUNTIME_CONDITION_INDETERMINATE` — available observations cannot support a responsible mechanical classification.
- `STRUCTURAL_CHANGE_INDICATED` — restoration appears to require semantic, mapping, architectural, incompatible-state, or otherwise non-routine change outside Master Mason's maintenance boundary.

The diagnosis may include secondary observed symptoms, but they do not create additional primary findings.

## Response Indications

Exactly one response indication is required:

```text
NO_MAINTENANCE_INDICATED
ROUTINE_MAINTENANCE_INDICATED
RECOVERY_INDICATED
OBSERVATION_ONLY_INDICATED
STRUCTURAL_ESCALATION_INDICATED
```

A response indication describes the diagnosed class of need.

It does not establish that an intervention is procedurally eligible, authorized, safe, available, or selected.

## Diagnosis Versus Eligibility

```text
diagnosed need ≠ admitted Procedure match
diagnosed need ≠ effective Authority
diagnosed need ≠ exact correlation
diagnosed need ≠ safe repeat
diagnosed need ≠ intervention selected
```

`RUNTIME_MAINTENANCE_ELIGIBLE` is not a diagnosis finding.

Eligibility exists only after the cited Procedure and Authority gates evaluate the exact proposed direction.

## Evidence Boundary

Runtime Observation Envelopes are inputs.

The diagnosis must:

- cite the exact observations used
- preserve conflicting or unavailable observations
- state the observation horizon and known clock limits
- distinguish observed fact from diagnostic inference
- avoid treating log presence as provenance completeness
- avoid treating operational success or failure as mission meaning

## Authority Boundary

The diagnosis creates no permission.

An Authority contract may cite the diagnosis when defining bounded discretion. That citation does not convert the diagnosis into an Authority finding.

## Procedure Boundary

Procedure may require and branch on a diagnosis.

Procedure does not choose the condition finding, response indication, or rationale.

## Runtime Boundary

Runtime emits observations and realizes permitted directions.

Runtime does not produce, repair, or reinterpret the diagnosis.

A Runtime refusal or operational state is not a substitute for this artifact.

## Provenance Boundary

PB-001 owns identity, correlation, lineage, transformation, and supersession.

A revised diagnosis supersedes; it does not silently rewrite the prior diagnosis.

## Non-Admissions

This candidate does not admit:

- Master Mason qualification, persona, assignment, Officer class, or institution
- maintenance eligibility
- a Maintenance Instruction
- a Runtime Control-Plane Plan
- Authority
- autonomous diagnosis
- a diagnostic model, threshold, telemetry service, or implementation
- mission success, closure, release, or semantic correctness
