# Offices

This directory is the Office-first doctrinal view of Imperium.

Each Office defines:

- `doctrine.md` — institutional purpose, jurisdiction, cognitive responsibilities, and boundaries
- `mechanics.md` — non-cognitive operations that move, preserve, correlate, version, structurally verify, and expose the Office's work
- `seat-*.md` — where Office authority is localized
- `profile-*.md` — cognition and qualifications required to occupy a Seat

Mechanics do not reason, interpret evidence, decide relevance, approve substance, or create authority. Those acts belong to an occupied Seat operating through its Profile. A mechanic may execute an already-made disposition; it may not make the disposition.

## Mechanical capability index

| Mechanical capability | Owning Office | Mechanic |
|---|---|---|
| Register an Officer activation request | Conscription | `register-activation-request` |
| Instantiate the generic Officer substrate and install an exact Profile | Conscription | `instantiate-generic-officer`, `install-profile` |
| Preserve qualification and bind a successful construction | Conscription | `record-qualification-disposition`, `bind-qualified-officer` |
| Deliver a qualified Officer to its requesting Office | Conscription | `deliver-qualified-officer` |
| Bootstrap the resident Recruiter through the sole mechanical spawning exception | Conscription | `bootstrap-recruiter` |
| Register intake and preserve exact material | Secretariat | `register-intake` |
| Present one authorized question and correlate its answer | Secretariat | `present-question`, `record-answer` |
| Package and deliver an authorized artifact | Secretariat | `package-delivery`, `deliver-package` |
| Open a profession-resolution case | Guildhall | `open-resolution-case` |
| Dispatch and correlate committee work | Guildhall | `dispatch-committee-assignment`, `record-committee-return` |
| Assemble attributed committee material | Guildhall | `assemble-committee-record` |
| Record and issue Guildmaster disposition | Guildhall | `record-guildmaster-disposition`, `issue-profession-packet` |
| Open and version a mission dossier | Castellan | `open-mission-dossier`, `version-mission-dossier` |
| Dispatch one Rector-authored question | Castellan | `dispatch-intake-question` |
| Record Rector dispositions and issue artifacts | Castellan | `record-rector-disposition`, `issue-mission-artifact` |
| Register, retrieve, and release held artifacts | Garrison | `register-custody`, `retrieve-held-artifact`, `release-held-artifact` |
| Query inventory and record custodial state | Garrison | `query-inventory`, `record-custodial-state` |
| Verify custody-record integrity | Garrison | `verify-custody-integrity` |
| Open and preserve a Persona production case | Foundry | `open-production-case` |
| Dispatch and correlate specialized commissions | Foundry | `dispatch-commission`, `record-specialized-return` |
| Bind and version candidate sections | Foundry | `bind-candidate-sections`, `version-candidate` |
| Dispatch for adversarial artifact review and correlate its return | Foundry | `dispatch-for-adversarial-review`, `record-adversarial-return`, `route-adversarial-return` |
| Record production disposition and issue release | Foundry | `record-production-disposition`, `issue-release-packet` |
| Open and preserve an evidentiary inquiry | Hagiography | `open-inquiry` |
| Register Chronicler assignments and returns | Hagiography | `register-assignment`, `dispatch-research-task`, `record-research-return` |
| Preserve provenance and bind attributed research | Hagiography | `preserve-evidence-record`, `bind-research-packet` |
| Submit and close an inquiry | Hagiography | `submit-research-packet`, `record-inquiry-disposition`, `close-inquiry` |
| Open and preserve a doctrine case | Studium | `open-doctrine-case` |
| Register, dispatch, and correlate specialized Notary work | Studium | `register-notary-assignment`, `dispatch-notary-assignment`, `record-notary-return` |
| Bind and version attributable doctrine sections | Studium | `bind-doctrine-sections`, `version-doctrine` |
| Record doctrine disposition and issue its packet | Studium | `record-doctrine-disposition`, `issue-doctrine-packet` |
| Correlate semantic amendments with revalidation duties | Studium | `register-revalidation-impact` |
| Open and preserve a manifestation-bound confirmation case | Senate | `open-confirmation-case` |
| Register the confirmation plan and Senator assignments | Senate | `register-confirmation-plan`, `register-senator-assignment` |
| Create and close sterile witness instances | Senate | `instantiate-sterile-witness`, `close-witness-instance` |
| Dispatch questions and preserve exact testimony | Senate | `dispatch-question`, `record-testimony` |
| Preserve findings and assemble the confirmation record | Senate | `record-senator-finding`, `assemble-confirmation-record` |
| Record disposition and issue the confirmation record | Senate | `record-senate-disposition`, `issue-confirmation-record` |

## Authority boundary

```text
Imperium doctrine
    ↓
Office doctrine
    ↓
Seat authority + Profile cognition
    ↓
Cognitive disposition
    ↓
Office mechanics
    ↓
Runtime implementation
```

Mechanical success proves only that an operation completed; it does not prove that the underlying judgment was correct or authorized.
