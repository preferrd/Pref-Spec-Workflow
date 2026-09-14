---
description: Turn an approved spec into a technical plan and API contracts.
argument-hint: "<feature-slug>  (e.g. 0001-waitlist)"
allowed-tools: Task, Read, Write, Edit, Glob, Grep
---

Begin the **Plan** phase for feature: $1. This is the first **engineering-owned** phase — it
normally starts from a Linear ticket created by `/handoff`, not from a live PM session.

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
4. **Carry the Linear ticket forward.** Check `prd.md`'s header for a `**Linear:**` line with a
   real ticket ID (from `/handoff`). If present, write that same line into `plan.md`'s header,
   replacing the template's `_pending_` placeholder — don't leave the new file looking like
   hand-off never happened.

Finish by telling the user the next step is `/staff $1`.
