# Guildhall Profession Resolution Contract

## Status

Draft A2.1 candidate only.

This contract does not revise `CB-005`, resolve a live profession, instantiate Guildhall, search Garrison, or authorize any mission action.

## Canonical Dependencies

- `layers/cognitive/production/guildhall.md`
- `layers/cognitive/production/castellan.md`
- `layers/cognitive/production/garrison.md`
- `layers/cognitive/production/studium.md`
- `layers/cognitive/production/foundry.md`
- `layers/cognitive/production/pit.md`
- `layers/provenance/production/provenance-contract.md`
- `layers/provenance/production/mission-correlation-and-isolation-contract.md`
- `layers/procedure/production/imperium-lifecycle-procedure.md`

Candidate evidence dependency:

- `layers/cognitive/drafts/castellan-work-specification-contract.md`

The candidate dependency is not admitted production semantics. This draft must remain consistent with controlling production contracts even if that evidence is later revised or rejected.

## Native Concern

Profession Specification meaning and profession resolution are native to Guildhall's Cognitive responsibility.

Castellan owns Mission Need and Work Specification meaning. Garrison owns admitted persona inventory truth. Studium owns Persona Governance Doctrine. Foundry integrates persona candidates. Pit tests them. Provenance owns identities and lineage. Procedure owns ordering and stage transitions.

Profession resolution requires no new Authority action class. The exact approved Work Specification is an entry condition, not a grant of professional truth.

## Core Question

```text
Does this exact Profession Specification version identify the professional
pattern that can legitimately perform the approved work, with sufficient
competence, practice limits, evidence duties, risk treatment, and search
criteria, without rewriting the work or selecting a persona?
```

## Entry Conditions

Profession resolution requires:

- exact Mission Identity
- exact Mission Need identity and version
- exact approved Work Specification identity and version
- exact Work Specification formation assessment reference
- exact effective `APPROVE_WORK_SPECIFICATION` finding reference
- operator constraints relevant to professional fit
- required PB-001 identity, derivation, citation, and correlation findings
- unresolved input mismatches or blockers exposed

Absent, refused, unresolved, mismatched, superseded, or unapproved inputs block resolution. Guildhall cannot repair those inputs.

## Profession Specification

Guildhall produces one versioned `Profession Specification` for one exact approved Work Specification version.

Minimum semantic content:

```text
Profession Specification identity and version
Mission Identity
Mission Need identity and version
Approved Work Specification identity and version
Profession identity
Professional purpose for this work
Required functional and domain competence
Required judgments and evidence behavior
Legitimate practice boundaries
Mandatory professional responsibilities
Prohibited or reserved practice
Adjacent and contributory professions
Excluded professions and exclusion rationale
Operator constraints and their fit disposition
Applicable professional standards or doctrine references
Evidence, disclosure, uncertainty, refusal, and escalation expectations
Applicable professional risks and counterconditions
Conflicts, independence, and counsel requirements when applicable
Suitability criteria for exact Garrison search
Known gaps and unresolved ambiguity
Required provenance relations and finding
Resolution assessment reference
Supersession reference
```

This is semantic content, not a registry, taxonomy service, database schema, or Runtime object.

## Professional Fit

Profession identity must follow the work's required capability, domain knowledge, material judgment, evidence duties, legitimate scope, and risk.

Guildhall must not infer the answer from:

- tone, title, vocabulary, prestige, or familiarity alone
- the profession most readily available in Garrison
- a preferred persona or deployment medium
- an operator-suggested profession without fit validation
- the historical profession used for superficially similar work

An operator-suggested profession is a relevant constraint or hypothesis. It becomes resolved professional truth only if the exact assessment demonstrates fit. An incompatible suggestion remains explicit and yields refusal or unresolved return according to the defect; Guildhall does not bend the Work Specification to make it fit.

## Adjacency And Ambiguity

The Profession Specification identifies one primary professional pattern for its bounded work and distinguishes:

- adjacent professions that may appear similar but lack required scope
- contributory professions that may supply bounded counsel or inputs
- excluded professions whose practice would be illegitimate or insufficient

Guildhall must not collapse irreducibly distinct professional needs into a synthetic profession merely to continue the flow.

When no single primary profession can legitimately own the bounded work, Guildhall returns `PROFESSION_UNRESOLVED` with the exact ambiguity and a request for Castellan-owned decomposition or separately bounded Work Specifications. Guildhall does not perform that decomposition itself.

## Profession Resolution Assessment

Guildhall may produce a versioned `Profession Resolution Assessment` for one exact Profession Specification version.

Minimum semantic content:

```text
Assessment identity and version
Profession Specification identity and version
Mission Identity
Mission Need identity and version
Approved Work Specification identity and version
Professional-fit finding
Competence and practice-boundary finding
Adjacency and exclusion finding
Evidence, escalation, and risk finding
Operator-constraint disposition
Ambiguity and decomposition finding
Garrison-suitability-criteria finding
Provenance finding
Unresolved blockers
Rationale
Supersession reference
Profession finding
```

Candidate findings:

```text
PROFESSION_CONFORMANT
PROFESSION_REFUSED
PROFESSION_UNRESOLVED
```

These are artifact-relative Cognitive findings, not Authority, Procedure state, persona availability, persona suitability, recruitment, or mission readiness.

`PROFESSION_CONFORMANT` means the exact Profession Specification version faithfully resolves one legitimate professional pattern and is eligible to inform exact Garrison search and downstream doctrine work.

`PROFESSION_REFUSED` means a known illegal, prohibited, deceptive, or professionally indefensible fit prevents responsible resolution.

`PROFESSION_UNRESOLVED` means required identity, scope, competence, evidence, standard, risk, boundary, ambiguity, or provenance information is absent, contested, multiple, or indeterminate.

Refused and unresolved findings block Garrison search eligibility and persona-production referral.

## Provenance And Revision Boundary

Required PB-001 relations include exact derivation from and citation of the Mission Need and approved Work Specification versions, plus correlation to the Mission Identity.

Any semantic change creates a new Profession Specification version and requires:

- a new Profession Resolution Assessment
- exact derivation and supersession lineage
- reassessment of professional fit, boundaries, ambiguity, and Garrison suitability criteria

Prior search eligibility does not transfer across versions. Historical findings are preserved and cannot be overwritten to make a later profession appear to have been the original answer.

## Garrison Search Eligibility

An exact Profession Specification becomes eligible for Garrison search only when all are present for the same version and Mission Identity:

```text
versioned Profession Specification
+ PROFESSION_CONFORMANT
+ exact approved Work Specification reference
+ required PB-001 provenance finding
+ complete suitability criteria
```

This increment establishes eligibility only.

It does not:

- perform a Garrison inventory query
- determine that a suitable Canonical Persona exists
- select, reserve, or admit a persona
- refer construction work automatically
- author Persona Governance Doctrine or Human-Trait Canon
- forge, test, recruit, or deploy anything

Garrison availability cannot retroactively change the resolved profession. No search or referral occurs automatically; Procedure retains Stage 2 ordering and blocking.

## Non-Admissions

This draft admits no:

- new profession taxonomy, institution, role, service, or universal Resolution layer
- live Mission Need, Work Specification, Profession Specification, assessment, or Garrison search
- Authority grant, approval action, or permission inference
- Procedure transition or Runtime validator
- persona selection, reservation, construction, testing, admission, recruitment, or Operative
- tool, credential, platform, provider, deployment, or external effect
- production baseline revision

## Failure Signals

Reject or revise this draft if it:

- lets Guildhall rewrite mission or work meaning
- treats operator preference or Garrison availability as professional truth
- collapses incompatible professions without exposing ambiguity
- lets a conformant finding prove persona availability or suitability
- transfers search eligibility across semantic versions
- lets Guildhall author governance, forge, test, admit, or recruit a persona
- creates Authority, Procedure, Runtime, deployment, or external effect
- creates a universal taxonomy, registry, resolution, or readiness layer
