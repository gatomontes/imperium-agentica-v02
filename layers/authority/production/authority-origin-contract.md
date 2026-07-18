# Authority-Origin Contract

## Status

Admitted Authority production contract.

Baseline: `AB-001`.

Admission: `Authority Production Admission Review 001`.

Evidence:

- `Authority–Provenance Convergence Run 004 — PASS`
- `Cognitive Constitutional Run 016 — 31 PASS / 0 FAIL`

Origin draft: `layers/authority/drafts/authority-origin-contract.md`.

## Core Invariant

```text
Imperium does not manufacture authority.

Authority enters Imperium from a represented Principal
whose authority basis exists independently of Imperium.
```

## Represented Principal

The external person, organization, office, legal role, or other authority represented to Imperium as competent to grant a bounded permission.

Imperium does not create the Principal.

## Authority Basis

The external or previously admitted basis on which the Principal may issue the grant.

The basis must be referenced and independently traceable.

A grant cannot serve as its own Authority Basis.

## Authority Grant

A versioned representation of permission from one Principal to one bounded grantee or acting surface.

Minimum semantic content:

```text
Grant identity and version
Principal identity
Authority Basis reference
Grantee identity or qualified role
Permitted action or decision domain
Object and mission scope
Effective interval
Conditions and required counsel
Prohibited actions
Delegation permitted or prohibited
Authority-loss safe-state instruction when applicable
Suspension, contest, withdrawal, expiry, and supersession
Parent grant when derived
Status
Required provenance finding
```

This is not a runtime permission object or storage schema.

## Derived Grant

A derived grant exists only when the parent explicitly permits delegation.

```text
derived scope ⊆ parent scope
derived duration ≤ parent duration
derived delegation ≤ parent delegation
derived authority never survives parent invalidation
```

A derived grant may narrow authority.

It cannot enlarge or repair it.

## Authority Findings

```text
AUTHORITY_EFFECTIVE
AUTHORITY_UNAVAILABLE
AUTHORITY_CONTESTED
AUTHORITY_EXPIRED
AUTHORITY_WITHDRAWN
AUTHORITY_SUPERSEDED
AUTHORITY_SCOPE_MISMATCH
AUTHORITY_ROOT_UNRESOLVED
AUTHORITY_DELEGATION_EXCEEDED
```

These are semantic findings, not runtime states.

Only `AUTHORITY_EFFECTIVE` for the exact action and scope supports a new authorized action.

## Grant Profile Model

The tested profile model is defined in:

```text
authority-grant-profiles.md
```

Current profiles:

```text
INTERNAL_ADMISSION
INTERNAL_PLACEMENT
MISSION_ENVELOPE
EXECUTIVE_DECISION
CAPABILITY_TOOL
CAPABILITY_ACCESS
```

Executive Mandate, Tool Grant, and Access Grant remain specialized native authority artifacts.

Standing and session assignments remain placement or participation contracts rather than substantive grants.

Launch, closure, and release remain explicit Mission Envelope actions or authorized consequences. They do not require separate root grant profiles.

## Provenance Boundary

Every Principal, Authority Basis, grant, derivation, and authority finding requires provenance.

```text
traceable grant ≠ valid grant
valid grant ≠ traceable grant
```

This contract consumes the applicable provenance finding.

It does not define provenance.

## Unresolved Questions

- Is direct operator authority sufficient for the first admitted root case?
- What specialized grant authorizes persona and Officer admission?
- What authorizes Standing Curia Assignment issuance?
- Does initial mission formation require a distinct Mission Authority Grant?
- Is launch authority separate from mission authority in every deployment medium?
- Which authority may revise the shared grant grammar?

## Non-Admissions

This draft does not admit:

- Praetorium or another sovereign institution
- universal delegation
- autonomous authority
- external-action authority
- runtime ACLs or permission services
- databases, schemas, APIs, or enforcement machinery
- authority derived from competence, assignment, capability, custody, evidence, or provenance alone

## Required Next Evidence

- independent authority contract tests
- provenance-missing and provenance-contested convergence cases
- specialized-grant non-collapse tests
- direct-operator root case
- represented-third-party Principal case
- authority-loss and safe-state cases
- exact relationship to artifact identity and version contracts
