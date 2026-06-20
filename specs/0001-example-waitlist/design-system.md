# Design System — Waitlist (WORKED EXAMPLE)

> **Application layer.** This composes the project's design-system foundation
> (`design-system/tokens.css` + `design-system/components.md`, provided and accepted before
> build) into this feature's screens. It does **not** redefine global tokens — only feature
> additions are noted here.

## Screens & flows
1. **`/waitlist`** (public) — hero copy + email form. Submit → inline success state replaces the form.
2. **`/admin/waitlist`** (admin) — table of signups + pagination + "Export CSV". Redirects to
   login if not authenticated.

Flow: Visitor → `/waitlist` → enter email → submit → success. Admin → login → `/admin/waitlist`
→ view/export.

## Components
| Component | Purpose | States |
|-----------|---------|--------|
| `WaitlistForm` | email input + submit (server action) | default / focus / invalid / submitting / success |
| `WaitlistTable` | admin list of signups | default / empty / loading |
| `Pagination` | page through signups | first / middle / last |
| `ExportButton` | download CSV | default / downloading |

## Layout & responsive
- `/waitlist`: single centred column, max-width ~28rem; form stacks vertically on mobile.
- `/admin/waitlist`: full-width table; on mobile collapse to email + date stacked rows.

## Tokens (additions only)
- **Color:** `--color-success` for the confirmation state; reuse global `--color-bg`,
  `--color-text`, `--color-accent`.
- **Typography/spacing:** global scale; no overrides.

## States to design
- **Loading:** submit button shows a spinner + disabled while the server action runs.
- **Empty:** admin table → "No signups yet."
- **Error:** inline red helper text under the field ("Enter a valid email", "Something went
  wrong, try again"). Never reveal that an email already exists.
- **Success:** form replaced by "✅ You're on the list."

## Accessibility
- `<label>` bound to the email input; error text via `aria-describedby`; `aria-live="polite"`
  on t