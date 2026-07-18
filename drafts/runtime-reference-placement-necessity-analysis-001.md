# Runtime Reference Placement Necessity Analysis 001

## Status

Completed after three merged Runtime reference evidence increments.

## Question

Has the executable reference implementation earned a stable nonproduction owner outside its test evidence directory?

## Finding

Yes.

The same source tree survived:

1. contract-bound reference implementation pressure
2. single-node durability and restart pressure
3. deterministic distributed-concurrency and recovery pressure

Tests now act as both implementation owner and evidence consumer. That conflates provenance and makes future bounded consumers depend on a test path.

## Alternatives

### Keep source under tests

Rejected.

Repeated reuse has made the test-owned path an accidental package boundary without explicit ownership or exports.

### Move source into `layers/runtime/production/`

Rejected.

That directory is the admitted `RTB-002` semantic manifest. The executable reference is not production-ready and must not alter that manifest.

### Create a root `packages/` institution

Rejected.

One private reference package does not justify a repository-wide package institution or workspace toolchain.

### Create `layers/runtime/reference/`

Selected.

It records Runtime ownership, remains parallel to production, requires no toolchain, and keeps tests independent.

## Required Behaviors

- exactly one implementation source tree
- Runtime-layer ownership
- explicit nonproduction boundary
- private package identity
- closed export map
- tests import the stable path
- admitted contract pins remain unchanged
- all behavior and historical regressions remain green

## Result

```text
STABLE NONPRODUCTION PLACEMENT: NECESSARY
LAYERS/RUNTIME/REFERENCE: MINIMAL
PRODUCTION OR ROOT PACKAGE INSTITUTION: NOT JUSTIFIED
```
