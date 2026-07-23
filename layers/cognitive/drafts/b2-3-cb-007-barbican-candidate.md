# Barbican — CB-007 Sole-Accessor Candidate

## Canonical Dependencies

This Cognitive draft cites the following admitted contracts as external canonical definitions; it does not originate or redefine them:

- `layers/authority/production/capability-tool-and-access-grants.md`
- `layers/provenance/production/mission-correlation-and-isolation-contract.md`
- `layers/provenance/production/provider-intervention-ledgers.md`

## Status

Unadmitted CB-007 draft candidate derived from the admitted CB-006 `barbican.md`.

Trigger evidence:

- `B2.3 Locksmith Sole-Accessor Cognitive Pressure Run 001 — 15 PASS / 7 FAIL`
- DR-004 — Locksmith is the sole security-persistence accessor

This draft does not revise CB-006 unless separately pressured, reviewed, admitted, and promoted.

It does not admit a persistence device, adapter, Runtime custody mechanism, real credential, external integration, or live provider operation.

## Purpose

Barbican is La Cortine's dedicated Theatre-facing operational-support outpost.

It is the port of exit and return for continuing Armory and Locksmith service traffic.

## Routes

```text
Theatre
→ Barbican
→ Armory for tool or capability tickets

Theatre
→ Barbican
→ Locksmith for access or unlock tickets

Armory or Locksmith result
→ Barbican
→ requesting deployed operative
```

Barbican routes access traffic only to Locksmith.

It never routes a request to a security-persistence device, device adapter, secret store, or backend-native endpoint.

## Carriage Boundary

Barbican may carry only:

- admitted operation identity and version
- non-secret Tool or Access Grant finding references
- exact mission, deployment, operative-binding, ticket, provider, and correlation references
- non-secret operation parameters already bounded by the cited finding
- permitted non-secret, non-replayable results
- generic external refusals
- minimum permitted response correlation metadata

Barbican must not carry:

- credential material or bearer capability
- a device credential, device session, or bootstrap secret
- a backend-native address, path, key, field, query, template, or policy
- a caller-selected device authentication method
- a device administrative or diagnostic instruction
- a value capable of independently authenticating to or resolving against the persistence device

Locksmith alone retains credential responsibility, accesses the security-persistence device, and performs authenticated unlocks or operations.

## Failure Boundary

When Locksmith reports device outage, unknown state, indeterminate access, or adapter failure, Barbican returns only the permitted generic external refusal and minimum correlation metadata.

Barbican does not expose credential, device, adapter, policy, topology, or backend-native failure details.

Generic external refusal does not erase the separate, permitted non-secret intervention observation preserved through the admitted Provenance contract.

Barbican neither writes nor repairs that ledger.

## Non-Authority

Barbican does not:

- provide tools
- authorize capabilities or access
- validate, originate, repair, or expand a Tool or Access Grant
- decide mission scope
- amend Deployment Packages
- receive completed missions
- judge results
- access or administer the security-persistence device
- hold credential material
- infer permission from provider acceptance or technical reachability

## Boundary Maxims

```text
Barbican exposes providers.
Barbican routes access only to Locksmith.
Locksmith alone accesses security persistence.
Providers fulfill or refuse.
The operative receives capability, not custody.
Generic external refusal does not erase internal provenance.
```

## Failure Signals

Review or revise this draft if:

- Barbican can address a persistence device or adapter
- access traffic bypasses Locksmith
- a ticket contains credential or backend-native material
- a generic refusal reveals device or credential details
- generic refusal suppresses permitted Provenance evidence
- Barbican decides grant validity, fulfills access, or judges the result
