# Mission Control

A live, zero-dependency dashboard that monitors the SDD pipeline as a feature is built.
It reads the kit's own artifacts — no database, no `npm install`, no agent hooks.

## Run

```bash
node mission-control/server.js          # http://localhost:4317
node mission-control/server.js 8080     # custom port
```

Open the URL. The page polls every 3 seconds, so you can run `/implement <slug>` in one
window and watch task checkboxes flip, the pipeline advance, and commits land in the other.

## What it shows

- **Gates** — constitution set? design-system `INTAKE.md` accepted?
- **Feature cards** — for every folder in `specs/`:
  - the 7-node pipeline (Discover → Spec → Plan → Staff → Tasks → Impl → Verify),
    coloured by what exists / what the board says (done · in-progress · todo)
  - a live task progress bar + checklist parsed from `tasks.md`
  - the staffed role lanes (`web/`, `api/`, …) from `team.md`
  - the verdict from the feature board
- **Commit stream** — last 20 commits (`git log`)
- **Changelog** — entries under `[Unreleased]`

## How it works

`server.js` parses `docs/progress.md`, each `specs/<slug>/{tasks,team}.md` + doc presence,
`CHANGELOG.md`, and `git log`, exposing them at `GET /api/state`. `index.html` renders that
JSON and re-fetches on a timer. Everything is derived from files on disk, so it reflects
manual edits and agent runs identically.
