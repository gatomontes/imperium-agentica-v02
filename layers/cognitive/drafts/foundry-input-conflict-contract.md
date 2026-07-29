# Foundry Input and Conflict Contract

## Status

Draft completion increment for the Creation Apparatus Institutional Completion Review. This contract does not revise DR-014, admit a Persona Specification Candidate, create a persona, or authorize implementation.

## Native Responsibility

Foundry owns integration of exact upstream cognitive inputs into a versioned Persona Specification Candidate.

Foundry may identify and classify defects. It may not silently repair Guildhall, Studium, Hagiography, Pit, Garrison, Authority, Procedure, Provenance, or Runtime concerns.

## Required Input Set

A Foundry integration attempt requires one exact, correlated set of:

- Mission Identity;
- approved Work Specification;
- conformant Profession Specification and Resolution Assessment;
- conformant Persona Governance Doctrine;
- applicable Human-Trait Canon entries;
- EC-01 disposition and EC-02 safeguards record where applicable;
- required PB-001 provenance findings;
- applicable operator constraints;
- declared integration version and supersession lineage.

All inputs must be identifiable by exact identity and version.

## Input State Classification

Each required input must be classified as one of:

~~~text
PRESENT_AND_CURRENT
MISSING
STALE
SUPERSEDED
REFUSED
UNRESOLVED
CONFLICTING
INCOMPATIBLE
PROVENANCE_INCOMPLETE
~~~

Foundry must not treat absence as approval, and must not convert any non-conformant state into PRESENT_AND_CURRENT by inference.

## Conflict Classes

Foundry must distinguish:

| Conflict | Native return |
|---|---|
| Profession and Work Specification disagree | Castellan / Guildhall |
| Doctrine contradicts profession scope | Guildhall / Studium |
| Canon trait exceeds evidence or conflicts with doctrine | Hagiography / Studium |
| Canon entry is missing, stale, or superseded | Hagiography |
| Required provenance relation is missing or mismatched | Provenance owner |
| Candidate integration changes upstream meaning | Foundry refusal and new candidate version |
| Pit result is for another candidate/version | Pit / Foundry |
| Operator constraint conflicts with an admitted boundary | exact conflict record; no silent accommodation |
| Officer/Gesta input enters the professional path | refuse as out of scope |

## Findings

Foundry may produce one versioned integration assessment with exactly one finding:

~~~text
PERSONA_INPUTS_CONFORMANT
PERSONA_INPUTS_REFUSED
PERSONA_INPUTS_UNRESOLVED
~~~

PERSONA_INPUTS_CONFORMANT requires every mandatory input to be present, current, version-matched, provenance-complete, and semantically compatible.

PERSONA_INPUTS_REFUSED applies when a known prohibited, unsafe, out-of-scope, or non-preservable condition prevents integration.

PERSONA_INPUTS_UNRESOLVED applies when required evidence, identity, version, ownership, conflict disposition, or provenance cannot be determined.

Refused and unresolved findings block candidate production and Pit entry.

## Return Routing

A conflict return must identify:

- exact conflicting artifacts and versions;
- the proposition or field in conflict;
- evidence supporting each side;
- native owner responsible for resolution;
- whether downstream artifacts are invalidated;
- required replacement or clarification;
- whether the current integration attempt is closed, suspended, or eligible for retry.

Foundry may return a conflict to an upstream owner. It may not decide the upstream owner's meaning merely to continue.

## Candidate Integrity

A conformant integration creates a new immutable Persona Specification Candidate version.

The candidate must preserve:

- exact upstream identities and versions;
- Human-Trait Canon limits, counterweights, and restrictions;
- EC dispositions and evidence lineage;
- unresolved gaps, if any;
- integration findings;
- acceptance criteria;
- supersession lineage.

Foundry must not mutate a prior candidate in place.

## Re-entry

A returned integration may re-enter Foundry only when:

1. the native owner has produced a new or explicitly corrected version;
2. the correction has its required evidence and admission status;
3. affected downstream references have been invalidated or revalidated;
4. the complete input set is reconstructed by exact identity and version;
5. a new integration assessment is created.

A correction does not retroactively make the prior candidate conformant.

## Non-Admissions

This contract admits no:

- persona or Operative;
- Pit test or Garrison admission;
- Authority grant;
- Procedure transition;
- Runtime action;
- tool, credential, provider, or deployment;
- Officer/Gesta/Smith/Spur/Curia work;
- external effect.

## Completion Gate

The increment is complete only when pressure testing demonstrates:

- missing inputs block;
- stale and superseded inputs block;
- conflicting inputs return to native owners;
- cross-version inputs cannot be combined;
- Foundry cannot silently repair upstream meaning;
- failed integration remains historical;
- corrected input creates a new integration attempt;
- no production or external effect occurs.
