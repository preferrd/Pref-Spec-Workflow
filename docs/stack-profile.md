# Stack Profile

> **EDIT THIS FILE FIRST in every new project.** Every agent reads it before acting, so it is
> what makes the same template produce a Next.js app in one repo and something else in another.
> The defaults below match the author's existing products — keep them or replace them.

## Product type
<!-- One line: what is this? e.g. "Server-rendered web dashboard backed by Postgres." -->
Web application with a server-rendered dashboard, backed by Postgres, with optional Python
data/agent services.

## Web app
- **Framework:** Next.js 14 (App Router, React Server Components).
- **Language:** TypeScript, `strict: true`. No `any`.
- **Styling:** Tailwind CSS 3 + CSS custom properties for theming (light/dark via `data-theme`).
  The **source of truth is `design-system/tokens.css` + `design-system/components.md`** (provided
  before any UI build); Tailwind theme keys map onto those CSS vars. No raw hex/px in app code.
- **Data fetching:** **server-side only** — fetch in server components; no client-side data
  fetching. DB client cached on `globalThis` to avoid dev pool exhaustion.
- **Path alias:** `@/*`.

## Services / agents (optional)
- **Language/runtime:** Python 3.11+.
- **API:** FastAPI + Uvicorn. **CLI:** Typer. **Config:** `pydantic-settings` (env-driven).
- **DB access:** SQLAlchemy 2 + psycopg.

## Database
- **PostgreSQL** (Supabase). Connection via `DATABASE_URL`.
- **Migrations:** numbered SQL files `db/migrations/NNN_name.sql`. Never edit a shipped one.
- snake_case tables and columns.

## Testing
- **Python:** `pytest` + `pytest-asyncio` + `respx` (mock external HTTP).
- **Web:** `npm run build` + `npx tsc --noEmit` are the gate. Add Vitest (unit) and/or
  Playwright (e2e) per project if the feature warrants it — note it here when you do.

## Lint / format
- **Python:** `ruff` (line-length 100, target py311). **TypeScript:** `tsc` typecheck.

## Environment
- Web: `.env.local`. Services: `.env`. Both gitignored. Track `.env.example` only.
- Public web vars must be prefixed `NEXT_PUBLIC_`.

## Deploy
- **Render** web service (root dir = the web app, `npm run build` / `npm start`).

## Conventions
- **Files:** kebab-case. **Components:** PascalCase. **Functions/vars:** camelCase.
  **Constants:** UPPER_SNAKE_CASE. **DB:** snake_case.
- **Commits:** conventional (`feat:`, `fix:`, `chore:` …) + `Co-Authored-By: Claude` trailer.

## Command cheat-sheet
```bash
# Web
npm install
npm run dev            # local dev
npm run build          # MUST pass before commit
npx tsc --noEmit       # typecheck

# Services (per service dir)
python -m venv .venv && source .venv/bin/activate
pip install -e .