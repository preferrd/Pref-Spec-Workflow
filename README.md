# SDD AI Starter Kit

A **clone-anywhere template** for building new products with [Claude Code](https://docs.claude.com)
using **Spec-Driven Development** and **three specialised agents** (Design, Coding,
Test & Security).

The idea: stop hand-prompting Claude differently every time. Instead, every project starts
from the same opinionated skeleton — a product-manager brain that writes specs, a coder that
builds *from* those specs, and a reviewer that proves it works — wired together by slash
commands you run in order.

---

## What's in the box

- **`CLAUDE.md`** — the operating manual Claude reads first. Explains the pipeline, the agents, and the rules.
- **`.claude/agents/`** — the three agents (`design`, `coding`, `test-security`), each with a locked-down toolset.
- **`.claude/commands/`** — the pipeline commands: `/constitution`, `/discover`, `/specify`, `/handoff`, `/plan`, `/staff`, `/tasks`, `/implement`, `/verify` (+ `/track`, `/export-docs`, `/sdd-help`).
- **`templates/`** — blank product-brief / PRD / ERD / design-system / plan / API-contracts / team / tasks templates.
- **`memory/constitution.md`** — your project's principles (filled with sensible defaults).
- **`docs/stack-profile.md`** — your default stack + conventions. **Edit this per project.**
- **`AGENTS.md`** — Linear workspace/team + GitHub repo slug. **Edit this per project** if you
  want `/handoff` to create tickets and `/track` to sync their status automatically.
- **`design-system/`** — **drop your design system here before building.** It's a hard gate:
  UI builds are blocked until `INTAKE.md` says `Accepted: yes`.
- **`specs/0001-example-waitlist/`** — a fully worked example so you can see the end state.

---

## Use it on a new project

### Option A — GitHub "template repository" (recommended)
1. Push this folder to a new GitHub repo.
2. On GitHub: **Settings → General → Template repository → ✅**.
3. For every new product: **Use this template → Create a new repository**, then `git clone` it.

### Option B — clone & copy
```bash
git clone <your-fork-url> my-new-product
cd my-new-product
rm -rf .git && git init        # start fresh history for the new product
```

### Then, once, per new project
1. Open **`docs/stack-profile.md`** and edit it to match what you're building (or keep the defaults if it's another Next.js + Postgres app).
2. In Claude Code, run **`/constitution`** to set your project principles (or edit `memory/constitution.md` by hand).
3. **Provide your design system:** drop tokens/components/brand assets into `design-system/dropzone/` and run **`/design-system`** (or author `design-system/tokens.css` + `components.md` directly). UI builds stay blocked until it's accepted.
4. **(Optional) Fill in `AGENTS.md`** with your Linear workspace/team and GitHub repo slug if you
   want `/handoff` to create Linear tickets and `/track` to sync their status. Leave it blank and
   those steps just get skipped.
5. Delete `specs/0001-example-waitlist/` when you no longer need the reference.

---

## Daily loop

Two phases meeting at `/handoff` — **product** defines what & why, **engineering** builds it.
Same repo, same session, or a completely different one; `/handoff` is what hands the ticket over.

```text
# Product phase
/discover <one-line idea>     → design agent runs a PM interview, writes the product brief
   review specs/NNNN-slug/product-brief.md … confirm it (Discovery: accepted) …
/specify  <slug>              → design agent writes PRD + ERD + design system
   review specs/NNNN-slug/ … approve the PRD (Status: Approved) …
/handoff  <slug>              → creates a self-contained Linear ticket (skip if you don't use
                                 Linear) — this is the hand-off to engineering

# Engineering phase — starts from the ticket, not necessarily here
/plan     <slug>              → design agent writes the technical plan + API contracts
/staff    <slug>              → design agent picks which roles/folders build this feature
/tasks    <slug>              → design agent writes an ordered, checkable task list
/implement <slug>            → coding agent builds the tasks, commits as it goes
/verify   <slug>             → test-security agent writes/runs tests + security audit
```

Stop and review after any step. The markdown in `specs/<slug>/` is the contract — read it
before you let `/implement` run. If you're handing off to someone else, your part ends at
`/handoff`; running `/plan` onward yourself is only for when you're also building it.

---

## Why three agents?

Separation of powers. The **design** agent literally cannot run code (no shell access), so it
stays focused on *what* to build