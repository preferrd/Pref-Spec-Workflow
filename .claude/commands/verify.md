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

Finish by reporting the verdict and listing any blocking items.
