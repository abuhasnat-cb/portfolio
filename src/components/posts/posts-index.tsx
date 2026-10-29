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
    <div className="stage" data-posts-index="">
      <nav className="posts-crumb-nav" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Posts</span>
      </nav>
      <section
        className="section-panel screen-line-bottom"
        aria-labelledby="posts-page-heading"
      >
        <h1 id="posts-page-heading" className="posts-page-title section-title">
          Posts
        </h1>
        <PostsList posts={posts} profile={profile} returnPath="/posts/" />
      </section>
    </div>
  );
}
