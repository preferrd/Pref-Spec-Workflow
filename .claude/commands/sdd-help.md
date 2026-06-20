---
description: Explain the Spec-Driven Development workflow, agents, and commands.
allowed-tools: Read
---

Explain this project's Spec-Driven Development setup to the user, concisely:

- The pipeline and the command for each phase, in order:
  `/constitution` → `/design-system` → `/specify` → `/plan` → `/tasks` → `/implement` → `/verify`.
- Which agent owns each phase: **design** (constitution, design-system, specify, plan, tasks),
  **coding** (implement), **test-security** (verify).
- Two golden rules: (1) no production code before an approved spec; (2) no UI is built before a
  user-provided design system exists in `design-system/` and `INTAKE.md` says `Accepted: yes`.
- Specs live in `specs/NNNN-slug/` and are the source of truth.
- Where to customise: `docs/stack-profile.md` (stack), `memory/constitution.md` (principles),
  `design-system/` (drop your tokens + components here before building).
- Point to the worked example in `specs/0001-example-waitlist/`.

Read `CLAUDE.md` if you need detail, then give the user a 6–10 line summary.
