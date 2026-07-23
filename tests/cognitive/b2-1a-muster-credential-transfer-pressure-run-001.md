# B2.1a Muster Credential-Transfer Pressure Run 001

## Subject

Admitted CB-005 production Muster before the candidate correction.

## Result

```text
12 PASS / 4 FAIL
```

## Findings

| ID | Result | Basis |
|---|---|---|
| MT-001 | FAIL | Muster explicitly receives “authorized credentials.” |
| MT-002 | FAIL | Deployment Package explicitly includes “Credentials / access issued.” |
| MT-003 | FAIL | No rule rejects an opaque bearer capability disguised as a reference. |
| MT-004 | PASS | Access bindings can be represented, though the secret boundary is incomplete. |
| MT-005 | PASS | Authorized access can be referenced without changing mission ownership. |
| MT-006 | PASS | Authority remains external to Muster. |
| MT-007 | PASS | Permission constraints can preserve expiration. |
| MT-008 | PASS | Revocation conditions are named. |
| MT-009 | PASS | Muster need not perform the provider operation. |
| MT-010 | PASS | Muster's result boundary can reject mission-inappropriate content. |
| MT-011 | PASS | Existing provenance can represent version and supersession lineage. |
| MT-012 | PASS | Ready For Launch is explicitly not launch. |
| MT-013 | PASS | Barbican separately prohibits credential carriage. |
| MT-014 | PASS | Iron Gate need not receive credentials when package content is corrected. |
| MT-015 | PASS | Theatre does not require custody transfer through mission content. |
| MT-016 | FAIL | “Unauthorized credentials” prohibition implies authorized credential carriage remains possible through closure. |

## Interpretation

The defect is semantic and bounded to Muster's credential-transfer wording. The other twelve cases already converge with surrounding ownership and lifecycle boundaries.

This immutable run records the admitted baseline. It is not rewritten by later evidence.