# Foundry Input and Conflict Revalidation 001

## Scope

Synthetic revalidation of DR-064 against the current Guildhall → Studium → Hagiography → Foundry handoff.

## Cases

| # | Case | Expected disposition |
|---:|---|---|
| 1 | Complete, identity-bound packet | Accept for forging |
| 2 | Missing profession resolution | Refuse; return to Guildhall |
| 3 | Stale Hagiography canon | Refuse; return to Hagiography |
| 4 | Superseded doctrine version | Refuse; return to Studium |
| 5 | Conflicting trait derivations | Refuse; return to Hagiography |
| 6 | Incompatible doctrinal boundary | Refuse; return to Studium |
| 7 | Missing provenance or correlation | Refuse; return to native owner |
| 8 | Unowned conflict | Refuse; escalate without choosing |
| 9 | Attempted silent repair | Refuse; preserve defect |
| 10 | Cross-version composition | Refuse; require coherent successor packet |
| 11 | Upstream revision after acceptance | Invalidate prior packet; require immutable successor |
| 12 | Forged specification with incomplete lineage | Refuse handoff to Pit |
| 13 | Pit finding returned to Foundry | Accept only as bounded repair input; preserve prior version |
| 14 | Guildhall disposition request | Return disposition authority to Guildhall Committee |

## Result

14/14 synthetic cases pass. The handoff preserves native ownership, exact-input validation, conflict refusal, immutable successor behavior, and the Foundry → Pit boundary.

## Gate

This is semantic evidence only. It does not admit implementation, real-person data, Persona or Operative production, Runtime, credentials, activation, deployment, or external effects.
