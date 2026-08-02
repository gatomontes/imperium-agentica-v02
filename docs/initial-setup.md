# Initial Setup

Run initial setup from the repository root:

```sh
npm install
npm run setup
```

The setup flow checks for `OPENAI_API_KEY` without displaying, logging, or
returning the credential. It checks the process environment first and then the
git-ignored repository-root `.env.local` file.

If the credential is absent, an interactive terminal asks for it one time with
input hidden and stores it in `.env.local` with owner-only file permissions.
Non-interactive environments must inject `OPENAI_API_KEY` into the process or
provision `.env.local` before rerunning setup.

This is bootstrap configuration, not transfer of credential custody to Isolde.
Isolde must never receive, inspect, log, or persist the credential. Provider
access remains behind the admitted Locksmith custody and Master Mason Runtime
boundaries.
