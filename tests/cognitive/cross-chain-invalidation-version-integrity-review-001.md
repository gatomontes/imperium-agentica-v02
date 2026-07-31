# Cross-Chain Invalidation and Version-Integrity Review 001

## Scope

Synthetic, non-live review of invalidation and version integrity across Guildhall, Studium, Hagiography, Foundry, Pit, Garrison, and Recruitment.

## Contract

A source artifact may be invalidated, superseded, quarantined, or returned only by its native authority. Downstream artifacts must not silently continue from an invalid or superseded predecessor. A valid successor preserves lineage, records the reason and authority, and requires revalidation at every affected boundary. Mixed-version composition is refused. Pointers must converge on one active lineage; disagreement is quarantined rather than resolved by inference.

## Pressure matrix

Twenty-four synthetic cases cover source invalidation, downstream propagation, supersession, quarantine, stale packets, conflicting successors, native-owner return, revalidation, pointer divergence, unauthorized repair, duplicate identity, and inactive handoff. All 24 cases pass: invalid or ambiguous chains are refused or returned, and valid successors preserve exact provenance.

## Disposition

Admitted for future implementation design and synthetic testing only. This review does not authorize real-person intake, Persona or Operative production, credentials, Runtime operation, activation, deployment, provider access, live data, or external effects.
