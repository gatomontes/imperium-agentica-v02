# B2.3 Local Environment Secret-Bridge Conformance Plan 001

## Status

Candidate plan exercised by deterministic repository tests.

## Gates

| ID | Required behavior |
|---|---|
| LESB-001 | source is explicitly nonproduction and synthetic |
| LESB-002 | opaque reference resolves only to two fixed variable names |
| LESB-003 | material variable is Imperium-prefixed and base64-designated |
| LESB-004 | version variable is Imperium-prefixed and explicit |
| LESB-005 | no caller-controlled variable name |
| LESB-006 | no extra binding field |
| LESB-007 | canonical non-empty base64 only |
| LESB-008 | positive canonical version only |
| LESB-009 | unknown reference fails before source contact |
| LESB-010 | missing, malformed, and source failures refuse generically |
| LESB-011 | existing backend response contract is preserved |
| LESB-012 | no filesystem, process environment, dotenv, database, or network mechanism |
| LESB-013 | no false source-revocation claim |
| LESB-014 | OpenBao leaves the active package export surface |
| LESB-015 | private `.env` is ignored and example material is synthetic |
| LESB-016 | real credentials and production eligibility remain refused |

## Merge Rule

Passing this plan permits only the repository candidate merge. It does not
authorize a private `.env` containing real credentials, a Runtime action,
provider authentication, deployment, B4, or production.

