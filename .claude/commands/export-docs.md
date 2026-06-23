---
description: Render a feature's spec markdown into shareable Word (.docx) replicas.
argument-hint: "<feature-slug>  (e.g. 0001-waitlist)"
allowed-tools: Bash, Read, Glob
---

Produce Word replicas of the project-management documents for feature: $1

Important: Markdown is the **source of truth**; these `.docx` files are generated copies for
sharing. Never hand-edit the `.docx` — edit the `.md` and re-export.

Steps:
1. Run `scripts/export-docs.sh $1`. It uses **pandoc** to render each spec
   (`product-brief`, `prd`, `erd`, `design-system`, `plan`, `api-contracts`, `team`, `tasks`,
   `verification` — whichever exist) into `specs/$1/exports/`, plus a combined
   `00-product-management-pack.docx` with a title page and table of contents.
2. If pandoc is not installed, say so and stop — do not hand-roll the conversion.
3. Report the list of `.docx` files written.
