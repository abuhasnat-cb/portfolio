import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { formatPostIssues, postSchema, type Post } from "./post-schema";

export type { Post } from "./post-schema";
export {
  formatPostDate,
  olderPostFromList,
  postCanonical,
  postLastmod,
} from "@/lib/post-utils";

const POSTS_DIR = join(process.cwd(), "src/content/posts");

function loadAllPosts(): Post[] {
  const files = readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();
  const posts: Post[] = [];
  const slugs = new Set<string>();

  for (const file of files) {
    const raw = JSON.parse(
      readFileSync(join(POSTS_DIR, file), "utf8"),
    ) as unknown;
    const parsed = postSchema.safeParse(raw);
    if (!parsed.success) {
      const details = formatPostIssues(parsed.error.issues).join("; ");
      throw new Error(`Invalid post ${file}: ${details}`);
    }
    const post = parsed.data;
    const expected = `${post.slug}.json`;
    if (file !== expected) {
      throw new Error(
        `Post file ${file} must be named ${expected} to match slug "${post.slug}"`,
      );
    }
    if (slugs.has(post.slug)) {
      throw new Error(`Duplicate post slug: ${post.slug}`);
    }
    slugs.add(post.slug);
    posts.push(post);
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

const allPosts = loadAllPosts();

/** All posts including drafts (build / check). */
export const allPostsIncludingDrafts: Post[] = allPosts;

/** Published posts only, newest first. */
export const posts: Post[] = allPosts.filter((p) => !p.draft);

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function getOlderPost(slug: string): Post | undefined {
  const index = posts.findIndex((p) => p.slug === slug);
  if (index < 0 || index >= posts.length - 1) return undefined;
  return posts[index + 1];
}
