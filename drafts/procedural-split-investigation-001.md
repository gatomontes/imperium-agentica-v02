# Procedural Split Investigation 001

## Status

Investigation complete. Draft split materialized. Production unchanged.

```text
CB-002: unchanged
AB-001: unchanged
PB-001: unchanged
Procedure production: empty
Runtime: unadmitted
```

## Question

For each placement-contested Cognitive artifact:

```text
Which statements define native cognitive or other-layer meaning?
Which statements merely say what is supposed to happen,
in what order,
under which conditions?
```

## Reduced Procedure Test

A statement is procedural only when removing the ordering or condition would remove its meaning.

A statement is not procedural merely because it appears in a workflow.

```text
"CoS assembles the Situation Picture"
→ cognitive responsibility

"after a matching terminal return, CoS assembles the Terminal Situation Picture"
→ procedure citing that responsibility and a Provenance condition

"CEO may close under an effective mandate"
→ Authority condition plus cognitive responsibility

"after those cited findings are present, request the closure decision"
→ procedure
```

## Origin Matrix

| Concern | Native question | Procedure treatment |
|---|---|---|
| Cognitive | Who is responsible, capable, or prohibited? | Cite; never assign |
| Authority | May the exact action occur, and under which grant? | Cite finding; never authorize |
| Provenance | What is it, where did it come from, and does identity match? | Cite finding; never correlate |
| Native artifact contract | What does this artifact mean and require? | Cite; never define fields |
| Proof / evidence sufficiency | What supports acceptance of a claim? | Cite when admitted; otherwise block |
| Ownership | Who or what owns the asset or obligation? | Cite when admitted; otherwise block |
| Procedure | What happens next, in what order, under what conditions? | Define |
| Runtime | How is the transition executed? | Exclude |

## Candidate 1 — Counsel Availability Contract

### Cognitive-Native Content

Retain in Cognitive:

- competence absence and counsel-need distinctions
- `COUNSEL_REQUIRED`, `COUNSEL_UNAVAILABLE`, and `DECISION_WITHHELD` meanings
- CEO, CoS, Collegium, Preceptory, Muster, and Smith responsibilities and prohibitions
- Capability Gap Record meaning
- external advice non-admission
- separability as a substantive CEO finding

### Procedural Residue

Extract:

- trigger conditions
- default withheld sequence
- permitted continuation branches
- resolution conditions
- return to decision formation after counsel becomes available

### Foreign-Native Content

- permitted dispositions require Authority findings under AB-001
- mission and session matching require PB-001
- no new Proof or Ownership origin is required by this split

### Result

Two drafts:

- Cognitive revision: `layers/cognitive/drafts/counsel-availability-contract.md`
- Procedure: `layers/procedure/drafts/counsel-unavailability-procedure.md`

## Candidate 2 — Mission Closure And Operative Release Contract

### Cognitive-Native Content

Retain in Cognitive:

- completion claim, closure, release, and reuse distinctions
- CEO, CoS, Lazaretto, Muster, Scribes, Secretariat, and operative responsibilities
- terminal disposition meanings as cognitive decision vocabulary
- Mission Closure Record and Operative Release Record meanings
- release consequences and non-consequences
- mission-specific session and instance end meanings

### Procedural Residue

Extract:

- closure-assessment entry conditions
- wind-down ordering
- terminal-return branch
- closure-decision ordering
- release preconditions
- session, reporting, and delivery ordering

### Foreign-Native Content

- `BEGIN_WIND_DOWN`, `TERMINAL_DISPOSITION`, and `RELEASE_MISSION_BINDING` require Mission Envelope authority
- Executive decision requires the Executive Mandate
- all exact-match conditions require PB-001
- completion-criteria sufficiency has no admitted universal Proof origin

### Blocking Gap

The procedure may require a completion finding, but it cannot define what evidence proves the Work Specification satisfied.

Until an admitted native contract supplies that finding, the procedure must accept one of these bounded external inputs:

```text
COMPLETION_SUPPORTED
COMPLETION_NOT_SUPPORTED
COMPLETION_PARTIAL
COMPLETION_UNRESOLVED
```

These names are placeholders, not admitted Proof findings.

### Result

Two drafts:

- Cognitive revision: `layers/cognitive/drafts/mission-closure-and-release-contract.md`
- Procedure: `layers/procedure/drafts/mission-closure-and-release-procedure.md`

Authority refinement candidates are recorded separately.

## Candidate 3 — Cognitive Lifecycle

### Finding

The lifecycle sequence is Procedure-native.

Its role descriptions and anti-collapse distinctions are not unique definitions; they restate Cognitive contracts already admitted elsewhere.

Its authority and mission-isolation statements cite AB-001 and PB-001.

### Result

- no new Cognitive successor is required
- draft the sequence as `layers/procedure/drafts/imperium-lifecycle-procedure.md`
- on any future admission, remove `lifecycle.md` from the Cognitive baseline through an atomic baseline transition
- do not change CB-002 during this investigation

## Candidate 4 — Production Artifacts

### Finding

The file is primarily a native-artifact catalog, not a Procedure contract.

The Artifact Chain and handoff ordering are procedural. They do not justify a separate fourth procedure because the same sequence belongs in the end-to-end lifecycle.

### Native Split

Retain in a Cognitive draft catalog:

- Cognitive artifact names
- artifact distinctions and role-relative meanings
- native-contract citations
- terminal artifact distinctions

Move or cite elsewhere:

- Executive Mandate → AB-001
- Tool and Access Grant meanings → Authority draft refinements
- mission correlation and traceability → PB-001
- artifact ordering → lifecycle Procedure
- proof sufficiency → unresolved native origin
- ownership → unresolved unless a concrete ownership behavior appears

### Result

- Cognitive revision: `layers/cognitive/drafts/production-artifact-catalog.md`
- procedural residue absorbed into `imperium-lifecycle-procedure.md`
- no central Artifact layer is justified

## Authority Refinements Exposed

The split exposes two Authority specializations implied but not yet defined as standalone contracts:

1. `Mission Envelope`
2. `Capability Tool / Access Grants`

Drafts:

- `layers/authority/drafts/mission-envelope.md`
- `layers/authority/drafts/capability-tool-and-access-grants.md`

These refine AB-001 profiles. They do not change AB-001 production.

## Provenance Result

PB-001 already supplies the necessary native origins:

- mission correlation and isolation
- provider intervention lineage
- general provenance and supersession

No new Provenance contract is required by this split.

## Ownership Result

The four candidates mention custody, assignment, outstanding obligations, and reuse, but they do not yet demonstrate one stable universal Ownership concern.

Ownership remains an exposed question, not a new layer.

## Split Summary

```text
4 contested Cognitive artifacts
→ 3 Procedure drafts
→ 3 Cognitive revision drafts
→ 2 Authority refinement drafts
→ 0 Provenance additions
→ 0 Proof admissions
→ 0 Ownership admissions
→ 0 production changes
```

## Admission Consequences If Tests Later Pass

A future atomic transition would likely:

- establish the first Procedure baseline
- revise Counsel Availability and Mission Closure Cognitive contracts
- replace `production-artifacts.md` with a reduced native-artifact catalog
- remove `lifecycle.md` from the Cognitive manifest
- revise the Cognitive baseline
- optionally revise AB-001 only if the Authority refinements are independently admitted

No such transition is authorized by this investigation.
