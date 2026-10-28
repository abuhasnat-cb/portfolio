import Link from "next/link";
import type { SpikePost } from "@/content/posts";
import { PostBody } from "./post-body";

export function PostStandalonePage({ post }: { post: SpikePost }) {
  return (
    <main
      className="mx-auto max-w-[768px] px-[var(--pad)] py-10"
      data-spike-post-page=""
    >
      <Link
        href="/"
        className="font-mono text-[length:var(--text-min)] text-[var(--muted)] underline-offset-2 hover:text-[var(--accent)] hover:underline"
        data-spike-back-home=""
      >
        ← Back to home
      </Link>
      <h1 className="m-0 mt-6 text-2xl font-medium tracking-[-0.02em]">
        {post.title}
      </h1>
      <p className="mt-1 font-mono text-[length:var(--text-min)] text-[var(--muted)]">
        <time dateTime={post.date}>{post.date}</time>
      </p>
      <div className="mt-6">
        <PostBody body={post.body} />
      </div>
      <p className="mt-8 font-mono text-[length:var(--text-min)] text-[var(--faint)]">
        Spike standalone page (not the final Posts design).
      </p>
    </main>
  );
}
