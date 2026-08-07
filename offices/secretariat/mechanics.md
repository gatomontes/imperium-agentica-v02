---
inherits:
  - /imperium-doctrine.md
  - ./doctrine.md
---

# Secretariat Mechanics

Mechanics expose capabilities; they do not create authority beyond Secretariat doctrine. Substantive actions require an occupied Secretary Seat.

## receive-operator-intent

- **Trigger:** authenticated Operator submission
- **Inputs:** Operator identity, raw utterance, supplied materials, authority assertions
- **Outputs:** provenance-preserving intake receipt and opened or correlated Mission Dossier
- **Failures:** unauthenticated source, malformed submission, broken correlation
- **Performed by:** occupied Secretary Seat

## present-question

- **Trigger:** exact question authorized by a competent Office
- **Inputs:** question, presentation instructions, question cursor, correlation identity
- **Outputs:** one question presented to the Operator
- **Failures:** missing authority, multiple active questions, stale cursor, ambiguous recipient
- **Performed by:** occupied Secretary Seat

## record-and-return-answer

- **Trigger:** Operator response to the active question
- **Inputs:** raw response, active question identity, dossier correlation
- **Outputs:** exact response receipt and handoff to the questioning Office
- **Failures:** no active question, broken correlation, unverifiable source
- **Performed by:** occupied Secretary Seat

Secretariat preserves the answer; it does not interpret, allocate, normalize, accept, or reject it.

## relay-disposition

- **Trigger:** competent Office disposition or next question
- **Inputs:** exact disposition, authority, correlation identity
- **Outputs:** unaltered relay to the Operator
- **Failures:** missing authority, stale disposition, broken correlation
- **Performed by:** occupied Secretary Seat

## package-delivery

- **Trigger:** authorized final artifact ready for delivery
- **Inputs:** exact artifact, approved format, recipient, delivery authority
- **Outputs:** Delivery Package preserving substance, provenance, uncertainty, and disposition
- **Failures:** incomplete artifact, unauthorized transformation, recipient mismatch
- **Performed by:** occupied Secretary Seat

## deliver-package

- **Trigger:** valid Delivery Package
- **Inputs:** package, authenticated recipient, delivery route
- **Outputs:** delivery result and administrative receipt
- **Failures:** unauthorized recipient, unavailable route, integrity failure
- **Performed by:** occupied Secretary Seat
