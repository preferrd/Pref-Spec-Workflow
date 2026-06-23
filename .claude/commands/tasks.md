---
description: Break the plan into an ordered, role-laned, checkable task list.
argument-hint: "<feature-slug>  (e.g. 0001-waitlist)"
allowed-tools: Task, Read, Write, Edit, Glob, Grep
---

Begin the **Tasks** phase for feature: $1

Steps:
1. Read `specs/$1/plan.md`, `api-contracts.md`, `erd.md`, `prd.md`, and `specs/$1/team.md` (the
   staffed roles). If `team.md` is missing, tell the user to run `/staff $1` first.
2. Delegate to the **`design`** subagent to write `specs/$1/tasks.md` from
   `templates/tasks.template.md`, **grouped into role lanes that match `team.md`**. Each task has:
   an ID, a one-line description, explicit acceptance criteria, the files it touches, an effort
   size (S/M/L), dependencies, an **owner = the role** (e.g. `frontend`, `backend`, `ml-engineer`,
   `data-engineer`; `test-security` for verification tasks), and the **path** (that role's folder
   from `team.md`).
3. Order lanes so cross-lane dependencies are respected (backend contracts before frontend
   integration; data-engineer tables before ML training). Mark which lanes can run in **parallel**.
4. Use Markdown checkboxes (`- [ ]`) so progress can be tracked during `/implement`.

Finish by telling the user the next step is `/implement $1`.
