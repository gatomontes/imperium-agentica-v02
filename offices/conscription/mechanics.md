---
inherits: [./doctrine.md]
---

# Conscription Mechanics

These functions instantiate, preserve, bind, and transport exact construction artifacts. They do not interpret Profiles, judge ordinary Officer qualification, or grant another Office's authority.

## register-activation-request
Validate and preserve the requesting Office, vacant Seat, exact Profile version and digest, current/active designation, owning Office, target Seat, valid Imperator signature, requested cognition, correlation, and authority to request construction.

## instantiate-generic-agent
Instantiate the authorized generic-agent substrate identified by a valid Officer, operative, or Recruiter-bootstrap case; output an immutable substrate-instance record.

## install-profile
Install the exact supplied Profile into the correlated generic Officer instance without rewriting, supplementation, or semantic transformation; output a Profile-installation record.

## register-examination-assembly-request
Validate and preserve Senate's request, exact pending-admission Persona version and digest, Foundry approval record, examination identity and contract, authorized destination, and correlation.

## commission-examination-profile
Transmit the exact pending-admission Persona and examination contract to Laboratorium with a commission limited to one `examination_only` Profile; preserve custody, identity, digest, and correlation.

## assemble-examination-packet
After receiving Laboratorium's exact returned Profile, bind it with the exact Persona, authorized generic-agent substrate, model and runtime configuration, applicable doctrine, permitted synthetic facilities, resource limits, Senate stand launch contract, expiry and disposal conditions, and a whole-packet integrity digest. Seal the result without activating a manifestation.

## deliver-examination-packet
Return the sealed examination assembly packet to the requesting Senate case. Delivery transfers no live process, session, memory, tool connection, Seat, or operational authority.

## record-qualification-disposition
Preserve the occupied Recruiter Seat's attributable qualification disposition, findings, Profile version, substrate instance, and intended Seat.

## bind-qualified-officer
Bind a successful qualification record to the constructed Officer and its intended Seat; output an Officer construction record and Seat-target binding. Binding does not occupy the Seat.

## deliver-qualified-officer
Transmit the qualified Officer and exact construction record to MasterMason for binding to the target Seat under Imperator-vested runtime authority; record delivery or bounded failure.

## bootstrap-recruiter
When and only when MasterMason invokes the declared bootstrap transition under Imperator-vested runtime authority and the resident Recruiter Seat is vacant, mechanically validate the exact current/active, Imperator-signed Recruiter Profile and authorized generic substrate, instantiate the substrate, install that Profile, bind the resulting Recruiter exclusively to the Recruiter Seat, and record its mechanical origin. MasterMason then verifies the prepared result and turns Recruiter on in the resident Recruiter Seat.

`bootstrap-recruiter` accepts no alternate Profile or Seat and contains no cognitive judgment. It cannot turn itself on. Any mismatch, ambiguity, missing version, invalid substrate, existing occupant, or attempted reuse fails closed.

Every function preserves exact identity, version, lineage, correlation, and disposition. Mechanical completion is not proof of ordinary cognitive qualification or authority outside valid Seat occupancy.
