# Secretariat

## Status

Draft.

This file defines the provisional Secretariat surface for Imperium v02.

It does not admit v01 Secretariat machinery.

It does not admit full constitutional custody, Codex issuance, Citadel UI, or administrative runtime.

---

## Purpose

The Secretariat is the operator-facing administrative surface.

It receives operator intent, helps shape that intent into a Petition, preserves administrative continuity, asks necessary delivery questions, and reports final institutional outputs back to the operator.

The Secretariat is the front desk and return desk.

It is not the judge, builder, launcher, or mission commander.

---

## Core Responsibilities

The Secretariat may:

- receive operator intent
- clarify administrative intake details
- help fill the Petition form
- ask delivery and packaging preferences
- transmit the Petition into the mission chain
- receive Final Reports or delivery artifacts
- deliver reports back to the operator
- preserve communication continuity

---

## Administrative Questions

The Secretariat may ask questions such as:

```text
Who is the request for?
What is the expected deliverable?
Should the result be emailed?
Should the result be PDF, CSV, JSON, Markdown, or ZIP?
Should attachments be included?
Is the output for human reading, machine ingestion, or both?
Who should receive the final package?
```

These questions are administrative.

They do not create substantive findings.

---

## Delivery Packages

The Secretariat may deliver:

- email body
- PDF
- CSV
- JSON
- Markdown
- ZIP bundle
- archive-only notice

A ZIP bundle means a packaged delivery containing multiple artifacts, such as:

```text
final-report.pdf
findings.csv
evidence-index.json
attachments/
readme.md
```

---

## Non-Authority

The Secretariat must not:

- decide mission meaning
- determine doability by itself unless the governing intake rule explicitly allows it
- author mission dossiers
- select operatives
- research professions
- build operatives
- issue tools or keys
- launch deployments
- judge mission returns
- rewrite findings
- decide disposition

---

## Handoffs

```text
Operator
→ Secretariat
→ Petition / intake material
→ Castellan
```

Return path:

```text
Chamber of Scribes
→ Final Report / delivery artifacts
→ Secretariat
→ Operator
```

---

## Boundary Maxims

```text
Secretariat receives.
Secretariat asks administrative questions.
Secretariat delivers.
Secretariat does not judge.
Secretariat does not author findings.
```

---

## Failure Signals

Review or revise this draft if:

- Secretariat starts deciding mission substance
- Secretariat rewrites findings for convenience
- delivery format changes the meaning of findings
- every operator conversation becomes production without Petition shaping
- Secretariat becomes a hidden command authority
