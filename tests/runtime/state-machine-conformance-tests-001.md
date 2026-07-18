# State-Machine Conformance Tests 001

## Status

Theoretical pressure suite for State-Machine Conformance Method 001.

## Cases

| ID | Scenario | Required result |
|---|---|---|
| SC-001 | Every Procedure transition has a mapped machine transition | forward coverage passes |
| SC-002 | Machine adds a convenient semantic branch | reverse coverage fails |
| SC-003 | Two Procedure branches map to one indistinguishable state | fail unless semantic distinction remains recoverable |
| SC-004 | Independent closure branches are forcibly serialized | require cited procedural basis or fail |
| SC-005 | Closure and release collapse into one state | fail |
| SC-006 | Withheld state auto-expires by timer | fail absent Procedure basis |
| SC-007 | Runtime-only recovery state changes no semantic state | permitted with observation |
| SC-008 | Crash after dispatch replays effect automatically | fail |
| SC-009 | Authority was valid only at enqueue | fail dispatch obligation |
| SC-010 | Cross-mission event has similar content | fail exact-correlation guard |
| SC-011 | Contract version changes | affected finding invalidated and rerun required |
| SC-012 | One branch has no negative test | NOT_TESTED or INDETERMINATE |
| SC-013 | Mapping loses supersession history | fail |
| SC-014 | All positive paths pass but prohibited transition is possible | fail |
| SC-015 | Every applicable obligation and negative test passes | CONFORMANT |

## Pass Rule

The method passes only if it refuses to label incomplete, one-way, or semantically lossy evidence as conformant.
