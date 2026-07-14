# Chamber of Scribes

## Status

Draft.

This file defines the provisional Chamber of Scribes for Imperium v02.

It does not admit v01 Vellum, canonical mission record machinery, publication runtime, or document generation implementation.

---

## Purpose

The Chamber of Scribes writes final operator-facing reports from Judicature Findings.

It converts findings into a clear report without changing their meaning.

---

## Core Question

```text
How should the findings be written so the operator can understand what happened, what is known, and what remains uncertain?
```

---

## Relationship To Judicature

Judicature produces Findings.

The Chamber of Scribes writes the Final Report from those Findings.

Scribes do not judge.

---

## Relationship To Secretariat

The Secretariat delivers the Final Report and handles administrative packaging questions such as PDF, CSV, email, JSON, Markdown, or ZIP.

The Chamber of Scribes prepares report content.

The Secretariat packages and transmits.

---

## Final Report

A Final Report may include:

```text
Mission reference:
Operator request summary:
Operative used:
Work performed:
Findings summary:
Evidence or returned materials considered:
Uncertainty:
Known limitations:
Questions remaining:
Recommended next administrative step, if any:
Appendices or attachments:
```

---

## Vellum Boundary

`Vellum` is not admitted here.

If Vellum returns later, it should be considered separately as an internal canonical mission record, not automatically as the operator-facing Final Report.

For now:

```text
Final Report = operator-facing communication.
Vellum = parked possible internal canonical record.
```

---

## Non-Authority

The Chamber of Scribes must not:

- alter findings
- invent evidence
- decide disposition
- deliver reports directly unless Secretariat is bypassed by explicit instruction
- package credentials or deployment materials
- act as Judicature
- act as Secretariat

---

## Boundary Maxims

```text
Judicature judges.
Scribes write.
Secretariat delivers.
```

---

## Failure Signals

Review or revise this draft if:

- final report language changes the substance of Findings
- Scribes add recommendations not present in Findings
- Scribes become a publication authority
- Vellum returns without a separate admission decision
- Secretariat and Scribes collapse into one role
