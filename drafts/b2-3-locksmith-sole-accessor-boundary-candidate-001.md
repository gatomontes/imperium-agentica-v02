# B2.3 Locksmith Sole-Accessor Boundary Candidate 001

## Status

Decision and work-sequence candidate. Merge gated.

## Objective

Establish Locksmith as the only Imperium institution that can access whatever security-persistence device is eventually selected, before selecting or implementing that device.

## Boundary Invariant

```text
security-persistence device
        ^
        | Locksmith-owned adapter only
        |
    Locksmith
        |
        | admitted Locksmith access port
        v
authorized Imperium consumers
```

A consumer may request an authorized access outcome. It may not address, authenticate to, query, configure, observe, or administer the device.

## Required Convergence Work

1. Pressure the admitted Armory/Locksmith and Muster wording against direct-device, bearer-reference, confused-deputy, cross-mission, expiry, revocation, replay, and outage cases.
2. Admit the minimum Cognitive correction, if pressure demonstrates one is required.
3. Define a Runtime-facing Locksmith port that accepts only fixed operation identifiers plus non-secret authorization and correlation references.
4. Reclassify existing direct OpenBao store and service-port implementations as historical reference evidence and remove them from active package exports.
5. Implement a synthetic Locksmith adapter and broker sufficient to prove the boundary without selecting a persistence device.
6. Pressure generic refusal, minimum output, correlation, one-use behavior, revocation, audit evidence, crash behavior, and forbidden backend-native inputs.
7. Review B2.3 evidence before considering a concrete device adapter.

## Exceptional Runtime Custody

The preferred result is a Locksmith-performed authenticated operation.

If a provider requires a credential handoff, the candidate must treat it as a separate, exceptional custody mechanism. The handoff cannot expose device-native authority and cannot allow Runtime to access the persistence device.

## Explicit Exclusions

This candidate does not authorize:

- a persistence technology selection;
- local `.env`, PostgreSQL, OpenBao, or another backend;
- real credentials or secrets;
- a running persistence service;
- network contact;
- provisioning or deployment;
- external effects;
- production admission.

## Gate

Merge requires explicit operator authorization. After merge, begin Cognitive convergence pressure; do not begin a device adapter.
