# Provider Intervention Ledgers

## Status

Draft artifact doctrine.

Armory and Locksmith each maintain an append-only record of interventions requested by operatives for specific missions.

```text
Armory Intervention Ledger
Locksmith Intervention Ledger
```

## Intervention Record

```text
Intervention identity:
Mission identity:
Deployment identity:
Operative identity and version:
Ticket identity:
Provider:
Intervention class:
Requested action:
Requested scope:
Request timestamp:
Entitlement status:
Credential resolution status:
Authentication status:
Operation submission status:
Operation completion status:
Result-delivery status:
Provider-observed result reference:
Refusal stage and class:
Failure stage and class:
Unknown or pending stages:
Response timestamp:
Correlation identity:
Applicable policy reference:
```

## Staged Outcome Semantics

An Intervention Ledger must not contain an unqualified `success` or `failure` field.

Each stage records only the provider-observed state of that stage:

```text
Entitlement status:
NOT_EVALUATED | AUTHORIZED | DENIED | EXPIRED | UNKNOWN

Credential resolution status:
NOT_REQUIRED | NOT_ATTEMPTED | RESOLVED | FAILED | UNKNOWN

Authentication status:
NOT_REQUIRED | NOT_ATTEMPTED | ACCEPTED | REJECTED | UNKNOWN

Operation submission status:
NOT_ATTEMPTED | ACCEPTED | REJECTED | UNKNOWN

Operation completion status:
NOT_OBSERVED | PENDING | COMPLETED | FAILED | UNKNOWN

Result-delivery status:
NOT_EXPECTED | PENDING | DELIVERED | PARTIAL | FAILED | UNKNOWN
```

A later stage must not retroactively redefine an earlier stage.

Examples:

- authentication `ACCEPTED` does not imply operation `COMPLETED`
- operation `COMPLETED` does not imply result `DELIVERED`
- result `DELIVERED` does not imply the mission objective succeeded

The provider ledger does not record mission success. It records intervention-stage facts only.

Unknown, pending, not attempted, not required, and not observed are distinct. Absence of a later-stage observation must not be converted into success or failure.

Locksmith records credential-backed activity without recording or exposing credential values.

Corrections use supersession. Historical records are not overwritten.

## Operational Path

```text
Operative
→ Barbican
→ Armory / Locksmith
→ intervention performed or refused
→ ledger entry
→ result through Barbican
→ Operative
```

## Curia Observability Path

```text
Chief of Staff
→ mission-scoped read-only query
→ Armory / Locksmith Intervention Ledger
→ permitted provider audit view
→ Curia Situation Picture
```

Providers perform and record interventions.

The Chief of Staff reads and correlates permitted records without altering them or treating provider intervention success as mission success.

Session-assigned Officers may advise on the records when relevant.

The CEO President alone decides.

