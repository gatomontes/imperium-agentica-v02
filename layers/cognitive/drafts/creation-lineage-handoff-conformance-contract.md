# Creation Lineage And Handoff Conformance Contract

## Status

Draft A3.1 candidate only.

This contract does not revise CB-005, instantiate any creation artifact, admit production semantics, bind a mission, declare launch readiness, or authorize deployment.

## Canonical Dependencies

- layers/cognitive/drafts/castellan-mission-formation-contract.md
- layers/cognitive/drafts/castellan-work-specification-contract.md
- layers/cognitive/drafts/guildhall-profession-resolution-contract.md
- layers/cognitive/drafts/garrison-persona-suitability-contract.md
- layers/cognitive/drafts/persona-production-conformance-contract.md
- layers/cognitive/drafts/conscription-selection-recruitment-contract.md
- layers/cognitive/drafts/operative-creation-handoff-contract.md
- layers/provenance/production/provenance-contract.md
- layers/provenance/production/mission-correlation-and-isolation-contract.md
- layers/authority/production/mission-envelope.md
- layers/authority/production/capability-tool-and-access-grants.md
- layers/procedure/production/imperium-lifecycle-procedure.md

The Cognitive dependencies are merged draft evidence, not admitted production semantics. This contract composes them without promoting or redefining them.

## Native Concern

Each artifact and assessment retains its native Cognitive owner. Provenance owns identity and lineage findings. Authority owns grants and their effectiveness. Procedure owns ordering. Runtime owns no creation meaning.

A3 owns no new institution or semantic layer. It is one bounded cross-flow conformance assessment that asks whether the exact existing findings compose without contradiction.

## Core Question

~~~
Does one exact, version-pinned creation chain reproduce a semantically equivalent
deployment-medium-specific Operative and satisfy the separate provider-neutral
handoff contract without repairing, rewriting, or skipping any native finding?
~~~

## Exact Creation Chain

The assessed chain must identify one exact path:

~~~
Petition
→ Mission Formation Assessment
→ Mission Need
→ Work Specification Formation Assessment
→ approved Work Specification
→ Profession Resolution Assessment
→ Profession Specification
→ Persona Suitability Search Assessment
→ exact admitted Canonical Persona branch
→ Persona Selection Assessment
→ Operative
→ Recruitment Assessment
→ Operative Creation Handoff Assessment
~~~

When the no-match branch was used, the chain additionally includes:

~~~
NO_SUITABLE_PERSONA_FOUND
→ Persona Governance Doctrine
→ Human-Trait Canon when applicable
→ Persona Specification Candidate
→ Pit Findings
→ Garrison Admission Assessment
→ fresh Garrison Inventory View
→ fresh Persona Suitability Search Assessment
~~~

The branch may reconverge only at the fresh suitability result already required by A2.3.

## Creation Closure Assessment

Conscription may produce a versioned Creation Closure Assessment for one exact Operative version after recruitment assessment and before, or together with, the separate A0 handoff assessment.

Minimum semantic content:

~~~
Assessment identity and version
Exact artifact and finding identities and versions for the complete chain
Mission Identity and correlation references used during creation
Selected Canonical Persona identity and version
Deployment medium and technical-contract identity and version
Transformation or packaging identity and version
Required PB-001 relation set and provenance finding
Applicable authority references and findings or explicit not-applicable bases
Preservation matrix across competence, doctrine, traits, refusal, evidence, and escalation
Deviation matrix and native-owner dispositions
Reproducibility inputs, method, comparison basis, and finding
Material source-currency and invalidation finding
Native-owner repair and supersession finding
Downstream inspectability finding
Unresolved blockers
Rationale
Supersession reference
Closure finding
~~~

Findings:

~~~
CREATION_CLOSURE_CONFORMANT
CREATION_CLOSURE_REFUSED
CREATION_CLOSURE_UNRESOLVED
~~~

These are artifact-relative findings, not lifecycle states, authority, admission, mission binding, readiness, activation, or deployment.

## Composition Rule

A downstream finding cannot cure an absent, refused, unresolved, stale, mismatched, or superseded upstream finding.

Closure requires every material transition to cite the exact source and target versions, the native assessment that justified the transition, and the applicable PB-001 relation.

Similarity, matching prose, shared titles, timestamps, prior success, or operator familiarity cannot repair identity or lineage.

## Reproducibility

Reproducibility means that the same pinned semantic inputs, inventory view, selection evidence, deployment-medium technical contract, and transformation version produce an Operative that is semantically equivalent under the cited native contracts.

Semantic equivalence requires equivalent:

- professional competence and legitimate practice boundaries
- governance doctrine and applicable trait behavior
- refusal, disclosure, evidence, uncertainty, and escalation behavior
- declared dependencies, resource classes, and secret classes
- technical-contract obligations
- accepted deviations and their dispositions
- required lineage and authority references

Byte identity is required only when the cited deployment-medium or transformation contract explicitly requires deterministic bytes.

A reproduction attempt must create a distinct attempt identity and evidence record. It does not overwrite the assessed Operative or claim that nondeterministic incidental formatting is a semantic defect.

## Invalidation

Any material change to a cited artifact, finding, inventory view, admission or qualification fact, deployment-medium contract, transformation version, model constraint, tool-interface definition, preservation condition, deviation disposition, or applicable authority basis invalidates dependent findings for future use.

Invalidation does not erase historical conformance. It makes the prior finding ineligible to justify a changed chain.

A changed source requires:

1. native-owner revision or reassessment
2. a new artifact or assessment version when semantics change
3. exact PB-001 SUPERSEDES and derivation lineage
4. re-execution of every downstream assessment whose basis changed
5. a new closure and handoff assessment for the new Operative version

## Native-Owner Repair

A3 may identify the first broken or unresolved transition and route the defect to its native owner.

It must not:

- rewrite Petition, Mission Need, or Work Specification meaning
- choose or redefine a profession
- change suitability criteria or inventory facts
- forge, test, admit, select, or recruit a persona
- disposition a deviation owned by another contract
- create or repair authority
- fabricate missing provenance
- mutate an Operative or prior finding in place

The repaired chain returns through the exact downstream gates from the changed point.

## Handoff Composition

CREATION_CLOSURE_CONFORMANT is necessary but not sufficient for HANDOFF_CONFORMANT.

The separate Operative Creation Handoff Assessment must evaluate the same exact Operative version and current chain evidence.

~~~
CREATION_CLOSURE_CONFORMANT
+ exact current A0 assessment
→ HANDOFF_CONFORMANT / HANDOFF_REFUSED / HANDOFF_UNRESOLVED
~~~

A closure finding never substitutes for the A0 finding. A prior A0 finding does not transfer to a new or repaired Operative version.

## Downstream Inspectability

A downstream consumer may inspect and cite:

- exact Operative and source identities and versions
- preservation and deviation evidence
- requirements and known blockers
- closure, recruitment, provenance, authority-reference, and handoff findings

Inspection does not authorize the consumer to rewrite creation semantics, repair the chain, infer grants, bind a mission, or declare readiness.

Direct operator delivery and Muster consideration remain separate choices. Neither occurs automatically.

## Track Boundary

A conformant closure plus HANDOFF_CONFORMANT closes the creation-side evidence track for the exact Operative version only.

It establishes none of the following:

- production admission of these drafts
- mission binding or Operative Binding
- Mission Envelope effectiveness for downstream action
- Muster Instance or Deployment Package
- READY_FOR_LAUNCH
- commissioning or activation
- tool or access grants
- credential possession
- provider acceptance
- Runtime compatibility, execution, or safety
- deployment or mission success

## Non-Admissions

This draft admits no new institution, layer, registry, graph, service, validator, state machine, Runtime behavior, authority grant, Procedure transition, live artifact, provider, credential, deployment, or external effect.

## Failure Signals

Reject or revise this draft if it:

- lets cross-flow closure redefine native artifact meaning
- treats matching content as exact identity or lineage
- requires byte identity without a technical-contract basis
- lets a later finding cure a stale, refused, or unresolved upstream finding
- mutates historical artifacts or findings in place
- lets closure substitute for A0 handoff conformance
- lets handoff imply mission binding, readiness, activation, or deployment
- creates a universal proof, artifact, workflow, readiness, or deployment layer
