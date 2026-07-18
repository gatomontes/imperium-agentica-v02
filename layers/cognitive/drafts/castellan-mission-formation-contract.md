# Castellan Mission Formation Contract

## Status

Draft candidate only.

This contract does not revise `CB-005`, instantiate Castellan, form a live mission, or authorize any action.

## Canonical Dependencies

- `layers/cognitive/production/secretariat.md`
- `layers/cognitive/production/castellan.md`
- `layers/cognitive/production/guildhall.md`
- `layers/cognitive/production/work-specification-completion-assessment.md`
- `layers/authority/production/mission-envelope.md`
- `layers/provenance/production/provenance-contract.md`
- `layers/provenance/production/mission-correlation-and-isolation-contract.md`
- `layers/procedure/production/imperium-lifecycle-procedure.md`

## Native Concern

Mission meaning and the Mission Need are native to Castellan's Cognitive responsibility.

Secretariat owns intake shaping and Petition production. Authority owns permission to form the mission. Provenance owns identities and lineage. Procedure owns ordering. Guildhall owns profession resolution. Runtime owns no mission meaning.

## Core Question

```text
Can one bounded Mission Need be formed faithfully from this exact Petition
under effective FORM_MISSION authority without inventing profession,
persona, implementation, mission procedure, or deployment meaning?
```

## Entry Conditions

Mission formation requires:

- exact Petition identity and version
- represented operator and request provenance
- supplied-material references and their known provenance
- effective Mission Envelope authority containing `FORM_MISSION`
- pre-formation scope matched to the exact Petition identity
- applicable constraints and prohibited effects
- authority-loss safe-state instruction when applicable

A raw request or direct operator need must first be represented by Secretariat as a versioned Petition. Familiarity with the operator does not substitute for Petition identity.

```text
Petition identity ≠ mission approval
Petition identity ≠ Authority Grant
FORM_MISSION authority ≠ Work Specification approval
```

## Mission Need

When formation is conformant, Castellan produces one versioned `Mission Need` for one Mission Identity supplied under PB-001.

Minimum semantic content:

```text
Mission Need identity and version
Mission Identity
Petition identity and version
Operator intent restatement
Desired mission outcome
Included scope
Explicit exclusions and prohibited effects
Affected people, systems, resources, or organizations
Operator constraints
Material assumptions
Known facts and supplied-material references
Material uncertainties and unresolved questions
Risk and urgency context
Required outcome classes
Non-goals
Applicable FORM_MISSION authority reference and finding
Required provenance relations and finding
Supersession reference
Formation assessment reference
```

The Mission Need states why a bounded mission exists and what outcome is sought. It does not define the profession, implementation, mission dossier, detailed procedure, platform packaging, tools, credentials, or deployment target.

Detailed criterion identities, evidence classes, acceptance conditions, and completion rules belong to the later Work Specification.

## Semantic Fidelity

The Mission Need must preserve the Petition's operator-supplied meaning while making scope, uncertainty, and boundaries explicit.

Castellan may:

- clarify ambiguity without silently selecting an interpretation
- propose explicit narrowing when the Petition supports a separable bounded scope; required operator confirmation remains recorded
- expose conflicts, missing facts, assumptions, and risks
- refuse formation when faithful bounded meaning cannot be produced

Castellan must not:

- add an outcome the Petition did not support
- erase a material operator constraint
- turn an assumption into a known fact
- treat urgency as permission
- infer permission from resource control, competence, or feasibility
- conceal excluded people, systems, resources, or effects
- broaden the Petition to fit a preferred profession, tool, platform, or solution

## Mission Formation Assessment

Castellan may produce a versioned `Mission Formation Assessment` for one exact Petition version.

Minimum semantic content:

```text
Assessment identity and version
Petition identity and version
Candidate Mission Need identity and version when any
Formation-scope authority reference and finding
Petition-to-Mission-Need semantic-fidelity finding
Scope and exclusion finding
Assumptions and uncertainty finding
Provenance finding
Unresolved blockers
Rationale
Supersession reference
Formation finding
```

Candidate findings:

```text
FORMATION_CONFORMANT
FORMATION_REFUSED
FORMATION_UNRESOLVED
```

These are artifact-relative assessment findings, not Runtime or mission lifecycle states.

`FORMATION_CONFORMANT` means the exact Petition version has produced a bounded, faithful Mission Need under effective `FORM_MISSION` authority. It permits later Work Specification formation to be considered.

`FORMATION_REFUSED` means a known condition prevents responsible formation, including prohibited scope, authority mismatch, or a contradiction that cannot be preserved safely.

`FORMATION_UNRESOLVED` means required identity, authority, provenance, meaning, or scope information is missing, contested, or indeterminate.

Refused and unresolved findings block successful mission formation. They do not authorize substitution, silent narrowing, or Work Specification approval.

## Version And Revision

A changed Petition, mission meaning, scope, affected party, material constraint, or formation authority requires a new assessment.

A new Mission Need version is required whenever its semantic content changes. Authority-only change that leaves the Mission Need unchanged still requires a new assessment and exact authority lineage.

Revision must preserve the prior version and exact supersession lineage under PB-001. A later version cannot rewrite the historical basis of an earlier refusal.

## Downstream Boundary

A conformant Mission Need:

- may proceed to separate Work Specification formation
- may be supplied with the later approved Work Specification to Guildhall and Collegium
- does not itself approve work
- does not resolve profession or persona
- does not select tools, access, platform, or deployment mechanism
- does not bind an Operative
- does not create a Deployment Package
- does not authorize external crossing

The later Work Specification requires a separate effective `APPROVE_WORK_SPECIFICATION` finding for the exact Mission Identity.

## Non-Admissions

This draft admits no:

- new institution, role, or service
- Mission Envelope or authority grant
- mission or Mission Identity instance
- Procedure transition
- Runtime schema, validator, service, or state machine
- profession, persona, Operative, provider, credential, deployment, or external effect
- production baseline revision

## Failure Signals

Reject or revise this draft if it:

- lets a Petition authorize its own mission
- merges `FORM_MISSION` with `APPROVE_WORK_SPECIFICATION`
- allows Castellan to define profession, persona, tools, or deployment
- treats missing meaning as permission to invent
- confuses refusal with unresolved evidence
- transfers Authority, Provenance, or Procedure ownership into Cognitive
- creates a universal intent, planning, or readiness layer
