# Curia

## Status

Draft convening surface.

Curia is the Citadel's live operational convening surface.

It contains no offices.

Its initial standing composition is deliberately minimal:

- one CEO persona serving as President and sole decision-maker under an effective Executive Mandate
- one Chief of Staff persona responsible for Curial Orchestration

Curia may later convene advisory Officers when the Chief of Staff engages Collegium during a mission.

It does not admit a permanent department hierarchy, collective decision authority, autonomous decision engine, runtime command center, or universal sovereign council.

---

## Core Question

```text
What is happening in the mission, does it conform to its governing requirements, and what must happen next?
```

---

## Ontology

```text
Office:
standing institutional responsibility

Officer:
a tested and Preceptory-admitted Curia persona belonging to an Executive, Staff, or Advisory class

President:
the standing Executive Officer assigned as CEO who presides over Curia and makes its sole decision

Chief of Staff:
the standing Staff Officer who orchestrates information, counsel, session flow, record, and authorized handoff without deciding

Counselor:
an Advisory Officer given a mission-specific Curia Session Assignment

Provider audit view:
a mission-scoped, read-only projection of an Armory or Locksmith Intervention Ledger available to the Chief of Staff

Executive Mandate:
the versioned artifact by which represented authority grants bounded decision authority to the qualified and assigned CEO President

Curia:
the shared surface on which the President receives reports and counsel, then decides and directs

Executive Officer ≠ Staff Officer ≠ Advisory Officer
President ≠ Chief of Staff
Chief of Staff ≠ Muster
Officer ≠ Operative
provider record ≠ mission judgment
Officer qualification ≠ Standing Curia Assignment
Standing Curia Assignment ≠ Executive Mandate

The Chief of Staff orchestrates Curia and reads permitted provider audit views.
The President decides.
Officers analyze, advise, verify, challenge, and preserve dissent.
Muster orchestrates the authorized decision outward.
The Operative executes within Theatre.
```

Curia does not analyze or decide independently.

Every concurrent mission has a separate Curia Session identity and mutable Situation Picture. Shared Officer, doctrine, persona, and mandate records are referenced by version; mission state is never merged.

The Chief of Staff organizes Curial activity but has no substantive decision authority. Convened Officers provide counsel. The CEO President alone decides.

---

## Inputs

Curia receives sanitized material from Lazaretto, including:

- active mission data packets
- operative reports
- observations
- evidence and provenance
- uncertainty
- boundary contacts
- tool and access outcomes
- drift or failure signals
- completed, terminated, or failed mission returns
- Lazaretto sanitation and quarantine records

Curia may place these beside:

- Mission Need
- Work Specification
- Deployment Package
- Operative and Canonical Persona versions
- Persona Governance Doctrine
- mission constraints
- prior situation state
- applicable evidence requirements

---

## Initial Composition And On-Demand Counsel

Curia does not require Collegium to pre-compose every mission.

A mission begins with the Executive Officer and Staff Officer identified by the current Standing Curia Assignments. The CEO may decide only while an effective Executive Mandate names that Officer and assignment and covers the mission and decision. No counselor, quorum, or mission-dedicated Officer corps is presumed.

During the mission, a need for distinct counsel may arise. The Chief of Staff frames that need and engages Collegium as part of Curial Orchestration.

```text
active Curia session
→ counsel need arises
→ Chief of Staff engages Collegium
→ Collegium resolves the required advisory role
→ Preceptory searches the standing Officer corps
    ├── suitable Officer found → session assignment → Officer advises
    └── no suitable Officer
         → COUNSEL_UNAVAILABLE
         → CEO withholds affected decision
         → hold / constrain / defer / admitted escalation
         → Capability Gap Record
         → Smith only if a durable role is justified
→ CEO decides only when competent counsel is no longer missing
```

The counselor is standing; the counsel is mission-specific.

Smith is invoked only when the missing capability represents a justified, durable Officer role—not merely because one mission needs advice.

Preceptory holds reusable Citadel Officers. Praetorium remains reserved for future Imperium Officers at the outer echelon.

---

## Concurrent Sessions And Capacity

Before a mission-specific Curia session becomes OPEN, the Chief of Staff records a Session Admission Finding covering CEO availability, CoS availability, Executive Mandate scope, conflicting commitments, and applicable capacity constraints.

If either standing role cannot responsibly serve the session, the session enters `PENDING_STANDING_ROLE` or `DECISION_WITHHELD_CAPACITY`.

Capacity unavailability does not create an acting CEO or CoS, transfer authority, merge sessions, or authorize a new hold or disposition. The mission remains inside its already authorized envelope or safe state.

Packets, provider views, counsel assignments, Minutes, closure records, and release references must match the session's Mission Identity. A mismatch produces `CROSS_MISSION_COLLISION` and quarantine or rejection, not inferred correlation.

## Counsel Unavailable

When required counsel is absent, Curia applies the `Counsel Availability Contract`.

The CEO does not decide the specialized substance. The affected decision enters `DECISION_WITHHELD`. The Chief of Staff records the scope and dependencies and hands any authorized hold or constraint to Muster.

Unrelated work may continue only when the CEO explicitly finds it separable.

Counsel absence creates a Capability Gap Record. It does not automatically authorize Smith or mission-specific staff.

---

## Provider Record Access

The Chief of Staff may issue mission-scoped, read-only queries against Armory and Locksmith Intervention Ledgers when their records are relevant to the Situation Picture.

The Chief of Staff:

- receives only the permitted audit view
- cannot alter, append, supersede, or delete provider records
- never receives credential values
- preserves provider, mission, deployment, ticket, timestamp, and correlation provenance
- distinguishes provider intervention facts from mission interpretation
- preserves the distinct provider-observed intervention stages
- does not infer a later stage from an earlier one
- does not treat any provider stage as mission success
- presents unresolved conflicts to the President

Armory and Locksmith remain the owners and authors of their records.

---

## Responsibilities Of The Chief Of Staff, President, And Convened Officers

The Chief of Staff:

- assembles and maintains the Situation Picture presented within Curia
- manages Curia session flow and agenda
- obtains applicable mission-scoped provider audit records
- frames counsel needs and engages Collegium
- brings session-assigned Officers and their counsel into Curia
- ensures findings, evidence, uncertainty, and dissent reach the President
- verifies the Executive Mandate identity, status, grantee, assignment, effective interval, and scope match
- records AUTHORITY_UNAVAILABLE or AUTHORITY_CONTESTED without granting or inheriting authority
- maintains the Curia Minute
- hands the President's authorized decision to Muster without reinterpretation

The CEO President:

- receives the organized Situation Picture, provider audit records, and any Officer counsel
- remains the sole Curia decision-maker while the Executive Mandate is effective and in scope
- states the decision, rationale, Executive Mandate version, scope match, and authority basis
- authorizes the direction handed to Muster

Convened Officers may:

- correlate sanitized packets
- maintain the current Situation Picture
- distinguish observations, operative inference, and unsupported claims
- compare field conditions with mission assumptions
- verify compliance with the Deployment Package and Persona Governance Doctrine
- detect drift, evidence deficiency, blockage, escalation, and unexpected terrain
- deliberate within represented authority
- preserve dissent and uncertainty
- adjust authorized mission parameters
- order clarification or remediation
- pause, resume, recall, or terminate when authorized
- identify when a question exceeds the convened authority

---

## Products

A Curia session may produce:

- Situation Picture
- Mission Conformance Finding
- Operational Directive
- Mission Parameter Amendment
- Pause Order
- Resume Order
- Recall Order
- Termination Order
- terminal mission findings
- Mission Closure Record
- escalation or authority-deficiency record

Every Curia decision produces a `Curia Minute`.

The Minute may include:

```text
Mission:
Deployment:
Curia Session identity:
Muster Instance identity:
Operative Binding identity:
Session Admission Finding and capacity state:
Packet set:
Situation picture:
President Officer Specification + Standing Assignment:
Executive Mandate identity, version, status, and Mandating Principal:
Mandate scope match and authority verification:
Authority deficiency or contest:
Chief of Staff Officer Specification + Standing Assignment:
Provider audit views and staged outcomes queried:
Officers convened:
Counsel need and Collegium engagement:
Counsel availability finding:
Withheld decision and dependent actions:
Capability gap record:
Authority represented:
Observations:
Operative claims:
Evidence status:
Doctrine implicated:
Deliberation:
Dissent:
Officer advice and dissent:
President decision:
Decision rationale and authority basis:
Operational directive:
Mission-parameter amendment:
Required follow-up:
Closure state and disposition:
Mission Closure Record:
```

---

## Evidence Example

```text
Mission requirement: cite references
Doctrine: absence of evidence does not equal approval
Operative packet: approval recommendation with no evidence

Curia finding: EVIDENCE_DEFICIENCY
Mission state: REMEDIATION_REQUIRED
Directive: provide cited evidence; dependent approval remains paused
```

This is conformance verification against an existing contract, not invention of new mission authority.

---

## Mission Closure

An operative completion claim does not close the mission.

Curia applies the Mission Closure and Operative Release Contract:

```text
closure assessment
→ CEO BEGIN_WIND_DOWN
→ CLOSURE_PENDING
→ Muster operationalizes wind-down
→ Theatre Terminal Field Packet
→ Lazaretto
→ Terminal Situation Picture
→ CEO MISSION_CLOSED + disposition
→ Mission Closure Record
→ Muster Operative Release Record
```

The CEO alone selects COMPLETED, PARTIALLY_COMPLETED, FAILED, or TERMINATED under an effective Executive Mandate covering the terminal decision. Authority loss does not itself create a disposition.

If no terminal packet can be obtained, its absence remains explicit and may not be converted into successful completion.

---

## Relationship To Lazaretto

Lazaretto sanitizes, normalizes, quarantines, preserves, and releases safe internal packets.

Curia receives sanitized packets.

Curia does not sanitize raw Theatre material or bypass Lazaretto.

---

## Relationship To Muster

The Chief of Staff hands decisions authorized by the CEO President to Muster for outbound mission orchestration.

This may include:

- initial deployment released from Muster
- clarification
- remediation
- mission-parameter adjustment
- pause
- resume
- recall
- termination

Muster reconciles the decision with the active mission, prepares the appropriate mission instruction or package amendment, and presents the authorized outward traffic to Iron Gate.

Curia does not address Iron Gate or Theatre directly.

---

## Non-Authority

Curia must not:

- become a hierarchy of internal offices
- require convened Officers before a demonstrated counsel need exists
- allow the Chief of Staff, an Officer, quorum, or majority to displace the President's sole decision authority
- conceal which authority made a decision
- permit a CEO decision without an effective, matching, in-scope Executive Mandate
- transfer decision authority by vacancy or capacity exhaustion
- merge mutable mission state across concurrent Curia sessions
- infer mission correlation from semantic similarity
- treat operative claims as verified merely because they arrived
- bypass Lazaretto sanitation
- directly provide Armory or Locksmith services
- carry credentials
- rewrite Persona Governance Doctrine
- treat urgency as permission to decide beyond competence
- leave a required-counsel absence in an unrecorded wait
- silently expand mission purpose
- erase dissent, uncertainty, or provenance
- accept an operative completion claim as mission closure
- release an operative
- execute in Theatre

---

## Boundary Maxim

```text
Lazaretto sanitizes.
Curia convenes.
Providers record.
The Chief of Staff reads and correlates.
Officers counsel when called.
The Chief of Staff orchestrates Curia.
The Executive Mandate authorizes.
The President decides.
Muster orchestrates direction outward.
Iron Gate carries the crossing.
Theatre executes.
```
