# B2.1 Secret Custody and Adapter Pressure Tests 001

## Scope

Pressure the provider-neutral secret-custody and adapter boundary without selecting a store or implementation.

## Cases

1. available credential without Authority refuses
2. valid Access Grant contains no credential value
3. mismatched credential class refuses
4. cross-mission binding refuses
5. operative requests access but never receives secret material
6. Muster and Deployment Package contain only non-secret references
7. Barbican carries requests and results but no credential
8. provider acceptance does not validate Authority
9. credential resolution does not imply authentication
10. authentication does not imply operation completion
11. Runtime confines in-use credential material to one exact request
12. lease lifetime cannot exceed any controlling lifetime
13. rotation preserves distinct generations and supersession
14. revocation blocks future resolution and preserves uncertainty
15. outage fails closed without similarity fallback
16. recovery rechecks Authority, correlation, versions, and effect state
17. durable observations and ledgers contain no credential value
18. redaction failure quarantines output and treats the credential as potentially exposed

## Required Cross-Layer Review

Confirm that:

- Cognitive owns responsibility, not mechanism;
- Authority owns permission, not credentials;
- Provenance owns lineage, not storage or truth;
- Procedure owns order, not credential behavior;
- Runtime owns mechanism without self-authorization;
- current production artifacts do not contradict the boundary.

## Interpretation

A corrected draft may pass its own 18 cases while production convergence remains blocked by a named existing contradiction.

```text
draft conformance ≠ production convergence
production convergence ≠ implementation
implementation ≠ credential safety
```
