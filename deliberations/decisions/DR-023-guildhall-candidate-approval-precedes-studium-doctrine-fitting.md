# DR-023 — Guildhall Candidate Approval Precedes Studium Doctrine Fitting

## Status

Active semantic sequencing decision.

## Decision

The Guildhall Committee must approve the complete Foundry candidate before Studium applies Imperium doctrine to it.

The sequence is:

```text
Guildhall Committee
  → profession and exemplar-fit determination
  → Hagiography evidence and exemplar material
  → complete Foundry candidate
  → Guildhall Committee approval
  → Studium doctrinal fitting
  → Foundry Persona Specification
  → Pit stress-test
  → Guildhall Committee disposition
```

## Responsibilities

- **Guildhall Committee** determines the required profession, selects or approves the exemplary human model(s), and determines candidate fit.
- **Hagiography** researches approved exemplar material and supplies evidence-grounded traits and methods.
- **Foundry candidate** is the complete upstream persona candidate packet assembled from the Guildhall determination and Hagiography material.
- **Studium** does not determine professional or exemplar fit. After Committee approval, Studium supplies and applies Imperium doctrine: boundaries, duties, prohibitions, constraints, tempering, and refusal conditions required of the persona.
- **Foundry** integrates the approved candidate and Studium's doctrinal packet into the complete, testable Persona Specification.
- **Pit** stress-tests the resulting Persona Specification.
- **Guildhall Committee** later determines whether the tested persona is admitted, recycled to Foundry, or discarded, as established by DR-022.

## Boundary

Studium's participation before Guildhall approval is not part of this sequence. Doctrine is not applied to an unapproved candidate. This ordering separates candidate selection from doctrinal fitting and preserves the Committee's authority over professional and exemplar fit.

This is a semantic decision only. It does not authorize live research, persona production, implementation, Runtime action, deployment, or external effect.
