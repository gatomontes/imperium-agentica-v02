# Runtime Draft Pressure Tests 001

## Status

Theoretical suite for the three Runtime drafts and their Authority and Procedure dependency refinements.

## Pass Rule

A case passes only when the candidate can define its native concern without originating or repairing another concern.

## Realization And Dispatch

| ID | Scenario | Required result |
|---|---|---|
| RD-001 | Work enters a queue with valid Authority | recheck immediately before consequential dispatch |
| RD-002 | Authority expires while queued | refuse dispatch |
| RD-003 | Duplicate transport delivers one instruction twice | one semantic intent; effect identity prevents unsafe duplicate |
| RD-004 | Worker reports operational success | no mission-success inference |
| RD-005 | Local transaction rolls back after provider call | preserve possible external effect |
| RD-006 | Provider outcome times out | quarantine as indeterminate; no automatic retry |
| RD-007 | Retry budget remains but Procedure forbids repeat | no retry |
| RD-008 | Two missions have similar payloads | exact PB-001 correlation controls |
| RD-009 | Worker crashes before dispatch | recovery revalidates before effect |
| RD-010 | Worker crashes after dispatch before acknowledgement | preserve indeterminacy |
| RD-011 | Contract version changes while queued | pin or revalidate before dispatch |
| RD-012 | Storage mapping would merge closure and release | block as lossy |

## Runtime Observation Envelope

| ID | Scenario | Required result |
|---|---|---|
| RO-001 | Local process crashes | record operational crash, not mission failure |
| RO-002 | Provider acknowledges transport | record acknowledgement, not completion |
| RO-003 | Observation is used for recovery | durable envelope required |
| RO-004 | Debug metric remains ephemeral and uncited | implementation-specific telemetry permitted |
| RO-005 | Two results would both serialize as success | preserve distinct operational vocabulary |
| RO-006 | Purely local diagnostic has no Authority-bearing action | Authority and exact-correlation references are conditional, not fabricated |
| RO-007 | Observation includes provider-returned content | preserve external-content boundary and lineage |
| RO-008 | Envelope is corrected | supersede; do not silently rewrite |
| RO-009 | Credential token appears in telemetry | redact secret; record non-secret handling result |
| RO-010 | Envelope records an Authority finding | does not validate the finding |
| RO-011 | Envelope records a Procedure transition | operational completion does not complete semantic transition |
| RO-012 | Log row exists without required lineage | no PROVENANCE_COMPLETE inference |

## Runtime Control Plane

| ID | Scenario | Required result |
|---|---|---|
| CP-001 | Code is deployed but not activated | preserve deployment/activation distinction |
| CP-002 | Target state changed after plan approval | block and revalidate |
| CP-003 | Migration omits a required semantic field | block migration |
| CP-004 | Rollback code cannot map current state | block rollback |
| CP-005 | Rollback follows an external effect | do not infer effect reversal |
| CP-006 | Health check passes | operational availability only |
| CP-007 | Credential binding loads successfully | no Authority or mission-success inference |
| CP-008 | Crash recovery may dispatch an effect | require exact control-plane Authority and dispatch gate |
| CP-009 | Queued work cites prior contract versions | pin or revalidate |
| CP-010 | Migration would erase indeterminate state | block |
| CP-011 | Runtime can alter its resource limit | capability does not authorize action |
| CP-012 | Control-plane action completes | emit durable operational observation |

## Control-Plane Authority

| ID | Scenario | Required result |
|---|---|---|
| AU-001 | Administrator credentials exist | no CONTROL_PLANE Authority inference |
| AU-002 | Grant permits deploy but is silent on activate | activation prohibited |
| AU-003 | Recovery is urgent | urgency creates no Authority |
| AU-004 | Operator has IMPERIUM_STEWARDSHIP but resource control is unrepresented | stewardship alone is insufficient |
| AU-005 | Operator also controls exact environment | distinct CONTROLLED_RESOURCE basis may support bounded grant |
| AU-006 | Client environment is in scope | require represented client control, delegation, or legal/contractual basis |
| AU-007 | Automation is grantee | automation does not become Principal |
| AU-008 | Grant expires before rollback | refuse rollback |
| AU-009 | Plan was previously approved | dispatch still requires fresh Authority |
| AU-010 | Tool access is authorized but migration is not | CAPABILITY grants do not imply CONTROL_PLANE action |
| AU-011 | Grant permits one environment | similar environment remains out of scope |
| AU-012 | One Principal holds stewardship and resource control | preserve bases as distinct |

## Mission Indeterminate-Effect Procedure

| ID | Scenario | Required result |
|---|---|---|
| PR-001 | Request times out before dispatch | no indeterminate-effect entry |
| PR-002 | Exact dispatched effect becomes indeterminate | enter with quarantine preserved |
| PR-003 | Provider acknowledgement exists without completion | do not infer outcome |
| PR-004 | Internal Runtime envelope contains no provider-returned material | admit as Curia observation without forcing Lazaretto custody |
| PR-005 | Provider-returned content accompanies envelope | sanitize external content through Lazaretto |
| PR-006 | Similar effect belongs to another mission | PB-001 mismatch blocks use |
| PR-007 | CEO wants safe repeat without Authority | repeat unavailable |
| PR-008 | Status query could alter provider state | it is not a non-effecting status check |
| PR-009 | Compensation tool exists | capability does not authorize compensation |
| PR-010 | Outcome remains unknown | preserve indeterminacy and dependent constraints |
| PR-011 | Mission closes with unresolved effect | record unresolved consequence; no clean-success inference |
| PR-012 | Indeterminate action is control-plane, not mission | this procedure refuses scope and exposes missing cognitive responsibility |
