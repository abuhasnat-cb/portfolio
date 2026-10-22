import { expect, test } from "@playwright/test";

test.describe("GitHub Pages base path (/portfolio)", () => {
  test("serves under /portfolio with assets and noindex", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    const response = await page.goto("./");
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Abu Hasnat Ovee",
    );

    // Assets must load from /portfolio/_next/...
    const css = page.locator('link[rel="stylesheet"]').first();
    const href = await css.getAttribute("href");
    expect(href).toMatch(/\/portfolio\/_next\//);

    const robots = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    expect(robots).toMatch(/noindex/i);

    await page.getByRole("radio", { name: "Agent view (markdown)" }).click();
    const mdLink = page.getByRole("link", { name: "/index.md" });
    await expect(mdLink).toHaveAttribute("href", "/portfolio/index.md");

    // Favicons + OG under base path
    for (const path of [
      "/portfolio/favicon.ico",
      "/portfolio/icon.png",
      "/portfolio/icon.svg",
      "/portfolio/apple-touch-icon.png",
      "/portfolio/og.png",
    ]) {
      const iconRes = await page.request.get(path);
      expect(iconRes.status(), path).toBe(200);
    }

    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(ogImage).toMatch(
      /^https:\/\/abuhasnat-cb\.github\.io\/portfolio\/og\.png$/,
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      "content",
      /^https:\/\/abuhasnat-cb\.github\.io\/portfolio\/og\.png$/,
    );

    // Canonical stays production even on the preview build
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical?.replace(/\/$/, "")).toBe("https://oveehasnat.com");

    expect(errors).toEqual([]);
  });

  test("no horizontal overflow at 390px under base path", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("./");
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
      };
    });
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
  });
});
