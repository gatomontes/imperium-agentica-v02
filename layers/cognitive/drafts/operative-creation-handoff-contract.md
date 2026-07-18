# Operative Creation Handoff Contract

## Status

Draft candidate only.

This contract does not revise `CB-005`, admit a new institution or service, instantiate an Operative, or authorize deployment.

## Canonical Dependencies

This draft cites admitted meanings without redefining them:

- `layers/cognitive/production/conscription.md`
- `layers/cognitive/production/muster.md`
- `layers/cognitive/production/garrison.md`
- `layers/cognitive/production/production-artifact-catalog.md`
- `layers/provenance/production/provenance-contract.md`
- `layers/authority/production/capability-tool-and-access-grants.md`
- `layers/procedure/production/imperium-lifecycle-procedure.md`

## Native Concern

The handoff assessment is native to Conscription's Cognitive responsibility because it determines whether Conscription's exact Operative faithfully embodies the cited admitted persona under the selected deployment-medium contract.

Provenance owns identity and lineage findings. Authority owns any required permission. Procedure owns ordering and downstream entry conditions. Runtime may later realize an admitted contract but cannot originate its meaning or findings.

## Core Question

```text
Has this exact deployment-medium-specific Operative been created faithfully enough
to leave Conscription without claiming mission assembly, launch readiness,
launch authority, deployment, or activation?
```

## Specific Artifact, Neutral Contract

An `Operative` remains the deployment-medium-specific artifact produced by Conscription.

The handoff contract is neutral across deployment media and providers. Neutrality of the contract does not make an individual Operative target-neutral.

```text
provider-neutral handoff rules
≠ target-neutral Operative
```

## Input Set

An assessment must identify:

- exact Operative identity and version
- exact admitted Canonical Persona identity and version
- Garrison admission or custody reference
- exact Profession Specification and applicable doctrine or trait-canon references
- selected deployment medium
- platform format and technical-contract identity and version
- transformation or packaging description and version
- applicable model and tool-interface constraints
- assignment context used during creation, if any
- applicable authority references, or an explicit statement that none was required by the cited creation contract
- validation and provenance evidence references
- known deviations, dependencies, and blockers

Missing required identity, version, contract, or lineage information cannot be repaired by similarity or plausibility.

## Operative Creation Handoff Assessment

Conscription may produce a versioned `Operative Creation Handoff Assessment` for one exact Operative version.

Minimum semantic content:

```text
Assessment identity and version
Operative identity and version
Canonical Persona identity and version
Garrison reference
Profession, doctrine, and trait-canon references
Deployment medium
Platform technical-contract identity and version
Transformation or packaging identity and version
Preserved competencies, governance, and traits
Declared deviations and their dispositions
Model, tool-interface, resource, and secret-class requirements
Validation evidence references
Required provenance relations and finding
Applicable authority references or explicit not-applicable basis
Unresolved blockers
Supersession reference
Handoff finding
```

Requirements name dependencies and classes only. They do not contain credential values, issue grants, allocate resources, or prove provider availability.

## Findings

```text
HANDOFF_CONFORMANT
HANDOFF_REFUSED
HANDOFF_UNRESOLVED
```

These are assessment findings, not Operative lifecycle states.

`HANDOFF_CONFORMANT` means the exact Operative version satisfies this draft's creation-side handoff conditions and may be presented for direct operator delivery or separate downstream Muster consideration.

`HANDOFF_REFUSED` means a required creation-side condition is known not to be satisfied.

`HANDOFF_UNRESOLVED` means required evidence, identity, authority basis, lineage, or technical-contract information is absent, contested, or indeterminate.

Refused and unresolved findings block a successful handoff. They do not authorize repair, substitution, mission assembly, or deployment.

## Conformance Conditions

`HANDOFF_CONFORMANT` requires all of the following for the assessed Operative version:

1. the Operative is a deployment-medium-specific embodiment produced under Conscription's responsibility
2. the exact admitted Canonical Persona and upstream specifications are cited
3. the selected medium and technical-contract version are pinned
4. required professional competence, governance doctrine, and applicable traits are preserved
5. every forced deviation is explicit and accepted by the applicable native contract, or no deviation exists
6. requirements are declared without being represented as grants, credentials, allocations, or provider guarantees
7. validation evidence is cited
8. required PB-001 identity, transformation, citation, and supersession relations are complete for the handoff scope
9. applicable creation authority is cited, while downstream mission and launch authority remain unevaluated
10. no required blocker remains unresolved

## Downstream Boundary

A conformant assessment establishes none of the following:

- a target-neutral Operative
- a mission binding
- a Mission Envelope
- a Muster Instance
- a Deployment Package
- `READY_FOR_LAUNCH`
- launch or external-crossing authority
- tool or access grants
- credential possession
- provider acceptance
- Runtime compatibility or safety
- deployment, activation, or mission success

Muster remains responsible for mission-specific assembly. `Ready For Launch` remains a state of Muster's Deployment Package only.

Direct operator delivery and Muster consideration remain independent downstream choices. The assessment triggers neither path automatically.

## Refusal And Revision

Conscription must refuse or leave the handoff unresolved when the selected medium cannot preserve a required source condition, a required deviation lacks a valid disposition, or exact evidence is missing.

A repaired or changed Operative requires a new Operative version and a new assessment version. An earlier conformant finding does not transfer automatically across versions or media.

## Non-Admissions

This draft does not admit:

- a new Cognitive institution, officer, or service
- a universal Artifact, Assurance, Readiness, or Deployment layer
- a new authority profile or grant
- a Procedure transition
- a Runtime schema, service, API, queue, or validator
- a provider, store, credential, deployment target, or live effect
- production use or a revision to any admitted baseline

## Failure Signals

Reject or revise this draft if it:

- makes the Operative target-neutral
- duplicates Conscription, Muster, PB-001, Authority, or Procedure ownership
- treats requirements as grants or credential material
- lets a handoff finding imply mission binding or launch readiness
- creates a universal readiness ontology
- permits inference to repair missing identity, lineage, or evidence
- requires a new institution where a bounded artifact-relative assessment is sufficient
