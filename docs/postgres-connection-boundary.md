# PostgreSQL Connection Boundary

The PostgreSQL adapter receives an already-configured `pg.Pool`. It does not:

- read `.env` files;
- embed credentials;
- create databases;
- run migrations;
- choose pool sizing;
- log connection strings;
- expose connection details through artifacts.

The host application owns pool construction and supplies standard PostgreSQL configuration through its runtime environment or secret manager.

Recommended separation:

1. migration/bootstrap process owns schema creation;
2. host process owns pool construction;
3. `PostgresArtifactStore` owns artifact persistence semantics;
4. domain services own artifact meaning and workflow.

For local development, standard `PG*` variables may be used. Production secret management and pool sizing remain deployment decisions.
