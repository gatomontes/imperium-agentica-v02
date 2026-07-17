# Barbican

## Status

Admitted port.

Baseline: `CB-001`.

Admission: `Production Admission Review 003`.

Evidence: `Constitutional Test Run 015 — 30 PASS / 0 FAIL`.

The Barbican is La Cortine's dedicated Theatre-facing operational-support outpost.

It is the port of exit and return for continuing Armory and Locksmith service traffic.

## Routes

```text
Theatre
→ Barbican
→ Armory for tool or capability tickets

Theatre
→ Barbican
→ Locksmith for access or unlock tickets

Armory or Locksmith result
→ Barbican
→ requesting deployed operative
```

Barbican carries tickets, requests, results, refusals, and correlation metadata.

It does not carry credentials. Locksmith alone retains credential custody and performs authenticated unlocks or operations.

Barbican does not provide tools, authorize capabilities, decide mission scope, amend Deployment Packages, receive completed missions, or judge results.

## Boundary Maxim

```text
Barbican exposes providers.
Providers fulfill or refuse.
The operative receives capability, not custody.
```
