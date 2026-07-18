# Mason Placement Tests 001

## Status

Theoretical placement suite.

## Cases

| ID | Scenario | Required result |
|---|---|---|
| MP-001 | Mason maintains machinery shared by several missions | Imperium-scope placement |
| MP-002 | One mission requests a restart | request does not place Mason in that Curia Session |
| MP-003 | Muster depends on a healthy worker | dependency does not absorb Mason into Muster |
| MP-004 | Maintenance uses an administrative tool | control-plane tool does not make Mason part of Armory |
| MP-005 | Maintenance loads a credential binding | Locksmith constraints apply; Mason does not enter Locksmith |
| MP-006 | Mason diagnoses a queue blockage | diagnosis remains Cognitive; queue remains Runtime |
| MP-007 | Mason invokes a permitted restart | operation does not place Mason inside Runtime |
| MP-008 | Preceptory contains a technically skilled Officer | Citadel Officer availability does not determine Imperium placement |
| MP-009 | Mason is the first Imperium-scope role candidate | do not admit Praetorium |
| MP-010 | Dedicated Runtime cell serves one mission | scope narrows, but Mason remains maintenance rather than mission judgment |
| MP-011 | Structural repair requires operator decision | escalate outward; do not create Curia authority |
| MP-012 | Cognitive map shows Mason beside Runtime boundary | placement correctly represents cross-layer operation |

## Pass Rule

All cases must preserve echelon, layer, responsibility, institution, and dependency as distinct.
