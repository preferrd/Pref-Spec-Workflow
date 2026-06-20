# Technical Plan — {{Feature name}}

## Architecture overview
<!-- 3–6 sentences: how the pieces fit, mapped onto the stack profile. A small diagram is welcome. -->

## File / component breakdown
| Path | Responsibility | New / Edit |
|------|----------------|-----------|
| app/{{route}}/page.tsx | … | New |
| lib/{{module}}.ts | … | New |
| db/migrations/NNN_{{name}}.sql | … | New |

## Build sequence
<!-- Ordered phases. Each phase should leave the app in a working, buildable state. -->
1. …
2. …

## Data flow
<!-- Where data originates, how it moves (server component → DB, action → table, etc.). -->

## Dependencies & integrations
<!-- New packages, external APIs, env vars required. Justify each new dependency. -->

## Risks & mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| … | L/M/H | L/M/H | … |

## Rollout / deploy notes
<!-- Migrations to run, feature flags, backfill, anything Render needs. -->
