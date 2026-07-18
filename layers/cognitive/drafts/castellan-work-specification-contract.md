# Castellan Work Specification Contract

## Status

Draft A1.2 candidate only.

This contract does not revise `CB-005`, approve a live Work Specification, instantiate Castellan or Guildhall, or authorize any mission action.

## Canonical Dependencies

- `layers/cognitive/production/castellan.md`
- `layers/cognitive/production/guildhall.md`
- `layers/cognitive/production/work-specification-completion-assessment.md`
- `layers/authority/production/mission-envelope.md`
- `layers/provenance/production/provenance-contract.md`
- `layers/provenance/production/mission-correlation-and-isolation-contract.md`
- `layers/procedure/production/imperium-lifecycle-procedure.md`

Candidate evidence dependency:

- `layers/cognitive/drafts/castellan-mission-formation-contract.md`

The candidate dependency is not admitted production semantics. This draft must remain consistent with the controlling production contracts even if that evidence is later revised or rejected.

## Native Concern

Work Specification meaning and formation are native to Castellan's Cognitive responsibility.

Authority owns `APPROVE_WORK_SPECIFICATION` effectiveness. Provenance owns identity and lineage. Procedure owns ordering and stage exit. Guildhall owns profession resolution. The completion-assessment contract controls the criterion grammar required before execution.

## Core Question

```text
Does this exact Work Specification version translate the bounded Mission Need
into complete, testable work without selecting profession, persona,
implementation, tools, platform, mission procedure, or deployment?
```

## Entry Conditions

Formation of a Work Specification requires:

- exact Mission Identity
- exact Mission Need identity and version
- exact Petition reference through Mission Need lineage
- Mission Need formation evidence when applicable
- applicable operator constraints
- PB-001 identity and derivation references
- unresolved formation blockers exposed

Work Specification formation may begin after mission formation. Approval remains a separate later finding.

## Work Specification

Castellan produces one versioned `Work Specification` for one exact Mission Need version and Mission Identity.

Minimum semantic content:

```text
Work Specification identity and version
Mission Identity
Mission Need identity and version
Petition lineage reference
Required outcomes and deliverables
Included work scope
Explicit exclusions and prohibited effects
Required functional capabilities
Material inputs and supplied references
Dependencies and prerequisite conditions
Operator constraints
Material assumptions and uncertainties
Risk, escalation, and stop conditions
For each material outcome:
  criterion identity and version
  required outcome
  acceptable evidence classes
  minimum acceptance condition
  partial-acceptance rule when permitted
  treatment of missing or unavailable evidence
  material uncertainty or tolerance
  competence or counsel required to judge the criterion
  prohibited substitutions
  dependency on other criteria
  revision and supersession rule
Reporting and return expectations
Required provenance relations and finding
Formation assessment reference
Approval authority reference and finding when approved
Supersession reference
```

This is semantic content, not a database or Runtime schema.

## Capability Without Profession

The Work Specification states required functional capability and legitimate constraints on the work.

It must not:

- name a profession as the answer unless the operator explicitly fixed one and Guildhall still validates fit
- define professional competence doctrine
- select or forge a persona
- select a deployment medium
- prescribe tools, credentials, or provider
- package an Operative

Guildhall determines which profession can legitimately satisfy the capability need and limits.

## Mission Fidelity

The Work Specification must derive from the exact Mission Need version without silently widening, omitting, or replacing its meaning.

It may make the work more precise by exposing:

- material outcomes and deliverables
- work boundaries and dependencies
- measurable acceptance conditions
- evidence expectations
- uncertainty, escalation, and stop conditions

Precision does not authorize a new mission outcome, affected subject, external effect, or prohibited substitution.

## Work Specification Formation Assessment

Castellan may produce a versioned `Work Specification Formation Assessment` for one exact Work Specification version.

Minimum semantic content:

```text
Assessment identity and version
Work Specification identity and version
Mission Need identity and version
Mission-fidelity finding
Scope and exclusion finding
Capability-without-profession finding
Criterion-completeness finding
Assumption and uncertainty finding
Dependency and stop-condition finding
Provenance finding
Unresolved blockers
Rationale
Supersession reference
Specification finding
```

Candidate findings:

```text
SPECIFICATION_CONFORMANT
SPECIFICATION_REFUSED
SPECIFICATION_UNRESOLVED
```

These are artifact-relative Cognitive findings, not approval, authority, Runtime state, or completion judgment.

`SPECIFICATION_CONFORMANT` means the exact version faithfully and completely specifies the bounded work and may be presented for separate approval.

`SPECIFICATION_REFUSED` means a known contradiction, prohibited scope, unsupported outcome, or irreparable criterion defect prevents responsible specification.

`SPECIFICATION_UNRESOLVED` means required identity, meaning, evidence class, acceptance condition, dependency, provenance, or other information is absent, contested, or indeterminate.

Refused and unresolved findings block approval and handoff.

## Approval Composition

An `approved Work Specification` exists for handoff only when all are present for the same exact artifact and Mission Identity:

```text
versioned Work Specification
+ SPECIFICATION_CONFORMANT
+ AUTHORITY_EFFECTIVE for APPROVE_WORK_SPECIFICATION
+ exact Mission Identity and artifact-version match
+ required PB-001 provenance finding
```

The approval action does not prove the specification conformant. The formation assessment does not grant approval.

```text
FORM_MISSION ≠ APPROVE_WORK_SPECIFICATION
SPECIFICATION_CONFORMANT ≠ AUTHORITY_EFFECTIVE
authoring the artifact ≠ approving the artifact
```

Missing or non-effective approval authority yields no approved Work Specification, even when the artifact is conformant.

## Revision Boundary

Any semantic change creates a new Work Specification version.

Every new version requires:

- a new formation assessment
- exact derivation and supersession lineage
- a new `APPROVE_WORK_SPECIFICATION` action and authority finding

Approval does not transfer across versions. Criteria cannot be changed retroactively to make performed work appear complete.

## Guildhall And Collegium Handoff

The approved Work Specification may be handed off with the exact Mission Need to Guildhall and Collegium.

Guildhall may consume:

- Mission Identity
- Mission Need identity and version
- approved Work Specification identity and version
- functional capability and constraint requirements
- operator constraints relevant to professional fit
- required evidence, risk, escalation, and competence expectations

Guildhall must not receive a Castellan-selected profession as if it were established professional truth.

Collegium may use the same exact mission artifacts for its admitted composition responsibility. This handoff does not select or commission Officers.

No handoff occurs automatically. Procedure retains the stage transition and must block absent, refused, unresolved, mismatched, superseded, or unapproved artifacts.

## Non-Admissions

This draft admits no:

- new institution, role, service, or universal Specification layer
- Mission Envelope, approval grant, or authority decision
- live Mission Need or Work Specification instance
- Procedure transition or Runtime validator
- profession, persona, Officer, Operative, tool, credential, platform, provider, or deployment choice
- production baseline revision or external effect

## Failure Signals

Reject or revise this draft if it:

- lets Cognitive conformance create authority
- lets approval excuse incomplete or contradictory content
- transfers criteria from the Work Specification into Procedure
- lets Castellan determine professional truth
- transfers approval across artifact versions
- treats missing evidence or authority as approval
- creates a universal planning, specification, proof, or readiness layer
