# Test Mission 001 — Garrison Rerun

## Status

Draft.

This is a narrow rerun of `drafts2/test-mission-001.md` using the newly drafted `drafts2/garrison-roster.md`.

It is not code.

It is not implementation architecture.

It does not admit runtime, database schema, search engine, registry service, UI, deployment authority, or permanent roster machinery.

---

## Purpose

The first dry run exposed this gap:

```text
Garrison roster format is undefined.
```

That gap prevented a real test of the Conscription rule:

```text
Reuse before recruitment.
```

This rerun asks whether Conscription can search a minimally shaped Garrison roster before commissioning the Foundry.

---

## Mission Need Under Test

```text
Create an operative that can review a client's service contract and identify risky clauses, missing terms, and questions for human counsel.
```

Required capability:

```text
bounded contract review support
```

---

## Roster Entries Under Test

These entries are fictional test fixtures.

They do not admit real operatives.

### Entry A

```text
Roster ID: OP-0001
Operative name: General Document Summarizer
Profession pattern: document analyst
Status: Admitted For Test
Primary capabilities:
- summarize documents
- extract key points
- identify missing pages or incomplete sections
Boundaries:
- does not provide legal review
- does not classify contract risk
- does not generate counsel questions
Evidence of admission:
- passed generic summarization stress test
Restrictions:
- no legal-adjacent deployment
Last known failure:
- treats legal language as generic prose
```

### Entry B

```text
Roster ID: OP-0002
Operative name: Compliance Checklist Assistant
Profession pattern: compliance assistant
Status: Restricted
Primary capabilities:
- compare text against supplied checklist
- mark checklist items present or absent
- surface missing evidence
Boundaries:
- cannot infer unstated legal obligations
- requires externally supplied checklist
- does not create review framework from scratch
Evidence of admission:
- passed checklist-following stress test
Restrictions:
- may operate only when checklist is supplied
Last known failure:
- overstates compliance status when checklist is incomplete
```

### Entry C

```text
Roster ID: OP-0003
Operative name: Contract Review Analyst Operative
Profession pattern: bounded contract review analyst
Status: Candidate
Primary capabilities:
- identify risky clauses
- identify missing terms
- identify ambiguous obligations
- produce questions for human counsel
Boundaries:
- no final legal advice
- no attorney-client representation
- no jurisdiction-specific conclusion without supplied authority
- no external communication
Evidence of admission:
- none yet
Restrictions:
- must pass Citadel and Pit before Garrison admission
Last known failure:
- untested
```

---

## Conscription Search

### Query

```text
Need: operative for bounded service contract review support.
Required outputs:
- risky clause list
- missing term list
- ambiguity list
- counsel question list
Required boundaries:
- legal-support only
- no final legal advice
- escalate to human counsel
```

### Search Result

```text
Entry A: Not suitable.
Reason: Can summarize documents, but lacks contract-risk capability and has explicit legal-adjacent restriction.

Entry B: Partially related but not sufficient.
Reason: Can compare against supplied checklist, but cannot create review framework from contract review pattern and requires external checklist.

Entry C: Capability match but not admitted.
Reason: Candidate status; must pass Citadel and Pit before use.
```

---

## Conscription Decision

```text
No admitted operative fully satisfies the mission need.

Do not deploy Entry A.
Do not deploy Entry B as primary operative.
Do not treat Entry C as available merely because its name matches the need.

Recommended action:
Send Entry C through Foundry completion, Citadel governance constraint attachment, and Pit stress testing.

Fallback:
Entry B may be noted as possible supporting tool only if a checklist is later supplied, but it is not the requested operative.
```

---

## Rule Tested

```text
Reuse before recruitment: tested.
```

Result:

```text
Reuse was attempted before commissioning new construction.
No existing admitted operative satisfied the request.
Candidate reuse requires admission first.
```

---

## Important Boundary Preserved

```text
Name match is not capability match.
Capability match is not admission.
Admission is not deployment authority.
```

---

## New Findings

1. The roster shape is sufficient for a first Conscription search.
2. Status matters as much as capability.
3. Restrictions must be searched, not merely names and capabilities.
4. Candidate operatives cannot be treated as available Garrison supply.
5. Partially related operatives may become supporting resources, but not by implication.
6. Conscription needs a search result shape, not just a roster entry shape.

---

## Newly Exposed Gap

```text
Conscription search result format
```

Without a search result format, Conscription decisions risk becoming prose impressions instead of reviewable routing outputs.

---

## Recommended Next Smallest Step

Define `drafts2/conscription-search-result.md`.

It should remain minimal.

It should answer:

```text
What was requested?
Which roster entries were considered?
Why were they accepted, restricted, rejected, or deferred?
What action should happen next?
What evidence supports the decision?
```

---

## Non-Admissions

This rerun does not admit:

- executable roster search
- database-backed Garrison
- scoring algorithm
- semantic search engine
- operative registry service
- automatic deployment
- live legal-review operative
- final roster schema
