# Project Constitution

> Non-negotiable principles for this project. Every phase (specify → plan → tasks → implement →
> verify) must respect these. Edit once per project; keep it to one page. Each rule states the
> *what* and the *why* so it generalises. `/constitution` updates this file.

## 1. Code quality
- **Discover before you specify.** No PRD without an accepted product brief (`/discover`). *Why: the costliest mistake is building the wrong thing.*
- **Spec before code.** No production code without an approved spec in `specs/`. *Why: prevents
  rework and scope drift.*
- **Match the house style** in `docs/stack-profile.md`. Consistency beats personal preference.
- **Small, reviewable changes.** One logical change per commit; conventional message + the
  `Co-Authored-By: Claude <noreply@anthropic.com>` trailer.

## 2. Testing
- **Acceptance criteria are tests.** Every user story's criteria must be verifiable; the verify
  phase proves them. *Why: "done" must be objective.*
- **Green before commit.** Web: `npm run build` + `tsc --noEmit`. Services: `ruff check` +
  `pytest`. Never commit on a red build.

## 3. Security
- **Validate all input** at the boundary; use parameterised queries (no string-built SQL).
- **Secrets live in env**, never in code or git. Only `.env.example` is tracked.
- **Least privilege** for every route/role; protected data must be access-checked (no IDOR).

## 4. UX & accessibility
- **A design system is required before any UI is built.** The user provides it in
  `design-system/`; no UI/build proceeds until `INTAKE.md` reads `Accepted: yes`. *Why: every
  product is built on a deliberate, consistent visual language — never invented styling.*
- **The design system is the source of truth** for UI. Build only from its tokens + components;
  no ad-hoc colors/spacing/type in app code.
- Every screen handles **loading, empty, and error** states. Keyboard + screen-reader usable;
  contrast ≥ WCAG AA.

## 5. Data
- **Database is the source of truth.** Don't hardcode data the DB already holds. *Why: avoids
  drift and stale values.*
- Schema changes go through **numbered migrations**; never edit a shipped migration.

## 6. Performance
- Default budgets: web page interactive < 2.5s on a mid-range device; API p95 < 300ms.
  Adjust per project, but state the number.

## 7. How we decide
- When the spec and the code disagree, **the spec wins** — change the spec deliberately, then the code. When a principle here blocks progress, raise it explicitly rather than ignoring it.