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
    <div className="stage" data-post-page="">
      <Link href="/posts/" className="posts-crumb crumb" data-post-back="">
        ← Back to posts
      </Link>

      <article className="post-article">
        <PostMeta post={post} />
        <PostBody body={post.body} />
      </article>

      <PostAuthor profile={profile} />
      {older ? <OlderPostCard post={older} /> : null}

      <p className="mx-[var(--pad)] mb-6 font-mono text-[length:var(--text-min)] text-[var(--faint)]">
        <a
          href={withBasePath(`/posts/${post.slug}.md`)}
          className="text-[var(--faint)] underline-offset-2 hover:text-[var(--accent)] hover:underline"
        >
          Markdown version
        </a>
      </p>
    </div>
  );
}
