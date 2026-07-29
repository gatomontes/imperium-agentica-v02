# DR-052 — Execution-Layer Boundary and Envelope Contract

Status: active semantic contract proposal; pressure testing pending.

## Purpose

Define the Execution layer as the bounded semantic surface where an already admitted and separately authorized Operative receives a mission-specific execution envelope and produces attempted actions, results, refusals, or failures.

## Boundary

Execution begins only after an Operative Package, mission assignment, authority grant, and execution envelope have each been admitted by their responsible authorities. Execution does not create, select, qualify, package, activate, deploy, or credential an Operative.

Execution is distinct from:

- Curia, which convenes and decides within its authority;
- Muster, which briefs and assembles an authorized mission;
- Armory, which supplies tool capability facts and tool artifacts;
- Locksmith, which governs credential access and does not surrender credential authority;
- Runtime, which operates the execution machinery;
- La Cortine, which contains the boundary ports; the appropriate port performs each crossing;
- Lazaretto, which quarantines and sanitizes returning field material;
- external providers, which remain outside Imperium authority.

## Execution envelope

The envelope is the authoritative mission-scoped packet that states:

1. the Operative Package identity and immutable version;
2. the mission identity, objective, scope, and permitted action classes;
3. authority source, duration, limits, prohibitions, and termination conditions;
4. tool and provider capability references without transferring ownership;
5. credential-use authorization by reference, never credential disclosure as an Execution artifact;
6. evidence, provenance, artifact, reporting, and refusal requirements;
7. interruption, quarantine, escalation, and return routes.

An incomplete, expired, conflicting, or unverifiable envelope is not executable; it is refused and returned to the responsible authority.

## Execution outputs

Execution may produce attempted-action records, tool/provider request records, results, refusals, failures, exceptions, evidence references, and completion or termination reports. These are claims and artifacts of the Execution attempt, not proof of authorization or proof that an external effect occurred.

External effect requires its own explicit authority and enforcement gate; Execution cannot infer approval from an attempted action, a tool response, a provider response, or absence of an error.

## Gate

This proposal requires synthetic pressure testing before admission. It authorizes no implementation, Runtime operation, activation, deployment, credentials, provider interaction, live data, or external effect.
