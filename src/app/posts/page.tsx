import type { Metadata } from "next";
import { content } from "@/content";
import { posts } from "@/content/posts";
import { PostsChrome } from "@/components/posts/posts-chrome";
import { PostsIndexPage } from "@/components/posts/posts-index";

export const metadata: Metadata = {
  title: "Posts",
  description: `Writing and notes by ${content.profile.name}.`,
  alternates: {
    canonical: "https://oveehasnat.com/posts/",
    types: {
      "application/rss+xml": [{ url: "/posts/feed.xml", title: "Posts RSS" }],
    },
  },
  openGraph: {
    type: "website",
    title: `Posts | ${content.seo.siteName}`,
    description: `Writing and notes by ${content.profile.name}.`,
    url: "https://oveehasnat.com/posts/",
  },
  twitter: {
    card: "summary_large_image",
    title: `Posts | ${content.seo.siteName}`,
    description: `Writing and notes by ${content.profile.name}.`,
  },
};

export default function PostsPage() {
  return (
    <PostsChrome profile={content.profile}>
      <PostsIndexPage posts={posts} profile={content.profile} />
    </PostsChrome>
  );
}
