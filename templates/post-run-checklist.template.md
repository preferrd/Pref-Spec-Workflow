### {{DATE}} — {{SHORT_TITLE}}
- Phase: `{{PHASE}}` · Feature: `{{FEATURE_SLUG}}` · Agent: `{{AGENT}}`
- [ ] Change categorized in `CHANGELOG.md` (Added / Changed / Fixed / Removed / Security / Docs)
- [ ] Feature board row updated (phase box ticked / verdict set)
- [ ] Build/test gate green (`npm run build` + `tsc --noEmit`, or `ruff check` + `pytest`)
- [ ] Spec still matches reality (if code deviated, spec was fixed first)
- [ ] Committed with `Co-Authored-By: Claude` trailer (commit: `{{COMMIT}}`)
- Summary: {{ONE_LINE_SUMMARY}}
- Follow-ups: {{ANY_OPEN_ITEMS_OR_NONE}}

<!--
Phase ∈ {Specify, Plan, Tasks, Implement, Verify, Manual, Docs}
Agent ∈ {design, coding, test-security, claude}
Copy this block to the top of the Run log in docs/progress.md and fill the {{...}} fields.
Leave a box unchecked only if it genuinely failed — that box is your follow-up.
-->
