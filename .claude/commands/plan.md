---
description: Turn an approved spec into a technical plan and API contracts.
argument-hint: "<feature-slug>  (e.g. 0001-waitlist)"
allowed-tools: Task, Read, Write, Edit, Glob, Grep
---

Begin the **Plan** phase for feature: $1

Steps:
1. Confirm `specs/$1/` exists and read `prd.md`, `erd.md`, `design-system.md`, plus
   `memory/constitution.md` and `docs/stack-profile.md`.
2. Delegate to the **`design`** subagent to write, using `templates/plan.template.md` and
   `templates/api-contracts.template.md`:
   - `specs/$1/plan.md` — architecture, the concrete file/component breakdown mapped onto the
     stack profile, build sequence, and risks + mitigations.
   - `specs/$1/api-contracts.md` — every endpoint or server action: method, path, request,
     response, status codes, auth, and error shapes.
3. The plan must be buildable as-is: no hand-waving. Flag any conflict with the spec and resolve
   it in the spec, not silently in the plan.

Finish by telling the user the next step is `/tasks $1`.
