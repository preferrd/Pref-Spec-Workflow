# PRD — Waitlist (WORKED EXAMPLE)

- **Feature slug:** 0001-example-waitlist
- **Status:** Approved
- **Author:** design agent
- **Date:** 2026-06-20

> This folder is a filled-in reference showing what each phase produces. Read it top to bottom
> to see how an idea becomes a buildable spec. Delete it once you've got the idea.

## Problem
We're pre-launch and need to capture interest and build a contactable audience before the
product ships. Today there is no way for a visitor to leave their email, and no way for us to
see or export who signed up.

## Goals
- Let any visitor join the waitlist with just an email, in under 10 seconds.
- Prevent duplicate and junk signups.
- Let an admin view signups and export them as CSV.

## Non-goals
- Sending confirmation or marketing emails (a later feature).
- Referral mechanics, positions in line, or social sharing.
- Full user accounts/auth for end users (waitlist is anonymous).

## Personas
- **Visitor** — lands on the marketing page, wants early access. Job: "tell them I'm interested."
- **Admin (founder)** — wants to gauge demand and reach out. Job: "see and export the list."

## User stories & acceptance criteria

### US-1 — Join the waitlist
> As a visitor, I want to submit my email, so that I'm notified at launch.

**Acceptance criteria**
- [ ] A visible email field + "Join waitlist" button on `/waitlist`.
- [ ] Valid email → success state ("You're on the list").
- [ ] Invalid email → inline error, no submission.
- [ ] Submitting an email already on the list shows the same success state (no duplicate row, no
      leak that the email already existed).
- [ ] The form works without client-side JavaScript (progressive enhancement via server action).

### US-2 — Throttle abuse
> As the system, I want to limit rapid repeat submissions, so that the list isn't spammed.

**Acceptance criteria**
- [ ] More than 5 submissions from the same IP within 60s are rejected with HTTP 429.

### US-3 — View & export signups
> As an admin, I want to see and export signups, so that I can measure demand and contact people.

**Acceptance criteria**
- [ ] `/admin/waitlist` lists signups (email, created_at), newest first, paginated at 50/page.
- [ ] Only an authenticated admin can access it; anonymous users are redirected to login.
- [ ] An "Export CSV" action downloads all signups as `waitlist.csv`.

## Edge cases & error handling
- Email normalised (trim + lowercase) before validation and storage.
- DB unavailable → user sees a friendly "try again" error; no stack trace leaks.
- Empty list → admin page shows an empty state, export returns a header-only CSV.

## Success metrics
- ≥ 30% of `/waitlist` visitors submit (conversion).
- 0 duplicate emails in the table. Form p95 response < 300ms.

## Open questions / assumptions
- **Assumption:** admin auth reuses the project's existing cookie/session gate (see stack
  profile); no new auth system is built here.
- **Assumption:** single locale (English) for v1.
