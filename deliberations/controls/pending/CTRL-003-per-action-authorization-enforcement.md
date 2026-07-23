# CTRL-003 — Per-Action Authorization Enforcement

## Program

`ICP-03`

## Risks Served

AIR-04–AIR-05, AIR-08–AIR-10, AIR-12, AIR-17, AIR-19–AIR-20, AIR-24

## Current Location

`deliberations/controls/pending/`

## Maturity

`RECORDED_PENDING_INVESTIGATION`

## Required Placement

Define in B3; prove in B4

## Required Behavior

Before one external action, Runtime checks the exact current prerequisite set and permits or denies that action without originating Authority.

## Implementation Target

Unselected.

## Responsible Layer or Component

Unassigned. Native ownership must be discovered without moving Cognitive, Authority, Provenance, Procedure, or Runtime semantics.

## Observable Enforcement

Not yet defined or proven. The investigation must identify an observable permit, deny, contain, reassess, record, or recourse behavior appropriate to the control.

## Failure Behavior

Any missing, mismatched, expired, contested, withdrawn, revoked, or superseded prerequisite produces denial and traceable evidence.

## Verification Evidence

None. The RA Integration Review supports investigation only.

## Tests

None admitted.

## Limitations

This record is a smallest candidate control boundary. It may be split, revised, rejected, or superseded when concrete operating evidence exists.

## Residual Uncertainty

Ownership, exact semantics, provider implications, implementation mechanism, evidence thresholds, and interaction with other controls remain unresolved.

## Version or Commit

Not implemented.

## Last Verified

Not applicable.

## Invalidation and Demotion Conditions

Already pending. Reject or supersede if the behavior is unnecessary, duplicates an admitted contract, crosses layer ownership, or cannot be independently verified.

## Explicit Non-Claims

No Runtime driver, provider translation, policy engine, crossing mechanism, or implementation is selected.

This record does not admit or implement a control, activate a Track B leg, or authorize an external effect.

## Revision History

- 2026-07-23 — Identified by RA Integration Review 001.
