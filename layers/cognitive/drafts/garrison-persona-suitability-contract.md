# Garrison Persona Suitability Contract

## Status

Draft A2.2 candidate only.

This contract does not revise `CB-005`, query a live Garrison, select or construct a persona, or authorize any mission action.

## Canonical Dependencies

- `layers/cognitive/production/guildhall.md`
- `layers/cognitive/production/garrison.md`
- `layers/cognitive/production/studium.md`
- `layers/cognitive/production/hagiography.md`
- `layers/cognitive/production/foundry.md`
- `layers/cognitive/production/pit.md`
- `layers/cognitive/production/conscription.md`
- `layers/provenance/production/provenance-contract.md`
- `layers/provenance/production/mission-correlation-and-isolation-contract.md`
- `layers/procedure/production/imperium-lifecycle-procedure.md`

Candidate evidence dependency:

- `layers/cognitive/drafts/guildhall-profession-resolution-contract.md`

The candidate dependency is not admitted production semantics. This draft must remain consistent with controlling production contracts even if that evidence is later revised or rejected.

## Native Concerns

Guildhall owns application of Profession Specification suitability criteria and the professional-fit meaning of a search result.

Garrison owns inventory truth: exact admitted Canonical Persona identity and version, qualification, availability, test and revision history, supersession, quarantine, and retirement status.

Conscription owns downstream persona selection and recruitment. Studium, Hagiography, Foundry, and Pit own governance doctrine, trait canon, integration, and testing. Provenance owns identity and lineage. Procedure owns branch order.

No owner may use this contract to absorb another's concern.

## Core Question

```text
Against this exact Profession Specification and exact Garrison inventory view,
which admitted Canonical Persona versions satisfy every mandatory suitability
criterion, or is the search conclusively empty or unresolved?
```

## Entry Conditions

Suitability assessment requires:

- exact Mission Identity
- exact approved Work Specification identity and version
- exact Profession Specification identity and version
- exact `PROFESSION_CONFORMANT` assessment reference
- complete suitability criteria from that exact Profession Specification version
- a Garrison-owned inventory-view identity and version or ordering reference
- exact candidate record identities and versions within the view
- required PB-001 citation, correlation, and derivation findings
- unresolved input mismatches or blockers exposed

Refused, unresolved, mismatched, superseded, or incomplete profession inputs block search. A stale or unidentifiable inventory view yields unresolved search, not no match.

## Garrison Inventory View

For one exact search, Garrison may supply a versioned `Garrison Inventory View` containing only inventory facts necessary to evaluate the supplied suitability criteria.

Minimum semantic content:

```text
Inventory-view identity and version or ordering reference
Search scope and exact Profession Specification reference
Candidate Canonical Persona identity and version
Profession Specification reference carried by each candidate
Persona Governance Doctrine reference
Human-Trait Canon reference when applicable
Purpose, competence, and governable-boundary references
Pit Findings and admission evidence references
Qualification status and basis
Availability status and applicable reservation fact
Revision and supersession status
Quarantine or retirement status
Known limits and unresolved inventory facts
Required provenance relations and finding
```

This is a bounded semantic view, not a database snapshot, registry API, lock, reservation, or Runtime query result.

Garrison does not decide professional fit. It supplies exact inventory facts without rewriting the Profession Specification or filling missing evidence by similarity.

## Candidate Eligibility

A Canonical Persona version may enter the suitable-candidate set only when all applicable conditions are demonstrated:

- exact identity and version are stable
- the version is admitted
- profession reference is compatible with the exact Profession Specification
- every mandatory suitability criterion has an explicit pass with cited evidence
- required governance doctrine and applicable trait canon versions are present
- required Pit Findings and test history support the claimed competence and boundaries
- qualification is current for the search scope
- availability permits consideration without implying reservation
- the version is not superseded, quarantined, retired, or otherwise ineligible
- known limits do not contradict the work's mandatory conditions
- required PB-001 findings are complete

Content similarity, name similarity, prior use, availability, popularity, or technical portability cannot substitute for exact evidence.

## Persona Suitability Search Assessment

Guildhall may produce one versioned `Persona Suitability Search Assessment` for one exact Profession Specification version and Garrison Inventory View.

Minimum semantic content:

```text
Assessment identity and version
Mission Identity
Approved Work Specification identity and version
Profession Specification identity and version
Profession-resolution assessment reference
Garrison Inventory View identity and version
Evaluated candidate identities and versions
Criterion-by-criterion result and evidence for each candidate
Admission, qualification, availability, and lifecycle-status findings
Candidate exclusions and rationale
Multiplicity and ambiguity finding
Known inventory or evidence gaps
Required provenance finding
Rationale
Supersession reference
Search finding
```

Candidate findings:

```text
SUITABLE_PERSONA_CANDIDATES_FOUND
NO_SUITABLE_PERSONA_FOUND
PERSONA_SEARCH_UNRESOLVED
```

These are artifact-relative Cognitive findings, not persona selection, reservation, admission, construction authority, Procedure state, recruitment, or mission readiness.

`SUITABLE_PERSONA_CANDIDATES_FOUND` means one or more exact admitted Canonical Persona versions satisfy every mandatory criterion on the cited inventory view. The finding returns the complete eligible candidate set and preserves multiplicity.

`NO_SUITABLE_PERSONA_FOUND` means every in-scope candidate was evaluated on a complete, current, exact inventory view and each failed at least one mandatory criterion. It is not inferred from an empty, partial, stale, unavailable, or unsearchable view.

`PERSONA_SEARCH_UNRESOLVED` means required inventory identity, status, candidate evidence, criterion result, provenance, or ambiguity disposition is missing, contested, stale, mismatched, or indeterminate.

## Multiple Candidates

When multiple Canonical Persona versions satisfy all mandatory criteria, the assessment preserves the full eligible set and exact evidence.

Guildhall must not silently rank, reserve, or select a candidate using criteria absent from the Profession Specification. Any downstream selection rule belongs to Conscription's bounded recruitment responsibility and must consume the exact candidate set.

If candidate comparison requires a missing material criterion, the result is unresolved and returns that gap to Guildhall's Profession Specification responsibility. Garrison does not invent the criterion.

## Found Branch

`SUITABLE_PERSONA_CANDIDATES_FOUND` creates eligibility for later Conscription selection only when the exact candidate set, search assessment, source versions, and PB-001 finding remain current.

It does not:

- select or reserve a persona
- change inventory availability
- grant recruitment, tool, access, or mission authority
- create an Operative
- trigger Conscription automatically

## No-Match Branch

`NO_SUITABLE_PERSONA_FOUND` creates eligibility to enter the admitted persona-production path with:

- exact Mission Identity
- exact approved Work Specification version
- exact conformant Profession Specification version
- exact search assessment and evaluated inventory view
- failed criteria and gap rationale
- required PB-001 findings

This does not directly create Foundry work or skip Studium governance doctrine, Hagiography trait canon when applicable, Foundry integration, Pit testing, or Garrison admission.

No branch executes automatically. Procedure retains ordering and must block unresolved, stale, mismatched, or superseded artifacts.

## Provenance And Revision Boundary

The assessment cites exact source and candidate versions and records its derivation from the Profession Specification and Garrison Inventory View under PB-001.

A semantic change to the Profession Specification, any evaluated persona version, a mandatory criterion, admission or qualification evidence, or a material inventory status invalidates the prior assessment for downstream use.

Reassessment creates a new version with exact supersession lineage. Historical search findings remain preserved.

## Non-Admissions

This draft admits no:

- new institution, registry service, search engine, lock, reservation system, or universal Suitability layer
- live Garrison Inventory View, search, assessment, or persona-production request
- Authority grant, approval action, or permission inference
- Procedure transition or Runtime validator
- persona selection, reservation, construction, testing, admission, mutation, or recruitment
- Operative, tool, credential, platform, provider, deployment, or external effect
- production baseline revision

## Failure Signals

Reject or revise this draft if it:

- lets Garrison availability redefine professional truth
- treats partial or stale inventory as proof of no match
- treats admission, qualification, or availability alone as complete suitability
- silently selects among multiple suitable candidates
- lets a search finding reserve, construct, admit, or recruit a persona
- skips doctrine, trait, construction, testing, or admission on the no-match branch
- transfers findings across changed source or candidate versions
- creates Authority, Procedure, Runtime, deployment, or external effect
