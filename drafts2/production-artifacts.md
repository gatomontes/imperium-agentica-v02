# Production Artifacts

## Status

Draft.

This file names provisional artifacts that move between the drafts2 offices.

It does not admit schemas, templates, implementation objects, database records, UI forms, or final canonical terminology.

---

## Purpose

Imperium needs named handoff artifacts so offices do not silently exchange vague intent.

These artifacts are not permanent merely because they are named here.

They may be leaned, merged, renamed, split, or removed through use.

---

## Artifact Chain

```text
Petition
→ Mission Need
→ Operative Capability Request
→ Profession Brief
→ Operative Commission
→ Operative Candidate
→ Pit Findings
→ Garrison Record
→ Mission Inquest
→ Mission Dossier
→ Deployment Package
→ Return Package
→ Judicature Findings
→ Final Report
→ Delivery Package
```

This chain is provisional.

Not every mission needs every artifact.

---

## Petition

Operator intent shaped by Secretariat into a request that can enter mission formation.

See existing `drafts/petition-lifecycle.md` for earlier draft treatment.

---

## Mission Need

A Castellan-level expression of what mission is being formed and what operative capability is required.

It should not contain detailed deployment procedure.

---

## Operative Capability Request

A Castellan-to-Conscription handoff identifying needed operative capability.

It asks Conscription to supply, raise, or report absence of a suitable operative.

---

## Profession Brief

A Guildhall product describing the professional pattern relevant to an operative.

Possible fields:

```text
Profession / role pattern:
Domain:
Responsibilities:
Capabilities:
Tools:
Standards:
Failure modes:
Risks:
Implications for operative design:
```

---

## Operative Commission

A Conscription-to-Foundry handoff authorizing operative construction or revision.

Possible fields:

```text
Capability needed:
Reason existing Garrison operative is insufficient:
Profession brief reference:
Mission relevance:
Constraints:
Required operative outputs:
Governance expectations:
```

---

## Operative Candidate

A Foundry product sent to the Pit.

It is not admitted.

Possible fields:

```text
Purpose:
Profession pattern:
Scope:
Non-scope:
Expected inputs:
Expected outputs:
Reporting expectations:
Stop conditions:
Failure signals:
Risks:
```

---

## Pit Findings

A Pit product describing how an operative candidate survived or failed pressure.

Possible outcomes:

```text
Recommend admission
Recommend revision
Recommend rejection
Require retest
Insufficient evidence
```

Recommendation is not admission unless Garrison rules later make it so.

---

## Garrison Record

A record of an admitted operative available for future use.

Possible fields:

```text
Operative identity:
Capabilities:
Constraints:
Admission basis:
Test history:
Readiness status:
Revision history:
Availability:
```

---

## Mission Inquest

An Inquisition product investigating mission terrain for Catapult.

Possible fields:

```text
Mission question:
Terrain:
Known facts:
Unknowns:
Assumptions:
Constraints:
Risks:
Sources:
Operational implications:
Questions for operative:
Reporting implications:
```

---

## Mission Dossier

A Catapult product, informed by Inquisition, telling the operative what this mission requires.

Professional competence does not replace mission instruction.

Possible fields:

```text
Mission objective:
Context:
Assigned operative:
Expected outcome:
Scope:
Non-scope:
Rules of engagement:
Reporting requirements:
Escalation triggers:
Return expectations:
```

---

## Deployment Package

A Catapult product bundling mission instructions, operative assignment, tools, keys, and constraints.

Possible fields:

```text
Assigned operative:
Mission dossier:
Tools issued:
Keys / access issued:
Constraints:
Launch conditions:
Return channel:
```

---

## Return Package

A Lazaretto product preserving what returned from Theatre before evaluation.

Possible fields:

```text
Mission reference:
Operative reference:
Returned materials:
Claimed outcomes:
Evidence included:
Failures:
Uncertainty:
Missing returns:
Custody notes:
```

---

## Judicature Findings

A Judicature product evaluating returns without assigning disposition.

Possible fields:

```text
Findings summary:
Evidence considered:
Uncertainty:
Unsupported claims:
Suspected failure points:
Before/after comparison needed:
Reportable conclusion:
```

---

## Final Report

A Chamber of Scribes product written from Judicature Findings for operator understanding.

It is operator-facing.

It is not automatically Vellum.

---

## Delivery Package

A Secretariat product or handling bundle for delivery to the operator.

Possible formats:

```text
email body
PDF
CSV
JSON
Markdown
ZIP bundle
archive-only notice
```

The Secretariat may package and transmit.

It must not alter findings.

---

## Vellum Boundary

`Vellum` remains parked.

If admitted later, it may become an internal canonical mission record.

It should not be equated automatically with the Final Report.

---

## Failure Signals

Review or revise this file if:

- artifact names become bureaucracy before use
- every office invents its own document type
- Final Report and Vellum collapse without decision
- Delivery Package changes substantive findings
- Mission Dossier is written without Inquisition support
- Operative Commission bypasses Garrison search
