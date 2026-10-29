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
      <ul className="plist" data-posts-list="">
        {visible.map((post, i) => {
          const href = withBasePath(`/posts/${post.slug}/`);
          return (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}/`}
                className="prow"
                data-post-link={post.slug}
                onClick={(e) => openPost(post, href, e)}
              >
                {numbered !== false ? (
                  <span className="pnum" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ) : null}
                <span className="ptitle">{post.title}</span>
                <time dateTime={post.date} className="pmeta">
                  {formatPostDate(post.date)}
                </time>
              </Link>
            </li>
          );
        })}
      </ul>

      {showViewAll ? (
        <Link href="/posts/" className="viewall" data-posts-view-all="">
          View all posts <span aria-hidden="true">→</span>
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
