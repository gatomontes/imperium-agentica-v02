# DR-004 — Select a Local Environment Nonproduction Secret Bridge

## Date

2026-07-23

## Status

Recorded decision candidate. Implementation evidence is under review and merge
remains gated.

## Question

What is the least complex persistence/source mechanism needed to continue B2.3
without making a production secret-manager decision?

## Decision

Use a private local `.env` file as the temporary nonproduction source behind a
replaceable Runtime-owned adapter.

The active adapter accepts only:

- an opaque secret reference;
- a fixed binding to one Imperium-prefixed base64 material variable;
- a fixed binding to one explicit positive version variable;
- an injected variable reader supplied by the composition root.

The adapter does not read files or `process.env` directly. Node may load the
private `.env` at process startup, and the composition root may project only
the bound variables into the adapter reader.

## Boundary

The existing contract remains:

```text
opaque reference
  -> source adapter acquisition
  -> bound, expiring, one-use Runtime lease
  -> synchronous consumption
  -> synchronous provider dispatch
```

The `.env` file is a local configuration source, not authority, policy,
governance, a provider request, or a Runtime lease.

## OpenBao Disposition

DR-002's OpenBao selection and DR-003's Imperium Service Port are deferred and
superseded as the active B2.3 implementation path.

Their records, source evidence, executable candidates, and tests remain
historical evidence. They are removed from the active reference-package export
surface but are not silently deleted.

OpenBao may be reconsidered when Imperium reaches a stage that requires real
credential custody, rotation, audit, multi-process access, or production
deployment.

## Evidence

- Operator direction: “I’m seeing that OpenDao integration, even definition,
  is becoming an unnecessary complexity at this stage.”
- Operator direction: “Or even simpler, local .envs”.
- OpenBao 2.6.1 pinned-binary pressure confirmed that workflow CAS cannot be
  used because the handler shadows the parsed CAS pointer.
- Node supports loading `.env` files at the composition root with
  `--env-file`.

## Security Limits

Environment variables are process strings. They may be inherited by child
processes, exposed by debugging or process inspection, copied by the runtime,
and cannot be securely erased by this adapter.

Therefore:

- only `SYNTHETIC_TEST_SECRET` material is admitted in this increment;
- `.env` is ignored by Git;
- `.env.example` contains synthetic material only;
- no production eligibility, encryption at rest, rotation, revocation,
  external assurance, or real credential safety is claimed.

## Explicit Non-Decisions

This decision does not:

- select `.env` as a production secret store;
- authorize real credentials;
- approve PostgreSQL as a secret store;
- delete or invalidate historical OpenBao evidence;
- change the lease, broker, provider, authority, or semantic contracts;
- close B2.3 or admit B2.

## Supersession Conditions

Replace this bridge before any real credential, shared host, multi-process
custody, non-local deployment, production admission, or B4 integrated staging.

