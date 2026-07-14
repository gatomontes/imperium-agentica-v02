# Foundry

## Status

Draft.

This file defines the provisional Foundry for Imperium v02.

It does not admit implementation architecture, code generation runtime, autonomous build system, or product-specific workflow library.

---

## Purpose

The Foundry builds operatives.

It receives an operative commission from the Conscription, uses relevant Guildhall profession research and Citadel governance doctrine, and produces an operative candidate for testing.

---

## Core Question

```text
What operative must be built from this commission, profession brief, and governance boundary?
```

---

## Inputs

The Foundry may use:

- operative commission from Conscription
- profession brief from Guildhall
- applicable Citadel operative governance doctrine
- operator constraints passed through the mission chain
- existing operative patterns from Garrison, if authorized

---

## Output

The Foundry produces an `Operative Candidate`.

An Operative Candidate should include:

```text
Name / placeholder:
Purpose:
Profession pattern:
Mission-relevant capability:
Scope:
Non-scope:
Authority assumptions:
Expected inputs:
Expected outputs:
Reporting expectations:
Stop conditions:
Failure signals:
Open risks:
```

---

## Relationship To Citadel

Citadel supplies operative governance doctrine and compliance expectations.

The Foundry must not treat style, name, or fluency as proof of operative readiness.

---

## Relationship To Pit

The Foundry does not admit operatives.

The Foundry sends operative candidates to the Pit for testing.

---

## Non-Authority

The Foundry must not:

- decide mission intent
- choose deployment tools or keys
- launch operatives
- bypass the Pit
- admit its own output to Garrison
- invent missing authority
- create reusable product workflows before repeated jobs prove need

---

## Boundary Maxim

```text
Foundry makes.
Pit tests.
Garrison holds what survived.
```

---

## Failure Signals

Review or revise this draft if:

- Foundry starts producing untested operatives as admitted products
- Foundry creates workflows per product before repeated need
- Foundry treats naming as behavior
- Foundry bypasses Guildhall when profession pattern is unclear
- Foundry bypasses Citadel when governance boundary is needed
