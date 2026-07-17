# Authority-Origin Investigation

## Status

Draft investigation.

This document does not admit an authority layer, upper-echelon institution, sovereign office, runtime permission system, or external-action authority.

It examines where authority originates, how Imperium may represent it, and where CB-001 currently stops at an unresolved grantor.

---

## Core Question

```text
What makes an Imperium action permitted,
who may grant that permission,
and how is its scope prevented from expanding?
```

Authority is not responsibility, competence, assignment, capability, evidence, provenance, or execution.

---

## First Invariant

```text
Imperium does not manufacture authority.

Authority enters Imperium from a represented Principal
whose authority basis exists independently of Imperium.
```

Imperium may:

- represent an external grant
- constrain it
- verify its status and scope
- derive a narrower grant only when delegation is explicitly permitted
- withhold action when authority is missing or contested
- preserve the historical authority basis of an action

Imperium may not make its own institutional need the source of authority.

---

## Authority Relations

```text
responsibility:
what an entity is expected to do

competence:
what an entity is fit to do

assignment:
where an admitted asset is placed

capability:
what an asset is technically able to do

authority:
what action a represented Principal has permitted

instruction:
what an authorized actor directs within that permission

execution:
what actually happens
```

None substitutes for another.

---

## Authority Classes Found In CB-001

### Represented Mission Authority

The authority under which operator intent becomes an authorized Imperium mission.

Current gap:

- Petition preserves intent but not a complete authority basis.
- Work Specification is described as approved, but the approver and approval grant are not canonically defined.
- Mission binding and initial launch depend on authority that no current artifact clearly originates.

### Executive Decision Authority

The Executive Mandate grants bounded decision authority to the qualified and assigned CEO President.

This is the strongest existing local authority contract.

Current gap:

- the Mandating Principal remains unresolved
- the Principal authority basis is referenced but not defined
- the mandate cannot prove its own issuer competent to issue it

### Placement And Participation Authority

Standing Curia Assignments place the CEO and Chief of Staff.

Curia Session Assignments bind Advisory Officers to one session.

These do not grant substantive executive authority.

Current gap:

- the authority that issues, replaces, or supersedes Standing Curia Assignments is unresolved
- CoS session-binding responsibility exists, but its institutional authorization is implicit

### Admission Authority

Pit and Spur test and recommend.

Garrison and Preceptory hold admitted assets.

Current gap:

- the actor or artifact that converts a recommendation into admission is not defined
- production admission in the repository currently depends on explicit operator approval, but CB-001 does not state whether that development practice is the intended in-world authority model

### Capability-Grant Authority

Tool Grant and Access Grant are bounded mission artifacts.

Armory and Locksmith cannot issue capability merely because it is available.

Current gap:

- the grantor competent to authorize tools and access is unresolved
- Locksmith custody does not itself authorize credential use
- mission constraints preserved by Muster are not the root of capability authority

### Operational-Direction Authority

The CEO authorizes a decision; Muster operationalizes it; Iron Gate carries it outward.

Current gap:

- an authorized Curia decision may support a later mission instruction
- initial launch has no equally explicit authorizing artifact
- Ready For Launch is correctly defined as not launch authority

### Closure And Release Authority

The CEO closes under an effective Executive Mandate.

Muster releases only after exactly matched closure and release authorization.

Current gap:

- a terminal safe-state disposition without an effective mandate depends on earlier authority whose origin must be explicit
- release authorization is represented in the closure record but does not independently explain the root grant

---

## Candidate Minimal Authority Model

This is a hypothesis for testing, not admitted terminology.

### Represented Principal

The external person, organization, office, legal role, or other authority represented to Imperium as competent to grant a bounded permission.

Imperium does not create the Principal.

### Authority Basis

The external or previously admitted basis on which the Principal may issue the grant.

Examples may include operator ownership, contractual delegation, organizational office, legal permission, or a parent grant.

The basis is referenced, not invented by Imperium.

### Authority Grant

A versioned representation of permission from one Principal to one grantee or bounded acting surface.

Possible semantic fields:

```text
Grant identity and version
Principal identity
Authority Basis reference
Grantee identity or qualified role
Permitted action or decision domain
Object and mission scope
Effective interval
Conditions and required counsel
Prohibited actions
Delegation permitted or prohibited
Maximum delegation depth or boundary
Safe-state instruction if authority becomes unavailable
Suspension, withdrawal, expiry, and supersession
Parent grant when derived
Status
```

This is an information contract, not a runtime ACL or database schema.

### Derived Grant

A narrower grant created from a parent grant only when the parent explicitly permits delegation.

Invariant:

```text
derived scope ⊆ parent scope
derived duration ≤ parent duration
derived delegation ≤ parent delegation
derived authority never survives parent invalidation
```

A derived grant may narrow authority. It cannot enlarge or repair it.

---

## Relationship To Existing CB-001 Artifacts

The candidate model should not replace specific contracts merely to achieve uniform naming.

Possible relationships to test:

| Existing artifact | Candidate relation |
|---|---|
| Executive Mandate | Specialized Authority Grant for CEO decision authority |
| Tool Grant | Specialized capability Authority Grant |
| Access Grant | Specialized access Authority Grant |
| Work Specification approval | May require a Mission Authority Grant or explicit Principal approval reference |
| Standing Curia Assignment | Placement artifact requiring authority, but not itself substantive authority |
| Curia Session Assignment | Participation artifact issued under CoS responsibility; no executive grant |
| Curia Minute | Decision record citing the applicable grant |
| Deployment Package | Assembly artifact citing mission and launch authority |
| Mission Closure Record | Terminal decision record citing closure authority |
| Operative Release Record | Consequence of closure authorization, not a new root grant |

The test must preserve meaningful differences. Uniformity must not collapse decision, capability, participation, launch, closure, or release.

---

## Provenance Boundary

Every Authority Basis and Authority Grant requires provenance.

However:

```text
provenance of a grant
≠ validity of the grant

valid authority
≠ traceable lineage
```

The authority investigation may require a provenance reference but must not define provenance sufficiency.

If grant lineage is missing, authority evaluation stops with an unresolved-origin result. Authority does not invent the missing lineage.

---

## Authority Evaluation Outcomes

Candidate outcomes:

```text
AUTHORITY_EFFECTIVE
AUTHORITY_UNAVAILABLE
AUTHORITY_CONTESTED
AUTHORITY_EXPIRED
AUTHORITY_WITHDRAWN
AUTHORITY_SUPERSEDED
AUTHORITY_SCOPE_MISMATCH
AUTHORITY_ROOT_UNRESOLVED
AUTHORITY_DELEGATION_EXCEEDED
```

These are semantic findings, not runtime states.

Only `AUTHORITY_EFFECTIVE` for the exact action and scope supports a new authorized action.

---

## Pressure Tests

### A-01 — Qualified And Assigned, No Grant

A qualified CEO with a valid Standing Curia Assignment has no effective Executive Mandate.

Expected:

```text
AUTHORITY_UNAVAILABLE
decision withheld
no transfer to CoS or counselor
```

Existing CB-001 behavior survives.

### A-02 — Effective Mandate, Root Unresolved

The Executive Mandate is internally complete, but the Mandating Principal's authority basis cannot be established.

Expected:

```text
AUTHORITY_ROOT_UNRESOLVED
affected decision withheld
```

A well-formed mandate does not authorize itself.

### A-03 — Tool Available, No Grant

Armory has a usable tool but no effective Tool Grant.

Expected:

```text
capability exists
authority absent
tool withheld
```

### A-04 — Valid Decision, Missing Launch Authority

The CEO issues a valid in-scope decision. Muster creates an internally valid instruction, but no grant authorizes the external crossing or action.

Expected:

```text
decision remains historically valid
outbound execution withheld
no inference that decision authority equals launch authority
```

### A-05 — Derived Grant Exceeds Parent

A child grant permits a wider mission, longer duration, or delegation not allowed by its parent.

Expected:

```text
AUTHORITY_DELEGATION_EXCEEDED
child grant ineffective
parent remains unchanged
```

### A-06 — Admission Recommendation Without Admission Authority

Pit or Spur recommends admission, but no competent admission decision exists.

Expected:

```text
candidate remains unadmitted
Garrison or Preceptory cannot convert recommendation into authority by custody
```

### A-07 — Direct Operator Grant

The operator is recorded as Principal with a stated authority basis and issues a bounded non-delegable grant.

Expected:

```text
grant may be effective if provenance is independently sufficient
no upper-echelon institution required
```

This test determines whether the minimal model can begin with the operator without prematurely admitting Praetorium or another sovereign office.

---

## Preliminary Finding

A common authority grammar appears justified.

A common authority institution does not.

The minimum candidate is a represented, versioned grant model rooted outside Imperium. Existing specialized grants and mandates may reference that grammar without collapsing into one artifact.

This finding supports continued testing of an authority-contract surface.

It does not yet justify a named authority layer.

---

## Invalidation Conditions

Discard or revise the candidate model if:

- one generic grant collapses materially different authority forms
- the model makes Imperium the source of external permission
- assignment or competence becomes authority
- every internal responsibility unnecessarily requires a grant
- delegation rules create an upper-echelon institution by implication
- provenance is absorbed into authority
- runtime permission machinery is introduced
