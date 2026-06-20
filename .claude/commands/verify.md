---
description: Test and security-audit the implementation against the spec.
argument-hint: "<feature-slug>  (e.g. 0001-waitlist)"
allowed-tools: Task, Read, Write, Bash, Glob, Grep
---

Begin the **Verify** phase for feature: $1

Steps:
1. Read `specs/$1/prd.md` (acceptance criteria), `api-contracts.md` (the contract),
   `specs/$1/design-system.md` + the foundation in `design-system/`, and the code produced.
2. Delegate to the **`test-security`** subagent to:
   - Write tests mapping to each acceptance criterion (happy path, edges, errors) and run them.
   - Run a security audit (injection, authz/IDOR, secrets, dependency CVEs, data exposure,
     rate limiting).
   - **Design-system compliance check:** flag any UI that styles outside the token/component
     vocabulary (e.g. raw hex/px colors not sourced from `design-system/tokens.css`), missing
     focus/empty/loading states, or contrast below WCAG AA.
   - Write `specs/$1/verification.md` with a spec-compliance checklist, design-system
     compliance, test results, a severity-ranked findings table, and a SHIP / FIX-FIRST verdict.
3. The agent creates test files only — it must not edit application source. Fixes go back to
   `/implement $1` for the coding agent.

## Track
After the audit, update the project tracking layer (or run `/track $1`):
- Append entries to `CHANGELOG.md` under `[Unreleased]`: log any vulnerabilities found/fixed
  under **Security**, and note the verification under **Docs** if no code changed.
- In `docs/progress.md`: tick the **Verify** box on the feature board row for `$1`, set the
  **Verdict** column (SHIP / FIX-FIRST), and append a filled-in post-run checklist (from
  `templates/post-run-checklist.template.md`) to the Run log. Any FIX-FIRST finding becomes an
  unchecked follow-up item.

Finish by reporting the verdict, the tracking checklist, and listing any blocking items.
