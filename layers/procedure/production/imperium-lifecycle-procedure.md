# Imperium Lifecycle Procedure

## Status

Admitted Procedure production contract.

Baseline: `PRB-001`.

Admission: `Procedure Production Admission Review 001`.

Evidence:

- `Procedure Pressure Run 002 — 35 PASS / 0 FAIL`
- `Procedure Convergence Run 002 — 21 PASS / 0 FAIL`

Origin draft: `layers/procedure/drafts/imperium-lifecycle-procedure.md`.

## Canonical Dependency Sets

- Cognitive baseline: `layers/cognitive/production/README.md`
- Cognitive production contracts: `layers/cognitive/production/`
- Artifact catalog: `layers/cognitive/production/production-artifact-catalog.md`
- Authority baseline: `layers/authority/production/README.md`
- Authority production refinements: `layers/authority/production/mission-envelope.md`, `layers/authority/production/capability-tool-and-access-grants.md`
- Provenance baseline: `layers/provenance/production/README.md`
- Counsel procedure: `layers/procedure/production/counsel-unavailability-procedure.md`
- Closure procedure: `layers/procedure/production/mission-closure-and-release-procedure.md`

## Global Entry Rule

A stage begins only when its cited native contracts supply the required inputs and findings.

Absence, mismatch, or refusal does not permit the procedure to invent a substitute.

## Stage 1 — Mission Formation

```text
Petition
→ Mission Need
→ Work Specification
```

Conditions:

- operator intent has been shaped as a Petition
- the exact Petition identity scopes the `FORM_MISSION` Authority finding
- Petition identity is non-authorizing and does not approve mission formation
- Castellan responsibility accepts formation
- PB-001 supplies the Mission Identity after formation
- a separate effective Authority finding permits `APPROVE_WORK_SPECIFICATION` for that Mission Identity
- the Work Specification preserves the admitted mission meaning

Exit: an authorized approved Work Specification or an explicit refusal/blocker.

## Stage 2 — Profession And Persona Resolution

```text
Work Specification
→ Profession Specification
→ Garrison search
    ├── suitable admitted persona found
    └── none found
         → governance doctrine
         → trait canon when applicable
         → Persona Specification Candidate
         → Pit Findings
         → admission decision
```

Conditions and responsibilities are defined by the cited Cognitive contracts.

A failed or absent persona does not authorize recruitment.

## Stage 3 — Recruitment

```text
admitted Canonical Persona
+ deployment-medium contract
→ Operative
```

The Operative may exit directly to operator delivery.

Mission binding is a separate path and requires its own authority and provenance conditions.

## Stage 4 — Mission Binding And Assembly

```text
Operative
+ effective Mission Envelope
+ Mission Identity and Operative Binding
+ Work Specification
+ Mission Inquest
+ permitted Tool and Access Grants
→ mission-specific Muster Instance
→ Deployment Package
```

Conditions:

- AB-002 findings support each exact mission and capability action
- PB-001 supplies exact mission correlation
- all Cognitive inputs exist under their native contracts

`READY_FOR_LAUNCH` is an assembly finding, not launch authority.

## Stage 5 — Initial External Crossing

```text
Deployment Package
+ effective INITIAL_EXTERNAL_CROSSING authority
+ exact correlation
→ Iron Gate
→ Theatre
```

This sequence does not assign Iron Gate responsibility or define runtime routing. It cites the Cognitive boundary.

## Stage 6 — Continuing Provider Support

```text
Theatre
↔ Barbican
↔ Armory / Locksmith
```

Each intervention requires:

- matching Tool or Access Grant
- exact PB-001 ticket and mission correlation
- provider observations preserved under PB-001

Provider completion does not determine mission success.

## Stage 7 — Live Mission Control

```text
Theatre return
→ Lazaretto
→ mission-specific Curia Session
→ Situation Picture
→ competent and authorized CEO decision
→ Curia Minute
→ Muster
→ authorized outbound instruction
→ Iron Gate
→ Theatre
```

Branches:

- required counsel unavailable → `layers/procedure/production/counsel-unavailability-procedure.md`
- authority unavailable → cited safe-state instruction; no invented action
- provenance mismatch → reject or quarantine under PB-001
- decision authorized → continue exact handoff

## Stage 8 — Closure And Post-Closure Branches

Delegate the complete terminal sequence to:

`layers/procedure/production/mission-closure-and-release-procedure.md`.

After `MISSION_CLOSED`, preserve three independent branches:

```text
MISSION_CLOSED
├── release branch → Operative Release Record or explicit unresolved release
├── session-end branch → Curia Session ends; standing assignments remain
└── report branch → Final Report → Delivery Package → operator
```

The report branch requires applicable `REPORT_AND_DELIVER` authority but does not require successful release. It must expose release status and outstanding obligations.

The Muster Instance remains until its release responsibility completes or an authorized terminal instruction preserves the unresolved state.

No lifecycle statement may compress completion claim, closure, release, reporting, or delivery into one transition.

## Optionality Rule

Not every path requires every optional artifact.

An omission is valid only when a cited native contract permits it and the omission is explicit.

Procedure does not decide that an artifact is unnecessary.

## Anti-Compression Rules

```text
Petition ≠ Mission Need
Work Specification ≠ Profession Specification
Canonical Persona ≠ Operative
Operative ≠ mission binding
Deployment Package ≠ deployment
READY_FOR_LAUNCH ≠ launch authority
provider result ≠ mission judgment
completion claim ≠ closure
closure ≠ release
release ≠ reuse authority
report ≠ substantive decision
```

The native meanings come from cited contracts. This procedure preserves their required separation and order.

## Runtime Boundary

This draft defines no:

- queue
- scheduler
- retry timer
- service
- event bus
- state-machine implementation
- database transaction
- credential behavior
- network route
- autonomous execution

A later Runtime layer may implement admitted procedures without redefining them.
