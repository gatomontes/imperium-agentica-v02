# Provider Intervention Ledgers

## Status

Draft Provenance specialization.

Native concern: Provenance.

Origin:

```text
layers/cognitive/production/provider-intervention-ledgers.md
Cognitive Baseline CB-001
```

Candidate target baseline: `PB-001`.

This draft specializes `provenance-contract.md`.

Armory and Locksmith remain the cognitive owners and producers of their respective records.

Tool and Access authority remain native to the Authority layer.

## Purpose

Provider Intervention Ledgers preserve staged provider observations for one exact mission and ticket without inferring later stages or mission judgment.

```text
Armory Intervention Ledger
Locksmith Intervention Ledger
```

## Intervention Subject

Minimum semantic content:

```text
Intervention identity and version
Mission identity
Deployment identity
Operative identity and version
Operative Binding identity
Ticket identity
Provider identity
Intervention class
Requested action and scope
Request ordering reference
Tool or Access Grant reference
Entitlement observation
Credential-resolution observation
Authentication observation
Operation-submission observation
Operation-completion observation
Result-delivery observation
Provider-observed result reference
Refusal stage and class
Failure stage and class
Unknown or pending stages
Response ordering reference
Correlation identity
Cross-mission reference when explicitly admitted
Applicable native contract references
Producer responsibility
Supersedes
```

Credential values are never part of the ledger.

## Staged Observation Vocabulary

### Entitlement

```text
NOT_EVALUATED
AUTHORIZED
DENIED
EXPIRED
UNKNOWN
```

This records the provider's observed entitlement stage. It does not independently validate the Authority Grant.

### Credential Resolution

```text
NOT_REQUIRED
NOT_ATTEMPTED
RESOLVED
FAILED
UNKNOWN
```

### Authentication

```text
NOT_REQUIRED
NOT_ATTEMPTED
ACCEPTED
REJECTED
UNKNOWN
```

### Operation Submission

```text
NOT_ATTEMPTED
ACCEPTED
REJECTED
UNKNOWN
```

### Operation Completion

```text
NOT_OBSERVED
PENDING
COMPLETED
FAILED
UNKNOWN
```

### Result Delivery

```text
NOT_EXPECTED
PENDING
DELIVERED
PARTIAL
FAILED
UNKNOWN
```

## Non-Inference Rules

An Intervention Ledger must not contain an unqualified mission-level `success` or `failure`.

```text
entitlement AUTHORIZED
≠ authentication ACCEPTED

authentication ACCEPTED
≠ operation COMPLETED

operation COMPLETED
≠ result DELIVERED

result DELIVERED
≠ mission objective satisfied
```

A later observation does not retroactively redefine an earlier one.

Absence of observation is not success or failure.

Unknown, pending, not attempted, not required, and not observed remain distinct.

## Correlation

Every record must cite the applicable Mission Correlation and Isolation Contract and exactly match:

- Mission Identity
- Deployment identity
- Operative Binding identity
- ticket identity
- provider identity
- requested operation identity

Same provider, operation, content, or timestamp proximity cannot merge interventions.

## Corrections And Supersession

Records are append-preserving.

Corrections create a new version and `SUPERSEDES` assertion.

Historical observations are not overwritten.

A correction may change the recorded observation while preserving what was originally observed and when.

## Operational And Observability References

The cognitive operational path remains owned by the relevant entities:

```text
Operative
→ Barbican
→ Armory / Locksmith
→ result or refusal
→ Operative
```

This ledger contract records observations along that path. It does not define the path.

The Chief of Staff may receive a mission-scoped read-only audit view only under applicable cognitive responsibility and Access authority.

The view preserves source ledger identity and must not alter the record.

## Authority Boundary

The ledger may record:

- Authority Grant reference
- provider entitlement observation
- refusal or expiry observation

It does not decide whether the Principal was competent, the grant effective, or the mission action authorized.

## Proof Boundary

Provider-stage provenance does not prove:

- substantive evidence truth
- operative compliance
- mission success
- completion
- closure
- release

## Non-Admissions

This draft does not admit:

- provider execution runtime
- ledger storage
- append-only database implementation
- credential custody
- Tool or Access authority
- CoS access authority
- mission judgment
- universal audit infrastructure
- procedure

## Boundary Maxim

```text
Providers act and observe.
Ledgers preserve staged observations.
Provenance prevents inference.
Authority remains separate.
Curia judges mission meaning elsewhere.
```
