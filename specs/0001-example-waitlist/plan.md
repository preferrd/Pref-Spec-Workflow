# Technical Plan — Waitlist (WORKED EXAMPLE)

## Architecture overview
A self-contained Next.js 14 feature. The public page renders a server component with a form
wired to a **server action** (works without client JS). The action validates, rate-limits, and
inserts into Postgres via the shared DB client (`lib/db.ts`). The admin page is a server
component that reads signups directly from Postgres and is protected by the existing middleware
auth gate. CSV export is a route handler that streams all rows.

## File / component breakdown
| Path | Responsibility | New / Edit |
|------|----------------|-----------|
| `db/migrations/001_waitlist.sql` | tables + indexes (see erd.md) | New |
| `lib/waitlist.ts` | data layer: `addSignup`, `listSignups`, `allSignups`, `checkRate` | New |
| `lib/validation.ts` | `isValidEmail`, `normalizeEmail` | New |
| `app/waitlist/page.tsx` | public page (server component) | New |
| `app/waitlist/actions.ts` | `joinWaitlist` server action | New |
| `components/waitlist-form.tsx` | form + states | New |
| `app/admin/waitlist/page.tsx` | admin list (server component, paginated) | New |
| `app/admin/waitlist/export/route.ts` | CSV export route handler | New |
| `components/waitlist-table.tsx` · `pagination.tsx` | admin UI | New |
| `middleware.ts` | ensure `/admin/*` is gated | Edit |
| `.env.example` | add `SERVER_SALT` | Edit |

## Build sequence
1. Migration + data layer (`lib/waitlist.ts`, `lib/validation.ts`) — buildable, no UI yet.
2. Public page + server action + form component.
3. Rate limiting in the action.
4. Admin page (list + pagination) behind auth.
5. CSV export route.
6. Tests + security audit (verify phase).

## Data flow
Visitor submits → `joinWaitlist` action → validate + normalize → `checkRate(ip_hash)` →
`addSignup()` (insert, `on conflict do nothing`) → return success (same response whether or not
it already existed). Admin page → `listSignups(page)` server-side → render. Export → `allSignups()`
→ stream CSV.

## Dependencies & integrations
- No new runtime packages (uses built-in `crypto` for `ip_hash`, the existing `postgres` client).
- New env var: `SERVER_SALT` (for hashing IPs). Document in `.env.example`.

## Risks & mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Email enumeration via differing responses | M | M | Identical success response for new vs existing; `on conflict do nothing` |
| In-DB rate limiting races under load | L | M | Acceptable for v1 scale; swap for Redis if traffic grows (noted, not built) |
| Admin route accidentally public | L | H | Add `/admin/*` to middleware matcher; covered by a verify test |

## Rollout / deploy notes
- Run `001_waitlist.sql` against the database before deploy (creates `citext` extension).
- Set `SERVER_SALT` in the Render environment.
