# B2.3 OpenBao Pinned-Binary Pressure Run 001

## Date

2026-07-23

## Status

Complete as historical evidence.

The pressure run found a decisive compatibility defect. DR-004 subsequently supersedes OpenBao as the active B2.3 implementation path and places any eventual security-persistence adapter solely behind Locksmith.

## Environment

```text
OpenBao release: 2.6.1
Release commit: ba7ad8861d0578cd4da4f7b9e5a6756d30484f8f
Linux amd64 archive SHA-256:
ca8d836eb3a5c80407e45e762300b64e7138c419e78826955f2e4ba4ce6d8a6b
Storage: ephemeral in-memory
Listener: loopback only
Material: synthetic only
Persistent instance: NO
Real credential: NO
VPS or deployment: NO
```

## Results

| Pressure | Result |
|---|---|
| release checksum | PASS |
| exact binary identity | PASS |
| candidate HCL parsing with workflow CAS disabled | PASS |
| workflow creation with `cas_required=true` and `cas=-1` | FAIL |
| workflow update with exact `cas=1` | FAIL |
| complete service-port sequence | NOT ESTABLISHED |

Both CAS attempts returned:

```text
check-and-set parameter required for this call
```

## Root Cause

OpenBao 2.6.1 `handleWorkflowsUpdate` declares the outer CAS pointer and then uses `cas := new(int)` inside the conditional block. The short declaration shadows the outer pointer. `workflowStore.Set` therefore receives `nil`.

When the incoming workflow sets `cas_required=true`, the store refuses the nil CAS pointer. The supported workflow API cannot create or update the required CAS-protected record in this patch.

## Consequence

The run does not establish that the OpenBao workflow surface can implement the proposed Imperium Service Port contract.

This technical failure is not the sole reason for supersession. The operator also concluded that selecting and integrating a persistence device before establishing the Locksmith sole-accessor boundary adds unnecessary complexity.

## Non-Claims

The run did not establish the full lookup, unwrap, login, exact-version read, revoke, output, audit, trace, or outage contract.

The ephemeral process was stopped. No instance or test credential persists.
