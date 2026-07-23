# B2.2 OpenBao Nonproduction Selection 001

## Status

Selection merged through PR #68 and squash commit `2fa08c120a75ca9b9b79d7946ee5ee14bbf7d199`; post-merge verified and closed by the B2.2 execution record.

No OpenBao instance exists or is required to run.

## Authorization

The operator approved the recommended topology on the condition that no instance is required to run now.

That condition is preserved.

## Selected Realization

```text
OpenBao 2.6.x family
× separate Ubuntu VPS
× isolated single node
× integrated Raft storage
× manual operator unseal
× fail-closed outage
× one initial tenant
× encrypted off-host snapshot
= B2.3 nonproduction target
```

The exact patch is pinned at B2.3 start. OpenBao v2.6.1 is the current official release observed on 2026-07-23, but its very recent release means B2.2 does not silently convert “latest” into an immutable future pin.

## Why Not Running Now

B2.2 selects and records the target.

B2.3 designs and implements the adapter.

B2.4 provisions a bounded empirical environment and runs credential lifecycle, outage, rotation, revocation, audit, backup, and recovery tests only under separate authorization.

Running OpenBao during B2.2 would collapse selection, implementation, and empirical verification.

## Selected Boundaries

- separate host prevents intentional sharing of Imperium's process and storage failure domain;
- single node accepts nonproduction unavailability and refuses closed;
- integrated Raft provides the chosen persistence/snapshot surface without claiming HA;
- manual Shamir unseal keeps root-of-trust custody with the operator;
- no public UI;
- API restricted to the future Runtime and operator administration paths;
- two audit destinations required before any credential test;
- no durable cache in Imperium;
- no secret material in repository, configuration artifacts, mission content, or ordinary telemetry;
- initial tenant boundary is singular and explicit;
- migration to HA or a managed store requires a new decision.

## Version Rule

At B2.3 start:

1. inspect supported OpenBao releases and security notices;
2. choose an exact supported patch;
3. record package or image digest and signature/checksum;
4. pin adapter contract fixtures to the chosen API;
5. do not automatically follow `latest`.

## B2.3 Entry Conditions

B2.3 may define an injected adapter, deterministic HTTP fixtures, value-free configuration schemas, and sealed/outage/error mappings without provisioning or contacting OpenBao.

## Result

```text
STORE: OPENBAO
TOPOLOGY: ISOLATED SINGLE-NODE UBUNTU VPS
INSTANCE RUNNING: NO
VERSION FAMILY: 2.6.x
EXACT PATCH: DEFERRED TO B2.3 START
B2.3 IMPLEMENTATION: ELIGIBLE AFTER B2.2 CLOSURE
LIVE NONPRODUCTION STORE: NOT AUTHORIZED
```