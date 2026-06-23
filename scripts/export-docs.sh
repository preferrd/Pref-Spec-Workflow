#!/usr/bin/env bash
# Render a feature's spec markdown into shareable Word (.docx) replicas.
# Markdown stays the source of truth — these are generated copies.
# Usage:  scripts/export-docs.sh <feature-slug>          (Windows: run via Git Bash)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
slug="${1:-}"
[ -z "$slug" ] && { echo "usage: scripts/export-docs.sh <feature-slug>" >&2; exit 1; }

SPECS="$ROOT/specs/$slug"
[ -d "$SPECS" ] || { echo "no such feature: specs/$slug" >&2; exit 1; }

if ! command -v pandoc >/dev/null 2>&1; then
  echo "pandoc is not installed. Install it (https://pandoc.org/installing.html) or open the .md files directly." >&2
  exit 1
fi

OUT="$SPECS/exports"; mkdir -p "$OUT"
ORDER="product-brief prd erd design-system plan api-contracts team tasks verification"

present=""
for d in $ORDER; do
  if [ -f "$SPECS/$d.md" ]; then
    pandoc "$SPECS/$d.md" -o "$OUT/$d.docx"
    present="$present $SPECS/$d.md"
    echo "  wrote exports/$d.docx"
  fi
done

# Combined, shareable pack (title + table of contents, page breaks between docs)
tmp="$(mktemp)"; first=1
for f in $present; do
  [ $first -eq 1 ] || printf '\n\n```{=openxml}\n<w:p><w:r><w:br w:type="page"/></w:r></w:p>\n```\n\n' >> "$tmp"
  cat "$f" >> "$tmp"; first=0
done
pandoc "$tmp" -f markdown --toc --metadata title="$slug — Product Management Pack" -o "$OUT/00-product-management-pack.docx"
rm -f "$tmp"
echo "  wrote exports/00-product-management-pack.docx"
echo "Done → specs/$slug/exports/"
