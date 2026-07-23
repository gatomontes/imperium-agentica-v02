# B2.2 Secret-Store Evaluation Run 001

## Subject

Product-family triage before an operating topology is selected.

## Result

```text
Evaluation gates defined: 22
Candidate families reviewed: 6
Provisional leader: OpenBao self-hosted
Final store selected: NO
Final topology selected: NO
Operator decisions required: 8
```

## Family Findings

### OpenBao Self-Hosted

`VIABLE — PROVISIONAL LEADER`

Documentation supports storage, versions, dynamic leases, policies, multiple auth methods, audit devices, integrated HA storage, and backup/restore.

Topology-dependent gates remain CONDITIONAL: workload bootstrap, unseal/root of trust, audit destinations, quorum or single-node failure, resource fit, and isolated restore.

### HashiCorp Vault Self-Hosted

`VIABLE ALTERNATIVE`

The capability model closely fits the required adapter and evidence boundary.

Current source licensing and enterprise-feature boundaries create an additional governance and dependency decision that OpenBao avoids.

### Infisical Self-Hosted

`CONDITIONAL ALTERNATIVE`

Machine identities and platform workflows are relevant.

The documented PostgreSQL, Redis, and application footprint is materially larger than a bare store process. Required audit logs are a paid self-hosted feature, so a free deployment cannot presently demonstrate SSE-008 without a separately proven substitute.

### Infisical Cloud

`CONDITIONAL MANAGED ALTERNATIVE`

Managed operation reduces local deployment duties.

Subscription tier, audit retention, external trust, availability contract, export/migration, and provider dependency remain unresolved.

### AWS, Azure, Or Google Managed Store

`CONDITIONAL FAMILY`

Each family provides managed secret storage, IAM integration, versions, logging, and lifecycle features.

No cloud is selected for Imperium. Scoring one as if workload identity, network, logging, and billing already lived in that cloud would manufacture fit.

### Static File, SOPS/age, Environment, Or Keychain

`FAIL AS PRIMARY RUNTIME STORE`

These may serve bootstrap or narrow local purposes later, but no reviewed evidence establishes the complete lease, exact revocation, fail-closed audit, outage, recovery, and concurrent-operation contract.

## Removal Pressure

- Remove audit evidence: violates SSE-008 and CTRL-006 direction.
- Remove topology: hides shared failure and recovery assumptions.
- Remove workload identity: moves a bootstrap secret beside the workload.
- Remove root-of-trust decision: leaves unseal and break-glass authority undefined.
- Select by feature count: confuses available capability with configured evidence.
- Select OpenBao now: invents the host, availability, unseal, and budget decisions.
- Select a managed cloud now: invents the deployment cloud and identity boundary.

## Conclusion

The product-family search is sufficiently narrow for operator decision.

The next evaluation must compare concrete realizations, not brands.