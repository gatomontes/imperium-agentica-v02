# DR-003 — Select an OpenBao-Hosted Imperium Service Port

## Date

2026-07-23

## Status

Superseded as the active B2.3 implementation path by DR-004.

The historical decision merged through PR #71 and squash commit `06b57e2a3fbce5cce311bfd5a312ca601716f973`. Its executable candidate merged through PR #72 and squash commit `b280ed2f92beadc7552a8de5f4e9fa541b9d007e`.

No OpenBao mechanism was deployed or operationally admitted.

## Supersession Note

Pinned-binary pressure found that OpenBao 2.6.1 workflow CAS could not receive the parsed CAS value because `handleWorkflowsUpdate` shadows the pointer passed to the workflow store. The complete service-port sequence was not established.

The operator then established the more general boundary: Locksmith is the sole accessor to whatever security-persistence device is eventually selected. DR-004 therefore supersedes OpenBao as the active implementation path and defers device selection until the Locksmith boundary is executable.

The complete historical decision remains below as evidence.

## Question

How should Imperium cross the OpenBao authentication boundary without receiving or retaining a reusable OpenBao token?

## Historical Decision

OpenBao shall expose a narrow Imperium Service Port that performs one admitted credential-acquisition operation inside OpenBao and returns only the selected secret material and minimum non-secret result metadata.

The first realization target is an OpenBao 2.6.1 workflow over the supported Profiles engine. A checksum-pinned external plugin is the fallback if the workflow surface cannot enforce the complete contract. An OpenBao core fork requires evidence that both supported mechanisms lack a required primitive.

This is not a general command port. Runtime cannot supply an arbitrary OpenBao path, method, policy, workflow, template, field selector, or token.

## Historical Port Contract

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

DR-002 remains controlling for the historical OpenBao store, version family, isolated single-node nonproduction topology, manual Shamir boundary, audit requirement, backup, exposure, and no-running-instance state. DR-004 supersedes that selection for active implementation.

This historical decision superseded only the part of DR-002's bootstrap target that allowed the resulting OpenBao token to be process-confined in Imperium. The token was intended to remain inside OpenBao.

The non-secret RoleID and response-wrapped, short-lived, single-use SecretID design were provisional internal inputs to the service port.

## Evidence

- OpenBao 2.6.x Profiles documentation.
- OpenBao 2.6.x Workflows API documentation.
- OpenBao 2.6.x external plugin architecture and management documentation.
- OpenBao AppRole and response-wrapping documentation.
- Operator direction at the time: “Option 4- modify OpenBao with a Imperium-service-port that does what we say.”
- `tests/runtime/b2-3-openbao-pinned-binary-pressure-run-001.md`.

## Historical Explicit Non-Decisions

This decision did not:

- authorize an OpenBao instance, network contact, credential, token, RoleID, SecretID, secret, VPS, deployment, or external effect;
- establish that the proposed workflow sequence ran successfully against OpenBao 2.6.1;
- approve a public or generally unauthenticated endpoint;
- approve arbitrary caller-selected secret paths or operations;
- select or implement an external plugin;
- authorize an OpenBao core fork;
- close B2.3 or admit B2.

## Supersession Conditions

DR-004 controls current work. Reconsider this historical implementation only after the Locksmith sole-accessor boundary is admitted and executable, and only if a later device-selection process selects OpenBao.
