# DR-043 — Garrison Admission and Suitability Contract

## Status

Proposal for semantic review. This record authorizes no implementation, Runtime action, live roster mutation, persona or Operative creation, activation, deployment, credential use, or external effect.

## Contract

Garrison is the roster and availability custodian for admitted Persona Specifications and their versioned successors. It does not forge, test, select by professional fit, recruit, activate, or deploy.

Garrison may receive only a complete, released admission packet containing:

- the approved Persona Specification and immutable version;
- Guildhall Committee disposition admitting that candidate;
- Pit Brief identifying the examination and its recommendation;
- provenance linking the candidate, inputs, doctrine, canon, examination, findings, and disposition;
- suitability criteria and any exclusions authorized by the relevant contract;
- identity, status, ownership, and version metadata sufficient to distinguish the candidate from successors or withdrawn entries.

Garrison verifies receipt completeness and authority before admission. A Pit recommendation is evidence for the Committee; it is not itself admission authority. Garrison records an admitted roster entry only after the Committee’s explicit Admit disposition and successful packet verification.

Suitability is a bounded comparison between an admitted roster entry and a later, authorized requirement. Garrison may report matches, non-matches, and indeterminate results against supplied criteria. It may not infer professional fit, rewrite criteria, repair a Persona Specification, resolve doctrine conflicts, or silently substitute a successor version. Ambiguous or incomplete criteria produce an indeterminate result or refusal, not an optimistic match.

Roster truth is versioned and stateful. Each entry preserves identity, Persona Specification version, admission authority, provenance, current state, and state-change reason. Admission, availability, reservation, withdrawal, invalidation, and removal are distinct states or transitions; no state transition is implied by silence, search, recommendation, or suitability reporting. Reservation/availability semantics remain bounded to the separately authorized use of the roster and do not constitute activation or deployment.

Garrison refuses or returns a packet when required authority, evidence, provenance, identity, version, or suitability inputs are missing, contradictory, stale, or outside its boundary. Refusal names the failed condition and returns the artifact without rewriting it. A later corrected packet is a new version or successor where upstream content changed; the prior record remains preserved.

Upstream change invalidates affected admission or suitability results when it changes the Persona Specification, governing doctrine, canon, examination, Committee disposition, or criteria on which the result depended. Garrison marks the affected result non-current and requires revalidation through the owning upstream contract. Garrison does not repair upstream artifacts or revive an invalid result.

Garrison releases only a versioned roster record or suitability report with identity, source version, criteria version, state, provenance, and disposition. Downstream Recruitment/Conscription may receive an admitted and suitable entry, but receipt does not authorize transformation, activation, or deployment. Garrison remains custodian; Recruitment/Conscription owns packaging under its own contract.

## Boundaries

Garrison does not:

- determine profession or professional fit;
- author or revise doctrine;
- derive or canonize exemplars;
- forge Persona Specifications;
- independently validate candidates;
- decide Committee disposition;
- transform candidates into Operatives;
- activate, deploy, or produce external effects.

## Admission gate

This contract is admitted only after synthetic pressure testing covers complete and incomplete packets, Committee-versus-Pit authority, suitability match/non-match/indeterminate cases, duplicate and successor identity, refusal/return, reservation and withdrawal, invalidation after upstream change, provenance preservation, and downstream handoff.

