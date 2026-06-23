#!/usr/bin/env node
// SDD Mission Control — zero-dependency live dashboard.
// Reads the pipeline's own artifacts (progress board, per-feature specs, changelog, git)
// and serves them as JSON to a polling browser page. Run: `node mission-control/server.js`.

const http = require("http");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const PORT = Number(process.argv[2] || process.env.PORT || 4317);
const SEP = ""; // unit separator for git fields

// ----- small fs helpers -------------------------------------------------
const read = (rel) => {
  try {
    return fs.readFileSync(path.join(ROOT, rel), "utf8");
  } catch {
    return null;
  }
};
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));
const listDirs = (rel) => {
  try {
    return fs
      .readdirSync(path.join(ROOT, rel), { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return [];
  }
};

const statusFromBox = (cell) => {
  if (/\[x\]/i.test(cell)) return "done";
  if (/\[~\]/.test(cell)) return "active";
  return "todo";
};

// ----- parsers ----------------------------------------------------------

// docs/progress.md feature board → rows
function parseBoard() {
  const md = read("docs/progress.md");
  if (!md) return [];
  const rows = [];
  let inTable = false;
  for (const line of md.split("\n")) {
    const t = line.trim();
    if (/^\|\s*Feature\s*\|/i.test(t)) {
      inTable = true;
      continue;
    }
    if (inTable) {
      if (!t.startsWith("|")) {
        inTable = false;
        continue;
      }
      if (/^\|[\s:|-]+\|$/.test(t)) continue; // separator row
      const cells = t.slice(1, -1).split("|").map((c) => c.trim());
      if (cells.length < 6) continue;
      const slugMatch = cells[0].match(/`([^`]+)`/);
      rows.push({
        feature: slugMatch ? slugMatch[1] : cells[0].replace(/[*`]/g, ""),
        label: cells[0].replace(/`/g, "").replace(/\*/g, "").trim(),
        phases: {
          Spec: statusFromBox(cells[1]),
          Plan: statusFromBox(cells[2]),
          Tasks: statusFromBox(cells[3]),
          Impl: statusFromBox(cells[4]),
          Verify: statusFromBox(cells[5]),
        },
        verdict: (cells[6] || "").replace(/[`*]/g, "").trim(),
        notes: (cells[7] || "").trim(),
      });
    }
  }
  return rows;
}

// specs/<slug>/tasks.md → task list with completion
function parseTasks(slug) {
  const md = read(`specs/${slug}/tasks.md`);
  if (!md) return { total: 0, done: 0, items: [] };
  const items = [];
  for (const line of md.split("\n")) {
    const m = line.match(/^\s*-\s*\[( |x|~)\]\s+(.*)$/i);
    if (!m) continue;
    const state = m[1].toLowerCase();
    const title = m[2].replace(/\*\*/g, "").trim();
    items.push({ done: state === "x", active: state === "~", title });
  }
  return { total: items.length, done: items.filter((i) => i.done).length, items };
}

// specs/<slug>/team.md → active role lanes
function parseTeam(slug) {
  const md = read(`specs/${slug}/team.md`);
  if (!md) return [];
  const lanes = [];
  for (const line of md.split("\n")) {
    const t = line.trim();
    if (!t.startsWith("|")) continue;
    const cells = t.slice(1, -1).split("|").map((c) => c.trim());
    if (cells.length < 4) continue;
    if (/^role$/i.test(cells[0]) || /^[\s:-]+$/.test(cells[0])) continue;
    const needed = /yes/i.test(cells[1]);
    const folder = (cells[3] || "").replace(/`/g, "").trim();
    if (!cells[0]) continue;
    lanes.push({
      role: cells[0].replace(/\*/g, "").trim(),
      active: needed,
      folder: folder && folder !== "—" ? folder : null,
    });
  }
  return lanes;
}

// Which spec docs exist (drives the full pipeline view)
function phaseFiles(slug) {
  const f = (name) => exists(`specs/${slug}/${name}`);
  return {
    Discover: f("product-brief.md"),
    Spec: f("prd.md") || f("erd.md"),
    Plan: f("plan.md") || f("api-contracts.md"),
    Staff: f("team.md"),
    Tasks: f("tasks.md"),
    Verify: f("verification.md"),
  };
}

// CHANGELOG [Unreleased] non-empty entries by category
function parseChangelog() {
  const md = read("CHANGELOG.md");
  if (!md) return [];
  const out = [];
  let inUnreleased = false;
  let inComment = false;
  let cat = null;
  for (const line of md.split("\n")) {
    if (/^##\s+\[Unreleased\]/i.test(line)) { inUnreleased = true; continue; }
    if (!inUnreleased) continue;
    if (/^##\s+/.test(line) || /^---\s*$/.test(line)) break; // next section / horizontal rule ends it
    if (/<!--/.test(line)) inComment = true;
    if (inComment) { if (/-->/.test(line)) inComment = false; continue; }
    const c = line.match(/^###\s+(\w+)/);
    if (c) { cat = c[1]; continue; }
    const e = line.match(/^\s*-\s+(.*)$/);
    if (e && cat && !/_nothing yet/i.test(e[1])) {
      out.push({ category: cat, text: e[1].replace(/`/g, "").trim() });
    }
  }
  return out;
}

function gitLog() {
  try {
    const fmt = `--pretty=format:%h${SEP}%s${SEP}%ar${SEP}%an`;
    const raw = execFileSync("git", ["-C", ROOT, "log", "-n", "20", fmt], { encoding: "utf8" });
    return raw.split("\n").filter(Boolean).map((l) => {
      const [hash, subject, when, author] = l.split(SEP);
      return { hash, subject, when, author };
    });
  } catch {
    return [];
  }
}

function gates() {
  const intake = read("design-system/INTAKE.md") || "";
  return {
    constitution: !!read("memory/constitution.md"),
    designSystem: /Accepted:\s*yes/i.test(intake)
      ? "accepted"
      : exists("design-system/INTAKE.md")
      ? "pending"
      : "missing",
  };
}

function buildState() {
  const board = parseBoard();
  const slugs = listDirs("specs");
  const boardSlugs = new Set(board.map((b) => b.feature));
  for (const s of slugs) {
    if (!boardSlugs.has(s)) {
      board.push({ feature: s, label: s, phases: {}, verdict: "", notes: "(not on board)" });
    }
  }

  const features = board
    .filter((b) => b.feature && exists(`specs/${b.feature}`))
    .map((b) => ({
      slug: b.feature,
      label: b.label,
      verdict: b.verdict,
      notes: b.notes,
      boardPhases: b.phases,
      files: phaseFiles(b.feature),
      tasks: parseTasks(b.feature),
      lanes: parseTeam(b.feature),
    }));

  return {
    repo: path.basename(ROOT),
    generatedAt: new Date().toISOString(),
    gates: gates(),
    features,
    changelog: parseChangelog(),
    commits: gitLog(),
  };
}

// ----- http server ------------------------------------------------------
const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/state")) {
    let body;
    try {
      body = JSON.stringify(buildState());
    } catch (e) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: String(e) }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    res.end(body);
    return;
  }
  const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

server.listen(PORT, () => {
  console.log(`\n  SDD Mission Control -> http://localhost:${PORT}`);
  console.log(`  Watching: ${ROOT}`);
  console.log(`  Dashboard auto-refreshes every 3s. Ctrl+C to stop.\n`);
});
