# Persona Production Conformance Contract

## Status

Draft A2.4 candidate only.

This revision consumes `deliberations/decisions/DR-006-mandatory-real-world-exemplar-grounding.md` as an operator SOP requirement. It does not revise `CB-007`, produce or admit a live persona, select a persona, construct an Operative, or authorize mission action.

## Canonical Dependencies

- `layers/cognitive/production/guildhall.md`
- `layers/cognitive/production/studium.md`
- `layers/cognitive/production/hagiography.md`
- `layers/cognitive/production/foundry.md`
- `layers/cognitive/production/pit.md`
- `layers/cognitive/production/garrison.md`
- `layers/cognitive/production/conscription.md`
- `layers/provenance/production/provenance-contract.md`
- `layers/provenance/production/mission-correlation-and-isolation-contract.md`
- `layers/procedure/production/imperium-lifecycle-procedure.md`

Candidate evidence dependencies:

- `layers/cognitive/drafts/guildhall-profession-resolution-contract.md`
- `layers/cognitive/drafts/garrison-persona-suitability-contract.md`
- `deliberations/decisions/DR-006-mandatory-real-world-exemplar-grounding.md`

The first two dependencies are unadmitted draft evidence. DR-006 is an operator SOP decision, not admitted Cognitive production semantics. This contract must remain consistent with controlling production contracts and must not represent the SOP amendment as production admission.

## Native Concerns

Guildhall owns Profession Specification meaning. Studium owns Persona Governance Doctrine. Hagiography owns the required Human-Trait Canon for professional personas. Foundry owns integration into a Persona Specification Candidate. Pit owns independent pressure findings and recommendation. Garrison owns admission and exact inventory truth. Conscription owns later selection and recruitment.

No owner may absorb another's concern.

## Core Question

```text
Can this exact no-match-eligible production path produce one versioned,
tested, explicitly admitted Canonical Persona without silently changing
profession, governance, trait evidence, or downstream recruitment meaning?
```

## Entry Conditions

Persona production requires one exact package containing:

- Mission Identity
- approved Work Specification identity and version
- conformant Profession Specification identity and version
- profession-resolution assessment reference
- exact `NO_SUITABLE_PERSONA_FOUND` assessment identity and version
- exact Garrison Inventory View identity and version
- evaluated gaps and suitability criteria
- complete required PB-001 citation, correlation, and derivation findings
- no unresolved mismatch, staleness, supersession, or blocker

`NO_SUITABLE_PERSONA_FOUND` establishes production-path eligibility only. It does not authorize construction, select an owner, or execute Procedure.

## Persona Governance Doctrine Gate

Studium may produce one versioned Persona Governance Doctrine derived from the exact Profession Specification and applicable Imperium constraints.

Minimum semantic content follows the admitted Studium contract and must make authority boundaries, conduct, evidence, disclosure, refusal, escalation, stop conditions, accountability, violation signals, ambiguities, exact sources, and acceptance conditions explicit.

Doctrine findings:

```text
DOCTRINE_CONFORMANT
DOCTRINE_REFUSED
DOCTRINE_UNRESOLVED
```

These are artifact-relative Cognitive findings. They do not grant authority or authorize Foundry. Refused or unresolved doctrine blocks later gates.

Studium must return profession defects to Guildhall rather than repair them.

## Human-Trait Canon Gate

For every professional persona:

```text
TRAIT_CANON_REQUIRED
```

Hagiography must produce one versioned Human-Trait Canon grounded in at least one identifiable, exemplary real-world practitioner in the resolved profession. Multiple practitioners should be used when sufficient evidence exists.

For every inherited trait, the canon must preserve the inspectable derivation:

```text
real practitioner
→ profession-relevant achievement or demonstrated performance
→ observed behavior
→ inferred transferable trait
→ intended persona behavior
→ conditions, limits, counterweights, and failure signals
```

Minimum content includes exact practitioner identity, profession, achievement or demonstrated-performance evidence, exact evidence sources, observed behavior, transfer rationale, intended behavioral expression, useful conditions, non-transferable context or advantages, costs, risks, conflicts, confidence, counterweights, and failure signals.

Canon findings:

```text
TRAIT_CANON_CONFORMANT
TRAIT_CANON_REFUSED
TRAIT_CANON_UNRESOLVED
```

A missing or unresolved derivation link blocks conformance. Insufficient exemplar evidence produces a refused or unresolved finding and blocks Foundry.

The source practitioner's achievements remain provenance for trait derivation. They are never claims, credentials, affiliations, authority, identity, or lived experience of the persona.

Fame, reputation, prestige, mythology, whole-person imitation, fictional or composite exemplars, and generic trait adjectives cannot substitute for evidence. A canon cannot override doctrine or profession boundaries.

Non-professional artifacts remain outside this gate unless represented or used as professional personas.

## Foundry Integration Gate

Foundry may integrate one exact set of conformant upstream versions into a new immutable Persona Specification Candidate.

Minimum semantic content:

```text
Candidate identity and version
Mission and production-correlation references
Work and Profession Specification references
Persona Governance Doctrine reference and finding
Required Human-Trait Canon reference and finding
Exemplar-achievement-to-trait derivation references
Professional competence and reasoning behavior
Inherited traits expressed as testable persona behavior
Evidence, uncertainty, disclosure, refusal, and escalation behavior
Communication and tool-use expectations without grants
Expected inputs and outputs
Governable boundaries and known limits
Acceptance criteria
Integration conflicts and unresolved gaps
Required PB-001 finding
Supersession reference
```

Integration findings:

```text
PERSONA_CANDIDATE_CONFORMANT
PERSONA_CANDIDATE_REFUSED
PERSONA_CANDIDATE_UNRESOLVED
```

Foundry cannot silently repair upstream defects, infer missing authority, impersonate a source practitioner, or attribute the practitioner's achievements to the persona. Only the exact conformant candidate version may enter Pit.

## Pit Test Gate

Pit independently tests the exact candidate and exact upstream versions against declared pressures and acceptance criteria.

Pit Findings must record competence, governance, refusal, evidence, uncertainty, inherited-trait behavior, performative-mimicry risk, context loss, trait conflict, overextension, failures, implicated owner, retest conditions, exact sources, PB-001 finding, and recommendation.

Test findings:

```text
PERSONA_TEST_CONFORMANT
PERSONA_TEST_REFUSED
PERSONA_TEST_UNRESOLVED
```

A conformant test may recommend admission but is not admission. Refused or unresolved findings block admission and return defects to their native owner. Pit never edits tested artifacts.

## Repair And Retest

Each defect returns to the responsible owner:

- work defect → Castellan
- profession defect → Guildhall
- doctrine defect → Studium
- trait or exemplar-evidence defect → Hagiography
- integration defect → Foundry

Any semantic change creates a new artifact version, new downstream integration where affected, new assessment, new Pit test, and exact `SUPERSEDES` lineage. Failed candidates and findings remain historical evidence; no candidate is mutated in place.

## Garrison Admission Gate

Garrison may make one explicit admission assessment only for the exact candidate version with conformant upstream and Pit findings and complete provenance.

Admission findings:

```text
CANONICAL_PERSONA_ADMITTED
CANONICAL_PERSONA_REFUSED
CANONICAL_PERSONA_ADMISSION_UNRESOLVED
```

An admitted result creates one immutable Canonical Persona identity and version and an exact Garrison inventory record containing its profession, doctrine, required canon, exemplar derivation provenance, purpose, competence, boundaries, limits, Pit history, admission evidence, qualification basis, availability, revision, and provenance references.

Pit recommendation, Foundry conformance, prior use, urgency, name similarity, or admiration for a source practitioner cannot substitute for admission.

Refused and unresolved findings do not create inventory availability. Admission does not select, reserve, recruit, package, activate, or deploy the persona.

## Branch Reconvergence

After exact admission, the no-match branch may reconverge with the existing-persona branch only by a new exact Garrison inventory view and Persona Suitability Search Assessment.

The newly admitted persona is not automatically suitable, selected, or available for the original mission. Guildhall must apply the unchanged exact criteria; Conscription retains later selection.

## Provenance And Revision Boundary

Every produced artifact cites exact sources and records applicable `DERIVED_FROM`, `PRODUCED_BY`, `CORRELATED_TO`, `CITES`, and `SUPERSEDES` relations under PB-001.

A semantic change to any required upstream artifact, exemplar evidence, finding, candidate, test, or admission evidence invalidates dependent downstream findings for future use. Historical artifacts remain preserved.

## Non-Admissions

This draft admits no:

- new institution, forge service, registry implementation, admission engine, or universal Production layer
- live doctrine, canon, candidate, Pit run, Garrison admission, or inventory mutation
- Authority grant, approval action, or permission inference
- Procedure transition or Runtime validator
- persona selection, reservation, recruitment, Operative, mission binding, activation, or deployment
- tool, credential, provider, network, or external effect
- production baseline revision

## Failure Signals

Reject or revise this draft if it:

- lets no match act as construction authority
- permits a professional persona without qualifying real-practitioner evidence
- lists achievements without an inspectable achievement-to-behavior-to-trait derivation
- attributes a practitioner's identity, achievements, credentials, affiliations, or lived experience to the persona
- skips doctrine, required trait evidence, independent testing, or explicit admission
- lets Foundry invent or silently repair upstream meaning
- treats Pit recommendation as admission
- mutates a failed candidate in place or loses historical findings
- treats admission as suitability, selection, reservation, recruitment, or readiness
- reconverges without a new exact inventory view and suitability assessment
- creates Authority, Procedure, Runtime, deployment, or external effect
