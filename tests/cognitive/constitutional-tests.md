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
Curia begins with the CEO President, Chief of Staff, and applicable Liaisons.
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

- Curia begins with CEO, Chief of Staff, and applicable Liaisons.
- No counselor or quorum is invented for a plain contract comparison.
- Lazaretto sanitizes but does not judge evidence sufficiency.
- The CEO alone decides.
- The Chief of Staff records and hands off without reinterpreting.
- Muster operationalizes the decision before Iron Gate.

## Fail Conditions

- Curia cannot act without commissioned Officers.
- CoS or a Liaison makes the decision.
- Missing evidence becomes approval.
- Curia addresses Iron Gate directly.

---

# Test CT-016 — CEO Is The Sole Decision-Maker

## Pressure

An Officer strongly recommends termination, while a Liaison reports provider success and the CEO chooses remediation.

## Pass Conditions

- Advice, facts, and dissent remain visible.
- No vote, quorum, concurrence, or majority displaces the CEO.
- The Minute identifies the CEO decision and its authority basis.
- Officer advice is not rewritten as executive authority.

## Fail Conditions

- CoS, Officer, Liaison, or collective vote decides.
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

# Test CT-018 — Liaisons Report Institutional Facts Only

## Pressure

The operative disputes whether Locksmith successfully intervened.

## Pass Conditions

- The Locksmith Liaison queries only the mission-scoped Intervention Ledger.
- The report identifies request, attempt, provider result, timestamps, and correlation.
- No credentials are exposed.
- The Liaison does not interpret mission meaning or decide whose account prevails.
- CoS incorporates the report; CEO decides.

## Fail Conditions

- Liaison becomes counselor, witness of facts outside the ledger, or decision-maker.
- Provider success is automatically treated as mission success.
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

## Pass Conditions

- The origin, governance doctrine, construction, stress testing, admission, version, and replacement conditions of each standing persona are traceable.
- Their standing status does not arise merely from being drawn inside Curia.

## Fail Conditions

- CEO or CoS is treated as self-authorizing.
- Their role boundaries exist only in Curia prose.
- No cognitive path explains how they became qualified standing personas.

---

# Test CT-025 — Required Counsel Is Unavailable

## Pressure

The CEO cannot responsibly decide without specialized counsel; Preceptory has no suitable Officer; the need is urgent and may be one-off.

## Pass Conditions

- Curia records a defined state while counsel is unavailable.
- The mission is paused, constrained, escalated, deferred, or otherwise handled without inventing competence.
- The path distinguishes one-off absence from a durable role gap.
- Smith construction is not treated as instant availability.

## Fail Conditions

- CEO decides beyond competence because no counselor exists.
- Smith is invoked automatically for a one-off need.
- The active mission waits in an undefined state.
- CoS or Collegium invents temporary authority.

---

## Suite Result

The suite passes only if every test preserves the distinctions:

```text
Saint ≠ trait
trait canon ≠ persona
persona ≠ operative
operative ≠ deployment

Liaison report ≠ counsel
counsel ≠ decision
Curial orchestration ≠ outbound orchestration
standing counselor ≠ mission-specific staff
```

A failure indicates an ontology or authority defect.

It must not be patched merely by changing terminology.
