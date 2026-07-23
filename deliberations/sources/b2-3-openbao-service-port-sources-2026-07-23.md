# B2.3 OpenBao Imperium Service-Port Sources — 2026-07-23

## Status

Bounded official-source record for the service-port decision candidate.

Accessed: 2026-07-23.

## Official Sources

- Profiles engine: https://openbao.org/docs/concepts/profiles/
- Workflows API: https://openbao.org/api-docs/system/workflows/
- External plugin architecture: https://openbao.org/docs/plugins/plugin-architecture/
- External plugin management: https://openbao.org/docs/plugins/plugin-management/
- AppRole authentication: https://openbao.org/docs/auth/approle/
- Response wrapping: https://openbao.org/docs/concepts/response-wrapping/

## Supported-Mechanism Findings

OpenBao 2.6.x documents that:

- workflows provide simplified entrypoints over multiple OpenBao APIs;
- workflow inputs are declared and validated before execution;
- requests execute synchronously and sequentially;
- unexpected request failure stops later workflow steps;
- prior response fields can supply a token for a later request;
- workflow output is explicitly selected by the workflow author;
- authenticated and unauthenticated workflow execution endpoints exist;
- unauthenticated workflow execution requires both a server configuration option and a per-workflow allowance;
- workflow traces contain OpenBao tokens and additional secrets;
- external plugins run as separately managed processes over mutually authenticated gRPC;
- plugin binaries are registered with a SHA-256 checksum before execution.

## Design Inference

The documentation supports investigating this server-side sequence:

```text
wrapped one-use bootstrap proof
  -> unwrap
  -> AppRole login
  -> internal client token
  -> exact KV v2 read
  -> token revocation
  -> selected output only
```

This is an architectural inference from documented workflow composition. It is not evidence that the exact sequence, failure ordering, audit output, token-use accounting, or response minimization has executed successfully on OpenBao 2.6.1.

## Security Constraint

Workflow history and traces must be treated as credential-bearing. The trace endpoint must not be granted to Imperium Runtime, and real-material executions must not be traced.

## Evidence Limit

Documentation does not prove:

- the proposed HCL or JSON workflow;
- AppRole and response-wrapping behavior inside that workflow;
- token revocation before output;
- audit redaction;
- private-listener confinement;
- rate limiting;
- sealed, standby, timeout, restart, or partial-failure behavior;
- plugin necessity;
- live compatibility or production safety.

Those remain B2.3 executable pressure and B2.4 empirical work.
