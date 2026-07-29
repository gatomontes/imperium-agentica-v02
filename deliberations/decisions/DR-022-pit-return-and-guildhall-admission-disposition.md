# DR-022 — Pit Return and Guildhall Admission Disposition

## Status

Recorded semantic decision. No implementation, activation, deployment, Runtime action, or external effect is authorized.

## Decision

A persona specification produced by Foundry must be stress-tested by Pit before it can be admitted to Garrison's roster.

Pit returns a bounded test brief to the Guildhall Committee. The Guildhall Committee—not Pit, Foundry, or Garrison—determines the disposition:

- **Admit:** the persona specification is admitted to Garrison's roster.
- **Recycle:** the specification returns to Foundry with the Committee's required corrections or further work.
- **Discard:** the production attempt is rejected and terminated. A new production process may be initiated later under a new authoritative brief.

## Authority and custody boundaries

- Foundry forges the persona specification.
- Pit stress-tests the specification and reports findings; it does not admit, recycle, or discard.
- The Guildhall Committee deliberates and determines the disposition.
- The Guildmaster presides over and authenticates the Committee's determination; the Guildmaster does not decide unilaterally.
- Garrison owns and exposes the roster of admitted persona specifications; it does not evaluate, search, select, or admit.

## Flow

`Foundry → Pit → Guildhall Committee → Admit / Recycle to Foundry / Discard`

On admission:

`Guildhall Committee → Garrison roster`

This decision closes the previously unresolved persona-admission authority boundary while preserving the distinction between determination and roster custody.
