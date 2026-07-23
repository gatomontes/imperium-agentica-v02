# B2.3 Local Environment Secret-Bridge Candidate 001

## Status

Repository-local nonproduction candidate. Merge gated.

## Implementation

`LocalEnvSyntheticSecretStoreBackend`:

- maps an opaque reference to exactly two admitted variable names;
- permits only `IMPERIUM_SYNTHETIC_*_B64` material variables;
- permits only `IMPERIUM_SYNTHETIC_*_VERSION` version variables;
- reads through an injected function;
- decodes canonical base64 into a temporary `Uint8Array`;
- returns the existing `{ material, classification, version }` contract;
- fixes classification to `SYNTHETIC_TEST_SECRET`;
- refuses missing, empty, malformed, noncanonical, implicit-latest, zero,
  negative, and reader-failure cases generically;
- reports `false` for source mutation because environment variables are not a
  revocable server record.

## Composition

Node may be started with:

```text
node --env-file=.env <entrypoint>
```

The composition root may then supply:

```text
readVariable: (name) => process.env[name]
```

That reader is not embedded in the adapter. The adapter remains independently
replaceable.

## Active-Surface Change

The active reference package removes the two OpenBao exports and adds:

```text
@imperium-agentica/runtime-reference/security/local-env
```

OpenBao files and evidence remain in the repository as inactive history.

## Non-Claims

No real credential, secure erasure, encryption, rotation, revocation,
production persistence, database, network, provider authentication,
deployment, or external effect is introduced.

