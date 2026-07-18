# Runtime Synthetic Credential Boundary Necessity Analysis 001

## Status

Completed against the stable nonproduction Runtime reference package.

## Question

What is the smallest implementation that can test credential custody and disclosure boundaries without acquiring, persisting, transporting, or using a real secret?

## Finding

An in-memory, one-use synthetic byte broker is necessary and sufficient for the next bounded experiment.

The existing Runtime reference can prove that operational records omit secret material, but it cannot demonstrate:

- explicit synthetic-only classification
- byte-oriented custody transfer
- exact use binding
- opaque capability handles
- one synchronous disclosure window
- post-callback view zeroing
- replay and revocation behavior
- lifecycle auditing without capability or material disclosure

## Alternatives

### Environment variables or files

Rejected.

They would introduce ambient access or persistence before the custody boundary is proven.

### Operating-system keychain or external secret manager

Rejected.

They would combine boundary semantics with platform, account, network, vendor, deployment, and real-credential gates.

### Encryption wrapper

Rejected.

Encryption would not establish who may request, receive, retain, or replay material and would create premature key-custody questions.

### In-memory synthetic broker

Selected.

It is dependency-free, deterministic under test, explicitly unable to admit real classifications, and easy to delete.

## Required Behaviors

- synthetic classification only
- `Uint8Array` only
- exact environment, component, scope, and purpose
- caller view zeroed after registration
- non-descriptive one-use handle
- capability handle excluded from audit
- broker custody removed before callback
- synchronous callback only
- callback view zeroed in all outcomes
- replay, revoke, and close refusal
- material and consumer errors excluded from audit and surfaced errors
- no acquisition, persistence, transport, provider, or live-use mechanism

## Result

```text
SYNTHETIC CREDENTIAL BOUNDARY EVIDENCE: NECESSARY
IN-MEMORY ONE-USE BROKER: MINIMAL
REAL SECRET STORE OR PROVIDER INTEGRATION: NOT JUSTIFIED
```
