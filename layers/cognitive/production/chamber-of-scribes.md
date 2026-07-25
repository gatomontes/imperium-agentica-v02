# Chamber of Scribes

## Status

Admitted.

Baseline: `CB-CURRENT`.

Admission: `Production Admission Review 003`.

Evidence: `Constitutional Test Run 015 — 30 PASS / 0 FAIL`.

This file defines the provisional Chamber of Scribes for Imperium v02.

It does not admit v01 Vellum, canonical mission record machinery, publication runtime, or document generation implementation.

---

## Purpose

The Chamber of Scribes writes final operator-facing reports from the Mission Closure Record, final Curia Minute, and their cited evidence.

It converts terminal findings and disposition into a clear report without changing their meaning.

---

## Core Question

```text
How should the findings be written so the operator can understand what happened, what is known, and what remains uncertain?
```

---

## Relationship To Curia

Curia produces the Mission Closure Record and final Curia Minute.

The Chamber of Scribes writes the Final Report only after MISSION_CLOSED.

Scribes do not judge, close, release, or revise disposition.

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
Terminal disposition:
Completion-criteria assessment:
Findings summary:
Evidence or returned materials considered:
Uncertainty:
Known limitations:
Accepted unresolved matters:
Outstanding effects and obligations:
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
- decide or alter disposition
- declare closure
- release an operative
- deliver reports directly unless Secretariat is bypassed by explicit instruction
- package credentials or deployment materials
- act as Curia
- act as Secretariat

---

## Boundary Maxims

```text
The CEO closes.
Muster releases.
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
