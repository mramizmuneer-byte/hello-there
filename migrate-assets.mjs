#!/usr/bin/env node
/**
 * migrate-assets.mjs  —  run from the PROJECT ROOT (the folder with package.json).
 *
 * Turns Lovable "*.asset.json" image pointers into normal, real image imports,
 * so the project is fully self-contained (offline / portable to any account).
 *
 * Prerequisite: the 78 real image files must already be sitting in src/assets/
 * next to their pointers, e.g.  src/assets/fathu_run_01.png
 *
 * Usage:   node migrate-assets.mjs          (rewrite code, keep pointer files)
 *          node migrate-assets.mjs --clean  (rewrite code AND delete pointer files)
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ASSETS = path.join(ROOT, "src", "assets");
const CLEAN = process.argv.includes("--clean");

if (!fs.existsSync(ASSETS)) {
  console.error("Run this from the project root (src/assets not found).");
  process.exit(1);
}

// 1) Make sure every pointer has its real image beside it.
const pointers = fs.readdirSync(ASSETS).filter((f) => f.endsWith(".asset.json"));
const missing = pointers
  .map((p) => p.replace(/\.asset\.json$/, ""))
  .filter((real) => !fs.existsSync(path.join(ASSETS, real)));
if (missing.length) {
  console.error(`\n${missing.length} image file(s) are still missing from src/assets/:\n`);
  missing.forEach((m) => console.error("  - " + m));
  console.error("\nDownload them first, then re-run. Nothing was changed.");
  process.exit(1);
}
console.log(`OK: all ${pointers.length} real image files are present.`);

// 2) Rewrite source files.
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

let changedFiles = 0;
for (const file of walk(path.join(ROOT, "src"))) {
  const before = fs.readFileSync(file, "utf8");
  if (!before.includes(".asset.json")) continue;
  let s = before;

  // default imports:  import foo from "@/assets/x.png.asset.json"  ->  "@/assets/x.png"
  const vars = [];
  s = s.replace(
    /import\s+(\w+)\s+from\s+(["'])((?:@|\.\.)\/assets\/[^"']+?)\.asset\.json\2/g,
    (_, v, q, p) => { vars.push(v); return `import ${v} from ${q}${p}${q}`; }
  );
  // each such import is now the URL string itself, so drop ".url"
  for (const v of vars) s = s.replace(new RegExp(`\\b${v}\\.url\\b`, "g"), v);

  // import.meta.glob("...png.asset.json") -> glob of the real images (values are URL strings)
  s = s.replace(/(import\.meta\.glob)(<\{ url: string \}>)?(\(\s*["'][^"']+?)\.asset\.json(["'])/g,
    (_, g, _t, pre, q) => `${g}<string>${pre}${q}`);
  s = s.replace(/Record<string,\s*\{\s*url:\s*string\s*\}>/g, "Record<string, string>");
  s = s.replace(/\bm\[k\]\.url\b/g, "m[k]");
  s = s.replace(/(\w+Mods)\[k\]\.url\b/g, "$1[k]");

  // array of imported assets mapped with a callback: [book1, book2].map((b) => loadSprite(b.url))
  s = s.replace(/\(b\)\s*=>\s*loadSprite\(b\.url\)/g, "(b) => loadSprite(b)");

  if (s.includes(".asset.json")) console.warn(`! ${path.relative(ROOT, file)} still mentions .asset.json - check by hand`);
  if (s !== before) {
    fs.writeFileSync(file, s);
    changedFiles++;
    console.log("rewrote " + path.relative(ROOT, file));
  }
}

// 3) Optionally remove the pointer files.
if (CLEAN) {
  pointers.forEach((p) => fs.unlinkSync(path.join(ASSETS, p)));
  console.log(`deleted ${pointers.length} pointer files`);
}
console.log(`\nDone. ${changedFiles} source file(s) updated.`);
