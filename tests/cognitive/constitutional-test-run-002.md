# Constitutional Test Run 002

## Run Record

```text
Suite: layers/cognitive/drafts/constitutional-tests.md
Mode: Theoretical doctrine simulation
Repository ref: cec249dda0a3068645802ee9077bd7442702783e
Run date: 2026-07-15
Previous run: tests/cognitive/constitutional-test-run-001.md
Result: FAIL
Passed: 11
Failed: 1
```

This run follows normalization of:

- `layers/cognitive/drafts/cognitive-map.md`
- `layers/cognitive/drafts/README.md`

The same twelve constitutional scenarios were rerun against the current integrated doctrine.

No runtime behavior, implementation, or automated execution is claimed.

---

## Change Since Run 001

```text
Run 001: 1 PASS / 11 FAIL
Run 002: 11 PASS / 1 FAIL
```

The official integration layer now reflects:

- Guildhall before persona selection or construction
- Studium as steward of Persona Governance Doctrine
- Hagiography and Human-Trait Canon in the production path
- Foundry as canonical persona forge
- Pit as persona test surface
- Garrison as admitted persona inventory
- Conscription as recruitment
- Catapult as deployment
- explicit procedural compression rules
- explicit versioned provenance and re-conscription rules
- no admitted activation state

---

# Results

## CT-001 — Profession Before Persona

**Verdict: PASS**

The current official path is:

```text
Castellan
→ Work Specification
→ Guildhall
→ Profession Specification
→ Garrison search or persona construction
```

Foundry cannot begin from raw tone or operator wording, and Conscription no longer precedes the profession decision.

## CT-002 — Doctrine Is Not Forged by Foundry

**Verdict: PASS**

Studium is now present in the official spine and artifact chain as the author of Persona Governance Doctrine.

Foundry consumes and embodies doctrine but may only return ambiguity or conflict for Studium revision.

Citadel is explicitly excluded as the persona-governance steward.

## CT-003 — Saints Are Evidence, Not Templates

**Verdict: PASS**

Hagiography and Human-Trait Canon are present in the official production path.

The doctrine preserves:

```text
Saint
→ evidenced transferable trait
→ Human-Trait Canon
→ persona input
```

It prohibits whole-person import and requires an explicit Hagiography decision when no distinct trait canon is applicable.

## CT-004 — Foundry Produces a Persona, Not an Operative

**Verdict: PASS**

Foundry now produces a deployment-medium-agnostic Persona Specification Candidate.

The official map and README no longer describe Foundry as an operative builder.

Platform transformation remains a Conscription responsibility.

## CT-005 — Pit Tests the Whole Persona

**Verdict: PASS**

Pit receives the integrated persona candidate with Guildhall, Studium, and Hagiography inputs.

It tests professional competence, governance, and inherited traits, preserves failure evidence, and returns defects to their responsible sources.

Pit does not admit, recruit, or deploy.

## CT-006 — Garrison Holds Personas

**Verdict: PASS**

Garrison is now consistently defined as admitted canonical persona inventory.

Its state is distinct from operative and mission state.

The official reuse path searches for personas and sends selected personas to Conscription.

## CT-007 — Conscription Is Recruitment

**Verdict: PASS**

Conscription is no longer an orchestration layer.

Its official transformation is:

```text
Admitted Canonical Persona
+ deployment-medium contract
→ Operative
```

It preserves profession, doctrine, and traits, records deviations, refuses incompatible media, and does not deploy.

## CT-008 — Medium Cannot Preserve Doctrine

**Verdict: PASS**

Conscription now occupies the correct transformation boundary.

The official doctrine explicitly requires refusal when the selected medium cannot preserve required competence, doctrine, or traits.

A weakened package cannot be treated as an equivalent operative.

## CT-009 — Operative Is Not Deployment

**Verdict: FAIL**

The cognitive map and README now correctly define:

```text
admitted canonical persona
→ recruited operative
→ deployed operative
```

They explicitly state that no separate activation state is admitted.

However, `layers/cognitive/drafts/castellan.md` still contains:

```text
Catapult briefs and launches the activated operative.
```

No doctrine defines who activates, what activation produces, or how activation differs from recruitment or deployment.

### Failed Invariant

```text
Operative existence does not imply activation or deployment.
```

### Required Correction

Replace “activated operative” in `layers/cognitive/drafts/castellan.md` with “operative,” unless a distinct activation state is deliberately designed and admitted.

## CT-010 — Catapult Deploys; It Does Not Recruit

**Verdict: PASS**

Catapult accepts an existing operative, obtains intelligence, tools, and credentials through their authorities, assembles the Deployment Package, and launches under satisfied conditions.

It does not select or forge personas, recruit, alter doctrine, alter traits, or judge returns.

## CT-011 — Trivial Construction Does Not Erase Artifacts

**Verdict: PASS**

The official map now defines procedural compression.

Minimal cognitive fitting may combine operations or omit a separately operating Foundry agency only when these remain explicit:

- Guildhall profession decision
- Studium doctrine decision
- Hagiography trait-canon decision
- canonical persona specification
- separate Conscription transformation

Compression is explicitly defined as procedural economy, not authority transfer or artifact erasure.

## CT-012 — Traceability Across Transformation

**Verdict: PASS**

The official map and README now require the exact version chain:

```text
Deployment
→ Operative version
→ Canonical Persona version
→ Pit Findings version
→ Profession Specification version
→ Persona Governance Doctrine version
→ Human-Trait Canon version when applicable
→ Saint evidence
```

They also define:

- revision by new version or supersession
- no historical overwrite
- existing operatives remain bound to their source versions
- revised personas require a new Conscription event and operative version

This is a doctrinal pass. Implementation remains outside the admitted scope.

---

# Aggregate Result

| Test | Verdict | Change from Run 001 |
|---|---|---|
| CT-001 | PASS | Fixed by official path normalization |
| CT-002 | PASS | Studium replaced Citadel |
| CT-003 | PASS | Hagiography added to production path |
| CT-004 | PASS | Foundry now forges personas |
| CT-005 | PASS | Pit now tests personas |
| CT-006 | PASS | Garrison now holds personas |
| CT-007 | PASS | Conscription now performs recruitment |
| CT-008 | PASS | Medium-refusal boundary is correctly placed |
| CT-009 | FAIL | Residual “activated operative” in Castellan |
| CT-010 | PASS | Catapult boundary remains coherent |
| CT-011 | PASS | Procedural compression doctrine added |
| CT-012 | PASS | Versioned provenance doctrine added |

---

# Remaining Defect

## D-004 — Undefined Activation Residue

**Severity: Terminological / Ontological**

**Location:** `layers/cognitive/drafts/castellan.md`

**Text:**

```text
Catapult briefs and launches the activated operative.
```

**Conflict:**

The official cognitive map explicitly admits no separate activation state.

**Correction:**

```text
Catapult briefs and launches the operative.
```

---

# Final Judgment

```text
SUITE FAILED
11 PASS
1 FAIL
```

The original constitutional drift has been repaired in the map and README.

The suite is one textual correction away from a clean theoretical pass, assuming no additional activation language exists in other active doctrine.
