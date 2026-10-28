import type { Post } from "@/content/post-schema";

export function postCanonical(post: Post): string {
  return (
    post.canonical?.replace(/\/$/, "") ??
    `https://oveehasnat.com/posts/${post.slug}`
  );
}

export function postLastmod(post: Post): string {
  return (post.updated ?? post.date).slice(0, 10);
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso.slice(0, 10);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Rough reading time from markdown body (words / 200). */
export function readingTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function olderPostFromList(
  posts: Post[],
  slug: string,
): Post | undefined {
  const index = posts.findIndex((p) => p.slug === slug);
  if (index < 0 || index >= posts.length - 1) return undefined;
  return posts[index + 1];
}
