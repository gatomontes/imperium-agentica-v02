# DR-006 Mandatory Exemplar Grounding — Pressure Test 001

## Date

2026-07-24

## Scope

This review pressures `DR-006 — Mandatory Real-World Exemplar Grounding for Professional Personas` against admitted Hagiography, Foundry, Pit, and Garrison semantics and the A2.4 Persona Production Conformance Contract.

It tests the SOP decision. It does not test a live persona, admit a production revision, or implement an enforcement mechanism.

## Result

```text
Assertions: 21
PASS: 18
FAIL: 3
Production admission readiness: NOT READY
SOP decision retained: YES
Production files changed: 0
Implementation files changed: 0
External effect: NO
```

A PASS means DR-006 produces the required safe disposition for the scenario.

A FAIL means the decision or its consuming draft lacks enough rule content to produce one determinate, reviewable disposition. It does not mean the underlying exemplar-grounding principle should be rejected.

## Test Matrix

| ID | Pressure | Expected disposition | Result | Finding |
|---|---|---|---|---|
| EG-01 | Famous practitioner named without performance evidence | Refuse | PASS | Fame cannot substitute for evidence. |
| EG-02 | Achievement listed without observed behavior | Block derivation | PASS | The achievement-to-behavior link is mandatory. |
| EG-03 | Generic trait adjective with no evidence chain | Refuse | PASS | Generic adjectives cannot satisfy the canon. |
| EG-04 | Strong evidence connects achievement, observed behavior, and bounded trait | Permit canon review | PASS | Required derivation is inspectable. |
| EG-05 | Persona claims the practitioner's award or credential | Refuse | PASS | Achievement is provenance, never a persona claim. |
| EG-06 | Persona copies voice, likeness, biography, or identity | Refuse | PASS | Whole-person imitation and impersonation are prohibited. |
| EG-07 | Trait conflicts with Studium governance | Refuse or return upstream | PASS | Governance remains controlling. |
| EG-08 | Trait succeeds only because of non-transferable resources or status | Exclude or bound | PASS | Non-transferable context must be recorded. |
| EG-09 | Trait has known costs or contradictory evidence | Preserve limits or refuse | PASS | Costs, conflicts, confidence, and counterweights are mandatory. |
| EG-10 | Only one well-evidenced practitioner is available | Permit with explicit confidence limits | PASS | One qualifies; multiplicity is preferred, not a substitute for evidence. |
| EG-11 | Multiple practitioners corroborate the same behavior under different conditions | Strengthen confidence without erasing differences | PASS | Multiple-source comparison is compatible with Hagiography. |
| EG-12 | Multiple inherited traits conflict when integrated | Return to Hagiography or Foundry | PASS | Pit must test trait conflict; silent repair is prohibited. |
| EG-13 | Practitioner evidence changes after canonization | Invalidate dependent future findings and revise | PASS | Version-exact provenance and decanonization are required. |
| EG-14 | Professional persona lacks a Human-Trait Canon | Block Foundry | PASS | DR-006 makes `TRAIT_CANON_REQUIRED` mandatory. |
| EG-15 | Non-professional artifact is mistakenly forced through Hagiography | Exclude from this SOP | PASS | Scope is professional personas. |
| EG-16 | Candidate performs theatrical mimicry rather than useful professional behavior | Pit refusal/revision | PASS | Mimicry and performative behavior are explicit test targets. |
| EG-17 | Trait improves style but degrades competence, evidence, or escalation | Pit refusal/revision | PASS | Trait value cannot hide professional or governance failure. |
| EG-18 | Practitioner was suggested by the operator but evidence is inadequate | Refuse or unresolved | PASS | Operator preference does not replace evidence. |
| EG-19 | Evidence consists of one weak, promotional, circular, or unverifiable source | Determinate source-admissibility finding | FAIL | “Verifiable” and “exact reference” are required, but no source hierarchy, corroboration threshold, or conflict rule defines sufficiency. |
| EG-20 | Living practitioner record contains disputed, private, sensitive, or potentially harmful claims | Determinate admissibility/redaction/refusal behavior | FAIL | Privacy and defamation risk are named for future pressure but no operative evidence-minimization, public-source, sensitive-attribute, or dispute rule exists. |
| EG-21 | Exemplar set is professionally accomplished but systematically narrow or visibility-biased | Detect and disposition selection bias | FAIL | Multiplicity is encouraged, but breadth, discoverability bias, cultural context, and representativeness are not assessed. |

## Cross-Boundary Findings

### Hagiography

Substantially aligned:

- real humans are evidence sources;
- performance evidence is distinguished from reputation;
- transferable traits are separated from whole persons;
- context, costs, contradictions, and confidence are preserved;
- traits may be revised or decanonized.

Not yet sufficient for DR-006 production effect:

- Saint and Human-Trait Canon fields remain optional (“may”);
- no evidence-source admissibility or corroboration contract;
- no living-person evidence minimization or disputed-claim behavior;
- no exemplar-selection breadth or visibility-bias assessment;
- no mandatory exact achievement → behavior → trait → persona-behavior derivation.

### Foundry

Gap confirmed:

- Human-Trait Canon remains “when applicable”;
- the production candidate product does not require exemplar provenance;
- it does not explicitly prohibit achievement/credential attribution;
- it does not require inherited traits to be expressed as testable behavior.

The A2.4 draft closes these semantically, but it is not admitted production.

### Pit

Gap confirmed:

- Human-Trait Canon remains “when applicable”;
- production Pit records generic trait behavior but does not mandate tests for mimicry, context loss, overextension, trait conflict, or achievement leakage.

The A2.4 draft adds these test duties but remains unadmitted.

### Garrison

Gap confirmed:

- Garrison may preserve a Hagiography trait reference;
- production does not require exact exemplar derivation provenance;
- no explicit admission refusal exists for missing, stale, refused, or unresolved exemplar evidence.

## Required Corrections Before Admission

### EC-01 — Evidence Source Standard

Define source classes, minimum reliability, corroboration expectations, conflict handling, exact citation duties, and refusal/unresolved behavior. Do not equate a source count with truth.

### EC-02 — Living-Person Evidence Safeguards

Prefer profession-relevant public evidence; minimize personal data; prohibit unnecessary sensitive attributes, rumor, and unsupported adverse inference; preserve disputed evidence explicitly; define redaction, refusal, and correction behavior.

This is a governance and evidence-safety requirement, not a legal conclusion.

### EC-03 — Exemplar Selection-Bias Review

Require the canon to record why the exemplar set is fit for the profession, known visibility or survivorship bias, material contextual breadth, excluded alternatives, and whether the inherited trait has been confused with access, privilege, institutional support, or cultural familiarity.

This does not impose demographic quotas or lower the achievement-evidence standard.

## Decision

```text
DR-006 principle: RETAIN
DR-006 production admission: BLOCKED
A2.4 direction: RETAIN WITH REQUIRED CORRECTIONS
Smallest next action: draft EC-01 through EC-03, then rerun pressure
```

The three failures do not undermine the operator's SOP. They show that mandatory human grounding increases the evidence burden and human-subject risk enough to require explicit safeguards.

## Non-Claims

This test does not:

- identify or evaluate a real practitioner;
- declare any person exemplary;
- infer any person's private traits;
- create or admit a Human-Trait Canon;
- revise CB-007 production;
- create, select, admit, recruit, or deploy a persona or Operative;
- authorize implementation or external effect.
