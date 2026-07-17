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
Entitlement result:
Provider decision:
Operation attempted:
Operation result:
Success / failure:
Refusal class:
Failure class:
Response timestamp:
Correlation identity:
Applicable policy reference:
```

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

