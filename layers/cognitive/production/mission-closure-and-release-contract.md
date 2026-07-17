# Mission Closure And Operative Release Contract

## Status

Admitted cognitive contract.

Baseline: `CB-001`.

Admission: `Production Admission Review 003`.

Evidence: `Constitutional Test Run 015 — 30 PASS / 0 FAIL`.

This contract distinguishes an operative's completion claim, mission wind-down, terminal mission closure, and release of the mission-bound operative.

## Core Distinctions

```text
operative says done ≠ mission complete
mission objective satisfied ≠ execution stopped
execution stopped ≠ terminal return received
terminal return received ≠ mission closed
mission closed ≠ operative deleted
operative released ≠ automatically reusable
```

## Terminal Dispositions

A closed mission has exactly one recorded disposition:

```text
COMPLETED:
the authorized completion criteria were satisfied

PARTIALLY_COMPLETED:
an explicitly accepted subset was satisfied and the remainder is recorded

FAILED:
the mission ended without satisfying its required completion criteria

TERMINATED:
the mission was intentionally ended before completion under represented authority
```

Blocked, paused, remediating, and decision-withheld are not terminal dispositions.

## Phase One — Closure Assessment And Wind-Down

A closure assessment may begin when:

- an operative claims completion
- the Work Specification completion criteria appear satisfied
- continued work is impossible or no longer justified
- the CEO considers recall or termination
- represented authority withdraws or ends the mission

The Chief of Staff assembles a Closure Situation Picture containing:

```text
Mission and deployment:
Work Specification and completion criteria:
Operative completion claim:
Latest sanitized packet set:
Satisfied and unsatisfied criteria:
Evidence and uncertainty:
Open counsel needs or withheld decisions:
In-flight Theatre actions:
Provider intervention stages:
Outstanding tools, access, tickets, and obligations:
Expected terminal return:
Proposed disposition:
```

The CEO chooses either:

- continue or remediate the mission
- BEGIN_WIND_DOWN

BEGIN_WIND_DOWN places the mission in CLOSURE_PENDING. It is not terminal closure.

The Chief of Staff records the decision in a Curia Minute and hands it to Muster.

Muster operationalizes any required stop, recall, finalization, or terminal-return instruction through Iron Gate.

## Terminal Return

The Theatre sends a Terminal Field Packet through Lazaretto.

It may include:

```text
Mission and deployment identity:
Operative identity and version:
Execution cessation status:
Completion claim:
Delivered products and evidence:
Unfinished work:
Known failures:
Outstanding effects or obligations:
Open provider operations:
Final Theatre timestamp:
Correlation to wind-down instruction:
```

Lazaretto preserves, sanitizes, and correlates the packet. It does not declare the mission closed.

If no terminal packet can be obtained, the absence and reason must be recorded. The CEO may still close as FAILED or TERMINATED when existing authority permits and the missing return remains explicit.

## Phase Two — Closure Decision

The Chief of Staff assembles a Terminal Situation Picture from:

- Work Specification completion criteria
- sanitized Terminal Field Packet or recorded absence
- Curia Minutes
- staged provider-ledger audit views
- delivered artifacts and evidence
- unresolved obligations, uncertainty, and dissent
- confirmation of execution cessation or its unresolved status

The CEO alone, under an effective Executive Mandate covering the terminal decision, decides whether to return for more work or issue:

```text
MISSION_CLOSED
+ terminal disposition
+ rationale
+ authority basis
+ accepted unresolved matters
```

Every closure decision produces a final Curia Minute and Mission Closure Record. Authority loss alone is not a terminal disposition. Without an effective mandate, closure is withheld unless a previously authorized terminal safe-state instruction explicitly supplies the permitted disposition and conditions.

## Mission Closure Record

```text
Mission identity:
Deployment identity:
Operative Binding identity:
Muster Instance identity:
Curia Session identity:
Work Specification version:
Completion criteria assessment:
Terminal Field Packet reference or recorded absence:
Execution cessation status:
Provider operations and unresolved stages:
Delivered products:
Unfinished work:
Outstanding effects and obligations:
Final disposition:
CEO specification and Standing Assignment:
Executive Mandate identity, version, status, Principal, and scope match:
CoS specification and Standing Assignment:
Counsel and dissent:
Decision rationale:
Authority basis:
Closure timestamp:
Curia Minute reference:
Required report:
Release authorization:
```

Corrections use supersession. Closure history is not overwritten.

## Operative Release

After receiving an authorized MISSION_CLOSED, Muster terminates the mission binding it created around the operative only when the Mission Identity, Deployment identity, Operative Binding, Curia Session, Muster Instance, Closure Record, and release authorization exactly match. It then produces an Operative Release Record.

```text
Mission and deployment:
Operative Binding identity:
Muster Instance identity:
Curia Session identity:
Operative identity and version:
Deployment Package version:
Closure Record reference:
Theatre cessation state:
Tool-return or deactivation status:
Access revocation status:
Open provider obligations:
Release timestamp:
Residual restrictions:
Released by Muster instance:
```

Muster coordinates the removal or expiry of mission-scoped tools and access with Armory and Locksmith. It never receives credential custody.

Release:

- ends the operative's assignment to this mission
- does not delete or rewrite the operative
- does not alter the canonical persona
- does not erase the Deployment Package or field history
- does not authorize reuse in another mission
- does not release standing CEO or CoS assignments

A future mission requires its own authorized recruitment or mission binding under the applicable doctrine.

## Session And Instance End

After closure:

- Advisory Officer Curia Session Assignments end and are recorded
- the mission-specific Curia session closes
- the mission-specific Muster instance ends after the Release Record is complete
- standing CEO and CoS assignments remain
- historical records remain mission-correlated

## Reporting

Chamber of Scribes may prepare the Final Report only from the Mission Closure Record, final Curia Minute, and their cited evidence.

The report cannot change the disposition or conceal accepted unresolved matters.

Secretariat delivers the Final Report or terminal artifact to the operator.

## Non-Authority

This contract does not allow:

- an operative to close its own mission
- Lazaretto to decide completion
- CoS to choose disposition
- any participant to inherit closure authority from a mandate vacancy
- Muster to judge results
- Scribes to revise the closure decision
- closure merely because work stopped
- release before authorized closure
- silent deletion of open obligations
- one mission closure to close, revoke, end, or release another mission
- reuse merely because an operative was released

## Boundary Maxim

```text
The operative reports.
Lazaretto sanitizes.
The Chief of Staff assembles.
The CEO closes.
Muster releases.
Scribes report.
Secretariat delivers.
```
