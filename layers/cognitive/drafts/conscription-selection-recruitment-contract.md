# Conscription Persona Selection And Recruitment Contract

## Status

Draft A2.4 candidate only.

This contract does not revise `CB-005`, select or reserve a live persona, construct a live Operative, declare handoff conformance, or authorize mission action.

## Canonical Dependencies

- `layers/cognitive/production/guildhall.md`
- `layers/cognitive/production/garrison.md`
- `layers/cognitive/production/conscription.md`
- `layers/cognitive/production/muster.md`
- `layers/cognitive/production/production-artifact-catalog.md`
- `layers/authority/production/capability-tool-and-access-grants.md`
- `layers/provenance/production/provenance-contract.md`
- `layers/provenance/production/mission-correlation-and-isolation-contract.md`
- `layers/procedure/production/imperium-lifecycle-procedure.md`

Candidate evidence dependencies:

- `layers/cognitive/drafts/guildhall-profession-resolution-contract.md`
- `layers/cognitive/drafts/garrison-persona-suitability-contract.md`
- `layers/cognitive/drafts/persona-production-conformance-contract.md`
- `layers/cognitive/drafts/operative-creation-handoff-contract.md`

These dependencies are unadmitted draft evidence. This contract must remain consistent with controlling production contracts if any candidate is revised or rejected.

## Native Concerns

Guildhall owns professional suitability meaning. Garrison owns exact admitted-persona inventory, qualification, availability, supersession, quarantine, and retirement facts. Conscription owns selection from a current suitable set and transformation of the selected Canonical Persona into a deployment-medium-specific Operative.

Authority owns permissions. Provenance owns identity and lineage. Procedure owns ordering. Muster owns mission binding and assembly. Runtime may later implement admitted behavior but cannot originate these meanings.

## Core Question

```text
Which exact currently suitable Canonical Persona version may be selected for this
exact work and deployment-medium contract, and can Conscription embody it as one
immutable Operative version without silently losing or rewriting required meaning?
```

## Entry Package

Conscription requires one exact package containing:

- Mission Identity
- approved Work Specification identity and version
- conformant Profession Specification identity and version
- exact current `SUITABLE_PERSONA_CANDIDATES_FOUND` assessment identity and version
- exact Garrison Inventory View identity and version
- the complete eligible Canonical Persona identity-and-version set
- criterion-by-criterion suitability evidence for every eligible candidate
- selected deployment medium
- platform format and technical-contract identity and version
- available model and tool-interface descriptions without grants
- packaging, resource, and secret-class constraints without values or allocations
- assignment context required for creation, if any
- applicable creation-authority references, or explicit not-applicable basis under the cited contract
- complete required PB-001 findings
- unresolved blockers and supersession references

Stale, mismatched, partial, refused, unresolved, or superseded inputs block selection. Similarity cannot repair identity or evidence.

## Persona Selection Assessment

Conscription may produce one versioned `Persona Selection Assessment` for the exact entry package.

Minimum semantic content:

```text
Assessment identity and version
Mission, Work Specification, and Profession Specification references
Suitability assessment and inventory-view references
Complete eligible candidate identities and versions
Deployment-medium and technical-contract identity and version
Applicable selection criteria and their canonical sources
Criterion-by-criterion comparison
Selected Canonical Persona identity and version, if any
Tie, exclusion, refusal, and unresolved rationale
Current admission, qualification, availability, and lifecycle findings
Applicable authority references or explicit not-applicable basis
Required provenance finding
Supersession reference
Selection finding
```

Selection findings:

```text
PERSONA_SELECTION_CONFORMANT
PERSONA_SELECTION_REFUSED
PERSONA_SELECTION_UNRESOLVED
```

`PERSONA_SELECTION_CONFORMANT` identifies exactly one candidate whose professional suitability is already established and whose explicit deployment-medium and work constraints support selection.

Selection does not re-perform Guildhall suitability, change Garrison inventory, reserve a persona, grant authority, or construct an Operative.

When multiple candidates remain materially tied, Conscription preserves the tie and returns `PERSONA_SELECTION_UNRESOLVED`. It must not invent preference criteria, choose by list order, or use popularity, name similarity, familiarity, prior use, or mere availability as a substitute.

Known incompatibility with the selected medium, a mandatory work constraint, or a non-negotiable persona boundary yields refusal. Missing or contested evidence yields unresolved.

## Recruitment Inputs

Recruitment may begin only for the exact `PERSONA_SELECTION_CONFORMANT` assessment version while every cited source remains current.

The construction input pins:

- selected Canonical Persona identity and version
- profession, doctrine, and applicable trait-canon references
- Pit and Garrison admission evidence
- deployment medium and platform technical contract
- transformation or packaging method identity and version
- model and tool-interface constraints
- work and assignment context used for embodiment
- required preservation conditions
- allowed, refused, and unresolved deviation dispositions
- dependency, resource, and secret-class requirements
- applicable authority references or explicit not-applicable basis
- required PB-001 relations and findings

Tool schemas and access interfaces may be bound as technical definitions. Conscription does not issue Tool or Access Grants, provide credentials, allocate resources, or prove provider availability.

## Operative Construction

Conscription may produce one immutable versioned `Operative` derived from the exact selected Canonical Persona version and exact technical-contract version.

The Operative must expose or cite:

```text
Operative identity and version
Canonical Persona identity and version
Mission and assignment-context references used during creation
Profession, doctrine, and applicable trait-canon references
Deployment medium
Platform format and technical-contract identity and version
Transformation or packaging identity and version
Model and tool-interface definitions
Preserved competence, governance, traits, refusal, evidence, and escalation behavior
Declared dependencies, resources, and secret classes
Every forced deviation and its native-owner disposition
Known limits and blockers
Validation evidence references
Applicable authority references or explicit not-applicable basis
Required provenance relations and finding
Supersession reference
```

The artifact may take any admitted Conscription form, including a platform skill, prompt package, agent definition, or runtime package. Its specific medium does not change the provider-neutral meaning of the contract.

## Recruitment Assessment

Conscription may produce one versioned `Recruitment Assessment` for the exact Operative version.

Findings:

```text
RECRUITMENT_CONFORMANT
RECRUITMENT_REFUSED
RECRUITMENT_UNRESOLVED
```

`RECRUITMENT_CONFORMANT` requires:

1. one exact conformantly selected Canonical Persona version
2. one exact deployment-medium and technical-contract version
3. immutable Operative identity and version
4. preservation of mandatory competence, doctrine, applicable traits, refusal, evidence, and escalation behavior
5. explicit native-owner disposition for every forced deviation, or no deviation
6. exact source, transformation, validation, authority-reference, and PB-001 findings
7. declared requirements that are not represented as grants, credentials, allocations, or provider guarantees
8. no unresolved creation blocker

This finding assesses recruitment only. It is not `HANDOFF_CONFORMANT`, an Operative lifecycle state, mission binding, `READY_FOR_LAUNCH`, launch authority, activation, or deployment.

## Refusal, Repair, And Revision

Defects return to their native owner:

- work defect → Castellan
- profession or suitability defect → Guildhall
- inventory or availability defect → Garrison
- doctrine defect → Studium
- trait defect → Hagiography
- canonical integration or test defect → Foundry or Pit as applicable
- selection or transformation defect → Conscription
- authority defect → Authority owner
- lineage defect → Provenance assessment

Conscription may not repair upstream meaning silently. Any semantic repair creates a new native artifact version and invalidates dependent selection, Operative, recruitment, and handoff findings for future use. Reassessment uses exact `SUPERSEDES` lineage; historical versions remain evidence.

## Provenance Boundary

Selection and recruitment preserve applicable `DERIVED_FROM`, `TRANSFORMED_FROM`, `PRODUCED_BY`, `CORRELATED_TO`, `CITES`, `AUTHORIZED_UNDER`, and `SUPERSEDES` relations under PB-001.

Mission correlation records the exact context used during creation without converting the Operative into an active Operative Binding or shared mission state.

## Downstream Boundary

After `RECRUITMENT_CONFORMANT`, the exact Operative may be presented to the separate A0 Operative Creation Handoff Assessment.

Nothing automatically triggers that assessment, direct operator delivery, Muster, mission binding, commissioning, activation, Runtime execution, or deployment.

## Non-Admissions

This draft admits no:

- new institution, selector service, compiler, registry, runtime package manager, or universal Recruitment layer
- live selection, reservation, inventory mutation, recruitment, or Operative
- Authority grant, approval action, credential, allocation, or permission inference
- Procedure transition or Runtime validator
- handoff finding, Operative Binding, Mission Envelope, Muster Instance, or Deployment Package
- `READY_FOR_LAUNCH`, commissioning, activation, deployment, provider call, or external effect
- production baseline revision

## Failure Signals

Reject or revise this draft if it:

- treats a suitable set as a selection or selects by unstated preference
- lets medium compatibility redefine professional suitability
- mutates Garrison inventory or reserves a persona by selection
- silently weakens the Canonical Persona to satisfy a platform
- treats tool interfaces as Tool Grants or secret classes as credentials
- transfers findings across changed source, candidate, or technical-contract versions
- treats recruitment conformance as handoff, mission binding, readiness, activation, or deployment
- creates Authority, Procedure, Runtime, or external effect
