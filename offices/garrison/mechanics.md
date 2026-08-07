---
inherits:
  - /imperium-doctrine.md
  - ./doctrine.md
---

# Garrison Mechanics

Mechanics expose capabilities; they do not create authority beyond Garrison doctrine. Substantive actions require an occupied Constable Seat.

## accept-custody

- **Trigger:** exact custody package from the competent authority
- **Inputs:** artifact identity and version, ownership, disposition, evidence, fingerprints, status, correlation
- **Outputs:** custody acceptance record and versioned roster entry
- **Failures:** missing authority, incomplete evidence, mutable reference, identity mismatch, broken correlation
- **Performed by:** occupied Constable Seat

Garrison verifies the package; it does not reconsider the upstream admission or qualification judgment.

## refuse-custody

- **Trigger:** defective or unauthorized custody package
- **Inputs:** submitted package and detected defects
- **Outputs:** bounded refusal identifying exact defects and return destination
- **Failures:** defect cannot be attributed or package identity cannot be established
- **Performed by:** occupied Constable Seat

## report-inventory

- **Trigger:** authorized inventory inquiry
- **Inputs:** artifact criteria, version or currency conditions, authority
- **Outputs:** exact roster, state, version, digest, lineage, and availability facts
- **Failures:** unauthorized inquiry, ambiguous criteria, no matching record
- **Performed by:** occupied Constable Seat

Inventory facts are not suitability, selection, or permission to use.

## retrieve-artifact

- **Trigger:** authorized retrieval request
- **Inputs:** exact artifact identity or admissible criteria, purpose, authority, required version
- **Outputs:** exact held Persona or qualified Profile record with custody and provenance record, or no-match result
- **Failures:** unauthorized request, ambiguity, unavailable version, stale or incompatible request
- **Performed by:** occupied Constable Seat

## change-custodial-state

- **Trigger:** authorized state disposition
- **Inputs:** custody record, target state, reason, authority, effective time
- **Outputs:** reservation, quarantine, supersession, withdrawal, retirement, or other versioned state record
- **Failures:** absent authority, invalid transition, identity mismatch, stale record
- **Performed by:** occupied Constable Seat

## verify-custody-record

- **Trigger:** custody or retrieval integrity check
- **Inputs:** custody record, held-artifact digest, lineage, expected authority
- **Outputs:** exact verification result and defects
- **Failures:** missing evidence, digest mismatch, broken lineage, unverifiable authority
- **Performed by:** occupied Constable Seat

## release-artifact

- **Trigger:** authorized handoff of a retrieved held artifact
- **Inputs:** exact artifact, custody record, recipient Office, purpose, authority
- **Outputs:** provenance-complete release record and exact artifact handoff
- **Failures:** recipient mismatch, state prohibits release, integrity failure, absent authority
- **Performed by:** occupied Constable Seat
