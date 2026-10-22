import { afterEach, describe, expect, it } from "vitest";
import {
  getBasePath,
  getSiteUrl,
  isPreviewDeploy,
  withBasePath,
} from "@/lib/site-env";
import { toRobotsTxt } from "@/lib/markdown";
import { content } from "@/content";

describe("site-env", () => {
  const original = {
    base: process.env.NEXT_PUBLIC_BASE_PATH,
    site: process.env.SITE_URL,
  };

  afterEach(() => {
    if (original.base === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = original.base;
    if (original.site === undefined) delete process.env.SITE_URL;
    else process.env.SITE_URL = original.site;
  });

  it("defaults to production root URL", () => {
    delete process.env.NEXT_PUBLIC_BASE_PATH;
    delete process.env.SITE_URL;
    expect(getBasePath()).toBe("");
    expect(getSiteUrl()).toBe("https://oveehasnat.com");
    expect(isPreviewDeploy()).toBe(false);
    expect(withBasePath("/index.md")).toBe("/index.md");
  });

  it("applies GitHub Pages base path and site URL", () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/portfolio";
    process.env.SITE_URL = "https://abuhasnat-cb.github.io/portfolio";
    expect(getBasePath()).toBe("/portfolio");
    expect(getSiteUrl()).toBe("https://abuhasnat-cb.github.io/portfolio");
    expect(isPreviewDeploy()).toBe(true);
    expect(withBasePath("/")).toBe("/portfolio/");
    expect(withBasePath("/llms.txt")).toBe("/portfolio/llms.txt");
  });

  it("writes Disallow robots.txt for preview", () => {
    const txt = toRobotsTxt(content, { preview: true });
    expect(txt).toContain("Disallow: /");
    expect(txt).not.toContain("Allow: /");
    expect(txt).not.toContain("Sitemap:");
  });
});
