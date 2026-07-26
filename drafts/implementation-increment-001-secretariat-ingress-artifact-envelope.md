# Implementation Increment 1 — Secretariat Ingress and Artifact Envelope

## Status

Design-only implementation increment. No code, persistence device, Runtime, provider, credential, or external effect.

## Boundary

~~~text
Operator
→ Secretariat
→ Petition
→ Castellan
→ Work Specification
~~~

Secretariat owns request intake and routing. Castellan owns mission formation and Work Specification meaning.

## Secretariat Input

Secretariat receives an operator request containing:

- request content;
- operator identity or session reference;
- submission timestamp;
- requested response channel;
- optional constraints;
- optional attachments or references;
- correlation identity.

Secretariat must preserve the request as received before normalization.

## Petition Envelope

Secretariat produces a versioned Petition envelope containing:

- Petition identity and version;
- original request reference;
- normalized request representation;
- operator/session reference;
- correlation identity;
- received timestamp;
- attachments and source references;
- stated constraints;
- missing-information findings;
- routing status;
- provenance relations;
- supersession or correction lineage.

Normalization must not silently alter the operator’s meaning. Material ambiguity becomes an explicit clarification requirement.

## Routing Outcomes

~~~text
PETITION_RECEIVED
PETITION_NEEDS_CLARIFICATION
PETITION_ROUTED_TO_CASTELLAN
PETITION_REFUSED
PETITION_UNRESOLVED
~~~

These are artifact-relative findings. They do not approve work, grant authority, form a mission, or initiate execution.

## Castellan Handoff

Secretariat may route a Petition to Castellan only when:

- Petition identity and version are stable;
- original request is preserved;
- correlation is present;
- required references are accessible;
- known ambiguity is either resolved or explicitly included;
- routing provenance is recorded.

Castellan may return clarification or formation findings to Secretariat. Secretariat delivers them to the operator without changing their meaning.

## Shared Artifact Envelope

Every creation-apparatus artifact should expose, at minimum:

- artifact type;
- identity;
- version;
- status;
- producer;
- correlation identity;
- exact source references;
- provenance relations;
- finding;
- uncertainty and unresolved blockers;
- supersession lineage;
- invalidation state;
- review record.

The envelope carries metadata and lineage. It does not own the semantic meaning of the payload.

## Integrity Rules

- No artifact is approved merely because it exists.
- No missing evidence becomes implicit consent.
- No artifact is mutated in place after admission.
- Material correction creates a new version.
- Cross-version composition requires an explicit compatibility finding.
- Invalidated artifacts cannot satisfy downstream entry conditions.
- Secretariat cannot author Castellan, Guildhall, or downstream meaning.

## Completion Gate

This increment is ready for reference implementation only after a separate decision approves:

- artifact serialization format;
- identity/version strategy;
- persistence boundary;
- request correlation strategy;
- validation and refusal mechanism;
- Secretariat/Castellan interface shape;
- test harness boundary.
