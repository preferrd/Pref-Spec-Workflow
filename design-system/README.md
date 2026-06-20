# design-system/  — provide this BEFORE building

**This is a required input gate.** Nothing with a UI gets built until a real design system
lives here and is marked accepted. The coding agent will refuse UI work otherwise. This is
intentional: it guarantees every product is built on *your* visual language, not invented styling.

## How to provide yours (two ways)

**A. Drop raw inputs and let Claude normalise them.**
Put anything you have into `dropzone/` — then run `/design-system`. Accepted inputs include:
- existing `tailwind.config.*`, `globals.css`, or a `tokens.json` / Style-Dictionary export
- a Figma export, brand/style-guide PDF, or screenshots of the UI
- a written brand guide (fonts, colors, spacing, voice)

`/design-system` reads them, produces the two canonical files below, shows you the result, and
only then marks the gate accepted.

**B. Author the canonical files directly.**
Replace the two `*.example.*` files with the real thing:
- `tokens.css` — design tokens as CSS custom properties (light + dark). *(see `tokens.example.css`)*
- `components.md` — the core component inventory + states + which tokens each uses. *(see `components.example.md`)*

Then open `INTAKE.md` and set `Accepted: yes`.

## The gate (how the build is blocked)
The build is allowed only when **all** of these are true:
1. `design-system/tokens.css` exists (not just the `.example.` file).
2. `design-system/components.md` exists.
3. `design-system/INTAKE.md` contains `Accepted: yes`.

Until then, `/implement` will build only non-UI tasks (migrations, pure data/services) and stop
at anything that renders or styles, telling you to run `/design-system` first.

## What lives here
```
design-system/
  README.md              this file
  INTAKE.md              the gate marker + completeness checklist
  tokens.css             YOUR tokens (replace tokens.example.css)
  components.md          YOUR component inventory (replace components.example.md)
  tokens.example.css     reference shape — delete or overwrite
  components.example.md  reference shape — delete or overwrite
  dropzone/              drop raw inputs here for /design-system to ingest
```
