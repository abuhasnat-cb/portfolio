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
    expect(content.seo.canonical).toMatch(/^https:\/\//);
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

  it("hides resume when URL is empty", () => {
    expect(content.profile.resumeUrl).toBe("");
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

    const list = graph.find((n) => n["@type"] === "ItemList")!;
    expect(list.numberOfItems).toBe(content.projects.length);

    // Round-trip JSON parse
    const parsed = JSON.parse(JSON.stringify(ld));
    expect(parsed["@graph"]).toHaveLength(graph.length);
  });
});
