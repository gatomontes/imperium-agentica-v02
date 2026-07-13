# Next Steps

## Status

Operational queue.

This file is not doctrine.

This file is not a roadmap.

This file is not architecture.

It is an ordered list of candidate next actions.

Steps may be reordered, removed, demoted, promoted, replaced, or moved into `current-step.md` as evidence changes.

When a step becomes active, remove it from this file and place it in `current-step.md`.

Do not duplicate active work across both files.

---

## Queue

### 1. Test Petition as Imperium point of entry

Reason:
`drafts/petition-lifecycle.md` proposes Petition as the provisional operator-facing point of entry. This should be tested before adding production machinery, routing logic, or Work Order mechanics.

Relevant files:

- `README.md`
- `current-step.md`
- `drafts/petition-lifecycle.md`
- `drafts/mayos-governance.md`
- `drafts/mgov-builder-persona.md`
- `drafts/mgov-reviewer-persona.md`

Promotion condition:
This becomes current when the operator provides or approves a real request to shape into a Petition.

Removal or demotion condition:
Remove or demote this step if Petition proves ceremonial, too vague, or less useful than a simpler intake form.

---

### 2. Define minimal Work Order conversion

Reason:
A Petition is not production. If a Petition is marked doable, Imperium needs a small boundary for converting it into a Work Order without overbuilding the production line.

Relevant files:

- `drafts/petition-lifecycle.md`

Promotion condition:
This becomes current after at least one Petition is marked doable or after testing shows that Work Order conversion is the next missing boundary.

Removal or demotion condition:
Remove or demote this step if Petition testing shows Work Order conversion is premature or unnecessary.

---

### 3. Define Reviewer output shape

Reason:
The MGov Reviewer has criteria and outcomes, but its final review report shape remains implied. This creates role drift when ordinary answers accidentally perform reviewer work without a governed review output.

Relevant files:

- `drafts/mgov-reviewer-persona.md`
- `drafts/mgov-builder-persona.md`
- `drafts/mayos-governance-persona.md`

Promotion condition:
This becomes current when the Reviewer is used to evaluate a Petition, Builder artifact, Work Order boundary, or other draft.

Removal or demotion condition:
Remove or demote this step if reviewer output remains understandable without a formal output shape.

---

### 4. Review whether Mayo's Governance should remain draft-bound or become provisionally usable posture

Reason:
Mayo's Governance now has parent, builder, and reviewer personas, and has been used to guide multiple drafts. It may be ready to mark as provisionally usable posture while remaining non-runtime and non-architectural.

Relevant files:

- `drafts/mayos-governance.md`
- `drafts/mayos-governance-persona.md`
- `drafts/mgov-builder-persona.md`
- `drafts/mgov-reviewer-persona.md`

Promotion condition:
This becomes current if the operator asks to promote, canonize, simplify, or freeze MGov posture.

Removal or demotion condition:
Remove or demote this step if MGov remains intentionally draft-bound until more Imperium-level artifacts are produced.

---

### 5. Decide whether `Mayo's Governance` needs canonical terminology

Reason:
The term has become recurring across multiple documents. Canonical terminology may be useful if uncontrolled interpretation creates ambiguity, especially around the distinction between MGov posture and Imperium architecture.

Relevant files:

- `drafts/mayos-governance.md`
- `drafts/mayos-governance-persona.md`
- `drafts/terminology.md`

Promotion condition:
This becomes current if an LLM session misinterprets Mayo's Governance as Imperium runtime architecture or if references become hard to track.

Removal or demotion condition:
Remove or demote this step if the term remains understandable without canonical control.

---

### 6. Review whether `drafts/governance.md` remains too noun-heavy

Reason:
The governance draft itself identifies noun-heaviness and premature scope language as remaining risks.

Relevant files:

- `drafts/governance.md`

Promotion condition:
This becomes current after the governance draft is used at least once, or if confusion appears before use.

Removal or demotion condition:
Remove or demote this step if the draft is deleted, superseded, or proves clear enough through use.

---

### 7. Decide whether progress tracking needs revision after first use

Reason:
`current-step.md` and `next-steps.md` are operational continuity surfaces. Their usefulness is unproven until a step moves between them.

Relevant files:

- `current-step.md`
- `next-steps.md`
- `README.md`

Promotion condition:
This becomes current after the first step is moved from `next-steps.md` into `current-step.md` and completed, revised, returned, or deleted.

Removal or demotion condition:
Remove or demote this step if progress tracking creates ceremony without improving LLM continuity.
