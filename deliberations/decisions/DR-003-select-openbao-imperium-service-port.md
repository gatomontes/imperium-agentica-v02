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

This record remains historical evidence.

## Question

How should Imperium cross the OpenBao authentication boundary without receiving or retaining a reusable OpenBao token?

## Historical Decision

OpenBao would expose a narrow Imperium Service Port that performed one admitted credential-acquisition operation inside OpenBao and returned only the selected secret material and minimum non-secret result metadata.

The first realization target was an OpenBao 2.6.1 workflow over the supported Profiles engine. A checksum-pinned external plugin was the fallback if the workflow surface could not enforce the complete contract. An OpenBao core fork required evidence that both supported mechanisms lacked a required primitive.

This was not a general command port. Runtime could not supply an arbitrary OpenBao path, method, policy, workflow, template, field selector, or token.

## Historical Port Contract

For one exact server-side binding, the port would:

1. accept a one-use bootstrap proof and minimum non-secret correlation data;
2. validate all declared inputs before an OpenBao operation began;
3. unwrap the one-use bootstrap proof inside OpenBao;
4. authenticate the exact AppRole inside OpenBao;
5. keep the resulting OpenBao token inside the workflow execution;
6. read one statically selected KV v2 mount, path, field, and exact version;
7. revoke the internal token before successful output;
8. return only the selected value and minimum non-secret version/correlation metadata;
9. refuse generically on any validation, unwrap, login, read, version, revocation, or output failure.

## Evidence

- OpenBao 2.6.x Profiles, Workflows, external plugin, AppRole, and response-wrapping documentation.
- Operator direction at the time: “Option 4- modify OpenBao with a Imperium-service-port that does what we say.”
- `tests/runtime/b2-3-openbao-pinned-binary-pressure-run-001.md`.

## Explicit Non-Claims

This historical decision never authorized or established an OpenBao instance, live credential, deployment, or operationally admitted mechanism.

## Supersession Conditions

DR-004 controls current work. Reconsider this historical implementation only after the Locksmith sole-accessor boundary is admitted and executable, and only if a later device-selection process selects OpenBao.
