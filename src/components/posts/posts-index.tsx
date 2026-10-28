import Link from "next/link";
import type { Profile } from "@/content";
import type { Post } from "@/content/post-schema";
import { PostsList } from "./posts-list";

export function PostsIndexPage({
  posts,
  profile,
}: {
  posts: Post[];
  profile: Profile;
}) {
  return (
    <main className="mx-auto w-full max-w-[768px] px-0 py-8 sm:py-10" data-posts-index="">
      <div className="px-[var(--pad)]">
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
          <span>Posts</span>
        </nav>
        <h1 className="m-0 mt-4 text-[length:var(--text-section)] font-medium tracking-[-0.025em] text-[var(--fg)]">
          Posts
          <sup className="ml-1 align-top font-sans text-sm font-medium text-[var(--muted)]">
            ({posts.length})
          </sup>
        </h1>
        <p className="mt-2 max-w-[40rem] font-sans text-[length:var(--text-body)] leading-relaxed text-[var(--muted)]">
          Short notes on building with AI agents, RAG and full-stack web
          products. From real projects, with real numbers.
        </p>
      </div>
      <div className="mt-6 border-t border-[var(--line)]">
        <PostsList posts={posts} profile={profile} returnPath="/posts/" />
      </div>
    </main>
  );
}
