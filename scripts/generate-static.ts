/**
 * Writes content-derived static files into public/ before `next build`.
 * Run via: pnpm generate
 *
 * Honors SITE_URL and NEXT_PUBLIC_BASE_PATH (via src/content + site-env).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { content } from "../src/content";
import { posts } from "../src/content/posts";
import {
  toLlmsTxt,
  toMarkdown,
  toRobotsTxt,
  toSitemapXml,
} from "../src/lib/markdown";
import { postToMarkdown, postsToRss } from "../src/lib/post-markdown";
import { isPreviewDeploy } from "../src/lib/site-env";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const postsDir = join(pub, "posts");
const preview = isPreviewDeploy();

mkdirSync(pub, { recursive: true });
mkdirSync(postsDir, { recursive: true });

const files: Record<string, string> = {
  "index.md": toMarkdown(content, posts),
  "llms.txt": toLlmsTxt(content, posts),
  "sitemap.xml": toSitemapXml(content, posts),
  "robots.txt": toRobotsTxt(content, { preview }),
  "posts/feed.xml": postsToRss(posts, {
    siteName: content.seo.siteName,
    siteUrl: content.profile.url,
    authorName: content.profile.name,
  }),
};

for (const [name, body] of Object.entries(files)) {
  const target = join(pub, name);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, body, "utf8");
  console.log(`wrote public/${name}${preview ? " (preview)" : ""}`);
}

for (const post of posts) {
  const md = postToMarkdown(post, content.profile.name);
  const name = `posts/${post.slug}.md`;
  writeFileSync(join(pub, name), md, "utf8");
  console.log(`wrote public/${name}${preview ? " (preview)" : ""}`);
}
