import type { Post } from "@/content/post-schema";
import { postCanonical, postLastmod } from "@/lib/post-utils";

export function buildPostJsonLd(
  post: Post,
  options: { personId: string; siteName: string },
) {
  const canonical = postCanonical(post);
  const pageUrl = `${canonical}/`.replace(/([^:]\/)\/+/g, "$1");
  const url = canonical.endsWith("/") ? canonical.slice(0, -1) : canonical;
  const published = post.date;
  const modified = post.updated ?? post.date;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": `${url}/#article`,
      headline: post.title,
      description: post.description,
      datePublished: published,
      dateModified: modified,
      author: { "@id": options.personId },
      publisher: { "@id": options.personId },
      mainEntityOfPage: { "@id": `${url}/#webpage` },
      url,
      keywords: post.tags.join(", "),
      inLanguage: "en",
      isAccessibleForFree: true,
    },
    {
      "@type": "WebPage",
      "@id": `${url}/#webpage`,
      url,
      name: post.title,
      description: post.description,
      dateModified: postLastmod(post),
      isPartOf: { "@id": "https://oveehasnat.com/#website" },
      about: { "@id": `${url}/#article` },
      breadcrumb: { "@id": `${url}/#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://oveehasnat.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Posts",
          item: "https://oveehasnat.com/posts/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: url,
        },
      ],
    },
  ];

  if (post.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}/#faq`,
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    });
  }

  void pageUrl;
  void options.siteName;

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
