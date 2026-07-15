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

The Locksmith supplies keys, credentials, access bindings, permission constraints, or lock/unlock conditions required for a deployment.

For now, keys are conceptual and provisional.

### Core Question

```text
What access is required, permitted, denied, or constrained for this mission?
```

### Possible Outputs

- key/access list
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

## Relationship To Muster

The Muster requests tool and key support as part of Deployment Package assembly.

Armory and Locksmith do not launch by themselves.

---

## Boundary Maxims

```text
Armory equips.
Locksmith unlocks.
Muster assembles.
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
