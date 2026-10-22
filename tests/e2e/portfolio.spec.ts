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
    await expect(page.getByRole("link", { name: /Resume/i })).toHaveCount(0);

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

  test("Human / Agent icon toggle shows markdown view", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("radio", { name: "Agent view (markdown)" }).click();
    await expect(page.getByText("index.md", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("document", { name: /Markdown source/i }),
    ).toBeVisible();
    await expect(page.getByText("# Abu Hasnat Ovee").first()).toBeVisible();

    await page.getByRole("radio", { name: "Human view" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Abu Hasnat Ovee",
    );
  });

  test("mode toggle exposes accessible tooltips on hover and focus", async ({
    page,
  }) => {
    await page.goto("/");
    const human = page.getByRole("radio", { name: "Human view" });
    const agent = page.getByRole("radio", { name: "Agent view (markdown)" });
    const humanTip = page.locator("#tip-human");
    const agentTip = page.locator("#tip-agent");

    await expect(humanTip).toHaveText("Human view");
    await expect(agentTip).toHaveText("Agent view (markdown)");

    await human.hover();
    await expect(humanTip).toBeVisible();
    await expect
      .poll(async () => humanTip.evaluate((el) => getComputedStyle(el).opacity))
      .toBe("1");

    await agent.focus();
    await expect
      .poll(async () => agentTip.evaluate((el) => getComputedStyle(el).opacity))
      .toBe("1");
  });

  test("header control heights match modes pill", async ({ page }) => {
    await page.goto("/");
    const heights = await page.evaluate(() => {
      const modes = document.querySelector(".modes-pill");
      const contact = document.querySelector("a.cta-link.header-control");
      if (!modes || !contact) return null;
      return {
        modes: Math.round(modes.getBoundingClientRect().height),
        contact: Math.round(contact.getBoundingClientRect().height),
      };
    });
    expect(heights).not.toBeNull();
    expect(heights!.modes).toBe(heights!.contact);
    expect(heights!.modes).toBeGreaterThanOrEqual(32);
  });

  test("no horizontal overflow at 360px and 390px", async ({ page }) => {
    for (const width of [360, 390] as const) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        const header = document.querySelector("header.top");
        return {
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
          headerWraps: header
            ? getComputedStyle(header).flexWrap === "wrap"
            : true,
        };
      });
      expect(
        overflow.scrollWidth,
        `overflow at ${width}px`,
      ).toBeLessThanOrEqual(overflow.clientWidth + 1);
      expect(overflow.headerWraps, `header wrap at ${width}px`).toBe(false);
    }
  });

  test("reduced motion skips fade when switching modes", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("radio", { name: "Agent view (markdown)" }).click();
    await expect(
      page.getByRole("document", { name: /Markdown source/i }),
    ).toBeVisible();
    const scrollBehavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    );
    expect(scrollBehavior).toBe("auto");
  });

  test("project cards show visibleTags subset and Simply Eloped live link", async ({
    page,
  }) => {
    await page.goto("/");
    const simply = page.locator("#p-simply-eloped");
    await expect(simply.getByRole("link", { name: /Live/i })).toHaveAttribute(
      "href",
      "https://simplyeloped.com",
    );
    await expect(simply.getByText("Laravel", { exact: true })).toBeVisible();
    await expect(simply.getByText("PHP", { exact: true })).toHaveCount(0);

    await expect(page.locator("#stack .stack-items").first()).toContainText(
      "Cursor, Claude",
    );
  });
});
