#!/usr/bin/env bash
# Scaffold a new feature spec folder from the templates.
# Usage:  scripts/new-feature.sh "short slug or idea"
# (Windows: run via Git Bash. Or just use the /specify command, which does this for you.)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SPECS="$ROOT/specs"
TPL="$ROOT/templates"

if [ $# -lt 1 ]; then
  echo "usage: scripts/new-feature.sh \"feature slug or short idea\"" >&2
  exit 1
fi

# slugify the argument: lowercase, spaces->dashes, strip non-alnum/dash
slug="$(echo "$*" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g' | cut -c1-40)"

# next zero-padded number
last="$(find "$SPECS" -maxdepth 1 -type d -name '[0-9][0-9][0-9][0-9]-*' 2>/dev/null \
        | sed -E 's@.*/([0-9]{4})-.*@\1@' | sort -n | tail -1 || true)"
next="$(printf '%04d' $(( 10#${last:-0} + 1 )))"

dir="$SPECS/${next}-${slug}"
mkdir -p "$dir"

cp "$TPL/prd.template.md"            "$dir/prd.md"
cp "$TPL/erd.template.md"            "$dir/erd.md"
cp "$TPL/design-system.template.md"  "$dir/design-system.md"
cp "$TPL/plan.template.md"           "$dir/plan.md"
cp "$TPL/api-contracts.template.md"  "$dir/api-contracts.md"
cp "$TPL/tasks.template.md"          "$dir/tasks.md"

echo "Created $dir"
echo "Next: run  /specify  in Claude Code, or fill the files in by hand."
