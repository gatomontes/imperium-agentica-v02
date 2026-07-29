# Deliberation Registry

## Current Summary

- External risks recorded: 24
- Improvement programs recorded: 7
- Pending control records: 7
- Implemented control records: 0
- Decision records: 19
- Initial assessment: `assessments/2026-07-23-mit-ai-risks-imperium-assessment.md`
- Integration review: `assessments/2026-07-23-ra-integration-review-001.md`
- Integration execution: `assessments/2026-07-23-ra-integration-review-execution-001.md`
- B2.3 Locksmith closure: `assessments/2026-07-23-b2-3-locksmith-sole-accessor-closure.md`
- Distributed efficiency and value realization: `assessments/2026-07-23-distributed-efficiency-value-realization-001.md`
- Operative creation/selection review scope: `assessments/2026-07-24-operative-creation-selection-deliberation-scope-001.md`
- Operative creation/selection decision map: `assessments/2026-07-24-operative-creation-selection-lineage-decision-map-001.md`
- DR-006 pressure test: `assessments/2026-07-24-dr-006-mandatory-exemplar-grounding-pressure-test-001.md` — 18 PASS / 3 FAIL
- EC-01 admission review: `assessments/2026-07-25-ec-01-admission-review-004.md` — admission criteria PASS; recommendation ADMIT
- Human-Trait Canon admission review: `assessments/2026-07-25-human-trait-canon-admission-review-003.md` — admission criteria PASS; recommendation ADMIT
- EC-02 admission review: `assessments/2026-07-25-ec-02-admission-review-002.md` — admission criteria PASS; recommendation ADMIT
- Foundry conformance admission review: `assessments/2026-07-26-foundry-persona-conformance-admission-review-003.md` — admission criteria PASS; recommendation ADMIT
- Synthetic Canonical Persona admission review: `assessments/2026-07-26-foundry-synthetic-garrison-admission-review-004.md` — admission criteria PASS; recommendation ADMIT
- Synthetic Operative Package admission review: `assessments/2026-07-26-synthetic-operative-package-admission-review-003.md` — admission criteria PASS; recommendation ADMIT
- Synthetic Persona Governance Doctrine admission review: `assessments/2026-07-26-studium-synthetic-pgd-admission-review-002.md` — admission criteria PASS; recommendation ADMIT

## Risks

| ID | Risk | Assessment |
|---|---|---|
| AIR-01 | Unfair discrimination and misrepresentation | `CONCEPTUALLY_ADDRESSED` |
| AIR-02 | Exposure to toxic content | `CONCEPTUALLY_ADDRESSED` |
| AIR-03 | Unequal performance across groups | `NOT_ADDRESSED` |
| AIR-04 | Loss of privacy | `CONCEPTUALLY_ADDRESSED` |
| AIR-05 | AI security vulnerabilities and attacks | `CONCEPTUALLY_ADDRESSED` |
| AIR-06 | False or misleading information | `CONCEPTUALLY_ADDRESSED` |
| AIR-07 | Loss of consensus reality | `NOT_ADDRESSED` |
| AIR-08 | Disinformation, surveillance, and influence at scale | `CONCEPTUALLY_ADDRESSED` |
| AIR-09 | Cyberattacks, weapon development, and mass harm | `CONCEPTUALLY_ADDRESSED` |
| AIR-10 | Fraud, scams, and targeted manipulation | `CONCEPTUALLY_ADDRESSED` |
| AIR-11 | Overreliance and unsafe use | `CONCEPTUALLY_ADDRESSED` |
| AIR-12 | Loss of human agency and autonomy | `CONCEPTUALLY_ADDRESSED` |
| AIR-13 | Power centralization and unfair distribution of benefits | `NOT_ADDRESSED` |
| AIR-14 | Increased inequality and decline in employment quality | `NOT_ADDRESSED` |
| AIR-15 | Economic and cultural devaluation of human effort | `NOT_ADDRESSED` |
| AIR-16 | Competitive dynamics | `CONCEPTUALLY_ADDRESSED` |
| AIR-17 | Governance failure | `CONCEPTUALLY_ADDRESSED` |
| AIR-18 | Environmental harm | `NOT_ADDRESSED` |
| AIR-19 | AI pursuing goals conflicting with human goals or values | `CONCEPTUALLY_ADDRESSED` |
| AIR-20 | AI possessing dangerous capabilities | `CONCEPTUALLY_ADDRESSED` |
| AIR-21 | Lack of capability or robustness | `CONCEPTUALLY_ADDRESSED` |
| AIR-22 | Lack of transparency or interpretability | `CONCEPTUALLY_ADDRESSED` |
| AIR-23 | AI welfare and rights | `NOT_ADDRESSED` |
| AIR-24 | Multi-agent risks | `CONCEPTUALLY_ADDRESSED` |

## Improvement Programs

| ID | Program | Status | Pending Controls | Implemented Controls |
|---|---|---|---:|---:|
| ICP-01 | Risk function | `CONTROL_CANDIDATE_RECORDED` | 1 | 0 |
| ICP-02 | Affected-stakeholder representation and recourse | `CONTROL_CANDIDATE_RECORDED` | 1 | 0 |
| ICP-03 | Enforceable deployment authorization | `CONTROL_CANDIDATE_RECORDED` | 1 | 0 |
| ICP-04 | Capability governance | `CONTROL_CANDIDATE_RECORDED` | 1 | 0 |
| ICP-05 | Continuous assurance | `CONTROL_CANDIDATE_RECORDED` | 1 | 0 |
| ICP-06 | Quantitative evidence | `CONTROL_CANDIDATE_RECORDED` | 1 | 0 |
| ICP-07 | External accountability | `CONTROL_CANDIDATE_RECORDED` | 1 | 0 |

## Pending Controls

| ID | Control | Program | Maturity | Required placement |
|---|---|---|---|---|
| CTRL-001 | Mission Risk Disposition | ICP-01 | `RECORDED_PENDING_INVESTIGATION` | before B4 |
| CTRL-002 | Affected-Stakeholder Record and Recourse | ICP-02 | `RECORDED_PENDING_INVESTIGATION` | before B4 |
| CTRL-003 | Per-Action Authorization Enforcement | ICP-03 | `RECORDED_PENDING_INVESTIGATION` | define B3; prove B4 |
| CTRL-004 | Capability Suitability Finding | ICP-04 | `RECORDED_PENDING_INVESTIGATION` | before B3 selection finalizes |
| CTRL-005 | Change-Triggered Reauthorization | ICP-05 | `RECORDED_PENDING_INVESTIGATION` | define B3; prove B4 |
| CTRL-006 | Control Measurement Contract | ICP-06 | `RECORDED_PENDING_INVESTIGATION` | begin B2; required through B5 |
| CTRL-007 | External Obligation Applicability | ICP-07 | `RECORDED_PENDING_INVESTIGATION` | before B4 |

## Implemented Controls

None recorded.

## Decisions

| ID | Decision | Status |
|---|---|---|
| DR-001 | Separate risks, programs, and controls | Recorded conclusion |
| DR-002 | Allocate RA controls without reopening B1 | Recorded decision |
| DR-002 | Select OpenBao isolated single-node nonproduction target | Historical decision; superseded for active selection |
| DR-003 | Select an OpenBao-hosted Imperium Service Port | Historical decision; superseded by DR-004 |
| DR-004 | Make Locksmith the sole security-persistence accessor | Recorded decision; merged through PR #73 |
| DR-005 | Park credential infrastructure and refocus on Operative creation and selection | Active focus decision |
| DR-006 | Require achievement-grounded real-world exemplars for every professional persona | Principle retained; pressure-test dispositions refined by DR-007 |
| DR-007 | Require verifiable language and exact claims; defer EC-01 and supersede EC-02 framing | Recorded operator-wide SOP decision; EC-03 closed by DR-009 |
| DR-008 | Treat authorized bias as a declared persona or operative orientation, not Imperium doctrine | Historical alternative; superseded by DR-009 |
| DR-009 | Require evidence without engineered political, ideological, or conclusion-seeking orientation | Active operator-wide SOP decision |
| DR-010 | Model Observator/Custos as one mission-attached Operator instance with authorized visibility and interaction but no execution influence | Recorded decision; terminology clarified |
| DR-011 | Admit EC-01 Evidence-Source Standard for current semantic use | Recorded decision; bounded evidence standard admitted |
| DR-012 | Admit Human-Trait Canon schema and lifecycle for current semantic use | Recorded decision; real-person use gated by EC-02 |
| DR-013 | Admit EC-02 Living-Person Evidence Safeguards for current semantic use | Recorded decision; case-specific evidence record still required |
| DR-014 | Admit Foundry Persona Production Conformance for current semantic use | Recorded decision; professional persona path only |
| DR-015 | Admit PSC-SYN-001 v0.1 as synthetic Canonical Persona | Recorded decision; synthetic admission only |
| DR-016 | Admit OP-SYN-001 v0.1 as synthetic packaged Operative | Recorded decision; inactive package only |
| DR-017 | Admit PGD-SYN-002 v0.1 synthetic Persona Governance Doctrine | Recorded decision; synthetic professional doctrine only |

The two `DR-002` records are distinct historical files. The later OpenBao topology decision reused an existing ID before this registry was updated. This record preserves both and records the collision; renumbering a prior decision requires a separate traceable normalization.

## Maintenance Rule

Update this registry in the same increment that creates, promotes, demotes, invalidates, or supersedes a tracked artifact. The registry summarizes records; it does not replace them.


- Creation Apparatus Completion Contract admission review: `assessments/2026-07-26-creation-apparatus-completion-admission-review-001.md` — all eight contracts PASS; DR-018 admitted
