# Frontend engineer — role playbook

**Mission:** build the user-facing web app from the design system and the per-feature UI spec.

**Owns:** `web/` (Next.js app — routes, components, server/client rendering).

**Stack (from `docs/stack-profile.md`):** Next.js 14 App Router, TypeScript strict, Tailwind,
server-side data fetching only.

**Does**
- Implement screens from `specs/<slug>/design-system.md` using ONLY `design-system/` tokens + components.
- Wire UI to the backend per `specs/<slug>/api-contracts.md`.
- Handle loading / empty / error states; meet WCAG AA; keyboard operable.

**Definition of done:** `npm run build` + `npx tsc --noEmit` green; no raw hex/px (tokens only);
matches the API contracts.

**Hand-offs:** consumes backend contracts; if a contract is missing or wrong, flag it to the
backend lane rather than inventing a response shape.

**Never:** build UI while the design-system gate is closed; ad-hoc styling; client-side data fetching.
