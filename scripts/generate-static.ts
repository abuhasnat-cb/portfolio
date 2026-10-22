/**
 * Writes content-derived static files into public/ before `next build`.
 * Run via: pnpm generate
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { content } from "../src/content";
import {
  toLlmsTxt,
  toMarkdown,
  toRobotsTxt,
  toSitemapXml,
} from "../src/lib/markdown";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

mkdirSync(pub, { recursive: true });

const files: Record<string, string> = {
  "index.md": toMarkdown(content),
  "llms.txt": toLlmsTxt(content),
  "sitemap.xml": toSitemapXml(content),
  "robots.txt": toRobotsTxt(content),
};

for (const [name, body] of Object.entries(files)) {
  writeFileSync(join(pub, name), body, "utf8");
  console.log(`wrote public/${name}`);
}
