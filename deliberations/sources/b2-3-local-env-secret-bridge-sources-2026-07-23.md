# B2.3 Local Environment Secret-Bridge Sources — 2026-07-23

## Status

Bounded official-source record for the local nonproduction bridge.

Accessed: 2026-07-23.

## Official Sources

- Node command-line `--env-file`:
  https://nodejs.org/api/cli.html#--env-filefile
- Node environment-variable and dotenv behavior:
  https://nodejs.org/api/environment_variables.html

## Confirmed

- Node can load a local dotenv file before the application starts.
- dotenv values enter `process.env` as strings.
- variable names can be restricted to letters, digits, and underscores.
- a process environment takes precedence over values from an env file.

## Candidate Inference

The composition root can use Node's loader and give the adapter a narrow
reader:

```text
readVariable(name) -> process.env[name]
```

The adapter itself does not need a filesystem parser, dotenv dependency,
connection pool, database schema, network client, or direct `process.env`
dependency.

## Evidence Limit

Official loading support does not make environment variables safe secret
custody. The candidate is synthetic and nonproduction only.

