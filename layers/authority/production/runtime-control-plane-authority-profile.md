# Runtime Control-Plane Authority Profile

## Status

Admitted Authority production contract.

Baseline: `AB-003`.

Admission: `Runtime Production Admission Review 001`.

Evidence:

- `Runtime Admission Pressure Run 001 — 55 PASS / 0 FAIL`
- `Runtime Admission Convergence 001 — 30 PASS / 0 FAIL`
- `Runtime Empirical Run 001 — 11 PASS / 0 FAIL`

Origin draft: `layers/authority/drafts/runtime-control-plane-authority-profile.md`.

## Problem

AB-002 defines six grant profiles but none explicitly covers consequential operation of Imperium's own Runtime or a Runtime acting on an externally controlled environment.

Mission Envelope, Capability Tool, and Capability Access grants are mission-scoped and do not safely generalize to deployment, activation, migration, rollback, or recovery.

Technical control and credential possession are not Authority Bases.

## Profile

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
Discretion mode
Permitted diagnosis and Procedure references when discretion is bounded
Maximum repeat, resource, time, and consequence limits
Required escalation conditions
Required safe state
Prohibited actions
```

## Action Classes

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

Consequential control-plane action changes an operating environment or controlled resource.

The represented Principal therefore requires `CONTROLLED_RESOURCE`, `DELEGATED_AUTHORITY`, or `LEGAL_OR_CONTRACTUAL_AUTHORITY` as applicable.

This is true even when the environment is used only for internal Imperium development.

`IMPERIUM_STEWARDSHIP` governs internal definitions, admissions, and placements. It does not by itself establish control of a machine, account, deployment environment, credential store, or external resource.

One Principal may hold both bases, but they remain distinct and independently traceable.

## Intersections

A control-plane action may also require:

- CAPABILITY_ACCESS for authenticated access
- CAPABILITY_TOOL for a specific administrative tool
- MISSION_ENVELOPE when the action is itself part of one mission
- IMPERIUM_STEWARDSHIP when the action also changes an admitted internal definition or placement

These intersections do not merge grants or Authority Bases.

## Delegation

Default delegation: prohibited.

Automation may be the bounded grantee or acting surface. Automation does not become the Principal and cannot widen, renew, or reinterpret the grant.

## Operational Discretion Modes

A CONTROL_PLANE grant must select one mode:

```text
EXECUTE_EXACT_INSTRUCTION
BOUNDED_MAINTENANCE_DISCRETION
```

### EXECUTE_EXACT_INSTRUCTION

The grantee may perform only the exact externally selected action.

This mode is required when the action changes semantic mappings, migrates incompatible state, accepts irreversible consequence, resolves cross-mission priority, or otherwise requires a substantive decision outside routine maintenance.

### BOUNDED_MAINTENANCE_DISCRETION

The grantee may select among enumerated maintenance actions only when:

- a cited Master Mason diagnosis matches an enumerated finding
- a cited Runtime Maintenance Procedure permits the response
- environment, component, action class, and limits match exactly
- no semantic mapping or historical meaning changes
- no indeterminate effect is assumed resolved
- escalation conditions are absent
- each attempt receives a fresh Authority finding

This mode may support Master Mason's operator/mechanic function.

It is not general executive decision authority.

## Dispatch Freshness

The Authority finding must be re-evaluated immediately before every consequential control-plane effect, including retry, rollback, and recovered continuation.

Plan approval, prior success, maintenance-window entry, or queued status does not preserve Authority.

## Prohibited Inference

```text
administrator access ≠ CONTROL_PLANE authority
Imperium stewardship ≠ control of an operating environment
deployed ≠ authorized to activate
ability to roll back ≠ authorized rollback
incident urgency ≠ recovery authority
credential possession ≠ permission
successful migration ≠ authorized migration
```

## Minimality Finding

CONTROL_PLANE is distinct from the six admitted profiles because its object is the operating substrate and its actions alter implementation availability, mapping, state, or custody.

This contract adds `CONTROL_PLANE` as the seventh Authority profile in AB-003. It grants no actual authority.
