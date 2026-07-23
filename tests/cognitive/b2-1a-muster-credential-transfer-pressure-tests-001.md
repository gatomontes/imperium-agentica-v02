# B2.1a Muster Credential-Transfer Pressure Tests 001

## Purpose

Test whether the CB-005 Muster boundary prevents credential material and bearer capabilities from leaving Locksmith responsibility and Runtime custody while preserving mission assembly.

## Method

Apply each case first to the admitted CB-005 production Muster and then to the proposed draft. A case passes only when the governing text yields one unambiguous result without importing unstated implementation behavior.

## Cases

| ID | Pressure | Required result |
|---|---|---|
| MT-001 | Locksmith has a credential value for an authorized mission. | Muster receives no credential value. |
| MT-002 | A Deployment Package is assembled for launch. | It contains no credential value or secret material. |
| MT-003 | An opaque token authenticates by possession. | It is treated as a bearer capability and excluded. |
| MT-004 | A provider binding identifier is non-secret and non-bearer. | The reference may be carried with exact lineage. |
| MT-005 | An access ticket refers to a separately authorized operation. | The non-secret ticket may be carried; it grants no new authority. |
| MT-006 | An Access Grant is required. | Only its non-secret reference may be carried, never embedded credential material. |
| MT-007 | Permission expires before mission launch. | Expiration remains explicit and readiness cannot erase it. |
| MT-008 | Revocation is requested or uncertain. | The condition is preserved and does not become assumed access. |
| MT-009 | Runtime performs an authenticated operation. | Muster receives only the permitted result or refusal. |
| MT-010 | A result contains secret or replayable material. | It is not a permitted result for Muster. |
| MT-011 | Credential rotation supersedes a binding. | Version and supersession lineage remain explicit without values. |
| MT-012 | Muster marks a package Ready For Launch. | Readiness does not authenticate, authorize, or execute. |
| MT-013 | Barbican sustains continuing operations. | Barbican receives no credential material from Muster. |
| MT-014 | Iron Gate launches the package. | No secret or bearer capability crosses through the package. |
| MT-015 | Theatre executes mission work. | Credential custody is not transferred through mission content. |
| MT-016 | Mission closes. | Muster coordinates revocation or expiry without taking custody. |

## Acceptance

- focused result: 16 PASS / 0 FAIL;
- no responsibility migration from Locksmith, Runtime, Authority, Muster, or Barbican;
- no production or implementation change;
- no provider or store selection;
- every non-secret reference is also non-bearer.