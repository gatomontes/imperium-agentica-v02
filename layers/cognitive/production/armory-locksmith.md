# Armory and Locksmith

## Canonical Dependencies

This Cognitive contract cites the following admitted contracts as external canonical definitions; it does not originate or redefine them:

- `layers/authority/production/capability-tool-and-access-grants.md`
- `layers/provenance/production/mission-correlation-and-isolation-contract.md`
- `layers/provenance/production/provider-intervention-ledgers.md`

## Status

Admitted under Cognitive Baseline `CB-CURRENT`.

Admission evidence:

- `tests/cognitive/b2-3-cb-007-locksmith-sole-accessor-pressure-run-001.md` — 22 PASS / 0 FAIL
- `tests/cognitive/b2-3-cb-007-authority-cognitive-convergence-review-001.md` — 15 PASS / 0 FAIL
- `tests/cognitive/b2-3-cb-007-provenance-cognitive-convergence-review-001.md` — 15 PASS / 0 FAIL
- `tests/cognitive/b2-3-cb-007-production-admission-run-001.md` — 24 PASS / 0 FAIL
- `drafts/b2-3-cb-007-production-admission-review-001.md` — 16 PASS / 0 FAIL

CB-CURRENT revises CB-CURRENT only at the Locksmith sole-accessor boundary.

It does not admit a real credential manager, persistence device, adapter implementation, external integration, tool execution, permission system, Runtime custody mechanism, or live credential behavior.

## Purpose

The Armory and Locksmith support Muster during deployment preparation and continuing deployed operations through Barbican.

The Armory concerns tools.

The Locksmith concerns keys, credential responsibility, and authorized access.

Both are dangerous because they touch capability and external power.

---

## Armory

### Purpose

The Armory supplies tools, resources, instruments, or allowed capabilities to an operative deployment.

### Core Question

```text
What tools may this operative use for this mission?
```

### Possible Outputs

- tool list
- tool constraints
- allowed resources
- denied tools
- usage conditions
- tool risk notes

### Non-Authority

The Armory must not:

- decide mission purpose
- select operatives
- issue access credentials
- launch deployments
- authorize tools beyond mission constraints preserved by Muster
- judge mission returns

---

## Locksmith

### Purpose

Locksmith retains responsibility for credential material and performs authorized access, unlock, or authenticated operations required by a deployment.

Credential material does not pass to the operative, Barbican, Muster, or Theatre.

Locksmith is the sole Imperium accessor to the security-persistence device.

### Security-Persistence Device

A security-persistence device is any mechanism that stores, derives, retrieves, rotates, revokes, or otherwise persists credential material or security-sensitive access material.

The concrete technology remains unselected.

The device and its adapter are replaceable implementation details behind Locksmith. No other Imperium institution, Runtime component, provider adapter, operative, Muster instance, Barbican component, or Theatre component may possess or exercise:

- a device client or device credential
- a device connection string or endpoint authority
- a backend-native path, key, field, query, or policy
- a device authentication method
- direct read, write, configuration, rotation, revocation, observation, or administration authority

Runtime credential custody is not device access.

Technical capability to reach the device is not authority to do so.

### Core Question

```text
What exact access outcome is required,
permitted by an Authority-produced finding,
properly correlated,
and safe to fulfill or refuse?
```

### Request Boundary

A caller may present only:

- an admitted operation identity and version
- a non-secret reference to an Authority-produced exact-match Access finding
- exact Mission, Deployment, Operative Binding, ticket, provider, and correlation references required by admitted Provenance
- non-secret operation parameters already bounded by the cited finding
- expiry, revocation, and other non-secret constraints represented by the applicable contracts

A caller must not select or supply:

- the persistence technology or adapter
- a backend-native address, path, key, field, query, template, or policy
- a device credential, bootstrap secret, token, or authentication method
- an administrative or diagnostic operation not represented by the admitted operation identity
- a value capable of independently authenticating to the device

Before device access, Locksmith requires the applicable Authority-produced exact-match Access finding and matching Provenance correlation.

Locksmith enforces those cited findings as preconditions. It does not originate, repair, expand, or independently decide Authority validity or Provenance sufficiency.

### Preferred Fulfillment

The preferred outcome is a Locksmith-performed authenticated operation.

For initial Muster assembly, Locksmith returns only a permitted non-secret, non-replayable result, minimum permitted correlation metadata, or a generic external refusal.

For continuing Barbican traffic, Locksmith may return the permitted operation result, but it must contain no credential material, device credential, device session, backend-native detail, or value capable of independently authenticating to the persistence device or external provider.

This contract does not define the substantive data classification of a permitted provider result. Other admitted contracts remain controlling.

### Exceptional Runtime Custody

If an external provider cannot be used through a Locksmith-performed operation, credential material may leave Locksmith only through a separately admitted execution-local Runtime custody mechanism.

That mechanism must be bound, expiring, one-use, non-serializable, non-loggable, and incapable of addressing, authenticating to, querying, configuring, or resolving against the security-persistence device.

Eligibility for such a mechanism is not admission of that mechanism.

### Failure Boundary

Device outage, unknown state, indeterminate access, or adapter failure produces a generic external refusal without credential, device, or backend-detail leakage.

Generic external refusal does not erase internal evidence.

Locksmith produces the permitted non-secret intervention observation so the admitted Provenance contract can preserve failure stage, failure class, unknown or pending state, correlation, and supersession without credential values.

### Possible Outputs

- ticket or entitlement requirement
- performed authenticated operation
- permitted result containing no credential or independently authenticating material
- generic external refusal
- credential-class requirement without credential value
- permission boundary
- expiration condition
- revocation condition
- lock-state note
- permitted non-secret intervention observation

### Non-Authority

Locksmith must not:

- decide mission purpose
- choose tools
- select operatives
- launch deployments
- originate, repair, expand, or independently decide an Access Grant
- infer permission from credential possession, device access, provider acceptance, or technical capability
- create real credentials without explicit implementation authority
- decide mission returns

---

## Relationships To Muster And Barbican

Muster requests tool and access support as part of Deployment Package assembly.

For continuing missions, deployed operatives present tool or access tickets through Barbican. Barbican routes tool traffic to Armory and access traffic only to Locksmith. It never routes to the persistence device or its adapter.

Armory or Locksmith may interact with an external provider within admitted authority and correlation constraints. Only Locksmith may access the security-persistence device.

Armory and Locksmith do not launch. Barbican does not fulfill. Muster does not mediate continuing requests.

---

## Boundary Maxims

```text
Armory equips.
Locksmith unlocks.
Muster assembles initial mission requirements.
Barbican exposes continuing provider access.
Armory supplies or performs tools.
Locksmith alone accesses security persistence.
Locksmith retains credentials and preferably performs authenticated operations.
Runtime custody is not device access.
Capability is not authorization.
Generic external refusal does not erase internal provenance.
```

---

## Failure Signals

Review or revise this contract if:

- tools are issued because they are available rather than authorized
- keys become permanent authority
- access is implied rather than explicit
- Armory or Locksmith begin deciding mission scope
- another component can address or authenticate to the persistence device
- callers can supply backend-native addressing or administration
- Locksmith decides Authority validity or Provenance sufficiency
- Runtime custody can be replayed or used against the persistence device
- a result contains credential, device-session, or independently authenticating material
- external failure reveals credential or backend details
- generic refusal erases permitted intervention evidence
- real credential behavior is implied before implementation authority exists

## Intervention Ledgers

Canonical definition: `layers/provenance/production/provider-intervention-ledgers.md`.

Armory and Locksmith produce provider intervention events and expose only the mission-scoped, read-only views permitted by PB-001.

This Cognitive contract requires the observation but does not define ledger stages, lineage completeness, query semantics, corrections, or Provenance findings.
