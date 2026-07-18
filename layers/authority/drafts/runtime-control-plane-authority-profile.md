# Runtime Control-Plane Authority Profile

## Status

Candidate Authority refinement.

Not admitted.

## Problem

AB-002 defines six grant profiles but none explicitly covers consequential operation of Imperium's own Runtime or a Runtime acting on an externally controlled environment.

Mission Envelope, Capability Tool, and Capability Access grants are mission-scoped and do not safely generalize to deployment, activation, migration, rollback, or recovery.

Technical control and credential possession are not Authority Bases.

## Candidate Profile

```text
CONTROL_PLANE
```

Permits an exact acting surface to perform listed control-plane action classes against a bounded Runtime environment.

## Required Semantic Content

```text
Grant identity and version
Represented Principal
Authority Basis and provenance
Grantee or acting surface
Exact environment and component scope
Permitted control-plane action classes
Permitted current and target implementation versions
Permitted semantic-mapping versions
Affected resource and credential-binding scope
Effective interval
Required plan or compatibility conditions
Delegation rule
Suspension, withdrawal, expiry, and supersession
Required safe state
Prohibited actions
```

## Candidate Action Classes

```text
DEPLOY_IMPLEMENTATION
ACTIVATE_IMPLEMENTATION
DEACTIVATE_IMPLEMENTATION
CHANGE_CONFIGURATION
MIGRATE_STATE
LOAD_CREDENTIAL_BINDING
ROTATE_CREDENTIAL_BINDING
ROLL_BACK_IMPLEMENTATION
RESTORE_STATE
INITIATE_RECOVERY
ALTER_RESOURCE_LIMIT
```

Silence does not authorize an action class.

## Authority Basis

For an internal development Runtime, `IMPERIUM_STEWARDSHIP` may support bounded control-plane authority when the operator controls the environment.

For external or client-controlled environments, the grant requires `CONTROLLED_RESOURCE`, `DELEGATED_AUTHORITY`, or `LEGAL_OR_CONTRACTUAL_AUTHORITY` as applicable.

Imperium stewardship alone does not authorize action against external resources.

## Intersections

A control-plane action may also require:

- CAPABILITY_ACCESS for authenticated access
- CAPABILITY_TOOL for a specific administrative tool
- MISSION_ENVELOPE when the action is itself part of one mission

These intersections do not merge grants.

## Delegation

Default delegation: prohibited.

Automation may be the bounded grantee or acting surface. Automation does not become the Principal and cannot widen, renew, or reinterpret the grant.

## Dispatch Freshness

The Authority finding must be re-evaluated immediately before every consequential control-plane effect, including retry, rollback, and recovered continuation.

Plan approval, prior success, maintenance-window entry, or queued status does not preserve Authority.

## Prohibited Inference

```text
administrator access ≠ CONTROL_PLANE authority
deployed ≠ authorized to activate
ability to roll back ≠ authorized rollback
incident urgency ≠ recovery authority
credential possession ≠ permission
successful migration ≠ authorized migration
```

## Minimality Finding

CONTROL_PLANE is distinct from the six admitted profiles because its object is the operating substrate and its actions alter implementation availability, mapping, state, or custody.

This draft does not revise AB-002 or admit a seventh production profile.
