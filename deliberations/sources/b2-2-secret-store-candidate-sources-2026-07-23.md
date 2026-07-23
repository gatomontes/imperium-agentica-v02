# B2.2 Secret-Store Candidate Sources — 2026-07-23

## Status

Bounded external source record for B2.2 evaluation.

Accessed: 2026-07-23.

External documentation informs candidate capabilities and operational constraints. It does not override Imperium contracts or select a store.

## OpenBao

- Project and license: https://github.com/openbao/openbao
- MPL-2.0 license text: https://github.com/openbao/openbao/blob/main/LICENSE
- Integrated storage: https://openbao.org/docs/internals/integrated-storage/
- Audit devices: https://openbao.org/docs/audit/
- Authentication methods: https://openbao.org/docs/concepts/auth/
- Policies: https://openbao.org/docs/concepts/policies/
- Dynamic-secret use cases: https://openbao.org/docs/use-cases/
- Configuration: https://openbao.org/docs/configuration/

Observed capabilities and constraints:

- OSI-approved MPL-2.0 project under open governance;
- encrypted secret storage and dynamic-secret lifecycles;
- integrated storage with HA and backup/restore workflows;
- multiple machine/human authentication methods;
- deny-by-default path policies;
- request/response audit devices;
- initialization, unseal, audit-destination, storage, and recovery operations remain operator responsibilities.

## HashiCorp Vault

- Architecture: https://developer.hashicorp.com/vault/docs/internals/architecture
- Integrated storage: https://developer.hashicorp.com/vault/docs/concepts/integrated-storage
- Audit devices: https://developer.hashicorp.com/vault/docs/audit
- Policies: https://developer.hashicorp.com/vault/docs/concepts/policies
- Tokens and root-token boundary: https://developer.hashicorp.com/vault/docs/concepts/tokens
- Seal/unseal: https://developer.hashicorp.com/vault/docs/concepts/seal
- Source repository: https://github.com/hashicorp/vault

Observed capabilities and constraints:

- mature storage, policy, auth, token, lease, audit, and HA model;
- audit-device failure can refuse API service when no configured device can record;
- integrated Raft storage supports HA and backup/restore;
- current repository source includes BUSL-1.1-licensed files;
- enterprise capabilities and licensing are separate decision surfaces.

## Infisical

- Deployment models: https://infisical.com/docs/documentation/getting-started/concepts/deployment-models
- Self-hosted requirements: https://infisical.com/docs/self-hosting/configuration/requirements
- Environment configuration: https://infisical.com/docs/self-hosting/configuration/envars
- Machine identities: https://infisical.com/docs/documentation/platform/identities/machine-identities
- Audit logs: https://infisical.com/docs/documentation/platform/audit-logs
- Enterprise self-hosting: https://infisical.com/docs/self-hosting/ee

Observed capabilities and constraints:

- managed and self-hosted deployment models;
- machine identities and secret-management platform capabilities;
- self-hosting requires PostgreSQL and Redis plus application resources;
- official small-deployment guidance starts at multiple application instances with 2 CPU / 4 GB per instance;
- audit logs are a paid feature, including for self-hosting;
- deployment simplicity and user experience do not remove the need to satisfy Imperium's evidence and fail-closed requirements.

## Cloud-Managed Families

### AWS Secrets Manager

- Overview: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
- Access control: https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access.html
- Best practices: https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html
- Pricing: https://aws.amazon.com/secrets-manager/pricing/

### Azure Key Vault

- Overview: https://learn.microsoft.com/azure/key-vault/general/overview
- Monitoring: https://learn.microsoft.com/azure/key-vault/general/monitor-key-vault
- Pricing: https://azure.microsoft.com/pricing/details/key-vault/

### Google Secret Manager

- Overview: https://cloud.google.com/secret-manager/docs/overview
- Audit logging: https://cloud.google.com/secret-manager/docs/audit-logging
- Rotation: https://cloud.google.com/secret-manager/docs/secret-rotation
- Best practices: https://cloud.google.com/secret-manager/docs/best-practices
- Pricing: https://cloud.google.com/secret-manager/pricing

Observed family-level capabilities and constraints:

- managed durability, IAM integration, versioning, logging, and lifecycle features;
- authentication and audit evidence inherit the selected cloud identity and logging systems;
- rotation behavior may require provider-specific functions or workflows;
- costs include secret operations and may include logging, key-management, networking, or rotation dependencies;
- selecting a managed family before selecting the deployment cloud creates avoidable provider coupling.

## Non-Store Tools

SOPS, age-encrypted files, environment variables, and operating-system keychains may protect particular material but are not treated here as complete primary Runtime stores.

They remain excluded from selection unless later evidence demonstrates the required machine identity, exact lease, revocation, audit, outage, recovery, and concurrent-operation behavior.

## Source Limit

Documentation claims are not empirical proof in Imperium's target environment.

Every selected candidate still requires a pinned version, threat review, isolated nonproduction deployment, adapter conformance, outage/recovery tests, and evidence review.