# Pit

## Status

Admitted cognitive persona stress-test boundary.

Baseline: `CB-CURRENT`.

Admission: `Production Admission Review 003`.

Evidence: `Constitutional Test Run 015 — 30 PASS / 0 FAIL`.

Pit is Imperium's adversarial qualification office. It independently tests the exact tagged Persona Candidate released by Foundry. It produces authenticated findings and a pass or fail examination result; it does not approve production, determine Persona admission, or hold the admitted Persona.

## Core Question

```text
Does this exact Persona Candidate preserve competence, governance,
evidence duties, and bounded traits under pressure?
```

## Independence

Pit examination must remain independent of Foundry authorship and Artificer authentication.

Artificer authentication establishes that the candidate is complete enough to leave Foundry. It is not evidence that the candidate will withstand Pit examination and is not Persona admission.

## Stations

Pit may be organized into bounded functional stations occupied by resident testing operatives:

- **Receiving:** verifies the exact candidate version, tagged-template conformance, lineage, and test inputs.
- **Contrarian:** attacks assumptions and searches for contradictions.
- **Boundary:** tests duties, prohibitions, authority, refusal, and scope limits.
- **Stress:** applies difficult, ambiguous, and adversarial scenarios.
- **Failure:** identifies unsafe behavior, drift, omissions, and collapse conditions.
- **Evidence:** records tests, results, artifacts, and uncertainty.
- **Briefing:** composes the versioned Pit Brief.

The Pit Officer governs the candidate's passage, preserves examination independence, and authenticates the brief. Resident testing operatives perform the bounded intelligent work. These role labels remain unchanged by this increment.

## Inputs

- exact tagged Persona Candidate identity, version, and SHA-256 digest
- exact Persona Template version and SHA-256 digest
- exact upstream artifact versions and provenance recorded by the candidate
- applicable Persona Governance Doctrine
- declared pressures and acceptance criteria

Pit must refuse examination when the candidate is incomplete, malformed, unauthenticated by Artificer, or not traceable to its exact template and upstream versions.

## Product

Pit produces a versioned Pit Brief containing:

- examination identity and version
- exact tested candidate, template, and upstream versions
- competence results
- governance, authority, refusal, and escalation results
- evidence and uncertainty results
- attribute and method behavior under pressure
- performative-mimicry, context-loss, conflict, and overextension findings
- failures, severity, and implicated native repair owner
- retest conditions
- examination result: `PASS` or `FAIL`
- Pit Officer authentication and exact provenance

A passing examination certifies only that the exact tested candidate satisfied the declared Pit examination. It is not Foundry production approval and is not Persona admission.

## Pit Brief Identity Contract

Every Pit Brief must bind, without ambiguity:

- `pit_brief_id`, immutable brief version, and brief SHA-256 digest
- `examination_id` and declared examination-suite version
- exact `persona_candidate_id`, candidate version, and candidate SHA-256 digest
- exact Persona Template version and SHA-256 digest
- exact upstream-artifact fingerprint set inherited from the candidate
- examination result: `PASS` or `FAIL`
- each finding, severity, evidence reference, native repair owner, and retest condition
- Pit Officer identity, authentication time, and authentication record digest

A Pit Brief is invalid if any required identity or digest is missing, if its result does not bind the exact tested candidate, or if a later artifact attempts to reuse it for another candidate version. A `PASS` brief may advance only with the exact tested candidate; a `FAIL` brief may initiate repair only for that exact candidate lineage.

## Failure Return and Retest

On `FAIL`, Pit returns the exact tested candidate and authenticated Pit Brief to Artificer. The brief must identify concrete defects, implicated native repair owners, and retest conditions.

Pit does not perform repairs. Artificer coordinates permitted correction through the responsible owner and assembles a new immutable Persona Candidate version. The successor must preserve `SUPERSEDES` lineage, receive a new digest, and undergo a complete new Pit examination.

Prior candidates, examinations, and findings remain immutable historical evidence. A failed candidate cannot advance through the success path.

## Success Return

On `PASS`, Pit returns the exact tested candidate and authenticated passing Pit Brief to Foundry.

Foundry must verify that the passing result belongs to the exact candidate it produced before granting production approval. Pit cannot grant that approval on Foundry's behalf.

## Native Repair Targets

Pit may identify native repair targets for:

- Foundry assembly defects
- Studium doctrine defects
- Hagiography research or evidence defects
- Guildhall profession-determination defects
- Castellan packet or Work Specification defects

Pit does not directly mutate or recycle the candidate or any upstream artifact.

## Non-Authority

Pit must not:

- edit or repair the artifacts it tests
- alter the Persona Template
- grant Foundry production approval
- admit, reject, or place a Persona in Garrison
- recruit or deploy an Operative
- treat fluency as proof
- hide governance failure behind task accuracy
- overwrite historical findings

## Boundary Maxim

```text
Artificer assembles and authenticates.
Pit attacks, records, and certifies examination only.
Failure returns to Artificer for correction and complete retest.
Success returns to Foundry for production approval.
Castellan admits.
Garrison holds the admitted Persona.
```
