# Foundry

## Status

Draft.

This file defines the provisional Foundry for Imperium v02.

It does not admit implementation architecture, code-generation runtime, autonomous build machinery, or deployment-medium-specific packaging.

---

## Purpose

The Foundry forges canonical persona specifications.

Forging is the elaboration, from scratch, of a persona specification capable of practicing a Guildhall-defined profession and inheriting its profession-specific, governable boundaries.

The Foundry does not build a mission-specific operative.

A forged persona is a portable, dormant asset that may later be packaged for a deployment medium and activated as an operative, or adapted into a platform-specific skill, prompt, agent template, evaluator, or other usable artifact.

---

## Core Question

```text
How must this profession and its governance doctrine be cognitively constituted as a concrete, testable persona?
```

---

## Inputs

The Foundry may use:

- approved work specification
- profession specification from Guildhall
- applicable Persona Governance Doctrine from Studium
- operator constraints preserved in the work specification
- relevant tested persona patterns, when reuse is authorized

---

## Responsibilities

The Foundry may elaborate:

- professional identity and cognitive posture
- domain competencies and knowledge requirements
- reasoning and decision methods
- evidentiary and epistemic behavior
- standard workflows
- communication and output contracts
- tool-use expectations
- self-verification behavior
- profession-specific scope, prohibitions, and escalation behavior inherited from the governing inputs
- testable acceptance criteria

The Foundry integrates governance doctrine into the persona.

It does not invent missing authority or independently author the doctrine it implements.

---

## Output

The Foundry produces a `Persona Specification Candidate`.

A Persona Specification Candidate may include:

```text
Persona identity:
Profession:
Purpose:
Cognitive posture:
Required competencies:
Required knowledge:
Reasoning methods:
Expected workflows:
Tool-use expectations:
Expected inputs:
Expected outputs:
Evidence duties:
Scope:
Non-scope:
Prohibited conduct:
Escalation behavior:
Self-verification:
Failure signals:
Acceptance criteria:
Open risks:
```

The candidate remains canonical and deployment-medium agnostic.

---

## Relationship To Studium

Foundry and Studium work iteratively.

Studium provides Persona Governance Doctrine.

Foundry may expose ambiguity, contradiction, or non-operable language while embodying that doctrine.

Studium may refine the doctrine in response.

Foundry must not weaken doctrine merely to make persona construction easier.

---

## Relationship To Pit

The Foundry sends Persona Specification Candidates to the Pit for testing.

Failed or weak candidates may return to Foundry and Studium with preserved findings for revision.

The Foundry does not admit its own output.

---

## Non-Authority

The Foundry must not:

- decide mission intent
- redefine the profession supplied by Guildhall
- invent missing authority
- package the persona for a deployment medium
- activate the persona as an operative
- choose deployment tools or credentials
- launch deployments
- bypass the Pit
- admit its own output to Garrison

---

## Boundary Maxim

```text
Guildhall specifies the profession.
Studium writes its governable doctrine.
Foundry forges the persona.
Pit tests the whole.
```

---

## Failure Signals

Review or revise this draft if:

- Foundry starts producing mission-bound operatives instead of canonical personas
- Foundry becomes a deployment-medium adapter
- Foundry treats naming, style, or fluency as professional competence
- Foundry bypasses Guildhall when the profession is unclear
- Foundry invents or silently weakens governable boundaries
- persona construction proves too trivial to justify a separate Foundry
