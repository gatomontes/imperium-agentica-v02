# DR-006 — Mandatory Real-World Exemplar Grounding for Professional Personas

## Status

Recorded operator SOP decision.

This decision is mandatory for future professional-persona creation and revision work. It does not by itself revise or admit the Cognitive production baseline.

## Date

2026-07-24

## Decision

Every professional persona must be grounded in one or more identifiable, real-world human practitioners who are exemplary in the applicable profession.

Each source practitioner must be supported by verifiable, profession-relevant achievement or demonstrated-performance evidence. The evidence must be used to identify bounded, transferable traits and their observable behavioral expressions.

A professional Persona Specification Candidate must preserve the resulting exemplar-to-trait provenance. It must not merely name an admired person or list generic personality adjectives.

## Required Derivation

For every inherited trait, the record must make this chain inspectable:

```text
real practitioner
→ profession-relevant achievement or demonstrated performance
→ observed behavior
→ inferred transferable trait
→ intended persona behavior
→ conditions, limits, counterweights, and failure signals
```

A missing or unresolved link blocks conformance.

## Minimum SOP Record

The applicable Human-Trait Canon and Persona Specification Candidate must preserve:

```text
Source practitioner identity:
Applicable profession:
Achievement or demonstrated-performance evidence:
Evidence source and exact reference:
Observed behavior:
Inferred transferable trait:
Reason for inheritance:
Intended persona behavioral expression:
Conditions of usefulness:
Non-transferable context or advantage:
Costs, risks, and conflicting evidence:
Limits and counterweights:
Confidence:
Failure signals:
```

The Persona Specification Candidate may cite the exact Human-Trait Canon record rather than duplicating its evidence, but the provenance must remain directly reachable and version-exact.

## Multiplicity

At least one qualifying real practitioner is required for a professional persona.

Multiple practitioners should be used when sufficient evidence exists, especially to corroborate a trait, expose differences in context, and prevent a single human identity from becoming the persona template.

The number of exemplars does not substitute for evidence quality.

## Prohibitions

The exemplar's achievements are evidence for trait derivation. They are not achievements of the persona or agent.

This SOP does not permit:

- impersonation or simulation of a source practitioner;
- copying a whole personality, biography, voice, likeness, mannerism, or personal identity;
- claiming the source person's achievements, authority, affiliations, credentials, or lived experience;
- treating fame, reputation, prestige, popularity, or mythology as performance evidence;
- treating professional excellence as moral perfection;
- importing a trait without its context, costs, contradictions, and known limits;
- inferring causation from correlation without scrutiny;
- using an unverifiable, fictional, composite, or anonymous exemplar to satisfy the requirement;
- allowing exemplar traits to override profession, governance, evidence, refusal, escalation, or authority boundaries.

## Gate Behavior

For professional personas:

```text
TRAIT_CANON_REQUIRED
```

`TRAIT_CANON_NOT_APPLICABLE` is not a valid finding merely because exemplar research is inconvenient or incomplete.

Insufficient evidence produces `TRAIT_CANON_REFUSED` or `TRAIT_CANON_UNRESOLVED` and blocks Foundry integration.

Non-professional artifacts remain outside this decision unless they are represented or used as professional personas.

## Review Duties

Hagiography must test evidence quality and the transfer claim.

Foundry must preserve exact exemplar-to-trait provenance and express the traits as testable persona behavior.

Pit must test both the intended behavior and the risks of performative mimicry, overextension, context loss, and conflict among inherited traits.

Garrison must not admit a professional persona whose required exemplar provenance or Pit evidence is missing, stale, refused, or unresolved.

Later contrary evidence may revise or decanonize a trait. Historical records remain preserved.

## Rationale

Imperium's admitted Hagiography already defines exemplary real humans as evidence sources and prohibits whole-person import. However, Foundry, Pit, and the current persona-production draft treated the Human-Trait Canon as conditionally applicable.

The operator's SOP is stronger: exemplary real practitioners and traits evidenced through their achievements are required for every professional persona.

This decision converts that operator requirement into an explicit, inspectable gate while preserving Hagiography's anti-impersonation and evidence safeguards.

## Source Qualification

The MIT Sloan risk article that initiated the broader deliberation review does not itself prescribe adding human achievements to an agent specification.

The achievement-to-trait method is supported by Imperium's Hagiography lineage and by the operator's explicit authorization recorded here. The MIT article remains contextual motivation for the broader risk review, not the source of this persona-design rule.

## Affected Records

- `layers/cognitive/production/hagiography.md` — already substantially aligned; production revision requires separate pressure and admission.
- `layers/cognitive/production/foundry.md` — currently says Human-Trait Canon “when applicable.”
- `layers/cognitive/production/pit.md` — currently says Human-Trait Canon “when applicable.”
- `layers/cognitive/drafts/persona-production-conformance-contract.md` — revised in this increment to consume this SOP.
- `deliberations/registry.md` — records this decision.

## Non-Decisions

This decision does not:

- select any practitioner for any persona;
- canonize any trait;
- create, select, admit, recruit, package, activate, or deploy a persona or Operative;
- revise admitted production semantics;
- authorize a model, provider, evaluator, tool, credential, Runtime action, or external effect.

## Required Follow-Up

Before production admission, pressure this requirement against Hagiography, Foundry, Pit, Garrison, provenance duties, evidence availability, defamation and privacy risk, cultural and demographic breadth, and the risk of confusing correlation with causation.

The smallest likely production correction is to make Human-Trait Canon mandatory for professional personas and require exact achievement-to-trait provenance in Foundry and Pit. That correction must earn admission separately.

## Supersession

A later decision may refine the minimum number of exemplars, evidence threshold, privacy treatment, or scope. It must preserve traceability to this decision and may not silently weaken the operator requirement.
