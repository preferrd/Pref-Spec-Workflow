---
description: Run product discovery — a PM interview that defines WHAT to build, before any PRD.
argument-hint: "<one-line idea or problem to explore>"
allowed-tools: Task, Read, Write, Edit, Glob, Grep
---

Begin the **Discover** phase for: $ARGUMENTS

This is the "what to build" gate. No PRD is written until the resulting brief is accepted.

Steps:
1. Read `memory/constitution.md` and `docs/stack-profile.md`.
2. Choose the feature folder: look at existing `specs/` folders, pick the next zero-padded
   number, build a short kebab-case slug from the idea, and create `specs/NNNN-slug/`.
3. Delegate to the **`design`** subagent to run a structured product-discovery interview using
   `templates/product-brief.template.md`, working through the themes **one at a time** (problem
   & evidence → jobs-to-be-done → users → goals/metrics → MoSCoW scope → non-goals → journeys →
   alternatives → assumptions/risks → open questions). It must:
   - Ask sharp questions per theme and **challenge solution-first answers** — dig for the real
     problem. Never invent the user's intent.
   - Force prioritisation (if everything is a Must, nothing is) and an explicit MVP line.
   - Write `specs/NNNN-slug/product-brief.md` with `Discovery: draft`.
4. Show the user the brief, iterate until they are satisfied, and resolve the open questions.
   **Only after the user explicitly confirms**, set `Discovery: accepted` and fill the sign-off.
   Do not flip the gate on the user's behalf.
5. Add the feature to the **Feature board** in `docs/progress.md` with the **Discover** box ticked.

Finish by stating whether Discovery is ACCEPTED, and that the next step is `/specify NNNN-slug`.
