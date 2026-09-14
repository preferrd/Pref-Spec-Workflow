---
description: Explain the Spec-Driven Development workflow, agents, and commands.
allowed-tools: Read
---

Explain this project's Spec-Driven Development setup to the user, concisely:

- The pipeline splits into a **product phase** and an **engineering phase**, meeting at
  `/handoff`: `/constitution` → `/design-system` → `/discover` → `/specify` → **`/handoff`** →
  `/plan` → `/staff` → `/tasks` → `/implement` → `/verify`, with `/track` after every run/change
  to update `CHANGELOG.md` and `docs/progress.md`. Product owns through `/handoff`; engineering
  owns `/plan` onward, starting from the ticket — possibly in a different repo or session.
- Which agent owns each phase: **design** (constitution, design-system, discover, specify, plan,
  staff, tasks), **coding** (implement, as tech lead across staffed role lanes), **test-security**
  (verify). `/handoff` and `/track` run inline against whichever agent is chatting — they need
  shell access the `design` agent doesn't have.
- **Linear hand-off:** once `/specify` finishes and the PRD is `Status: Approved`, `/handoff`
  creates one feature-level, self-contained Linear ticket (config in `AGENTS.md`) — written so a
  developer with no repo access can start from it — and links it into the PRD's header +
  `docs/progress.md`. Its status then syncs automatically once engineering builds it: In Progress
  on `/implement`, In Review / Done via `/track` as the PR opens and merges — never set the
  status by hand.
- Three golden rules: (1) define the problem before the solution — no PRD without an accepted
  product brief (`/discover`); (2) no production code before an approved spec; (3) no UI before a
  user-provided design system exists in `design-system/` and `INTAKE.md` says `Accepted: yes`.
- Specs live in `specs/NNNN-slug/` and are the source of truth; `product-brief.md` is the
  "what to build", the PRD is derived from it.
- Where to customise: `docs/stack-profile.md` (stack), `memory/constitution.md` (principles),
  `design-system/` (drop your tokens + components before building); `roles/` (discipline
  playbooks staffed per feature); `AGENTS.md` (Linear/GitHub config for `/handoff` + `/track`).
- Point to the worked example in `specs/0001-example-waitlist/`.

Read `CLAUDE.md` if you need detail, then give the user a 6–10 line summary.
