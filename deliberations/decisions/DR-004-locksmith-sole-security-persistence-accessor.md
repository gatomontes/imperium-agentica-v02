# DR-004 — Make Locksmith the Sole Security-Persistence Accessor

## Date

2026-07-23

## Status

Authorized decision candidate. Merge gated.

This candidate supersedes the active OpenBao-specific B2.3 path without deleting its historical decisions, artifacts, or pressure evidence.

## Question

Which Imperium institution may access the device that stores, derives, retrieves, rotates, or revokes security-sensitive persistence material?

## Decision

Locksmith shall be the sole Imperium accessor to whatever security-persistence device is eventually selected.

The device is a replaceable implementation detail behind a Locksmith-owned adapter. No Runtime component, provider adapter, operative, Muster, Barbican, Theatre component, or other institution may possess a device client, device credential, connection string, path authority, query authority, or direct read/write/configuration capability.

All consumers cross a Locksmith-facing port using an authorized, mission-bound, non-secret request and correlation references. The caller cannot select an arbitrary backend, path, key, field, query, policy, authentication method, or administrative operation.

## Required Interaction

The preferred interaction is:

1. an admitted authority supplies a bounded Access Grant or equivalent reference;
2. the caller presents only the non-secret authorization and correlation material required by the Locksmith port;
3. Locksmith validates the exact operation, mission binding, expiry, revocation, and constraints;
4. Locksmith alone accesses the security-persistence device;
5. Locksmith performs the authenticated operation or obtains the minimum material required to do so;
6. Locksmith returns only a permitted non-secret result or generic refusal;
7. Locksmith records the required intervention evidence without exposing credential material.

If an external provider cannot be used without a credential value leaving Locksmith, an execution-local Runtime custody handoff requires a separately admitted mechanism. Such a handoff must be bound, expiring, one-use, non-serializable, non-loggable, and unusable for accessing the persistence device. Runtime custody does not confer device access or device-adapter ownership.

## Adapter Boundary

The eventual persistence adapter belongs behind Locksmith.

A conforming adapter may change storage technology without changing the public Locksmith port. It must implement only the exact operations admitted for Locksmith and must not leak backend-native addressing or administration into callers.

OpenBao, PostgreSQL, local environment files, operating-system stores, cloud secret managers, and any other persistence technology remain unselected. None is the active B2.3 implementation path.

## Consequences

- Existing OpenBao decisions and executable reference artifacts remain historical evidence, not the active architecture.
- Direct Runtime secret-store adapters must not remain active candidates or package exports.
- Admitted Cognitive wording must be pressure-tested for the distinction between Locksmith device access and exceptional Runtime execution-local custody.
- The Locksmith port, adapter contract, denial behavior, audit evidence, and exceptional handoff must be specified and tested before any persistence technology is selected.
- A future device selection evaluates only implementations that can remain wholly behind this boundary.

## Evidence

- Admitted `armory-locksmith.md`: Locksmith retains credentials and performs authorized access or authenticated operations.
- Admitted `muster.md`: Deployment Packages carry only non-secret, non-bearer references and permitted non-replayable results or refusals.
- B2.3 OpenBao 2.6.1 pinned-binary pressure: required workflow CAS behavior failed and the complete service-port sequence was not established.
- Operator direction: “have Locksmith as the sole accessor to whatever security-persistance-device we eventually use.”

## Rejected or Deferred Alternatives

- OpenBao-hosted Imperium Service Port as the active implementation path: superseded.
- Direct Runtime OpenBao KV adapter: superseded.
- Local PostgreSQL as a temporary security-persistence adapter: not selected.
- Local `.env` files as a temporary security-persistence adapter: not selected.
- Selecting a replacement device before the Locksmith boundary is executable: deferred.

## Explicit Non-Decisions

This decision does not:

- select a persistence device;
- admit a concrete Locksmith port or adapter;
- alter an admitted production artifact by itself;
- authorize credentials, secrets, tokens, network contact, a running service, provisioning, deployment, or external effects;
- prove credential safety, audit completeness, revocation, outage behavior, or provider compatibility;
- close B2.3 or admit B2.

## Supersession Conditions

Reopen this decision only if admitted cross-layer semantics demonstrate that another institution must directly access the security-persistence device and the authority, credential exposure, audit, revocation, and failure consequences have been separately pressured and accepted.
