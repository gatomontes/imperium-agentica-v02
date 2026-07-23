# Secret Custody and Adapter Boundary 001

## Status

Unadmitted Runtime draft candidate.

This contract defines a provider-neutral Runtime boundary. It does not select or implement a secret store, identity provider, protocol, credential format, adapter, Runtime driver, or deployment mechanism.

## Canonical Dependencies

- Cognitive responsibility: `layers/cognitive/production/armory-locksmith.md`
- continuing support port: `layers/cognitive/production/barbican.md`
- mission assembly: `layers/cognitive/production/muster.md`
- Access Authority: `layers/authority/production/capability-tool-and-access-grants.md`
- Mission Authority: `layers/authority/production/mission-envelope.md`
- Provenance: `layers/provenance/production/provenance-contract.md`
- provider observations: `layers/provenance/production/provider-intervention-ledgers.md`
- Runtime dispatch: `layers/runtime/production/runtime-realization-and-dispatch-contract.md`
- Runtime observations: `layers/runtime/production/runtime-observation-envelope.md`
- lifecycle ordering: `layers/procedure/production/imperium-lifecycle-procedure.md`
- deployment-policy evidence: B1.1–B1.3 closure set
- measurement direction: `deliberations/controls/pending/CTRL-006-control-measurement-contract.md`

## Core Question

How may Runtime obtain and use credential material for one authorized operation without transferring custody, inventing Authority, leaking the secret, or converting provider acceptance into permission or mission success?

## Core Invariants

```text
credential availability ≠ permission
credential possession ≠ Access Grant
Access Grant ≠ credential value
provider acceptance ≠ Authority
credential resolution ≠ authentication
authentication ≠ operation completion
operation completion ≠ mission success
secret reference ≠ secret value
technical custody ≠ semantic ownership
```

Credential material never enters:

- the operative cognitive context;
- the Deployment Package;
- Muster;
- Barbican;
- Iron Gate;
- Theatre mission content;
- Provider Intervention Ledgers;
- Runtime Observation Envelopes;
- ordinary logs, errors, traces, metrics, or evidence artifacts.

## Native Ownership

### Cognitive

Locksmith owns the responsibility to fulfill or refuse an authorized access or authenticated-operation request while retaining credential custody.

Cognitive responsibility does not define the storage, lease, transport, memory, zeroization, or adapter mechanism.

### Authority

Authority owns the effective permission for the exact requested action.

An Access Grant references a credential class without containing credential value.

When credential use realizes deployment, the exact current B1 deployment-policy prerequisite set is additionally required. Continuing provider support remains bounded by its applicable Mission Envelope and Access Grant.

### Provenance

Provenance owns credential-binding identity, custody and handoff lineage, correlation, version, transformation, and supersession relations.

Provenance records no credential value.

### Procedure

Procedure may require credential resolution, authenticated operation, refusal, wait, retry, revocation, or termination in an admitted order.

Procedure does not define the credential, grant, custody mechanism, evidence sufficiency, or Runtime state machine.

### Runtime

Runtime owns:

- secret-store adapter mechanics;
- technical custody at rest, in transit, and in use;
- non-secret binding-to-store mappings;
- lease mechanics;
- process and memory isolation;
- injection into the exact provider operation;
- redaction and secret-safe failure handling;
- version pinning;
- cache prohibition or explicitly admitted bounded cache realization;
- rotation and revocation mechanics;
- outage, timeout, recovery, and indeterminate handling;
- Runtime-native secret-handling observations.

Runtime may enforce cited contracts. It cannot originate or repair them.

### Store and Target Provider

The store may hold credential material and emit provider-native observations. It does not grant Imperium permission.

The authenticated target may receive protocol-required authentication material only inside the exact authorized transport operation. It does not become the credential's semantic owner, and its acceptance does not validate Authority.

## Native Runtime Artifacts

### Secret Binding Reference

A stable non-secret reference connecting:

- exact secret class;
- store-side subject reference;
- credential generation or version reference;
- permitted adapter identity and version;
- intended provider or access domain;
- mission or bounded non-mission scope;
- applicable expiry, rotation, revocation, and supersession references.

It must not be usable as authentication material.

### Secret Operation Request

A non-secret request containing:

```text
request identity
mission or bounded non-mission scope
deployment and Operative Binding when applicable
ticket or realization identity
exact requested operation and target
Secret Binding Reference
applicable Mission Envelope
applicable Access Grant
current deployment-policy finding when deployment is being realized
Procedure transition when applicable
required Provenance correlation
idempotency or effect identity
effective interval
requesting responsibility
```

The request contains no secret value.

### Custody Execution Context

A Runtime-confined, non-exportable context for resolving and using credential material for one exact request.

The context:

- is bound to one request, operation, target, adapter version, and effect identity;
- cannot be transferred to an operative or another mission;
- expires no later than every controlling grant, binding, authorization, or store lease;
- is unavailable after revocation, supersession, mismatch, contest, or unresolved correlation;
- emits only redacted observations;
- destroys or renders inaccessible transient material at completion, refusal, timeout, crash, or recovery boundary.

A reusable bearer token, replayable session handle, or independently authenticating opaque value remains credential material. Renaming it a handle does not permit export.

### Access Result

The requester may receive only:

- the authorized operation's permitted non-secret result;
- a refusal;
- a pending or unknown result;
- a non-secret, non-replayable correlation reference.

The requester does not receive credential material or a substitute bearer capability.

### Secret Handling Observation

Runtime emits a Runtime Observation Envelope with class `SECURITY_HANDLING` for material events such as:

- binding resolution attempted;
- lease obtained or refused;
- credential generation selected;
- authenticated submission attempted;
- secret-safe redaction completed or failed;
- rotation, revocation, expiry, or supersession observed;
- transient material cleanup completed or uncertain;
- store unavailable, timed out, or returned indeterminate status.

The observation records references and results, never values.

Provider stages remain preserved separately by the Provider Intervention Ledger.

## Acceptance Gate

Runtime may accept a Secret Operation Request only when:

- the exact request and controlling contract versions are explicit;
- Cognitive responsibility is identified;
- the exact applicable Authority findings are current and effective;
- deployment-policy convergence is current when the operation realizes deployment;
- the Access Grant's system, resource, operation, target, credential class, scope, and interval match;
- mission, deployment, binding, ticket, provider, request, attempt, and effect correlation are exact when applicable;
- the Secret Binding Reference is current and maps without exposing value;
- the adapter and mapping versions are pinned;
- no prohibition, revocation, contest, expiry, supersession, or unresolved contradiction applies.

Failure refuses closed. Runtime does not search for a similar credential or broader grant.

## Lease and Lifetime

A store lease or Runtime custody interval must be the intersection of every controlling lifetime.

```text
effective custody interval
⊆ store lease
∩ Secret Binding validity
∩ Access Grant validity
∩ Mission Envelope validity
∩ Operative Binding validity when applicable
∩ Deployment Authorization validity when applicable
∩ request validity
```

Expiry of any controlling condition makes the context unavailable.

A queued, delayed, retried, or recovered request must re-evaluate the full gate before resolving credential material again.

## Rotation and Supersession

Rotation creates a distinct credential generation and updated Secret Binding version.

Runtime must not silently replace one generation with another inside an already accepted request unless:

- the binding contract explicitly permits the transition;
- exact Authority and scope remain effective;
- Provenance preserves supersession;
- replay, idempotency, and indeterminate-effect safety remain satisfied.

Old and new generations must not be collapsed as one identity.

## Revocation

Revocation makes future resolution and use unavailable.

Runtime must:

- reject new requests using the revoked binding;
- invalidate any local non-secret lease mapping;
- end or contain active custody contexts where technically possible;
- record provider/store revocation observations without inferring completion;
- preserve uncertainty when provider-side invalidation cannot be established.

Revocation observation is not proof that every external copy or session ceased to function.

## Outage and Recovery

Store outage, timeout, authentication failure, unavailable generation, or indeterminate response produces explicit refusal, block, or quarantine.

Runtime must not:

- fall back to another credential by similarity;
- use an unadmitted cache;
- broaden scope;
- treat prior resolution as current;
- log secret material for diagnosis;
- retry an indeterminate authenticated effect automatically.

Recovery rechecks all current contracts, correlation, versions, Authority, and effect state.

## Cache Boundary

Provider-neutral default:

```text
no durable credential cache is admitted
```

A future bounded cache would require separate necessity, threat, lifetime, encryption, invalidation, recovery, observation, and empirical evidence. Store selection cannot assume it.

## Redaction and Error Boundary

Secret material must be excluded before serialization to any durable or transferable observation.

If redaction status is unknown or redaction fails:

- the observation is quarantined;
- downstream delivery is withheld;
- the incident is surfaced without reproducing the suspected value;
- the credential is treated as potentially exposed;
- applicable revocation and incident procedures are required.

A diagnostic need never authorizes secret disclosure.

## Existing Cognitive Convergence Blocker

CB-005 contains contradictory Muster language:

- `armory-locksmith.md` says credentials do not pass to Muster;
- `barbican.md` says Barbican does not carry credentials;
- `muster.md` says Muster receives “authorized credentials” and lists “Credentials / access issued” inside the Deployment Package.

This draft resolves the candidate boundary in favor of non-secret binding and ticket references only.

Production convergence requires a separately tested Cognitive correction before store selection or implementation.

## Non-Admissions

This draft admits no:

- store, provider, protocol, credential format, encryption scheme, cache, identity service, or SDK;
- secret value, binding, lease, credential, account, session, or external access;
- production semantic change;
- implementation, Runtime action, deployment, or external effect;
- universal custody institution or new layer.
