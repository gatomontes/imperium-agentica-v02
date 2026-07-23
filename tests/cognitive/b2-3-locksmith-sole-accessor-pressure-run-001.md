# B2.3 Locksmith Sole-Accessor Cognitive Pressure Run 001

## Date

2026-07-23

## Status

Complete. Revision required.

This run pressures the admitted Cognitive, Authority, and Provenance contracts against DR-004. It does not modify production semantics.

## Sources Under Pressure

- `layers/cognitive/production/armory-locksmith.md`
- `layers/cognitive/production/muster.md`
- `layers/cognitive/production/barbican.md`
- `layers/authority/production/capability-tool-and-access-grants.md`
- `layers/provenance/production/provider-intervention-ledgers.md`
- `deliberations/decisions/DR-004-locksmith-sole-security-persistence-accessor.md`

## Method

Each assertion asks whether the admitted contracts state the required behavior strongly enough to reject a nonconforming implementation without importing DR-004 as hidden production semantics.

`PASS` means the admitted baseline already supplies the rule.

`FAIL` means the rule exists only in DR-004, is ambiguous, or is absent from admitted production.

## Results

| # | Pressure assertion | Result | Evidence or gap |
|---:|---|---|---|
| 1 | Locksmith retains responsibility for credential material | PASS | Armory/Locksmith and Muster |
| 2 | Locksmith may perform the authenticated operation instead of transferring credentials | PASS | Armory/Locksmith |
| 3 | credentials do not enter the operative, Barbican, Muster, or Theatre | PASS | Armory/Locksmith and Barbican |
| 4 | continuing access traffic routes through Barbican to Locksmith | PASS | Barbican |
| 5 | a Deployment Package carries only non-secret access references | PASS | Muster |
| 6 | a non-secret reference cannot act as a bearer capability | PASS | Muster |
| 7 | an Access Grant contains no credential value | PASS | Authority |
| 8 | an Access Grant does not assign credential custody | PASS | Authority |
| 9 | Access Grant scope remains inside one Mission Envelope | PASS | Authority |
| 10 | grant expiry, revocation, supersession, and mission-binding end are represented | PASS | Authority |
| 11 | foreign or ambiguously correlated mission traffic is rejected | PASS | Muster and Provenance |
| 12 | entitlement, authentication, completion, and delivery remain distinct observations | PASS | Provenance |
| 13 | provider ledgers exclude credential values | PASS | Provenance |
| 14 | intervention corrections preserve history through supersession | PASS | Provenance |
| 15 | a Runtime custody mechanism requires separate admission | PASS | Muster |
| 16 | Locksmith is explicitly the sole Imperium accessor to the persistence device | FAIL | no admitted artifact states the device-access monopoly |
| 17 | the persistence-device adapter is explicitly owned behind Locksmith | FAIL | adapter ownership is absent from Cognitive production |
| 18 | Runtime custody is explicitly forbidden from directly accessing the device | FAIL | Muster assigns Runtime custody but does not state this prohibition |
| 19 | callers are explicitly forbidden from supplying backend-native paths, queries, fields, policies, or authentication methods | FAIL | confused-deputy boundary is absent |
| 20 | Locksmith must validate the exact effective Access Grant and mission correlation before device access | FAIL | Authority defines the grant, but Locksmith's admitted responsibility does not cite the pre-access check |
| 21 | device outage, unknown state, or adapter failure must refuse without credential or backend-detail leakage | FAIL | admitted Cognitive failure behavior is unspecified |
| 22 | an exceptional Runtime handoff is explicitly unusable to authenticate to or resolve against the persistence device | FAIL | separate admission is required, but this invariant is absent |

```text
PASS: 15
FAIL: 7
```

## Findings

### F-01 — Sole Access Is Not Yet Admitted

DR-004 assigns sole device access to Locksmith, but the admitted Armory/Locksmith contract speaks only of credential retention and performed unlocks. A direct Runtime device adapter cannot yet be rejected from Cognitive production alone.

### F-02 — Runtime Custody Is Underspecified

Muster correctly separates credential material from mission assembly and requires a separately admitted Runtime custody mechanism. It does not distinguish execution-local credential custody from security-persistence-device access.

### F-03 — The Public Request Surface Is Underspecified

The admitted contracts do not yet forbid backend-native caller inputs or require exact grant and mission-correlation validation before Locksmith touches the device.

### F-04 — Device Failure Semantics Are Underspecified

Provider ledgers can preserve staged failure observations, but Cognitive production does not require generic refusal or prohibit credential and backend-detail leakage when the device is unavailable or indeterminate.

## Required Correction

A minimum Cognitive revision must:

1. state Locksmith's sole-accessor and adapter-ownership boundary;
2. forbid direct device access by Runtime and every other Imperium consumer;
3. distinguish exceptional Runtime custody from device access;
4. constrain the Locksmith request surface to admitted operation identities and non-secret authority/correlation references;
5. require validation before device access;
6. require generic, non-leaking refusal for outage, unknown, or adapter failure;
7. preserve current Authority and Provenance ownership without redefining either.

## Explicit Non-Claims

This run does not:

- admit DR-004 into Cognitive production by itself;
- select or implement a persistence device;
- admit a Locksmith port or Runtime custody mechanism;
- claim Runtime enforcement;
- authorize credentials, services, network contact, deployment, or external effects.
