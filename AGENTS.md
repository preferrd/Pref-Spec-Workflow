# AGENTS.md

> **Edit this once per project.** SDD automation (`/handoff`, `/implement`, `/track`) reads this
> file for the Linear workspace/team and GitHub repo slug it needs to create and sync tickets.
> Leave a row blank and the commands that need it will stop and ask, rather than guess.

## Linear

| Key                      | Value                                       |
| ------------------------ | -------------------------------------------- |
| Workspace                | `{{linear-workspace-slug}}`                  |
| Team (name or ID)        | `{{e.g. "Engineering" or team ID}}`          |
| Default new-issue state  | `{{e.g. "Todo" or "Backlog"}}`               |

Requires the [`linear` CLI](https://github.com/rusintez/linear) installed and authenticated:
`linear config list` should show this workspace (add one with `linear config add <name> <key>`,
or set `LINEAR_API_KEY` for one-off use). Ticket state changes take a **state ID**, not a plain
name — commands that need one look it up per-team rather than assuming a fixed ID.

## GitHub

| Key       | Value             |
| --------- | ----------------- |
| Repo slug | `{{org/repo}}`    |

Requires `gh` authenticated (`gh auth status`). Used by `/track` to check a feature's PR state
(open → Linear "In Review", merged → "Done") — only needed once you use that status-sync step.

## Team identity map (optional)

Only fill this in if you want commands to assign or @-mention people by name instead of asking
you each time. Join key: email.

| Name | Email | GitHub | Linear |
| ---- | ----- | ------ | ------ |
| …    | …     | …      | …      |
