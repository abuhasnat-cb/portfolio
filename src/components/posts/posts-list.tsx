"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import type { Profile } from "@/content";
import type { Post } from "@/content/post-schema";
import { formatPostDate, olderPostFromList } from "@/lib/post-utils";
import { withBasePath } from "@/lib/site-env";
import { PostModal } from "./post-modal";

type ModalHistoryState = { postModal?: string };

function pathMatchesPost(pathname: string, slug: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/";
  const target = withBasePath(`/posts/${slug}`).replace(/\/$/, "");
  return path === target;
}

export function PostsList({
  posts,
  profile,
  limit,
  showViewAll,
  numbered,
  returnPath,
}: {
  posts: Post[];
  profile: Profile;
  limit?: number;
  showViewAll?: boolean;
  numbered?: boolean;
  /** Path to restore when closing the modal (home `/` or `/posts/`). */
  returnPath: string;
}) {
  const visible = typeof limit === "number" ? posts.slice(0, limit) : posts;
  const [open, setOpen] = useState<Post | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    const state = window.history.state as ModalHistoryState | null;
    if (state?.postModal) {
      window.history.back();
      return;
    }
    window.history.replaceState(null, "", withBasePath(returnPath));
  }, [returnPath]);

  const softOpen = useCallback((post: Post) => {
    setOpen(post);
  }, []);

  useEffect(() => {
    function onPopState() {
      const match = posts.find((p) =>
        pathMatchesPost(window.location.pathname, p.slug),
      );
      setOpen(match ?? null);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [posts]);

  function openPost(post: Post, href: string, e: MouseEvent) {
    e.preventDefault();
    window.history.pushState(
      { postModal: post.slug } satisfies ModalHistoryState,
      "",
      href,
    );
    setOpen(post);
  }

  const older = open ? olderPostFromList(posts, open.slug) : undefined;

  return (
    <>
      <ul className="posts-list m-0 list-none p-0" data-posts-list="">
        {visible.map((post, i) => {
          const href = withBasePath(`/posts/${post.slug}/`);
          return (
            <li
              key={post.slug}
              className="posts-row relative m-0 border-t border-[var(--line)] first:border-t-0"
            >
              <Link
                href={`/posts/${post.slug}/`}
                className="posts-row-link text-[var(--fg)] no-underline transition-colors hover:text-[var(--accent)]"
                data-post-link={post.slug}
                onClick={(e) => openPost(post, href, e)}
              >
                {numbered !== false ? (
                  <span className="posts-row-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ) : null}
                <span className="posts-row-title">{post.title}</span>
                <time dateTime={post.date} className="posts-row-date">
                  {formatPostDate(post.date)}
                </time>
              </Link>
            </li>
          );
        })}
      </ul>

      {showViewAll ? (
        <Link
          href="/posts/"
          className="pmore no-underline"
          data-posts-view-all=""
        >
          <span>View all posts →</span>
        </Link>
      ) : null}

      {open ? (
        <PostModal
          post={open}
          older={older}
          profile={profile}
          onClose={close}
          onSoftOpen={softOpen}
        />
      ) : null}
    </>
  );
}
