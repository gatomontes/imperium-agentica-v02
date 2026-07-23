# B2.1 Secret Custody and Adapter Boundary 001

## Status

Active draft candidate for the second authorized merge.

## Question

What provider-neutral custody and adapter behavior must exist before Imperium can select or implement a real secret store?

## Investigation Result

```text
BOUNDARY NECESSARY: YES
NATIVE DRAFT HOME: Runtime
STORE SELECTION READY: NO
IMPLEMENTATION READY: NO
COGNITIVE CONVERGENCE BLOCKER: 1
```

## Required Boundary

```text
authorized non-secret request
→ exact correlation and current Authority checks
→ non-secret Secret Binding Reference
→ Runtime-confined Custody Execution Context
→ store resolution
→ exact authenticated provider operation
→ permitted result or refusal
→ redacted Runtime and provider observations
```

Credential material never enters the operative, Deployment Package, Muster, Barbican, Iron Gate, Theatre mission content, ledger, observation envelope, or ordinary telemetry.

## Ownership Finding

- Locksmith owns cognitive responsibility for fulfillment or refusal while retaining custody.
- Authority owns permission and never contains credential value.
- Provenance owns binding, custody, correlation, version, and supersession lineage without value.
- Procedure owns required ordering only.
- Runtime owns custody mechanisms, adapter behavior, lease, isolation, redaction, rotation, revocation, outage, and recovery.
- store/provider observations never create permission.

No new layer is required.

## Candidate Artifacts

- Secret Binding Reference
- Secret Operation Request
- Custody Execution Context
- Access Result
- Secret Handling Observation

These are draft Runtime meanings, not schemas or implementations.

## Measurement Direction

B2.1 applies CTRL-006 by requiring observable evidence for:

- refusal on missing or mismatched Authority;
- zero secret values in durable artifacts;
- lifetime intersection;
- rotation and revocation invalidation;
- outage fail-closed behavior;
- recovery revalidation;
- redaction success or quarantine;
- exact request, binding, adapter, attempt, and effect correlation.

No metric threshold or harness is admitted here.

## Convergence Blocker

CB-005 is internally inconsistent.

`armory-locksmith.md` establishes that credentials do not pass to Muster.

`muster.md` still says:

- Muster receives authorized credentials;
- the Deployment Package contains “Credentials / access issued”;
- Locksmith supplies authorized credentials to Muster.

The candidate boundary requires those meanings to become non-secret credential-binding, access-ticket, and permission references.

Until a separately tested Cognitive correction merges:

```text
B2.2 STORE SELECTION: BLOCKED
B2.3 IMPLEMENTATION: BLOCKED
```

## Evidence

```text
Baseline pressure: 10 PASS / 8 FAIL
Corrected draft pressure: 18 PASS / 0 FAIL
Cross-layer boundary review: 16 PASS / 1 BLOCKED
Production semantic files changed: 0
Implementation files changed: 0
```

The one blocked convergence item is the CB-005 Muster contradiction.

## Explicit Exclusions

No store, provider, identity system, protocol, credential format, encryption method, cache, Runtime driver, or deployment mechanism is selected.

No credential is created, retrieved, exposed, rotated, revoked, stored, or used.

## Result

B2.1 defines a coherent provider-neutral candidate boundary and exposes one required Cognitive convergence correction.

This merge does not complete B2.1 operationally, admit the Runtime contract, or authorize B2.2.
