#!/usr/bin/env node
/**
 * Re-render public/og.png from design/og/og.html (1200×630).
 * Usage: node design/og/render.mjs
 */
import { chromium } from "@playwright/test";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const html = join(root, "design/og/og.html");
const out = join(root, "public/og.png");

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.goto(pathToFileURL(html).href, { waitUntil: "networkidle" });
await page.screenshot({ path: out, type: "png" });
await browser.close();
console.log(`wrote ${out}`);
