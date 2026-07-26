# Foundry Persona Production Conformance — Review 001

## Scope

This review remains strictly on the Operative/Foundry path:

```text
Guildhall → Studium → Hagiography / Human-Trait Canon → Foundry → Pit → Garrison → Conscription
```

Officer, Gesta, Smith, Spur, and Curia work are out of scope.

## Target

`layers/cognitive/drafts/persona-production-conformance-contract.md`

## Findings

| Area | Result | Finding |
|---|---|---|
| Foundry ownership | PASS | The draft correctly assigns integration to Foundry and prohibits silent upstream repair, persona admission, tool grants, and deployment. |
| Guildhall boundary | PASS | Profession meaning remains upstream and distinct. |
| Studium boundary | PASS | Governance doctrine is a required upstream artifact and unresolved doctrine blocks later gates. |
| Hagiography / Human-Trait Canon boundary | REVISION REQUIRED | The contract still frames the chain around DR-006 and a broad “real practitioner” requirement, but does not cite EC-CURRENT, EC-01, EC-02, or the admitted Human-Trait Canon schema as the active evidence path. |
| Real-person safeguard | REVISION REQUIRED | The contract requires real-practitioner evidence but does not state the EC-02 precondition, minimization, dispute, redaction, or correction requirements. |
| Synthetic testing | REVISION REQUIRED | Synthetic fixtures are useful for testing but the contract currently says fictional or composite exemplars cannot substitute for evidence without distinguishing synthetic test use from production canon evidence. |
| Foundry product | PASS | Persona Specification Candidate fields are sufficiently bounded and versioned. |
| Pit boundary | PASS | Pit is independent pressure testing; recommendation is not admission. |
| Garrison boundary | PASS | Garrison owns exact admission and inventory truth; admission is not selection or deployment. |
| Conscription boundary | PASS | Conscription remains downstream recruitment packaging and cannot alter doctrine or canonized traits. |
| Provenance and supersession | PASS | Exact upstream versions and downstream invalidation are required. |

## Required Revisions

1. Replace the contract's active DR-006 evidence reference with `DR-CURRENT`, `EC-CURRENT`, `DR-011`, `DR-012`, and `DR-013` as applicable.
2. Make the admitted Human-Trait Canon schema the required artifact boundary for professional persona construction.
3. Require EC-01 disposition and EC-02 case record for every real-person Canon entry; unresolved or refused evidence blocks Foundry.
4. State that synthetic fixtures may exercise Foundry and Pit without satisfying real-person production evidence requirements.
5. Preserve the exact Canon entry version, evidence disposition, safeguards record, and downstream restrictions in the Persona Specification Candidate.
6. Keep the contract explicitly limited to professional personas; do not import Officer/Gesta requirements.

## Disposition

The Foundry contract remains a draft. Its core boundaries are sound, but it must be revised to consume the newly admitted EC-CURRENT and Human-Trait Canon state before a synthetic Foundry integration test.
