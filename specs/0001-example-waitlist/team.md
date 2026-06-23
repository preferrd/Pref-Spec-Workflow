# Team manifest — Waitlist (WORKED EXAMPLE)

- **Feature slug:** 0001-example-waitlist
- **Author:** design agent (tech-lead hat)
- **Date:** 2026-06-20

> Written by `/staff` from the plan. Note the restraint: a waitlist needs a frontend and a
> backend — nothing else. The ML and data roles stay un-staffed, so no `ml/` or `pipelines/`
> folders are created.

## Roster
| Role | Needed | Why / scope | Owns (folder) | Playbook |
|------|--------|-------------|---------------|----------|
| Frontend engineer | yes | Public `/waitlist` form + admin list/export UI | `web/` | `roles/frontend.md` |
| Backend engineer | yes | Join action, dedupe, rate limit, admin list, CSV export, schema | `api/` (+ `db/migrations/`) | `roles/backend.md` |
| Data engineer | no | No ingestion/ETL — a single table written directly | — | — |
| Data scientist | no | No modelling or analysis in scope | — | — |
| ML engineer | no | No model to train or serve | — | — |
| Data analyst | no | Funnel reporting deferred (a later feature) | — | — |
| DevOps / platform | no | Reuses the existing Render service; only one new env var (`SERVER_SALT`) | — | — |

## Integration plan
1. **Backend lane first:** migration `001_waitlist.sql` + the data layer, then the join action,
   admin list, and CSV export — publishing the contract in `api-contracts.md`.
2. **Frontend lane:** static form/page UI can start in parallel; integration of the join action
   waits on the backend contract.
3. Shared: `db/migrations/` (owned by backend here). Verify lane (test-security) runs last.

## Cross-lane dependencies & risks
- Frontend `WaitlistForm` submit → waits on backend `joinWaitlist` contract.
- Admin list/export UI → waits on `GET /admin/waitlist` + export route.
- Low risk: two lanes, one shared table, one contract surface.
