# Runtime Synthetic Credential-to-Provider Projection 001

## Status

Bounded candidate completed on 2026-07-18.

Synthetic test bytes and an injected driver only. No real secret, network, process execution, provider account, deployment, or production admission.

Branch:

`agent/runtime-synthetic-provider-projection-001`

Rollback parent:

`2cc923baa0df9bee91dbd478f6ba6c350407f607`

## Trigger

The operator approved the recorded recommendation with `proceed`:

`synthetic credential-to-provider projection investigation`

## Candidate

The stable private Runtime reference package gains:

- `src/synthetic-credential-node-process-supervisor-adapter.mjs`
- export `./providers/node-process-supervisor/synthetic-credentials`
- one composition of the existing synthetic broker and injected supervisor adapter
- thirteen focused executable tests

The projection:

- keeps the credential capability out of plans, observations, and provider requests
- preserves the existing six-field operational request exactly
- consumes only a credential bound to exact environment, component, scope, and purpose
- provides the injected driver a separate temporary `Uint8Array` argument
- permits only one synchronous driver call
- refuses binding mismatch, absent handle, and replay before driver disclosure
- preserves explicit provider acceptance and refusal mappings
- preserves unknown, thrown, or Promise outcomes as indeterminate
- leaves temporary-view zeroing to the already verified broker boundary

## Design Basis

The experiment applies least privilege, fine-grained object access, limited human interaction, short-lived use, and lifecycle accounting described by the OWASP Secrets Management guidance:

https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html

## Results

```text
Pre-projection pressure: 3 PASS / 11 FAIL
Corrected projection pressure: 14 PASS / 0 FAIL
Focused projection tests: 13 PASS / 0 FAIL
Preserved successor tests: 64 PASS / 0 FAIL
Combined successor suite: 77 PASS / 0 FAIL
Historical harness: 11 PASS / 0 FAIL
```

## Evidence Limit

The driver is an in-memory test double. A trusted driver can copy bytes while invoked, and JavaScript view zeroing does not prove complete memory erasure.

No provider authentication or live recovery is attempted or proven.

## Stop Condition

No real credential, provider SDK, network transport, process execution, persistent store, deployment, or candidate merge without separate approval.
