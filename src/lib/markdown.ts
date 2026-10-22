import type { SiteContent } from "@/content";
import { richToMarkdown, richToPlain } from "./rich-text-parse";
import { slugifyHeading } from "./utils";

function absUrl(base: string, href: string): string {
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  if (href.startsWith("/")) return `${base.replace(/\/$/, "")}${href}`;
  return href;
}

export function toMarkdown(content: SiteContent): string {
  const { profile: S, experience: work, projects, skills } = content;
  const L: string[] = [];

  L.push(
    "---",
    `name: ${S.name}`,
    `role: ${S.role}`,
    `location: ${S.location}`,
    `timezone: ${S.timezone} (${S.timezoneLabel})`,
    `status: ${S.status}`,
    `email: ${S.email}`,
    `website: ${S.url}`,
    `updated: ${S.updated}`,
    "---",
    "",
  );

  L.push(
    `# ${S.name}`,
    "",
    `**${S.role}** · ${S.location}`,
    "",
    `_${S.tagline}_`,
    "",
  );

  const resumeLink = S.resumeUrl ? `[Resume](${S.resumeUrl}) · ` : "";
  L.push(
    `${resumeLink}[Get in touch](#contact) · [Email](mailto:${S.email})`,
    "",
  );

  L.push(
    "## Info",
    "",
    `- **Role:** ${S.role}`,
    `- **Based in:** ${S.location}`,
    `- **Local time:** ${S.timezoneLabel} (${S.timezone})`,
    `- **Status:** ${S.statusShort}`,
    "",
  );

  L.push("## About", "");
  S.about.forEach((p) => L.push(richToMarkdown(p), ""));

  const c = work.current;
  L.push(
    "## Work experience",
    "",
    `### ${c.org} (current)`,
    "",
    `${c.role} · ${richToMarkdown(c.dates)}`,
    "",
  );
  c.impact.forEach((i) => L.push(`- ${richToMarkdown(i)}`));
  L.push("");

  L.push(
    "### Earlier work",
    "",
    `_${work.earlierNote.replace(/^Earlier work · /, "")}_`,
    "",
  );
  work.earlier.forEach((j) =>
    L.push(`- **${j.org}** · ${j.desc} · ${richToMarkdown(j.dates)}`),
  );
  L.push("");

  L.push("## Selected projects", "");
  projects.forEach((p) => {
    L.push(`### ${p.name}`, "", richToMarkdown(p.desc), "");
    L.push(`- **Excerpt:** ${p.excerpt}`);
    L.push(`- **Company:** ${p.org}`);
    L.push(`- **Tags:** ${p.tags.join(", ")}`);
    if (p.links.length) {
      L.push(
        `- **Live:** ${p.links.map((l) => `[${l.label}](${l.href})`).join(" · ")}`,
      );
    }
    L.push("");
  });

  L.push("## Stack", "");
  skills.forEach((g) => L.push(`- **${g.name}:** ${g.items.join(", ")}`));
  L.push("");

  L.push(
    "## Contact",
    "",
    `${S.contact.pitch} ${S.contact.note}`,
    "",
    `- **Email:** [${S.email}](mailto:${S.email})`,
    "",
  );

  L.push("## Links", "");
  S.links.forEach((l) => L.push(`- [${l.label}](${l.href})`));
  if (S.resumeUrl) {
    L.push(`- [Resume (PDF)](${S.resumeUrl})`);
  }
  L.push("");
  L.push(
    `<!-- ${S.site} · Dhaka · ${S.timezoneLabel} · human version: ${S.url}/ -->`,
  );

  return `${L.join("\n")}\n`;
}

export function toLlmsTxt(content: SiteContent): string {
  const { profile: S, experience: work, projects, skills } = content;
  const L: string[] = [
    `# ${S.name}`,
    "",
    `> ${S.role} based in ${S.location}. ${S.status}.`,
    "",
  ];

  const aboutPlain = `${richToPlain(S.about[0]!)} ${richToPlain(S.about[1]!).replace(/ Looking for.*$/, "")}`;
  L.push(
    aboutPlain,
    "",
    `Contact: ${S.email}. Last updated: ${S.updated}.`,
    "",
  );

  L.push(
    "## Profile",
    "",
    `- [Full profile (markdown)](${S.url}/index.md): About, work experience, projects, stack and contact in one file`,
  );
  if (S.resumeUrl) {
    L.push(`- [Resume (PDF)](${absUrl(S.url, S.resumeUrl)}): Resume`);
  }
  L.push(`- [Website](${S.url}/): Human-readable version of this profile`, "");

  L.push("## Projects", "");
  projects.forEach((p) => {
    const href = p.links.length
      ? p.links[0]!.href
      : `${S.url}/index.md#${slugifyHeading(p.name)}`;
    L.push(
      `- [${p.name}](${href}): ${richToPlain(p.desc)} Tags: ${p.tags.join(", ")}`,
    );
  });
  L.push("");

  L.push("## Links", "");
  S.links.forEach((l) =>
    L.push(`- [${l.label}](${absUrl(S.url, l.href)}): ${l.label} profile`),
  );
  L.push("");

  const c = work.current;
  L.push(
    "## Optional",
    "",
    `- [Work experience](${S.url}/index.md#work-experience): ${c.org} (${c.role}, ${c.dates}); earlier: ${work.earlier.map((j) => j.org).join(", ")}`,
    `- [Stack](${S.url}/index.md#stack): ${skills.map((g) => `${g.name}: ${g.items.join(", ")}`).join("; ")}`,
  );

  return `${L.join("\n")}\n`;
}

export function toSitemapXml(content: SiteContent): string {
  const base = content.profile.url.replace(/\/$/, "");
  const urls = ["/", "/index.md", "/llms.txt"];
  const lastmod = content.profile.updated;
  const body = urls
    .map(
      (path) => `  <url>
    <loc>${base}${path === "/" ? "/" : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${path === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

export function toRobotsTxt(
  content: SiteContent,
  options?: { preview?: boolean },
): string {
  const base = content.profile.url.replace(/\/$/, "");
  if (options?.preview) {
    return `User-agent: *
Disallow: /
`;
  }
  return `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;
}
