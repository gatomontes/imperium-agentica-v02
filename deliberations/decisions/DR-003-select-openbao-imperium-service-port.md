# DR-003 — Select an OpenBao-Hosted Imperium Service Port

## Date

2026-07-23

## Status

Recorded decision candidate. Not merged, implemented, deployed, or operationally admitted.

## Question

How should Imperium cross the OpenBao authentication boundary without receiving or retaining a reusable OpenBao token?

## Decision

OpenBao shall expose a narrow Imperium Service Port that performs one admitted credential-acquisition operation inside OpenBao and returns only the selected secret material and minimum non-secret result metadata.

The first realization target is an OpenBao 2.6.1 workflow over the supported Profiles engine. A checksum-pinned external plugin is the fallback if the workflow surface cannot enforce the complete contract. An OpenBao core fork requires evidence that both supported mechanisms lack a required primitive.

This is not a general command port. Runtime cannot supply an arbitrary OpenBao path, method, policy, workflow, template, field selector, or token.

## Port Contract

For one exact server-side binding, the port shall:

1. accept a one-use bootstrap proof and minimum non-secret correlation data;
2. validate all declared inputs before an OpenBao operation begins;
3. unwrap the one-use bootstrap proof inside OpenBao;
4. authenticate the exact AppRole inside OpenBao;
5. keep the resulting OpenBao token inside the workflow execution;
6. read one statically selected KV v2 mount, path, field, and exact version;
7. revoke the internal token before successful output;
8. return only the selected value and minimum non-secret version/correlation metadata;
9. refuse generically on any validation, unwrap, login, read, version, revocation, or output failure.

One workflow definition per admitted binding/version is preferred over caller-controlled path construction. The workflow management record shall require check-and-set updates.

## Credential Boundary

The following remain credential material and shall not be emitted, logged, serialized into Runtime artifacts, or returned by the port:

- response-wrapping token;
- SecretID;
- OpenBao client token;
- token accessor;
- policy list;
- workflow request/response history;
- workflow trace;
- secret value outside the existing one-use Runtime lease.

The response-wrapping token remains a one-use bootstrap bearer and therefore remains inside the Runtime custody path until presented to the port.

## Execution Surface

The candidate expects unauthenticated workflow execution only in the OpenBao protocol sense: the call carries no pre-existing OpenBao client token. It is not anonymous authorization. The one-use wrapped bootstrap proof is required.

The endpoint must remain on the private/restricted OpenBao API selected by DR-002. Global unauthenticated-workflow support may be enabled only when the exact Imperium workflow is configured to allow it and all other unauthenticated workflows are refused.

The workflow trace endpoint is credential-bearing. Runtime shall have no capability to call it. Operators shall not trace a production-material execution.

## Relationship to DR-002

DR-002 remains controlling for the selected OpenBao store, version family, isolated single-node nonproduction topology, manual Shamir boundary, audit requirement, backup, exposure, and no-running-instance state.

This decision supersedes only the part of DR-002's bootstrap target that allowed the resulting OpenBao token to be process-confined in Imperium. The token is now intended to remain inside OpenBao.

The non-secret RoleID and response-wrapped, short-lived, single-use SecretID design remain provisional internal inputs to the service port and may still be replaced under threat pressure.

## Evidence

- OpenBao 2.6.x Profiles documentation.
- OpenBao 2.6.x Workflows API documentation.
- OpenBao 2.6.x external plugin architecture and management documentation.
- OpenBao AppRole and response-wrapping documentation.
- Operator direction: “Option 4- modify OpenBao with a Imperium-service-port that does what we say.”

## Explicit Non-Decisions

This decision does not:

- authorize an OpenBao instance, network contact, credential, token, RoleID, SecretID, secret, VPS, deployment, or external effect;
- claim that the proposed workflow sequence has run against OpenBao 2.6.1;
- approve a public or generally unauthenticated endpoint;
- approve arbitrary caller-selected secret paths or operations;
- select or implement an external plugin;
- authorize an OpenBao core fork;
- close B2.3 or admit B2.

## Supersession Conditions

Reopen this decision if executable pressure shows that the service port cannot enforce fixed operation binding, one-use bootstrap, internal token confinement, exact versioning, minimum output, trace denial, generic refusal, revocation-before-output, audit completeness, or outage safety.
