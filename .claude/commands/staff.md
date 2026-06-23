---
description: Compose the delivery team — pick the roles this feature needs and map them to folders.
argument-hint: "<feature-slug>  (e.g. 0001-waitlist)"
allowed-tools: Task, Read, Write, Edit, Glob, Grep
---

Begin the **Staff** phase for feature: $1

Decide WHO is needed to build this, before any tasks are cut.

Steps:
1. Pre-flight: `specs/$1/plan.md` must exist (staffing needs the architecture). If not, tell the
   user to run `/plan $1` first.
2. Read `specs/$1/plan.md`, `api-contracts.md`, `erd.md`, `product-brief.md`,
   `docs/stack-profile.md`, and the playbooks in `roles/`.
3. Delegate to the **`design`** subagent (tech-lead hat) to write `specs/$1/team.md` from
   `templates/team.template.md`. For EACH discipline in `roles/`, decide **Needed: yes/no** with a
   one-line reason; for needed roles, set the component folder it owns and its playbook path.
   **Activate only what this feature needs** — do not staff ML or data roles for a static page.
4. Write the **integration plan**: how the active lanes connect (shared `api-contracts.md`,
   shared `db/migrations/`), and which lanes can run in **parallel** vs which must wait.

Finish by listing the staffed roles and that the next step is `/tasks $1`.
