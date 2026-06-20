---
description: Build the feature from its task list (delegates to the coding agent).
argument-hint: "<feature-slug> [optional task-id]"
allowed-tools: Task, Read, Write, Edit, Bash, Glob, Grep
---

Begin the **Implement** phase for feature: $1   (optional single task: $2)

## Pre-flight: design-system gate (MANDATORY for any UI work)
Before building anything that renders or styles UI, confirm ALL of:
1. `design-system/tokens.css` exists (not just `tokens.example.css`).
2. `design-system/components.md` exists.
3. `design-system/INTAKE.md` contains the line `Accepted: yes`.

If any are missing: **do not build UI.** Build only non-UI tasks (migrations, pure
data/services) if present, then STOP and tell the user to run `/design-system` first. Never
invent styling to get around the gate.

## Build
1. Read `specs/$1/tasks.md` (work queue) plus `api-contracts.md`, `erd.md`,
   `design-system.md`, the foundation in `design-system/`, `memory/constitution.md`, and
   `docs/stack-profile.md`.
2. Delegate to the **`coding`** subagent. If a task id ($2) was given, build only that task;
   otherwise build all unblocked tasks in order.
3. The coding agent must: consume only tokens/components from `design-system/` (no ad-hoc
   colors/spacing), match the contracts and stack profile exactly, build/lint before committing
   (`npm run build` + `tsc --noEmit`, or `ruff check` + `pytest`), commit in small steps with
   the `Co-Authored-By: Claude` trailer, and check off each task in `tasks.md` with the commit.
   If reality forces a deviation from the spec, STOP and surface it.

Finish by reporting which tasks are done and that the next step is `/verify $1`.
