# Mission Closure And Operative Release Procedure

## Status

Draft Procedure extracted from CB-002 Mission Closure And Operative Release Contract.

Not admitted.

Admission is blocked by unadmitted Authority refinements and the unresolved completion-proof origin.

## Native Dependencies

### Cognitive

- closure meanings and responsibilities: `layers/cognitive/drafts/mission-closure-and-release-contract.md`
- Curia: `layers/cognitive/production/curia.md`
- Muster: `layers/cognitive/production/muster.md`
- Lazaretto: `layers/cognitive/production/lazaretto.md`
- Theatre: `layers/cognitive/production/theatre.md`
- Chamber of Scribes: `layers/cognitive/production/chamber-of-scribes.md`
- Secretariat: `layers/cognitive/production/secretariat.md`

### Authority

- AB-001: `layers/authority/production/`
- Executive Mandate: `layers/authority/production/executive-mandate.md`
- Mission Envelope candidate: `layers/authority/drafts/mission-envelope.md`

### Provenance

- mission exact-match rules: `layers/provenance/production/mission-correlation-and-isolation-contract.md`
- provider observations: `layers/provenance/production/provider-intervention-ledgers.md`

### Proof

No admitted native contract currently supplies completion-criteria sufficiency.

## Entry Conditions

A closure assessment may be requested after any externally recorded condition such as:

- operative completion claim
- candidate completion-criteria finding
- inability or lack of justification to continue
- authorized recall or termination proposal
- mission-authority loss

None of these conditions is itself closure.

## Required External Inputs

Before substantive closure assessment, require:

- exact mission, deployment, operative binding, Muster Instance, and Curia Session match under PB-001
- current Work Specification and completion criteria
- current sanitized mission and provider observations
- open counsel needs, withheld decisions, obligations, and uncertainty
- applicable Executive Mandate finding
- applicable Mission Envelope finding
- completion-support finding from a future native Proof or artifact-relative assurance contract

## Expected Sequence

### 1. Assessment Branch

1. Assemble the Closure Situation Picture through the cited CoS responsibility.
2. Request a competent CEO decision.
3. Branch:
   - continue or remediate → return to the admitted live-mission procedure
   - `BEGIN_WIND_DOWN` authorized → continue below
   - authority or competence unavailable → withhold and follow the cited safe-state or counsel procedure

### 2. Wind-Down

1. Record the authorized `BEGIN_WIND_DOWN` decision.
2. Hand the exact instruction to Muster.
3. Muster issues only the instruction permitted by the cited Mission Envelope.
4. Await a matching Terminal Field Packet through Theatre and Lazaretto.
5. If no packet can be obtained, preserve explicit absence and its reason; do not infer cessation or completion.

### 3. Terminal Assessment

1. Assemble the Terminal Situation Picture from cited artifacts and findings.
2. Require:
   - a matching effective Executive Mandate for the CEO decision
   - Mission Envelope authority for `TERMINAL_DISPOSITION`
   - PB-001 exact-match findings
   - an externally supplied completion-support finding
3. Branch:
   - return for more work → resume only through an authorized instruction
   - closure withheld → preserve the reason and applicable safe state
   - `MISSION_CLOSED` authorized → record exactly one terminal disposition

### 4. Closure Record

After an authorized closure decision:

1. create the Mission Closure Record defined by the Cognitive split contract
2. preserve the final Curia Minute and all cited authority, provenance, evidence, dissent, and unresolved matters
3. do not treat record creation as operative release

### 5. Release

Proceed only when:

```text
MISSION_CLOSED
+ effective RELEASE_MISSION_BINDING authority
+ exact PB-001 identity match
+ explicit release instruction
```

Then:

1. Muster ends the named mission binding
2. coordinate mission-scoped tool and access disposition through the cited responsibilities
3. preserve unresolved provider operations and residual restrictions
4. create the Operative Release Record
5. do not infer reuse authority

### 6. Session End And Reporting

After the required closure and release conditions:

1. end mission-specific Advisory Session Assignments
2. close the mission-specific Curia Session
3. end the Muster Instance after its release responsibility is complete
4. preserve standing assignments
5. prepare the Final Report from the Closure Record, final Curia Minute, and cited evidence
6. deliver without altering substantive findings

## Missing-Return Branch

A missing Terminal Field Packet does not block every possible terminal disposition.

It remains explicit, and closure may continue only when:

- Authority permits the exact disposition without the packet
- the proof or assurance contract permits a finding with recorded absence
- uncertainty and unresolved consequences remain preserved

This procedure does not supply either permission.

## Prohibited Procedural Inference

- completion claim → completion proved
- work stopped → mission closed
- mission closed → operative released
- operative released → reusable
- authority loss → terminal disposition
- similar identity → exact mission match
- provider completion → mission success
- elapsed time → closure
- missing return → clean cessation

## Runtime Boundary

This procedure defines expected ordering and conditions only. It does not define queues, schedulers, timers, services, storage, state-machine implementation, retries, or execution.
