# B2.3 OpenBao Imperium Service-Port Executable Pressure Run 001

## Subject

Repository-local client executable and static OpenBao workflow/AppRole/policy definition.

## Result

```text
Focused service-port executable: 11 PASS / 0 FAIL
Combined OpenBao executable: 21 PASS / 0 FAIL
Changed JavaScript syntax: PASS
Conformance gates: 18 PASS / 0 FAIL at repository evidence level
OpenBao binary contacted: NO
Real credential: NO
Network contact: NO
Plugin or core fork: NO
```

## Pressure Findings

| Pressure | Result |
|---|---|
| arbitrary caller path | refused by exact binding fields and fixed transport operation |
| implicit latest version | refused |
| unknown secret reference | fails before transport |
| operation substitution | refused |
| correlation substitution | refused |
| version substitution | refused |
| enlarged output | refused |
| token-bearing output | refused |
| transport detail disclosure | suppressed |
| malformed response | refused and mutable bytes cleared |
| workflow path templating | absent |
| caller-supplied mount/path/field/version/RoleID | absent |
| wrong wrapping creation path | unwrap is conditionally skipped; later dependency must fail |
| reusable SecretID | configured out: one use |
| broad reusable client token | configured out: two uses and 30-second hard maximum |
| broad token policy | exact KV read and self-revoke only |
| output before revocation | static request/output order forbids it |
| plugin or core-fork assumption | absent |

## Deferred Empirical Gates

The repository cannot yet establish:

- whether OpenBao 2.6.1 accepts the exact HCL;
- whether skipped unwrap makes the dependent login fail closed;
- whether the two-use token completes read then self-revoke;
- whether workflow history, audit devices, and failure output meet redaction requirements;
- whether restart, seal, standby, timeout, and partial failure remain fail closed.

These are not repository test failures. They are the defined scope of pinned-binary compatibility and later B2.4 operational pressure.

## Conclusion

The executable client and static OpenBao definition satisfy the bounded candidate contract.

They are coherent for merge without claiming live workflow compatibility.
