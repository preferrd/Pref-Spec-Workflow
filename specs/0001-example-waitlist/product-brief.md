# Product Brief — Waitlist (WORKED EXAMPLE)

- **Feature slug:** 0001-example-waitlist
- **Discovery:** accepted
- **Author:** design agent (PM hat)
- **Date:** 2026-06-20

> The "what to build", produced by `/discover` before any PRD. The PRD in this folder is derived
> from it. Read this first to see how discovery nails down scope.

## 1. Problem
We're pre-launch with no way to capture interest. Visitors who want the product have nowhere to
raise their hand, and we have no contactable audience or demand signal for launch. Evidence:
inbound "how do I get early access?" DMs with no system behind them.

## 2. Why now
Launch is ~8 weeks out; we need an audience to notify and a demand signal to prioritise the
roadmap. Every week without capture is lost interest.

## 3. Jobs to be done
- When I hear about the product, I want to register interest in seconds, so I'm notified at launch.
- When I'm planning launch, I want to see and contact interested people, so I can convert them.

## 4. Target users & segments
- **Visitor** (primary) — arrives on the marketing page, wants early access. Anonymous.
- **Admin/founder** (primary) — needs to gauge demand and reach out. Not for end-customer
  account management — there are no user accounts in scope.

## 5. Goals & success metrics
- **North Star:** number of valid waitlist signups before launch.
- **Supporting KPIs:** signup conversion rate on `/waitlist` (≥30%), 0 duplicate emails, form
  p95 < 300ms.

## 6. Scope — MoSCoW (MVP line)
| Priority | Items |
|----------|-------|
| **Must** (MVP) | Email capture form; validation; dedupe; store signups; admin list; CSV export; basic abuse throttle |
| **Should** | Source/UTM capture; pagination on admin list |
| **Could** | Confirmation email; positions-in-line |
| **Won't (this round)** | Referrals, social sharing, end-user accounts, marketing emails |

## 7. Non-goals
Sending emails, referral mechanics, and full end-user authentication are explicitly out of scope.

## 8. Key user journeys
- **Join:** land on `/waitlist` → enter email → submit → success confirmation.
- **Review:** admin logs in → `/admin/waitlist` → view list → Export CSV.

## 9. Alternatives / what users do today
Today: ad-hoc DMs and a spreadsheet. Error-prone, no dedupe, no export, doesn't scale.

## 10. Assumptions & risks
| Assumption / risk | Impact if wrong | How we'll de-risk |
|-------------------|-----------------|-------------------|
| Email alone is enough friction-free capture | M | Keep form to one field; measure conversion |
| Per-IP throttle deters spam at our scale | M | Log signups; add captcha later if abused |
| Admin auth can reuse existing cookie gate | L | Confirmed against stack profile |

## 11. Open questions
- None blocking. (Confirmation email deferred to a later feature.)

## 12. Sign-off
- Agreed by: Mayowa · Date: 2026-06-20
