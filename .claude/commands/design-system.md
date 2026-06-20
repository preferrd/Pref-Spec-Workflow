---
description: Intake/normalise the user-provided design system and open the build gate.
argument-hint: "[note about what you dropped in design-system/dropzone/, or a link]"
allowed-tools: Task, Read, Write, Edit, Glob, Grep
---

Run the **Design System** intake. This must be completed before any UI is built.

Context from the user: $ARGUMENTS

Steps:
1. Read `design-system/README.md` and `design-system/INTAKE.md`, then inspect
   `design-system/dropzone/` and any files/links the user referenced (existing
   `tailwind.config`/`globals.css`, `tokens.json`, Figma export, brand PDF, screenshots,
   written guide). If brand images/PDFs were dropped, read them.
2. **If nothing usable was provided:** STOP. Tell the user this project requires a design
   system before building, and ask them to drop theirs into `design-system/dropzone/` (or author
   `tokens.css` + `components.md` directly). Only offer to generate one from scratch if the user
   explicitly asks — the default is to use *their* system.
3. Delegate to the **`design`** subagent to normalise whatever was provided into the canonical
   files, modelled on `tokens.example.css` / `components.example.md`:
   - `design-system/tokens.css` — tokens as CSS custom properties (light + dark).
   - `design-system/components.md` — core component inventory, states, and tokens each uses.
   - If the stack uses Tailwind, also emit the `tailwind.config` theme mapping that points at
     these vars.
4. Work through the `INTAKE.md` completeness checklist. Show the user the normalised result and
   the checklist status, and ask them to confirm.
5. Only after the user confirms, set `Accepted: yes` in `INTAKE.md` and fill the Source block.
   Do not flip the gate on the user's behalf without confirmation.

Finish by stating whether the gate is now OPEN (accepted) or what is still missing.
