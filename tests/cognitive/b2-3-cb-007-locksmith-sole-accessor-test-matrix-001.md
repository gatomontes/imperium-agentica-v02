# B2.3 CB-007 Locksmith Sole-Accessor Test Matrix 001

## Date

2026-07-23

## Status

Candidate matrix. Not executed.

This matrix maps the 22 assertions from `B2.3 Locksmith Sole-Accessor Cognitive Pressure Run 001` to the exact CB-007 draft evidence expected to satisfy them.

A mapped expectation is not a passing result. A separate immutable rerun must evaluate the draft artifacts.

## Candidate Artifacts

- `layers/cognitive/drafts/b2-3-cb-007-armory-locksmith-candidate.md`
- `layers/cognitive/drafts/b2-3-cb-007-muster-candidate.md`
- `layers/cognitive/drafts/b2-3-cb-007-barbican-candidate.md`

## Matrix

| # | Assertion | Expected candidate evidence |
|---:|---|---|
| 1 | Locksmith retains responsibility for credential material | Armory/Locksmith Purpose; Muster relationship |
| 2 | Locksmith may perform the authenticated operation instead of transferring credentials | Armory/Locksmith Preferred Fulfillment |
| 3 | credentials do not enter the operative, Barbican, Muster, or Theatre | Armory/Locksmith Purpose; Muster Product; Barbican Carriage Boundary |
| 4 | continuing access traffic routes through Barbican to Locksmith | Armory/Locksmith Relationships; Barbican Routes |
| 5 | a Deployment Package carries only non-secret access references | Muster Product |
| 6 | a non-secret reference cannot act as a bearer capability | Muster Product |
| 7 | an Access Grant contains no credential value | admitted Authority dependency; no redefinition |
| 8 | an Access Grant does not assign credential custody | admitted Authority dependency; no redefinition |
| 9 | Access Grant scope remains inside one Mission Envelope | admitted Authority dependency; no redefinition |
| 10 | grant expiry, revocation, supersession, and mission-binding end are represented | admitted Authority dependency; Armory/Locksmith Request Boundary |
| 11 | foreign or ambiguously correlated mission traffic is rejected | admitted Provenance dependency; Armory/Locksmith Request Boundary; Muster concurrency |
| 12 | entitlement, authentication, completion, and delivery remain distinct | admitted Provider Intervention Ledger dependency |
| 13 | provider ledgers exclude credential values | admitted Provenance dependency; Armory/Locksmith Intervention Ledgers |
| 14 | intervention corrections preserve history through supersession | admitted Provenance dependency; no redefinition |
| 15 | a Runtime custody mechanism requires separate admission | Armory/Locksmith Exceptional Runtime Custody; Muster relationship |
| 16 | Locksmith is the sole Imperium persistence-device accessor | Armory/Locksmith Security-Persistence Device; Muster relationship; Barbican boundary |
| 17 | the persistence-device adapter exists only behind Locksmith | Armory/Locksmith Security-Persistence Device |
| 18 | Runtime custody cannot directly access the device | Armory/Locksmith Exceptional Runtime Custody; Muster relationship |
| 19 | callers cannot supply backend-native device inputs | Armory/Locksmith Request Boundary; Muster Product; Barbican Carriage Boundary |
| 20 | an Authority-produced exact-match finding and matching correlation are required before device access | Armory/Locksmith Request Boundary |
| 21 | device failure returns a generic non-leaking external refusal while internal evidence remains preserved | Armory/Locksmith Failure Boundary; Barbican Failure Boundary |
| 22 | exceptional Runtime custody cannot authenticate to or resolve against the device | Armory/Locksmith Exceptional Runtime Custody; Muster relationship |

## Cross-Layer Ownership Checks

The rerun must fail if the drafts:

- make Locksmith an Authority source or adjudicator;
- make Barbican validate Authority;
- define or repair correlation inside Cognitive;
- redefine Provider Intervention Ledger stages;
- treat provider acceptance as permission;
- let generic refusal erase permitted failure evidence;
- classify every continuing provider result as non-secret instead of limiting only credential, device, backend, and authentication exposure;
- redefine substantive provider-result data classification;
- admit a Runtime custody mechanism by describing its required boundary;
- select a persistence technology.

## Required Rerun Result

```text
Sole-accessor assertions: 22 PASS / 0 FAIL
Authority ownership checks: PASS
Provenance ownership checks: PASS
Result-classification ownership check: PASS
Production semantic files changed: 0
Runtime implementation files changed: 0
```

## Non-Claims

This matrix does not claim that the candidate passes, admit CB-007, revise production, select a device, or authorize implementation.
