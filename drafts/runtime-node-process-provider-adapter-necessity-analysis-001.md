# Runtime Node Process-Supervisor Adapter Necessity Analysis 001

## Status

Completed against the stable nonproduction Runtime reference package.

## Question

What is the smallest concrete provider environment that tests the stable effect-port boundary without crossing credential, network, deployment, or live-effect gates?

## Finding

An injected Node process-supervisor driver is necessary and sufficient for the next bounded experiment.

The existing simulated effect port cannot demonstrate:

- exact environment binding
- provider action allowlisting
- least-data request mapping
- deterministic provider response translation
- driver exception quarantine
- stable package export of a provider adapter

## Alternatives

### External SaaS or cloud provider

Rejected.

This would combine adapter semantics with account selection, credentials, network behavior, billing, provider contracts, and live effects.

### Direct `node:child_process` implementation

Rejected.

Executing or restarting a real process would cross the external-effect and deployment gates before the mapping boundary is proven.

### Generic provider framework

Rejected.

One adapter does not justify a registry, plugin system, discovery mechanism, or provider institution.

### Injected Node process-supervisor driver

Selected.

It is concrete enough to test environment and result mapping while remaining dependency-free, credentialless, deterministic, and easy to delete.

## Required Behaviors

- exact environment identity
- exact `INITIATE_RECOVERY` action
- exact component and scope
- bounded request projection
- effect identity forwarded as operation reference
- explicit success and failure mapping
- unknown or thrown outcome remains indeterminate
- Runtime observation remains operational only
- duplicate Runtime effect reaches the driver once
- no subprocess, network, credential, or live-effect mechanism

## Result

```text
ENVIRONMENT-SPECIFIC ADAPTER EVIDENCE: NECESSARY
INJECTED NODE SUPERVISOR DRIVER: MINIMAL
EXTERNAL VENDOR OR LIVE PROCESS CONTROL: NOT JUSTIFIED
```
