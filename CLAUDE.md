# CLAUDE.md — Spec-Driven Development Starter Kit

This repo is a **reusable template for building new products with Claude Code using
Spec-Driven Development (SDD)** and **three specialised agents**. Clone it into a new
project, fill in the blanks, and drive the build with slash commands.

> **Golden rule 1: no production code is written before a spec exists.**
> Specs are the source of truth. Code is a projection of the spec. If the code and the
> spec disagree, the spec wins — fix the spec first, then the code.
>
> **Golden rule 2: no UI is built before a design system is provided.**
> The user drops their design system into `design-system/`; the build is gated until
> `design-system/INTAKE.md` says `Accepted: yes`. The coding agent refuses UI work otherwise.

---

## The pipeline

A new feature flows left-to-right. Each phase has **one command** and **one owning agent**.

| # | Phase | Command | Owning agent | Writes to |
|---|-------|---------|--------------|-----------|
| 0 | Principles (once per project) | `/constitution` | `design` | `memory/constitution.md` |
| 0.5 | Design system (provide once, before any UI) | `/design-system` | `design` | `design-system/{tokens.css,components.md,INTAKE.md}` |
| 1 | Specify (the *what* & *why*) | `/specify <idea>` | `design` | `specs/NNNN-slug/{prd,erd,design-system}.md` |
| 2 | Plan (the *how*) | `/plan <slug>` | `design` | `specs/NNNN-slug/{plan,api-contracts}.md` |
| 3 | Tasks (the *steps*) | `/tasks <slug>` | `design` | `specs/NNNN-slug/tasks.md` |
| 4 | Implement (the *build*) | `/implement <slug>` | `coding` | source code + commits |
| 5 | Verify (the *proof*) | `/verify <slug>` | `test-security` | tests, scans, `specs/NNNN-slug/verification.md` |

Run them in order. You can stop after any phase, review the markdown it produced, edit it
by hand, and resume. The whole point is that the expensive, hard-to-reverse phase
(implementation) only ever runs against a spec a human has read and approved.

---

## The three agents

Defined in `.claude/agents/`. Each has a deliberately **restricted toolset** so it can only
do its job — this is what keeps the pipeline honest.

1. **`design`** — the product-manager + designer brain. Normalises the user-provided design
   system into canonical tokens + components, and turns a rough idea into a PRD, an ERD/data
   model, user stories with acceptance criteria, and the per-feature UI spec.
   Tools: read/write docs only (no `Bash`) — it *cannot* touch code, only specs.

2. **`coding`** — the implementer. Reads the approved spec and writes production code that
   matches the stack profile and conventions. Tools: full file + shell access.

3. **`test-security`** — the QA + security reviewer. Writes/runs tests and audits the
   implementation for vulnerabilities. It may create **test files only**; it never edits
   application source — it reports issues back for `coding` to fix.

Invoke an agent explicitly with `@design`, `@coding`, `@test-security`, or just run the
slash command for the phase (the command delegates to the right agent for you).

---

## Directory map

```
.claude/
  agents/         design.md · coding.md · test-security.md   (the 3 agents)
  commands/       constitution · specify · plan · tasks · implement · verify · sdd-help
memory/
  constitution.md Project-wide principles (edit once per project; referenced by every phase)
design-system/    DROP YOUR DESIGN SYSTEM HERE before building (the gate)
  README.md       how to provide it · INTAKE.md  the gate marker (Accepted: yes/no)
  tokens.css      your tokens (CSS vars) · components.md  your component inventory
  dropzone/       drop raw inputs (Figma/PDF/CSS/screenshots) for /design-system to ingest
templates/        Blank doc templates the commands copy + fill
docs/
  stack-profile.md  Your default stack, conventions, commands (EDIT THIS per project)
specs/
  README.md       How the per-feature folders work
  NNNN-slug/      One folder per feature: prd, erd, design-system, plan, api-contracts, tasks, verification
  0001-example-waitlist/   A fully worked example — read it to see the end state
scripts/
  new-feature.sh  Convenience: scaffold specs/NNNN-slug/ from templates
```

---

## Stack profile (defaults baked in)

These defaults come from the author's existing products. **Edit `docs/stack-profile.md`** to
match each new project — every agent reads it before acting.

- **Web app:** Next.js 14 (App Router, React Server Components), TypeScript `strict`, Tailwind CSS 3 + CSS custom properties for theming. Server-side data fetching only (no client fetching).
- **Services / agents:** Python 3.11+, FastAPI, SQLAlchemy 2 + psycopg, `pydantic-settings` for config, Typer for CLIs.
- **Database:** PostgreSQL (Supabase). Numbered SQL migrations (`db/migrations/NNN_name.sql`). Never hardcode data the DB already holds.
- **Tests:** `pytest` + `pytest-asyncio` + `respx` (Python). Web app: `npm run build` + `tsc --noEmit` as the gate (add Vitest/Playwright per project if needed).
- **Lint:** `ruff` (Python, line-length 100). TypeScript via `tsc`.
- **Env:** `.env.local` (web) and `.env` (services), both gitignored.
- **Deploy:** Render (web service).

---

## Non-negotiable conventions

- **Build before you commit.** Web: `npm run build` must print `✓ Compiled successfully`. Services: `pytest` must be green.
- **Spec-first.** If