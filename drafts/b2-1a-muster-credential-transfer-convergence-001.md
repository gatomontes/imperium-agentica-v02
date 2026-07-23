# B2.1a Muster Credential-Transfer Convergence 001

## Status

Active unadmitted Cognitive draft candidate.

## Authorization

Prepared under the operator instruction:

> Continue

This record does not authorize its own merge, production admission, store or provider selection, credential operations, implementation, Runtime action, staging, deployment, or external effect.

## Question

What is the smallest CB-005 correction that makes Muster converge with Locksmith, Barbican, and the merged B2.1 secret-custody boundary?

## Defect

CB-005 contains four credential-transfer implications in `layers/cognitive/production/muster.md`:

1. credentials are named as Muster inputs;
2. credentials are named as Deployment Package content;
3. Locksmith is described as supplying credentials to Muster;
4. Muster's non-authority rule prohibits only unauthorized credentials, implying authorized credential carriage.

These statements conflict with the admitted Locksmith and Barbican boundaries and with the merged B2.1 Runtime draft evidence.

## Candidate Correction

The draft changes only Muster semantics:

```text
credential material
→ Locksmith responsibility
→ Runtime custody and authenticated operation only

Muster / Deployment Package
→ non-secret, non-bearer binding references
→ access tickets and Access Grant references
→ permission constraints
→ expiration and revocation conditions
→ permitted access results or refusals
```

A reference is not non-secret merely because it is opaque. If it can independently authenticate or authorize by possession, it is a bearer capability and is prohibited from Muster and the Deployment Package.

## Preserved Ownership

- Locksmith retains credential fulfillment and refusal responsibility.
- Runtime retains custody and adapter mechanism responsibility.
- Authority remains the source of permission and contains no credential value.
- Muster retains mission assembly, operationalization, and release responsibilities.
- Barbican remains free of credential material.
- Iron Gate and Theatre receive no credential material through the Deployment Package.
- Provenance carries identity, correlation, version, and supersession lineage without secret values.
- Procedure order and transition ownership do not change.

## Evidence

```text
Baseline pressure: 12 PASS / 4 FAIL
Corrected draft pressure: 16 PASS / 0 FAIL
Cross-layer convergence: 18 PASS / 0 FAIL
Production semantic files changed: 0
Implementation files changed: 0
```

No executable suite was run. The evidence is theoretical contract pressure and cross-layer review.

## Scope

Changed candidate surface:

- `layers/cognitive/drafts/muster.md`
- focused pressure specification and immutable runs;
- cross-layer convergence review;
- draft and test indices;
- operational continuity.

Not changed:

- `layers/cognitive/production/*`;
- Runtime production contracts or code;
- Authority, Provenance, or Procedure baselines;
- store, provider, identity system, protocol, credential format, encryption, cache, SDK, or deployment mechanism.

## Finding

```text
COGNITIVE CORRECTION NEEDED: YES
DRAFT CANDIDATE COHERENT: YES
PRODUCTION ADMISSION: NOT REQUESTED
B2.2 STORE SELECTION: BLOCKED
IMPLEMENTATION: BLOCKED
```

The correction is eligible for a separate production-admission review only after this candidate is merged.