# Runtime Stable Nonproduction Reference Placement 001

## Status

Bounded placement candidate completed on 2026-07-18.

No production admission or deployment.

Branch:

`agent/runtime-reference-placement-001`

Rollback parent:

`48a9c02963a50441c1f01224a3287283ed9167ae`

## Trigger

The operator approved the recommended next step with `continue`:

`stable nonproduction reference placement`

## Candidate

The five reference source modules move without duplication from:

`tests/runtime/reference-implementation-001/src/`

to:

`layers/runtime/reference/src/`

The stable nonproduction home adds:

- `layers/runtime/reference/README.md`
- a private `@imperium-agentica/runtime-reference` package manifest
- an explicit five-entry export map
- direct test consumption from the layer-owned location
- five focused placement tests

## Placement Rule

```text
tests/ = evidence consumer
layers/runtime/reference/ = nonproduction executable owner
layers/runtime/production/ = admitted Runtime semantic artifacts only
```

Stable placement means the repository path and declared entry points have survived enough evidence to support reuse. It does not freeze behavior or admit the implementation to production.

## Results

```text
Pre-placement pressure: 5 PASS / 6 FAIL
Corrected placement pressure: 11 PASS / 0 FAIL
Focused placement tests: 5 PASS / 0 FAIL
Preserved successor tests: 35 PASS / 0 FAIL
Combined successor suite: 40 PASS / 0 FAIL
Historical harness: 11 PASS / 0 FAIL
```

## Scope Boundary

No Runtime behavior, contract pin, production manifest, dependency, provider, credential, network, database, deployment artifact, or external effect is added.

The deterministic coordinator remains an oracle, the filesystem adapter remains single-process evidence, and the package remains private.

## Stop Condition

No production package, public distribution, provider integration, credential custody, deployment, live effect, or consensus claim without separate approval.
