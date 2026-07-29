# Creation Apparatus Implementation Plan 001

## Status

Reference implementation increment authorized by Implementation Decision 001.

## Scope

~~~text
Operator fixture
→ Secretariat.receive()
→ Petition artifact
→ Castellan.receivePetition()
→ Work Specification artifact
~~~

The implementation is in-memory, provider-neutral, and non-deploying.

## Stack

- TypeScript;
- Node.js;
- JSON-shaped artifacts;
- in-memory values;
- direct function calls;
- Vitest.

## Boundaries

Secretariat receives and routes operator requests. Castellan forms Work Specifications. Neither component selects professions, creates personas, recruits Operatives, grants tools or credentials, invokes Runtime, or causes external effects.

Production persistence, HTTP transport, queues, providers, models, credentials, and deployment are deferred.

## Verification

The increment must verify:

- request preservation;
- opaque correlation;
- Petition identity and version;
- Secretariat findings;
- Castellan correlation;
- Petition source reference;
- empty-request blocking;
- no external effect.
