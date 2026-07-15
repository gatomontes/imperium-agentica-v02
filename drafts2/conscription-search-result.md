# Conscription Search Result

## Status

Draft.

This file defines the minimum draft output shape for a Conscription search of the Garrison.

It is not code.

It does not admit runtime search, database schema, ranking algorithm, automated dispatch, deployment authority, or permanent roster implementation.

---

## Purpose

Conscription must search the Garrison before commissioning Foundry.

A search is not useful unless its result can explain:

```text
what was requested
what was searched
what was considered
what matched
what failed
what remains uncertain
what Conscription recommends next
```

Without this output shape, reuse before recruitment cannot be tested.

---

## Core Rule

```text
Search before commission.
Explain before recommendation.
Recommendation before build.
```

---

## Minimal Search Result Shape

```text
Search result id:
Request source:
Mission need:
Required capability:
Required domain:
Required constraints:
Garrison searched:
Roster entries considered:
Candidate matches:
Rejected candidates:
Restricted candidates:
Missing information:
Search confidence:
Conscription decision:
Decision reason:
Recommended next action:
Escalation needed:
```

Use only fields needed for the case.

This is a reasoning artifact, not a database schema.

---

## Field Meanings

### Search result id

A temporary identifier for the search result.

Example:

```text
CSR-001
```

This does not admit permanent ID machinery.

### Request source

Where the operative supply request came from.

Examples:

```text
Castellan
Catapult
Operator via Secretariat
```

### Mission need

The mission-level reason an operative is being sought.

### Required capability

What the operative must be able to do.

### Required domain

The subject area or profession pattern involved.

### Required constraints

Boundaries that affect whether a rostered operative can be reused.

Examples:

```text
legal-support only
no external communication
human counsel escalation required
no jurisdiction-specific conclusions without authority
```

### Garrison searched

Which roster surface was checked.

At draft level this may be simple:

```text
drafts2/garrison-roster.md provisional roster
```

### Roster entries considered

Entries reviewed during search.

### Candidate matches

Entries that appear capable enough to reuse or adapt.

### Rejected candidates

Entries that failed the search and why.

### Restricted candidates

Entries that may be usable only with extra constraints, Pit retest, Foundry revision, or missing information resolved.

### Missing information

Information needed before deciding reuse, revision, or new build.

### Search confidence

A plain-language confidence mark.

Suggested values:

```text
High
Medium
Low
Blocked
```

### Conscription decision

One of the allowed search outcomes.

Suggested values:

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

### Decision reason

Why that decision follows from the search.

### Recommended next action

The smallest next action Conscription asks for.

### Escalation needed

Whether missing authority, missing context, or conflicting constraints require escalation.

---

## Match Evaluation

A candidate should not be marked as a match merely because its name sounds right.

A candidate must be evaluated against:

```text
capability fit
scope fit
domain fit
governance fit
status fit
restriction fit
staleness / proof fit
mission need fit
```

---

## Decision Discipline

### Reuse Existing Operative

Use only when the operative is admitted, available, sufficiently current, and fits the mission without material revision.

### Reuse With Restrictions

Use when the operative can satisfy the need only under explicit constraints.

### Send Existing Operative To Pit Before Use

Use when the operative seems suitable but needs stress testing for the current mission pressure.

### Send Existing Operative To Foundry For Revision

Use when the operative is close but must be modified before it can be reused.

### Request Guildhall Profession Research

Use when the required profession pattern is unclear or insufficiently defined.

### Commission New Operative From Foundry

Use when no rostered operative can satisfy the need and the profession pattern is sufficient to build from.

### Decline Supply For Now

Use when supply would violate constraints or required authority is absent.

### Request Clarification From Castellan

Use when the mission need is too ambiguous to decide operative supply.

---

## Example Search Result

```text
Search result id: CSR-001
Request source: Castellan
Mission need: Supply or raise an operative for bounded service contract review support.
Required capability: Review service contracts for risky clauses, missing terms, ambiguity, and questions for human counsel.
Required domain: Contract review analyst / legal-support review.
Required constraints: Legal-support only; no final legal advice; human counsel escalation; no external communication; no jurisdiction-specific conclusions without authority.
Garrison searched: Provisional Garrison roster.
Roster entries considered:
- Contract Review Analyst Operative
- General Document Review Operative
Candidate matches:
- Contract Review Analyst Operative: possible match, but only if admitted and governance constraints are current.
Restricted candidates:
- General Document Review Operative: too broad; requires Foundry revision or Pit retest for legal-support boundary.
Rejected candidates:
- None.
Missing information: Whether Contract Review Analyst Operative is admitted, current, and tested against legal-support constraints.
Search confidence: Medium.
Conscription decision: Send existing operative to Pit before use.
Decision reason: Candidate appears aligned but legal-support boundary requires stress test before reuse.
Recommended next action: Pit retest candidate against contract-review pressure cases.
Escalation needed: No, unless jurisdiction-specific legal conclusions are requested.
```

---

## Non-Authority

Conscription search result does not:

```text
admit an operative
revise an operative
build a new operative
deploy an operative
issue tools
issue keys
write a mission dossier
judge mission outcome
assign disposition
```

It only explains the operative supply decision path.

---

## Failure Signals

```text
Search result treats name match as enough.
Search result hides rejected candidates.
Search result commissions Foundry without explaining why reuse failed.
Search result recommends deployment instead of operative supply action.
Search result bypasses Pit when boundary pressure is material.
Search result invents roster entries not present or explicitly supplied.
Search result becomes a database schema prematurely.
```

---

## Maxim

```text
The Conscription does not merely choose.
It shows why reuse failed or why reuse survives.
```