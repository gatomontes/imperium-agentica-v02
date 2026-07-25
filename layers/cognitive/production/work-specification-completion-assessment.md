# Work Specification Completion Assessment

## Status

Admitted Cognitive production contract.

Baseline: `CB-CURRENT`.

Admission: `Cognitive Production Admission Review 005`.

Evidence:

- `Cognitive Constitutional Run 018 — 33 PASS / 0 FAIL`
- `Procedure Convergence Run 002 — 21 PASS / 0 FAIL`

Origin draft: `layers/cognitive/drafts/work-specification-completion-assessment.md`.

## Native Dependencies

- Work Specification responsibility: `layers/cognitive/production/castellan.md`
- Curia and CEO judgment: `layers/cognitive/production/curia.md`, `ceo-president.md`
- Chief of Staff assembly: `layers/cognitive/production/chief-of-staff.md`
- counsel boundary: `layers/cognitive/production/counsel-availability-contract.md`
- mission correlation: `layers/provenance/production/mission-correlation-and-isolation-contract.md`
- general lineage: `layers/provenance/production/provenance-contract.md`
- Executive authority: `layers/authority/production/executive-mandate.md`
- Mission Envelope: `layers/authority/production/mission-envelope.md`

## Core Rule

Completion sufficiency is relative to the exact approved Work Specification.

```text
completion claim ≠ cited support
cited support ≠ criterion satisfied
criterion findings ≠ terminal disposition
complete provenance ≠ true evidence
effective authority ≠ proof
```

## Work Specification Requirements

Before mission execution, the Work Specification must define, for each material outcome:

- criterion identity and version
- required outcome
- acceptable evidence classes
- minimum acceptance condition
- partial-acceptance rule when permitted
- treatment of missing or unavailable evidence
- material uncertainty or tolerance
- competence or counsel required to judge the criterion
- prohibited substitutions
- dependency on other criteria
- revision and supersession rule

These are native artifact requirements.

Procedure may require them but may not invent them.

## Completion Criteria Assessment

The mission-specific artifact comparing terminal evidence and known absence against the exact Work Specification criteria.

For each criterion:

```text
Criterion identity and version
Evidence cited
Evidence absence or contest
Required competence and counsel
Assessment finding
Rationale
Uncertainty and dissent
Provenance finding
Supersedes
```

This is semantic content, not a database schema.

## Criterion Findings

```text
CRITERION_SUPPORTED:
the cited material satisfies the Work Specification's recorded acceptance condition

CRITERION_PARTIALLY_SUPPORTED:
the cited material satisfies only the recorded partial condition or an explicit subset

CRITERION_NOT_SUPPORTED:
the cited material fails the recorded acceptance condition

CRITERION_UNRESOLVED:
available material cannot support a responsible criterion judgment
```

Missing evidence produces `CRITERION_UNRESOLVED` unless the Work Specification explicitly defines absence as support or failure.

## Responsibilities

### Castellan

Defines the completion criteria and acceptance conditions as part of the Work Specification.

Castellan does not judge the terminal evidence.

### Chief of Staff

Assembles the criterion-by-criterion comparison, cited evidence, uncertainty, dissent, and counsel status.

The CoS does not choose the criterion finding or terminal disposition.

### CEO President

Adopts the criterion findings within competence and effective authority as part of substantive terminal judgment.

The CEO does not change criteria retroactively to make work appear complete.

### Counselors

Supply required specialist judgment under matching Session Assignments.

Counsel informs; it does not own the CEO decision.

## Revision Boundary

A Work Specification revision:

- creates a new version
- requires effective approval authority
- cannot silently alter historical completion criteria
- cannot be applied retroactively to completed field work without an explicit authorized reassessment
- preserves the prior version under PB-001

## Authority Boundary

Authority permits formation, approval, terminal judgment, and disposition.

It does not prove a criterion satisfied.

## Provenance Boundary

Provenance establishes the identity, lineage, transformation, and correlation of evidence and assessment artifacts.

It does not establish truth or sufficiency.

## Procedure Boundary

Procedure may require an adopted Completion Criteria Assessment before terminal disposition.

It may not:

- choose a criterion finding
- lower acceptance conditions
- substitute one criterion for another
- infer support from elapsed time or workflow position
- turn missing evidence into support
- choose the terminal disposition

## Layer Finding

A distinct universal Proof layer is not justified by this case.

The demonstrated behavior is artifact-relative:

```text
Work Specification defines acceptance
Curia judges cited evidence against it
Procedure requires the judgment at the terminal gate
```

Reconsider a separate Proof concern only if multiple unrelated artifact classes require one stable, reusable proof grammar that cannot remain native to their own contracts.
