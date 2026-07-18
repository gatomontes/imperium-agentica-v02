# Runtime Synthetic Provider Projection Necessity Analysis 001

## Status

Completed against the merged synthetic credential broker and injected Node process-supervisor adapter.

## Question

What is the smallest composition that tests least-data credential projection into the existing provider boundary without selecting a credential format, real secret, transport, process, account, or vendor?

## Finding

A constructor-held opaque handle and a separate synchronous driver byte argument are necessary and sufficient for this bounded experiment.

The existing pieces independently demonstrate:

- an injected provider request boundary with six operational fields
- a one-use, exact-bound synthetic byte broker

They do not demonstrate:

- that the handle stays outside Runtime plans and observations
- that provider operational fields remain unchanged
- that the driver sees bytes only after exact broker binding
- that broker refusal prevents driver invocation
- that one-use and uncertainty semantics survive composition

## Alternatives

### Add credential material or handles to Runtime plans

Rejected.

This would contaminate semantic/control-plane objects with a security capability and increase observation and persistence exposure.

### Add credential bytes to the provider request object

Rejected.

This would widen the existing least-data projection and make accidental cloning or logging more likely.

### Teach the credentialless adapter about secret stores

Rejected.

This would combine independent boundaries and make the original credentialless surface harder to reason about.

### Compose with a constructor-held handle and second driver argument

Selected.

It preserves both existing components, keeps the operational request stable, and confines the temporary byte view to one synchronous injected-driver call.

## Required Behaviors

- exact existing operational acceptance
- exact broker environment, component, scope, and purpose
- credential capability absent from plans, observations, and provider request
- provider request remains six fields
- bytes passed separately for one synchronous call
- captured view zeroed after return or failure
- mismatch, absence, or replay never invokes the driver
- explicit provider outcome mapping preserved
- unknown, exception, and Promise outcomes remain indeterminate
- Runtime observations remain redacted and operational only
- no live acquisition, storage, transport, process, provider, or deployment mechanism

## Result

```text
SYNTHETIC PROVIDER PROJECTION EVIDENCE: NECESSARY
CONSTRUCTOR-HELD HANDLE PLUS SEPARATE BYTE ARGUMENT: MINIMAL
REAL PROVIDER AUTHENTICATION: NOT JUSTIFIED
```
