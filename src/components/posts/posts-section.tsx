import type { Profile } from "@/content";
import type { Post } from "@/content/post-schema";
import { PostsList } from "./posts-list";

/** Landing §04 Posts — latest 3 rows + View all. */
export function PostsSection({
  posts,
  profile,
}: {
  posts: Post[];
  profile: Profile;
}) {
  return (
    <section
      id="posts"
      className="posts-section section-panel screen-line-bottom"
      aria-labelledby="posts-heading"
      data-posts-section=""
    >
      <h2 id="posts-heading" className="section-title">
        <span className="section-index" aria-hidden="true">
          04
        </span>
        Posts
      </h2>
      <PostsList
        posts={posts}
        profile={profile}
        limit={3}
        showViewAll={posts.length > 0}
        returnPath="/"
      />
    </section>
  );
}
