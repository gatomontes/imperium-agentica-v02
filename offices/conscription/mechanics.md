---
inherits: [./doctrine.md]
---

# Conscription Mechanics

These functions instantiate, preserve, bind, and transport exact construction artifacts. They do not interpret Profiles, judge ordinary Officer qualification, or grant another Office's authority.

## register-activation-request
Validate and preserve the requesting Office, vacant Seat, exact Profile version, requested cognition, correlation, and authority to request construction.

## instantiate-generic-officer
Instantiate the authorized generic Officer substrate identified by a valid construction or Recruiter-bootstrap case; output an immutable substrate-instance record.

## install-profile
Install the exact supplied Profile into the correlated generic Officer instance without rewriting, supplementation, or semantic transformation; output a Profile-installation record.

## record-qualification-disposition
Preserve the occupied Recruiter Seat's attributable qualification disposition, findings, Profile version, substrate instance, and intended Seat.

## bind-qualified-officer
Bind a successful qualification record to the constructed Officer and its intended Seat; output an Officer construction record and Seat-target binding. Binding does not occupy the Seat.

## deliver-qualified-officer
Transmit the qualified Officer and exact construction record to the requesting Office; record delivery or bounded failure.

## bootstrap-recruiter
When and only when the resident Recruiter Seat is vacant, mechanically validate the exact current Recruiter Profile and authorized generic substrate, instantiate the substrate, install that Profile, bind the resulting Recruiter exclusively to the Recruiter Seat, record its mechanical origin, and occupy the Seat.

`bootstrap-recruiter` accepts no alternate Profile or Seat and contains no cognitive judgment. Any mismatch, ambiguity, missing version, invalid substrate, existing occupant, or attempted reuse fails closed.

Every function preserves exact identity, version, lineage, correlation, and disposition. Mechanical completion is not proof of ordinary cognitive qualification or authority outside valid Seat occupancy.

