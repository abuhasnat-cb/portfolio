"use client";

import Link from "next/link";
import type { Post } from "@/content/post-schema";
import { formatPostDate } from "@/lib/post-utils";
import { withBasePath } from "@/lib/site-env";

export function OlderPostCard({
  post,
  onSoftOpen,
}: {
  post: Post;
  /** When set, soft-opens the older post in the modal instead of full navigation. */
  onSoftOpen?: (post: Post) => void;
}) {
  const href = `/posts/${post.slug}/`;

  return (
    <Link
      href={href}
      data-post-older=""
      className="mt-8 flex items-center justify-between gap-4 border border-[var(--line)] bg-[var(--bg)] px-[var(--pad)] py-5 transition-colors hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--line))] hover:bg-[color-mix(in_srgb,var(--accent)_4%,var(--bg))]"
      onClick={
        onSoftOpen
          ? (e) => {
              e.preventDefault();
              onSoftOpen(post);
              window.history.pushState(
                { postModal: post.slug },
                "",
                withBasePath(href),
              );
            }
          : undefined
      }
    >
      <div className="min-w-0">
        <p className="m-0 font-mono text-[length:var(--text-min)] text-[var(--faint)]">
          Older
        </p>
        <p className="m-0 mt-1 truncate text-[15px] font-medium tracking-[-0.01em] text-[var(--fg)]">
          {post.title}
        </p>
        <time
          dateTime={post.date}
          className="mt-1 block font-mono text-[length:var(--text-min)] text-[var(--muted)]"
        >
          {formatPostDate(post.date)}
        </time>
      </div>
      <span className="shrink-0 font-mono text-[length:var(--text-min)] text-[var(--accent)]">
        Older →
      </span>
    </Link>
  );
}
