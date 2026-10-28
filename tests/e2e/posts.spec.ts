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
    await expect(page.locator("[data-posts-view-all]")).toContainText(
      "View all posts",
    );
    await expect(page.locator("[data-post-link]")).toHaveCount(3);
  });

  test("clicking a post from home opens modal and updates URL", async ({
    page,
  }) => {
    await page.goto("./");
    await page.locator(`[data-post-link="${SAMPLE}"]`).click();

    await expect(page.locator("[data-post-modal]")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(
      "Abu Hasnat Ovee",
    );
    await expect(page.locator("#post-modal-title")).toContainText("[SAMPLE]");
    await expect(page.locator("[data-post-author]")).toBeVisible();
    await expect(page.locator("[data-post-older]")).toBeVisible();
    expect(page.url()).toMatch(new RegExp(`/posts/${SAMPLE}/?(?:\\?.*)?$`));
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
