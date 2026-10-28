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
    <main
      className="mx-auto w-full max-w-[768px] px-0 py-8 sm:py-10"
      data-posts-index=""
    >
      <div className="px-[var(--pad)]">
        <nav
          className="font-sans text-[length:var(--text-min)] text-[var(--muted)]"
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
        </h1>
      </div>
      <div className="mt-5 border-t border-[var(--line)]">
        <PostsList posts={posts} profile={profile} returnPath="/posts/" />
      </div>
    </main>
  );
}
