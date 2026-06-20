# Tasks — Waitlist (WORKED EXAMPLE)

> Shown here in the **completed** state so you can see what `/implement` and `/verify` leave
> behind (boxes checked, commits noted). In a real run these start unchecked.

- [x] **T1 — Migration + data layer**
  - Owner: coding · Effort: M · Depends on: —
  - Files: `db/migrations/001_waitlist.sql`, `lib/waitlist.ts`, `lib/validation.ts`
  - Acceptance:
    - Migration creates `waitlist_signup` (+ `citext`) and `waitlist_rate` per erd.md.
    - `addSignup` inserts with `on conflict do nothing`; `listSignups(page)` and `allSignups()` work.
    - `isValidEmail` / `normalizeEmail` covered by unit tests.
  - Commit: `feat: waitlist schema + data layer (a1b2c3d)`

- [x] **T2 — Public page, form, and join action**
  - Owner: coding · Effort: M · Depends on: T1
  - Files: `app/waitlist/page.tsx`, `app/waitlist/actions.ts`, `components/waitlist-form.tsx`
  - Acceptance:
    - `/waitlist` renders the form; valid email → success state; invalid → inline error.
    - Works without client JS (server action). Existing email → same success, no duplicate row.
  - Commit: `feat: waitlist public page + join action (d4e5f6a)`

- [x] **T3 — Rate limiting**
  - Owner: coding · Effort: S · Depends on: T2
  - Files: `lib/waitlist.ts`, `app/waitlist/actions.ts`, `.env.example`
  - Acceptance:
    - >5 submissions from one `ip_hash` within 60s → rejected (429 semantics).
    - IPs stored only as salted `sha256` hashes; `SERVER_SALT` documented in `.env.example`.
  - Commit: `feat: waitlist rate limiting via ip_hash (b7c8d9e)`

- [x] **T4 — Admin list (paginated, gated)**
  - Owner: coding · Effort: M · Depends on: T1
  - Files: `app/admin/waitlist/page.tsx`, `components/waitlist-table.tsx`, `components/pagination.tsx`, `middleware.ts`
  - Acceptance:
    - `/admin/waitlist` lists signups newest-first, 50/page; empty state when none.
    - Unauthenticated access redirects to `/login` (middleware matches `/admin/*`).
  - Commit: `feat: admin waitlist list + auth gate (c1d2e3f)`

- [x] **T5 — CSV export**
  - Owner: coding · Effort: S · Depends on: T4
  - Files: `app/admin/waitlist/export/route.ts`
  - Acceptance:
    - Admin-only; returns `text/csv` attachment `waitlist.csv` with `email,created_at`.
    - Empty list → header-only CSV.
  - Commit: `feat: waitlist CSV export (e4f5a6b)`

- [x] **T6 — Verify: tests + security audit**
  - Owner: test-security · Effort: M · Depends on: T1–T5
  - Acceptance:
    - Every PRD acceptance criterion has a passing test (build + pytest/route checks green).
    - Security audit complete; `verification.md` written with a SHIP / FIX-FIRST verdict.
  - Result: see `verification.md` — verdict **SHIP** (1 low finding logged for later).
