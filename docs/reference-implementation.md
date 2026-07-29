# Imperium v02 Reference Implementation

## Current executable boundary

~~~text
Operator fixture
→ Secretariat
→ Petition
→ Castellan
→ Work Specification
→ Guildhall
→ Studium / Hagiography
→ Foundry
→ Pit
→ Garrison
→ Conscription
→ inactive Operative Package
~~~

The implementation is deterministic, in-memory, provider-neutral, and non-deploying.

## Run locally

~~~powershell
npm install
npm run build
npm test
~~~

## API entry point

Import from src/index.ts:

~~~typescript
import { ImperiumReference } from "./src/index.js";

const imperium = new ImperiumReference();

const result = imperium.submit({
  content: "Define the professional pattern.",
  sessionReference: "opaque-session-001",
});

console.log(result.petition);
console.log(result.work);
~~~

## Current boundaries

The reference implementation does not provide:

- HTTP or messaging transport;
- database persistence;
- provider or model access;
- credentials;
- Runtime execution;
- activation or deployment;
- multi-tenant routing;
- Officer/Gesta/Smith/Spur/Curia behavior;
- OC behavior.

One Imperium instance is modeled per operator.


## Response boundary

Operator response content and delivery state are separate artifacts:

~~~text
Petition
→ OperatorResponse
→ ResponseDelivery
~~~

A delivery failure does not alter response content.
