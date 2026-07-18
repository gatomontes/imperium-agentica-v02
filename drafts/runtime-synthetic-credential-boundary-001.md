# Runtime Synthetic Credential Boundary 001

## Status

Bounded candidate completed on 2026-07-18.

Synthetic test bytes only. No real secret, environment variable, file, keychain, network, provider credential, deployment, or production admission.

Branch:

`agent/runtime-synthetic-credential-boundary-001`

Rollback parent:

`a3ef39ac54036cad8b46cf334ba5fa5f24653192`

## Trigger

The operator approved the recorded next investigation with `continue`:

`credential-handling boundary investigation`

## Candidate

The stable private Runtime reference package gains:

- `src/synthetic-credential-broker.mjs`
- export `./security/synthetic-credentials`
- an in-memory, one-use broker restricted to `SYNTHETIC_TEST_SECRET`
- twelve focused executable tests

The broker:

- accepts only non-empty `Uint8Array` material
- transfers test custody by copying and zeroing the caller view
- returns an opaque capability handle
- uses a separate, non-capability audit identity
- binds use to exact environment, component, scope, and purpose
- removes and zeroes broker custody before one synchronous callback
- zeroes the callback view on success or failure
- refuses async consumption and replay
- suppresses consumer error detail

## Design Basis

The boundary follows least-privilege, minimal-disclosure, lifecycle-audit, rotation/revocation, and short-custody principles described by the OWASP Secrets Management and Secure Product Design guidance.

Default opaque identifiers use Node's cryptographically random `randomUUID`; tests inject deterministic identifiers.

## Results

```text
Pre-boundary pressure: 2 PASS / 11 FAIL
Corrected boundary pressure: 13 PASS / 0 FAIL
Focused boundary tests: 12 PASS / 0 FAIL
Preserved successor tests: 52 PASS / 0 FAIL
Combined successor suite: 64 PASS / 0 FAIL
Historical harness: 11 PASS / 0 FAIL
```

## Evidence Limit

JavaScript cannot prevent a trusted synchronous consumer from copying bytes. Zeroing reachable views does not prove erasure of all engine or operating-system copies.

This broker is executable boundary evidence, not a real secret store or credential-safety claim.

## Stop Condition

No real credential, persistent store, encryption, transport, provider integration, deployment, or candidate merge without separate approval.
