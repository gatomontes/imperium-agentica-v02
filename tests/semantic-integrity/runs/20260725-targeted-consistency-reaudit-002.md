# Semantic Integrity Run — Targeted Consistency Re-Audit (Superseded)

## Run Metadata

- Run ID: 20260725-targeted-consistency-reaudit-002
- Test type: repository-only targeted consistency re-audit
- Repository: imperium-agentica-v02
- Independence: NOT ESTABLISHED
- Status: SUPERSEDED by `20260725-cb-current-reference-audit-003`
- External effect: none

## Scope

This run verifies the concrete findings from the full-source Claude audit and does not claim to replace a fresh external-reader evaluation.

## Checks

| Check | Result |
|---|---|
| Root README cognitive baseline | SUPERSEDED — the prior check recorded CB-005; current active standard is CB-CURRENT with numbered snapshot CB-007 |
| Current-step cognitive baseline | SUPERSEDED — the prior check recorded CB-005; current active standard is CB-CURRENT with numbered snapshot CB-007 |
| Cognitive layer-owned baseline | SUPERSEDED — the prior check recorded CB-005; current active standard is CB-CURRENT with numbered snapshot CB-007 |
| Root README identifies layer-owned authority | PASS |
| Recovery status is operationally qualified | PASS — repository reset established; behavioral recovery unproven |
| Current step surfaces self-test independence limitation | PASS |
| Self-test record surfaces independence limitation | PASS |
| Semantic Integrity remains the active focus | PASS |
| OC implementation remains unauthorized | PASS |
| External effects remain prohibited/absent | PASS |
| Queue remains at drift classification and independent-run arrangement | PASS |

## Findings

1. This historical record incorrectly treated CB-005 as current; that result is superseded. The active standard is now CB-CURRENT, with CB-007 retained as the current numbered historical snapshot.
2. The root README now identifies layer-owned README and production contents as authoritative for baseline records.
3. The phrase Recovery status: successful has been replaced with the bounded statement: repository reset established; behavioral recovery unproven.
4. The current operational status now states that the controlled self-test's independence is not established.
5. No OC implementation, Runtime action, deployment, or external effect was introduced.

## Remaining Limitation

This is a consistency re-audit performed by the same working agent. It verifies that the identified contradictions were corrected but does not establish that an independent reader will recover the same meaning.

## Disposition

This record is retained for audit continuity but must not be used as current-state evidence. The later CB-CURRENT reference audit supersedes its CB-005 claims. Semantic Integrity remains active until a genuinely independent reader completes the required packet.
