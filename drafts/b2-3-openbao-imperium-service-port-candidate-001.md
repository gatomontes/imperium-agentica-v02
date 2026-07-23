# B2.3 OpenBao Imperium Service-Port Candidate 001

## Status

Repository decision-and-pressure candidate. Not implemented, admitted, deployed, or connected to OpenBao.

## Authorization

Operator direction:

> Option 4- modify OpenBao with a Imperium-service-port that does what we say.

This selects a server-side Imperium operation boundary instead of exporting a reusable OpenBao token to Imperium.

It does not authorize a running instance, real credential, network contact, plugin installation, OpenBao fork, deployment, or external effect.

## Constitutional Purpose

The service port has exactly one purpose:

> Resolve one already admitted credential binding inside OpenBao and return its exact selected material into the existing Runtime one-use lease without exporting OpenBao session authority.

If the port vanished, Imperium would again need to own a reusable OpenBao token or another client-side session mechanism.

## Authority Boundary

The port does not decide whether a Runtime operation is authorized. Existing Imperium Authority, Access Grant, correlation, target, adapter, effect, and version gates remain prerequisites before acquisition is attempted.

The port enforces a second, narrower technical boundary: a presented one-use bootstrap proof may activate only one statically configured OpenBao operation.

Credential availability remains distinct from permission.

## Candidate Shape

```text
Imperium admitted operation
  -> one-use wrapped bootstrap proof
  -> fixed Imperium workflow endpoint
  -> internal unwrap
  -> internal AppRole login
  -> internal token
  -> fixed exact-version KV v2 read
  -> internal token revocation
  -> selected value only
  -> existing asynchronous acquisition
  -> existing bound, expiring, one-use Runtime lease
  -> unchanged synchronous consume and provider dispatch
```

## Fixed Surface

Runtime may select an opaque admitted binding identifier only by choosing a fixed service-port endpoint already configured for that binding.

Runtime may not provide:

- an OpenBao API path;
- an HTTP method;
- a mount;
- a KV path;
- a field selector;
- an implicit or caller-chosen latest version;
- a policy;
- a RoleID;
- a workflow document;
- CEL or template expressions;
- an OpenBao client token.

The exact mount, path, field, version, AppRole, and output selection live in the operator-managed workflow definition.

## Workflow Administration

- workflow creation and updates are privileged operator actions;
- check-and-set is required for updates;
- workflow definitions are versioned repository artifacts;
- the deployed definition digest is evidence;
- Runtime cannot list, read, create, update, delete, or trace workflows;
- only the intended acquisition workflow may allow execution without a pre-existing OpenBao client token;
- the service remains on the private/restricted OpenBao API.

## Failure Ordering

Successful output is permitted only after successful token revocation.

Any unexpected step failure stops the sequence and produces one generic acquisition refusal. If a read succeeds but revocation fails, no value is returned; the internal token remains an explicit uncertainty until its short TTL expires or operator evidence confirms revocation.

A consumed wrapping token is never retried. Recovery requires a new one-use bootstrap proof and complete revalidation of the Imperium operation before a new acquisition.

## Supported-Surface Hierarchy

1. OpenBao 2.6.1 workflow over the Profiles engine.
2. Checksum-pinned external plugin if workflow pressure demonstrates a missing enforcement primitive.
3. OpenBao core fork only if both supported extension mechanisms are proven insufficient and the security-maintenance burden is separately accepted.

Calling the mechanism an Imperium Service Port does not imply a new constitutional office. It is an internal Runtime/OpenBao mechanism.

## Required Executable Pressure

The next candidate must prove with synthetic fixtures:

1. the Runtime-facing request contains no OpenBao token or generic path;
2. one fixed endpoint maps to one exact binding and version;
3. only selected output reaches the existing one-use lease;
4. trace, management, and arbitrary workflow paths refuse;
5. every internal step failure refuses generically;
6. output is impossible before revocation success;
7. consumed bootstrap proof is not retried;
8. immutable-string and workflow-history limitations remain explicit.

The exact workflow syntax must then be validated against the pinned OpenBao 2.6.1 binary before any real material is introduced.

## Non-Claims

This candidate does not claim that:

- an executable workflow exists;
- a plugin exists or is needed;
- OpenBao has been modified or started;
- a token is securely erased from OpenBao memory;
- traces or audit records are currently redacted;
- a listener, policy, AppRole, wrapping path, mount, secret, or credential exists;
- B2.3 or B2 is complete.
