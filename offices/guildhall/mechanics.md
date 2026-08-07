---
inherits:
  - /imperium-doctrine.md
  - ./doctrine.md
---

# Guildhall Mechanics

Mechanics expose capabilities; they do not create authority beyond Guildhall doctrine. Committee analysis requires the corresponding occupied Committee Seat; admission requires the occupied Guildmaster Seat.

## assess-disciplinary-fit

- **Trigger:** accepted Work Specification received from Castellan
- **Inputs:** Mission Need, Work Specification, relevant Operator constraints
- **Outputs:** attributable candidate professions and body-of-practice rationale
- **Failures:** unaccepted specification, insufficient professional basis, category ambiguity
- **Performed by:** occupied Disciplinary-Fit Committee Seat

## assess-composition

- **Trigger:** professional candidates available for composition review
- **Inputs:** candidate professions, required outcomes, dependencies
- **Outputs:** attributable one-or-many profession analysis, collaboration mode, overlap, and proposed order
- **Failures:** missing candidates, unresolved dependency, inseparable or duplicative scopes
- **Performed by:** occupied Composition Committee Seat

## challenge-boundaries

- **Trigger:** candidate profession resolution available for challenge
- **Inputs:** candidates, rationales, boundaries, proposed order
- **Outputs:** attributable category-error, omission, vague-title, overlap, and mission-drift findings
- **Failures:** insufficient evidence, untraceable proposal, unresolved boundary collision
- **Performed by:** occupied Boundary-Challenge Committee Seat

## adjudicate-professions

- **Trigger:** complete attributable recommendations from all three current Committee Seats
- **Inputs:** committee contributions, Mission Need, Work Specification
- **Outputs:** admitted, rejected, consolidated, or requery disposition
- **Failures:** vacant Committee Seat, incomplete attribution, unresolved contradiction
- **Performed by:** occupied Guildmaster Seat

Only the Guildmaster adjudicates. Committee members recommend.

## issue-profession-determination

- **Trigger:** Guildmaster admits the professional resolution
- **Inputs:** adjudication, profession boundaries, rationale, order, contribution lineage
- **Outputs:** versioned Profession Determination Packet returned to Castellan
- **Failures:** incomplete lineage, unresolved profession, missing Guildmaster disposition
- **Performed by:** occupied Guildmaster Seat
