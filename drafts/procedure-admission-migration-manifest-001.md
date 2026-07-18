# Procedure Admission Migration Manifest 001

## Status

Candidate atomic migration manifest.

```text
Execution: NOT AUTHORIZED
Production changes: NONE
Operator admission decision: REQUIRED
```

## Transition

```text
Cognitive Baseline CB-002 → CB-003
Authority Baseline AB-001 → AB-002
Provenance Baseline PB-001 → PB-001 unchanged
Procedure production empty → Procedure Baseline PRB-001
Runtime unadmitted → unchanged
```

The transition must be atomic because each candidate baseline cites the others.

## Procedure Baseline PRB-001

Candidate manifest: 3 artifacts.

1. `counsel-unavailability-procedure.md`
2. `mission-closure-and-release-procedure.md`
3. `imperium-lifecycle-procedure.md`

Sources:

- `layers/procedure/drafts/counsel-unavailability-procedure.md`
- `layers/procedure/drafts/mission-closure-and-release-procedure.md`
- `layers/procedure/drafts/imperium-lifecycle-procedure.md`

Evidence:

- structural split run: 16 PASS / 0 FAIL
- Procedure Pressure Run 002: 35 PASS / 0 FAIL
- corrected convergence Run 002: 21 PASS / 0 FAIL

## Authority Baseline AB-002

Candidate manifest: 5 artifacts.

1. `authority-origin-contract.md`
2. `authority-grant-profiles.md`
3. `executive-mandate.md`
4. `mission-envelope.md`
5. `capability-tool-and-access-grants.md`

New sources:

- `layers/authority/drafts/mission-envelope.md`
- `layers/authority/drafts/capability-tool-and-access-grants.md`

Evidence:

- Authority Regression Run 002: 67 PASS / 0 FAIL
- Mission Envelope Run 002: 15 PASS / 0 FAIL
- Capability Grant Run 002: 15 PASS / 0 FAIL
- corrected convergence Run 002: 21 PASS / 0 FAIL

AB-002 adds specializations to existing profiles. It does not add a seventh grant profile.

## Cognitive Baseline CB-003

Candidate manifest size: 33 artifacts.

### Revisions At Existing Production Paths

- `counsel-availability-contract.md` ← Cognitive split draft
- `mission-closure-and-release-contract.md` ← Cognitive split draft
- `cognitive-map.md` ← Procedure-reduced Cognitive Map draft

### Rename / Replacement

- remove `production-artifacts.md`
- add `production-artifact-catalog.md`

The replacement remains a native-artifact index and is not a central Artifact layer.

### Addition

- add `work-specification-completion-assessment.md`

### Relocation Out Of Cognitive

- remove `lifecycle.md`
- admit its unique procedural residue as `layers/procedure/production/imperium-lifecycle-procedure.md`

### Unchanged CB-002 Artifacts

The remaining 28 Cognitive artifacts are incorporated by exact repository version reference.

### Candidate CB-003 Manifest

#### Intake And Mission Formation

1. `secretariat.md`
2. `castellan.md`
3. `work-specification-completion-assessment.md`

#### Profession And Persona Production

4. `guildhall.md`
5. `studium.md`
6. `hagiography.md`
7. `foundry.md`
8. `pit.md`
9. `garrison.md`

#### Recruitment

10. `conscription.md`

#### Citadel Officers And Curia

11. `gesta.md`
12. `collegium.md`
13. `preceptory.md`
14. `smith.md`
15. `spur.md`
16. `session-assignment.md`
17. `ceo-president.md`
18. `chief-of-staff.md`
19. `standing-curia-role-requirements.md`
20. `counsel-availability-contract.md`
21. `mission-closure-and-release-contract.md`
22. `curia.md`

#### Mission Assembly And Boundary

23. `muster.md`
24. `la-cortine.md`
25. `iron-gate.md`
26. `barbican.md`
27. `inquisition.md`
28. `armory-locksmith.md`
29. `theatre.md`

#### Return And Reporting

30. `lazaretto.md`
31. `chamber-of-scribes.md`

#### Cross-Cutting

32. `cognitive-map.md`
33. `production-artifact-catalog.md`

Evidence:

- Completion Assessment Run 001: 10 PASS / 0 FAIL
- corrected Constitutional Run 018: 33 PASS / 0 FAIL
- corrected convergence Run 002: 21 PASS / 0 FAIL

## Provenance Baseline

PB-001 remains unchanged at 3 artifacts.

Provenance Regression Run 003: 34 PASS / 0 FAIL.

No new formation-identity contract is required:

- Petition identity scopes `FORM_MISSION`
- Mission Identity applies after formation
- Authority cites both and originates neither

## Canonical Path Normalization

Before admission, candidate content must replace draft citations with production citations.

### Procedure Candidates

Normalize all dependencies under:

- `layers/cognitive/drafts/` → admitted CB-003 production paths
- `layers/authority/drafts/` → admitted AB-002 production paths
- local Procedure draft references → `layers/procedure/production/`

### Cognitive Candidates

Normalize:

- Procedure draft references → PRB-001 production paths
- Authority draft references → AB-002 production paths
- Cognitive split references → CB-003 production paths

### Authority Candidates

Normalize:

- `mission-envelope.md` dependency from capability grants → AB-002 production path
- preserve all AB-001 and PB-001 canonical citations

### Indexes And Consumers

Update:

- root `README.md`
- `current-step.md`
- `next-steps.md`
- Cognitive, Authority, Procedure, and test indexes
- any consumer claiming canonical lifecycle, artifact-chain, grant, or completion-assessment origin

Historical drafts and run records retain the paths and status true at their execution time.

## Source Deletions

Only these current Cognitive production sources are deleted:

1. `layers/cognitive/production/lifecycle.md`
2. `layers/cognitive/production/production-artifacts.md`

Their verified targets must exist before deletion.

Draft sources are retained as historical and revision evidence unless a separate cleanup is authorized.

## Atomicity

The production transition must land on `main` as one squash or one preverified tree commit.

No intermediate `main` state may expose:

- PRB-001 without its CB-003 or AB-002 dependencies
- revised Cognitive consumers citing draft-only Authority
- deleted Cognitive origins without verified replacements
- old and new catalog paths both claiming canonical status
- lifecycle absent from Cognitive before Procedure target exists
- partial baseline indexes

## Rollback

Rollback is the exact parent of the atomic migration commit.

A failed post-merge verification requires reverting the complete transition, not patching one baseline independently.

## Test Gates

```text
Procedure structural: 16 PASS / 0 FAIL
Procedure behavioral: 35 PASS / 0 FAIL
Mission Envelope: 15 PASS / 0 FAIL
Capability Grants: 15 PASS / 0 FAIL
Completion Assessment: 10 PASS / 0 FAIL
Cognitive regression: 33 PASS / 0 FAIL
Authority regression: 67 PASS / 0 FAIL
Provenance regression: 34 PASS / 0 FAIL
Cross-layer convergence: 21 PASS / 0 FAIL
```

## Next Required Decision

Independent admission reviews must recommend all three candidate transitions.

After those reviews, explicit operator approval is required before the atomic production migration.
