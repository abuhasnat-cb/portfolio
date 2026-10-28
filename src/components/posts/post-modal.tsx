"use client";

import Link from "next/link";
import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import type { Profile } from "@/content";
import type { Post } from "@/content/post-schema";
import { OlderPostCard } from "./older-post-card";
import { PostAuthor } from "./post-author";
import { PostBody } from "./post-body";
import { PostMeta } from "./post-meta";

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
  const titleId = useId();

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${scrollbar}px`;
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const overlay = (
    <div
      className="post-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-post-modal=""
      data-post-modal-overlay=""
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="post-modal-panel" data-post-modal-panel="">
        <div className="post-modal-chrome">
          <Link
            href={`/posts/${post.slug}/`}
            className="text-[var(--muted)] no-underline underline-offset-2 hover:text-[var(--accent)] hover:underline"
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

        <div className="post-modal-body">
          <PostMeta post={post} titleId={titleId} />
          <div className="mt-6">
            <PostBody body={post.body} />
          </div>
          <PostAuthor profile={profile} />
          {older ? (
            <OlderPostCard post={older} onSoftOpen={onSoftOpen} />
          ) : null}
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(overlay, document.body);
}
