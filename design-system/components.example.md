# Component Inventory — REFERENCE SHAPE ONLY

Replace with your real inventory as `components.md` (or let `/design-system` generate it).
Every component lists the states it must support and the **tokens** it consumes — the coding
agent builds only from this vocabulary, and the verify step checks nothing styles outside it.

| Component | States | Tokens used |
|-----------|--------|-------------|
| Button (primary) | default, hover, focus, active, disabled, loading | `--color-accent`, `--color-accent-fg`, `--radius-md`, `--space-2/3`, `--duration` |
| Button (secondary) | default, hover, focus, disabled | `--color-surface`, `--color-text`, `--color-border` |
| Input / field | default, focus, invalid, disabled | `--color-border`, `--color-text`, `--color-danger`, `--radius-md` |
| Select | default, open, focus, disabled | inherits Input |
| Card | default | `--color-surface`, `--color-border`, `--radius-lg`, `--shadow-1` |
| Table | default, empty, loading | `--color-text`, `--color-border`, `--text-sm` |
| Modal / dialog | open, closing | `--color-bg`, `--shadow-2`, `--radius-lg` |
| Toast / alert | success, warning, danger, info | `--color-success/warning/danger`, `--radius-md` |
| Badge | neutral, accent, success, danger | role colors, `--radius-full`, `--text-xs` |
| Nav item | default, active, hover, focus | `--color-text`, `--color-text-muted`, `--color-accent` |

## Rules
- **No raw values in app code.** Use tokens (CSS vars / Tailwind theme keys mapped to them).
- Every interactive component has a **visible focus** state and is keyboard-operable.
- Provide **empty** and **loading** states wherever data is rendered.
- Contrast of text on its background must meet **WCAG AA**.

## Mapping to Tailwind (optional, recommended)
Map these tokens in `tailwind.config.ts` so utilities resolve to the vars, e.g.
`colors: { bg: 'var(--color-bg)', accent: 'var(--color-accent)' }`, `borderRadius`, `fontFamily`.
`/design-system` can emit this mapping for you.
