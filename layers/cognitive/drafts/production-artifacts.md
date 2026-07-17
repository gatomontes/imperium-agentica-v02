# Production Artifacts

## Status

Draft.

This file names provisional artifacts that move between Imperium v02 cognitive entities.

It does not admit schemas, implementation objects, database records, UI forms, runtime behavior, or final terminology.

---

## Artifact Chain

```text
Petition
→ Mission Need
→ Work Specification
→ Profession Specification
→ Persona Governance Doctrine
→ Human-Trait Canon when applicable
→ Persona Specification Candidate
→ Pit Findings
→ Garrison Record
→ Operative
→ Mission Inquest
→ Mission Dossier
→ Tool Grant
→ Access Grant
→ Deployment Package
→ Theatre Return
→ Return Package
→ Curia Findings
→ Final Report
→ Delivery Package
```

The chain may branch, iterate, or stop.

Not every mission requires every optional artifact, but omitted decisions must be explicit.

---

## Petition

Secretariat-shaped operator intent entering mission formation.

## Mission Need

Castellan's expression of the mission being formed.

## Work Specification

Castellan's approved specification of the work required.

It does not decide the profession or deployment procedure.

## Profession Specification

Guildhall's specification of the profession capable of legitimate practice.

## Persona Governance Doctrine

Studium's explicit governable obligations for a persona practicing the profession.

## Human-Trait Canon

Hagiography's evidenced, bounded, transferable traits derived from Saints.

A finding that no distinct canon is required must be explicit.

## Persona Specification Candidate

Foundry's canonical, deployment-medium-agnostic persona candidate.

It is not an operative.

## Pit Findings

Evidence of how the integrated persona survived or failed pressure, with revision or admission recommendation.

Recommendation is not admission.

## Garrison Record

The admitted canonical persona record with exact profession, doctrine, canon, Pit, restriction, and version references.

## Operative

Conscription's deployment-medium-specific embodiment of an admitted canonical persona.

An operative is not mission-bound and may be handed to the operator without deployment.

## Mission Inquest

Inquisition's evidence about mission terrain, facts, unknowns, constraints, risks, and operational implications.

## Mission Dossier

Muster's mission-specific instructions, informed by Castellan work and Inquisition evidence.

Professional competence does not replace mission instruction.

## Tool Grant

Armory's authorized tools, usage conditions, denials, and risk constraints for the mission.

## Access Grant

Locksmith's authorized credentials, permissions, expiration, revocation, and denial conditions.

## Deployment Package

Muster's mission-bound assembly.

Possible fields:

```text
Deployment Package identity:
Mission reference:
Work Specification reference:
Operative identity and version:
Canonical Persona reference:
Mission Inquest reference:
Mission Dossier:
Tools issued:
Access issued:
Rules of engagement:
Mission-specific constraints:
Reporting requirements:
Escalation triggers:
Return channel:
Launch conditions:
Termination conditions:
Unresolved blockers:
Assembly status:
```

Possible assembly states:

```text
Assembly Pending
Blocked
Ready For Launch
Superseded
Cancelled
```

Ready For Launch is not launch. Iron Gate performs the launch transition.

Ready For Launch packages pass outward through La Cortine's Iron Gate.

## Theatre Return

Raw mission output or consequence exposed by Theatre.

## Return Package

Lazaretto's preserved return before judgment.

## Curia Findings

Curia's evaluation of returns without disposition.

## Final Report

Chamber of Scribes' operator-facing report written from Curia Findings.

It is not automatically Vellum.

## Delivery Package

Secretariat's administrative delivery bundle.

It must not alter substantive findings.

---

## Traceability

Every artifact preserves exact upstream version references.

Existing operatives remain bound to the canonical persona, doctrine, and canon versions from which they were recruited.

A revised persona requires a new Conscription event.

A revised mission assembly requires a new Deployment Package version.

Historical artifacts are superseded, not overwritten.

---

## Failure Signals

Review or revise this file if:

- artifact names become bureaucracy before use
- mission assembly begins before an operative exists
- Muster alters the persona or operative
- La Cortine acquires acting authority
- Iron Gate handles continuing support
- Barbican carries credentials or receives completed missions
- Lazaretto handles continuing requests
- Ready For Launch is mistaken for launch
- Mission Dossier is written without Inquisition evidence
- tools or access lack authorization provenance
- Final Report and Vellum collapse without decision
- Delivery Package changes findings

## Terminal Mission Artifacts

### Terminal Field Packet

Theatre's final correlated return. It is a completion claim and cessation report, not closure authority.

### Mission Closure Record

The CEO-authorized terminal assessment, disposition, unresolved obligations, authority basis, and release authorization.

### Operative Release Record

Muster's record that the mission binding, scoped tools, and scoped access have been ended or explicitly left unresolved after MISSION_CLOSED.

```text
Terminal Field Packet ≠ Mission Closure Record
Mission Closure Record ≠ Operative Release Record
Operative Release Record ≠ reuse authority
```

---

