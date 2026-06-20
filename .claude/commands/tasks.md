---
description: Break the plan into an ordered, independently checkable task list.
argument-hint: "<feature-slug>  (e.g. 0001-waitlist)"
allowed-tools: Task, Read, Write, Edit, Glob, Grep
---

Begin the **Tasks** phase for feature: $1

Steps:
1. Read `specs/$1/plan.md`, `api-contracts.md`, `erd.md`, and `prd.md`.
2. Delegate to the **`design`** subagent to write `specs/$1/tasks.md` from
   `templates/tasks.template.md`. Each task must have: an ID, a one-line description, explicit
   acceptance criteria, the files it touches, an effort size (S/M/L), dependencies, and the
   owning agent (`coding` for build tasks; `test-security` for the verification tasks at the
   end). Order tasks by dependency so they can be executed top-to-bottom.
3. Use Markdown checkboxes (`- [ ]`) so progress can be tracked during `/implement`.

Finish by telling the user the next step is `/implement $1`.
