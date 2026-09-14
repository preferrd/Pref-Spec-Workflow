---
description: Turn an ACCEPTED product brief into a spec set — PRD, ERD/data model, design system.
argument-hint: "<feature-slug>  (e.g. 0001-waitlist)"
allowed-tools: Task, Read, Write, Edit, Glob, Grep
---

Begin the **Specify** phase for feature: $1

## Pre-flight: discovery gate (MANDATORY)
Confirm `specs/$1/product-brief.md` exists and contains the line `Discovery: accepted`.
If it does not: **STOP**. Tell the user to define what to build first by running
`/discover` (and to accept the brief). Do not write a PRD against an undefined problem.

## Specify
1. Read `specs/$1/product-brief.md` (the source of truth for *what*), plus
   `memory/constitution.md`, `docs/stack-profile.md`, and the `design-system/` status. If
   `design-system/INTAKE.md` is not yet `Accepted: yes`, remind the user it's required before
   `/implement` can build UI — specifying can still proceed.
2. Delegate to the **`design`** subagent to produce, using the matching `templates/`:
   - `specs/$1/prd.md` — derived from and **traceable to the brief**: goals/non-goals from the
     brief, personas from its users, user stories with **Given/When/Then** acceptance criteria,
     scope matching the brief's Must list, edge cases, and the brief's success metrics.
   - `specs/$1/erd.md` — entities, fields/types, relationships, constraints, SQL sketch.
   - `specs/$1/design-system.md` — the **application layer**: composes the foundation in
     `design-system/` into this feature's screens/components/states; never redefines tokens.
3. Anything the brief left open must be resolved or recorded under
   `## Open questions / assumptions` — never silently guess on scope or the data model.
4. Tick the **Spec** box for this feature on the Feature board in `docs/progress.md`.

Finish by telling the user: once the PRD's `Status:` reads `Approved`, the next step is
`/handoff $1` — this is the normal product → engineering boundary (see `CLAUDE.md`'s pipeline).
Mention `/plan $1` only as the alternative, for when the user is also doing the technical
planning themselves in this session.
