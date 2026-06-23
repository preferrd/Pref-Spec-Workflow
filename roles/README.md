# roles/ — discipline playbooks (staffed on demand)

The build phase is run by the **coding agent acting as a tech lead**. It does not assume a fixed
team — it reads `specs/NNNN-slug/team.md` (written by `/staff`) and, for each role the feature
actually needs, adopts that role's playbook here and works inside that role's component folder.

A static marketing page staffs only `frontend`. A churn predictor staffs `data-engineer`,
`data-scientist`, `ml-engineer`, and `backend`. You only pay for the roles the work requires.

## Roles → component folder (the default map)
| Role | Playbook | Owns (folder) |
|------|----------|---------------|
| Frontend engineer | `roles/frontend.md` | `web/` |
| Backend engineer | `roles/backend.md` | `api/` (+ `db/migrations/`) |
| Data engineer | `roles/data-engineer.md` | `pipelines/` (+ `db/migrations/`) |
| Data scientist | `roles/data-scientist.md` | `research/` |
| ML engineer | `roles/ml-engineer.md` | `ml/` |
| Data analyst | `roles/data-analyst.md` | `analytics/` |
| DevOps / platform | `roles/devops.md` | `infra/` (+ CI) |

Folders are organised by **component**, not job title — `team.md` records which role owns which
path. Add a discipline by dropping a new `roles/<name>.md` and referencing it from `team.md`; no
other rewiring needed.
