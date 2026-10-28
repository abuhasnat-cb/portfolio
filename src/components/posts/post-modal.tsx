"use client";

import Link from "next/link";
import type { Profile } from "@/content";
import type { Post } from "@/content/post-schema";
import { formatPostDate } from "@/lib/post-utils";
import { OlderPostCard } from "./older-post-card";
import { PostAuthor } from "./post-author";
import { PostBody } from "./post-body";

export function PostModal({
  post,
  older,
  profile,
  onClose,
  onSoftOpen,
}: {
  post: Post;
  older?: Post;
  profile: Profile;
  onClose: () => void;
  onSoftOpen?: (post: Post) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-[max(2rem,8vh)] pb-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-modal-title"
      data-post-modal=""
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[640px] border border-[var(--line)] bg-[var(--bg)] p-5 shadow-lg sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-3 font-mono text-[length:var(--text-min)]">
          <Link
            href={`/posts/${post.slug}/`}
            className="text-[var(--muted)] underline-offset-2 hover:text-[var(--accent)] hover:underline"
            data-post-open-page=""
          >
            Open page
          </Link>
          <button
            type="button"
            className="text-[var(--muted)] hover:text-[var(--fg)]"
            data-post-close-modal=""
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <h1
          id="post-modal-title"
          className="m-0 text-xl font-medium tracking-[-0.02em] text-[var(--fg)] sm:text-2xl"
        >
          {post.title}
        </h1>
        <p className="mt-2 font-mono text-[length:var(--text-min)] text-[var(--muted)]">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </p>
        <div className="mt-5">
          <PostBody body={post.body} />
        </div>
        <PostAuthor profile={profile} />
        {older ? <OlderPostCard post={older} onSoftOpen={onSoftOpen} /> : null}
      </div>
    </div>
  );
}
