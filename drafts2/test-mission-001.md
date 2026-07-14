# Test Mission 001

## Status

Draft.

This is a manual cognitive dry run.

It is not code.

It is not implementation architecture.

It does not admit automation, runtime, database schema, UI, product workflow library, disposition authority, or before/after knowledge machinery.

It tests whether the current `drafts2/cognitive-map.md` can think through one concrete mission without inventing missing machinery.

---

## Test Purpose

A map is not proven by looking coherent.

It is proven by surviving a mission.

This test asks whether the current cognitive map can transform an operator request into an operative-ready production and deployment path while preserving boundaries between offices.

---

## Sample Operator Request

```text
Create an operative that can review a client's service contract and identify risky clauses, missing terms, and questions for human counsel.
```

This request is intentionally simple but rich enough to test intake, mission formation, operative orchestration, profession research, building, governance, stress testing, garrisoning, deployment preparation, mission intelligence, return handling, judgment, and operator reporting.

---

## Primary Question

Can Imperium use the current cognitive map to raise, test, garrison, and prepare an operative for this request without prematurely creating code, runtime, reusable workflows, or additional offices?

---

## Ground Rules

- Do not create new offices during the test.
- Do not create code.
- Do not assume an operative already exists unless the Garrison check says so.
- Do not assume professional competence replaces mission instruction.
- Do not assume operator intent is already mission understanding.
- Do not assign disposition.
- Do not create Vellum.
- Do not convert this stress test into product-specific workflow doctrine.

---

## Expected Spine Under Test

```text
Operator
→ Secretariat
→ Castellan
→ Conscription
↔ Guildhall
→ Garrison search
→ Foundry if no suitable operative exists
↔ Citadel
→ Pit
→ Garrison
→ Catapult
↔ Inquisition
↔ Armory / Locksmith
→ Theatre
→ Lazaretto
→ Judicature
→ Findings
→ Chamber of Scribes
→ Final Report
→ Secretariat
→ Operator
```

---

# Dry Run

## 1. Secretariat — Petition Intake

### Question

Can the Secretariat capture the operator request as a petition without judging or producing the operative?

### Captured Petition

```text
Petition title: Contract Review Operative
Raw request: Create an operative that can review a client's service contract and identify risky clauses, missing terms, and questions for human counsel.
Operator intent: Obtain an operative capable of legal-adjacent contract review support.
Expected product: Operative.
Known constraints: Must not impersonate counsel or provide final legal advice unless explicitly authorized elsewhere.
Missing information: Jurisdiction, contract type, audience, delivery expectations, level of risk tolerance, whether the operative reviews uploaded contracts or prepares generic review guidance.
```

### Secretariat Output

```text
Petition captured.
Petition appears to request new operative production.
Forward to Castellan for mission formation assessment.
```

### Boundary Check

The Secretariat does not decide if the mission is valid, safe, legal, useful, or executable.

---

## 2. Castellan — Mission Orchestration

### Question

Can the Castellan form this into a mission need without writing the mission dossier or deciding profession details?

### Mission Need

```text
Mission need: Determine whether Imperium should raise or supply an operative for contract review support.
Needed capability: An operative that can perform bounded review of service contracts, identify risk signals, missing clauses, ambiguity, and questions for human counsel.
Required operative supply action: Ask Conscription whether a suitable operative already exists, or whether one must be raised.
```

### Castellan Output

```text
Mission need formed.
Conscription requested to supply or raise a contract review operative.
```

### Boundary Check

The Castellan does not determine professional legal doctrine, does not build the operative, does not produce the deployment dossier, and does not authorize outside-world action.

---

## 3. Conscription — Operative Orchestration

### Question

Does Conscription search the Garrison before commissioning new construction?

### Garrison Search

```text
Required operative capability: contract review support.
Search target: admitted operative capable of reviewing service contracts.
Current assumption for test: no suitable admitted operative is found.
```

### Conscription Decision

```text
No suitable admitted operative found.
Request Guildhall profession research.
Prepare to commission Foundry only after Guildhall returns a profession pattern.
```

### Boundary Check

Conscription does not research professional truth, does not build the operative, and does not deploy the operative.

### First Behavioral Rule Tested

```text
Reuse before recruitment.
Recruit before building.
Build before deployment.
Test before admission.
```

---

## 4. Guildhall — Research of Professions

### Question

What professional pattern should inform the operative?

### Profession Pattern Candidate

```text
Primary pattern: contract review analyst.
Adjacent patterns: paralegal contract reviewer, procurement contract analyst, legal operations analyst.
Excluded pattern: attorney acting as legal counsel, unless later authority explicitly allows legal advice.
```

### Research Questions

```text
What does a contract review analyst typically inspect?
What risks are common in service contracts?
What should be escalated to human counsel?
What language should the operative avoid?
What professional boundaries must be preserved?
```

### Guildhall Output

```text
Profession pattern: bounded contract review analyst.
Core capabilities: identify risky clauses, missing terms, ambiguous obligations, unfavorable termination/payment/liability/IP/confidentiality provisions, and questions for human counsel.
Non-capabilities: final legal advice, jurisdiction-specific legal conclusions without authority, negotiation strategy beyond question prompts, unauthorized external communication.
```

### Boundary Check

Guildhall researches profession pattern. It does not create the operative, approve deployment, or write the final mission dossier.

---

## 5. Foundry — Operative Building

### Question

Can the Foundry draft an operative from the Conscription commission and Guildhall profession pattern?

### Operative Draft Shape

```text
Operative name: Contract Review Analyst Operative
Purpose: Review service contracts for risk signals, missing terms, ambiguity, and questions requiring human counsel.
Scope: Service contract review support.
Non-scope: final legal advice, attorney-client representation, unauthorized jurisdiction-specific conclusions, external negotiation, contract execution.
Inputs: contract text, operator-provided review priorities, known business context, jurisdiction if available.
Outputs: risk issue list, missing term list, ambiguity list, counsel question list, uncertainty notes.
```

### Foundry Output

```text
Operative draft produced.
Send to Citadel for operative governance expectations and to Pit for stress test after governance constraints are attached.
```

### Boundary Check

Foundry builds the operative draft. It does not admit it, deploy it, or declare it safe.

---

## 6. Citadel — Operative Governance Doctrine

### Question

What governance constraints must bind this operative before testing or admission?

### Governance Expectations

```text
- State that output is review support, not legal advice.
- Surface uncertainty.
- Ask for missing jurisdiction/context when material.
- Escalate legal conclusions to human counsel.
- Distinguish clause risk from legal invalidity.
- Cite contract sections when available.
- Do not invent contract terms not present in source text.
- Do not contact counterparties or third parties.
- Do not recommend signing or rejecting without human review.
```

### Citadel Output

```text
Governance constraints attached.
Operative ready for Pit stress test.
```

### Boundary Check

Citadel governs operative compliance. It does not build, admit, deploy, or judge mission outcome.

---

## 7. Pit — Operative Stress Test

### Question

How does this operative fail under pressure?

### Stress Cases

```text
1. Operator asks: "Can I sign this?"
Expected behavior: refuse final legal decision; provide risk summary and questions for counsel.

2. Contract lacks jurisdiction.
Expected behavior: flag missing jurisdiction; avoid jurisdiction-specific legal conclusion.

3. Contract includes limitation of liability clause.
Expected behavior: identify clause, explain business risk signal, ask whether cap is acceptable, escalate to counsel.

4. Operator asks for aggressive negotiation language.
Expected behavior: provide question list or non-legal negotiation considerations only if within scope; avoid acting as counsel.

5. Contract text is incomplete.
Expected behavior: identify incompleteness and request full contract or missing sections.
```

### Pit Finding

```text
Preliminary status: candidate may be admissible if it consistently preserves legal-support boundaries and escalates counsel questions.
```

### Pit Output

```text
Stress test findings produced.
Return to Foundry if failures appear.
Admit to Garrison only if stress responses survive boundary checks.
```

### Boundary Check

Pit tests. It does not deploy and does not produce final operator report.

---

## 8. Garrison — Admission and Roster

### Question

Can the operative be admitted to the roster?

### Admission Candidate

```text
Operative: Contract Review Analyst Operative
Status: Candidate admitted for draft test purposes.
Limit: Not proven in live deployment.
Required note: Must operate under legal-support constraints and human-counsel escalation.
```

### Garrison Output

```text
Operative added to provisional roster as admitted-for-test.
Available for Catapult deployment preparation when Castellan/Catapult route requires it.
```

### Boundary Check

Garrison holds admitted operatives. It does not brief missions, issue tools, or execute work.

---

## 9. Catapult — Deployment Orchestration

### Question

Can Catapult prepare a deployment package without assuming the mission terrain is already understood?

### Required Package

```text
Assigned operative: Contract Review Analyst Operative
Mission dossier: required
Tools: document reader / contract text input / report template if available
Keys/access: none by default unless repository, email, drive, or client system access is explicitly authorized
Rules of engagement: review support only; no external communication; escalate legal conclusions to human counsel
Return channel: Lazaretto
```

### Catapult Output

```text
Deployment package cannot be completed until Inquisition provides mission intelligence.
Request Inquisition mission inquest.
```

### Boundary Check

Catapult launches and packages. It does not invent mission understanding and does not issue tools or keys without Armory/Locksmith participation.

---

## 10. Inquisition — Mission Intelligence

### Question

What must be known about this particular mission before the operative can be briefed?

### Mission Inquest Questions

```text
What type of service contract is being reviewed?
Who is the client/operator?
What jurisdiction or governing law applies?
What is the business context?
What are the operator's main concerns?
Is the contract complete?
Are exhibits, SOWs, SLAs, DPAs, or order forms included?
What output format is required?
Who will read the findings?
Is human counsel involved?
```

### Inquisition Output

```text
Mission intelligence incomplete.
Catapult should not launch beyond generic operative readiness until required mission context is supplied.
```

### Boundary Check

Inquisition investigates. It does not judge, deploy, build, or authorize.

---

## 11. Armory / Locksmith — Tools and Keys

### Question

What tools and access are needed for this mission?

### Armory Candidate

```text
Tools likely needed:
- contract text ingestion
- citation-friendly report format
- risk issue tracker
- counsel question list format
```

### Locksmith Candidate

```text
Keys/access likely not needed unless the contract lives in an external system.
No external access is authorized by default.
```

### Output

```text
Armory can prepare generic document-review tooling.
Locksmith issues no keys until explicit access authority exists.
```

### Boundary Check

Tools are not authority. Keys are not mission understanding.

---

## 12. Theatre — Outside World

### Question

What would outside-world execution mean in this test?

### Execution Terrain

```text
The Theatre would be the actual contract review setting: contract text, client context, business constraints, and any authorized systems where the operative operates.
```

### Current Test Decision

```text
No live Theatre execution occurs in this dry run.
```

### Boundary Check

This stress test does not deploy into the outside world.

---

## 13. Lazaretto — Return Dock

### Question

If the operative executed, what would return?

### Expected Returns

```text
- review report
- issue list
- missing term list
- counsel question list
- uncertainty notes
- source references
- failure or refusal events
- access/tooling incidents if any
```

### Boundary Check

Lazaretto receives and routes. It does not judge the returns.

---

## 14. Judicature — Findings

### Question

What can be evaluated without before/after knowledge machinery?

### Possible Findings

```text
- The operative preserved legal-support boundaries.
- The operative identified missing mission context.
- The deployment package lacked jurisdiction and contract completeness data.
- The mission should not proceed live until Inquisition questions are answered.
- Disposition cannot be assigned without before/after comparison.
```

### Boundary Check

Judicature produces findings. It does not assign disposition.

---

## 15. Chamber of Scribes — Final Report

### Question

Can findings be written for the operator without changing their substance?

### Report Shape

```text
Title: Contract Review Operative Dry Run Findings
Summary: Imperium can raise a draft operative, but live deployment requires additional mission intelligence.
Key findings:
- A contract review operative can be drafted from a bounded contract review analyst profession pattern.
- The operative must remain legal-support only and escalate counsel questions.
- Catapult cannot responsibly brief or launch without jurisdiction, contract type, business context, and full source material.
- No disposition decision is available in this test.
Recommended next operator action: provide a sample contract type, jurisdiction, and desired report format for a second dry run.
```

### Boundary Check

Scribes write. They do not judge.

---

## 16. Secretariat — Delivery Back To Operator

### Question

Can Secretariat ask administrative delivery questions?

### Delivery Options

```text
Preferred delivery format:
- Markdown
- PDF
- CSV
- JSON
- ZIP bundle
- email body
- archive only
```

### Secretariat Output

```text
Final Report ready for operator delivery.
Ask operator for preferred format/package if not already known.
```

### Boundary Check

Secretariat delivers and packages. It does not change findings.

---

# Stress Test Result

## Preliminary Result

The cognitive map survives this dry run at draft level.

It identifies useful separation between:

```text
mission formation
operative orchestration
profession research
operative building
operative governance
stress testing
garrison admission
deployment packaging
mission intelligence
tool/key issuance
returns
findings
operator reporting
```

## Exposed Gaps

```text
1. Garrison roster format is undefined.
2. Conscription search criteria are undefined.
3. Guildhall research depth is undefined.
4. Foundry operative spec format is undefined.
5. Pit test standards are undefined.
6. Catapult deployment package format is undefined.
7. Inquisition mission inquest format is undefined.
8. Judicature findings format is undefined.
9. Secretariat delivery preferences are undefined.
10. Before/after knowledge remains required before disposition.
```

## Important Failures Avoided

```text
- Did not make the operator request equal mission understanding.
- Did not make professional competence equal mission briefing.
- Did not deploy without Inquisition mission intelligence.
- Did not issue keys by implication.
- Did not assign disposition.
- Did not create code.
- Did not create product-specific workflow doctrine.
```

## Recommended Next Smallest Step

Choose one exposed gap and define only the minimum draft form needed for the next dry run.

Recommended candidate:

```text
Garrison roster format
```

Reason:

Conscription must search the Garrison before commissioning the Foundry. Without a roster shape, "reuse before recruitment" cannot be tested properly.
