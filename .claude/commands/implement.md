---
description: Build the feature across role lanes — tech-lead orchestration (delegates to coding).
argument-hint: "<feature-slug> [optional role or task-id]"
allowed-tools: Task, Read, Write, Edit, Bash, Glob, Grep
---

Begin the **Implement** phase for feature: $1   (optional single role/task: $2)

## Pre-flight (MANDATORY)
- **Staffing:** `specs/$1/team.md` must exist. If not, STOP and tell the user to run `/staff $1`.
- **Design-system gate (any UI work):** confirm `design-system/tokens.css` and
  `design-system/components.md` exist and `design-system/INTAKE.md` contains `Accepted: yes`.
  If not, build only non-UI lanes/tasks and STOP the frontend lane, telling the user to run
  `/design-system`. Never invent styling to get around the gate.

## Build — tech-lead orchestration
1. Read `specs/$1/tasks.md` (work queue), `team.md` (roster + folders + integration plan),
   `api-contracts.md`, `erd.md`, `design-system.md`, the `design-system/` foundation,
   `memory/constitution.md`, and `docs/stack-profile.md`.
2. Delegate to the **`coding`** subagent acting as **tech lead**. For each ACTIVE role lane in
   `team.md`, it adopts that role's playbook (`roles/<role>.md`) and works ONLY within that
   role's folder (e.g. `web/`, `api/`, `ml/`, `pipelines/`). If `$2` names a role or task, build
   just that.
3. Respect the integration plan: start lanes whose dependencies are met; independent lanes may
   run in **parallel**; a lane that consumes another lane's contract waits for it.
4. In every lane the coding agent must: follow the playbook's definition-of-done, match
   `api-contracts.md` + `erd.md`, use only `design-system/` tokens/components for UI, build/lint
   before each commit (`npm run build` + `tsc --noEmit`, or `ruff check` + `pytest`), commit in
   small steps with the `Co-Authored-By: Claude` trailer, and check off each task in `tasks.md`.
   If reality forces a deviation from the spec, STOP and surface it.

## Track
After building (or after each lane), update the tracking layer (or run `/track $1`):
- Append a categorized entry to `CHANGELOG.md` under `[Unreleased]` (usually **Added** for a new
  feature) — one line per change with the feature slug and commit hash.
- In `docs/progress.md`: tick the **Impl** box on the row for `$1` and append a filled post-run
  checklist (from `templates/post-run-checklist.template.md`) to the Run log.

Finish by reporting the lanes/tasks done, the tracking checklist, and that the next step is
`/verify $1`.
