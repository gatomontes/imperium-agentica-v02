# Constitutional Test Run 001

## Run Record

```text
Suite: drafts2/constitutional-tests.md
Mode: Theoretical doctrine simulation
Repository ref: 9199c7fd7611fef14acd2a89bf67be930e1ea29d
Run date: 2026-07-15
Result: FAIL
Passed: 1
Failed: 11
```

This run evaluates the current doctrine as a whole. Entity drafts and official integration artifacts are both active inputs. A test therefore fails when an entity file expresses the correct boundary but the official cognitive map or artifact map still expresses the superseded ontology.

No runtime behavior, implementation, or automated execution is claimed.

## Sources Examined

- `drafts2/castellan.md`
- `drafts2/guildhall.md`
- `drafts2/studium.md`
- `drafts2/hagiography.md`
- `drafts2/foundry.md`
- `drafts2/pit.md`
- `drafts2/garrison.md`
- `drafts2/conscription.md`
- `drafts2/catapult.md`
- `drafts2/cognitive-map.md`
- `drafts2/README.md`

## Executive Finding

The new entity drafts largely preserve the intended persona-to-operative boundaries. The official integration layer does not.

`drafts2/cognitive-map.md` and substantial portions of `drafts2/README.md` still encode the retired model:

```text
Conscription = operative orchestration
Citadel = operative governance
Foundry builds operatives
Pit tests operatives
Garrison holds operatives
Conscription precedes Guildhall
```

They omit Hagiography and Studium from the active spine and collapse persona production into operative production. Because `cognitive-map.md` declares itself the current official map, its contradictions are constitutional failures rather than harmless stale wording.

# Results

## CT-001 — Profession Before Persona

**Verdict: FAIL**

Entity-level behavior is correct: Castellan produces an approved Work Specification, Guildhall determines the profession, and Foundry requires a Profession Specification.

The official cognitive spine instead routes `Castellan → Conscription ↔ Guildhall`, placing recruitment before the profession decision and preserving Conscription as operative-supply coordination.

**Failed invariant:** Guildhall specifies the profession before persona construction or recruitment.

**Required correction:** Route the Work Specification from Castellan to Guildhall before persona selection, construction, or recruitment.

## CT-002 — Doctrine Is Not Forged by Foundry

**Verdict: FAIL**

Entity-level behavior is correct: Studium produces Persona Governance Doctrine and Foundry embodies it without authoring it.

The official map still routes `Foundry ↔ Citadel` and omits Studium.

**Failed invariant:** Studium authors Persona Governance Doctrine.

**Required correction:** Replace Citadel with Studium throughout the official map, layer descriptions, primary doctrinal lines, and artifact map.

## CT-003 — Saints Are Evidence, Not Templates

**Verdict: FAIL**

Hagiography correctly treats Saints as evidentiary sources, rejects reputation as proof, extracts bounded transferable traits, records liabilities and conflicting evidence, and prohibits impersonation. Foundry correctly consumes the Human-Trait Canon.

Hagiography and the Human-Trait Canon do not appear in the official cognitive spine or product flow. The official flow can therefore reach Foundry without the artifact this test requires.

**Failed invariant:** Hagiography canonizes evidenced, transferable traits before Foundry embodies them.

**Required correction:** Add Hagiography and Human-Trait Canon to the official production path.

## CT-004 — Foundry Produces a Persona, Not an Operative

**Verdict: FAIL**

Foundry correctly produces a portable Persona Specification Candidate and rejects platform packaging, credentials, recruitment, deployment, and self-admission.

The official map calls Foundry “operative building,” and the README says “Foundry builds operatives.”

**Failed invariant:** Foundry forges canonical personas, not operatives.

**Required correction:** Replace every official operative-building description of Foundry and update the product flow.

## CT-005 — Pit Tests the Whole Persona

**Verdict: FAIL**

Pit correctly tests profession fit, governance under pressure, evidence behavior, inherited traits, and integrated persona coherence. It returns findings without admitting the candidate.

The official map calls Pit an operative stress test and routes it through the obsolete Foundry–Citadel operative-production path.

**Failed invariant:** Pit tests the integrated Persona Specification Candidate before Garrison admission.

**Required correction:** Make the official map show Pit receiving the persona candidate and its Guildhall, Studium, and Hagiography inputs.

## CT-006 — Garrison Holds Personas

**Verdict: FAIL**

Garrison correctly holds admitted canonical personas, preserves profession/doctrine/trait/test/revision references, and prohibits recruitment and deployment.

The official map and README call Garrison an admitted operative roster, and the product flow moves from tested operative to admitted operative.

**Failed invariant:** Garrison holds admitted canonical personas.

**Required correction:** Rewrite official Garrison references around persona inventory.

## CT-007 — Conscription Is Recruitment

**Verdict: FAIL**

Conscription correctly selects an admitted persona, converts it into a medium-specific operative, preserves profession/doctrine/traits, records deviations, refuses incompatible transformations, and does not deploy.

The official map still defines `Conscription = operative orchestration` and assigns it search, Guildhall consultation, and Foundry commissioning before persona production.

**Failed invariant:** Conscription is the transformation `persona → deployment-medium-specific operative`.

**Required correction:** Remove Conscription from persona-supply orchestration and place it only after Garrison selection and before Catapult.

## CT-008 — Medium Cannot Preserve Doctrine

**Verdict: FAIL**

Conscription correctly requires refusal when a medium cannot preserve required behavior.

The official map does not place Conscription at the transformation boundary. Under the official spine, it operates before the persona exists, so no coherent point exists at which medium fidelity can be evaluated.

**Failed invariant:** Recruitment refuses when it cannot preserve the admitted persona.

**Required correction:** Correct Conscription’s official location and responsibility; retain its existing refusal rule.

## CT-009 — Operative Is Not Deployment

**Verdict: FAIL**

Conscription correctly distinguishes operative production from deployment and permits handoff to the operator. Catapult correctly builds a mission-specific Deployment Package.

The official map routes Garrison directly into “deployment activation” while treating Garrison inventory as operatives. Castellan also refers to an “activated operative,” although no separate activation state is defined.

**Failed invariant:** Operative existence does not imply activation or deployment.

**Required correction:** Use the defined states `admitted persona → recruited operative → deployed operative`, or explicitly define activation.

## CT-010 — Catapult Deploys; It Does Not Recruit

**Verdict: PASS**

Given a valid operative and authorized mission requirements, Catapult receives the operative from Conscription, preserves provenance, obtains intelligence/tools/credentials through the proper authorities, assembles the Deployment Package, and launches only when conditions are satisfied.

Catapult explicitly prohibits persona forging, doctrine or trait alteration, duplication of Conscription’s platform transformation, unauthorized tools or credentials, and fabricated mission research.

The surrounding map contains stale upstream terminology, but Catapult’s own boundary remains coherent.

## CT-011 — Trivial Construction Does Not Erase Artifacts

**Verdict: FAIL**

Foundry recognizes trivial construction only as a failure signal: `persona construction proves too trivial to justify a separate Foundry`.

No doctrine defines how work may be compressed while preserving Guildhall’s profession decision, Studium’s doctrine decision, Hagiography’s trait decision, and an identifiable canonical persona before Conscription.

**Failed invariant:** Procedural compression must not become authority or artifact collapse.

**Required correction:** Define a minimal cognitive-fitting path that preserves artifact ownership even when several operations are performed together or Foundry work is trivial.

## CT-012 — Traceability Across Transformation

**Verdict: FAIL**

Garrison names the necessary profession, doctrine, trait, test, revision, and prior-operative references. Catapult includes a persona reference. Hagiography permits refinement and decanonization.

The drafts do not explicitly guarantee the complete chain:

```text
Deployment
→ Operative version
→ Canonical Persona version
→ Pit Findings
→ Human-Trait Canon version
→ Saint evidence
```

They also do not define whether existing operatives remain bound to their original persona/canon version or must be re-conscripted after revision.

**Failed invariant:** Every deployed behavior must be traceable to the exact operative and canonical inputs that produced it.

**Required correction:** Define immutable identifiers/version references and supersession/re-conscription behavior.

# Aggregate Result

| Test | Verdict | Primary reason |
|---|---|---|
| CT-001 | FAIL | Official spine routes Conscription before Guildhall |
| CT-002 | FAIL | Official map still assigns doctrine to Citadel |
| CT-003 | FAIL | Hagiography absent from official production path |
| CT-004 | FAIL | Official map says Foundry builds operatives |
| CT-005 | FAIL | Official map says Pit tests operatives |
| CT-006 | FAIL | Official map says Garrison holds operatives |
| CT-007 | FAIL | Official map retains Conscription as orchestration |
| CT-008 | FAIL | Recruitment transformation is misplaced |
| CT-009 | FAIL | Operative, activation, and deployment remain blurred |
| CT-010 | PASS | Catapult’s deployment boundary is coherent |
| CT-011 | FAIL | No doctrine for safe procedural compression |
| CT-012 | FAIL | End-to-end version traceability is undefined |

# Defect Clusters

## D-001 — Official Map Drift

**Severity: Constitutional**

Affected: CT-001 through CT-009.

The official cognitive map and README still encode the superseded ontology. This is the dominant failure. Individual entity drafts cannot collectively pass while the declared official map contradicts them.

## D-002 — Minimal Cognitive-Fitting Path Undefined

**Severity: Structural**

Affected: CT-011.

The doctrine recognizes that Foundry work may be trivial but does not define safe compression without collapsing authority or artifacts.

## D-003 — Versioned Provenance Undefined

**Severity: Structural**

Affected: CT-012.

The necessary references are named, but the immutable chain and supersession behavior are not yet defined.

# Final Judgment

```text
SUITE FAILED
```

The repository is split between new entity doctrine and old official integration doctrine.

Next correction targets:

1. `drafts2/cognitive-map.md`
2. `drafts2/README.md`
3. lifecycle, production-artifact, roster, and search documents still encoding operative-before-persona assumptions

After normalization, rerun all twelve tests before adding new institutional machinery.
