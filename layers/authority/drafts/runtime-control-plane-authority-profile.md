# Runtime Control-Plane Authority Profile

## Status

Candidate revision to the admitted CONTROL_PLANE Authority profile.

Not admitted. AB-003 production remains canonical.

Investigation: `Runtime Maintenance Artifact Closure 001`.

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
Permitted Runtime Operational Diagnosis findings and response indications when discretion is bounded
Permitted `INSTRUCT_MAINTENANCE` constraints when discretion is bounded
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

This remains true for an internal Imperium development environment.

`IMPERIUM_STEWARDSHIP` governs internal definitions, admissions, and placements. It does not by itself establish control of a machine, account, deployment environment, credential store, or external resource.

## Intersections

A control-plane action may also require:

- CAPABILITY_ACCESS for authenticated access
- CAPABILITY_TOOL for a specific administrative tool
- MISSION_ENVELOPE when the action belongs to one mission
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

The grantee may perform only the exact externally selected instruction named by the grant or a separately effective instruction source.

This mode is required when the action changes semantic mappings, migrates incompatible state, accepts irreversible consequence, resolves cross-mission priority, or otherwise requires substantive choice outside routine maintenance.

A Master Mason escalation cannot become an exact instruction merely because it describes available mechanical options.

### BOUNDED_MAINTENANCE_DISCRETION

This mode permits Master Mason to select `INSTRUCT_MAINTENANCE` only when:

- a cited Runtime Operational Diagnosis matches an enumerated condition finding and response indication
- a cited Runtime Maintenance Procedure permits the post-diagnosis path
- environment, component, action class, implementation and mapping bounds, and limits match exactly
- PB-001 correlation is current and exact
- no indeterminate effect is assumed resolved or repeated
- no semantic mapping, incompatible state, historical meaning, or cross-mission priority is changed
- competence, reversibility, consequence, safe-state, and escalation conditions remain satisfied

`NO_INTERVENTION`, `WITHHOLD_MAINTENANCE`, and `ESCALATE_STRUCTURAL_CONDITION` require no CONTROL_PLANE permission because they authorize no consequential Runtime effect.

Master Mason must remain able to withhold or escalate when CONTROL_PLANE Authority is absent, expired, mismatched, or insufficient.

Those forms do not create permission, alter the environment, or cure the missing Authority.

`INSTRUCT_MAINTENANCE` may proceed only within the exact action class and limits already authorized by the grant.

This mode is not general executive decision authority.

## Diagnosis And Disposition Boundary

```text
diagnosis ≠ Authority
Authority ≠ maintenance direction
maintenance direction ≠ renewed Authority
grant permits a bounded instruction choice ≠ grant chooses the instruction
absence of CONTROL_PLANE Authority ≠ inability to withhold or escalate
```

Master Mason owns diagnosis and disposition. Authority determines whether the exact action is permitted.

## Dispatch Freshness

The Authority finding must be re-evaluated immediately before every consequential control-plane effect, including retry, rollback, and recovered continuation.

Runtime must cite the exact current `INSTRUCT_MAINTENANCE` disposition when the effect arises from Master Mason maintenance.

Plan approval, diagnosis, disposition creation, prior success, maintenance-window entry, or queued status does not preserve Authority.

## Prohibited Inference

```text
administrator access ≠ CONTROL_PLANE authority
Imperium stewardship ≠ control of an operating environment
diagnosed need ≠ permitted action
maintenance disposition ≠ Authority
deployed ≠ authorized to activate
ability to roll back ≠ authorized rollback
incident urgency ≠ recovery authority
credential possession ≠ permission
successful migration ≠ authorized migration
```

## Minimality Finding

This candidate adds no new Authority profile.

It revises the admitted CONTROL_PLANE profile only enough to cite the separated Runtime Operational Diagnosis and Runtime Maintenance Disposition semantics.

## Non-Admissions

This candidate grants no actual authority and authorizes no environment, credential, implementation, provider, service, or control-plane action.
