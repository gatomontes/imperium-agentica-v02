# Implementation Increment 017 — Senate Core-Doctrine Stewardship

## Scope

This increment implements Senate's bounded legislative kernel for Core Imperium
Doctrine.

The kernel:

- enacts Core Doctrine only from a complete bill with a Senate decision
  reference;
- preserves immutable identity, edition, version, source, and supersession
  lineage;
- refuses incomplete authority, duplicate provisions, foreign doctrine, and
  amendment of non-current doctrine;
- emits a Doctrine Propagation Notice requiring prospective adoption or
  mandatory revalidation by named Office profiles.

## Evidence

Focused Senate tests: 3/3 PASS.

Adjacent artifact, schema, and public-API regression set: 11/11 PASS.

The new Senate surface independently passes TypeScript checking. Current
`main` retains separately reproduced transport/typecheck defects outside this
increment.

## Boundary

No actual Core Doctrine content is enacted by the test fixtures. No Office
profile is changed automatically. Senate does not perform Office application,
judgment, mission formation, Persona forging, Runtime operation, credential
use, Colosseum handoff, deployment, or external effect.
