# API Contracts — Waitlist (WORKED EXAMPLE)

## Conventions
- **Transport:** Next.js server action (form post) for join; route handler for export.
- **Auth:** `/waitlist` public; `/admin/*` requires the admin session cookie (existing gate).
- **Error format (route handlers):** `{ "error": { "code": string, "message": string } }`

## Server action — `joinWaitlist`
- **Purpose:** add an email to the waitlist.
- **Auth:** public.
- **Input (FormData):** `email: string`, optional `source: string`.
- **Behaviour:** trim+lowercase email → validate → rate-check by `ip_hash` → insert
  `on conflict do nothing`.
- **Returns (to the page):**
  - success: `{ ok: true }` (identical for new and already-existing emails)
  - validation error: `{ ok: false, error: "invalid_email" }`
  - rate limited: `{ ok: false, error: "rate_limited" }` (HTTP 429 semantics)
  - server error: `{ ok: false, error: "server_error" }`
- **Never** reveals whether the email already existed.

## GET `/admin/waitlist`
- **Purpose:** render the paginated signup list (HTML, server component).
- **Auth:** admin. Unauthenticated → redirect to `/login`.
- **Query:** `?page=<int>` (default 1, 50/page).
- **Status:** 200 HTML · 302 redirect if unauthenticated.

## GET `/admin/waitlist/export`
- **Purpose:** download all signups as CSV.
- **Auth:** admin. Unauthenticated → 302 `/login`.
- **Response 200:** `text/csv`, header `Content-Disposition: attachment; filename="waitlist.csv"`.
  Columns: `email,created_at`. Empty list → header row only.
- **Status codes:** 200 · 302 unauth · 500 server error.
