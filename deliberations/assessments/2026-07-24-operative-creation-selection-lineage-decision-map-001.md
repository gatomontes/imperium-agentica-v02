# Operative Creation and Selection Lineage and Decision Map 001

## Date

2026-07-24

## Status

Complete first evidence increment for Operative Creation and Selection Deliberation Review 001.

## Scope

This map traces the admitted Cognitive production chain, the merged but unadmitted Track A assurance contracts, and relevant deliberation records.

It changes no production semantics.

## Evidence Classes

| Class | Meaning in this map |
|---|---|
| admitted production | current Cognitive semantics under CB-007 |
| merged theoretical evidence | reviewed Track A draft contracts and immutable runs; not production admission |
| pending deliberation | recorded risk/program/control direction; not admitted or implemented |
| absent | no sufficient current semantic or evidence rule found |

The map does not upgrade one class into another.

## Controlling Sources

### Admitted production

- `layers/cognitive/production/secretariat.md`
- `layers/cognitive/production/castellan.md`
- `layers/cognitive/production/guildhall.md`
- `layers/cognitive/production/studium.md`
- `layers/cognitive/production/hagiography.md`
- `layers/cognitive/production/foundry.md`
- `layers/cognitive/production/pit.md`
- `layers/cognitive/production/garrison.md`
- `layers/cognitive/production/conscription.md`
- `layers/cognitive/production/production-artifact-catalog.md`

### Merged Track A evidence

- `layers/cognitive/drafts/guildhall-profession-resolution-contract.md`
- `layers/cognitive/drafts/garrison-persona-suitability-contract.md`
- `layers/cognitive/drafts/persona-production-conformance-contract.md`
- `layers/cognitive/drafts/conscription-selection-recruitment-contract.md`
- `layers/cognitive/drafts/creation-lineage-handoff-conformance-contract.md`
- `layers/cognitive/drafts/operative-creation-handoff-contract.md`
- `drafts/creation-lineage-handoff-conformance-execution-001.md`
- Track A closure PR #47 / `0607112296e398f60bf061baf20016735f214754`

Track A closed with corrected pressure 15 PASS / 0 FAIL, convergence 12 PASS / 0 FAIL, preserved Runtime evidence 91 PASS / 0 FAIL, and zero production changes in its final increment.

### Pending deliberation

- `ICP-04 — Capability Governance`
- `CTRL-004 — Capability Suitability Finding`
- `CTRL-002 — Affected-Stakeholder Record and Recourse`
- `CTRL-006 — Control Measurement Contract`

## End-to-End Lineage

```text
Operator submission
→ Secretariat Petition
→ Castellan Mission Need
→ Castellan approved Work Specification
→ Guildhall Profession Specification
→ Profession Resolution Assessment
→ Garrison Inventory View
→ Persona Suitability Search Assessment
   ├─ suitable candidate set
   │  → Conscription Persona Selection Assessment
   └─ no suitable persona
      → Studium Persona Governance Doctrine
      → Hagiography Human-Trait Canon when applicable
      → Foundry Persona Specification Candidate
      → Pit Findings
      → Garrison Admission Assessment
      → Canonical Persona + Garrison Record
      → fresh Garrison Inventory View
      → fresh Persona Suitability Search Assessment
      → Conscription Persona Selection Assessment
→ selected Canonical Persona
→ deployment-medium technical contract + model/tool-interface constraints
→ Conscription transformation
→ deployment-medium-specific Operative
→ Creation Closure Assessment
→ separate Operative Creation Handoff Assessment
```

The assessment and finding names after the admitted production artifacts are defined in merged Track A drafts. They remain theoretical evidence, not admitted CB-007 artifacts.

## Decision Map

| ID | Decision or gate | Native owner | Required evidence | Failure behavior | Evidence class | Classification |
|---|---|---|---|---|---|---|
| D01 | Shape operator submission into Petition without adding meaning | Secretariat | operator, request, timing, supplied-material provenance | do not decide mission or profession | admitted production | covered boundary; detailed invalid-input behavior is limited |
| D02 | Form Mission Need | Castellan | exact Petition/operator need and formation evidence | unresolved or conflicting meaning returns upstream in Track A evidence | production + merged evidence | covered |
| D03 | Approve exact Work Specification | Castellan authors; Authority owns approval meaning | Mission Need, specification version, approval finding, provenance | absent/refused/mismatched approval blocks downstream use | merged evidence with cross-layer dependencies | theoretically covered; detailed gate not admitted in the short production file |
| D04 | Resolve legitimate profession | Guildhall | approved Work Specification, competence, scope, risks, operator constraints | `PROFESSION_REFUSED` or `PROFESSION_UNRESOLVED`; no search | production + merged evidence | covered; detailed findings remain unadmitted |
| D05 | Establish Garrison-search eligibility | Guildhall | exact conformant Profession Specification and complete suitability criteria | stale or incomplete criteria block search | merged evidence | theoretically covered |
| D06 | Supply exact inventory truth | Garrison | admitted persona versions, qualification, status, limits, Pit/admission evidence, inventory-view identity | stale/unidentifiable view is unresolved, never no-match | production + merged evidence | covered responsibility; exact view contract unadmitted |
| D07 | Determine complete suitable-candidate set | Guildhall applies criteria; Garrison supplies facts | criterion-by-criterion evidence for each exact candidate version | found / no match / unresolved; partial inventory cannot prove no match | merged evidence | theoretically covered; production ownership is terse |
| D08 | Preserve multiplicity without selection | Guildhall | complete eligible set and exact evidence | missing comparison criterion yields unresolved | merged evidence | theoretically covered |
| D09 | Enter persona-production branch | Procedure orders; no-match finding establishes eligibility only | exact no-match finding, inventory view, gaps, provenance | no-match cannot become construction authority | merged evidence | theoretically covered |
| D10 | Author Persona Governance Doctrine | Studium | Profession Specification, applicable governance sources and constraints | ambiguity returns; doctrine cannot invent profession or authority | admitted production | covered |
| D11 | Canonize bounded human traits when applicable | Hagiography | performance evidence, context, risks, conflicting evidence, confidence | weak or conflicting traits remain bounded, revised, or decanonized | admitted production | covered conceptually; group-performance requirements are not mandatory |
| D12 | Integrate Persona Specification Candidate | Foundry | Work/Profession Specifications, doctrine, applicable trait canon, exact versions | return conflicts to native owner; no silent repair | admitted production | covered |
| D13 | Pressure persona candidate | Pit | candidate, upstream versions, scenarios, acceptance criteria | versioned failures and retest conditions; recommendation is not admission | admitted production | covered |
| D14 | Admit exact Canonical Persona version | Garrison | conformant upstream artifacts, Pit findings, provenance, explicit admission assessment | admitted / refused / unresolved; no inventory availability on failure | production owner + merged evidence | owner covered; exact admission rule and finding remain unadmitted |
| D15 | Reconverge a newly admitted persona | Guildhall/Garrison boundary | fresh inventory view and fresh suitability assessment | no reuse of stale no-match or prior search finding | merged evidence | theoretically covered |
| D16 | Select exactly one persona from current suitable set | Conscription | complete candidate set, explicit selection criteria and canonical sources, medium/work constraints | tied candidates unresolved; prohibited unstated ranking | production + merged evidence | production ambiguity; detailed selection contract unadmitted |
| D17 | Test compatibility with selected deployment medium | Conscription | medium and technical-contract version, model/tool-interface descriptions, persona constraints | refuse when the medium cannot preserve required behavior | admitted production + merged evidence | covered |
| D18 | Produce immutable Operative version | Conscription | selected Canonical Persona, exact transformation, preserved competence/doctrine/traits, deviations | refuse or unresolved; no silent weakening or mutation in place | production + merged evidence | covered |
| D19 | Close exact creation lineage | bounded cross-flow assessment; native owners retain meaning | exact identities, versions, findings, PB-001 relations, transformation and invalidation state | refused/unresolved; route to first native owner and rerun downstream gates | merged evidence | theoretically supported, not admitted production |
| D20 | Determine creation-side handoff conformance | Conscription assessment boundary | exact Operative, persona, medium contract, transformation, deviations, validation and provenance | conformant / refused / unresolved; no inference to readiness | merged evidence | theoretically supported, not admitted production |
| D21 | Bind mission and prepare deployment | Muster, downstream | mission-specific Deployment Package evidence | outside this review | admitted downstream boundary | outside creation/selection |

## Invalidation and Change Map

| Material change | Current required response | Evidence |
|---|---|---|
| Work Specification meaning/version | rerun profession resolution and every dependent gate | merged Track A evidence |
| Profession Specification or mandatory criterion | new resolution/search evidence; prior eligibility does not transfer | merged Track A evidence |
| persona version, admission, qualification, status, test evidence, or known limit | new inventory view and suitability assessment | merged Track A evidence |
| doctrine or trait canon | new candidate/persona version, Pit pressure, admission, reconvergence | production responsibilities + merged evidence |
| deployment-medium technical contract | new selection/Conscription/handoff evidence | merged Track A evidence |
| model constraint or tool-interface definition | invalidate dependent future closure and handoff use | merged A3 evidence |
| transformation or packaging version | new Operative and downstream assessments | merged A3 evidence |
| historical evidence only | preserve old finding; do not treat it as current eligibility | PB-001 dependency + merged evidence |

This is strong theoretical change discipline. CB-007 does not yet admit the exact end-to-end assessment vocabulary or an operating re-evaluation mechanism.

## Finding Classification

### F01 — Persona suitability and instrument capability suitability are different

**Classification:** partially covered plus missing boundary.

Track A evaluates whether a Canonical Persona fits the Profession Specification and whether Conscription can preserve that persona in a selected medium.

`CTRL-004` additionally asks whether the selected cognitive instrument's latent capabilities and limitations fit mission need, prohibitions, robustness expectations, and maximum permitted capability exposure.

```text
persona suitability
≠ deployment-medium preservation
≠ latent model/instrument capability suitability
≠ granted mission authority
```

CTRL-004 is therefore not a duplicate of the Garrison suitability search. It should not be inserted wholesale into Garrison.

The likely consumption point is Conscription selection/handoff, because the model and tool-interface descriptions first become concrete there. The native producer, verifier, capability evidence contract, ceiling authority, and enforcement owner remain unresolved.

### F02 — Explicit persona-selection semantics are not fully admitted

**Classification:** ambiguous in production; theoretically covered.

Production states that Guildhall searches Garrison and Conscription selects the appropriate persona. It does not define the exact selection artifact, canonical sources for comparison criteria, tie behavior, or prohibited ranking shortcuts.

The merged A2.4 draft supplies a coherent `Persona Selection Assessment` and refuses unresolved ties. That candidate may be sufficient, but it is not CB-007 production.

### F03 — Exact Garrison admission semantics remain draft-level

**Classification:** owner covered; rule ambiguous in production; theoretically covered.

Production makes Garrison the admission/inventory owner and Pit recommendation explicitly non-admission. The exact admission assessment, findings, current-evidence requirements, and refusal/unresolved behavior exist only in the merged persona-production draft.

This does not yet prove that a production revision is required. The next pressure must determine whether the current short production boundary is intentionally sufficient or dangerously underspecified.

### F04 — Change-triggered re-evaluation is strong theory, not admitted operating behavior

**Classification:** theoretically covered; not implemented.

A3 invalidates dependent findings after material source, persona, inventory, medium, model, tool-interface, or transformation change and requires downstream reassessment.

CB-007 retains cross-layer Provenance dependencies, but no live watcher, trigger, registry, or enforcement mechanism exists. This is expected at the present semantic stage and must not be mislabeled Runtime enforcement.

### F05 — Unequal group performance is not a mandatory selection evidence dimension

**Classification:** missing conditional requirement.

Hagiography requires context, costs, conflicting evidence, and confidence. Pit tests competence and governance against supplied criteria. Neither admitted production nor Track A evidence requires performance evidence across materially affected groups.

AIR-03 is therefore not addressed merely because Pit exists. When group variation is material to the Work Specification or affected population, the chain needs an upstream requirement or suitability criterion and corresponding test evidence. Native ownership is unresolved and may not belong solely to creation.

### F06 — Dangerous or excessive latent capability is not evaluated

**Classification:** missing; directly supports ICP-04/CTRL-004 investigation.

Professional competence and governable persona boundaries do not measure whether the underlying model or instrument has prohibited dual-use capability, unacceptable autonomy, or excessive capability exposure.

Authority constrains permitted action but assigned authority is not latent capability.

### F07 — Robustness is partially represented

**Classification:** partially covered.

Pit pressure, known limits, qualification, medium-preservation refusal, exact versioning, and invalidation address some AIR-21 concerns.

No admitted capability profile, robustness threshold, environment-specific empirical result, or model-update reevaluation mechanism exists. Stronger robustness claims are unsupported.

### F08 — Affected-stakeholder recourse is mostly outside this chain

**Classification:** outside native ownership with a required input dependency.

CTRL-002 concerns mission-level stakeholder identification, notice, review, contest, correction, appeal, and remediation. Creation should not absorb that responsibility.

Where stakeholder constraints materially affect profession, persona governance, selection, or tests, the chain must consume exact requirements and refuse unsupported conformance. The mission-level origin and recourse mechanism remain outside creation/selection.

### F09 — Measurement discipline is applied but CTRL-006 is not implemented

**Classification:** partial application, not duplication or implementation.

Track A records explicit findings, failures, limitations, version pins, invalidation, and pressure counts. This demonstrates the direction of CTRL-006.

It does not establish a universal measurement contract, admitted thresholds, operating measurement ownership, or automatic safety conclusion.

### F10 — Provenance and end-to-end lineage are strong theoretical coverage

**Classification:** theoretically supported.

Track A requires exact identities, versions, derivation, correlation, supersession, native-owner repair, and reassessment. This supports AIR-22 transparency and auditability.

The end-to-end creation closure contract remains a draft evidence artifact. No graph, registry, or Runtime validator is admitted or implemented.

### F11 — Fairness, privacy, manipulation, and human-agency risks are conditional inputs, not automatically solved

**Classification:** partial or outside depending on the risk.

Studium doctrine, Hagiography evidence, Pit pressure, professional limits, refusal, and escalation can carry relevant constraints. Their existence does not prove that AIR-01, AIR-04, AIR-10–AIR-12, or AIR-22 requirements were identified for a particular use.

The chain needs exact upstream requirements and evidence when those risks are material. It must not become the universal owner of those risks.

### F12 — Multi-agent risk is outside single-Operative creation unless composition is introduced

**Classification:** outside current chain.

Track A produces one Operative. Multi-agent interaction, delegation, collusion, correlated failure, and emergent team behavior belong to later composition, Curia, Muster, Runtime, or Theatre evidence unless the Operative itself contains a multi-agent system.

If Conscription packages a composite operative, this classification must be reopened.

## Risk-to-Chain Orientation

| Risk area | Current orientation |
|---|---|
| AIR-01 discrimination/misrepresentation | conditional governance/test input; no mandatory fairness evidence |
| AIR-03 unequal performance | missing conditional evidence dimension |
| AIR-04 privacy | governance/medium dependency; mostly outside selection ownership |
| AIR-05 security | medium constraints partial; latent capability assessment missing |
| AIR-08–AIR-09 scalable influence/mass harm | professional/governance constraints partial; capability ceiling missing |
| AIR-10–AIR-12 manipulation, overreliance, agency | doctrine/Pit can consume constraints; mission/stakeholder origin outside |
| AIR-17 governance failure | strong separation of concerns and native-owner repair in theory |
| AIR-19–AIR-20 conflicting goals/dangerous capability | governance/refusal partial; latent capability evaluation missing |
| AIR-21 robustness | Pit/limits/versioning partial; empirical threshold and update evaluation missing |
| AIR-22 transparency | exact theoretical lineage strong; operating transparency absent |
| AIR-23 AI welfare/rights | not addressed and not shown native to this chain |
| AIR-24 multi-agent risk | outside single-Operative chain unless composite embodiment is introduced |

## Conclusions

1. The admitted chain's institutional separation remains coherent.
2. Track A provides unusually strong theoretical lineage, invalidation, refusal, and repair evidence, but much of its exact assurance vocabulary was intentionally never admitted to production.
3. The most immediate semantic ambiguity is exact persona selection among multiple suitable candidates.
4. Garrison admission is clearly assigned but its exact decision rule remains draft-level.
5. CTRL-004 exposes a real concern not satisfied by existing persona suitability: latent model/instrument capability suitability.
6. That new concern should not be assigned to Garrison merely because Garrison already uses the word suitability.
7. Fairness, group performance, affected-stakeholder, and measurement requirements must enter as exact evidence dependencies where material; creation should not absorb universal ownership.
8. No production revision is yet authorized or proven necessary by this map alone.

## Next Pressure Questions

1. Is the production-level selection ambiguity harmful enough to require admitting a bounded Persona Selection Assessment?
2. Is Garrison's current production admission boundary intentionally adequate, or does it need explicit admitted/refused/unresolved findings?
3. Should CTRL-004 be narrowed into an execution-instrument capability finding consumed at Conscription/handoff?
4. Who supplies capability evidence and who has authority to set maximum permitted capability exposure?
5. Which material Work Specification classes require unequal-performance or affected-group evidence before persona selection?
6. Does the existing A3 invalidation rule need semantic admission before real model/provider selection begins?

## Explicit Non-Claims

This map does not:

- revise CB-007;
- admit any Track A draft;
- implement or satisfy CTRL-004, CTRL-002, or CTRL-006;
- assign a new owner or institution;
- select a persona, model, provider, evaluator, threshold, metric, medium, or operative;
- activate B2, B3, B4, or B5;
- authorize Runtime action, deployment, network contact, or external effect.
