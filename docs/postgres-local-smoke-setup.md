# Local PostgreSQL Smoke Setup

This is for local verification only. Do not commit credentials or local environment files.

## Create a test database

Using `psql`:

```sql
CREATE DATABASE imperium_test;
```

Apply the schema:

```powershell
psql -d imperium_test -f migrations/001_artifact_envelopes.sql
```

Set connection variables in the local shell:

```powershell
$env:PGHOST = "localhost"
$env:PGPORT = "5432"
$env:PGDATABASE = "imperium_test"
$env:PGUSER = "postgres"
$env:PGPASSWORD = "<local-password>"
```

The PostgreSQL client library reads these standard variables. The repository does not provide defaults and does not persist them.

## Verification boundary

The smoke check should verify:

1. schema creation succeeds;
2. one artifact can be inserted and read;
3. correlation history returns deterministic order;
4. supersession commits predecessor and successor together;
5. a failed supersession leaves the predecessor unchanged.

The normal `npm test` suite remains database-independent. PostgreSQL verification is an explicit local step until CI database provisioning is authorized.
