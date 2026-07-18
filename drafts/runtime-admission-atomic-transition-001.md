# Runtime Admission Atomic Transition 001

## Status

Prepared transition manifest. Not approved for execution.

## Rollback Parent

The execution branch must be based on the then-current verified `main` head. The exact rollback parent must be recorded immediately before construction; no stale SHA may be assumed.

## Target Baselines

```text
CB-003 → CB-004: 34 / 34
AB-002 → AB-003: 6 / 6
PB-001 → unchanged: 3 / 3
PRB-001 → PRB-002: 5 / 5
Runtime empty → RTB-001: 3 / 3
```

## New Production Targets

### Cognitive

- `layers/cognitive/production/master-mason.md`

### Authority

- `layers/authority/production/runtime-control-plane-authority-profile.md`

### Procedure

- `layers/procedure/production/runtime-maintenance-procedure.md`
- `layers/procedure/production/mission-indeterminate-effect-disposition-procedure.md`

### Runtime

- `layers/runtime/production/runtime-realization-and-dispatch-contract.md`
- `layers/runtime/production/runtime-observation-envelope.md`
- `layers/runtime/production/runtime-control-plane-contract.md`

## Existing Production Content

All CB-003, AB-002, PB-001, and PRB-001 manifest artifacts remain unchanged in semantic content. Their layer manifests advance only as listed above.

## Draft Source Handling

The seven draft sources remain as historical origin evidence. Admission metadata and canonical production citations belong to the production copies. Draft retention does not create competing canonical origins because each draft remains explicitly unadmitted and points to its admitted successor after migration.

## Citation Normalization

The constructed target tree must replace intercandidate draft citations with exact production paths. Historical analyses and test records remain unchanged.

At minimum:

- Runtime Maintenance → production Master Mason, CONTROL_PLANE, and Runtime contracts
- Mission Indeterminate-Effect → production Runtime Observation and Dispatch contracts
- CONTROL_PLANE profile → production Master Mason and Runtime Maintenance Procedure where cited
- Master Mason → production CONTROL_PLANE, Runtime Maintenance, and Runtime contracts where cited
- layer READMEs and root navigation → exact target baselines

## Atomicity Rule

The transition must land as one squash commit after branch verification.

Before merge require:

1. all seven production targets exist
2. all 51 manifest entries resolve: 34 Cognitive, 6 Authority, 3 Provenance, 5 Procedure, 3 Runtime
3. no production candidate contains draft citations, `Not admitted`, or candidate-status residue
4. all draft sources remain explicitly historical and noncanonical
5. empirical harness passes 11/11
6. admission pressure passes 55/55
7. convergence passes 30/30
8. no Compass or Praetorium admission appears
9. branch is based on the recorded rollback parent and is not behind `main`

## Execution Gate

This manifest authorizes no movement. A separate explicit operator approval is required after admission reviews are complete.
