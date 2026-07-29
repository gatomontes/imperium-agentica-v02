# Persistent Reference Facade

`PersistentImperiumReference` wraps the direct-call `ImperiumReference` and records produced artifacts through `AsyncArtifactStore`.

The direct-call facade remains available for deterministic, database-independent use.

The persistent facade:

- stores petition and work artifacts on submission;
- supersedes stored petitions during clarification;
- stores operator responses and delivery records;
- supersedes delivery records during dispatch;
- delegates artifact meaning and workflow rules to the existing reference facade.

It assumes the predecessor supplied to a transition has already been stored. This keeps persistence failures visible and prevents an untracked transition from being represented as durable history.
