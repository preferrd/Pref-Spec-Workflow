# specs/

One folder per feature, named `NNNN-slug` (zero-padded number + short kebab-case slug),
e.g. `0001-waitlist`. The `/specify` command creates these for you.

Each feature folder fills up as it moves through the pipeline:

| File | Created by | Phase |
|------|-----------|-------|
| `prd.md` | design | specify |
| `erd.md` | design | specify |
| `design-system.md` | design | specify |
| `plan.md` | design | plan |
| `api-contracts.md` | design | plan |
| `tasks.md` | design | tasks |
| `verification.md` | test-security | verify |

These markdown files are the **source of truth** for the feature. Read them before letting
`/implement` run, and edit them by hand whenever you disagree — the code follows the spec, not
the other way around.

See `0001-example-waitlist/` for a complete, filled-in reference. Delete it once you don't need
it.
