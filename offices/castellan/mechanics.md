---
inherits:
  - /imperium-doctrine.md
  - ./doctrine.md
---

# Castellan Mechanics

Mechanics expose capabilities; they do not create authority beyond Castellan doctrine. Substantive actions require an occupied Rector Seat.

## open-mission-formation

- **Trigger:** authenticated intake material from Secretariat
- **Inputs:** Mission Dossier, raw Operator intent, supplied-material provenance
- **Outputs:** mission-formation state and first unresolved predicate
- **Failures:** unauthenticated intake, broken provenance, malformed dossier
- **Performed by:** occupied Rector Seat

## issue-intake-question

- **Trigger:** unresolved mission predicate
- **Inputs:** current dossier, question cursor, prior dispositions
- **Outputs:** exactly one authorized question for Secretariat to present
- **Failures:** no unresolved predicate, stale cursor, contradictory dossier state
- **Performed by:** occupied Rector Seat

## assess-intake-answer

- **Trigger:** exact Operator response returned by Secretariat
- **Inputs:** active question, raw answer, dossier and cursor identity
- **Outputs:** accept, requery, explain, nonresponsive, contradictory, or unresolved disposition
- **Failures:** mismatched question, altered answer, broken correlation
- **Performed by:** occupied Rector Seat

## form-mission-need

- **Trigger:** sufficient accepted intake determinations
- **Inputs:** exact accepted values and their evidence lineage
- **Outputs:** versioned Mission Need
- **Failures:** unresolved required predicate, contradiction, missing provenance
- **Performed by:** occupied Rector Seat

## issue-mission-specification

- **Trigger:** mission formation is complete
- **Inputs:** Mission Need, accepted constraints, exact intake lineage
- **Outputs:** accepted versioned Mission Specification and authorized handoff
- **Failures:** incomplete mission, unsupported value, unresolved ambiguity
- **Performed by:** occupied Rector Seat

## assess-mission-conformance

- **Trigger:** downstream return requiring contract comparison
- **Inputs:** exact Mission Specification, returned artifact, lineage
- **Outputs:** conformance finding or bounded defect return
- **Failures:** wrong version, incomplete artifact, broken lineage
- **Performed by:** occupied Rector Seat

## disposition-persona-admission

- **Trigger:** exact Foundry Release Packet submitted under the separately assigned admission responsibility
- **Inputs:** candidate Persona, passing Pit evidence, Foundry approval, fingerprints, lineage
- **Outputs:** admission or rejection of that exact candidate version
- **Failures:** incomplete packet, identity mismatch, absent passing evidence, stale candidate
- **Performed by:** occupied Rector Seat

This function exists only while Persona-admission authority remains assigned to Castellan.
