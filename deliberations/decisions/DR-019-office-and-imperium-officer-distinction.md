# DR-019 — Office and Imperium Officer Distinction

## Status

Recorded architectural decision; active semantic rule.

## Decision

An Imperium office is an institution that owns a defined function, responsibility, and bounded authority. An Imperium Officer is the authorized officeholder who occupies that office and performs its functions.

The Officer exercises the office's authority only within the office's defined bounds. Office authority is not personal to the Officer, does not expand by occupancy, and is not transferable merely because an Officer carries out an office function.

This rule applies to Secretariat, Castellan, Guildhall, Studium, Foundry, Garrison, Curia, and all other Imperium offices.

## Current Application

Secretariat is the operator-facing office. Its Officer receives and preserves the operator's request, brings it before Castellan, carries Castellan's determination to the responsible office, maintains correspondence and records, and returns outcomes. Secretariat does not determine, classify, interpret, or route the request by its own authority.

Castellan is the determining office for the initial production, recruitment, or mission-execution route. Its Officer exercises Castellan's authority within that office's bounds.

For a secretary-persona request, the distinction is:

~~~text
Operator
→ Secretariat Officer / Secretariat office
→ Castellan Officer / Castellan office
→ determination
→ Secretariat Officer / Secretariat office
→ Guildhall or Garrison as directed
~~~

## Boundaries

This decision does not authorize live persona production, recruitment, operative construction, Runtime action, deployment, credentials, OC implementation, or external effect. It changes no implementation contract by itself; future implementation must preserve the office/Officer distinction and native ownership.
