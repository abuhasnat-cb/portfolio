import Link from "next/link";
import type { Profile } from "@/content";
import type { Post } from "@/content/post-schema";
import { formatPostDate } from "@/lib/post-utils";
import { withBasePath } from "@/lib/site-env";
import { OlderPostCard } from "./older-post-card";
import { PostAuthor } from "./post-author";
import { PostBody } from "./post-body";

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
      className="mx-auto w-full max-w-[768px] px-[var(--pad)] py-10"
      data-post-page=""
    >
      <Link
        href="/posts/"
        className="font-mono text-[length:var(--text-min)] text-[var(--muted)] underline-offset-2 hover:text-[var(--accent)] hover:underline"
        data-post-back=""
      >
        ← Back to posts
      </Link>
      <h1 className="m-0 mt-6 text-2xl font-medium tracking-[-0.025em] text-[var(--fg)] sm:text-[1.75rem]">
        {post.title}
      </h1>
      <p className="mt-2 font-mono text-[length:var(--text-min)] text-[var(--muted)]">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      </p>
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
