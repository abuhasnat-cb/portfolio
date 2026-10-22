#!/usr/bin/env node
/**
 * Next.js basePath=/portfolio emits asset URLs under /portfolio/_next/...
 * while files still land in out/. Nest them so a static server can serve
 * http://host/portfolio/ correctly.
 */
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "out");
const preview = join(root, ".preview");
const nested = join(preview, "portfolio");

rmSync(preview, { recursive: true, force: true });
mkdirSync(nested, { recursive: true });
cpSync(out, nested, { recursive: true });
console.log(`prepared ${nested}`);
