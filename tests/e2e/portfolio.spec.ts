import { expect, test } from "@playwright/test";

test.describe("portfolio", () => {
  test("renders hero and key sections", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Abu Hasnat Ovee",
    );
    await expect(page.getByText(/domain-driven design/i)).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "About", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Experience", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: /Projects/ })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Stack", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Contact", exact: true }),
    ).toBeVisible();

    // Resume hidden while URL empty
    await expect(page.getByRole("link", { name: /^Resume$/ })).toHaveCount(0);

    expect(errors).toEqual([]);
  });

  test("theme toggle switches class on html", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);
    await page.getByRole("button", { name: /toggle dark mode/i }).click();
    await expect(html).toHaveClass(/dark/);
    await page.getByRole("button", { name: /toggle dark mode/i }).click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test("Show all / Show less expands projects with aria-expanded", async ({
    page,
  }) => {
    await page.goto("/");
    const toggle = page.locator("button.pmore");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toContainText(/Show all/i);
    await expect(page.locator("#p-workfreeli")).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toContainText("Show less");
    await expect(page.locator("#p-workfreeli")).toBeVisible();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("Human / Agent toggle shows markdown view", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("radio", { name: "Agent" }).click();
    await expect(page.getByText("index.md", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("document", { name: /Markdown source/i }),
    ).toBeVisible();
    await expect(page.getByText("# Abu Hasnat Ovee").first()).toBeVisible();

    await page.getByRole("radio", { name: "Human" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Abu Hasnat Ovee",
    );
  });

  test("no horizontal overflow at 390px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
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
