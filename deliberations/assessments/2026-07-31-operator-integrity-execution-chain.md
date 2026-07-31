# Operator–Integrity–Execution Chain Deliberation

## Date

2026-07-31

## Status

Foundational deliberation recorded for review. No new semantic contract is admitted and no implementation or Runtime effect is authorized.

## Question

What constitutional chain must Imperium preserve between the human or external operator, institutional authority, credentials, tools, data, directives, operatives, and execution?

## Consolidated Finding

Imperium must govern not only agent behavior, but the integrity and authorization of the entire operator-to-execution chain.

The working chain is:

    operator identity
    → authority
    → directive integrity
    → operative integrity
    → credential access
    → tool access
    → data access
    → execution
    → auditable result

## Findings

### 1. Operators are authorized principals

An Operator is a user or other recognized principal acting through an Imperium instance. Operator identity and authentication are necessary to establish who is acting, but credentials alone do not grant unrestricted authority.

Therefore:

    identity ≠ authentication ≠ authority ≠ permission

The Operator remains external to the operative. An Operative is a mission-specific agent instance produced, bounded, and assigned for work.

### 2. Operators must be auditable

Imperium must preserve provenance for, at minimum:

- Operator identity;
- authentication and credential use;
- submitted requests and directives;
- approvals and dispositions;
- operative selection and assignment;
- tool and data access;
- external actions and returned effects;
- interruptions, failures, revocations, and overrides.

Auditability is not surveillance for its own sake. It is the ability to reconstruct who or what caused, authorized, attempted, altered, observed, or received a consequential event.

### 3. Credentials, tools, and data are separate domains

Locksmith governs credentials, keys, secrets, cryptographic material, custody, and sealing responsibilities.

Armory governs bounded tool or capability-envelope issuance. Armory does not become the custodian of secret material merely because a tool requires credentials.

Data requires a distinct apparatus still to be designed. That apparatus must address at least:

- data identity and classification;
- scope and purpose of access;
- provenance and custody;
- read, transform, and write permissions;
- retention and disposal;
- sanitization and release;
- integrity and freshness;
- audit and recourse.

The existing separation remains mandatory:

    need ≠ access
    reference ≠ custody
    capability ≠ secret access
    tool access ≠ tool use
    available match ≠ mission permission

### 4. Directives and Operatives require integrity verification

A directive and an Operative package are institutional artifacts whose identity and version must be verifiable before consequential use.

The integrity record should bind, as applicable:

- artifact identity;
- version;
- content digest or hash;
- signer or issuing authority;
- issuance time;
- validity interval;
- parent or source artifact;
- applicable doctrine and authority references;
- revocation or supersession state.

The Operative package must not be treated as the same artifact as the enduring persona specification. Recruitment transforms and packages an admitted specification for a mission; the resulting package requires its own integrity and lineage record.

Likewise, a directive must be verified as the current directive issued by the proper authority before it can govern an action.

### 5. Hash integrity has a bounded meaning

A hash, digest, signature, or equivalent fingerprint can establish that an artifact matches the version that was fingerprinted or signed.

It cannot by itself establish:

- that the artifact is true;
- that its source is trustworthy;
- that its issuer had authority;
- that its contents are safe;
- that its data is current;
- that its use is permitted;
- that its outcome is successful.

Therefore:

    hash integrity ≠ truth
    hash integrity ≠ authority
    hash integrity ≠ authorization
    hash integrity ≠ safety
    hash integrity ≠ mission success

Integrity verification must remain connected to authority, provenance, evidence, and current validity.

## Proposed Constitutional Chain

The following chain is proposed for cross-layer reconciliation:

    identity
    → authentication
    → authority
    → directive verification
    → operative verification
    → credential authorization
    → tool authorization
    → data authorization
    → action authorization
    → execution
    → provenance
    → disposition

A failure or unresolved conflict at any prerequisite must block, quarantine, or escalate the dependent action according to the applicable authority and procedure.

## Required Distinctions

| Artifact or subject | Governing concern | Non-equivalence |
|---|---|---|
| Operator | identity, authority, accountability | operator ≠ operative |
| Credential | authentication and secret access | credential ≠ authority |
| Tool | bounded capability | capability ≠ permission |
| Data | scope, provenance, custody, integrity | data access ≠ data truth |
| Directive | issued intent and current authority | directive integrity ≠ directive correctness |
| Operative package | mission-specific executable identity and lineage | operative integrity ≠ operative safety |
| Hash or signature | artifact integrity | integrity ≠ authorization |
| Execution record | attempted or completed effect | completion ≠ mission success |
| Audit record | reconstructability and accountability | auditability ≠ approval |

## Implications for Existing Institutions

- Castellan establishes mission directives and their authoritative lineage.
- Studium defines applicable boundaries, conduct, evidence, and conflict requirements.
- Foundry produces the persona specification and its conformance artifacts.
- Recruitment produces the mission-specific Operative package and preserves lineage.
- Garrison retains admitted packages and their state.
- Locksmith protects credentials, cryptographic material, seals, and custody.
- Armory issues bounded non-secret capabilities and tools.
- The data apparatus must govern data access and data custody without being silently absorbed by Armory or Locksmith.
- Muster coordinates controlled outbound movement.
- Execution records bounded attempts and effects.
- Lazaretto sanitizes returns before internal consumption.
- Provenance preserves the logical event chain and artifact lineage.
- Curia disposes and decides within its admitted authority.
- Observator/Custos inspects and reports without execution influence.
- Master Mason maintains Runtime condition but does not become semantic or institutional authority.

These mappings are subject to cross-layer reconciliation and do not themselves admit new implementation.

## Conclusions

This is a foundational governance chain, not a cosmetic refinement.

Imperium governs an institutional sequence in which identity, authority, artifact integrity, credential access, tools, data, directives, operatives, execution, and auditability must remain distinguishable and traceable.

The concise constitutional form is:

    verified identity
    → bounded authority
    → verified directive
    → verified operative
    → authorized credentials
    → authorized tools
    → authorized data
    → authorized action
    → auditable effect

The chain is not valid merely because each artifact has a hash. Hashes preserve integrity; institutional governance establishes authority, permission, evidentiary status, and accountability.

## Explicit Non-Claims

This deliberation does not claim:

- that the data apparatus has been designed;
- that hashing, signatures, or sealing mechanisms have been selected for Runtime;
- that any Operator, Operative, directive, credential, tool, or data-control implementation is live;
- that a hash proves truth, authority, authorization, safety, or mission success;
- that this record changes the active step, authorizes deployment, or permits external effects.

## Open Questions

- What is the canonical Operator identity and authentication boundary?
- Which institution issues or validates directive seals?
- Where is Operative-package sealing placed relative to Foundry, Recruitment, and Locksmith?
- What is the data apparatus, and where does it sit in the institutional map?
- Which authority validates current validity, revocation, and supersession?
- How are integrity failures represented, quarantined, and dispositioned?
- Which portions belong to the logical Provenance layer versus physical Runtime mechanisms?
