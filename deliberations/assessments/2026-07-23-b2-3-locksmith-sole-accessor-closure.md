# B2.3 Locksmith Sole-Accessor Implementation Closure

## Date

2026-07-23

## Status

Concluded for the bounded B2.3 nonproduction implementation leg.

## Proposition Considered

Whether Imperium could replace direct Runtime/store relationships with one Locksmith-owned access boundary without prematurely selecting a persistence device or erasing historical implementation evidence.

## Conclusion

Yes, at nonproduction reference scope.

Cognitive Baseline CB-007 makes Locksmith the sole Imperium accessor to any eventual security-persistence device. The Runtime package exposes one closed-schema Locksmith access port. Five direct credential/store exports are retired. One device-neutral in-memory adapter remains internal to Locksmith and is not separately exported.

## Implemented Repository Mechanisms

- admitted CB-007 Armory/Locksmith, Muster, and Barbican contracts;
- fixed-operation Runtime-facing Locksmith access port;
- mandatory Authority and Provenance finding references;
- exact Mission, Deployment, Operative Binding, ticket, provider, expiry, and operation parameters;
- generic external refusal with redacted staged evidence;
- sole active security-persistence package export;
- internal synthetic adapter with exact binding, inactive/unavailable refusal, and ticket replay protection.

## Historical Evidence Preserved

The synthetic credential broker, provider projection, synthetic secret-store port, OpenBao KV backend, and OpenBao service-port backend remain in the repository with their tests and prior deliberations. They are evidence, not active package APIs.

## Rejected Alternatives

- Runtime direct access to a store or store adapter;
- provider adapters receiving backend-native device inputs;
- treating Runtime credential custody as device access;
- deleting prior OpenBao and synthetic-store work;
- selecting a replacement device inside B2.3;
- adding mutable bootstrap, administration, recovery, or migration surfaces without separate evidence.

## Explicit Non-Claims

This closure does not prove real credential safety, secure erasure, durability, provider authentication, device availability, outage recovery, production readiness, external assurance, or live operation.

It does not promote any RA control to `controls/implemented/`; the B2.3 mechanisms are narrower than those program-level control records.

## Evidence

- `tests/runtime/b2-3-locksmith-sole-accessor-closure-review-001.md` — 26 PASS / 0 FAIL
- PRs #77 through #81 and their immutable evidence
- merge chain `31c7980`, `13d6dd6`, `1e50cf7`, `17dc2a1`, `39aaf8d`

## Residual Questions

- which concrete security-persistence device, if any, best realizes the internal adapter contract;
- what separately admitted authority and provenance govern non-mission administration and recovery;
- what empirical B2.4 lifecycle and outage matrix is required before B2 closure;
- what repository-wide CI should verify the reference package continuously.
