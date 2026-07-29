# Implementation Decision 001 — TypeScript / Node.js

## Status

Recorded implementation decision for the Imperium reference implementation.

## Decision

Imperium’s agentic core will use:

- TypeScript;
- Node.js;
- JSON artifacts;
- JSON Schema validation;
- in-memory repositories for the first reference increment;
- direct function-call interfaces;
- Vitest for deterministic contract tests.

## Deployment Unit

The initial operating model is:

~~~text
one operator
→ one Imperium instance
→ many missions over time
~~~

The reference implementation does not establish multi-tenancy or shared client/company routing.

## Boundary

PHP/Symfony may remain an external SaaS integration surface in future systems. It is not part of the Imperium core implementation decision.

## Non-Admissions

This decision does not select:

- a production persistence device;
- a provider or model;
- credentials;
- Runtime architecture;
- deployment topology;
- HTTP or message transport;
- production hosting;
- external effect.

## Rationale

TypeScript/Node.js is selected for the agentic core because it provides strong support for asynchronous orchestration, event-oriented flows, JSON-native contracts, tool and provider integration, streaming, and deterministic schema-driven tests.

The decision favors a single core stack. Hybrid implementation is deferred unless a demonstrated boundary requires it.
