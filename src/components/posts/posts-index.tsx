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
      className="mx-auto w-full max-w-[768px] px-0 py-10"
      data-posts-index=""
    >
      <div className="px-[var(--pad)]">
        <h1 className="m-0 text-2xl font-medium tracking-[-0.025em] text-[var(--fg)]">
          Posts
        </h1>
        <p className="mt-2 font-mono text-[length:var(--text-min)] text-[var(--muted)]">
          Writing and notes
        </p>
      </div>
      <div className="mt-6 border-t border-[var(--line)]">
        <PostsList posts={posts} profile={profile} returnPath="/posts/" />
      </div>
    </main>
  );
}
