# DR-027 — Courtyard Membership, Office/Officer Distinction, and Internal Movement

## Status

Recorded semantic decision. This decision defines Courtyard membership, distinguishes offices from Officers, and establishes the relationship among stations, resident operatives, and inter-office artifact movement. It authorizes no implementation, Runtime action, activation, deployment, credential use, or external effect.

## Decision

Courtyard membership is institutional, not merely spatial. Courtyard contains:

- Citadel offices and their bounded functional stations;
- Citadel Officers assigned to govern, authenticate, or adjudicate within those offices;
- resident operatives assigned to perform bounded specialist work at stations;
- the institutional artifacts and records produced, received, or exchanged by those functions.

An office is a governed institutional function. It owns a responsibility, defines or applies the relevant doctrine and procedure within its authority, establishes station boundaries, receives or produces institutional artifacts, and may refuse, return, or escalate work when its conditions are not satisfied. An office is not itself an intelligent actor.

An Officer is an institutional cognitive actor assigned to one or more bounded office responsibilities. The Officer interprets and applies admitted doctrine within the office’s authority, governs or authenticates the office’s work, resolves matters explicitly assigned to Officer judgment, and records decisions or findings. An Officer does not create authority merely by judging, does not replace the office, and does not perform every specialist operation of the office.

Resident operatives are station-bound work performers. They execute the bounded specialist function of their station against the received inputs and applicable instructions. They may inspect, transform, test, assemble, or record evidence as their station permits. They do not govern the office, interpret doctrine beyond their station’s contract, adjudicate institutional disposition, or cross station boundaries on their own authority.

The Praetorium is the institutional placement of Imperium Officers. Garrison is the roster and availability custodian for admitted assets; it is not the Officers’ residential or governance location. The office-versus-Officer distinction remains valid across Courtyard: offices govern institutional responsibilities; Officers exercise authority-bounded institutional cognition and judgment.

A station is a bounded functional point within an office. A station has an owning office, a defined input and output contract, a resident operative class or assignment, applicable evidence and refusal conditions, and a receiving or releasing authority. A station is not an Officer and does not become an office merely because a resident operative performs work there.

Inter-office movement occurs through institutional artifacts and explicit handoffs. A sending station or office may release only an artifact whose required contents, provenance, version, status, and receiving office are identified. The receiving station or office must acknowledge receipt, reject the handoff, or return it for repair according to its contract. Receipt does not imply approval; absence of rejection does not imply approval; and a later office may not silently rewrite the sending office’s artifact or provenance.

An artifact may move forward only when the sending function has satisfied its release conditions and the receiving function is authorized to receive it. A returned artifact moves backward for named repair or clarification, preserving the reason, sender, recipient, version, and prior record. Cross-office requests for information, reconsideration, or additional evidence are institutional exchanges, not unbounded authority transfers.

Courtyard therefore provides the bounded operating surface in which offices, Officers, stations, resident operatives, and institutional artifacts relate. It does not itself become an additional decision-maker, orchestration layer, governance layer, Runtime component, execution surface, or external boundary.

## Consequences

- Office membership does not grant every member the office’s full authority.
- Officer status does not grant authority outside the assigned office contract.
- Resident operative work remains bounded by station contracts and does not become doctrine or governance.
- Institutional movement is traceable through artifacts and handoffs rather than implied by proximity.
- Curia’s mission-level decision authority, La Cortine’s boundary/routing function, Lazaretto’s return/quarantine function, and Runtime’s operational role remain outside Courtyard’s authority.

## Gate

This decision is semantic and architectural only. No implementation, Runtime action, activation, deployment, credential use, live data, or external effect is authorized.
