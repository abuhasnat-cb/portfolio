import { expect, test } from "@playwright/test";

/**
 * Intercepting-routes spike e2e.
 * Runs against root (playwright.config) and /portfolio (playwright.pages.config).
 */
test.describe("posts intercepting-route spike", () => {
  test("clicking a post from home opens modal and updates URL", async ({
    page,
  }) => {
    await page.goto("./");
    await expect(page.locator("[data-spike-posts-teaser]")).toBeVisible();

    await page.locator('[data-spike-post-link="spike-alpha"]').click();

    await expect(page.locator("[data-spike-post-modal]")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(
      "Abu Hasnat Ovee",
    );
    await expect(page.locator("#spike-post-modal-title")).toHaveText(
      "Spike post Alpha",
    );

    expect(page.url()).toMatch(/\/posts\/spike-alpha\/?(?:\?.*)?$/);
  });

  test("close returns to home without modal", async ({ page }) => {
    await page.goto("./");
    await page.locator('[data-spike-post-link="spike-alpha"]').click();
    await expect(page.locator("[data-spike-post-modal]")).toBeVisible();

    await page.locator("[data-spike-close-modal]").click();

    await expect(page.locator("[data-spike-post-modal]")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Abu Hasnat Ovee",
    );
    expect(page.url()).not.toMatch(/\/posts\//);
  });

  test("direct load of /posts/<slug> renders standalone page", async ({
    page,
  }) => {
    const response = await page.goto("./posts/spike-alpha/");
    expect(response?.ok()).toBeTruthy();

    await expect(page.locator("[data-spike-post-page]")).toBeVisible();
    await expect(page.locator("[data-spike-post-modal]")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Spike post Alpha",
    );
    await expect(page.locator("[data-spike-back-home]")).toBeVisible();
    expect(page.url()).toMatch(/\/posts\/spike-alpha\/?(?:\?.*)?$/);
  });

  test("refresh on post URL stays on standalone page", async ({ page }) => {
    await page.goto("./posts/spike-beta/");
    await expect(page.locator("[data-spike-post-page]")).toBeVisible();
    await page.reload();
    await expect(page.locator("[data-spike-post-page]")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Spike post Beta",
    );
    await expect(page.locator("[data-spike-post-modal]")).toHaveCount(0);
  });
});
