# Office Doctrine Profile Contract v1

## Status

`ADMITTED` by DR-073 against Core Imperium Doctrine v2.

## Purpose

An Office Doctrine Profile is the exact, versioned application of Core Doctrine
to one Office's bounded jurisdiction. It is neither new Core Doctrine nor an
implementation configuration pretending to be doctrine.

## Constitutional sequence

```text
Enacted Core Doctrine
→ competent Office steward drafts complete application
→ Tribunalis judges conformance
→ doctrine-assigned Senator admits accepted response
→ Office implementation may later seek conformance admission
```

The Office steward cannot approve its own profile. Tribunalis judges but does
not admit. The Senator evaluates and admits the conformance response but does
not author the Office's application or rewrite native artifacts.

## Required profile content

```text
Office identity
Arena
Title and purpose
Exact Core Doctrine identity/version
Exact current-doctrine pointer
Doctrine-assigned Senator identity
Profile issuer authority
One application for every exact Core provision
Applicability and application rule
Verification method
Evidence requirements
Invalidation conditions
Domain-standard references
Prohibited interpretations
Profile revision conditions
State and admission lineage
```

Omission or duplication of a Core provision is refused. An Office may narrow
behavior, add domain requirements, and state exact prohibitions. It may not
redefine, weaken, waive, contradict, or manufacture exceptions to Core
Doctrine.

An immutable historical doctrine envelope may still contain its original local
`CURRENT` status. The contract therefore requires an exact external current-
doctrine pointer and refuses any envelope whose `identity@version` differs.

## Non-applicability

`NOT_APPLICABLE` is not a blank field or convenience switch. It requires:

- cited governing rule;
- competent determination authority;
- evidence;
- exact scope;
- expiry when applicable; and
- revision conditions.

An `APPLIES` determination may not carry a hidden non-applicability basis.

## Judgment and admission

Tribunalis judgment must match the exact profile candidate and Core Doctrine
version. `NOT_ACCEPTABLE` and `UNRESOLVED` cannot be admitted.

`ACCEPTABLE_WITH_CONDITIONS` requires exact evidence for every mandatory
condition. Similar counts or unrelated evidence do not satisfy a condition.

Admission requires a decision from the Senator assigned by the cited doctrine,
an exact admission grant and effective-authority finding in decision lineage,
and an `ADMIT` disposition.

Admission creates an immutable successor profile version. It never changes a
candidate's semantic state behind the same identity and version.

## Revision and doctrine change

Profile revision preserves Office identity, advances version, and supersedes
the exact predecessor. A profile cannot silently change Offices.

A Core Doctrine change makes the dependent profile unavailable according to
the propagation notice until the assigned Senator records exact revalidation,
authorized retirement, or competent exemption.

## Non-authority

This contract does not admit any actual Office profile or implementation. It
does not reconstruct Secretariat, select domain standards, complete v2
propagation, or authorize Runtime, credentials, deployment, live data, or
external effects.
