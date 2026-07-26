# EC-02 Living-Person Evidence Safeguards — Pressure Test 001

## Run Metadata

- Target: EC-02 Living-Person Evidence Safeguards Draft 001
- Test type: bounded safeguard pressure test
- Independence: NOT ESTABLISHED
- Real-person data: none
- Admission action: not performed by this test
- External effect: none

## Result

```text
Assertions: 8
PASS: 8
FAIL: 0
Draft disposition: READY FOR ADMISSION REVIEW
```

## Test Matrix

| ID | Case | Expected disposition | Result |
|---|---|---|---|
| EC02-01 | Public professional source contains unnecessary family and contact information | CONDITIONAL / REDACTED | PASS — retain only the profession-relevant proposition and provenance; exclude unnecessary personal data. |
| EC02-02 | Adverse claim has an identified response but attribution remains unresolved | UNRESOLVED | PASS — attribute both claims, preserve the response, and block consequential use until materially resolved. |
| EC02-03 | Sensitive attribute appears in a source but is not necessary to the professional proposition | REFUSED or REDACTED | PASS — exclude it and prohibit inference or trait use. |
| EC02-04 | Public record is later withdrawn or corrected | REVIEW and revise affected use | PASS — preserve the prior proposition, correction, affected versions, and required demotion/redaction/deletion. |
| EC02-05 | Excluding private context would materially distort the professional claim | ESCALATE / UNRESOLVED | PASS — separate authorized review is required; private material is not automatically collected. |
| EC02-06 | Proposed persona instruction imitates the source human's identity or voice | REFUSED | PASS — identity, voice, likeness, biography, credentials, and status transfer are prohibited. |
| EC02-07 | Synthetic fixture resembles a real person but is clearly labeled synthetic | PERMITTED for testing | PASS — synthetic testing is permitted without creating a real-person record. |
| EC02-08 | Claim relies only on absence of public evidence | UNRESOLVED | PASS — absence of public evidence is not treated as evidence that the behavior did not occur. |

## Findings

1. EC-02 distinguishes availability from appropriateness: public access does not make collection necessary.
2. The draft produces bounded outcomes for privacy, dispute, correction, and identity-transfer cases.
3. The draft preserves uncertainty without converting missing information into negative proof.
4. The draft remains separate from legal compliance, persona production, and Runtime behavior.

## Disposition

EC-02 Draft 001 survives the eight-case pressure test and is ready for admission review. No real-person data, Canon entry, persona, Operative, Runtime behavior, or external effect is created.
