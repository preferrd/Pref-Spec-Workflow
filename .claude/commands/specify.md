---
description: Turn a product idea into a spec set — PRD, ERD/data model, and design system.
argument-hint: "<one-line description of the feature or product>"
allowed-tools: Task, Read, Write, Edit, Glob, Grep
---

Begin the **Specify** phase for: $ARGUMENTS

Steps:
1. Read `memory/constitution.md` and `docs/stack-profile.md` so the spec fits this project.
   Also check the design-system foundation: if `design-system/INTAKE.md` is not yet
   `Accepted: yes`, remind the user it must be provided (via `/design-system`) before
   `/implement` can build UI — specifying can still proceed.
2. Choose the feature folder: look at existing `specs/` folders and pick the next zero-padded
   number; build a short kebab-case slug from the idea. Create `specs/NNNN-slug/`.
3. Delegate to the **`design`** subagent to produce, using the matching files in `templates/`
   as the structure:
   - `specs/NNNN-slug/prd.md` — problem, goals, non-goals, personas, user stories with
     acceptance criteria, edge cases, success metrics.
   - `specs/NNNN-slug/erd.md` — entities, fields/types, relationships, constraints, SQL sketch.
   - `specs/NNNN-slug/design-system.md` — this is the **application layer**: it composes the
     foundation in `design-system/` into this feature's screens/components/states. It must NOT
     redefine global tokens — reference them and note only feature-specific additions.
4. If anything material is ambiguous, the design agent must ask first or record explicit
   assumptions in an `## Open questions / assumptions` section — never silently guess on scope
   or the data model.

5. Add a row for the new feature to the **Feature board** in `docs/progress.md` with the
   **Spec** box ticked and the remaining phase boxes unchecked.

Finish by telling the user the folder name and that the next step is `/plan NNNN-slug`.
