"use client";

import Link from "next/link";
import type { SpikePost } from "@/content/posts";
import { PostBody } from "./post-body";

export function PostModal({
  post,
  onClose,
}: {
  post: SpikePost;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-[10vh]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="spike-post-modal-title"
      data-spike-post-modal=""
    >
      <div className="w-full max-w-xl border border-[var(--line)] bg-[var(--bg)] p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between gap-3 font-mono text-[length:var(--text-min)]">
          <Link
            href={`/posts/${post.slug}/`}
            className="text-[var(--muted)] underline-offset-2 hover:text-[var(--accent)] hover:underline"
            data-spike-open-page=""
            // Full navigation to the ranking standalone page.
            onClick={() => {
              /* let Next Link navigate */
            }}
          >
            Open page
          </Link>
          <button
            type="button"
            className="text-[var(--muted)] hover:text-[var(--fg)]"
            data-spike-close-modal=""
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <h1
          id="spike-post-modal-title"
          className="m-0 text-xl font-medium tracking-[-0.02em]"
        >
          {post.title}
        </h1>
        <p className="mt-1 font-mono text-[length:var(--text-min)] text-[var(--muted)]">
          <time dateTime={post.date}>{post.date}</time>
        </p>
        <div className="mt-4">
          <PostBody body={post.body} />
        </div>
      </div>
    </div>
  );
}
