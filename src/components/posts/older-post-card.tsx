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
    <nav className="post-navpn navpn" aria-label="More posts">
      <span className="navpn-spacer" aria-hidden="true" />
      <Link
        href={href}
        data-post-older=""
        className="text-right"
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
        <small>Older →</small>
        <span className="ptitle">{post.title}</span>
      </Link>
    </nav>
  );
}
