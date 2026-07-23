# B2.3 Locksmith Cognitive Convergence Candidate 001

## Status

Pressure finding and minimum-revision plan. Not production.

## Trigger

`B2.3 Locksmith Sole-Accessor Cognitive Pressure Run 001` produced 15 PASS / 7 FAIL.

The failures show that DR-004 cannot be enforced from admitted Cognitive production without a bounded convergence correction.

## Proposed Production Scope

Only the following Cognitive artifacts are candidates for semantic revision:

1. `layers/cognitive/production/armory-locksmith.md`
2. `layers/cognitive/production/muster.md`
3. `layers/cognitive/production/barbican.md`
4. `layers/cognitive/production/README.md` for the new baseline manifest and evidence

Authority Baseline AB-003 and Provenance Baseline PB-001 require convergence review, not semantic revision, unless later pressure finds a contradiction.

## Minimum Candidate Changes

### Armory and Locksmith

Add that:

- Locksmith is the sole Imperium accessor to the security-persistence device;
- the device adapter exists only behind Locksmith;
- callers submit an admitted operation identity plus non-secret grant and correlation references;
- callers cannot select backend-native addressing, fields, queries, policies, credentials, or administration;
- Locksmith validates the exact effective Access Grant, mission binding, expiry, revocation, and correlation before device access;
- device outage, unknown state, or adapter failure produces a generic refusal without credential or backend-detail leakage;
- device access, credential possession, and technical capability do not create authority.

### Muster

Replace the ambiguous Runtime-custody sentence with a distinction:

- Locksmith alone accesses the persistence device;
- Runtime may hold credential material only through a separately admitted, execution-local custody handoff when a Locksmith-performed operation is impossible;
- such custody cannot address, authenticate to, query, or resolve against the persistence device;
- Muster continues to carry only non-secret, non-bearer references and permitted non-replayable results or refusals.

### Barbican

Clarify that:

- Barbican routes an access request only to Locksmith, never to a persistence backend or backend adapter;
- it carries no device-native address, device credential, query, policy, or administrative instruction;
- a device or adapter failure returns only the permitted generic refusal and correlation metadata.

## Non-Changes

The candidate must not:

- make Locksmith an authority source;
- transfer Authority Grant semantics into Cognitive;
- transfer ledger or correlation ownership from Provenance;
- make Muster or Barbican credential custodians;
- make Runtime a security-persistence adapter owner;
- select a backend;
- admit live credential behavior.

## Required Evidence Before Promotion

1. exact revised draft artifacts;
2. a rerun of all 22 sole-accessor pressures with zero failures;
3. Authority–Cognitive convergence review;
4. Provenance–Cognitive convergence review;
5. Cognitive production admission run;
6. explicit merge authorization.

## Next Action

Prepare the exact CB-007 draft revision and its test matrix. Do not alter production in this increment.
