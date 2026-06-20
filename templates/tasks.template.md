# Tasks — {{Feature name}}

> Ordered by dependency — build top to bottom. Check each box as it's completed and note the
> commit. `coding` owns build tasks; `test-security` owns the verification tasks at the end.

## How to read a task
- **ID** — stable reference (T1, T2 …). **Effort** — S/M/L. **Depends on** — task IDs.
- **Owner** — `coding` | `test-security`. **Files** — what it touches.
- **Acceptance** — objectively checkable; mirrors the PRD criteria.

---

- [ ] **T1 — {{title}}**
  - Owner: coding · Effort: S · Depends on: —
  - Files: `…`
  - Acceptance:
    - …
  - Commit: <!-- filled in during /implement -->

- [ ] **T2 — {{title}}**
  - Owner: coding · Effort: M · Depends on: T1
  - Files: `…`
  - Acceptance:
    - …

- [ ] **T{{n}} — Verify: tests + security audit**
  - Owner: test-security · Effort: M · Depends on: all build tasks
  - Acceptance:
    - All PRD acceptance criteria have passing tests.
    - Security audit complete; `verification.md` written with a SHIP / FIX-FIRST verdict.
