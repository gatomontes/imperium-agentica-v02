# Provider-Neutral Deployment Authorization Contract

## Status

Draft B1.1 candidate only.

This contract does not revise `AB-003`, issue a live grant, authenticate a deployer, acquire credentials, assemble a Deployment Package, declare `READY_FOR_LAUNCH`, invoke Runtime, or deploy anything.

## Canonical Dependencies

- `layers/authority/production/authority-origin-contract.md`
- `layers/authority/production/authority-grant-profiles.md`
- `layers/authority/production/mission-envelope.md`
- `layers/authority/production/capability-tool-and-access-grants.md`
- `layers/provenance/production/provenance-contract.md`
- `layers/provenance/production/mission-correlation-and-isolation-contract.md`
- `layers/procedure/production/imperium-lifecycle-procedure.md`
- `layers/cognitive/production/muster.md`
- `layers/cognitive/drafts/operative-creation-handoff-contract.md`
- `layers/cognitive/drafts/creation-lineage-handoff-conformance-contract.md`

The Cognitive draft dependencies are merged theoretical evidence, not admitted production semantics.

## Native Concern

Authority owns permission and grant effectiveness.

Cognitive contracts own Operative meaning, creation closure, handoff assessment, mission binding, assembly, and `READY_FOR_LAUNCH`. Provenance owns identity, correlation, lineage, and `AUTHORIZED_UNDER` assertions without validating grants. Procedure owns ordering and cannot create permission. Runtime may later enforce an admitted decision but cannot originate it.

No new Deployment layer, service, registry, institution, or autonomous authorizer is justified by this candidate.

## Core Distinctions

```text
HANDOFF_CONFORMANT ≠ deployment authorization
creation closure ≠ deployment authorization
Mission Envelope ≠ exact deployment authorization
Tool Grant ≠ deployment authorization
Access Grant ≠ authentication
authentication evidence ≠ authorization
DEPLOYMENT_AUTHORIZED ≠ mission binding
DEPLOYMENT_AUTHORIZED ≠ READY_FOR_LAUNCH
DEPLOYMENT_AUTHORIZED ≠ credential acquisition
DEPLOYMENT_AUTHORIZED ≠ deployment execution
provider acceptance ≠ Authority source
```

## Core Question

```text
May one exact identified deployer make one exact eligible Operative version
available for one bounded deployment purpose, target scope, environment,
and mission correlation during one effective interval under one competent
Authority basis, without selecting a provider, credential store, Runtime
driver, or deployment mechanism?
```

## Deployment Authorization Grant

A Deployment Authorization Grant is a versioned Authority artifact for one exact authorization decision.

Minimum semantic content:

```text
Grant identity and version
Authority profile: DEPLOYMENT_AUTHORIZATION
Represented Principal
Authority Basis and competent authorizer identity
Parent Mission Envelope or explicit pre-binding basis
Exact deployer identity and role basis
Exact Operative identity and version
Required current creation-closure and handoff findings
Permitted deployment action class
Deployment purpose
Target class and bounded target scope
Environment classification
Mission Identity and correlation when mission-scoped
Permitted deployment-medium class
Prohibited actions and targets
Effective-from and expiry conditions
Suspension, withdrawal, revocation, contest, and supersession
Delegation rule
Authentication requirement class and evidence requirements
Credential class references without values or custody assignment
Required Tool and Access Grant references when separately applicable
Authority-loss safe-state instruction when required
Required provenance findings
Known blockers and unresolved conditions
Status
```

This is a semantic Authority contract, not a runtime permission token, provider policy, credential, deployment manifest, or execution request.

## Permitted Action Class

B1.1 introduces one draft action class for pressure only:

```text
AUTHORIZE_OPERATIVE_DEPLOYMENT
```

It permits only the exact bounded deployment eligibility represented by the grant.

It does not imply or include:

```text
BIND_OPERATIVE
INITIAL_EXTERNAL_CROSSING
CONTINUING_EXTERNAL_INSTRUCTION
credential retrieval or disclosure
provider account mutation
Deployment Package assembly
launch, activation, execution, or external effect
```

A later admission investigation must decide whether this action belongs in the Mission Envelope vocabulary, a distinct Authority profile, or a bounded child grant. B1.1 does not revise production action classes.

## Eligibility Inputs

A conformant grant requires exact current references to:

- one Operative identity and version
- `CREATION_CLOSURE_CONFORMANT` for that exact version
- `HANDOFF_CONFORMANT` for that exact version
- deployment-medium and technical-contract identity and version
- declared dependency, resource, and secret classes without live values
- applicable Mission Identity, Work Specification, and Operative Binding references when already formed
- required PB-001 identity, correlation, derivation, citation, and supersession findings

A conformant creation or handoff finding does not compel authorization. It establishes eligibility evidence only.

## Scope And Parent Rules

```text
Deployment Authorization scope ⊆ competent Authority Basis
mission-scoped authorization ⊆ exact Mission Envelope scope
target scope ⊆ granted environment and resource bounds
duration ≤ parent duration
delegation ≤ parent delegation
parent invalidation → dependent authorization unavailable
Operative version change → authorization unavailable for the new version
```

Where mission binding does not yet exist, the grant must state the exact pre-binding basis and must not fabricate a Mission Identity, Deployment identity, or Operative Binding.

## Authentication Boundary

The grant may require proof that the presented deployer is the authorized deployer.

It may specify provider-neutral authentication requirements such as:

- identity class
- assurance level
- freshness interval
- audience or target binding
- challenge or replay resistance requirement
- evidence identity and verification finding
- failure, expiry, and revocation behavior

The grant does not:

- choose an identity provider
- choose a credential store
- define a credential format
- contain credential values
- assign secret custody
- perform authentication
- treat successful authentication as permission

Authentication evidence is separately necessary when required and never sufficient for authorization.

## Findings

A bounded Deployment Authorization Assessment may classify one exact grant candidate:

```text
DEPLOYMENT_AUTHORIZED
DEPLOYMENT_AUTHORIZATION_REFUSED
DEPLOYMENT_AUTHORIZATION_UNRESOLVED
```

These are Authority findings, not Operative states, Procedure transitions, provider results, Runtime states, or deployment outcomes.

`DEPLOYMENT_AUTHORIZED` requires every mandatory identity, version, scope, parent, time, prohibition, authentication requirement, revocation condition, and provenance finding to be exact and current.

Known prohibition or competent denial yields refused. Missing, contested, stale, mismatched, or unverifiable material evidence yields unresolved.

Silence, prior success, provider acceptance, credential possession, and technical capability never imply authorization.

## Temporal And Revocation Rules

Authorization is unavailable before its effective condition and after expiry, withdrawal, revocation, supersession, parent invalidation, Operative-version change, or material scope change.

Suspension blocks new deployment action while preserving the historical grant and findings.

Revocation does not prove that a prior external effect was reversed. Safe-state or rollback permission must be independently represented.

## Provenance Boundary

PB-001 records exact grant identity, version, source, authorizer, subject, correlation, and `AUTHORIZED_UNDER` relations.

Provenance cannot validate the authorizer, repair a missing grant, or infer scope from similarity. Every authorization assessment must cite exact required provenance findings.

## Procedure Boundary

Procedure may require a current `DEPLOYMENT_AUTHORIZED` finding before a later deployment-eligibility transition.

Procedure may not create, expand, renew, repair, revoke, or infer the grant. This candidate defines no new Procedure stage or automatic transition.

## Cognitive And Muster Boundary

Muster retains mission binding, assembly, the Deployment Package, and `READY_FOR_LAUNCH`.

A Deployment Authorization Grant does not bind an Operative, assemble tools or access, obtain credentials, or establish assembly readiness. Conversely, `READY_FOR_LAUNCH` does not substitute for deployment authorization.

## Runtime And Provider Boundary

Runtime and providers may later receive a least-data projection of admitted authorization evidence.

They do not become the source of Authority. Provider entitlement, authentication, acceptance, dispatch, completion, or error observations cannot create or enlarge the grant.

## Invalidation And Repair

Material change to the Operative, handoff finding, Authority Basis, Principal, deployer, action, purpose, target, environment, mission correlation, time bounds, authentication requirement, parent grant, or prohibition invalidates dependent future use.

Repair returns to the native owner. Authority repair creates a new grant version and exact supersession. Cognitive or Provenance defects return to their native owners. Historical evidence remains preserved.

## Non-Admissions

This draft admits no:

- live Principal, authorizer, deployer, grant, permission, authentication, credential, or custody
- provider, secret store, identity provider, Runtime driver, deployment mechanism, or external integration
- Mission Envelope revision, production Authority profile, Procedure transition, Runtime implementation, or provider call
- Operative Binding, Muster Instance, Deployment Package, `READY_FOR_LAUNCH`, commissioning, activation, deployment, rollback, or external effect
- new layer, institution, service, registry, token format, API, database, or state machine

## Failure Signals

Reject or revise this draft if it:

- treats handoff, readiness, capability, credentials, authentication, or provider acceptance as authorization
- permits an unspecified deployer, Operative version, action, target, environment, mission, or interval
- allows child scope to exceed its Authority Basis or parent
- embeds credential values or selects authentication infrastructure
- lets Procedure, Provenance, Runtime, Muster, Locksmith, or a provider originate Authority
- turns authorization into mission binding, assembly, launch, execution, or deployment
- silently transfers a grant across changed versions or missions
- creates a universal deployment layer or premature implementation choice
