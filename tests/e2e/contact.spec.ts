import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Contact page", () => {
  test("Hire me navigates to contact form", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: /Hire me/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/contact\/?$/);
    await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Chat with me" }),
    ).toBeVisible();
  });

  test("client validation blocks empty submit", async ({ page }) => {
    await page.goto("/contact/");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Name is required")).toBeVisible();
  });

  test("contact page has no serious a11y issues", async ({ page }) => {
    await page.goto("/contact/");
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((v) => v.impact === "critical")).toEqual(
      [],
    );
  });
});
