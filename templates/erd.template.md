# Data Model / ERD — {{Feature name}}

## Entities
<!-- One subsection per entity. Use snake_case for table and column names. -->

### {{entity_name}}
| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | uuid / bigint | PK | |
| … | | | |
| created_at | timestamptz | not null, default now() | |
| updated_at | timestamptz | not null, default now() | |

## Relationships
<!-- e.g. "user 1—* waitlist_signup (signup.user_id → user.id, on delete cascade)". -->

## Indexes
<!-- Indexes needed for the access patterns in the PRD (lookups, sorts, uniqueness). -->

## Migration sketch
```sql
-- db/migrations/NNN_{{name}}.sql
create table if not exists {{table}} (
  id          bigint generated always as identity primary key,
  -- columns…
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
-- indexes…
```

## Notes
<!-- Data lifecycle, retention/PII, soft vs hard delete, seeding. -->
