# Implementation Increment 014 — Provider-Neutral Reference Contract Reconciliation

## Scope

This increment reconciles the provider-neutral transport contract with the existing
reference adapter implementation. It adds explicit optional fields for caller
correlation and opaque provenance, then verifies that the reference path preserves
both values through Secretariat and Castellan handoff.

## Boundary

The increment is dependency-free and reference-only. It does not define or select a
provider, lease, credential store, Runtime driver, deployment mechanism, queue,
persistence system, live data path, or external effect.

## Evidence

The focused in-memory transport test supplies a caller correlation and provenance
reference and verifies:

- caller correlation is preserved unchanged;
- provenance remains present at the petition boundary;
- work retains the petition correlation;
- the adapter remains provider-neutral.

A provider-neutral reference composition seam is therefore explicit, but no provider
composition is claimed or exercised.
