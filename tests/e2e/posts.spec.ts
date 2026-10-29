import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const SAMPLE = "sample-posts-preview";

test.describe("posts feature", () => {
  test("home §04 lists latest posts and View all", async ({ page }) => {
    await page.goto("./");
    await expect(page.locator("[data-posts-section]")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Posts/, exact: false }),
    ).toBeVisible();
    await expect(page.locator("#posts-heading")).not.toContainText("(3)");
    await expect(page.locator("[data-posts-view-all]")).toContainText(
      "View all posts",
    );
    await expect(page.locator("[data-post-link]")).toHaveCount(3);
  });

  test("mobile posts rows keep index inline with title", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("./");
    const link = page.locator("[data-post-link]").first();
    await link.scrollIntoViewIfNeeded();
    const metrics = await link.evaluate((el) => {
      const index = el.querySelector(".pnum");
      const title = el.querySelector(".ptitle");
      const date = el.querySelector(".pmeta");
      if (!index || !title || !date) return null;
      const ir = index.getBoundingClientRect();
      const tr = title.getBoundingClientRect();
      const dr = date.getBoundingClientRect();
      return {
        indexTop: ir.top,
        titleTop: tr.top,
        dateTop: dr.top,
        indexLeft: ir.left,
        titleLeft: tr.left,
        dateLeft: dr.left,
      };
    });
    expect(metrics).not.toBeNull();
    // Index and title share a baseline/row (not stacked)
    expect(Math.abs(metrics!.indexTop - metrics!.titleTop)).toBeLessThan(6);
    expect(metrics!.indexLeft).toBeLessThan(metrics!.titleLeft);
    // Date sits under the title, title-aligned (not under the index)
    expect(metrics!.dateTop).toBeGreaterThan(metrics!.titleTop + 8);
    expect(Math.abs(metrics!.dateLeft - metrics!.titleLeft)).toBeLessThan(4);
  });

  test("clicking a post from home opens modal and updates URL", async ({
    page,
  }) => {
    await page.goto("./");
    await page.locator(`[data-post-link="${SAMPLE}"]`).click();

    const modal = page.locator("[data-post-modal]");
    await expect(modal).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(
      "Abu Hasnat Ovee",
    );
    await expect(
      page.locator("[data-post-modal] [data-post-title]"),
    ).toContainText("[SAMPLE]");
    await expect(page.locator("[data-post-author]")).toBeVisible();
    await expect(page.locator("[data-post-older]")).toBeVisible();
    expect(page.url()).toMatch(new RegExp(`/posts/${SAMPLE}/?(?:\\?.*)?$`));
  });

  test("modal overlay covers the full viewport via body portal", async ({
    page,
  }) => {
    await page.goto("./");
    await page.locator(`[data-post-link="${SAMPLE}"]`).click();
    const modal = page.locator("[data-post-modal]");
    await expect(modal).toBeVisible();

    const metrics = await modal.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const parent = el.parentElement;
      return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        position: style.position,
        parentIsBody: parent === document.body,
        vw: window.innerWidth,
        vh: window.innerHeight,
        bodyOverflow: document.body.style.overflow,
      };
    });

    expect(metrics.position).toBe("fixed");
    expect(metrics.parentIsBody).toBe(true);
    expect(metrics.top).toBe(0);
    expect(metrics.left).toBe(0);
    expect(metrics.width).toBe(metrics.vw);
    expect(metrics.height).toBe(metrics.vh);
    expect(metrics.bodyOverflow).toBe("hidden");
  });

  test("close returns to home without modal", async ({ page }) => {
    await page.goto("./");
    await page.locator(`[data-post-link="${SAMPLE}"]`).click();
    await expect(page.locator("[data-post-modal]")).toBeVisible();
    await page.locator("[data-post-close-modal]").click();
    await expect(page.locator("[data-post-modal]")).toHaveCount(0);
    expect(page.url()).not.toMatch(/\/posts\/[^/]+/);
  });

  test("/posts lists all posts; soft modal works", async ({ page }) => {
    await page.goto("./posts/");
    await expect(page.locator("[data-posts-index]")).toBeVisible();
    await expect(page.locator("[data-post-link]")).toHaveCount(3);
    await page.locator(`[data-post-link="${SAMPLE}"]`).click();
    await expect(page.locator("[data-post-modal]")).toBeVisible();
    expect(page.url()).toMatch(new RegExp(`/posts/${SAMPLE}/?(?:\\?.*)?$`));
    await page.locator("[data-post-close-modal]").click();
    await expect(page.locator("[data-post-modal]")).toHaveCount(0);
    expect(page.url()).toMatch(/\/posts\/?(?:\?.*)?$/);
  });

  test("direct load renders standalone page with author and older card", async ({
    page,
  }) => {
    const response = await page.goto(`./posts/${SAMPLE}/`);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("[data-post-page]")).toBeVisible();
    await expect(page.locator("[data-post-modal]")).toHaveCount(0);
    await expect(page.locator("[data-post-back]")).toContainText(
      "Back to posts",
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "[SAMPLE]",
    );
    await expect(page.locator("[data-post-author]")).toBeVisible();
    await expect(page.locator("[data-post-older]")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "LinkedIn", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Email me", exact: true }),
    ).toBeVisible();
  });

  test("refresh on post URL stays on standalone page", async ({ page }) => {
    await page.goto("./posts/sample-static-notes/");
    await expect(page.locator("[data-post-page]")).toBeVisible();
    await page.reload();
    await expect(page.locator("[data-post-page]")).toBeVisible();
    await expect(page.locator("[data-post-modal]")).toHaveCount(0);
  });

  test("markdown and RSS artifacts are served", async ({ page }) => {
    const md = await page.request.get(`./posts/${SAMPLE}.md`);
    expect(md.status()).toBe(200);
    expect(await md.text()).toContain("[SAMPLE]");
    const rss = await page.request.get("./posts/feed.xml");
    expect(rss.status()).toBe(200);
    expect(await rss.text()).toContain("<rss");
    expect(await rss.text()).toContain(SAMPLE);
  });

  test("axe: no serious/critical on post page", async ({ page }) => {
    await page.goto(`./posts/${SAMPLE}/`);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    const bad = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(bad, JSON.stringify(bad, null, 2)).toEqual([]);
  });
});
