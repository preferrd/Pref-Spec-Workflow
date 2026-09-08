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
>
> **Golden rule 3: define the problem before the solution.**
> No PRD is written until a product brief (`/discover`) is agreed (`Discovery: accepted`).
> The kit refuses to specify a solution to an undefined problem.

---

## The pipeline

A new feature flows left-to-right. Each phase has **one command** and **one owning agent**.

| # | Phase | Command | Owning agent | Writes to |
|---|-------|---------|--------------|-----------|
| 0 | Principles (once per project) | `/constitution` | `design` | `memory/constitution.md` |
| 0.5 | Design system (provide once, before any UI) | `/design-system` | `design` | `design-system/{tokens.css,components.md,INTAKE.md}` |
| 0.75 | Discover (the *what to build*) | `/discover <idea>` | `design` | `specs/NNNN-slug/product-brief.md` |
| 1 | Specify (the *what* & *why*) | `/specify <slug>` | `design` | `specs/NNNN-slug/{prd,erd,design-system}.md` |
| 2 | Plan (the *how*) | `/plan <slug>` | `design` | `specs/NNNN-slug/{plan,api-contracts}.md` |
| 2.5 | Staff (the *who*) | `/staff <slug>` | `design` | `specs/NNNN-slug/team.md` |
| 3 | Tasks (the *steps*) | `/tasks <slug>` | `design` | `specs/NNNN-slug/tasks.md` |
| 3.5 | Linear hand-off | `/handoff <slug>` | (any) | Linear ticket, `tasks.md` header, `docs/progress.md` |
| 4 | Implement (the *build*) | `/implement <slug>` | `coding` | source code + commits |
| 5 | Verify (the *proof*) | `/verify <slug>` | `test-security` | tests, scans, `specs/NNNN-slug/verification.md` |
| ↳ | Track (after every run/change) | `/track <slug>` | (any) | `CHANGELOG.md`, `docs/progress.md` |

Run them in order. You can stop after any phase, review the markdown it produced, edit it
by hand, and resume. The whole point is that the expensive, hard-to-reverse phase
(implementation) only ever runs against a spec a human has read and approved.

---

## The three agents

Defined in `.claude/agents/`. Each has a deliberately **restricted toolset** so it can only
do its job — this is what keeps the pipeline honest.

1. **`design`** — the product-manager + designer brain. Runs product discovery (defines *what*
   to build), normalises the user-provided design system into tokens + components, and turns the
   agreed brief into a PRD, an ERD/data model, user stories with acceptance criteria, and the
   per-feature UI spec.
   Tools: read/write docs only (no `Bash`) — it *cannot* touch code, only specs.

2. **`coding`** — the implementer and **tech lead**. Reads the approved spec and `team.md`, then
   runs each staffed role lane from its `roles/<role>.md` playbook in that role's folder, writing
   production code that matches the stack profile. Tools: full file + shell access.

3. **`test-security`** — the QA + security reviewer. Writes/runs tests and audits the
   implementation for vulnerabilities. It may create **test files only**; it never edits
   application source — it reports issues back for `coding` to fix.

Invoke an agent explicitly with `@design`, `@coding`, `@test-security`, or just run the
slash command for the phase (the command delegates to the right agent for you).

---

## Relationship to Linear, branches, and PRs

Specs are the **authoring workspace**; Linear stays the **execution tracker**. Don't duplicate
one system's job in the other.

**Hand-off point:** once `/tasks` has written `specs/NNNN-slug/tasks.md` and the PRD's `Status:`
reads `Approved`, run **`/handoff <slug>`**. It creates one feature-level Linear ticket (team and
workspace from `AGENTS.md`), links it back into `tasks.md`'s header and `docs/progress.md`'s
Linear column, and hands the feature to whoever builds it next.

**Ticket lifecycle** (kept in sync automatically — never hand-edit the status in Linear):

| Stage | Linear status | Synced by |
|-------|---------------|-----------|
| Ticket created | (`AGENTS.md`'s default new-issue state) | `/handoff` |
| Build starts | In Progress | `/implement` |
| PR opened | In Review | `/track` |
| PR merged | Done | `/track` |

Keep status "In Review" while the PR is open even after checks pass — only "Done" after merge.

**Branch naming:** `<name>/<ticket-id>-<short-description>`, e.g. `alex/eng-284-waitlist-api`.

**Commit granularity:** one ticket = one branch = one PR. Never bundle multiple tickets.

**Commit message format:**

```
<type>: <description>

<ticket-id>: <ticket-title>

<optional body explaining why>
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`. Every commit ends with
`Co-Authored-By: Claude <noreply@anthropic.com>`.

**Opening a PR:**

```bash
git push -u origin HEAD
gh pr create --title "<type>: <description>" --body "$(cat <<'EOF'
## Summary
<bullet points>

## Ticket
<ticket-id>: <ticket-title>

## Test plan
- [ ] Tests pass locally
- [ ] Typecheck/build passes
EOF
)"
```

Run `/track <slug>` right after opening the PR (and again after it merges) so the Linear status
sync above actually fires.

---

## Directory map

```
AGENTS.md           Linear workspace/team + GitHub repo slug (EDIT THIS per project) — read by /handoff, /implement, /track
.claude/
  agents/         design.md · coding.md · test-security.md   (the 3 agents)
  commands/       constitution · design-system · discover · specify · plan · staff · tasks · handoff · implement · verify · track · export-docs · sdd-help
memory/
  constitution.md Project-wide principles (edit once per project; referenced by every phase)
design-system/    DROP YOUR DESIGN SYSTEM HERE before building (the gate)
  README.md       how to provide it · INTAKE.md  the gate marker (Accepted: yes/no)
  tokens.css      your tokens (CSS vars) · components.md  your component inventory
  dropzone/       drop raw inputs (Figma/PDF/CSS/screenshots) for /design-system to ingest
roles/            Discipline playbooks staffed on demand (frontend, backend, ml, data, devops)
templates/        Blank doc templates the commands copy + fill
docs/
  stack-profile.md  Your default stack, conventions, commands (EDIT THIS per project)
  progress.md       Feature board (phase per feature) + dated post-run checklists (the run log)
CHANGELOG.md        Categorized, dated ledger of every change (Added/Changed/Fixed/Removed/Security/Docs)
specs/
  README.md       How the per-feature folders work
  NNNN-slug/      One folder per feature: product-brief, prd, erd, design-system, plan, api-contracts, team, tasks, verification
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
- **Track every change.** Every `/implement` and `/verify` run — and any manual change — ends by
  updating `CHANGELOG.md` (categorized entry) and `docs/progress.md` (feature board + a dated
  post-run checklist). Use `/track <slug>` if it wasn't done automatically. A run isn't done
  until every box in its checklist is ticked or logged as a follow-up.
- **Spec-first.** If asked to build something with no spec, stop and run `/discover` then `/specify` first.
- **Discover-first.** Define *what* and *why* (an accepted `product-brief.md`) before *how* — no PRD against an undefined problem.
- **DB-sourced.** Don't hardcode data the database already holds.
- **Docs in Markdown.** Specs are Markdown (the source of truth); `/export-docs <slug>` renders
  shareable Word replicas into `specs/<slug>/exports/`. Edit the `.md` and re-export — never hand-edit the `.docx`.
- **Commit messages** end with the `Co-Authored-By: Claude <noreply@anthropic.com>` trailer.
- **One ticket = one branch = one PR.** See the Linear section above.
- **Linear status is machine-managed.** `/handoff` creates the ticket; `/implement` and `/track`
  move it through In Progress → In Review → Done. Don't set it by hand — it'll just get
  overwritten on the next sync and the two systems will drift.