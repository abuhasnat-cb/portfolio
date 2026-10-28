import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content } from "@/content";
import {
  getOlderPost,
  getPost,
  getPostSlugs,
  postCanonical,
} from "@/content/posts";
import { PostsChrome } from "@/components/posts/posts-chrome";
import { PostStandalonePage } from "@/components/posts/post-page";
import { buildPostJsonLd } from "@/lib/post-json-ld";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const canonical = postCanonical(post);
  const ogImage = content.seo.ogImage;
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical,
      types: {
        "text/markdown": [
          { url: `/posts/${post.slug}.md`, title: "Markdown version" },
        ],
        "application/rss+xml": [{ url: "/posts/feed.xml", title: "Posts RSS" }],
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: canonical,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [content.profile.name],
      tags: post.tags,
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                type: "image/png",
                alt: "Abu Hasnat Ovee, AI-native Software Engineer",
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    other: {
      "article:published_time": post.date,
      "article:modified_time": post.updated ?? post.date,
      "article:author": content.profile.name,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const older = getOlderPost(slug);
  const jsonLd = buildPostJsonLd(post, {
    personId: "https://oveehasnat.com/#person",
    siteName: content.seo.siteName,
  });

  return (
    <PostsChrome profile={content.profile}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostStandalonePage post={post} older={older} profile={content.profile} />
    </PostsChrome>
  );
}
