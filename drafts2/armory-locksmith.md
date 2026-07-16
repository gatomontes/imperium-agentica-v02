# Armory and Locksmith

## Status

Draft.

This file defines provisional deployment-support artifacts for Imperium v02.

It does not admit real credential management, tool execution, external integrations, secrets storage, or permission system implementation.

---

## Purpose

The Armory and Locksmith support the Muster during deployment preparation.

The Armory concerns tools.

The Locksmith concerns keys and access.

Both are dangerous because they touch capability and external power.

They support initial Muster assembly internally and continuing deployed operations through Barbican.

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

The Locksmith retains credentials and performs authorized access, unlock, or authenticated operations required by a deployment. Credentials do not pass to the operative, Barbican, Muster, or Theatre.

For now, keys are conceptual and provisional.

### Core Question

```text
What access is required, permitted, denied, or constrained for this mission?
```

### Possible Outputs

- ticket or entitlement requirement
- performed authenticated operation
- opaque session or permitted result
- credential requirement
- permission boundary
- access denial
- expiration condition
- revocation condition
- lock state note

### Non-Authority

The Locksmith must not:

- decide mission purpose
- choose tools
- select operatives
- launch deployments
- create real credentials without explicit implementation authority
- decide mission returns

---

## Relationships To Muster And Barbican

The Muster requests tool and key support as part of Deployment Package assembly.

For continuing missions, deployed operatives present tool or access tickets through Barbican. Barbican forwards them to the appropriate provider and returns the provider's result or refusal.

Armory and Locksmith do not launch. Barbican does not fulfill. Muster does not mediate continuing requests.

---

## Boundary Maxims

```text
Armory equips.
Locksmith unlocks.
Muster assembles initial mission requirements.
Barbican exposes continuing provider access.
Armory supplies or performs tools.
Locksmith retains credentials and performs unlocks.
Capability is not authorization.
```

---

## Failure Signals

Review or revise this draft if:

- tools are issued because they are available rather than authorized
- keys become permanent authority
- access is implied rather than explicit
- Armory or Locksmith begin deciding mission scope
- real credential behavior is implied before implementation authority exists


## Intervention Ledgers

Armory and Locksmith preserve append-only, mission-correlated records of every operative intervention request, provider decision, attempted operation, result, refusal, and failure.

Locksmith records credential-backed operations without storing credential values in the intervention record.

Standing Curia Liaisons may issue mission-scoped, read-only queries against their respective provider ledger.

Liaisons do not perform, authorize, alter, or interpret interventions.
