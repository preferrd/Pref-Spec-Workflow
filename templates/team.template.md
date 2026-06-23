# Team manifest — {{Feature name}}

- **Feature slug:** NNNN-slug
- **Author:** design agent (tech-lead hat)
- **Date:** {{YYYY-MM-DD}}

> Written by `/staff` from the plan. Activates ONLY the roles this feature needs. The coding
> agent (tech lead) reads this during `/implement` and runs each active role's lane using its
> playbook, scoped to the folder below.

## Roster
| Role | Needed | Why / scope | Owns (folder) | Playbook |
|------|--------|-------------|---------------|----------|
| Frontend engineer | yes/no | … | `web/` | `roles/frontend.md` |
| Backend engineer | yes/no | … | `api/` | `roles/backend.md` |
| Data engineer | yes/no | … | `pipelines/` | `roles/data-engineer.md` |
| Data scientist | yes/no | … | `research/` | `roles/data-scientist.md` |
| ML engineer | yes/no | … | `ml/` | `roles/ml-engineer.md` |
| Data analyst | yes/no | … | `analytics/` | `roles/data-analyst.md` |
| DevOps / platform | yes/no | … | `infra/` | `roles/devops.md` |

## Integration plan
<!-- How the active lanes connect: shared contracts (api-contracts.md), shared schema
     (db/migrations), and the order. Note which lanes can run in PARALLEL vs which must wait. -->

## Cross-lane dependencies & risks
<!-- e.g. "frontend waits on backend contracts for /waitlist"; "ml waits on data-engineer feature table". -->
