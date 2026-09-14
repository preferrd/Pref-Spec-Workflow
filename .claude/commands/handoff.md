---
description: Create the Linear ticket for an approved feature and link it back to the spec.
argument-hint: "<feature-slug>  (e.g. 0001-waitlist)"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

Begin the **Linear hand-off** for feature: $1

This command runs inline (not delegated to the `design` subagent, which has no shell access) —
same pattern as `/track`. It is the boundary between the **product phase** (`/discover` →
`/specify`) and the **engineering phase** (`/plan` → `/staff` → `/tasks` → `/implement` →
`/verify`) — see `CLAUDE.md`'s pipeline.

Ticket creation goes through the **Linear MCP connector** when it is available, and falls back to
the [`linear` CLI](https://github.com/rusintez/linear) when it is not. Prefer the MCP: it needs no
extra install, no second API key, and it resolves teams and states by name.

## Pre-flight (MANDATORY)
`specs/$1/prd.md` must exist and contain the line `Status: Approved`. If it still reads `Draft`,
or doesn't exist yet, STOP and tell the user to run `/specify $1` and approve the PRD first —
hand off once product has defined *what* and *why*, not before. (`/specify` always writes
`erd.md` and `design-system.md` alongside `prd.md`, so their presence is implied.)

`plan.md` and `tasks.md` are **not** expected to exist yet — this hand-off point is *before*
engineering's technical planning, by design. If either happens to already exist (someone ran
`/plan`/`/tasks` ahead of hand-off), that's fine; fold whatever's there into the ticket per
"Compose and create the ticket" below, but never require it.

## Idempotency check
Check, in order, the header of `specs/$1/tasks.md`, then `plan.md`, then `prd.md` — read the
first one that exists. If it has a `**Linear:**` line with a real ticket ID (not the template's
placeholder), STOP and report the existing ticket — ask the user to confirm before creating a
second one for the same feature.

## Read project config
Read `AGENTS.md` for the Linear **workspace** and **team**.

`AGENTS.md` formats vary between repos — this file is edited by hand per project, and a repo that
adopted the kit later may carry its own layout. Don't insist on one shape. Accept any of:
- a `## Linear` section with `Workspace` / `Team` rows (this template's default), or
- a `## Project Config` table with `Linear workspace` / `Linear org` rows, or
- a prose line such as `Linear Teams: Product (PRO), Engineering (ENG)`.

If a value is genuinely absent or still a `{{placeholder}}`, STOP and ask the user for it rather
than guessing — a ticket filed against the wrong team is worse than no ticket.

**Default new-issue state** is optional. If `AGENTS.md` sets one, honour it; if it doesn't, let the
team's own default apply rather than asking.

## Tool check
**Primary — Linear MCP.** Confirm the connector is live by listing teams (`list_teams`), and check
the team from `AGENTS.md` appears. If it does, use the MCP path below.

> **Tooling note.** The Linear MCP tool IDs are workspace-specific — they look like
> `mcp__<server-id>__save_issue`, where `<server-id>` differs per connector install. Match on the
> tool *name* (`list_teams`, `save_issue`, `list_issue_statuses`, `get_issue`), not on a hardcoded
> prefix. If your setup restricts tools per command, add the connector's tool IDs to
> `allowed-tools` in this file's frontmatter.

**Fallback — `linear` CLI.** Only if no Linear MCP connector is present. Run `linear config list`
(via Bash). If the CLI isn't installed or the configured workspace isn't listed, STOP and give the
user both routes: connect the Linear MCP connector (preferred), or install the CLI
(https://github.com/rusintez/linear) and run `linear config add <name> <key>` /
`linear config default <name>`.

## Compose and create the ticket
One **feature-level** ticket, not one per task. Title from the PRD's feature name.

### The ticket must stand on its own

**Write the description as the deliverable, not as a pointer to one.** Whoever picks this up may
have no access to the spec markdown: the spec branch may be unpushed, uncommitted, or on a machine
that isn't theirs, and some teams never commit the specs at all — the ticket *is* the record. A
description that says only `Spec: specs/<slug>/prd.md` is a dangling reference the moment any of
that is true.

So a developer who has never seen this repo's `specs/` folder should be able to read the ticket and
start work. Include, drawn from `product-brief.md`, `prd.md`, `erd.md`, and `design-system.md` —
**not** `plan.md`/`api-contracts.md`, which don't exist at this point in the pipeline:

- **Why** — the problem and who has it, in a few lines. Not the full brief; the part that changes
  what gets built.
- **Scope** — the Must list, with the MVP line explicit, plus what is deliberately **out** of scope.
  Non-goals prevent more rework than requirements do.
- **Acceptance criteria** — the PRD's Given/When/Then, verbatim. These are the contract.
- **Data model** — from `erd.md`: entities, fields/types, relationships, constraints. Enough to
  start designing the schema/API against.
- **UI / design notes** — from `design-system.md`: which screens/components/states this feature
  needs, referencing the `design-system/` foundation tokens/components by name (not by file path
  the reader may not have).
- **Decisions already made, and why** — anything the brief/PRD settled deliberately. Without the
  reasoning these get silently "simplified" back into whatever the spec ruled out.
- **Open questions** — what is genuinely still undecided and who decides it. Be explicit that these
  are open, so the developer raises them rather than quietly picking.
- **Relationships** — the parent epic, anything this blocks or is blocked by, and any sequencing
  constraint that affects when it should be picked up.
- **Not yet planned** — state plainly that architecture, file breakdown, and the task list don't
  exist yet: `/plan` (and `/staff`, `/tasks`) haven't run. This is expected, not a gap — technical
  planning is engineering's next step, whether that happens in this repo or wherever the assignee
  works. If `plan.md` or `tasks.md` *do* already exist (see Pre-flight), include their content here
  instead of this note.

If the spec files are not committed anywhere the developer can reach, **say so in the description**
rather than leaving a path that looks resolvable — e.g. a leading note that the spec set is not in
the repo and this description is the authoritative version.

Keep it readable — headings and short sections, not a wall of prose. Linear renders Markdown.

**Parent issue.** If the spec records an intended parent epic — check the brief and PRD for a stated
parent, e.g. "belongs as a sub-issue under ENG-685" — file it as a sub-issue of that ticket rather
than flat. Getting this wrong is tedious to undo once work references the ticket, so if the spec is
silent, ask the user instead of defaulting to a top-level issue.

### MCP path (preferred)

Call `save_issue` **without** an `id` (passing `id` updates an existing issue instead of creating
one):

| Parameter   | Value                                                                       |
| ----------- | --------------------------------------------------------------------------- |
| `team`      | Team name or ID from `AGENTS.md` (required)                                  |
| `title`     | The PRD's feature name (required)                                            |
| `description` | The self-contained write-up composed above. Markdown                      |
| `parentId`  | The parent epic's identifier (e.g. `ENG-685`), when the spec names one       |
| `state`     | Only if `AGENTS.md` sets a default new-issue state                           |
| `project`   | Only if the spec or `AGENTS.md` names one                                    |

Two things the MCP does that the CLI does not, and which remove steps this command used to need:
- `state` accepts a **state name** (`"Todo"`, `"Backlog"`), so there is no separate state-ID lookup
  and no follow-up update call. Use `list_issue_statuses` only if a name is rejected.
- `description` takes **literal** Markdown. Do not escape it — real newlines, not `\n`.

Read the ticket identifier and URL from the response.

### CLI path (fallback)

```bash
linear -w {workspace} create-issue -t {team} --title "{feature title}" \
  -d "$(cat /path/to/composed-description.md)"
```

Pass the same self-contained description composed above. It is long, so write it to a file and
read it in rather than inlining it — a shell-quoted multi-line string with backticks and Markdown
in it is a reliable way to lose content silently.

Flags shown are current as of this CLI's public docs (`-t` team, `-d` description, `-w`
workspace) — if your installed version differs, run `linear create-issue --help` and adapt
rather than guessing. Capture the created ticket's ID and URL from the command's output (use
`-f json` if your version supports it on `create-issue`, otherwise parse the printed
identifier/link).

If `AGENTS.md`'s "Default new-issue state" is set and differs from the CLI's default, look up
that state's ID for the team and set it with `linear update-issue <id> -s <stateId>` right after
creation. Unlike the MCP path, this one does need the state **ID**, not the name.

## Write back
Write the `**Linear:**` header line (`**Linear:** <ticket-id> — <url>`) into whichever of these
exists, most-specific first: `specs/$1/tasks.md`, else `specs/$1/plan.md`, else `specs/$1/prd.md`.
At the normal hand-off point that's `prd.md` — `/plan` and `/tasks` will carry this same line
forward into `plan.md` and `tasks.md` once engineering runs them (see those commands).

Also update `docs/progress.md`'s feature board: set/update the **Linear** column for `$1`'s row to
`[<ticket-id>](<url>)`.

Skip either step without error if the file isn't there — the ticket is what matters, and on a
hand-off where the specs are never committed these back-links are a convenience, not the record.

## Tell the user
- The ticket ID, its URL, and its parent epic if it was filed as a sub-issue.
- The branch/PR convention going forward: `<name>/<ticket-id>-<short-desc>`, one ticket = one
  branch = one PR (see `CLAUDE.md`'s "Relationship to Linear, branches, and PRs").
- **This is the product → engineering boundary.** The ticket is self-contained on purpose — the
  next phases (`/plan` → `/staff` → `/tasks` → `/implement` → `/verify`) are engineering's, and
  may happen in this repo, in a different clone of it, or outside the kit entirely. Don't assume
  you (product) run `/plan` next unless you're also the one building it.
- If the feature *is* being built in this repo, the ticket's status stays in sync automatically:
  `/implement` moves it to **In Progress** when building starts; `/track` moves it to **In
  Review** once a PR is open and **Done** once it's merged. Don't hand-edit the status in Linear —
  it'll just get overwritten on the next sync. A developer working outside this repo won't trigger
  those syncs, so in that case the status is theirs to manage.
- The next step is `/plan $1` — for whoever owns engineering on this feature.
