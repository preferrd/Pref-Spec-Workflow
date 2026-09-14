# AGENTS.md

> **Edit this once per project.** SDD automation (`/handoff`, `/implement`, `/track`) reads this
> file for the Linear workspace/team and GitHub repo slug it needs to create and sync tickets.
> Leave a row blank and the commands that need it will stop and ask, rather than guess.

## Linear

| Key                      | Value                                       |
| ------------------------ | -------------------------------------------- |
| Workspace                | `{{linear-workspace-slug}}`                  |
| Team (name or ID)        | `{{e.g. "Engineering" or team ID}}`          |
| Default new-issue state  | `{{optional — e.g. "Todo"; blank uses the team's own default}}` |

Needs **one** of these two routes — `/handoff`, `/implement` and `/track` try them in this order:

1. **Linear MCP connector (preferred).** Nothing to install and no second API key; it resolves
   teams and states **by name**, so no state-ID lookups. Connect it in your Claude connector
   settings.
2. **[`linear` CLI](https://github.com/rusintez/linear) (fallback).** Install it, then
   `linear config list` should show this workspace (add one with `linear config add <name> <key>`,
   or set `LINEAR_API_KEY` for one-off use). Unlike the MCP, ticket state changes take a **state
   ID**, not a plain name — commands that need one look it up per-team rather than assuming a
   fixed ID.

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
