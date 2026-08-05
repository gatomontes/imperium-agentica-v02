# Foundry

## Status

Admitted cognitive persona-construction boundary.

Baseline: `CB-CURRENT`.

Admission: `Production Admission Review 003`.

Evidence: `Constitutional Test Run 015 — 30 PASS / 0 FAIL`.

Foundry assembles governed professional inputs into a deployment-medium-agnostic Persona Candidate. Its construction process is governed by the Artificer and organized through bounded functional stations, or chambers.

## Station model

Foundry is an office, not a single undifferentiated action. The **Artificer** is Foundry's resident cognitive foreman, orchestrator, and default persona assembler. The Artificer owns the production case, creates and preserves the profession queue from the Guildmaster-admitted determination received through Castellan, commissions required upstream work, governs each candidate's passage through bounded stations, requests rework, preserves coherence, populates the exact versioned Persona Template, and authenticates the assembled result. The Artificer must preserve the admitted order and may not independently add, remove, or reprioritize professions.

Each station is a functional part of Foundry, not an independent office. Deterministic Runtime mechanisms may perform work that requires no judgment. An **Artisan** is not an assumed member of the production line. Artisans may be introduced only if a later, explicit necessity finding identifies bounded cognitive work that should not remain with the Artificer. Until then, the Artificer performs the cognitive assembly.

The production case begins:

```text
Castellan → Artificer → Profession Queue → first profession → Hagiography → Hagiography Research Packet → Artificer
```

For each queue item, the Artificer commissions Hagiography to research profession-relevant exemplars, demonstrated accomplishments, methods, and evidenced attributes. Hagiography's Sanctographer directs the Chroniclers, verifies their collected material, compiles the acceptable evidence, and returns an authenticated Hagiography Research Packet to the Artificer. Hagiography does not forge or recommend the persona.

After receiving the packet, the Artificer obtains the exact active version of the tagged Persona Template and begins populating a Persona Candidate from:

- Castellan's Foundry entry packet and operator requirements
- the Guildmaster-admitted Profession Determination Packet
- the Sanctographer-authenticated Hagiography Research Packet
- applicable Persona Governance Doctrine from Studium when commissioned
- authorized reusable persona patterns, if any

The tagged template defines the required anatomy of the Persona Candidate. It does not supply generic personality content, preselect attributes, or substitute for evidence. The Artificer may select, reconcile, and synthesize supported material, but may not invent unsupported attributes or silently alter upstream requirements.

The chamber production line is:

```text
Artificer → Receiving → Confluence → Temperance → Specification → Provenance → Dispatch → Pit
```

The stations are:

- **Receiving:** accepts and verifies Castellan's Foundry entry packet, including the exact Guildmaster-admitted Profession Determination Packet, Work Specification, operator requirements, and relevant mission context.
- **Confluence:** maps the exact construction inputs into the applicable tagged Persona Template.
- **Temperance:** identifies and resolves permitted conflicts, excesses, omissions, and tensions without weakening upstream authority.
- **Specification:** completes a coherent, testable Persona Candidate in the tagged template.
- **Provenance:** preserves lineage for consequential features, transformations, decisions, unresolved tensions, and every exact upstream artifact version.
- **Dispatch:** verifies template completeness and releases the candidate to Pit.

Chambers are functions, not officers or independent authorities. Deterministic Runtime mechanisms may perform schema validation, formatting, versioning, digest calculation, and record linkage. Their operation does not create or justify an Artisan.

The Artificer may return unresolved defects to the responsible upstream authority. The Artificer governs the passage and authenticates the result; authentication means that the candidate is complete enough to leave Foundry, not that it has been admitted as a Persona.

## Persona Template

The Persona Template is a stable, versioned Markdown artifact whose structured tags form Foundry's machine-readable construction schema.

The template:

- defines mandatory tagged fields and their permitted multiplicity
- is identified by exact version and SHA-256 digest
- is immutable once used by a dispatched candidate
- may be superseded only by a new version
- contains no profession-specific or mission-specific persona content
- must be populated only from attributable construction inputs
- must remain distinguishable from both a Persona Candidate and an admitted Persona

A Persona Candidate must fingerprint the exact Persona Template and exact upstream artifact versions used to assemble it. Missing required tags, malformed nesting, unsupported content, or broken lineage are dispatch defects.

The active template artifact is `persona-template.md`.

## Inputs

- Castellan Foundry entry packet
- Guildmaster-admitted Profession Determination Packet
- approved Work Specification
- operator requirements and relevant mission context
- Sanctographer-authenticated Hagiography Research Packet for the active queue item
- Persona Governance Doctrine when commissioned
- authorized reusable persona patterns, if any
- exact active Persona Template version and digest

## Product

Foundry produces a tagged `Persona Candidate`.

The candidate makes testable:

- role and professional mandate
- evidence-backed identity and attributes
- methods, reasoning, and evidence behavior
- communication behavior
- governance, refusal, and escalation boundaries
- expected inputs and outputs
- acceptance criteria
- exact template and upstream provenance

The candidate is neither an admitted Persona nor an agent definition.

After a passing Pit examination, Foundry produces a versioned Foundry Release Packet containing the exact production-approved Persona, exact passing Pit Brief, Persona Template fingerprint, upstream artifact fingerprints, complete revision lineage, Artificer authentication, and Foundry production-approval record. Foundry sends that packet to Castellan.

## Foundry Release Packet Contract

A Foundry Release Packet is immutable and must contain:

- `release_packet_id`, packet version, and packet SHA-256 digest
- exact production-approved `persona_id`, Persona version, and Persona SHA-256 digest
- exact passing `pit_brief_id`, Pit Brief version, and Pit Brief SHA-256 digest
- exact Persona Template version and SHA-256 digest
- complete upstream-artifact fingerprint set
- complete candidate revision and `SUPERSEDES` lineage
- Artificer identity, authentication record, and authentication time
- Foundry production-approval decision, decision time, and approval-record digest
- Castellan destination and handoff correlation identity

The production-approved Persona must be byte-identical to the exact candidate bound by the passing Pit Brief. Foundry must refuse release if any identity, version, digest, lineage, authentication, or approval reference is absent or mismatched. The packet cannot substitute a later Persona revision for the tested candidate.

## Revision

Foundry may return conflicts to Castellan, Guildhall, Studium, or Hagiography.

It does not silently repair an upstream authority or evidence defect.

A failed Pit examination returns the exact candidate and authenticated failure brief to Artificer. Artificer coordinates permitted repair, assembles a new immutable candidate version with `SUPERSEDES` lineage and a new digest, and resubmits it for complete Pit re-examination. Prior candidates and Pit records remain immutable.

A passing Pit examination returns the exact tested candidate and authenticated passing brief to Foundry. Artificer verifies candidate identity, version, digest, template lineage, upstream lineage, and the matching Pit result. Foundry may then grant production approval and assemble the Foundry Release Packet for Castellan. Production approval certifies completion of Foundry production only; it is not Persona admission.

## Non-Authority

Foundry must not:

- determine, add, remove, or reorder required professions
- treat Guildhall's determination as a completed Profession Specification
- author missing governance
- canonize traits
- impersonate a source human
- populate unsupported persona content
- alter the tagged Persona Template within a production case
- admit a Persona to Garrison
- produce an agent definition or platform-specific operative
- grant tools, credentials, mission authority, or deployment
- mutate an admitted Persona in place

## Artificer–Artisan boundary

```text
The Artificer governs, orchestrates, and performs the present cognitive assembly.
Runtime mechanisms perform deterministic work.
Artisans do not participate unless later necessity is explicitly established.
Pit tests the candidate.
Foundry production approval requires the exact passing Pit result.
Castellan alone decides Persona admission.
```

The Artificer must not construct Officers; that responsibility belongs to Smith. Smith must not govern Foundry persona production.

## Boundary Maxim

```text
Guildhall determines required professions and order.
Guildmaster admits the determination.
Castellan hands the admitted packet to Foundry.
Artificer creates and preserves the production queue.
Hagiography supplies evidence; it does not forge.
The tagged Persona Template defines required anatomy; it does not supply content.
Artificer assembles the Persona Candidate.
Pit failure returns to Artificer for correction and complete retest.
Pit success returns to Foundry for production approval.
Foundry releases the approved Persona package to Castellan.
```
