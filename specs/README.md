# specs/

One folder per feature, named `NNNN-slug` (zero-padded number + short kebab-case slug),
e.g. `0001-waitlist`. The `/discover` command creates the folder; later commands fill it.

Each feature folder fills up as it moves through the pipeline:

| File | Created by | Phase |
|------|-----------|-------|
| `product-brief.md` | design | discover (the *what to build* — gates `/specify`) |
| `prd.md` | design | specify |
| `erd.md` | design | specify |
| `design-system.md` | design | specify |
| `plan.md` | design | plan |
| `api-contracts.md` | design | plan |
| `team.md` | design | staff (which roles build it) |
| `tasks.md` | design | tasks |
| `verification.md` | test-security | verify |

These markdown files are the **source of truth** for the feature. The `product-brief.md` defines
what to build and why; the PRD is derived from it. Read them before letting `/implement` run, and
edit them by hand whenever you disagree — the code follows the spec, not the other way around.

Run `/export-docs <slug>` to render these into shareable Word files under `specs/<slug>/exports/`
(Markdown stays the source of truth). See `0001-example-waitlist/` for a complete, filled-in reference. Delete it once you don't need
it.

## Relationship to Linear

This folder is the **authoring workspace** — Linear stays the **execution tracker**. Once
`/tasks` has written a feature's `tasks.md` and its `prd.md` reads `Status: Approved`, run
**`/handoff <slug>`** to create the ticket automatically — it records the ticket ID in that
feature's `tasks.md` header and its row in `docs/progress.md`, and the status then syncs itself
(In Progress on `/implement`, In Review / Done via `/track` as the PR opens and merges). Branch/
PR/commit conventions (branch naming, one-ticket-one-branch-one-PR, commit format) live in
`CLAUDE.md`'s "Relationship to Linear, branches, and PRs" section. If `AGENTS.md` isn't filled
in, `/handoff` just tells you to fill it in — it's optional, not a hard gate on the pipeline.
