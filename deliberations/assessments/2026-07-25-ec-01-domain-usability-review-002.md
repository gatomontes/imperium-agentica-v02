# EC-01 Evidence-Source Standard — Domain and Usability Review 002

## Run Metadata

- Target: EC-01 Evidence-Source Standard Draft 001
- Test type: controlled domain-variation and evidence-record usability review
- Independence: NOT ESTABLISHED
- Production admission: not evaluated
- External effect: none

## Result

```text
Domains tested: 5
Usability assertions: 10
PASS: 9
REVISION REQUIRED: 1
FAIL: 0
```

## Domain Matrix

| Domain | Evidence situation | Result | Finding |
|---|---|---|---|
| Clinical practice | A documented treatment decision, measured patient outcome, and later review disagree about whether the outcome was caused by the practitioner's judgment | PASS | EC-01 preserves occurrence, attribution, outcome, causal uncertainty, and revision without collapsing them. |
| Legal practice | A published ruling and a later commentary describe a lawyer's role differently | PASS | Class A/B/C distinctions and conflict handling preserve the exact proposition and require narrowing or unresolved disposition. |
| Engineering | A system succeeded, but team records show extensive institutional support and tooling unavailable to a persona | PASS | Non-transferable conditions and counterfactual context are required; broad trait inheritance is bounded. |
| Scientific research | A result is published but cannot be reproduced from the available record | PASS | Publication can provide context, but exact evidence, verification limits, contradiction, and uncertainty prevent automatic trait canonization. |
| Curial/Officer conduct | A leader's decision appears decisive, but dissent records show suppressed alternatives and later reversal | PASS | Leadership traits require behavioral evidence and counterweights; failure signals and contradiction remain visible. |

## Evidence-Record Usability

| Assertion | Result | Finding |
|---|---|---|
| Reviewer can identify the exact proposition being supported | PASS | Claim being supported and exact locator are explicit. |
| Reviewer can separate event, behavior, outcome, and trait | PASS | Required Evidence Record and Sufficiency Rules distinguish the chain. |
| Reviewer can record source access and limitations | PASS | Directness, provenance, access path, and limitations are required. |
| Reviewer can preserve conflict without forced averaging | PASS | Conflict Handling explicitly prohibits synthetic facts. |
| Reviewer can state what would change the finding | PASS | Falsification and revision conditions are mandatory. |
| Reviewer can distinguish evidence from persona authorization | PASS | Boundaries prohibit forging, admission, recruitment, and deployment. |
| Reviewer can record a negative or missing result without treating it as proof of absence | PASS | UNRESOLVED is available and explicitly not negative proof. |
| Reviewer can record performance that is not a conventional achievement | REVISION REQUIRED | The Scope and record emphasize achievement/outcome; some professional evidence is a demonstrated practice, decision, work product, or prevented failure without a discrete achievement. |
| Reviewer can distinguish source reliability from claim relevance | PASS | Source class does not automatically prove the trait; claim-specific sufficiency remains required. |
| Reviewer can record multiple conditions without treating them as universal | PASS | Context, limits, and bounded trait conditions are required. |

## Required Revision

Broaden the evidence chain from:

```text
achievement or outcome
→ observed behavior
→ bounded trait
→ proposed professional or Officer behavior
```

to:

```text
demonstrated professional performance, decision, work product, or outcome
→ observed behavior or decision pattern
→ bounded trait
→ proposed professional or Officer behavior
```

Add `Performance or decision context` and `Work product or event identifier` to the evidence record so a reviewer can ground non-achievement evidence precisely.

## Disposition

EC-01 Draft 001 survives domain review with one targeted revision required. No persona, Officer, Operative, Runtime, or external action is authorized.
