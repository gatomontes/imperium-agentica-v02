# CB-001 Layer-Placement Review

## Status

Draft review.

No CB-001 production artifact is moved, split, demoted, or edited by this document.

This review applies the approved authority and provenance boundaries and the tested native-concern artifact rule.

---

## Decision Vocabulary

```text
KEEP:
native concern remains cognitive

KEEP AND SPLIT:
cognitive identity remains; non-cognitive native contracts or prescriptive ordering should move when a target layer exists

RELOCATE:
the file's native concern belongs in another approved layer

RELOCATE OR SPLIT TO PROCEDURE:
native concern or substantial content is procedural, but no procedural layer is admitted

CONVERT TO INDEX:
retain orientation only; canonical definitions live with native owners
```

---

## Manifest Review

| # | File | Recommendation | Finding |
|---:|---|---|---|
| 1 | `secretariat.md` | KEEP | Administrative intake and delivery responsibility is cognitive. Authorization references remain external. |
| 2 | `castellan.md` | KEEP | Mission formation and Work Specification responsibility is cognitive. Approval authority must be cited from authority later. |
| 3 | `guildhall.md` | KEEP | Profession-resolution responsibility is cognitive. |
| 4 | `studium.md` | KEEP AND SPLIT | Doctrine stewardship remains cognitive; represented authority sources and grant semantics belong to authority. |
| 5 | `hagiography.md` | KEEP | Human-Trait Canon responsibility remains cognitive; proof sufficiency stays contextual. |
| 6 | `foundry.md` | KEEP | Persona-fitting responsibility remains cognitive. |
| 7 | `pit.md` | KEEP AND SPLIT | Testing responsibility remains cognitive; admission authority must come from authority. |
| 8 | `garrison.md` | KEEP AND SPLIT | Custody of admitted personas remains cognitive; admission permission does not originate here. |
| 9 | `conscription.md` | KEEP AND SPLIT | Recruitment transformation remains cognitive; recruitment authorization belongs to authority. |
| 10 | `gesta.md` | KEEP | Officer-trait canonization responsibility remains cognitive. |
| 11 | `collegium.md` | KEEP | Advisory-role resolution remains cognitive. |
| 12 | `preceptory.md` | KEEP AND SPLIT | Custody of admitted Officers remains cognitive; admission permission does not originate here. |
| 13 | `smith.md` | KEEP | Officer-fitting responsibility remains cognitive. |
| 14 | `spur.md` | KEEP AND SPLIT | Officer testing remains cognitive; admission authority belongs elsewhere. |
| 15 | `session-assignment.md` | KEEP AND SPLIT | Participation-contract meaning remains cognitive; issuance authority and lineage requirements cite authority and provenance. |
| 16 | `ceo-president.md` | KEEP AND SPLIT | CEO role and responsibility remain cognitive; mandate semantics relocate to authority and decision lineage to provenance. |
| 17 | `chief-of-staff.md` | KEEP AND SPLIT | Curial Orchestration remains cognitive; access authority and Minute lineage cite parallel layers. |
| 18 | `standing-curia-role-requirements.md` | KEEP AND SPLIT | Qualification and placement requirements remain cognitive; assignment issuance authority belongs to authority. |
| 19 | `executive-mandate.md` | RELOCATE TO AUTHORITY | Its native question is bounded executive permission, not cognitive responsibility. |
| 20 | `counsel-availability-contract.md` | RELOCATE OR SPLIT TO PROCEDURE | Trigger, default disposition, alternate paths, and resolution are prescriptive ordering. Authority constraints should cite authority. |
| 21 | `mission-closure-and-release-contract.md` | RELOCATE OR SPLIT TO PROCEDURE | Its phases and ordered conditions are procedural. Cognitive artifact meanings and authority constraints may require separate native contracts. |
| 22 | `mission-concurrency-and-isolation-contract.md` | RELOCATE TO PROVENANCE | Correlation, isolation, collision, and exact-match semantics are provenance-native. Capacity policy remains external. |
| 23 | `curia.md` | KEEP AND SPLIT | Curia identity and role separation remain cognitive; mandatory flows, authority findings, and lineage rules cite their owners. |
| 24 | `provider-intervention-ledgers.md` | RELOCATE TO PROVENANCE | Observed-stage lineage and non-inference are provenance-native. |
| 25 | `muster.md` | KEEP AND SPLIT | Mission-assembly responsibility remains cognitive; binding/launch authority, lineage, and mandatory sequences cite other layers. |
| 26 | `la-cortine.md` | KEEP | Non-acting namespace and port topology remain cognitive. |
| 27 | `iron-gate.md` | KEEP AND SPLIT | Port identity remains cognitive; launch authority and outward lineage belong to authority and provenance. |
| 28 | `barbican.md` | KEEP AND SPLIT | Port responsibility remains cognitive; provider-ticket lineage belongs to provenance. |
| 29 | `inquisition.md` | KEEP | Mission-terrain investigation responsibility remains cognitive. Restricted acquisition authority remains external. |
| 30 | `armory-locksmith.md` | KEEP AND SPLIT | Provider responsibilities and custody remain cognitive; Tool/Access Grants belong to authority and ledgers to provenance. |
| 31 | `theatre.md` | KEEP | External-terrain boundary remains cognitive. External execution authority and runtime remain excluded. |
| 32 | `lazaretto.md` | KEEP AND SPLIT | Sanitation responsibility remains cognitive; transformation lineage belongs to provenance and sanitation permission to authority. |
| 33 | `chamber-of-scribes.md` | KEEP | Reporting responsibility remains cognitive; derivation lineage cites provenance. |
| 34 | `cognitive-map.md` | KEEP AND TRIM | Structural topology remains cognitive; prescriptive sequences and foreign contract definitions must become citations. |
| 35 | `lifecycle.md` | RELOCATE OR SPLIT TO PROCEDURE | Its native concern is what is supposed to happen in order. |
| 36 | `production-artifacts.md` | CONVERT TO INDEX AND SPLIT | Retain artifact inventory and canonical locations; move native authority/provenance contracts and remove competing definitions. |

---

## Immediate Relocation Candidates

Only three files have sufficiently clear non-cognitive native concerns and admitted target boundaries:

```text
executive-mandate.md
→ authority

mission-concurrency-and-isolation-contract.md
→ provenance

provider-intervention-ledgers.md
→ provenance
```

However, target production baselines do not yet exist.

These files must not be removed from CB-001 until:

1. target draft counterparts are created
2. references are normalized
3. authority and provenance suites pass
4. convergence passes
5. revised cognitive tests pass
6. target production admission is explicitly approved
7. target files are created and verified before cognitive sources are removed or replaced

---

## Procedural Candidates

```text
counsel-availability-contract.md
mission-closure-and-release-contract.md
lifecycle.md
```

No procedural target exists.

These files remain contested in CB-001 until authority, provenance, and procedural boundaries allow safe splitting or relocation.

They must not be used as proof that a procedural layer is already admitted.

---

## Split Principle

A cognitive entity file may state:

- identity
- responsibility
- product
- inputs and consumers
- non-authority
- structural relationships

It should cite rather than redefine:

- authority grants and findings
- provenance relations and findings
- mandatory procedural ordering
- runtime implementation

Brief boundary summaries may remain for orientation only when the canonical origin is explicit.

---

## Migration Risk

Moving files before target contracts are admitted would create a temporary definition void.

Editing production files in place would erase the evidence that exposed the boundary problem.

Therefore any migration must be:

- versioned
- dependency-closed
- tested
- atomic by manifest
- explicitly approved
- reversible by repository history

---

## Recommendation

```text
CB-001: KEEP ACTIVE BUT CONTESTED IN PLACEMENT
IMMEDIATE PRODUCTION MOVEMENT: WITHHOLD
NEXT: stabilize authority and provenance draft contracts,
then prepare a dependency-closed migration manifest
```

No wholesale demotion is justified.

The cognitive ontology remains structurally useful. The problem is concern placement, not systemic collapse.
