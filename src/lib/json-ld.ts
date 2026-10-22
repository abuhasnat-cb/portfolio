import type { SiteContent } from "@/content";
import { richToPlain } from "./rich-text-parse";

export function buildJsonLd(content: SiteContent) {
  const { profile, experience, projects, education, skills, seo } = content;
  // Structured data always points at the production canonical, even on preview.
  const base = seo.canonical.replace(/\/$/, "");
  const personId = `${base}/#person`;
  const websiteId = `${base}/#website`;
  const profilePageId = `${base}/#profilepage`;
  const projectsId = `${base}/#projects`;
  const ogImageUrl = seo.ogImage
    ? seo.ogImage.startsWith("http")
      ? seo.ogImage
      : `${base}${seo.ogImage.startsWith("/") ? "" : "/"}${seo.ogImage}`
    : null;
  const ogImageObject = ogImageUrl
    ? {
        "@type": "ImageObject" as const,
        url: ogImageUrl,
        width: 1200,
        height: 630,
        encodingFormat: "image/png",
        caption: "Abu Hasnat Ovee, AI-native Software Engineer",
      }
    : null;

  const orgEntries = new Map<
    string,
    { "@type": "Organization"; "@id": string; name: string; url?: string }
  >();

  const ensureOrg = (id: string, name: string, url?: string) => {
    const fullId = `${base}/#${id}`;
    if (!orgEntries.has(fullId)) {
      orgEntries.set(fullId, {
        "@type": "Organization",
        "@id": fullId,
        name,
        ...(url ? { url } : {}),
      });
    }
    return fullId;
  };

  ensureOrg(
    experience.current.orgId,
    experience.current.org,
    experience.current.orgUrl,
  );
  for (const role of experience.earlier) {
    if (role.kind === "work") {
      ensureOrg(role.orgId, role.org, role.orgUrl);
    }
  }

  const knowsAbout = Array.from(
    new Set([
      ...skills.flatMap((s) => s.items),
      ...projects.flatMap((p) => p.tags),
      "Full-stack development",
      "Domain-Driven Design",
      "Agentic AI workflows",
    ]),
  ).sort((a, b) => a.localeCompare(b));

  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: profile.alternateName,
      jobTitle: profile.role,
      description: profile.tagline,
      url: `${base}/`,
      email: `mailto:${profile.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: profile.locationLocality,
        addressCountry: profile.locationCountry,
      },
      worksFor: { "@id": `${base}/#${experience.current.orgId}` },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: education.institution,
        url: education.institutionUrl,
      },
      sameAs: profile.links.map((l) => l.href),
      knowsAbout,
      ...(ogImageObject ? { image: ogImageObject } : {}),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${base}/`,
      name: seo.siteName,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": profilePageId,
      url: `${base}/`,
      name: seo.title,
      description: seo.description,
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
      dateModified: profile.updated,
      inLanguage: "en",
      ...(ogImageObject
        ? { image: ogImageObject, primaryImageOfPage: ogImageObject }
        : {}),
    },
    {
      "@type": "ItemList",
      "@id": projectsId,
      name: `Projects by ${profile.name}`,
      numberOfItems: projects.length,
      itemListElement: projects.map((p, index) => {
        const item: Record<string, unknown> = {
          "@type": p.schemaType,
          "@id": `${base}/#p-${p.slug}`,
          name: p.name,
          description: richToPlain(p.desc),
          abstract: p.excerpt,
          keywords: p.tags.join(", "),
          creator: { "@id": personId },
          sourceOrganization: { "@id": `${base}/#${p.orgId}` },
        };
        if (p.schemaType === "SoftwareApplication") {
          item.applicationCategory = "WebApplication";
        }
        if (p.links[0]) {
          item.url = p.links[0].href;
        }
        return {
          "@type": "ListItem",
          position: index + 1,
          item,
        };
      }),
    },
    ...orgEntries.values(),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
