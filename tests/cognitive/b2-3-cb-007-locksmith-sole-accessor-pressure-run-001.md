# B2.3 CB-007 Locksmith Sole-Accessor Pressure Run 001

## Date

2026-07-23

## Status

Complete against the exact unadmitted CB-007 drafts.

## Candidate Under Test

- `layers/cognitive/drafts/b2-3-cb-007-armory-locksmith-candidate.md`
- `layers/cognitive/drafts/b2-3-cb-007-muster-candidate.md`
- `layers/cognitive/drafts/b2-3-cb-007-barbican-candidate.md`
- `tests/cognitive/b2-3-cb-007-locksmith-sole-accessor-test-matrix-001.md`

Canonical dependencies:

- Authority Baseline AB-003
- Provenance Baseline PB-001
- Cognitive Baseline CB-006 for unchanged semantics

## Method

The 22 assertions from the merged baseline pressure run were rerun against the exact draft artifacts.

A result passes only when:

1. the draft contains an explicit rule sufficient to reject the nonconforming case;
2. the cited Authority or Provenance dependency supplies the native semantic rule where ownership belongs outside Cognitive;
3. the candidate does not silently admit Runtime machinery, a persistence device, or live credentials.

This is theoretical contract evidence, not Runtime enforcement.

## Results

| # | Pressure assertion | Result | Candidate evidence |
|---:|---|---|---|
| 1 | Locksmith retains responsibility for credential material | PASS | Armory/Locksmith Purpose; Muster relationship |
| 2 | Locksmith may perform the authenticated operation instead of transferring credentials | PASS | Armory/Locksmith Preferred Fulfillment |
| 3 | credentials do not enter the operative, Barbican, Muster, or Theatre | PASS | Armory/Locksmith Purpose; Muster Product; Barbican Carriage Boundary |
| 4 | continuing access traffic routes through Barbican to Locksmith | PASS | Armory/Locksmith Relationships; Barbican Routes |
| 5 | a Deployment Package carries only non-secret access references | PASS | Muster Product |
| 6 | a non-secret reference cannot act as a bearer capability | PASS | Muster Product |
| 7 | an Access Grant contains no credential value | PASS | admitted Authority dependency retained |
| 8 | an Access Grant does not assign credential custody | PASS | admitted Authority dependency retained |
| 9 | Access Grant scope remains inside one Mission Envelope | PASS | admitted Authority dependency retained |
| 10 | grant expiry, revocation, supersession, and mission-binding end are represented | PASS | Authority dependency; Armory/Locksmith Request Boundary |
| 11 | foreign or ambiguously correlated mission traffic is rejected | PASS | Provenance dependency; Armory/Locksmith Request Boundary; Muster concurrency |
| 12 | entitlement, authentication, completion, and delivery remain distinct | PASS | Provider Intervention Ledger dependency retained |
| 13 | provider ledgers exclude credential values | PASS | Provenance dependency; Armory/Locksmith Intervention Ledgers |
| 14 | intervention corrections preserve history through supersession | PASS | Provenance dependency retained without redefinition |
| 15 | a Runtime custody mechanism requires separate admission | PASS | Armory/Locksmith Exceptional Runtime Custody; Muster relationship |
| 16 | Locksmith is the sole Imperium persistence-device accessor | PASS | all three CB-007 drafts |
| 17 | the persistence-device adapter exists only behind Locksmith | PASS | Armory/Locksmith Security-Persistence Device |
| 18 | Runtime custody cannot directly access the device | PASS | Armory/Locksmith Exceptional Runtime Custody; Muster relationship |
| 19 | callers cannot supply backend-native device inputs | PASS | Armory/Locksmith Request Boundary; Muster Product; Barbican Carriage Boundary |
| 20 | an Authority-produced exact-match finding and matching correlation are required before device access | PASS | Armory/Locksmith Request Boundary |
| 21 | device failure returns a generic non-leaking external refusal while internal evidence remains preserved | PASS | Armory/Locksmith and Barbican Failure Boundaries |
| 22 | exceptional Runtime custody cannot authenticate to or resolve against the device | PASS | Armory/Locksmith Exceptional Runtime Custody; Muster relationship |

```text
PASS: 22
FAIL: 0
```

## Cross-Layer Guard Results

| Guard | Result |
|---|---|
| Locksmith does not originate or adjudicate Authority | PASS |
| Barbican does not validate Authority | PASS |
| Cognitive does not define or repair correlation | PASS |
| Cognitive does not redefine Provider Intervention Ledger stages | PASS |
| provider acceptance does not become permission | PASS |
| generic refusal does not erase permitted failure evidence | PASS |
| continuing provider-result classification remains separately governed | PASS |
| describing exceptional Runtime custody does not admit it | PASS |
| no persistence technology is selected | PASS |
| no production or implementation artifact is changed | PASS |

## Correction Confirmed

The candidate distinguishes two result surfaces:

- Muster assembly receives only non-secret, non-replayable results or refusals.
- Continuing Barbican traffic may carry a separately governed provider result, but never credential material, device sessions, backend-native details, or independently authenticating values.

This prevents credential leakage without redefining all sensitive provider data as non-secret.

## Finding

The exact CB-007 drafts satisfy all 22 sole-accessor assertions.

They are eligible for cross-layer convergence review. They are not admitted to production by this run.

## Residual Scope

The 22 assertions cover mission-bound credential access, continuing provider operations, and exceptional execution-local Runtime custody.

They do not admit or evaluate:

- non-mission device administration;
- initial bootstrap or initialization;
- backup or restore;
- root, unseal, recovery, or break-glass custody;
- operator emergency access;
- device migration.

Any later administrative path must remain behind Locksmith, cite separately admitted Authority and Provenance contracts appropriate to that responsibility, and receive its own pressure evidence.

## Explicit Non-Claims

This run does not:

- admit or promote CB-007;
- modify CB-006 production;
- implement a Locksmith port, Runtime custody mechanism, or adapter;
- select a persistence device;
- claim Runtime enforcement or external assurance;
- authorize credentials, services, network contact, deployment, or external effects.
