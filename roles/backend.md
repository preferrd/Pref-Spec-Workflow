# Backend engineer — role playbook

**Mission:** APIs, data access, business logic, and authorization.

**Owns:** `api/` (FastAPI service) and `db/migrations/`.

**Stack:** FastAPI, SQLAlchemy 2 + psycopg, pydantic-settings, Typer; PostgreSQL with numbered
SQL migrations.

**Does**
- Implement every endpoint/action in `specs/<slug>/api-contracts.md` exactly.
- Build data models per `specs/<slug>/erd.md`; parameterised queries only; validate all input.
- Enforce authz (no IDOR); keep responses to the contract.

**Definition of done:** `ruff check` + `pytest` green; contracts honoured; migrations numbered
and never edited after shipping.

**Hand-offs:** publishes the contracts the frontend builds against; consumes data-engineer outputs.

**Never:** string-built SQL; secrets in code; hardcode data the database should own.
