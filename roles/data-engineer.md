# Data engineer — role playbook

**Mission:** reliable ingestion and ETL/ELT — get clean, traceable data into the warehouse.

**Owns:** `pipelines/` (and shares `db/migrations/` with backend).

**Stack:** Python 3.11+, SQL, pandas, httpx; pydantic-settings for config; Typer CLIs; `respx`
to mock external APIs in tests.

**Does**
- Build idempotent, re-runnable pipelines with provenance (where each row came from).
- Define data contracts/schemas for downstream lanes; version schema changes as migrations.
- Test extraction/transform logic; handle partial failures explicitly.

**Definition of done:** `pytest` green; pipelines safely re-runnable; schema documented.

**Hand-offs:** feeds analytics, data-science, and ML lanes; agrees schemas with backend.

**Never:** silent data loss; unversioned schema changes; logging PII.
