---
description: Record a change in CHANGELOG.md + docs/progress.md and emit a post-run checklist.
argument-hint: "<feature-slug | -> [short description of what changed]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

Update the project tracking layer after a run or manual change. Feature: $1 — change: $2

Do this precisely; do not invent results you did not verify.

## 1. Gather facts
- Determine the **phase** (Specify / Plan / Tasks / Implement / Verify / Manual / Docs) and the
  **owning agent** for this change.
- Get the latest commit hash if any: `git log -1 --pretty=format:%h` (run via Bash). If the
  change is not yet committed, note `uncommitted` and remind the user to commit.
- Read today's date from the environment (do NOT guess); use `YYYY-MM-DD`.

## 2. CHANGELOG.md — categorize the change
Append one line per change under `[Unreleased]`, in the correct category
(**Added / Changed / Fixed / Removed / Security / Docs**), newest at the top of that category:

- `<imperative summary> — \`specs/$1\` ([\`<hash>\`])`

Remove the matching `_Nothing yet._` placeholder once a real entry exists.

## 3. docs/progress.md — feature board + run log
1. **Feature board:** find the row for `$1` (create it if missing) and tick the box for the
   phase that just completed; set the **Verdict** column if this was a `/verify` run.
2. **Run log:** copy the block from `templates/post-run-checklist.template.md` to the TOP of the
   Run log, fill every `{{...}}` field, and check each box you can truthfully confirm. Leave a
   box unchecked only if it genuinely failed — that unchecked box is the user's follow-up.

## 4. Linear status sync (skip silently if no ticket)
Check `specs/$1/tasks.md`'s header for a `**Linear:**` line with a real ticket ID (from
`/handoff`). If present, and the `linear`/`gh` CLIs are configured (check `AGENTS.md`):
1. Find the PR for the current feature branch: `gh pr view --json state,url,number` (or
   `gh pr list --head <branch> --json state,url,number` if not on that branch). If there's no
   PR yet, leave the ticket as-is (still In Progress from `/implement`).
2. If the PR is **open**, sync the ticket to **In Review** (look up that state's ID for the
   team, then `linear update-issue <id> -s <stateId>`) — do this every run while it's open, even
   after checks pass; only move past it once merged.
3. If the PR is **merged**, sync the ticket to **Done**.
Skip this whole step without error if `gh` isn't authenticated, there's no ticket ID, or the
feature has no branch/PR yet — status sync is best-effort, never blocks tracking.

## 5. Report
Print the filled-in checklist back to the user and call out any unchecked box as an open item.
If anything is `uncommitted`, tell them the exact `git add`/`commit` to run. Note any Linear
status sync performed (or why it was skipped).
