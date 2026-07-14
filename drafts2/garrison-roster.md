# Garrison Roster

## Status

Draft.

This file defines the provisional roster shape used by Conscription to search for existing admitted operatives before commissioning the Foundry.

It does not admit a database schema, registry implementation, runtime service, UI, automated matching engine, deployment system, or permanent identity model.

It is a manual cognitive surface for the next dry run.

---

## Purpose

The Garrison must be searchable before Conscription can obey the rule:

```text
Reuse before recruitment.
Recruit before building.
Build before deployment.
Test before admission.
```

Without a roster shape, Conscription cannot determine whether an existing operative may satisfy a mission need.

---

## Core Distinction

```text
Garrison = holds admitted operatives.
Garrison Roster = searchable record of what admitted operatives are available for consideration.
Conscription = searches the roster and decides whether to reuse, adapt, or commission.
```

The roster does not deploy operatives.

The roster does not decide mission suitability by itself.

The roster exposes enough information for Conscription to make or request a supply decision.

---

## Roster Entry Shape

A roster entry should capture only what is necessary to decide whether an operative might fit a mission need.

```text
Operative ID:
Operative name:
Status:
Primary capability:
Secondary capabilities:
Profession pattern:
Scope:
Non-scope:
Governance constraints:
Required inputs:
Expected outputs:
Tool requirements:
Access requirements:
Reporting obligations:
Escalation triggers:
Known failure modes:
Pit result:
Admission basis:
Last tested:
Deployment history:
Current availability:
Reuse notes:
Revision needs:
```

Do not fill every field as ceremony.

The minimum viable entry for search is:

```text
Operative name:
Status:
Primary capability:
Scope:
Non-scope:
Governance constraints:
Expected outputs:
Known failure modes:
Current availability:
```

---

## Status Values

A rostered operative may be marked:

```text
Candidate
Admitted For Test
Admitted
Restricted
Unavailable
Retired
Quarantined
```

### Candidate

The operative exists as a draft or candidate but has not survived enough testing for normal reuse.

### Admitted For Test

The operative may be used in dry runs or controlled tests, but not treated as generally deployment-ready.

### Admitted

The operative has survived enough review and testing to be considered for ordinary mission deployment preparation.

### Restricted

The operative may be considered only under special constraints.

### Unavailable

The operative exists but is not currently available for use.

### Retired

The operative should not be reused unless explicitly restored through later process.

### Quarantined

The operative is unsafe, compromised, obsolete, or under unresolved concern.

---

## Search Questions For Conscription

When Conscription searches the roster, it should ask:

```text
Is there an operative whose primary capability matches the mission need?
Is the operative's scope sufficient?
Does the operative's non-scope exclude the requested work?
Are the governance constraints compatible with the mission?
Are required tools and access available or obtainable?
Is the operative currently available?
Has the operative survived relevant Pit testing?
Are known failure modes acceptable for this mission?
Would adaptation suffice, or is new construction required?
```

A roster match is not deployment approval.

A roster match only means Conscription may recommend reuse, adaptation, or further testing.

---

## Conscription Decision Outcomes

After searching the roster, Conscription may decide:

```text
Reuse existing operative
Reuse with restrictions
Send existing operative to Pit before use
Send existing operative to Foundry for revision
Request Guildhall profession research
Commission new operative from Foundry
Decline supply for now
Request clarification from Castellan
```

---

## Example Entry

```text
Operative ID: operative.contract-review-analyst.001
Operative name: Contract Review Analyst Operative
Status: Admitted For Test
Primary capability: service contract review support
Secondary capabilities: risk issue identification, missing term identification, ambiguity detection, counsel question generation
Profession pattern: bounded contract review analyst
Scope: review service contracts for risk signals, missing terms, ambiguous obligations, and questions for human counsel
Non-scope: final legal advice, attorney-client representation, contract signing recommendation, external negotiation, unauthorized jurisdiction-specific legal conclusions
Governance constraints: legal-support only; escalate legal conclusions to human counsel; surface uncertainty; cite contract sections when available; do not invent terms
Required inputs: contract text, review priorities, business context, jurisdiction if available
Expected outputs: risk issue list, missing term list, ambiguity list, counsel question list, uncertainty notes
Tool requirements: contract text ingestion, citation-friendly report format
Access requirements: none by default
Reporting obligations: return review report, issue list, missing term list, counsel questions, uncertainty notes
Escalation triggers: request for legal conclusion, missing jurisdiction, incomplete contract, request to sign/reject, external communication request
Known failure modes: overstepping into legal advice; inventing absent terms; ignoring missing jurisdiction; treating business risk as legal invalidity
Pit result: preliminary pass in dry run; not live proven
Admission basis: Test Mission 001 draft stress test
Last tested: Test Mission 001
Deployment history: none
Current availability: available for dry run only
Reuse notes: must not be launched without Catapult deployment package and Inquisition mission context
Revision needs: live examples and stronger Pit cases needed before ordinary admission
```

---

## Non-Admissions

This draft does not admit:

- database registry
- search algorithm
- scoring system
- vector index
- matching engine
- deployment queue
- operative identity authority
- permanent admission standards
- disposition authority

---

## Failure Signals

Review or revise this roster shape if:

- it becomes a decorative inventory rather than a search surface
- it makes Garrison decide mission suitability by itself
- it lets Conscription skip Guildhall or Foundry without evidence
- it treats `Admitted For Test` as deployment-ready
- it stores too much ceremonial information
- it cannot explain why an operative was reused or rejected
- it cannot expose when new construction is actually necessary

---

## Batch Summary

Files changed:

- `drafts2/garrison-roster.md`

Assumptions introduced:

- Garrison search requires a minimal roster entry shape.
- Conscription can use roster fields to decide reuse, restriction, revision, or new construction.
- `Admitted For Test` is distinct from ordinary admission.

Behavior proven:

- Not yet proven.
- This draft creates a surface for the next dry run to test reuse before recruitment.

Risks remaining:

- Roster may become too schema-like too early.
- Status values may imply more admission process than currently exists.
- Matching criteria may need simplification after use.

Recommended next smallest step:

- Re-run the Conscription section of `test-mission-001.md` using the example roster entry and decide whether Conscription would reuse, restrict, revise, or commission anew.
