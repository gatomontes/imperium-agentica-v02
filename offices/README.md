# Offices

This directory is the Office-first doctrinal view of Imperium.

Each Office defines:

- `doctrine.md` — what the Office is obligated and permitted to do
- `mechanics.md` — the concrete functions the Office can perform
- `seat-*.md` — where Office authority is localized
- `profile-*.md` — what qualifies a generic agent to occupy a Seat

Mechanics expose capabilities; they do not create authority. Every mechanic inherits the Imperium constitution and its Office doctrine.

## Capability index

| Capability | Owning Office | Mechanic |
|---|---|---|
| Receive Operator intent | Secretariat | `receive-operator-intent` |
| Present one authorized question | Secretariat | `present-question` |
| Preserve and return an exact answer | Secretariat | `record-and-return-answer` |
| Relay a competent-Office disposition | Secretariat | `relay-disposition` |
| Package and deliver authorized results | Secretariat | `package-delivery`, `deliver-package` |
| Determine disciplinary fit | Guildhall | `assess-disciplinary-fit` |
| Determine profession composition and order | Guildhall | `assess-composition` |
| Challenge professional boundaries | Guildhall | `challenge-boundaries` |
| Adjudicate and issue profession determination | Guildhall | `adjudicate-professions`, `issue-profession-determination` |
| Form a mission through controlled inquiry | Castellan | `open-mission-formation`, `issue-intake-question`, `assess-intake-answer` |
| Produce Mission Need and Mission Specification | Castellan | `form-mission-need`, `issue-mission-specification` |
| Assess mission-contract conformance | Castellan | `assess-mission-conformance` |
| Disposition Persona admission, while assigned | Castellan | `disposition-persona-admission` |
| Accept or refuse custody | Garrison | `accept-custody`, `refuse-custody` |
| Report inventory and availability facts | Garrison | `report-inventory` |
| Retrieve and release an exact held artifact | Garrison | `retrieve-artifact`, `release-artifact` |
| Change custodial state | Garrison | `change-custodial-state` |
| Verify a custody record | Garrison | `verify-custody-record` |

## Authority boundary

    Imperium doctrine
        ↓
    Office doctrine
        ↓
    Seat authority
        ↓
    Office mechanics
        ↓
    Runtime implementation

A listed capability means only that the Office has a defined mechanical function. Invocation still requires the exact trigger, authority, inputs, occupied Seat, and doctrinal conditions stated by that Office.
