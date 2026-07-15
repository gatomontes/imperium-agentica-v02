# Test Mission 001 — Conscription Search Result Rerun

## Status

Draft.

This is a narrow rerun of `drafts2/test-mission-001.md` and `drafts2/test-mission-001-garrison-rerun.md`.

It tests whether `drafts2/conscription-search-result.md` gives Conscription enough structure to explain a Garrison search decision.

It is not code.

It does not admit runtime search, database schema, ranking algorithm, automated dispatch, deployment authority, or permanent roster implementation.

---

## Purpose

The previous rerun showed that Garrison can hold a searchable roster shape, but exposed a second gap:

```text
Conscription search result format
```

This rerun tests whether Conscription can now produce an explicit search result instead of jumping from search to commission.

---

## Test Mission Reference

Original operator request:

```text
Create an operative that can review a client's service contract and identify risky clauses, missing terms, and questions for human counsel.
```

Required operative capability:

```text
bounded service contract review support
```

Required constraints:

```text
legal-support only
no final legal advice
human counsel escalation required
no external communication
no jurisdiction-specific conclusions without authority
```

---

## Roster Entries Supplied For Rerun

This rerun assumes the following provisional Garrison entries are available for testing.

### Entry A

```text
Operative name: Contract Review Analyst Operative
Status: Admitted For Test
Primary capabilities:
- identify risky service contract clauses
- identify missing terms
- identify ambiguities
- produce questions for human counsel
Constraints:
- legal-support only
- no final legal advice
- no external communication
- must escalate legal conclusions to human counsel
Pit status: Passed draft stress cases; not live-proven
```

### Entry B

```text
Operative name: General Document Review Operative
Status: Admitted
Primary capabilities:
- summarize documents
- extract obligations
- identify missing sections
Constraints:
- not specialized for legal-support review
- no legal-risk classification unless revised
Pit status: Passed general document review stress cases only
```

---

## Conscription Search Result

```text
Search result id: CSR-TM001-001
Request source: Castellan
Mission need: Supply or raise an operative for bounded service contract review support.
Required capability: Review service contracts for risky clauses, missing terms, ambiguities, and questions for human counsel.
Required domain: Contract review analyst / legal-support review.
Required constraints: Legal-support only; no final legal advice; human counsel escalation; no external communication; no jurisdiction-specific conclusions without authority.
Garrison searched: Provisional Garrison roster supplied for Test Mission 001 rerun.
Roster entries considered:
- Contract Review Analyst Operative
- General Document Review Operative
Candidate matches:
- Contract Review Analyst Operative: strongest available match; aligned to required capability and constraints; status is Admitted For Test, not fully live-proven.
Restricted candidates:
- General Document Review Operative: broad document review match, but lacks legal-support specialization and would require Foundry revision or Pit retest before use.
Rejected candidates:
- None fully rejected; General Document Review Operative is insufficient for immediate reuse but may be revisable.
Missing information:
- Whether live deployment is requested or only operative production readiness.
- Whether jurisdiction-specific analysis will be requested.
- Whether operator has human counsel involved.
Search confidence: Medium.
Conscription decision: Send existing operative to Pit before use.
Decision reason: A near-fit exists, but its status is Admitted For Test and the mission pressure involves legal-support boundaries. Reuse may be possible only after targeted Pit retest.
Recommended next action: Pit retest Contract Review Analyst Operative against current contract-review mission pressure before Catapult deployment preparation.
Escalation needed: No, unless the mission requires jurisdiction-specific legal conclusions or external communication.
```

---

## Decision Check

### Did Conscription search before commissioning Foundry?

Yes.

No new operative was commissioned immediately.

### Did Conscription treat name match as capability match?

No.

The matching candidate was checked against:

```text
capability fit
scope fit
domain fit
governance fit
status fit
restriction fit
proof fit
mission need fit
```

### Did Conscription distinguish reuse from deployment?

Yes.

The decision is not deployment.

The decision is:

```text
Send existing operative to Pit before use.
```

### Did Conscription preserve Foundry boundary?

Yes.

Foundry is not invoked unless the rostered candidates fail or require revision.

### Did Conscription preserve Pit boundary?

Yes.

The candidate is not treated as deployable merely because it exists.

---

## Result

The Conscription search result format survives this narrow rerun.

It gives Conscription a stable way to explain why an existing operative should be reused, restricted, retested, revised, or replaced.

---

## New Exposed Gap

```text
Pit retest format for existing operative reuse
```

The map now needs a minimal way for Pit to retest an already-rostered operative against a specific mission pressure without rebuilding the entire operative.

---

## Recommended Next Smallest Step

Define:

```text
drafts2/pit-retest.md
```

Purpose:

```text
Give Pit a minimal format for testing an existing Garrison operative against a specific mission pressure before Conscription allows reuse.
```

---

## Anti-Collapse Line

```text
Existing does not mean ready.
Ready does not mean deployed.
Reuse must survive pressure.
```