# Implementation Increment 015 — Existing-Lease-to-Provider Composition Seam

## Scope

This increment defines the provider-neutral reference contract for composing an
already-admitted lease reference with a provider reference. It does not implement
or select a provider, lease store, credential mechanism, Runtime driver, or live
transport.

## Contract

Composition is valid only when:

- the lease reference is present, current, and bound to the same mission and
  operative lineage as the request;
- the provider reference is present and treated as an opaque identifier;
- caller correlation and provenance are preserved unchanged;
- the composition result records both input references and their lineage;
- no composition step grants authority, creates a lease, resolves credentials,
  or performs provider access.

The reference seam must refuse malformed, missing, stale, superseded, mismatched,
or ambiguous inputs. Refusal is a disposition, not an authorization decision.

## Bounded synthetic cases

1. Current lease plus opaque provider reference composes successfully.
2. Missing lease refuses.
3. Stale or superseded lease refuses.
4. Mission mismatch refuses.
5. Operative-lineage mismatch refuses.
6. Missing provider reference refuses.
7. Caller correlation remains unchanged.
8. Opaque provenance remains unchanged.
9. Successful composition does not imply deployment authorization.
10. Refusal preserves the originating correlation and provenance.

## Boundary

This is dependency-free, non-live reference evidence. It introduces no provider
selection, credential custody or use, persistence, Runtime/Master Mason operation,
activation, deployment, live data, or external effect.
