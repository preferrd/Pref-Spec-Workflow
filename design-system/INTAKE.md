# Design System — Intake & Gate

> This file is the **build gate**. The coding agent checks it before any UI work.
> Flip `Accepted` to `yes` only when the checklist below is genuinely satisfied.

Accepted: no

<!-- The line above must read exactly "Accepted: yes" for UI builds to proceed.
     /design-system sets this for you after you confirm the normalised result. -->

## Source
- Provided by: <!-- your name / team -->
- Date: <!-- YYYY-MM-DD -->
- Origin: <!-- e.g. "Figma export + globals.css", "brand guide PDF", "Xorro Aurora" -->

## Completeness checklist
A design system is "accepted" when each box is true and reflected in `tokens.css` /
`components.md`:

- [ ] **Color** — surface/background, text (primary/secondary/muted), accent/brand, success,
      warning, danger, border — defined for **light and dark**.
- [ ] **Typography** — font family/families, a type scale (sizes + line-heights), weights.
- [ ] **Spacing & layout** — spacing scale, container widths, breakpoints.
- [ ] **Radius & elevation** — corner radii, shadow levels.
- [ ] **Motion** — standard duration(s) + easing (and a reduced-motion stance).
- [ ] **Core components** — button, input/field, select, card, table, modal/dialog, toast/alert,
      badge, nav — each with states (default/hover/focus/disabled/loading/error/empty).
- [ ] **Accessibility** — contrast ≥ WCAG AA; visible focus; keyboard operability.

## Notes / known gaps
<!-- Anything intentionally deferred. If a box is unchecked, the system is NOT accepted. -->
