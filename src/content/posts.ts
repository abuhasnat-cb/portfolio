import spikeAlpha from "./posts/spike-alpha.json";
import spikeBeta from "./posts/spike-beta.json";

/** Minimal post shape for the intercepting-routes spike (not the final Zod schema). */
export type SpikePost = {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  summary: string;
  body: string;
  draft?: boolean;
};

const all: SpikePost[] = [spikeAlpha, spikeBeta];

/** Non-draft posts, newest first. */
export const posts: SpikePost[] = all
  .filter((p) => !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): SpikePost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}
