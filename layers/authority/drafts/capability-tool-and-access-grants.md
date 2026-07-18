# Capability Tool And Access Grants

## Status

Draft Authority specializations exposed by Procedural Split Investigation 001.

Candidate profiles:

- `CAPABILITY_TOOL`
- `CAPABILITY_ACCESS`

Not admitted. AB-001 production remains unchanged.

## Canonical Dependencies

- Authority origin: `layers/authority/production/authority-origin-contract.md`
- grant profiles: `layers/authority/production/authority-grant-profiles.md`
- Mission Envelope candidate: `mission-envelope.md`
- provenance: `layers/provenance/production/provenance-contract.md`
- provider lineage: `layers/provenance/production/provider-intervention-ledgers.md`

## Core Distinctions

```text
capability exists ≠ capability authorized
Tool Grant ≠ Access Grant
Tool Grant ≠ mission instruction
Access Grant ≠ credential value
provider entitlement observation ≠ valid Authority finding
operation completed ≠ mission succeeded
```

## Tool Grant

Represents bounded permission to use or request one defined tool capability for one mission scope.

Minimum semantic content:

```text
Grant identity and version
Authority profile: CAPABILITY_TOOL
Principal and Authority Basis
Mission Envelope reference
Mission, deployment, operative, and binding references
Tool or capability identity and version
Permitted operations
Permitted targets and resources
Usage conditions and limits
Denied operations
Effective interval
Delegation rule
Revocation, expiry, and supersession
Required provenance findings
Status
```

The Tool Grant does not define the tool, provide it, choose when to use it, or prove its result.

## Access Grant

Represents bounded permission to request or perform one authenticated or access-controlled operation for one mission scope.

Minimum semantic content:

```text
Grant identity and version
Authority profile: CAPABILITY_ACCESS
Principal and Authority Basis
Mission Envelope reference
Mission, deployment, operative, and binding references
System, resource, account, or access domain
Permitted operations
Target and scope constraints
Credential class reference without credential value
Effective interval
Delegation rule
Revocation, expiry, and supersession
Required provenance findings
Status
```

The Access Grant does not contain credentials, assign credential custody, perform authentication, or prove provider acceptance.

## Parent And Scope Rules

```text
Tool Grant scope ⊆ Mission Envelope scope
Access Grant scope ⊆ Mission Envelope scope
grant duration ≤ parent duration
derived delegation ≤ parent delegation
parent invalidation → dependent grant unavailable
```

A capability grant may narrow but never enlarge its parent.

## Provider Boundary

Provider Intervention Ledgers may record entitlement, authentication, submission, completion, and delivery observations.

They do not validate these grants.

Authority may consume provenance about provider observations without treating provider acceptance as the source of permission.

## Cognitive Boundary

Armory, Locksmith, Barbican, Muster, and operative responsibilities remain defined by Cognitive contracts.

This Authority draft does not assign custody, fulfillment, routing, request timing, or decision responsibility.

## Procedure Boundary

Procedure may require an effective matching grant before a capability transition.

It may not create, expand, repair, or infer the grant.

## Non-Admissions

This draft does not admit real tools, credentials, access, external integrations, runtime permissions, or automatic execution.
