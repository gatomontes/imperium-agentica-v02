# Runtime Maintenance Candidate Minimality Audit 001

## Status

Completed against the corrected draft candidate on 2026-07-18.

No production admission.

## Question

Which cross-layer revisions are actually necessary to close the Master Mason maintenance artifact defect?

## Full Candidate Tested

Pressure Run 002 tested revisions across Cognitive, Authority, Procedure, and two Runtime contracts.

Result:

`14 PASS / 0 FAIL`

Passing did not prove every revision necessary.

## Removal Test 1 — Authority Revision

Removed the candidate revision to `runtime-control-plane-authority-profile.md` and restored the AB-003 source draft.

### Finding

AB-003 already:

- applies CONTROL_PLANE Authority to consequential control-plane actions
- permits bounded maintenance discretion only under a cited Master Mason diagnosis and Procedure
- requires exact environment, component, action class, and limits
- prohibits semantic change and indeterminate-effect assumption
- requires fresh Authority for every attempt
- denies general executive authority

`NO_INTERVENTION`, `WITHHOLD_MAINTENANCE`, and `ESCALATE_STRUCTURAL_CONDITION` are Cognitive non-effect forms, not control-plane action classes.

Therefore AB-003 does not prevent Master Mason from withholding or escalating when CONTROL_PLANE Authority is absent.

### Result

Authority revision: `NOT REQUIRED`.

AB-003 remains unchanged.

## Removal Test 2 — Runtime Realization Revision

Removed the candidate revision to `runtime-realization-and-dispatch-contract.md` and restored the RTB-001 source draft.

### Finding

RTB-001 already requires:

- explicit controlling contracts and versions
- an existing Procedure transition
- present and exactly correlated inputs
- effective Authority for the exact action
- compatible semantic mappings
- refusal when Runtime would need to invent meaning

The corrected Runtime Maintenance Procedure permits consequential realization only for `INSTRUCT_MAINTENANCE`.

The two Cognitive artifact contracts supply the exact input meaning. Therefore RTB-001's generic acceptance gate already refuses non-effect forms without a specialized revision.

### Result

Runtime Realization and Dispatch revision: `NOT REQUIRED`.

## Runtime Control-Plane Revision

The Control-Plane Plan is Runtime-native.

The admitted Runtime Control-Plane contract does not require the plan to cite and conform to the exact Cognitive maintenance direction.

Without a Runtime-native revision, Cognitive or Procedure would have to define the plan's conformance semantics, violating the layer boundary.

### Result

Runtime Control-Plane revision: `REQUIRED`.

## Minimal Candidate Package

### Cognitive

- add Runtime Operational Diagnosis
- add Runtime Maintenance Disposition
- revise Master Mason
- revise Cognitive Map
- revise Production Artifact Catalog

### Authority

- AB-003 unchanged

### Provenance

- PB-001 unchanged

### Procedure

- revise Runtime Maintenance Procedure

### Runtime

- revise Runtime Control-Plane Contract
- Runtime Realization and Dispatch unchanged
- Runtime Observation Envelope unchanged

## Hypothetical Baseline Transition

```text
CB-004 → CB-005: 34 → 36 files
AB-003 → unchanged: 6 files
PB-001 → unchanged: 3 files
PRB-002 → PRB-003: 5 files
RTB-001 → RTB-002: 3 files
```

RTB-002 would revise one of the three existing Runtime contracts; manifest size remains three.

## Canonical Target Count

```text
2 new Cognitive artifacts
3 revised Cognitive contracts
1 revised Procedure contract
1 revised Runtime contract

Total canonical targets: 7
```

Manifest and README revisions are transition mechanics, not additional semantic targets.

## Conclusion

The smaller package remains dependency-closed.

Removing the Authority and Runtime realization revisions reduces conceptual mass without reopening any focused pressure failure.
