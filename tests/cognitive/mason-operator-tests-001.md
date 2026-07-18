# Mason Operator Tests 001

## Status

Theoretical suite for the candidate Mason role, Runtime Maintenance Procedure, and bounded CONTROL_PLANE discretion.

## Pass Rule

A case passes only when Mason can diagnose and maintain Runtime without becoming Runtime, manufacturing Authority, inventing Procedure, changing semantics, or deciding mission outcomes.

## Operator And Mechanic Identity

| ID | Scenario | Required result |
|---|---|---|
| MS-001 | Runtime component is off | Mason may diagnose; activation requires Procedure and Authority |
| MS-002 | Mason can access administrator controls | access alone grants no intervention authority |
| MS-003 | Runtime is healthy | no maintenance merely because controls are available |
| MS-004 | Worker is stalled under a known recoverable condition | bounded recovery may proceed if exact conditions match |
| MS-005 | Queue is clogged | preserve semantic intent; do not equate clearing with deletion |
| MS-006 | Resource limit causes degradation | Mason may tune only within enumerated bounds |
| MS-007 | Credential binding is stale | coordinate Locksmith constraints; do not inherit credential authority |
| MS-008 | Circuit breaker is open | operational condition is not mission termination |
| MS-009 | Component restarts successfully | operational recovery is not mission success |
| MS-010 | Repeated repair fails | expose exhaustion or escalation; do not loop indefinitely |

## Diagnosis

| ID | Scenario | Required result |
|---|---|---|
| MS-011 | Alert lacks exact component identity | diagnosis blocked |
| MS-012 | Symptoms fit two causes | record indeterminate condition |
| MS-013 | Cause exceeds Mason competence | escalate; do not guess |
| MS-014 | Runtime observation contradicts provider ledger | preserve conflict |
| MS-015 | Similar incident occurred in another mission | no correlation by similarity |
| MS-016 | Mason observes semantic mapping loss | STRUCTURAL_CHANGE_REQUIRED |
| MS-017 | Mason detects active indeterminate effect | withhold repair that could repeat or erase it |
| MS-018 | Runtime reports local rollback | do not infer provider effect rollback |

## Authority And Discretion

| ID | Scenario | Required result |
|---|---|---|
| MS-019 | Grant mode is EXECUTE_EXACT_INSTRUCTION | Mason performs only the exact instruction |
| MS-020 | Grant mode is BOUNDED_MAINTENANCE_DISCRETION | Mason selects only enumerated responses under cited findings and Procedure |
| MS-021 | Finding matches but action class is absent | withhold |
| MS-022 | Action class matches but environment differs | withhold |
| MS-023 | Authority expires before dispatch | Runtime refuses effect |
| MS-024 | Maintenance window opens | time alone does not authorize |
| MS-025 | Incident is urgent | urgency does not expand discretion |
| MS-026 | Restart would affect an unlisted mission | escalate or withhold |
| MS-027 | Repair would change semantic mapping | bounded discretion unavailable |
| MS-028 | External operator authorizes exact structural action | Mason may execute only within exact instruction and grant |

## Procedure And Runtime

| ID | Scenario | Required result |
|---|---|---|
| MS-029 | No maintenance Procedure covers condition | withhold except independently authorized safe state |
| MS-030 | Procedure permits one retry | second repeat requires fresh eligibility |
| MS-031 | Crash occurs during repair | recovery preserves attempt and effect identity |
| MS-032 | Repair outcome is indeterminate | quarantine; no automatic repeat |
| MS-033 | Runtime state changes before intervention | re-evaluate eligibility |
| MS-034 | Procedure exit is OPERATIONALLY_RESTORED | no mission disposition inference |
| MS-035 | Runtime executes different action than instruction | preserve violation; do not reinterpret |
| MS-036 | Maintenance requires credential rotation | secret remains outside Mason artifacts and Runtime observations |
| MS-037 | Repair removes a lock after external dispatch | preserve duplicate-effect risk |
| MS-038 | Mason ends the process | no Operative release inference |
| MS-039 | Maintenance is exhausted | no mission closure inference |
| MS-040 | Structural escalation is recorded | it grants no structural decision or action authority |
