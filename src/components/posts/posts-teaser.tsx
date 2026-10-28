"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { posts, type SpikePost } from "@/content/posts";
import { withBasePath } from "@/lib/site-env";
import { PostModal } from "./post-modal";

type SpikeHistoryState = { spikePost?: string };

/**
 * Spike-only home teaser.
 *
 * Finding: Next.js intercepting routes (`@modal` + `(.)posts/[slug]`) hard-fail
 * `next build` with `output: 'export'` ("Intercepting routes are not supported
 * with static export"). Soft-nav modal UX is therefore implemented with the
 * History API; hard loads / refresh still hit `app/posts/[slug]/page.tsx`.
 */
export function PostsTeaser() {
  const [open, setOpen] = useState<SpikePost | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    const state = window.history.state as SpikeHistoryState | null;
    if (state?.spikePost) {
      window.history.back();
      return;
    }
    window.history.replaceState(null, "", withBasePath("/"));
  }, []);

  useEffect(() => {
    function onPopState() {
      const path = window.location.pathname.replace(/\/$/, "") || "/";
      const match = posts.find((p) => {
        const target = withBasePath(`/posts/${p.slug}`).replace(/\/$/, "");
        return path === target;
      });
      setOpen(match ?? null);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function openPost(post: SpikePost, href: string, e: MouseEvent) {
    e.preventDefault();
    window.history.pushState(
      { spikePost: post.slug } satisfies SpikeHistoryState,
      "",
      href,
    );
    setOpen(post);
  }

  return (
    <section
      id="posts"
      className="section-panel screen-line-bottom"
      aria-labelledby="spike-posts-heading"
      data-spike-posts-teaser=""
    >
      <h2 id="spike-posts-heading" className="section-title">
        <span className="section-index" aria-hidden="true">
          04
        </span>
        Posts
        <sup className="ml-1 font-mono text-[length:var(--text-min)] font-normal text-[var(--faint)]">
          (spike)
        </sup>
      </h2>
      <ul className="m-0 list-none p-0">
        {posts.map((post, i) => {
          const href = withBasePath(`/posts/${post.slug}/`);
          return (
            <li
              key={post.slug}
              className="border-t border-[var(--line)] first:border-t-0"
            >
              <Link
                href={`/posts/${post.slug}/`}
                className="flex items-baseline gap-4 px-[var(--pad)] py-4 text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
                data-spike-post-link={post.slug}
                onClick={(e) => openPost(post, href, e)}
              >
                <span
                  className="font-mono text-[length:var(--text-min)] text-[var(--faint)]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[15px] font-medium tracking-[-0.01em]">
                  {post.title}
                </span>
                <time
                  dateTime={post.date}
                  className="font-mono text-[length:var(--text-min)] text-[var(--muted)]"
                >
                  {post.date}
                </time>
              </Link>
            </li>
          );
        })}
      </ul>
      {open ? <PostModal post={open} onClose={close} /> : null}
    </section>
  );
}
