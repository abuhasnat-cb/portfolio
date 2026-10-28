/**
 * Render locked mockup HTML + built site; save side-by-side PNGs for QA.
 * Usage: node scripts/posts-mockup-compare.mjs (after `pnpm build`)
 */
import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mockupDir = path.join(root, ".ai-context/mockups/posts");
const outDir = path.join(root, "out");
const artifactDir =
  process.env.POSTS_COMPARE_DIR || "/opt/cursor/artifacts/posts-mockup-compare";

const viewports = [
  { name: "390-light", width: 390, height: 844, dark: false },
  { name: "390-dark", width: 390, height: 844, dark: true },
  { name: "1440-light", width: 1440, height: 900, dark: false },
];

const surfaces = [
  {
    id: "home-posts",
    mockup: "home.html",
    implPath: "/",
    mockSelector: "#posts",
    implSelector: "[data-posts-section]",
    mockPrep: async (page) => {
      await page.evaluate(() => {
        document.querySelector(".ex-badge")?.remove();
        document.getElementById("posts")?.scrollIntoView();
      });
    },
    implPrep: async (page) => {
      await page.evaluate(() => {
        document.getElementById("posts")?.scrollIntoView();
      });
    },
  },
  {
    id: "posts-list",
    mockup: "list.html",
    implPath: "/posts/",
    mockSelector: "section.section-panel",
    implSelector: "[data-posts-index]",
    mockPrep: async (page) => {
      await page.evaluate(() => document.querySelector(".ex-badge")?.remove());
    },
    implPrep: async () => {},
  },
  {
    id: "post-modal",
    mockup: "modal.html",
    implPath: "/",
    mockSelector: ".modal",
    implSelector: "[data-post-modal-panel]",
    mockPrep: async (page) => {
      await page.evaluate(() => document.querySelector(".ex-badge")?.remove());
    },
    implPrep: async (page) => {
      await page.locator('[data-post-link="sample-posts-preview"]').click();
      await page.locator("[data-post-modal-panel]").waitFor();
    },
  },
  {
    id: "post-standalone",
    mockup: "post.html",
    implPath: "/posts/sample-posts-preview/",
    mockSelector: ".post-article, .article",
    implSelector: "[data-post-page] .post-article",
    mockPrep: async (page) => {
      await page.evaluate(() => document.querySelector(".ex-badge")?.remove());
    },
    implPrep: async () => {},
  },
];

function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  return "application/octet-stream";
}

async function startStaticServer(dir, port) {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
      const rel = urlPath === "/" ? "index.html" : urlPath.replace(/^\//, "");
      const filePath = path.join(dir, rel);
      const data = await readFile(filePath);
      res.writeHead(200, { "Content-Type": contentType(filePath) });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  });
  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
  return server;
}

async function clipShot(page, selector) {
  for (const sel of selector.split(",").map((s) => s.trim())) {
    const loc = page.locator(sel).first();
    if ((await loc.count()) > 0) {
      return loc.screenshot({ animations: "disabled" });
    }
  }
  return page.screenshot({ fullPage: true, animations: "disabled" });
}

async function sideBySide(browser, leftBuf, rightBuf) {
  const page = await browser.newPage();
  const leftB64 = leftBuf.toString("base64");
  const rightB64 = rightBuf.toString("base64");
  await page.setContent(`<!doctype html><html><head><style>
    body{margin:0;background:#18181b;display:flex;gap:8px;align-items:flex-start;font:12px monospace;color:#a1a1aa}
    figure{margin:0} img{display:block;max-width:none;height:auto}
    figcaption{padding:4px 0}
  </style></head><body>
    <figure><figcaption>mockup</figcaption><img src="data:image/png;base64,${leftB64}" /></figure>
    <figure><figcaption>implementation</figcaption><img src="data:image/png;base64,${rightB64}" /></figure>
  </body></html>`);
  const shot = await page
    .locator("body")
    .screenshot({ animations: "disabled" });
  await page.close();
  return shot;
}

async function main() {
  await mkdir(artifactDir, { recursive: true });
  const mockPort = 4173;
  const implPort = 4174;
  const mockServer = await startStaticServer(mockupDir, mockPort);
  const implServer = await startStaticServer(outDir, implPort);

  const browser = await chromium.launch();
  try {
    for (const vp of viewports) {
      for (const surface of surfaces) {
        const mockUrl = `http://127.0.0.1:${mockPort}/${surface.mockup}?theme=${vp.dark ? "dark" : "light"}`;
        const implUrl = `http://127.0.0.1:${implPort}${surface.implPath}`;

        const mockPage = await browser.newPage({
          viewport: { width: vp.width, height: vp.height },
        });
        await mockPage.goto(mockUrl, { waitUntil: "networkidle" });
        if (vp.dark) {
          await mockPage.evaluate(() =>
            document.documentElement.classList.add("dark"),
          );
        }
        await surface.mockPrep(mockPage);
        const mockPng = await clipShot(mockPage, surface.mockSelector);
        await mockPage.close();

        const implPage = await browser.newPage({
          viewport: { width: vp.width, height: vp.height },
        });
        await implPage.goto(implUrl, { waitUntil: "networkidle" });
        if (vp.dark) {
          await implPage.evaluate(() => {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
          });
          await implPage.reload({ waitUntil: "networkidle" });
        }
        await surface.implPrep(implPage);
        const implPng = await clipShot(implPage, surface.implSelector);
        await implPage.close();

        const mockOnly = path.join(
          artifactDir,
          `${surface.id}-${vp.name}-mockup.png`,
        );
        const implOnly = path.join(
          artifactDir,
          `${surface.id}-${vp.name}-impl.png`,
        );
        const compare = path.join(
          artifactDir,
          `${surface.id}-${vp.name}-compare.png`,
        );
        await writeFile(mockOnly, mockPng);
        await writeFile(implOnly, implPng);
        const combined = await sideBySide(browser, mockPng, implPng);
        await writeFile(compare, combined);
        console.log("wrote", compare);
      }
    }
  } finally {
    await browser.close();
    mockServer.close();
    implServer.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
