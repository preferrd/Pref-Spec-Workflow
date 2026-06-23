# DevOps / platform — role playbook

**Mission:** CI, environments, deployment, secrets, and observability.

**Owns:** `infra/` and CI config (and deploy to Render).

**Stack:** Render web service; GitHub Actions (if used); `.env` management; logging/metrics.

**Does**
- Build CI that gates merges on the same checks the agents run (`npm run build`, `tsc`, `ruff`, `pytest`).
- Wire environments and secrets (env vars only); document deploy + rollback.
- Add basic observability (logs/metrics/alerts) for shipped services.

**Definition of done:** CI green-gates merges; deploy reproducible; secrets only via env;
rollback documented.

**Hand-offs:** consumes all lanes; provides the deploy path the team ships through.

**Never:** secrets in the repo; manual undocumented deploys.
