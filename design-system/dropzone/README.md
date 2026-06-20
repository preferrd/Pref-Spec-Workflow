# dropzone/

Drop your raw design-system inputs here, then run **`/design-system`** in Claude Code.

Anything is fair game — Claude will read what it can and normalise it into
`design-system/tokens.css` + `design-system/components.md`:

- `tailwind.config.ts` / `globals.css` / existing CSS variables
- `tokens.json` (Style Dictionary, Figma Tokens, etc.)
- a Figma export, brand/style-guide **PDF**, or **screenshots** of the UI
- a written brand guide (fonts, colors, spacing, voice/tone)

If you drop in image/PDF brand assets, mention them when you run `/design-system` so the design
agent knows to read them. Files left here are ignored by the build — only the canonical
`tokens.css` and `components.md` (plus an accepted `INTAKE.md`) open the gate.
