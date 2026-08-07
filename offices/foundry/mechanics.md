---
title: Foundry Mechanics
status: office-mechanics
scope: offices/foundry
inherits:
  - /imperium-doctrine.md
  - ./doctrine.md
---

# Foundry Mechanics

Mechanics expose Foundry capabilities; they do not grant authority. Each invocation requires an occupied Artificer Seat and the exact admitted trigger and inputs.

## `open-production-case`

- **Trigger:** authorized Castellan Foundry entry packet
- **Inputs:** entry packet, Work Specification, admitted Profession Determination Packet
- **Outputs:** identified production case and preserved profession queue
- **Failures:** unauthorized or incomplete packet; missing identity, order, version, or provenance
- **Performed by:** occupied Artificer Seat

## `commission-hagiography`

- **Trigger:** active profession queue item requiring evidentiary material
- **Inputs:** exact profession item and bounded research request
- **Outputs:** commission to Hagiography correlated to the production case
- **Failures:** undefined profession item; altered order; missing authority or correlation
- **Performed by:** occupied Artificer Seat

## `initialize-persona-candidate`

- **Trigger:** verified entry and authenticated Hagiography Research Packet
- **Inputs:** exact active Persona Template and all required fingerprints
- **Outputs:** identified, versioned in-progress Persona Candidate
- **Failures:** template mismatch; malformed tags; missing or unauthenticated inputs
- **Performed by:** occupied Artificer Seat

## `route-specialized-authorship`

- **Trigger:** in-progress candidate requiring an owned section
- **Inputs:** exact candidate and bounded authorship request
- **Outputs:** candidate routed to Sanctographer or Notary and returned with authenticated sections
- **Failures:** wrong author; altered non-owned sections; missing authentication or lineage
- **Performed by:** occupied Artificer Seat

## `assemble-persona-candidate`

- **Trigger:** required specialized sections returned
- **Inputs:** exact candidate, authenticated sections, admitted upstream artifacts
- **Outputs:** coherent successor candidate with preserved authorship and provenance
- **Failures:** unsupported content; unresolved contradiction; missing section; authority or lineage defect
- **Performed by:** occupied Artificer Seat

## `validate-and-dispatch-to-pit`

- **Trigger:** assembled candidate presented for examination
- **Inputs:** candidate, template identity, upstream fingerprints, authentication record
- **Outputs:** dispatched immutable Persona Candidate or bounded refusal
- **Failures:** incomplete schema; malformed tags; mismatched digest; broken provenance; unsupported content
- **Performed by:** occupied Artificer Seat

## `coordinate-pit-repair`

- **Trigger:** authenticated failing Pit Brief
- **Inputs:** exact failed candidate, findings, native repair owners, retest conditions
- **Outputs:** owned correction requests and new candidate version with `SUPERSEDES` lineage
- **Failures:** brief/candidate mismatch; unidentified repair owner; attempted in-place mutation
- **Performed by:** occupied Artificer Seat

## `approve-foundry-production`

- **Trigger:** authenticated passing Pit Brief
- **Inputs:** exact tested candidate, passing brief, all identity and lineage records
- **Outputs:** Foundry production-approval record
- **Failures:** any candidate, version, digest, template, provenance, or pass mismatch
- **Performed by:** occupied Artificer Seat

## `issue-foundry-release-packet`

- **Trigger:** valid Foundry production approval
- **Inputs:** approved Persona, matching Pit Brief, template and upstream fingerprints, revision lineage
- **Outputs:** immutable Foundry Release Packet to Castellan
- **Failures:** incomplete packet; identity mismatch; absent approval or authentication; wrong destination
- **Performed by:** occupied Artificer Seat
