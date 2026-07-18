# Castellan Mission Formation Necessity Analysis 001

## Question

What is the smallest refinement needed to test whether Castellan can form a bounded Mission Need from an exact Petition without absorbing Work Specification approval, profession resolution, or deployment?

## Existing Coverage

The admitted baseline already establishes:

- Secretariat produces the Petition without adding mission meaning
- Castellan owns Mission Need and Work Specification
- `FORM_MISSION` is scoped to exact Petition identity
- PB-001 supplies Mission Identity after formation
- `APPROVE_WORK_SPECIFICATION` is a separate Authority action
- Guildhall owns profession resolution
- Procedure requires an approved Work Specification or explicit refusal/blocker

It does not yet provide a bounded minimum semantic contract for Mission Need or distinguish a known formation refusal from unresolved meaning or evidence.

## Alternatives

### Expand Castellan production directly

Rejected. A draft and pressure evidence must precede any production admission.

### Define Mission Need inside Procedure

Rejected. Procedure may order artifacts but cannot originate Cognitive meaning.

### Define Mission Need inside Authority

Rejected. Authority permits formation but does not decide mission substance.

### Combine Mission Need and Work Specification

Rejected. It would compress `FORM_MISSION` and `APPROVE_WORK_SPECIFICATION` and erase the admitted distinction.

### Bounded Mission Need and formation assessment

Selected. It fills the missing artifact-relative semantics while retaining existing owners and leaving approval for the next increment.

## Result

```text
MISSION NEED REFINEMENT: NECESSARY
FORMATION ASSESSMENT: NECESSARY
WORK SPECIFICATION APPROVAL IN THIS INCREMENT: OUT OF SCOPE
NEW LAYER OR INSTITUTION: NOT JUSTIFIED
```
