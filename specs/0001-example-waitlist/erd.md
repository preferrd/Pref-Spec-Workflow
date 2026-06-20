# Data Model / ERD — Waitlist (WORKED EXAMPLE)

## Entities

### waitlist_signup
| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | bigint | PK, generated always as identity | |
| email | citext | not null, unique | `citext` makes uniqueness case-insensitive |
| source | text | null | optional UTM/landing source |
| ip_hash | text | null | salted hash of IP for rate-limit/audit (not raw IP) |
| created_at | timestamptz | not null, default now() | |

### waitlist_rate (optional, for rate limiting without external store)
| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| ip_hash | text | not null | |
| window_start | timestamptz | not null | start of the 60s bucket |
| count | int | not null, default 0 | submissions in the window |
| | | PK (ip_hash, window_start) | |

## Relationships
- None. `waitlist_signup` is standalone. `waitlist_rate` is operational only (not linked).

## Indexes
- `waitlist_signup`: unique index on `email` (from the constraint); index on `created_at desc`
  for the admin list ordering.
- `waitlist_rate`: PK covers lookups; a periodic job (or `created_at` filter) prunes old windows.

## Migration sketch
```sql
-- db/migrations/001_waitlist.sql
create extension if not exists citext;

create table if not exists waitlist_signup (
  id          bigint generated always as identity primary key,
  email       citext      not null unique,
  source      text,
  ip_hash     text,
  created_at  timestamptz not null default now()
);
create index if not exists waitlist_signup_created_idx on waitlist_signup (created_at desc);

create table if not exists waitlist_rate (
  ip_hash      text        not null,
  window_start timestamptz not null,
  count        int         not null default 0,
  primary key (ip_hash, window_start)
);
```

## Notes
- **PII:** email is PII — never log it; never expose whether an email already exists.
- Store `ip_hash = sha256(ip + SERVER_SALT)`, not the raw IP, to rate-limit without retaining IPs.
- Hard delete is fine (no soft-delete needed for v1).
