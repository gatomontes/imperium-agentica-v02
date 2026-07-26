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


## Privacy-Preserving Session Correlation

A Petition must remain correlatable without requiring direct personal identity.

Secretariat may use an opaque Operator Session Reference containing:

- non-meaningful correlation identifier;
- issuing context;
- creation and expiry timestamps;
- authorization scope reference, if any;
- revocation state;
- retention class.

The opaque reference must not encode name, email, address, profile attributes, or inferred identity. The mapping to any external identity, when one exists, remains outside the Petition payload and outside Secretariat's semantic authority.

An anonymous session may submit a Petition when the request does not require identity-based authorization. If identity or authority is required and unavailable, the Petition becomes PETITION_UNRESOLVED or PETITION_REFUSED according to the applicable boundary. Correlation remains possible without identity disclosure.

## Response Delivery State

Every operator-directed response must preserve a delivery record with:

~~~text
RESPONSE_PREPARED
RESPONSE_DISPATCHED
RESPONSE_ACKNOWLEDGED
RESPONSE_RETRY_REQUIRED
RESPONSE_UNDELIVERABLE
RESPONSE_EXPIRED
RESPONSE_CANCELLED
~~~

The record must contain:

- response identity and version;
- Petition correlation identity;
- destination/channel reference without unnecessary personal data;
- dispatch attempt identity and timestamp;
- delivery result;
- retry count and next retry condition;
- acknowledgement evidence when available;
- expiry condition;
- undeliverable reason;
- semantic payload reference.

Delivery failure does not alter the response meaning, approve the request, or authorize a retry beyond the delivery mechanism's bounded responsibility. Repeated failure becomes an explicit operational finding for later handling.
