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

## 4. Report
Print the filled-in checklist back to the user and call out any unchecked box as an open item.
If anything is `uncommitted`, tell them the exact `git add`/`commit` to run.
