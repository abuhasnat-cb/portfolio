import Link from "next/link";
import type { Profile } from "@/content";
import type { Post } from "@/content/post-schema";
import { withBasePath } from "@/lib/site-env";
import { OlderPostCard } from "./older-post-card";
import { PostAuthor } from "./post-author";
import { PostBody } from "./post-body";
import { PostMeta } from "./post-meta";

export function PostStandalonePage({
  post,
  older,
  profile,
}: {
  post: Post;
  older?: Post;
  profile: Profile;
}) {
  return (
    <main
      className="mx-auto w-full max-w-[720px] px-[var(--pad)] py-8 sm:py-10"
      data-post-page=""
    >
      <nav
        className="font-mono text-[length:var(--text-min)] text-[var(--muted)]"
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="text-[var(--muted)] no-underline underline-offset-2 hover:text-[var(--accent)] hover:underline"
        >
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <Link
          href="/posts/"
          className="text-[var(--muted)] no-underline underline-offset-2 hover:text-[var(--accent)] hover:underline"
        >
          Posts
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-[var(--faint)]">{post.slug}</span>
      </nav>

      <p className="mt-5">
        <Link
          href="/posts/"
          className="font-mono text-[length:var(--text-min)] text-[var(--muted)] no-underline underline-offset-2 hover:text-[var(--accent)] hover:underline"
          data-post-back=""
        >
          ← Back to posts
        </Link>
      </p>

      <div className="mt-6">
        <PostMeta post={post} />
      </div>

      <div className="mt-6">
        <PostBody body={post.body} />
      </div>

      <PostAuthor profile={profile} />
      {older ? <OlderPostCard post={older} /> : null}

      <p className="mt-8 font-mono text-[length:var(--text-min)] text-[var(--faint)]">
        <a
          href={withBasePath(`/posts/${post.slug}.md`)}
          className="underline-offset-2 hover:text-[var(--accent)] hover:underline"
        >
          Markdown version
        </a>
      </p>
    </main>
  );
}
