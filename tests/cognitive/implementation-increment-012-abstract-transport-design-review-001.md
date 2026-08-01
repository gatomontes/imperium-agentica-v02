# Implementation Increment 012 — Abstract Transport Design Review

## Scope

This increment defines the provider-neutral transport boundary that may surround the completed in-memory Secretariat → Petition → Castellan reference flow. It is a design contract only. It does not select HTTP, messaging, a queue, a provider, persistence, credentials, Runtime, activation, deployment, live data, or an external effect.

## Transport port

The abstract port accepts a transport envelope containing an opaque transport identity, the existing Operator Request or serialized artifact envelope, the existing correlation identity, a schema/version marker, and a non-secret provenance reference.

The port returns a transport result containing the same transport identity and correlation identity, the validated Petition/result envelope or an explicit refusal disposition, a delivery disposition, and no credentials or provider-specific fields.

An in-memory adapter may implement this port for tests. It must delegate domain formation to the existing reference boundary and must not become a second Secretariat, Castellan, or authority.

## Correlation and lineage

Transport identity correlates one ingress attempt with its response. Artifact identity/version and source references remain the domain lineage. Transport correlation may not replace, rewrite, or silently regenerate domain lineage. Replays with a different transport identity are distinct transport attempts but must carry the same artifact lineage when they carry the same artifact.

## Serialization boundary

Serialization is explicit: validate the in-memory envelope before serialization; serialize only the declared transport envelope; deserialize into unknown data; validate the reconstructed envelope before domain use; and refuse malformed, unsupported-version, missing-correlation, or lineage-inconsistent input. Serialization does not imply persistence.

## Delivery and refusal semantics

The port distinguishes ACCEPTED, REFUSED, UNRESOLVED, STALE, INVALIDATED, DELIVERY_PENDING, DELIVERED, and DELIVERY_REFUSED. A delivery disposition is not domain approval and cannot change a Petition or Work Specification status. Failed delivery must not cause domain re-formation or silent mutation.

## Test seam

The first implementation seam should be a dependency-free in-memory adapter with injected serializer and reference-boundary contracts. Tests must observe identity and correlation preservation; serialize/deserialize validation; accepted, refused, unresolved, stale, and invalidated propagation; malformed and unsupported-version refusal; no duplicate domain formation during delivery retry; no credential, provider, persistence, or external call; separation between transport disposition and domain status; and deterministic lineage-mismatch refusal.

## Result

The abstract transport boundary is sufficiently specified for a separately reviewable in-memory adapter increment. The next increment may implement that adapter and its focused tests. HTTP, messaging infrastructure, persistence, queues, providers, credentials, Runtime, activation, deployment, live data, and external effects remain closed.
