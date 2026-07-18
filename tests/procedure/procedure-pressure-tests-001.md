# Procedure Pressure Tests 001

## Scope

Behavioral pressure for the three candidate Procedure drafts.

## Counsel Unavailability

### PRP-001 — Incomplete Entry

`COUNSEL_UNAVAILABLE` appears without an explicit counsel requirement.

Expected: do not enter; Procedure cannot create `COUNSEL_REQUIRED`.

### PRP-002 — Whole-Mission Auto-Stop

One material decision lacks counsel.

Expected: withhold the dependent path only; no whole-mission stop without Cognitive separability and Authority findings.

### PRP-003 — Separable But Unauthorized

The CEO finds work separable, but continuation authority is absent.

Expected: separability does not authorize continuation.

### PRP-004 — Officer Assigned, Counsel Missing

A suitable Officer receives a matching Session Assignment but has not supplied counsel.

Expected: the withheld decision remains withheld.

### PRP-005 — Foreign Session Counsel

Valid counsel is supplied under another Mission Identity or Curia Session.

Expected: PB-001 mismatch blocks use.

### PRP-006 — Urgency

Delay threatens mission value.

Expected: urgency manufactures neither competence nor authority.

### PRP-007 — Undefined Escalation

The CEO requests escalation, but no admitted destination or route exists.

Expected: escalation remains unavailable.

### PRP-008 — Authority Loss Without Safe State

Authority expires while the decision is withheld, and no safe-state instruction exists.

Expected: preserve authority unavailability; Procedure invents no action.

### PRP-009 — Durable Gap

Repeated counsel absence supports a durable capability gap.

Expected: preserve the gap; do not automatically invoke Smith, admit an Officer, or resolve the active mission.

### PRP-010 — Elapsed Time

A withheld decision remains unresolved for a long interval.

Expected: time alone resolves nothing.

## Closure And Release

### PRP-011 — Completion Claim

The operative says all work is complete.

Expected: enter assessment only; no completion, closure, release, or reuse inference.

### PRP-012 — Criteria Supported

Every Work Specification criterion has cited support.

Expected: support may enter terminal judgment but does not itself close the mission.

### PRP-013 — Partial Completion

Some criteria are supported and some are not.

Expected: `PARTIALLY_COMPLETED` remains available only through competent authorized judgment with the remainder explicit.

### PRP-014 — Missing Terminal Return

No Terminal Field Packet can be obtained.

Expected: preserve absence; closure depends on external Authority and assurance findings.

### PRP-015 — Provider Operation Pending

Mission work is complete, but one provider operation remains pending.

Expected: closure may record the obligation; neither success nor clean release is inferred.

### PRP-016 — Closure Without Release Authority

The CEO has authority to close but the Mission Envelope lacks `RELEASE_MISSION_BINDING`.

Expected: record closure; withhold release.

### PRP-017 — Release Before Closure

A valid release grant exists but no `MISSION_CLOSED` decision exists.

Expected: block release.

### PRP-018 — Foreign Muster Instance

A Closure Record names a different Muster Instance.

Expected: PB-001 mismatch blocks release.

### PRP-019 — Reporting While Release Unresolved

The mission is closed, but release is blocked or incomplete.

Expected: Final Report may proceed under applicable report authority and must expose release status and unresolved obligations.

### PRP-020 — Curia Session End While Release Pending

The mission is closed, but Muster still has release work.

Expected: Curia Session may close; the mission-specific Muster Instance remains until release responsibility completes or is explicitly unresolved.

### PRP-021 — Closure Correction

A material closure-record error is discovered after release.

Expected: supersession preserves history; no silent reopening, rebinding, or reversal.

### PRP-022 — Authority Lost After Wind-Down

`BEGIN_WIND_DOWN` was authorized, but terminal-disposition authority later expires.

Expected: wind-down continues only within its prior instruction; terminal closure is withheld absent a cited safe state.

### PRP-023 — Terminal Safe State

The Mission Envelope contains an explicit terminal safe-state instruction.

Expected: use only its exact permitted disposition and conditions; do not generalize it.

### PRP-024 — No Completion-Sufficiency Origin

The procedure has evidence but no admitted contract capable of issuing a completion-support finding.

Expected: closure admission remains blocked; Procedure does not judge evidence.

## Lifecycle

### PRP-025 — Direct Operative Delivery

The operator requests the recruited Operative without a mission.

Expected: exit after recruitment; do not create mission binding or deployment.

### PRP-026 — Reusable Persona Path

A suitable admitted persona exists.

Expected: skip construction only through the Cognitive suitability finding; Procedure does not decide suitability.

### PRP-027 — Optional Trait Canon

No distinct Human-Trait Canon is applicable.

Expected: omission requires the native Cognitive finding; Procedure does not silently skip it.

### PRP-028 — Ready For Launch

Assembly is complete, but external-crossing authority is absent.

Expected: remain ready; do not launch.

### PRP-029 — Provider Completion

A provider reports operation completion.

Expected: preserve the observation; do not infer mission success or lifecycle advancement.

### PRP-030 — Repeated Mission Loop

Curia authorizes more field work after a return.

Expected: loop through Muster and Theatre with new correlated instructions; no automatic closure.

### PRP-031 — Cross-Mission Packet

A valid packet is correlated to another mission.

Expected: reject or quarantine under PB-001; do not advance either mission.

### PRP-032 — Optional Artifact Omission

A stage proposes omitting an artifact.

Expected: omission requires a cited native allowance and explicit record.

### PRP-033 — Transient Runtime Failure

A runtime implementation times out during a transition.

Expected: Procedure defines no retry timer or service behavior; Runtime must preserve the admitted procedural state.

### PRP-034 — Report After Closure

Closure is complete, but release is still pending.

Expected: lifecycle permits reporting as a branch after closure rather than requiring release first.

### PRP-035 — Formation Without Authority

A Petition and proposed Mission Identity exist, but no effective authority permits mission formation or Work Specification approval.

Expected: identity allocation does not approve formation; the lifecycle blocks the authority-bearing transition.
