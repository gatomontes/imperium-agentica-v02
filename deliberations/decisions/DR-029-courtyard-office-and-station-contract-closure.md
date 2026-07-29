# DR-029 — Courtyard Office and Station Contract Closure

## Status

Recorded semantic decision. This decision closes the remaining semantic gaps identified by the Courtyard cross-office consistency review. It authorizes no implementation, Runtime action, activation, deployment, credential use, live data, or external effect.

## Closure Finding

The Courtyard contract is complete only when every office-to-office or station-to-station exchange preserves five independent conditions:

1. authority remains with the owning office or Officer;
2. the artifact has an identifiable sender, recipient, version, status, and provenance;
3. the receiving function has explicit acceptance, refusal, return, and escalation conditions;
4. the station lifecycle records assignment, work, release, receipt, repair, and closure;
5. failure remains attributable to the function that caused, discovered, or accepted it, according to the recorded event—not silently to the next recipient.

Courtyard supplies the institutional surface in which these conditions are applied. It does not adjudicate disputes between offices, create permissions, or convert a handoff into approval.

## Office and Station Contract Rules

### Authority non-transfer

An office may delegate bounded work to a station or resident operative, and an Officer may authenticate or govern that work, but neither delegation nor receipt transfers the owning office’s responsibility. A station cannot authorize work outside its contract. A receiving office cannot infer authority from an artifact’s presence, prior status, or sender identity.

### Release, receipt, refusal, return, and escalation

A sending function releases an artifact only when its release conditions are satisfied. A receiving function must record one of:

- accept for the stated purpose;
- refuse because a named receiving condition is unsatisfied;
- return for named repair;
- escalate because the matter exceeds its authority or contract.

Silence, timeout, proximity, or continued possession is not approval. A return must preserve the reason, relevant version, provenance, sender, recipient, and prior disposition.

### Station lifecycle

A station’s semantic lifecycle is:

`assigned → received → examined or transformed → released, returned, refused, escalated, or closed`.

A station may not skip a required state invisibly. Rework creates a traceable successor or revision; it does not erase the prior artifact or finding. A resident operative may perform only the work permitted at the station’s current assignment.

### Artifact identity and provenance

Every institutional artifact exchanged within Courtyard must remain distinguishable by origin, owning function, version, status, and handoff history. Transformations must identify the transforming station and resident operative, preserve the source reference, and state whether the result is a finding, recommendation, request, draft, approved institutional record, refusal, return, or closure record. Artifact custody is not artifact authorship.

### Failure and recovery accountability

A failed handoff, station action, or contract condition must be recorded at the function where the failure was detected, with the triggering condition, affected artifact, responsible boundary, and required recovery path. Recovery may repair, return, refuse, escalate, supersede, or close the work according to the owning contract. Recovery does not authorize the receiving function to rewrite another office’s record or bypass a required gate.

## Consequences

- Courtyard offices remain composable without becoming a shared authority.
- Stations remain functional locations with bounded resident- operative work, not hidden Officers or autonomous offices.
- Institutional artifacts remain traceable through acceptance, refusal, return, repair, escalation, and closure.
- Future implementation review must map each component and state transition to one of these admitted semantic contracts before implementation is considered.

## Gate

This decision is semantic and architectural only. No implementation, Runtime action, activation, deployment, credential use, live data, or external effect is authorized.
