# Implementation Increment 001 — Design Review

## Status

Non-live implementation-design review. This record does not authorize production implementation, persistence, transport, Runtime operation, credentials, provider access, activation, deployment, or external effects.

## Reviewed Boundary

```text
Operator fixture
→ Secretariat.receive()
→ Petition artifact
→ Castellan.receivePetition()
→ Work Specification artifact
```

The reference design is provider-neutral, in-memory, and directly callable. Secretariat owns intake and routing. Castellan owns mission-formation meaning. Neither office selects professions, creates Personas, recruits Operatives, grants tools or credentials, invokes Runtime, or causes external effects.

## Design Decisions

- TypeScript/Node.js reference implementation.
- JSON-shaped immutable artifact values.
- Explicit identity and monotonic version fields.
- Opaque session correlation; no personal identity encoded in correlation values.
- Original request preserved beside any normalized representation.
- Material ambiguity becomes a finding or clarification state; normalization cannot silently repair meaning.
- Source references and provenance relations are explicit.
- Material correction creates a successor artifact; admitted artifacts are not mutated in place.
- Direct function calls and Vitest comprise the test boundary.
- Persistence, HTTP transport, queues, provider adapters, models, credentials, and deployment remain deferred.

## Required Artifact Invariants

A Petition must contain:

- artifact type, identity, version, and status;
- original request reference and preserved request content;
- operator/session reference and correlation identity;
- received timestamp;
- constraints, attachments, and source references;
- findings, uncertainty, and unresolved blockers;
- provenance and supersession lineage.

A Castellan handoff must preserve the Petition identity/version and correlation, and must cite the Petition as its source. A Work Specification is a new artifact owned by Castellan; it is not an approval or activation record.

## Interface Boundary

The reference interface must make ownership visible:

- `Secretariat.receive(request)` returns a Petition or an explicit refusal/unresolved result.
- `Secretariat.route(petition)` returns a routing finding or a Castellan handoff.
- `Castellan.receivePetition(petition)` accepts only a stable, correlated, accessible Petition.
- `Castellan.formWorkSpecification(petition)` creates a new Work Specification only from an accepted handoff.

No interface may expose credential material, invoke a provider, activate an Operative, or cross an execution boundary.

## Validation and Refusal

The harness must reject:

- empty or malformed requests;
- missing correlation;
- unstable or superseded Petition versions;
- missing original-request preservation;
- inaccessible or contradictory source references;
- silent normalization of material ambiguity;
- cross-version composition without an explicit compatibility finding;
- attempts to treat artifact existence as approval or authority.

Refusal and unresolved results remain artifacts/findings. They do not become implicit approval.

## Verification Matrix

The implementation-design review is complete when the reference harness demonstrates:

1. request preservation;
2. opaque correlation without identity disclosure;
3. stable Petition identity/version;
4. explicit missing-information findings;
5. exact Petition source reference at Castellan;
6. empty-request refusal;
7. supersession and invalidation refusal;
8. Work Specification lineage;
9. no credential/provider/Runtime call path;
10. no external effect.

## Disposition

The design is suitable for a bounded in-memory reference implementation after a separate implementation admission decision. This review itself admits no code, persistence, transport, Runtime, credentials, activation, deployment, provider interaction, live data, or external effect.
