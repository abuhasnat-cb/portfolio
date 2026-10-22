import { describe, expect, it } from "vitest";
import { content } from "@/content";
import { buildJsonLd } from "@/lib/json-ld";
import { toLlmsTxt, toMarkdown } from "@/lib/markdown";
import { PHONE_PATTERN } from "@/lib/phone-pattern";

function collectStrings(value: unknown, acc: string[] = []): string[] {
  if (typeof value === "string") {
    acc.push(value);
    return acc;
  }
  if (Array.isArray(value)) {
    value.forEach((v) => collectStrings(v, acc));
    return acc;
  }
  if (value && typeof value === "object") {
    Object.values(value).forEach((v) => collectStrings(v, acc));
  }
  return acc;
}

describe("content schema", () => {
  it("exports a complete content object", () => {
    expect(content.profile.name).toBe("Abu Hasnat Ovee");
    expect(content.profile.alternateName).toBe("Md. Abu Hasnat Ovee");
    expect(content.profile.email).toContain("@");
    expect(content.projects.length).toBeGreaterThanOrEqual(4);
    expect(content.projects[0]?.name).toBe("Simply Eloped");
    expect(content.projects[1]?.name).toBe("GymCity");
    expect(content.skills.length).toBe(7);
    expect(content.experience.current.org).toBe("CodersBucket Limited");
    expect(content.education.institution).toBe("North South University");
    expect(content.seo.siteName).toBe("Abu Hasnat Ovee");
    expect(content.seo.canonical).toBe("https://oveehasnat.com/");
  });

  it("keeps production canonical and siteName in JSON-LD WebSite", () => {
    const ld = buildJsonLd(content);
    const graph = ld["@graph"] as Array<Record<string, unknown>>;
    const site = graph.find((n) => n["@type"] === "WebSite")!;
    expect(site.name).toBe("Abu Hasnat Ovee");
    expect(site.url).toBe("https://oveehasnat.com/");
  });

  it("has no phone numbers in content", () => {
    const strings = collectStrings(content);
    for (const s of strings) {
      expect(s).not.toMatch(PHONE_PATTERN);
    }
  });

  it("only exposes live project links (no repo/code URLs)", () => {
    for (const project of content.projects) {
      for (const link of project.links) {
        expect(link.label).toBe("Live");
        expect(link.href).not.toMatch(/github\.com|gitlab\.com|bitbucket/i);
      }
    }
  });

  it("exposes Simply Eloped live URL and visibleTags subsets", () => {
    const simply = content.projects.find((p) => p.slug === "simply-eloped");
    expect(simply?.links[0]?.href).toBe("https://simplyeloped.com");
    for (const project of content.projects) {
      expect(project.visibleTags.length).toBeGreaterThanOrEqual(2);
      expect(project.visibleTags.length).toBeLessThanOrEqual(5);
      expect(project.tags.length).toBeGreaterThanOrEqual(
        project.visibleTags.length,
      );
    }
  });

  it("keeps earlier work roles title-only (no detail lines)", () => {
    const work = content.experience.earlier.filter((r) => r.kind === "work");
    expect(work.map((r) => r.desc)).toEqual([
      "Software Engineer",
      "Front-end Developer (Contractual)",
      "Trainee Software Engineer",
    ]);
  });

  it("exposes the Google Drive resume URL", () => {
    expect(content.profile.resumeUrl).toMatch(
      /^https:\/\/drive\.google\.com\/file\/d\//,
    );
  });

  it("sets a root-relative OG image path", () => {
    expect(content.seo.ogImage).toBe("/og.png");
    expect(content.seo.title).toContain("AI-native Software Engineer");
    expect(content.seo.description).toContain("AI-native Software Engineer");
  });
});

describe("generated markdown artifacts", () => {
  it("produces parseable index.md with expected headings", () => {
    const md = toMarkdown(content);
    expect(md).toContain("# Abu Hasnat Ovee");
    expect(md).toContain("## About");
    expect(md).toContain("## Work experience");
    expect(md).toContain("## Selected projects");
    expect(md).toContain("## Stack");
    expect(md).toContain("## Contact");
    expect(md).toContain("hasnat.ovee@gmail.com");
    expect(md).toContain("simplyeloped.com");
    expect(md).toMatch(/Tags:.*Laravel/);
    expect(md).toContain(`[Resume](${content.profile.resumeUrl})`);
    expect(md).toContain(`[Resume (PDF)](${content.profile.resumeUrl})`);
    expect(md).not.toMatch(PHONE_PATTERN);
    // front matter
    expect(md.startsWith("---\n")).toBe(true);
    expect(md).toMatch(/^---\n[\s\S]*?\n---\n/);
  });

  it("produces llms.txt per llmstxt.org shape", () => {
    const txt = toLlmsTxt(content);
    expect(txt.startsWith("# Abu Hasnat Ovee\n")).toBe(true);
    expect(txt).toMatch(/^> /m);
    expect(txt).toContain("## Profile");
    expect(txt).toContain("## Projects");
    expect(txt).toContain("## Links");
    expect(txt).toContain("/index.md");
    expect(txt).toContain(`[Resume (PDF)](${content.profile.resumeUrl})`);
    expect(txt).not.toMatch(PHONE_PATTERN);
  });
});

describe("JSON-LD", () => {
  it("builds a @graph with Person, WebSite, ProfilePage, ItemList, Organizations", () => {
    const ld = buildJsonLd(content);
    expect(ld["@context"]).toBe("https://schema.org");
    const graph = ld["@graph"] as Array<Record<string, unknown>>;
    const types = graph.map((n) => n["@type"]);
    expect(types).toContain("Person");
    expect(types).toContain("WebSite");
    expect(types).toContain("ProfilePage");
    expect(types).toContain("ItemList");
    expect(types.filter((t) => t === "Organization").length).toBeGreaterThan(0);

    const person = graph.find((n) => n["@type"] === "Person")!;
    expect(person.alternateName).toBe("Md. Abu Hasnat Ovee");
    expect(person.name).toBe("Abu Hasnat Ovee");
    const personImage = person.image as Record<string, unknown>;
    expect(personImage.url).toBe("https://oveehasnat.com/og.png");
    expect(personImage.width).toBe(1200);
    expect(personImage.height).toBe(630);
    expect(personImage.encodingFormat).toBe("image/png");

    const page = graph.find((n) => n["@type"] === "ProfilePage")!;
    expect((page.image as Record<string, unknown>).url).toBe(
      "https://oveehasnat.com/og.png",
    );

    const list = graph.find((n) => n["@type"] === "ItemList")!;
    expect(list.numberOfItems).toBe(content.projects.length);

    // Round-trip JSON parse
    const parsed = JSON.parse(JSON.stringify(ld));
    expect(parsed["@graph"]).toHaveLength(graph.length);
  });
});
