# Authority Grant Profiles

## Status

Admitted Authority production contract.

Baseline: `AB-001`.

Admission: `Authority Production Admission Review 001`.

Evidence:

- `Authority–Provenance Convergence Run 004 — PASS`
- `Cognitive Constitutional Run 016 — 31 PASS / 0 FAIL`

Origin draft: `layers/authority/drafts/authority-grant-profiles.md`.

## Root Authority Basis Classes

### IMPERIUM_STEWARDSHIP

The operator's authority to govern Imperium's internal definitions, admitted assets, layer admissions, and internal placements.

It does not authorize action against external people, systems, resources, or organizations.

### CONTROLLED_RESOURCE

Authority arising because the Principal controls the external system, account, resource, environment, or asset affected by the mission.

The controlled scope must be explicit.

### DELEGATED_AUTHORITY

Authority granted to the Principal by another competent Principal.

The parent grant and delegation boundary must be explicit and provenance-complete.

### LEGAL_OR_CONTRACTUAL_AUTHORITY

Authority arising from an applicable legal, contractual, organizational, or office-based basis.

Imperium records the represented basis. It does not independently create or adjudicate it.

## Root Boundary

```text
IMPERIUM_STEWARDSHIP
→ may support internal admission and placement
→ may not support external mission action by itself

CONTROLLED_RESOURCE
or DELEGATED_AUTHORITY
or LEGAL_OR_CONTRACTUAL_AUTHORITY
→ may support mission action only within represented scope
```

The operator may be the first represented Principal.

The operator is not thereby universally sovereign.

## Minimal Grant Profiles

Six profiles are sufficient for the currently demonstrated distinctions.

### 1. INTERNAL_ADMISSION

Permits a bounded admission decision for an internal Imperium asset.

Candidate asset classes:

```text
CANONICAL_PERSONA
CITADEL_OFFICER
```

Inputs may include Pit or Spur findings.

Recommendation, test success, or custody does not create admission authority.

Default delegation: prohibited.

Native decision artifact remains to be defined by the applicable authority contract.

### 2. INTERNAL_PLACEMENT

Permits bounded standing placement of an already admitted internal asset.

Current use:

```text
Standing Curia Assignment
```

Placement does not grant executive decision authority.

Mission-specific Curia Session Assignment is not a new Authority Grant. It is a participation binding performed by the Chief of Staff within an authorized mission and standing role.

Default delegation: prohibited.

### 3. MISSION_ENVELOPE

Permits Imperium to form, bind, support, and act within one bounded mission.

Possible action classes:

```text
FORM_MISSION
APPROVE_WORK_SPECIFICATION
BIND_OPERATIVE
PROCESS_RETURN
INITIAL_EXTERNAL_CROSSING
CONTINUING_EXTERNAL_INSTRUCTION
BEGIN_WIND_DOWN
TERMINAL_DISPOSITION
RELEASE_MISSION_BINDING
REPORT_AND_DELIVER
```

The grant must list permitted action classes explicitly.

Silence does not authorize an action class.

The Mission Envelope permits classes of action. It does not choose a substantive executive decision.

Default delegation: prohibited.

Authorized instructions may be issued under the envelope without becoming new grants when they remain exact, bounded consequences of an authorized decision.

### 4. EXECUTIVE_DECISION

Permits one qualified and placed Executive Officer to make bounded Curia decisions.

Current specialization:

```text
Executive Mandate
```

The grant must identify:

- CEO Officer and specification
- Standing Curia Assignment
- decision domain
- mission coverage
- competence and counsel constraints
- safe-state behavior

Default delegation: prohibited.

Vacancy never transfers authority.

### 5. CAPABILITY_TOOL

Permits specified mission-scoped tool capability.

Current specialization:

```text
Tool Grant
```

The grant identifies permitted tool, mission, operative or acting surface, usage conditions, prohibitions, and expiry.

Availability is not authorization.

Default delegation: prohibited.

### 6. CAPABILITY_ACCESS

Permits specified mission-scoped access or authenticated operation.

Current specialization:

```text
Access Grant
```

Credential custody remains with Locksmith.

The grant does not transfer credential values.

Default delegation: prohibited.

## Why Launch Is Not A Seventh Profile

Launch requires:

```text
effective MISSION_ENVELOPE
including INITIAL_EXTERNAL_CROSSING
+ eligible Deployment Package
+ matching authority and provenance findings
```

Continuing outward action requires the matching permitted action class and, when substantive judgment is involved, an authorized Executive decision.

Decision authority does not become launch authority.

Launch authority is an explicit action class inside the Mission Envelope, not an inferred consequence and not necessarily a separate grant artifact.

## Why Closure And Release Are Not Separate Profiles

Closure requires the intersection of:

```text
MISSION_ENVELOPE
including applicable terminal action classes
+ effective EXECUTIVE_DECISION grant
+ exact mission and provenance match
```

The CEO chooses disposition under the Executive Mandate.

Muster releases the binding as an authorized consequence when the Mission Envelope permits release and the Closure Record matches.

Closure and release remain distinct actions without requiring distinct root grants.

## Grant Intersection

Some actions require more than one effective grant.

Examples:

| Action | Required profiles |
|---|---|
| Admit canonical persona | INTERNAL_ADMISSION |
| Place standing CEO | INTERNAL_PLACEMENT |
| CEO makes mission decision | MISSION_ENVELOPE + EXECUTIVE_DECISION |
| Use mission tool | MISSION_ENVELOPE + CAPABILITY_TOOL |
| Perform authenticated operation | MISSION_ENVELOPE + CAPABILITY_ACCESS |
| Initial launch | MISSION_ENVELOPE with INITIAL_EXTERNAL_CROSSING |
| Continuing substantive instruction | MISSION_ENVELOPE + EXECUTIVE_DECISION |
| Close mission | MISSION_ENVELOPE + EXECUTIVE_DECISION |
| Release binding | MISSION_ENVELOPE + matching authorized closure |

Intersection does not merge grants.

Each grant retains its own Principal, Authority Basis, scope, status, and provenance.

## Instruction Boundary

An instruction is not automatically a derived grant.

An authorized instruction:

- cites the effective grants
- remains within their intersection
- applies to the exact mission and action
- cannot widen delegation
- cannot outlive the grants

A new grant is required only when permission itself is delegated to a new grantee or scope—not whenever an authorized actor issues a bounded instruction.

## Provenance Requirements

Every profile requires provenance for:

- Principal identity
- Authority Basis
- parent grant when any
- grant identity and version
- native artifact-contract version
- mission and object correlation
- status changes
- supersession
- decision or instruction using the grant

Provenance records lineage.

It does not decide authority effectiveness.

## Non-Admissions

This contract does not admit:

- universal operator authority
- automatic external authority from IMPERIUM_STEWARDSHIP
- a grant bureaucracy or authority institution
- separate grants for every instruction
- credential transfer
- vacancy inheritance
- implicit launch
- implicit closure
- runtime permission machinery
- procedure

## Remaining Questions

- Should production-layer admission itself be represented by INTERNAL_ADMISSION or remain repository operator governance outside the domain model?
- Which mission action classes are truly universal versus deployment-medium-specific?
- Does REPORT_AND_DELIVER require mission authority when delivery is purely internal to the operator?
- Can any profile safely permit delegation by default? Current answer: no.
