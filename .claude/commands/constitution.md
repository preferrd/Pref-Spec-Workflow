---
description: Establish or update the project's guiding principles (run once per project).
argument-hint: "[optional: notes or priorities to fold in]"
allowed-tools: Task, Read, Write, Edit, Glob, Grep
---

Set up this project's **constitution** — the non-negotiable principles every later phase must
respect (quality bar, testing posture, security baseline, UX standards, performance budgets,
what "done" means).

Steps:
1. Read the current `memory/constitution.md` and `docs/stack-profile.md`.
2. Delegate to the **`design`** subagent to refine `memory/constitution.md` for THIS project,
   folding in any extra direction from: $ARGUMENTS
3. Ask the user up to 3 sharp questions only if a principle is genuinely undecidable from
   context (e.g., compliance constraints, performance targets). Otherwise choose sensible
   defaults and note them.
4. Save the result to `memory/constitution.md`. Keep it to one page of clear, testable rules —
   each rule should say *what* and *why* so it generalises.

Output: a short confirmation of the principles set, and a reminder that `/specify` is next.
