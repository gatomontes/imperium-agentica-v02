# DR-024 — Foundry Resident Station Operatives

## Status

Recorded semantic decision. No implementation, Runtime activation, live persona production, deployment, or external effect is authorized.

## Decision

Foundry is an office whose forging process is organized into bounded functional stations, or chambers. Each station is occupied by a resident intelligent operative assigned to perform that station's work.

The Foundry Officer remains accountable for the complete forging process. The officer governs and authenticates the packet's passage through the stations; the officer is not itself the performer of every station function.

The governing model is:

```text
Foundry Officer
    ↓ governs and authenticates passage
Receiving operative
    ↓
Confluence operative
    ↓
Temperance operative
    ↓
Specification operative
    ↓
Provenance operative
    ↓
Dispatch operative
    ↓
Persona Specification Candidate → Pit
```

## Station boundary

A chamber defines a bounded Foundry function. Its resident operative performs the intelligent work assigned to that function. Deterministic Runtime mechanisms may perform mechanical work such as schema validation, formatting, versioning, and record linkage.

The stations are:

- **Receiving:** accepts and verifies the approved Foundry entry packet and the post-approval Studium doctrinal packet.
- **Confluence:** integrates profession, exemplar material, doctrine, traits, methods, duties, limits, and required persona characteristics.
- **Temperance:** identifies and resolves permitted conflicts, excesses, omissions, and tensions without weakening upstream authority.
- **Specification:** composes the coherent, testable Persona Specification Candidate.
- **Provenance:** preserves the lineage of consequential features, transformations, decisions, and unresolved tensions.
- **Dispatch:** verifies packet completeness and releases the candidate to Pit.

These stations are functional parts of Foundry, not separate offices or independent authorities.

## Authority and handoff

- Guildhall Committee approves the profession, exemplar selection, and candidate fit.
- Hagiography supplies evidenced transferable human-trait material.
- Studium applies Imperium doctrine after Committee approval and supplies the doctrinal packet.
- Foundry Officer governs the station sequence and authenticates the resulting candidate.
- Resident station operatives perform the bounded intelligent work.
- Pit independently stress-tests the candidate.
- Guildhall Committee determines admit, recycle, or discard.
- Garrison remains custodian of admitted persona specifications.

Foundry must return unresolved upstream defects to the responsible authority. It must not silently repair, weaken, or replace Guildhall, Hagiography, Studium, or Pit authority.

## Non-authority

This decision does not authorize Foundry to:

- determine the profession or exemplar fit;
- author Imperium doctrine;
- canonize human traits;
- admit its own output;
- create a platform-specific operative;
- grant tools, credentials, mission authority, or deployment permission;
- activate resident operatives in Runtime;
- perform live persona production.

## Boundary maxim

> The Foundry Officer governs the passage. Resident station operatives do the forging. Runtime mechanisms perform deterministic work. Pit tests the candidate. Guildhall admits, recycles, or discards.
