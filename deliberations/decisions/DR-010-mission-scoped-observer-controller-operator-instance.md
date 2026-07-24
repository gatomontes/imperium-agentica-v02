# DR-010 — Mission-Scoped Observer/Controller Operator Instance

## Status

Recorded decision.

## Context

Imperium needs a way for relevant Cadre members to observe, inspect, ask questions, receive notifications, and record observations during missions without becoming part of the execution chain.

The operator analogized this to Army field-exercise Observers/Controllers: present in the field, usually silent, sometimes asking or saying something, but not replacing the unit's established flow.

This record also preserves the boundary clarified by the operator:

> An OC is technically an operator instance inside Imperium.
>
> Eliminate any execution influence.
>
> An OC may eventually ask or interact with Operatives, be present in Curia, etc., but may not alter the established flow.
>
> Requests and notifications will eventually be managed through Secretariat.

## Decision

Imperium will model an Observer/Controller (`OC`) as a mission-attached Operator instance with visibility and interaction permissions, but no execution influence.

An OC is not an Operative, command node, officer of the mission flow, Curia voter, approval authority, blocker, rerouter, or state-transition actor by virtue of OC assignment.

OC assignment exists to preserve supervised observation, recorded questioning, evidence inspection, and notification delivery without changing who executes, decides, approves, pauses, blocks, reroutes, or closes the mission.

## Required Invariants

1. An OC may observe mission-visible records within its authorized visibility envelope.
2. An OC may inspect evidence, provenance, mission notes, conclusions, and relevant records where access is authorized.
3. An OC may receive mission notifications when subscribed, invited, or otherwise entitled.
4. An OC may ask questions of Operatives, Curia, or other authorized mission participants through permitted communication channels.
5. An OC may submit observations, annotations, questions, objections, or requests for later handling.
6. An OC question is not an instruction.
7. An OC observation is not an approval.
8. OC silence is not consent, waiver, approval, concurrence, rejection, or evidence of review completion.
9. OC presence in Curia does not create a vote, quorum count, office, veto, procedural authority, or decision right.
10. OC interaction must not pause, reroute, reprioritize, block, approve, reject, alter, or close a mission unless a separate non-OC authority explicitly performs that action.
11. If the same human or account also holds a separate decision, approval, pause, or command role, any consequential action must be recorded under that separate role, not under OC status.
12. OC assignment must be mission-scoped or otherwise explicitly bounded; standing OC visibility requires a separate authority decision.

## Secretariat Placement

Secretariat will eventually manage the communication mechanics around OC participation, including:

- OC assignment records;
- mission presence invitations;
- notification subscriptions;
- question routing;
- response delivery;
- visibility request routing;
- attendance scheduling;
- operator-instance directory and preferences.

Secretariat does not, by this decision alone, decide the OC's authority, visibility envelope, evidence retention rule, or mission-state consequence.

## Related Components

| Component | Responsibility |
|---|---|
| Authority | Decide who may hold OC status, what each OC may see, and what each OC may ask or receive. |
| Secretariat | Route OC presence, notifications, questions, responses, invitations, and scheduling. |
| Provenance | Record OC assignment, questions, answers, observations, notifications, and any required access events. |
| Procedure | Define where OC interactions may be delivered without altering established mission flow. |
| Curia | Permit OC presence only as non-voting, non-quorum, non-office attendance unless another role is separately assigned. |
| Runtime | Eventually implement read views, subscriptions, and message routing without granting execution influence. |

## Non-Equivalence

OC status is not the same thing as affected-stakeholder representation, external accountability, recourse, audit certification, approval authority, or mission command.

A stakeholder may later be represented by or assigned as an OC only if a separate authority rule admits that assignment. This decision records the OC mechanism, not the eligibility doctrine for all possible OCs.

## Relationship to Existing Deliberations

This decision is compatible with:

- `DR-007` verifiable-language and exact-claim requirements;
- `DR-009` evidence without engineered orientation;
- `CTRL-002` affected-stakeholder record and recourse as a related but distinct future control;
- `ICP-07` external accountability as a related but distinct future program.

OC records must use exact claims: who was assigned, what access was authorized, what was asked, what was answered, what was observed, what was notified, and what mission-state consequence did or did not occur.

## Current Boundary

This is a deliberation decision only.

No production implementation, runtime permission, Secretariat implementation, Curia procedure change, live mission behavior, external notification, or stakeholder eligibility rule is created by this record.
