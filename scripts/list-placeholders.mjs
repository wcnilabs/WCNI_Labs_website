/**
 * Lists every "[PLACEHOLDER]" still left in the site's source, with file:line.
 * Comment lines are skipped (they only contain examples).
 *
 * Run: npm run placeholders
 * Exit code is 1 while placeholders remain, so it can gate a release in CI.
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const root = process.cwd();
const scanDirs = ["src", "app"];
const extensions = /\.(tsx?|css|mdx?)$/;
const pattern = /\[[A-Z][A-Z0-9 ,.'’&/()-]+\]/g; // keep in sync with src/lib/placeholders.ts
const isComment = (line) => /^\s*(\/\/|\/\*|\*|\{\s*\/\*)/.test(line);
const skipFiles = new Set(["src/lib/placeholders.ts"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (extensions.test(entry.name)) yield full;
  }
}

const found = new Map(); // placeholder -> [locations]
for (const dir of scanDirs) {
  for await (const file of walk(join(root, dir))) {
    const rel = relative(root, file).replaceAll("\\", "/"); // Windows paths use "\"
    if (skipFiles.has(rel)) continue;
    const lines = (await readFile(file, "utf8")).split("\n");
    lines.forEach((line, i) => {
      if (isComment(line)) return;
      for (const match of line.matchAll(pattern)) {
        const list = found.get(match[0]) ?? [];
        list.push(`${rel}:${i + 1}`);
        found.set(match[0], list);
      }
    });
  }
}

// A free host address (*.vercel.app) is fine to launch on: a note, not a failure.
const site = await readFile(join(root, "src/content/site.ts"), "utf8");
const hostUrl = site.match(/url: "(https:\/\/[^"]+\.(?:vercel\.app|pages\.dev))"/)?.[1];
const note = hostUrl ? `\nNote: site.url is the free host address ${hostUrl}. Change it when a domain is connected.\n` : "";

if (found.size === 0) {
  console.log(`No placeholders left. Ready to launch.${note}`);
  process.exit(0);
}

console.log(`\n${found.size} placeholder(s) left:\n`);
for (const [name, where] of [...found].sort()) {
  console.log(`  ${name}`);
  for (const location of where) console.log(`      ${location}`);
}
console.log("\nFill them in src/content/site.ts. See PLACEHOLDERS.md for what each one means.");
console.log(note);
process.exit(1);
