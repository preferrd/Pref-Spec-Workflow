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
- **`.claude/commands/`** — the pipeline commands: `/constitution`, `/specify`, `/plan`, `/tasks`, `/implement`, `/verify` (+ `/sdd-help`).
- **`templates/`** — blank PRD / ERD / design-system / plan / API-contracts / tasks templates.
- **`memory/constitution.md`** — your project's principles (filled with sensible defaults).
- **`docs/stack-profile.md`** — your default stack + conventions. **Edit this per project.**
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
4. Delete `specs/0001-example-waitlist/` when you no longer need the reference.

---

## Daily loop

```text
/specify  <one-line idea>     → design agent writes PRD + ERD + design system
   review specs/NNNN-slug/ … edit anything by hand …
/plan     <slug>              → design agent writes the technical plan + API contracts
/tasks    <slug>              → design agent writes an ordered, checkable task list
/implement <slug>            → coding agent builds the tasks, commits as it goes
/verify   <slug>             → test-security agent writes/runs tests + security audit
```

Stop and review after any step. The markdown in `specs/<slug>/` is the contract — read it
before you let `/implement` run.

---

## Why three agents?

Separation of powers. The **design** agent literally cannot run code (no shell access), so it
stays focused on *what* to build