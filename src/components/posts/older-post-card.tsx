"use client";

import Link from "next/link";
import type { Post } from "@/content/post-schema";
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
    <div className="older-nav mt-8 grid grid-cols-1 border border-[var(--line)] sm:grid-cols-2">
      <div className="hidden border-[var(--line)] sm:block sm:border-r" aria-hidden="true" />
      <Link
        href={href}
        data-post-older=""
        className="flex min-w-0 flex-col items-end gap-2 px-[var(--pad)] py-5 text-right no-underline transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_4%,var(--bg))]"
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
        <span className="font-mono text-[length:var(--text-min)] text-[var(--faint)]">
          Older →
        </span>
        <span className="text-[15px] leading-6 font-medium tracking-[-0.01em] text-[var(--fg)]">
          {post.title}
        </span>
      </Link>
    </div>
  );
}
