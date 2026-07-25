# Deliberations

## Purpose

`/deliberations` is Imperium's cross-layer record for external findings, internal deliberation, risk assessment, improvement programs, candidate controls, decisions, and implementation evidence.

It preserves continuous improvement without prematurely admitting a new layer, institution, semantic contract, Runtime mechanism, or external authority.

A file in this directory is not production semantics merely because it is recorded here.

## Required Reading Order

When work concerns risk, gaps, external findings, or continuous improvement, read:

1. `README.md` at repository root.
2. `current-step.md`.
3. `next-steps.md`.
4. `deliberations/README.md`.
5. `deliberations/registry.md`.
6. `deliberations/EC-CURRENT.md` and `deliberations/EC-DISPOSITION.md` when exemplar-grounding corrections are relevant.
7. The relevant risk record.
8. The relevant improvement program.
9. Related pending and implemented controls.
10. Related decision records.
11. Supporting assessments and sources.

Do not reconstruct a deliberation from chat history before reading these records.

## Artifact Classes

- `assessments/`: dated syntheses. They preserve what was concluded at a particular time.
- `sources/`: bounded descriptions and links for external material. They do not replace the source.
- `risks/`: individually maintained external or observed risk records.
- `programs/`: cross-cutting Imperium improvement programs serving one or more risks.
- `controls/pending/`: controls identified but not proven operational.
- `controls/implemented/`: controls with an actual operating mechanism and current verification evidence.
- `decisions/`: explicit conclusions, non-decisions, authority, and supersession conditions.
- `templates/`: minimum record contracts.

## Required Distinctions

```text
recorded ≠ admitted
conceptually addressed ≠ implemented
semantically admitted ≠ Runtime enforced
theoretical evidence ≠ operating evidence
implemented ≠ externally assured
concluded deliberation ≠ completed mitigation
```

Risks are not implemented. Controls are implemented.

Programs may remain active while individual controls move from pending to implemented.

## Risk Assessment Vocabulary

Use only the strongest status supported by current evidence:

- `UNASSESSED`
- `NOT_ADDRESSED`
- `CONCEPTUALLY_ADDRESSED`
- `SEMANTICALLY_ADMITTED`
- `THEORETICALLY_SUPPORTED`
- `RUNTIME_ENFORCED`
- `EXTERNALLY_ASSURED`

These labels identify evidence classes. They are not an automatic linear maturity ladder.

## Pending Controls

A pending control may be proposed, under deliberation, semantically admitted, theoretically supported, blocked, or approved for implementation.

Its record must state the exact condition. Location in `pending/` claims only that the need is tracked and no current operating-control claim has been proven.

## Implemented Controls

Promotion to `implemented/` requires:

- exact implementation target;
- responsible layer or component;
- observable enforcement behavior;
- expected failure behavior;
- verification evidence;
- applicable tests;
- limitations and residual uncertainty;
- version or commit reference;
- verification date.

A policy document, persona instruction, prompt boundary, architecture description, semantic admission, or theoretical test is insufficient by itself.

## Demotion and Invalidation

Implementation is current evidence, not permanent honor.

If drift, a provider change, failed verification, invalidated assumptions, or implementation removal defeats a control, preserve its prior implementation reference and move its current record to `pending/` with:

- invalidation evidence;
- reason for demotion;
- residual exposure;
- required revalidation.

Git history preserves movement. A decision record preserves consequential semantic change.

## Verifiable Language Discipline

Imperium-authored deliberation must use exact, verifiable claims rather than undefined evaluative labels.

A consequential claim records the subject, observed or alleged action or state, scope, evidence, provenance, verification method, uncertainty, contradicting evidence, and revision condition when applicable.

External language may be preserved in a title, bounded quotation, imported taxonomy, or historical record for source fidelity. It cannot become an Imperium finding until translated into operationally defined claims.

If translation cannot be made, preserve it as an attributed external assertion and mark the Imperium disposition unresolved.

Do not perform context-free word replacement. Correct the underlying semantic defect.

See `decisions/DR-007-verifiable-language-and-exact-claim-rule.md`.

## Deliberation Discipline

Every material record separates:

- confirmed facts;
- assumptions;
- open questions;
- blocked-by-missing-information items;
- proposals;
- conclusions;
- explicit non-claims;
- evidence;
- residual uncertainty.

Do not silently convert a proposal into a conclusion or a conclusion into authority.

Do not assign institutional ownership merely to fill a vacancy. Candidate ownership remains candidate until separately admitted.

## Conversation Preservation

Do not dump raw chat transcripts into the repository by default.

Distill meaningful sessions into dated artifacts that preserve:

- propositions considered;
- objections;
- distinctions discovered;
- conclusions;
- rejected alternatives;
- unresolved questions;
- links to affected records.

Quotations needed as authorization or evidence must be bounded and attributed.

## Decisions and Supersession

A decision record states what was decided, what was not decided, supporting evidence, authorization, affected records, and supersession conditions.

Do not silently rewrite a consequential prior conclusion. Add a superseding decision and preserve traceability.

## Folder Promotion

Each risk, program, or control begins as one file. It earns a folder only when independent evidence, tests, proposals, or validations make the additional structure necessary.

No folder is inevitable.

## Continuity Boundary

Update `current-step.md` or `next-steps.md` only when deliberation work actually changes the active operational focus or queue.

Recording an external assessment does not by itself activate a leg, admit a layer, authorize implementation, or alter an existing merge gate.
