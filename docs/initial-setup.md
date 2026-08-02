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

After setup succeeds, run the bounded one-question live smoke test:

```sh
npm run live:isolde
```

The command accepts one Operator utterance, opens one Master Mason-controlled
OpenAI session, and presents exactly one Castellan-provided question through
Isolde. It does not accept an answer, evaluate relevance, execute a mission,
deploy an Operative, enable tools, or continue into a second turn. The provider
request disables response storage, and the returned question must match the
Castellan artifact exactly or the session refuses it.
