import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { content } from "@/content";
import { posts } from "@/content/posts";
import { toLlmsTxt, toMarkdown } from "@/lib/markdown";
import { PHONE_PATTERN } from "@/lib/phone-pattern";

const root = join(process.cwd());
const outDir = join(root, "out");
const pubDir = join(root, "public");

function walkFiles(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walkFiles(full, acc);
    else acc.push(full);
  }
  return acc;
}

describe("static artifact generators match public files when present", () => {
  it("index.md and llms.txt match generators", () => {
    const md = toMarkdown(content, posts);
    const llms = toLlmsTxt(content, posts);

    if (existsSync(join(pubDir, "index.md"))) {
      expect(readFileSync(join(pubDir, "index.md"), "utf8")).toBe(md);
    }
    if (existsSync(join(pubDir, "llms.txt"))) {
      expect(readFileSync(join(pubDir, "llms.txt"), "utf8")).toBe(llms);
    }

    expect(md.length).toBeGreaterThan(500);
    expect(llms.length).toBeGreaterThan(200);
  });
});

describe("build output (when out/ exists)", () => {
  const hasOut = existsSync(outDir);

  it.skipIf(!hasOut)(
    "ships index.md, llms.txt, sitemap.xml, robots.txt",
    () => {
      for (const file of [
        "index.md",
        "llms.txt",
        "sitemap.xml",
        "robots.txt",
        "posts/feed.xml",
      ]) {
        expect(existsSync(join(outDir, file))).toBe(true);
      }
      for (const post of posts) {
        expect(existsSync(join(outDir, "posts", `${post.slug}.md`))).toBe(true);
        expect(existsSync(join(outDir, "posts", post.slug, "index.html"))).toBe(
          true,
        );
      }
    },
  );

  it.skipIf(!hasOut)("contains no phone numbers in text build output", () => {
    const files = walkFiles(outDir).filter((f) =>
      /\.(html|txt|md|xml|js|json)$/.test(f),
    );
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      const body = readFileSync(file, "utf8");
      expect(body, file).not.toMatch(PHONE_PATTERN);
    }
  });

  it.skipIf(!hasOut)("embeds JSON-LD Person with alternateName", () => {
    const html = readFileSync(join(outDir, "index.html"), "utf8");
    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain("Md. Abu Hasnat Ovee");
    expect(html).toContain("ItemList");
    const match = html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    );
    expect(match).toBeTruthy();
    const parsed = JSON.parse(match![1]!);
    expect(parsed["@graph"]).toBeTruthy();
  });
});
