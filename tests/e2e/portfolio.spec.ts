import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("portfolio", () => {
  test("renders hero and key sections without console errors or 404s", async ({
    page,
  }) => {
    const errors: string[] = [];
    const failed: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("response", (res) => {
      const url = res.url();
      if (res.status() === 404 && !url.includes("chrome-extension")) {
        failed.push(`${res.status()} ${url}`);
      }
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

    await expect(
      page.getByRole("link", { name: "Abu Hasnat Ovee, home" }),
    ).toBeVisible();

    // Favicons resolve on this origin
    for (const path of [
      "/favicon.ico",
      "/icon.png",
      "/icon.svg",
      "/apple-touch-icon.png",
    ]) {
      const res = await page.request.get(path);
      expect(res.status(), path).toBe(200);
    }

    // Resume opens Google Drive in a new tab (header CTA; contact also has Resume (PDF))
    const resume = page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Resume", exact: true });
    await expect(resume).toBeVisible();
    await expect(resume).toHaveAttribute(
      "href",
      /drive\.google\.com\/file\/d\//,
    );
    await expect(resume).toHaveAttribute("target", "_blank");
    await expect(resume).toHaveAttribute("rel", /noopener/);

    expect(errors, `console errors: ${errors.join("; ")}`).toEqual([]);
    expect(failed, `404s: ${failed.join("; ")}`).toEqual([]);
  });

  test("open graph and twitter meta tags point at /og.png", async ({
    page,
  }) => {
    await page.goto("/");
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute("content", /\/og\.png$/);
    await expect(
      page.locator('meta[property="og:image:width"]'),
    ).toHaveAttribute("content", "1200");
    await expect(
      page.locator('meta[property="og:image:height"]'),
    ).toHaveAttribute("content", "630");
    await expect(
      page.locator('meta[property="og:image:type"]'),
    ).toHaveAttribute("content", "image/png");
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
      "content",
      "Abu Hasnat Ovee, AI-native Software Engineer",
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      "content",
      /\/og\.png$/,
    );

    const ogRes = await page.request.get("/og.png");
    expect(ogRes.status()).toBe(200);
    expect(ogRes.headers()["content-type"]).toMatch(/image\/png/);
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

  test("no horizontal overflow; comfortable header at 360 and 400px", async ({
    page,
  }) => {
    for (const width of [360, 390, 400] as const) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      const metrics = await page.evaluate(() => {
        const doc = document.documentElement;
        const header = document.querySelector("header.top");
        const modes = document.querySelector(".modes-pill");
        const contact = document.querySelector("a.header-contact");
        return {
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
          headerWraps: header
            ? getComputedStyle(header).flexWrap === "wrap"
            : true,
          modesH: modes ? Math.round(modes.getBoundingClientRect().height) : 0,
          contactH: contact
            ? Math.round(contact.getBoundingClientRect().height)
            : 0,
          contactW: contact
            ? Math.round(contact.getBoundingClientRect().width)
            : 0,
        };
      });
      expect(metrics.scrollWidth, `overflow at ${width}px`).toBeLessThanOrEqual(
        metrics.clientWidth + 1,
      );
      expect(metrics.headerWraps, `header wrap at ${width}px`).toBe(false);
      expect(metrics.modesH).toBe(metrics.contactH);
      expect(metrics.contactH).toBeGreaterThanOrEqual(40);
      // Icon-only contact below 420px should not be a squeezed text pill
      if (width <= 400) {
        expect(metrics.contactW).toBeGreaterThanOrEqual(40);
        expect(metrics.contactW).toBeLessThanOrEqual(56);
      }
    }
  });

  test("Email me matches header primary button geometry", async ({ page }) => {
    await page.goto("/");
    const sizes = await page.evaluate(() => {
      const email = document.querySelector("#contact a.btn-primary");
      const contact = document.querySelector("a.cta-link.header-control");
      if (!email || !contact) return null;
      const e = getComputedStyle(email);
      const c = getComputedStyle(contact);
      return {
        emailH: Math.round(email.getBoundingClientRect().height),
        contactH: Math.round(contact.getBoundingClientRect().height),
        emailRadius: e.borderRadius,
        contactRadius: c.borderRadius,
      };
    });
    expect(sizes).not.toBeNull();
    expect(sizes!.emailH).toBe(sizes!.contactH);
    expect(sizes!.emailRadius).toBe(sizes!.contactRadius);
  });

  test("mobile current experience date sits under the role", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const order = await page.evaluate(() => {
      const job = document.querySelector(".job-current");
      if (!job) return null;
      const role = job.querySelector(".r");
      const mobileDate = job.querySelector(".job-date-mobile");
      const impact = job.querySelector(".impact");
      if (!role || !mobileDate || !impact) return null;
      const roleTop = role.getBoundingClientRect().top;
      const dateTop = mobileDate.getBoundingClientRect().top;
      const impactTop = impact.getBoundingClientRect().top;
      return {
        dateAfterRole: dateTop >= roleTop - 1,
        dateBeforeImpact: dateTop <= impactTop + 1,
        mobileVisible: getComputedStyle(mobileDate).display !== "none",
      };
    });
    expect(order).not.toBeNull();
    expect(order!.mobileVisible).toBe(true);
    expect(order!.dateAfterRole).toBe(true);
    expect(order!.dateBeforeImpact).toBe(true);
  });

  test("axe: no serious or critical violations on home", async ({ page }) => {
    // Avoid mid-animation opacity skewing contrast samples.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForTimeout(300);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .disableRules(["scrollable-region-focusable"])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(
      serious,
      serious
        .map((v) => `${v.id}: ${v.help} :: ${v.nodes[0]?.failureSummary ?? ""}`)
        .join("\n"),
    ).toEqual([]);
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
