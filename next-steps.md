# Next Steps

## Status

Runtime Node Process-Supervisor Provider Adapter 001 is merged and post-merge verified.

No next direction is approved or active.

This file is an ordered operational queue, not doctrine, architecture, or a roadmap.

## Queue

### 1. Choose one independently scoped direction

Eligible but unapproved options:

- credential-handling implementation
- live Node process-supervisor driver investigation
- production deployment design
- real consensus or distributed-store investigation

Recommended next step:

`credential-handling boundary investigation`

It can establish custody, redaction, non-persistence, and least-disclosure behavior with synthetic secrets before any real provider, live driver, account, or deployment is selected.

Each option requires its own necessity analysis, scope, tests, and explicit approval.

### 2. Preserve adjacent gates

No option automatically handles a real secret, proves provider idempotency or component recovery, establishes production readiness or consensus, deploys Runtime, or authorizes external effects.
