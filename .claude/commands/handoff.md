---
description: Create the Linear ticket for an approved feature and link it back to the spec.
argument-hint: "<feature-slug>  (e.g. 0001-waitlist)"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

Begin the **Linear hand-off** for feature: $1

This command runs inline (not delegated to the `design` subagent, which has no shell access) —
same pattern as `/track`.

## Pre-flight (MANDATORY)
1. `specs/$1/tasks.md` must exist. If not, STOP and tell the user to run `/tasks $1` first —
   hand off only once the full task breakdown exists.
2. `specs/$1/prd.md` must contain the line `Status: Approved`. If it still reads `Draft`, STOP
   and tell the user to review and approve the PRD first. Do not hand off an unapproved spec.

## Idempotency check
Read the header of `specs/$1/tasks.md`. If it already has a `**Linear:**` line with a real
ticket ID (not the template's placeholder), STOP and report the existing ticket — ask the user
to confirm before creating a second one for the same feature.

## Read project config
Read `AGENTS.md` for the Linear workspace and team. If either is still a `{{placeholder}}`,
STOP and tell the user to fill in `AGENTS.md` first.

## Tool check
Run `linear config list` (via Bash). If the `linear` CLI isn't installed or the configured
workspace isn't listed, STOP and give the user: install link
(https://github.com/rusintez/linear), then `linear config add <name> <key>` or
`linear config default <name>`.

## Compose and create the ticket
One feature-level ticket (not per-task). Title from the PRD's feature name; description links
back to the spec:

```bash
linear -w {workspace} create-issue -t {team} --title "{feature title}" \
  -d "Spec: specs/$1/prd.md"
```

Flags shown are current as of this CLI's public docs (`-t` team, `-d` description, `-w`
workspace) — if your installed version differs, run `linear create-issue --help` and adapt
rather than guessing. Capture the created ticket's ID and URL from the command's output (use
`-f json` if your version supports it on `create-issue`, otherwise parse the printed
identifier/link).

If `AGENTS.md`'s "Default new-issue state" is set and differs from the CLI's default, look up
that state's ID for the team and set it with `linear update-issue <id> -s <stateId>` right after
creation.

## Write back
1. Replace the `**Linear:**` header line in `specs/$1/tasks.md` with
   `**Linear:** <ticket-id> — <url>`.
2. In `docs/progress.md`'s feature board, set/update the **Linear** column for `$1`'s row to
   `[<ticket-id>](<url>)`.

## Tell the user
- The branch/PR convention going forward: `<name>/<ticket-id>-<short-desc>`, one ticket = one
  branch = one PR (see `CLAUDE.md`'s "Relationship to Linear, branches, and PRs").
- The ticket's status will be kept in sync automatically: `/implement` moves it to **In
  Progress** when building starts; `/track` moves it to **In Review** once a PR is open and
  **Done** once it's merged. Don't hand-edit the status in Linear — it'll just get overwritten
  on the next sync and the two systems will drift.
- The next step is `/implement $1`.
