import type { Metadata } from "next";
import { content } from "@/content";
import { getSiteUrl, isPreviewDeploy } from "@/lib/site-env";

const { seo } = content;

export type PageSeoInput = {
  /** Relative path (with leading slash), e.g. `/contact/` */
  path: string;
  title: string;
  description: string;
  /** Production canonical origin path; defaults to `path` on oveehasnat.com */
  canonicalPath?: string;
  openGraphType?: "website" | "article" | "profile";
  /** Override default og image path (root-relative) */
  ogImage?: string;
  noIndex?: boolean;
};

const PRODUCTION_ORIGIN = "https://oveehasnat.com";

/** Build Next Metadata with OG, Twitter, and canonical aligned to repo conventions. */
export function buildPageMetadata(input: PageSeoInput): Metadata {
  const preview = isPreviewDeploy();
  const siteOrigin = getSiteUrl().replace(/\/$/, "");
  const pageUrl = `${siteOrigin}${input.path}`;
  const canonicalPath = input.canonicalPath ?? input.path;
  const canonical = canonicalPath.startsWith("http")
    ? canonicalPath
    : `${PRODUCTION_ORIGIN}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;
  const ogImagePath = input.ogImage ?? seo.ogImage;
  const ogImageAlt = `${content.profile.name}, ${content.profile.role}`;
  const robots =
    preview || input.noIndex
      ? { index: false as const, follow: false as const }
      : undefined;

  return {
    title: input.title,
    description: input.description,
    ...(robots ? { robots } : {}),
    alternates: {
      canonical,
    },
    openGraph: {
      type: input.openGraphType ?? "website",
      siteName: seo.siteName,
      locale: seo.locale,
      title: input.title,
      description: input.description,
      url: pageUrl,
      ...(ogImagePath
        ? {
            images: [
              {
                url: ogImagePath,
                width: 1200,
                height: 630,
                type: "image/png",
                alt: ogImageAlt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      ...(ogImagePath ? { images: [ogImagePath] } : {}),
    },
  };
}
