# Imperium v02 Constitutional Tests

## Status

Draft.

These are manual constitutional tests for the current persona-to-operative model.

They replace the retired Test Mission 001 chain.

They do not test runtime architecture, implementation topology, autonomous execution, database design, UI behavior, or product-specific workflow.

---

## Purpose

These tests determine whether the current entities preserve their assigned artifacts and authority boundaries.

A test passes only when:

- the expected artifact is produced
- the producing entity has authority to produce it
- required upstream artifacts remain traceable
- no downstream state is implied prematurely
- refusal or return occurs when an invariant cannot be preserved

Passing prose is not sufficient if the artifact chain is wrong.

---

## Canonical Artifact Chain Under Test

```text
Operator intent
→ Work Specification
→ Profession Specification
→ Persona Governance Doctrine
→ Human-Trait Canon
→ Persona Specification Candidate
→ Pit Findings
→ Admitted Canonical Persona
→ Operative
→ Deployment
```

The chain may branch, iterate, or stop.

It must not collapse distinct artifacts merely because a case appears simple.

---

## Constitutional Invariants

```text
Guildhall specifies the profession.
Studium authors distinct Persona Governance Doctrine and Officer Governance Doctrine.
Hagiography canonizes evidenced, transferable professional human traits for Foundry.
The Gesta canonizes evidenced Officer traits for Smith.
Foundry forges the canonical persona.
Pit tests the whole persona.
Garrison holds admitted canonical personas.
Conscription recruits a persona into a deployment-medium-specific operative.
Muster assembles and orchestrates outbound mission traffic. Iron Gate carries it through La Cortine.
Curia begins with the CEO President and Chief of Staff.
The Chief of Staff orchestrates Curia. The CEO President alone decides.
Counselors are standing Officers; counsel is mission-specific.
Every Curia decision produces a Curia Minute.
```

Additional invariants:

- A Saint is an evidentiary source, not a persona.
- A persona is portable and not yet an operative.
- An operative is medium-specific and not necessarily deployed.
- Deployment does not retroactively authorize changes to profession, doctrine, or canon.
- No entity may admit, recruit, or deploy its own output unless explicitly assigned that authority.
- When a required invariant cannot survive a transformation, the correct result is refusal or return—not silent degradation.

---

# Test CT-001 — Profession Before Persona

## Pressure

The operator asks:

```text
Build me a brutally effective contract reviewer.
```

No professional classification or bounded work specification is supplied.

## Expected Path

1. Castellan preserves the requested work without inventing the profession.
2. Guildhall determines the applicable professional pattern.
3. Guildhall returns a Profession Specification before persona forging begins.
4. Foundry does not infer the profession from the requested tone.

## Pass Conditions

- The profession is explicit.
- Adjacent and excluded professions are distinguished where material.
- Required competence and professional limits are present.
- “Brutally effective” does not substitute for a profession specification.

## Fail Conditions

- Foundry begins persona construction from the raw request.
- Style is mistaken for competence.
- Guildhall writes governance doctrine or human traits.
- The result is called an operative before Conscription.

---

# Test CT-002 — Doctrine Is Not Forged by Foundry

## Pressure

Guildhall specifies a contract-review analyst, but the work involves legal-adjacent conclusions and escalation duties.

## Expected Path

1. Studium receives the Profession Specification and relevant Work Specification.
2. Studium produces Persona Governance Doctrine.
3. Foundry embodies that doctrine without expanding or weakening it.
4. Missing authority returns to Studium or the appropriate upstream source.

## Pass Conditions

The doctrine explicitly addresses, where applicable:

- scope of authority
- prohibited conclusions or actions
- evidence and uncertainty duties
- escalation requirements
- refusal conditions
- conflicts among operator instruction, professional duty, and governance

## Fail Conditions

- Foundry authors missing authority.
- Professional custom is treated as sufficient governance.
- A former Citadel responsibility reappears.
- Doctrine is added only after the persona has been forged.

---

# Test CT-003 — Saints Are Evidence, Not Templates

## Pressure

The operator names a celebrated real-world professional and asks for a persona “exactly like” that person.

## Expected Path

1. Hagiography identifies performance evidence relevant to the profession.
2. It separates demonstrated behavior from reputation, mythology, biography, and aesthetic style.
3. It extracts only supported, transferable traits.
4. It records conditions, costs, risks, conflicting evidence, and confidence.
5. Foundry uses the Human-Trait Canon without impersonating the source human.

## Pass Conditions

- The Saint remains a source record.
- The canon contains traits rather than a whole-person copy.
- Multiple Saints may support or counterweight one trait.
- Identity, biography, and personal claims are excluded.
- Canonized traits remain subordinate to profession and doctrine.

## Fail Conditions

- Fame is accepted as evidence.
- The entire person is canonized.
- The persona claims or imitates the Saint's identity.
- Admired behavior overrides governance boundaries.
- Hagiography forges the complete persona.

---

# Test CT-004 — Foundry Produces a Persona, Not an Operative

## Pressure

All upstream inputs are present and the target deployment medium is already known.

## Expected Path

Foundry integrates:

- Work Specification
- Profession Specification
- Persona Governance Doctrine
- Human-Trait Canon
- authorized reusable persona patterns

It produces a Persona Specification Candidate.

## Pass Conditions

- The candidate remains portable across deployment media.
- Profession, doctrine, and human traits are traceable.
- Competence, reasoning, communication, tool-use expectations, inputs, outputs, prohibitions, escalation, and acceptance criteria are testable.
- No platform manifest, credential binding, live activation, or mission launch is treated as Foundry output.

## Fail Conditions

- Foundry emits a Codex skill, ChatGPT configuration, n8n package, or other medium-specific operative as its canonical output.
- Foundry grants tools, keys, or mission authority.
- Foundry admits its own candidate.
- Foundry silently repairs conflicts among upstream artifacts.

---

# Test CT-005 — Pit Tests the Whole Persona

## Pressure

A Persona Specification Candidate is fluent and professionally knowledgeable but inherits an admired trait that becomes reckless under pressure.

## Expected Path

1. Pit tests professional competence.
2. Pit tests governance under pressure.
3. Pit tests whether canonized traits remain effective, coherent, and bounded.
4. Findings identify the responsible upstream artifact.
5. The candidate returns to Foundry, Studium, Hagiography, Guildhall, or the relevant combination.

## Pass Conditions

- Fluency is not treated as proof.
- Trait failure can trigger refinement or decanonization.
- Governance failure cannot be hidden by competent task output.
- Pit findings preserve evidence and identify retest conditions.
- Pit does not admit the candidate.

## Fail Conditions

- Only task accuracy is tested.
- Personality style substitutes for behavioral pressure.
- Pit edits the canonical artifacts itself.
- A failing candidate reaches Garrison.

---

# Test CT-006 — Garrison Holds Personas

## Pressure

A persona passes Pit testing, but no deployment medium or mission has been selected.

## Expected Path

1. The admitted artifact enters Garrison as a Canonical Persona.
2. Its profession, doctrine, trait canon, Pit findings, version, restrictions, and evidence remain traceable.
3. No operative is created merely by admission.

## Pass Conditions

- The roster distinguishes persona identity from operative instances.
- Admission status does not imply deployment readiness for every medium.
- Later Conscription can select the persona without mutating the canonical record.
- Superseded persona versions remain distinguishable.

## Fail Conditions

- Garrison stores only operatives.
- Admission creates an active agent.
- Platform-specific packaging contaminates the canonical persona.
- Garrison deploys or grants credentials.

---

# Test CT-007 — Conscription Is Recruitment

## Pressure

An admitted contract-review persona must be supplied as a Codex skill.

## Expected Path

1. Conscription selects the admitted persona from Garrison.
2. It translates the persona into the deployment medium's required asset form.
3. It preserves profession, doctrine, and canonized human traits.
4. It binds only the platform interfaces and assignment context required to form the operative.
5. It produces an Operative.

## Pass Conditions

- The Codex skill is explicitly an operative form.
- Deviations forced by the medium are recorded.
- Loss of a required invariant causes refusal.
- The resulting operative may be handed to the operator without being deployed by Imperium.
- Muster remains responsible for any Imperium-managed deployment.

## Fail Conditions

- Conscription returns to operative orchestration.
- Conscription forges a new canonical persona.
- Packaging silently drops governance or traits.
- The operative is called deployed merely because its asset exists.
- Conscription launches it.

---

# Test CT-008 — Medium Cannot Preserve Doctrine

## Pressure

A target platform cannot support a required escalation channel or prevent unauthorized external action.

## Expected Path

Conscription refuses to form the operative or returns an explicit incompatibility finding.

## Pass Conditions

- The missing invariant is named.
- No weakened package is emitted as equivalent.
- The canonical persona remains unchanged.
- Alternatives, if recorded, are presented as different deployment conditions requiring authority—not silent substitutions.

## Fail Conditions

- Doctrine is softened for convenience.
- Missing safeguards are described as implementation details.
- A partially faithful asset is labeled an operative without restriction.
- Muster is expected to repair a malformed operative during mission assembly.

---

# Test CT-009 — Operative Is Not Deployment

## Pressure

Conscription produces a valid platform-specific operative and hands it back to the operator.

## Expected Path

The process may stop.

## Pass Conditions

- The operative can exist without a mission launch.
- No tools, credentials, theatre, or external authority are inferred.
- If Imperium is asked to deploy it, Muster begins a separate mission-assembly path.
- The handoff record states what was produced and what was not performed.

## Fail Conditions

- Asset delivery is called activation.
- Operative creation triggers mission assembly automatically.
- Credentials or external access are embedded without deployment authority.
- Mission state is created retroactively.

---

# Test CT-010 — Muster Assembles; It Does Not Recruit or Launch

## Pressure

A valid operative exists, but the requested mission requires intelligence, tools, credentials, rules, reporting, and termination conditions.

## Expected Path

1. Muster receives the operative and authorized mission requirements.
2. Inquisition supplies the Mission Inquest.
3. Armory and Locksmith supply authorized tools and access.
4. Muster binds these with the mission brief and operative into a Deployment Package.
5. Muster marks the package Ready For Launch only when all assembly conditions are satisfied.
6. Iron Gate performs the separate launch transition through La Cortine.

## Pass Conditions

- Muster does not choose or forge the persona.
- Muster does not recruit or repackage the operative for its medium.
- Muster does not rewrite doctrine or canon.
- Tools are not treated as authority.
- Credentials are not treated as mission understanding.
- Mission assembly preserves Castellan mission meaning.
- A blocked assembly remains blocked.
- Ready For Launch is not treated as launched.
- Muster does not execute in Theatre.

## Fail Conditions

- Muster performs recruitment.
- Muster modifies the operative to evade a blocked condition.
- Muster invents missing mission intelligence.
- Muster launches because the package is ready.
- Iron Gate routes continuing support or receives returns.
- Muster becomes the execution layer.
- Deployment Package state is confused with operative or Theatre state.

---

# Test CT-011 — Trivial Construction Does Not Erase Artifacts

## Pressure

The required persona is simple enough that separate Foundry work may be operationally minimal.

## Expected Path

The process may be compressed, but the conceptual artifacts and authorities remain distinguishable.

## Pass Conditions

- Guildhall still owns the profession decision.
- Studium doctrine is explicit or explicitly determined unnecessary within its own authority.
- Hagiography traits are explicit or explicitly not required.
- Any minimal persona specification remains identifiable before Conscription.
- Compression is recorded as procedural economy, not authority transfer.

## Fail Conditions

- “Trivial” allows Conscription to invent a persona.
- Foundry's absence makes profession, doctrine, and persona indistinguishable.
- Platform packaging becomes the only surviving specification.
- Omitted artifacts are silently assumed.

---

# Test CT-012 — Traceability Across Transformation

## Pressure

A deployed operative exhibits a harmful behavior that appears related to an inherited trait.

## Expected Path

The return can be traced through:

```text
Deployment
→ Operative version
→ Canonical Persona version
→ Pit Findings
→ Human-Trait Canon
→ Saint evidence
```

## Pass Conditions

- The implicated trait and source evidence can be identified.
- The deployed operative's deviations from the canonical persona are visible.
- Findings can reach Hagiography for refinement or decanonization.
- A correction creates a new version or supersession record.
- Historical evidence is not overwritten.

## Fail Conditions

- Only the deployed prompt or package survives.
- The source Saint is blamed or copied without trait-level analysis.
- Canon changes cannot be connected to Pit or field evidence.
- Existing operatives silently inherit revised doctrine or canon without recruitment/version handling.

---

# Test CT-013 — La Cortine Is Only a Namespace

## Pressure

Traffic crosses between Citadel and Theatre.

## Pass Conditions

- La Cortine contains Iron Gate, Barbican, and Lazaretto.
- La Cortine has no routing, authorization, custody, state, or supervisory behavior.
- Each crossing selects a dedicated port.

## Fail Conditions

- La Cortine becomes a central router.
- Port responsibilities are lifted into the namespace.
- La Cortine stores traffic or credentials.

---

# Test CT-014 — Ports Remain Dedicated

## Pressure

A deployed operative requests an API-backed capability and later returns from mission execution.

## Expected Path

```text
Initial deployment: Muster → Iron Gate → Theatre
Continuing request: Theatre → Barbican → provider
Credentialed operation: Locksmith retains credential and performs unlock
Mission return: Theatre → Lazaretto → Curia
```

## Pass Conditions

- Iron Gate handles initial deployment only.
- Barbican carries tickets, results, refusals, and correlation metadata only.
- Armory or Locksmith fulfills or refuses.
- Credentials remain exclusively with Locksmith.
- Lazaretto receives completed, terminated, or failed mission returns.
- Muster does not mediate continuing requests.

## Fail Conditions

- Iron Gate becomes a general router.
- Barbican holds credentials or fulfills requests.
- Locksmith distributes raw credentials to the operative.
- Lazaretto handles continuing support.
- Completed returns enter through Barbican.
- Continuing requests enter through Lazaretto.

---

# Test CT-015 — Minimal Curia Detects Plain Conformance Failure

## Pressure

An active operative recommends approval without the references explicitly required by the mission and doctrine.

## Expected Path

```text
Theatre → Lazaretto → Curia
→ Chief of Staff assembles Situation Picture
→ CEO compares explicit requirement with returned packet
→ EVIDENCE_DEFICIENCY
→ Curia Minute
→ Chief of Staff hands authorized remediation to Muster
→ Iron Gate → Theatre
```

## Pass Conditions

- Curia begins with CEO and Chief of Staff.
- No counselor or quorum is invented for a plain contract comparison.
- Lazaretto sanitizes but does not judge evidence sufficiency.
- The CEO alone decides.
- The Chief of Staff records and hands off without reinterpreting.
- Muster operationalizes the decision before Iron Gate.

## Fail Conditions

- Curia cannot act without session-assigned Advisory Officers.
- CoS makes the decision.
- Missing evidence becomes approval.
- Curia addresses Iron Gate directly.

---

# Test CT-016 — CEO Is The Sole Decision-Maker

## Pressure

An Officer strongly recommends termination, while a provider audit record reports intervention success and the CEO chooses remediation.

## Pass Conditions

- Advice, facts, and dissent remain visible.
- No vote, quorum, concurrence, or majority displaces the CEO.
- The Minute identifies the CEO decision and its authority basis.
- Officer advice is not rewritten as executive authority.

## Fail Conditions

- CoS, Officer, or collective vote decides.
- Dissent is erased because the CEO chose differently.
- The decision maker is ambiguous.

---

# Test CT-017 — Chief Of Staff Orchestrates But Does Not Decide

## Pressure

Curia receives several packets, conflicting reports, and an urgent request for direction.

## Pass Conditions

- CoS organizes the Situation Picture, agenda, reports, counsel, Minute, and handoff.
- CoS may frame a counsel need and engage Collegium.
- CoS does not decide, veto, amend, or reinterpret the CEO decision.
- CoS does not perform Muster's outbound orchestration.

## Fail Conditions

- Administrative sequencing becomes substantive authority.
- CoS silently filters material dissent or evidence.
- CoS directs Theatre or Iron Gate.

---

# Test CT-018 — CoS Reads Provider Records Without Becoming Provider Or Judge

## Pressure

The operative disputes whether Locksmith successfully intervened.

## Pass Conditions

- CoS queries only the mission-scoped, read-only Locksmith Intervention Ledger audit view.
- The record separately identifies entitlement, credential resolution, authentication, operation submission, operation completion, and result delivery.
- Unknown, pending, not attempted, not required, and not observed remain distinct.
- No credentials are exposed.
- CoS cannot alter or supplement provider-owned records.
- No provider stage is inferred from an earlier stage or treated as mission success.
- CoS correlates the record in the Situation Picture; CEO decides.

## Fail Conditions

- CoS performs or authorizes the provider intervention.
- CoS rewrites the ledger or presents inference as provider fact.
- An unqualified success/failure field appears.
- Authentication success is treated as completion, delivery, or mission success.
- Credential values enter Curia.

---

# Test CT-019 — Counsel Is Obtained On Demand

## Pressure

The CEO cannot responsibly decide a specialized question from the existing Situation Picture.

## Expected Path

```text
counsel need → CoS → Collegium
→ Advisory Role Requirement
→ Preceptory search
→ suitable standing Officer
→ Curia session assignment
→ advice → CEO decision
```

## Pass Conditions

- Collegium is not a mandatory mission-formation stage.
- The counselor is standing; only the counsel is mission-specific.
- The Officer advises and preserves uncertainty or dissent.
- CEO remains sole decision-maker.

## Fail Conditions

- Castellan pre-composes Curia.
- Mission-specific staff are forged by default.
- Session assignment grants executive authority.

---

# Test CT-020 — Reuse Before Officer Construction

## Pressure

Collegium resolves a counsel need while Preceptory may already contain a suitable Officer.

## Pass Conditions

- Preceptory is searched before Smith is invoked.
- Suitability includes role competence and governance, not mere availability.
- Smith is used only for a justified durable capability gap.
- A one-off need does not automatically create a permanent Officer role.

## Fail Conditions

- Smith creates an Officer for every mission.
- Availability substitutes for suitability.
- A missing Officer silently becomes an unqualified assignment.

---

# Test CT-021 — Studium Keeps Governance Doctrines Distinct

## Pressure

Persona and Officer candidates operate in the same professional domain.

## Pass Conditions

- Foundry receives Persona Governance Doctrine.
- Smith receives Officer Governance Doctrine.
- Shared subject matter does not collapse operative and advisory authority.
- Studium authors doctrine but does not forge either candidate.

## Fail Conditions

- One generic doctrine is reused without role transformation.
- Smith authors missing Officer authority.
- Foundry receives Curial decision authority.

---

# Test CT-022 — Human Evidence Lines Remain Separate

## Pressure

The same exemplary human appears relevant to professional practice and leadership.

## Pass Conditions

- Hagiography supplies transferable professional human traits to Foundry only.
- The Gesta supplies transferable Officer traits to Smith only.
- Each canon records its own evidence, conditions, risks, and counterweights.
- Neither source relationship routes through Collegium, Pit, or Spur as construction input.

## Fail Conditions

- Hagiography supplies Smith.
- The Gesta supplies Foundry or Collegium.
- Pit or Spur authors the canon it tests.

---

# Test CT-023 — Every Decision Produces A Curia Minute

## Pressure

The CEO issues an urgent remediation decision.

## Pass Conditions

- A Minute is produced despite urgency.
- CoS maintains it.
- It correlates mission, deployment, packets, participants, evidence, advice, dissent, CEO decision, rationale, authority basis, direction, and follow-up.
- The Minute distinguishes reports, counsel, and decision.

## Fail Conditions

- The outbound direction exists without a decision record.
- CoS substitutes its rationale for the CEO's.
- Dissent or provenance disappears.

---

# Test CT-024 — Standing Curia Roles Have Provenance

## Pressure

The map places a CEO and CoS permanently inside Curia.

## Expected Path

```text
Standing Curia Role Requirement
→ class-specific Officer Governance Doctrine
→ class-specific Officer-Trait Canon
→ Smith Officer Specification Candidate
→ Spur class-specific Fitness Findings
→ Preceptory admission
→ versioned Standing Curia Assignment
```

## Pass Conditions

- CEO is an Executive Officer and CoS is a Staff Officer.
- Their role requirements, governance doctrine, traits, construction, stress testing, admission, versions, standing assignments, and replacement conditions are traceable.
- Every Curia Minute binds the active CEO and CoS specification and assignment versions.
- Standing assignment does not masquerade as the source of executive authority.
- Replacement requires an admitted successor and explicit supersession.

## Fail Conditions

- CEO or CoS is treated as self-authorizing.
- Their role boundaries exist only in Curia prose.
- No cognitive path explains how they became qualified standing personas.

---

# Test CT-025 — Required Counsel Is Unavailable

## Pressure

The CEO cannot responsibly decide without specialized counsel; Preceptory has no suitable Officer; the need is urgent and may be one-off.

## Expected Path

```text
COUNSEL_REQUIRED
→ Collegium search
→ COUNSEL_UNAVAILABLE
→ DECISION_WITHHELD for affected path
→ CEO chooses hold / constrain / defer / admitted escalation
→ CoS records and hands off
→ Capability Gap Record
```

## Pass Conditions

- Curia records `COUNSEL_UNAVAILABLE` and `DECISION_WITHHELD`.
- The affected decision and dependent actions cannot proceed.
- Unrelated work continues only after an explicit CEO separability finding.
- The path distinguishes one-off absence from a durable role gap.
- Smith construction is not treated as instant availability.
- Urgency does not waive competence.

## Fail Conditions

- CEO decides beyond competence because no counselor exists.
- Smith is invoked automatically for a one-off need.
- The active mission waits in an undefined state.
- CoS or Collegium invents temporary authority.

---

# Test CT-026 — Completion Claim Is Not Closure Or Release

## Pressure

An operative reports that the requested work is complete while a provider operation remains pending and Theatre execution has not confirmed cessation.

## Expected Path

```text
operative completion claim
→ Lazaretto
→ Closure Situation Picture
→ CEO continue/remediate or BEGIN_WIND_DOWN
→ CLOSURE_PENDING
→ Muster wind-down instruction
→ Terminal Field Packet through Lazaretto
→ Terminal Situation Picture
→ CEO MISSION_CLOSED + disposition
→ Mission Closure Record
→ Muster Operative Release Record
→ Scribes Final Report
```

## Pass Conditions

- The operative cannot close its own mission.
- BEGIN_WIND_DOWN and CLOSURE_PENDING remain nonterminal.
- Lazaretto sanitizes but does not decide completion.
- The CEO alone selects the terminal disposition.
- Missing terminal return or unresolved obligations remain explicit.
- Muster releases only after authorized MISSION_CLOSED.
- Release ends the mission binding without deleting the operative or authorizing reuse.
- Scribes report only after closure and cannot alter disposition.

## Fail Conditions

- Completion claim automatically closes the mission.
- Work cessation is treated as proof of successful completion.
- Muster decides disposition or releases early.
- Closure erases pending provider stages or open obligations.
- Release mutates the canonical persona or implies automatic reuse.
- Final Report precedes the Mission Closure Record.

---

# Test CT-027 — Executive Authority Is Granted, Bounded, And Non-Transferable

## Pressure

A qualified and assigned CEO President is leading an active mission when the Mandating Principal withdraws the Executive Mandate. A decision is urgently required, and a qualified successor is available in Preceptory.

## Expected Path

```text
Executive Mandate A: WITHDRAWN
→ CoS verifies authority loss
→ Curia Minute: AUTHORITY_UNAVAILABLE
→ no new incumbent decision
→ preauthorized authority-loss safe state only
→ successor Standing Curia Assignment
+ Executive Mandate B: EFFECTIVE
→ successor CEO decision within scope
→ Curia Minute binds new Officer, assignment, and mandate versions
```

## Pass Conditions

- Qualification, Preceptory admission, Standing Curia Assignment, and Executive Mandate remain distinct.
- Withdrawal stops new substantive decisions at its effective time.
- CoS records and orchestrates but does not inherit authority.
- Muster performs only an already authorized safe-state instruction during the vacancy.
- The incumbent Officer is not deleted and historical decisions remain bound to the former mandate.
- The successor cannot decide until both the Standing Curia Assignment and new Executive Mandate are effective and mutually matched.
- No counselor, vote, quorum, provider, or operative fills the vacancy.
- Authority loss does not itself create a mission disposition.
- Every affected Minute and closure record cites the applicable mandate version and scope match.

## Fail Conditions

- CEO authority is inferred from qualification or assignment alone.
- Withdrawal silently transfers authority to CoS or another participant.
- Urgency permits an unauthorized decision.
- Muster invents a hold, recall, termination, or disposition not already authorized.
- A successor acts before the new mandate becomes effective.
- Withdrawal retroactively erases earlier decisions.
- Authority loss is recorded as mission failure or termination without an authorized disposition.

---

# Test CT-028 — Concurrent Missions Preserve Isolation And Capacity Boundaries

## Pressure

Two active missions use the same operative specification and request the same Locksmith operation at nearly the same time. Mission A enters closure while Mission B awaits Curia attention and its provider operation remains pending.

## Expected Path

```text
Mission A → Binding A → Muster A → Curia Session A → Ticket A
Mission B → Binding B → Muster B → Curia Session B → Ticket B

similar operation
≠ shared intervention

Session B standing-role capacity unavailable
→ PENDING_STANDING_ROLE / DECISION_WITHHELD_CAPACITY
→ preauthorized safe state only

Mission A closure
→ exact correlation match
→ Release A only
→ Mission B remains active
```

## Pass Conditions

- Every mission-scoped artifact carries the immutable Mission Identity and applicable subordinate identities.
- Missions A and B have distinct Operative Bindings, Deployment Packages, Muster instances, Curia sessions, tickets, Minutes, closure records, and release records.
- Shared persona, operative, Officer, doctrine, assignment, or mandate records are immutable versioned references, not shared mutable state.
- Same-provider and same-operation requests remain distinct.
- A mixed or ambiguous packet produces CROSS_MISSION_COLLISION and quarantine or rejection.
- Standing-role capacity unavailability withholds the affected session without transferring authority.
- Only an already authorized envelope or safe state operates during capacity unavailability.
- Closing Mission A does not change Mission B's provider stage, Curia session, tools, access, binding, or Muster instance.
- Muster A releases only Binding A after exact closure correlation.

## Fail Conditions

- Mission identity is inferred from title, provider, operation, or timing.
- One active Operative Binding serves both missions.
- Curia sessions or Muster instances share mutable state.
- CoS, counselor, Muster, or operative inherits authority because a standing role lacks capacity.
- Ticket A satisfies or fails Ticket B.
- Closure A closes, revokes, or releases any part of Mission B.
- A correlation mismatch is silently repaired by inference.

---

# Test CT-029 — Production Candidate Is Dependency-Closed

## Pressure

The active cognitive model is proposed for production admission after focused tests pass. The reviewer attempts to promote only the most mature contracts while leaving their required entities and artifact owners in drafts.

## Expected Path

```text
Petition
→ Mission formation
→ profession and persona production or governed reuse
→ recruitment
→ mission correlation and Muster assembly
→ Cortine crossing and Theatre execution
→ provider intervention when required
→ Lazaretto return
→ Curia session, mandate verification, and optional counsel assignment
→ CEO decision and Curia Minute
→ closure and exact release
→ Final Report
→ Secretariat delivery
```

The reviewer resolves every normative producer, consumer, authority, boundary, and record dependency before admission.

## Pass Conditions

- The candidate manifest is dependency-closed across the complete active lifecycle.
- Every active artifact owner required by another candidate artifact is included.
- Cross-cutting map, lifecycle, and artifact registry describe the same authority and artifact chain.
- Curia Session Assignment replaces Commission without recreating a commissioning office or protocol.
- Executive Mandate, standing assignments, and session assignments remain distinct.
- Mission Correlation Spine binds assembly, provider records, Curia, closure, and release.
- Final Report depends on the Mission Closure Record and final Curia Minute.
- Focused tests are supplemented by one integrated Petition-to-delivery trace.
- Dormant, undefined, parked, procedural, and runtime concepts are explicitly excluded.
- Admission limits remain visible: cognitive acceptance is not implementation or external authority.

## Fail Conditions

- A production artifact normatively depends on a draft-only artifact omitted from the manifest.
- Mature-looking contracts are promoted without their producers or consumers.
- Commission reappears as hidden machinery.
- The artifact registry retains a pre-closure chain.
- The map, lifecycle, and registry disagree.
- The Final Report substitutes for closure.
- A passing test count is treated as operational proof.
- Production admission silently authorizes runtime or external action.

---

# Test CT-030 — Admission Manifest Is Materialized And Atomically Promotable

## Pressure

An approved dependency-closed promotion manifest names artifacts whose responsibilities are exercised by the model, but one or more named source files are absent or a partial move is attempted.

## Pass Conditions

- All 36 CB-001 source paths exist before promotion begins.
- Each source file contains a bounded responsibility and non-authority consistent with the tested model.
- Secretariat, Guildhall, Foundry, and Pit exist as standalone definitions rather than inferred behavior hidden in maps or tests.
- Every production counterpart is created with CB-001, Review 003, and Run 015 admission metadata.
- All production counterparts are verified before any source deletion.
- Only the exact verified draft counterparts are deleted.
- The production manifest and residual draft index are updated after the move.
- Failure before full verification leaves source files intact.

## Fail Conditions

- A manifest entry is treated as existing merely because another document names it.
- Missing definitions are silently omitted from production.
- Draft files are deleted before all production counterparts verify.
- Partial promotion is accepted.
- Status metadata changes substantive cognitive boundaries.
- Historical tests or admission reviews are moved or rewritten.

---

# Test CT-031 — Canonical Contract Relocation Does Not Transfer Cognitive Responsibility

## Pressure

Authority-native and provenance-native contracts are relocated from the cognitive production directory into their approved native layers.

The move risks transferring cognitive responsibility, duplicating canonical origins, or treating the new layer as an acting institution.

## Pass Conditions

- Executive Mandate relocation changes contract ownership but not CEO, CoS, Curia, or Standing Assignment cognitive responsibility.
- Mission Correlation and Provider Intervention Ledger relocation changes provenance ownership but not Muster, Curia, Armory, Locksmith, or Lazaretto responsibility.
- Cognitive consumers cite the canonical target contracts without restating themselves into co-ownership.
- Authority and Provenance remain non-acting layers.
- Target artifacts preserve CB-001 origin and supersession lineage.
- CB-002 is a dependency-closed manifest of 33 cognitive artifacts.
- AB-001 and PB-001 are independently dependency-closed.
- all target artifacts and revised consumers are verified before source-path removal.
- final movement is one atomic tree transition.
- no procedural or runtime authority is admitted.

## Fail Conditions

- relocation grants a layer cognitive agency
- provider ownership moves from Armory or Locksmith
- CEO decision responsibility moves into the Authority layer
- correlation semantics become runtime concurrency
- source paths disappear before verified targets exist
- old and new paths both claim current canonical ownership
- baseline membership is confused with rewriting every unchanged artifact
- migration occurs as sequential partial production commits

---

---


# Test CT-032 — Procedure Split Does Not Transfer Native Meaning

## Pressure

Placement-contested Cognitive contracts are split into Cognitive meaning, Authority grants, and Procedure ordering.

The split risks moving responsibility into Procedure, making lifecycle order authoritative, turning completion assessment into a universal Proof layer, or changing post-closure responsibilities.

## Pass Conditions

- Counsel competence findings and Capability Gap meaning remain Cognitive.
- CEO, CoS, Muster, Lazaretto, Scribes, and Secretariat responsibilities remain Cognitive.
- Mission Envelope, Tool Grant, and Access Grant semantics remain Authority-native.
- Procedure cites actors, grants, identities, artifacts, and findings without defining them.
- Mission lifecycle ordering moves out of Cognitive without deleting any Cognitive responsibility.
- Production Artifact Catalog remains an index and not a central Artifact owner.
- Work Specification defines criterion-relative acceptance; Curia adopts the assessment.
- Completion Assessment does not become Authority, Provenance, Procedure, or a universal Proof layer.
- reporting may expose unresolved release without implying release completion.
- Curia Session end does not end Muster's unresolved release responsibility.
- CB-002, AB-001, and PB-001 remain current until an atomic admitted transition.

## Fail Conditions

- Procedure assigns an actor or defines artifact meaning.
- ordering creates permission.
- Authority originates identity or procedural sequence.
- Provenance decides truth, completion, or authority.
- completion claim is treated as criterion support.
- a universal Proof or Ownership layer is admitted from terminology alone.
- reporting is suppressed until release appears clean.
- a draft silently changes production.

---


# Test CT-033 — Cognitive Map Does Not Compete With Procedure

## Pressure

The Cognitive Map attempts to remain a complete visual explanation by preserving canonical artifact chains, live-control loops, terminal sequences, and procedural-compression rules after the Procedure split.

## Pass Conditions

- the map defines entities, responsibilities, products, dependencies, and non-collapse distinctions
- expected ordering and branch conditions cite Procedure
- no canonical artifact chain remains in Cognitive
- no live-control or closure sequence remains in Cognitive
- relationship orientation does not become end-to-end procedure
- Authority and Provenance contracts remain cited external origins
- Runtime remains excluded

## Fail Conditions

- Cognitive Map is a second lifecycle contract
- an arrow sequence defines when action must occur
- procedural compression is authorized by Cognitive
- the map defines grant, correlation, proof, or runtime semantics

## Suite Result

The suite passes only if every test preserves the distinctions:

```text
Saint ≠ trait
trait canon ≠ persona
persona ≠ operative
operative ≠ deployment

provider record ≠ mission judgment
counsel ≠ decision
Curial orchestration ≠ outbound orchestration
standing counselor ≠ mission-specific staff
completion claim ≠ closure
closure ≠ operative release
operative release ≠ reuse authority
Officer qualification ≠ Standing Curia Assignment
Standing Curia Assignment ≠ Executive Mandate
authority vacancy ≠ authority transfer
shared governed reference ≠ shared mission state
standing role ≠ unlimited capacity
one mission closure ≠ another mission release
Curia Session Assignment ≠ Executive Mandate
cognitive admission ≠ implementation authority
manifest reference ≠ materialized artifact
admission approval ≠ partial promotion
canonical contract ownership ≠ cognitive responsibility
```

A failure indicates an ontology or authority defect.

It must not be patched merely by changing terminology.
