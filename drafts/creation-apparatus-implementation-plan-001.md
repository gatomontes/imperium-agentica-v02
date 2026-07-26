# Creation Apparatus Implementation Plan 001

## Status

Draft implementation plan. No production code, provider, model, credential, Runtime behavior, deployment, or external effect.

## Scope

Professional Operative path only:

~~~text
Guildhall
→ Studium
→ Hagiography / Human-Trait Canon
→ Foundry
→ Pit
→ Garrison
→ Conscription / Recruitment
~~~

Officer, Gesta, Smith, Spur, Curia, OC, and Secretariat implementation are excluded.

## Implementation Principle

Implement the admitted semantic contracts as inspectable artifact transformations and validation boundaries.

Do not begin with autonomous institutions, agent loops, provider integrations, registries, or Runtime orchestration.

## Proposed Logical Components

### 1. Artifact Identity and Versioning

Shared support for:

- stable artifact identity;
- immutable version;
- status;
- supersession;
- exact source references;
- correlation to Mission Identity;
- provenance relations;
- invalidation state.

This is shared infrastructure, not a new semantic owner.

### 2. Guildhall Resolver

Consumes:

- Mission Identity;
- Mission Need;
- approved Work Specification;
- operator constraints.

Produces:

- Profession Specification;
- Profession Resolution Assessment;
- conformant, refused, or unresolved finding.

Must not search, select, reserve, or construct personas automatically.

### 3. Studium Doctrine Service

Consumes an exact Profession Specification and applicable constraints.

Produces:

- Persona Governance Doctrine;
- doctrine assessment;
- amendment and supersession records.

The implementation must keep the Persona branch separate from Officer doctrine.

### 4. Hagiography Canon Service

Consumes evidence-review inputs and EC dispositions.

Produces:

- Human-Trait Canon candidate;
- canonization recommendation;
- revision or decanonization record.

Initial implementation must support synthetic fixtures only. Real-person processing remains separately gated.

### 5. Foundry Integrator

Consumes exact, current, compatible upstream artifacts.

Produces:

- Persona Specification Candidate;
- integration assessment;
- conflict or unresolved return.

The integrator must refuse missing, stale, superseded, conflicting, incompatible, or provenance-incomplete inputs. It must never silently repair upstream meaning.

### 6. Pit Validator

Consumes an immutable Persona Specification Candidate and declared test specification.

Produces:

- independent test record;
- findings;
- repair routing;
- retest eligibility;
- recommendation.

Pit must not edit candidates or admit personas.

### 7. Garrison Admission and Inventory

Consumes a conformant candidate, Pit finding, and complete provenance.

Produces:

- admission assessment;
- immutable Canonical Persona record;
- inventory view;
- status and qualification history.

Selection, reservation, recruitment, and deployment remain outside Garrison.

### 8. Conscription Packager

Consumes:

- exact eligible candidate set;
- authorized selection criteria;
- selection/tie-resolution record;
- target-medium contract;
- declared model, tool, and interface requirements.

Produces:

- Operative Package;
- transformation assessment;
- deviation record;
- handoff record;
- conformant, refused, or unresolved finding.

It must not activate, release, mission-bind, or deploy.

### 9. Invalidation Coordinator

A cross-cutting mechanism, not an institutional authority.

Consumes change or invalidation events and produces:

- affected-artifact analysis;
- suspended eligibility;
- invalidation record;
- reassessment requirement;
- successor lineage.

Disputed ownership must suspend downstream use and produce an unresolved ownership record rather than an inferred decision.

## Artifact Boundary

The first implementation should use immutable, inspectable documents or records with:

- identity;
- version;
- status;
- typed payload;
- source references;
- producer;
- correlation;
- finding;
- supersession;
- invalidation;
- review record.

A database, queue, API, or Runtime adapter is not selected by this plan.

## Processing Boundary

Each component should behave as a deterministic contract evaluator:

~~~text
exact inputs
→ validate identity/version/provenance
→ evaluate native contract
→ produce immutable artifact
→ emit finding
→ preserve refusal or unresolved state
~~~

No component should infer approval from missing evidence or continue after a blocking finding.

## Cross-Component Interfaces

| Producer | Consumer | Required handoff |
|---|---|---|
| Castellan | Guildhall | approved Work Specification |
| Guildhall | Studium | Profession Specification |
| Guildhall | Garrison | exact suitability criteria |
| Studium | Foundry | Persona Governance Doctrine |
| Hagiography | Foundry | exact Canon entry versions |
| Foundry | Pit | immutable Persona Specification Candidate |
| Pit | Garrison | independent test finding |
| Garrison | Conscription | exact eligible Canonical Persona set |
| Conscription | later Muster | Operative Package and handoff record |
| Any upstream component | Invalidation Coordinator | change/invalidation signal |

## Smallest Build Increments

1. Artifact identity/version/provenance primitives.
2. Contract result and refusal vocabulary.
3. Guildhall resolver reference implementation.
4. Foundry input/conflict validator.
5. Studium Doctrine lifecycle evaluator.
6. Hagiography synthetic Canon evaluator.
7. Pit independent-validation evaluator.
8. Garrison admission/suitability evaluator.
9. Conscription selection/tie/transformation evaluator.
10. Cross-chain invalidation evaluator.
11. End-to-end synthetic artifact trace.
12. Boundary and regression verification.

## Explicit Non-Goals

This plan does not authorize:

- production implementation;
- live repository mutation beyond this planning record;
- real-person evidence;
- provider or model selection;
- tool or credential access;
- Runtime implementation;
- persistence topology selection;
- autonomous orchestration;
- activation, mission binding, release, or deployment;
- Officer/Gesta/Smith/Spur/Curia work;
- OC or Secretariat implementation;
- external effect.

## Implementation Gate

Before coding begins, a separate decision must approve:

- implementation language and repository location;
- artifact persistence approach;
- execution boundary;
- test harness boundary;
- authority and provenance adapters;
- whether a reference implementation or production implementation is intended.

Until then, this remains an implementation plan only.
