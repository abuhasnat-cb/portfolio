import type { Post } from "@/content/post-schema";
import { postCanonical, postLastmod } from "@/lib/post-utils";

export function postToMarkdown(post: Post, authorName: string): string {
  const L: string[] = [
    "---",
    `title: ${post.title}`,
    `slug: ${post.slug}`,
    `date: ${post.date}`,
    `description: ${post.description}`,
    `tags: ${post.tags.join(", ")}`,
    `canonical: ${postCanonical(post)}`,
    `updated: ${postLastmod(post)}`,
    `author: ${authorName}`,
    "---",
    "",
    `# ${post.title}`,
    "",
    `_${post.date}_`,
    "",
    post.summary,
    "",
    post.body.trim(),
    "",
  ];
  return `${L.join("\n")}\n`;
}

export function postsToRss(
  posts: Post[],
  options: { siteName: string; siteUrl: string; authorName: string },
): string {
  const base = options.siteUrl.replace(/\/$/, "");
  const items = posts
    .map((post) => {
      const link = `${base}/posts/${post.slug}/`;
      const pub = new Date(post.date).toUTCString();
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pub}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <author>${options.authorName}</author>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${options.siteName} — Posts</title>
    <link>${base}/posts/</link>
    <description>Posts by ${options.authorName}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
}
