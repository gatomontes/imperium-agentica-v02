# Human-Trait Canon

## Status

Draft cognitive artifact. Not admitted. No real-person record is contained here.

## Purpose

The Human-Trait Canon is the bounded artifact through which Hagiography may preserve an EC-01-reviewed trait candidate for possible later use by Foundry.

It is not a biography, personality profile, Saint record, persona, Officer specification, or Operative.

## Admission Boundary

A Human-Trait Canon entry may be proposed only when EC-01 produces an `ADMISSIBLE FOR CANON REVIEW` or `CONDITIONAL / BOUNDED` disposition.

That disposition permits review; it does not automatically canonize the trait.

No real-person Human-Trait Canon entry may proceed until EC-02 is defined and admitted, unless a later explicit decision authorizes a bounded exception. Synthetic fixtures may be used for testing without creating real-person records.

A candidate must remain in draft status when evidence is `UNRESOLVED` or `REFUSED`.

## Entry Schema

Each entry must preserve:

```text
Canon entry identifier:
Status: candidate / canonized / revised / decanonized
Applicable profession or persona pattern:
Source Saint or Saints:
Synthetic or real-person source status:
Performance, decision, work product, or outcome:
Work product or event identifier:
Exact observed behavior or decision pattern:
Evidence-source standard disposition:
Source classes and exact locators:
Evidence provenance and access path:
Independent corroboration:
Contradicting or limiting evidence:
Context and non-transferable advantages:
Bounded trait statement:
Trait conflict status: compatible / bounded conflict / unresolved conflict:
Conflict disposition and affected entries:
Behavioral expression:
Conditions of usefulness:
Limits and counterweights:
Profession risks:
Governance risks:
Confidence:
Failure signals:
Falsification or revision condition:
Downstream use restrictions:
Review record:
Version and supersession lineage:
```

## Required Derivation

The entry must make this chain inspectable:

```text
source evidence
→ demonstrated performance, decision, work product, or outcome
→ observed behavior or decision pattern
→ bounded trait
→ conditions, limits, and counterweights
→ proposed downstream professional behavior
```

A trait adjective without the chain is not a canon entry.

## Allowed Content

An entry may preserve:

- a profession-relevant behavior supported by exact evidence;
- the conditions under which that behavior appeared useful;
- costs, risks, contradictions, and limits;
- a bounded proposal for later professional behavior;
- uncertainty and what would revise the entry.

## Prohibited Content

An entry must not:

- canonize a whole person;
- import identity, biography, voice, likeness, credentials, or achievements into a persona;
- treat fame, reputation, rank, or source count as evidence;
- conceal contradictory or adverse evidence;
- convert an inference into an observation;
- define a profession or Persona Governance Doctrine;
- grant authority, tools, credentials, or deployment;
- create or mutate an admitted persona in place.

## Lifecycle

```text
Hagiography evidence review
→ draft Canon entry
→ EC-01 disposition recorded
→ Hagiography review
→ canonized or returned / refused
→ Foundry may cite an exact admitted entry version
→ Pit findings may revise or decanonize
```

Movement does not erase provenance. A revised or decanonized entry preserves the prior version and records the changed proposition, evidence, and downstream consequences.

## Canonization Authority

Hagiography owns evidence review and the canonization recommendation. Canonization must identify the exact entry version, EC-01 disposition, reviewer, decision record, scope of downstream use, limitations, and revision conditions.

An unresolved trait conflict blocks canonization. A bounded conflict may be canonized only when the counterweight, conditions, and affected entries are explicit. Compatible traits require a recorded basis for compatibility.

Foundry does not canonize Human-Trait Canon entries. Foundry may accept, reject, or return a canonized entry during persona construction review, and must preserve the exact version and its limits.

## Downstream Contract

Foundry may consume a canonized entry only by exact identifier and version. Foundry must preserve the entry's limits, counterweights, conditions, uncertainty, and prohibited transfers.

Foundry may return an entry when the trait is incoherent, non-operable, performative, professionally harmful, or incompatible with governance doctrine.

A Canon entry does not require Foundry to use the trait. It supplies a bounded input for persona construction review.

## Non-Authority

This artifact does not:

- decide whether a human is exemplary in full;
- select a profession;
- author governance doctrine;
- forge or test a persona;
- admit a persona or Officer;
- recruit or deploy an Operative;
- create Runtime behavior or external effect.

## Open Questions

- What additional domain-specific review record is needed before `candidate` becomes `canonized`?
- How should multiple canon entries interact after a conflict is resolved and recorded?
- Which EC-02 safeguards must be mandatory before any later real-person entry is permitted?
