# Progress Tracker

The single dashboard for **where every feature stands** and **what happened on each run**.
Maintained automatically by `/implement`, `/verify`, and `/track`; safe to edit by hand.

- **Feature board** — one row per feature, a checkbox per pipeline phase. Skim it to see what
  is specced vs. built vs. verified.
- **Run log** — a dated, tick-able checklist appended after every run or manual change. This is
  the checklist you use to confirm a run actually finished cleanly.

The authoritative detail lives in `specs/NNNN-slug/` (tasks, verification) and `CHANGELOG.md`
(what changed). This file is the at-a-glance index over both.

---

## Feature board

Phases: **Spec** = prd/erd/design-system written · **Plan** = plan/api-contracts written ·
**Tasks** = task list written · **Impl** = code built & committed · **Verify** = tested +
security-audited with a verdict. **Linear** = the ticket created by `/handoff`, kept in sync by
`/implement` and `/track` (In Progress → In Review → Done) — `—` until handed off.

Status legend: `[ ]` not started · `[~]` in progress · `[x]` done.

| Feature | Spec | Plan | Tasks | Impl | Verify | Verdict | Linear | Notes |
|---------|:----:|:----:|:-----:|:----:|:------:|---------|--------|-------|
| `0001-example-waitlist` (reference) | [x] | [x] | [x] | [x] | [x] | SHIP | — | Worked example — delete when no longer needed |

<!-- Add one row per feature. /specify seeds the row; later phases tick its boxes. -->

---

## Run log

Each run (or manual change) appends a block below using the post-run checklist from
`templates/post-run-checklist.template.md`. Newest at the top. Tick every box before you
consider a run done; an unchecked box is a follow-up.

<!-- NEWEST RUN GOES HERE -->

### 2026-09-08 — Linear hand-off automation added
- Phase: `Docs` · Feature: `—` · Agent: `claude`
- [x] Change categorized in `CHANGELOG.md`
- [x] Feature board reflects current state (added Linear column)
- [x] No build/test gate applicable (docs-only)
- [ ] Committed
- Summary: Added `/handoff` command + root `AGENTS.md` (Linear workspace/team + GitHub repo slug
  config), generalized from monorepo's manual `linear` CLI pattern. Ticket creation happens once
  after `/tasks` (PRD `Status: Approved`); status then syncs automatically — `/implement` sets
  In Progress, `/track` sets In Review/Done from PR state. Updated `CLAUDE.md` (pipeline table +
  new "Relationship to Linear, branches, and PRs" section), `sdd-help.md`, `README.md`,
  `specs/README.md`, `templates/tasks.template.md` (Linear header line), `docs/progress.md`
  (Linear column). Also fixed `.claude/agents/coding.md`, which hardcoded specific frameworks
  that could drift from `docs/stack-profile.md` (the same drift already happened in monorepo's
  copy of this kit).
- Follow-ups: Not tested end-to-end against a real Linear/GitHub workspace (no credentials in
  this session) — verify `/handoff` and the status syncs on a real feature once `AGENTS.md` is
  filled in. Not yet committed — review the diff and commit when ready.

### 2026-06-20 — Bootstrap: tracking layer added
- Phase: `Docs` · Feature: `—` · Agent: `claude`
- [x] Change categorized in `CHANGELOG.md`
- [x] Feature board reflects current state
- [x] No build/test gate applicable (docs-only)
- [x] Committed
- Summary: Added `CHANGELOG.md`, `docs/progress.md`, `/track` command, and post-run checklist
  template; wired `/implement` and `/verify` to update tracking.
