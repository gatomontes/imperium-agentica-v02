# B2.3 OpenBao Imperium Service-Port Executable Conformance Plan 001

## Status

Candidate plan exercised by repository-local deterministic tests and static artifact pressure.

## Gates

| ID | Required behavior |
|---|---|
| ISPC-001 | exact OpenBao 2.6.1 and workflow API pin |
| ISPC-002 | opaque reference resolves only to operation ID and positive version |
| ISPC-003 | transport request contains only operation and correlation IDs |
| ISPC-004 | no caller-controlled OpenBao path, mount, field, version, policy, workflow, or token |
| ISPC-005 | response operation, correlation, and version match exactly |
| ISPC-006 | response data contains exactly four admitted fields |
| ISPC-007 | token-bearing, enlarged, malformed, and failed responses refuse generically |
| ISPC-008 | mutable response bytes clear on success and refusal |
| ISPC-009 | workflow lookup precedes unwrap |
| ISPC-010 | exact wrapping creation path gates unwrap |
| ISPC-011 | AppRole login precedes exact KV read |
| ISPC-012 | token self-revocation follows read and precedes output |
| ISPC-013 | SecretID use count is one and token use count is two |
| ISPC-014 | token policy contains exact read and self-revoke paths only |
| ISPC-015 | existing asynchronous acquisition result contract is preserved |
| ISPC-016 | synchronous one-use consumption and provider dispatch remain unchanged |
| ISPC-017 | no network, environment, filesystem, SDK, credential header, instance, or real material |
| ISPC-018 | pinned-binary compatibility remains an explicit later gate |

## Required Evidence

1. focused service-port executable: all tests pass;
2. combined OpenBao executable: all tests pass;
3. changed JavaScript syntax: pass;
4. package export: exact;
5. workflow, policy, and AppRole contract: statically fixed;
6. no production manifest or semantic admission change;
7. review records residual binary, audit, memory, and transport uncertainty.

## Merge Rule

Passing this plan permits only the repository candidate merge.

It does not authorize an OpenBao binary, process, credential, network contact, plugin, fork, deployment, Runtime action, or external effect.
