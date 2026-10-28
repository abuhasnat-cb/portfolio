#!/usr/bin/env node
/**
 * Validate post JSON against the Zod schema.
 * Usage:
 *   pnpm post:check <file>
 *   pnpm post:check          # all src/content/posts/*.json
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { formatPostIssues, postSchema } from "../src/content/post-schema";

const POSTS_DIR = join(process.cwd(), "src/content/posts");
const EXCLUDED = /Medtouch AI|Vision Limo|Bigfish|Tavixa|HelloVacancy/i;
const REPO_LINK = /https?:\/\/(www\.)?(github|gitlab|bitbucket)\.com/i;
const PHONE = /(?:\+?\d[\d\s().-]{7,}\d)/;
const EM_DASH = /\u2014/;

function plainIssues(file: string, data: unknown): string[] {
  const out: string[] = [];
  const parsed = postSchema.safeParse(data);
  if (!parsed.success) {
    out.push(...formatPostIssues(parsed.error.issues));
    return out;
  }
  const post = parsed.data;
  const expectedName = `${post.slug}.json`;
  if (basename(file) !== expectedName) {
    out.push(
      `filename: must be ${expectedName} to match slug "${post.slug}" (got ${basename(file)})`,
    );
  }

  const blobs = [
    post.title,
    post.description,
    post.summary,
    post.body,
    ...(post.faq ?? []).flatMap((f) => [f.q, f.a]),
  ].join("\n");

  if (PHONE.test(blobs)) {
    out.push("content: phone numbers are not allowed");
  }
  if (REPO_LINK.test(blobs)) {
    out.push("content: repository / source-code links are not allowed");
  }
  if (EXCLUDED.test(blobs)) {
    out.push(
      "content: excluded projects must not be mentioned (Medtouch AI, Vision Limo, Bigfish, Tavixa, HelloVacancy)",
    );
  }
  if (EM_DASH.test(blobs)) {
    out.push("content: em dashes are not allowed; use plain punctuation");
  }
  const lines = post.body.split(/\r?\n/);
  let inFence = false;
  for (const line of lines) {
    if (!line.startsWith("```")) continue;
    if (!inFence) {
      const lang = line.slice(3).trim();
      if (!lang) {
        out.push("body: fenced code blocks must declare a language");
        break;
      }
      inFence = true;
    } else {
      inFence = false;
    }
  }
  return out;
}

function targetsFromArgv(argv: string[]): string[] {
  const args = argv.slice(2).filter((a) => !a.startsWith("-"));
  if (args.length === 0) {
    if (!existsSync(POSTS_DIR)) return [];
    return readdirSync(POSTS_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => join(POSTS_DIR, f));
  }
  return args.map((a) => resolve(a));
}

function main() {
  const files = targetsFromArgv(process.argv);
  if (files.length === 0) {
    console.error("No post JSON files found to check.");
    process.exit(1);
  }

  let failed = 0;
  for (const file of files) {
    if (!existsSync(file)) {
      console.error(`✗ ${file}\n  file: not found`);
      failed += 1;
      continue;
    }
    let data: unknown;
    try {
      data = JSON.parse(readFileSync(file, "utf8")) as unknown;
    } catch {
      console.error(`✗ ${file}\n  file: invalid JSON`);
      failed += 1;
      continue;
    }
    const issues = plainIssues(file, data);
    if (issues.length) {
      failed += 1;
      console.error(`✗ ${file}`);
      for (const issue of issues) console.error(`  ${issue}`);
    } else {
      console.log(`✓ ${file}`);
    }
  }

  // Uniqueness across the posts directory
  if (existsSync(POSTS_DIR)) {
    const slugs = new Map<string, string>();
    for (const name of readdirSync(POSTS_DIR).filter((f) =>
      f.endsWith(".json"),
    )) {
      try {
        const raw = JSON.parse(readFileSync(join(POSTS_DIR, name), "utf8")) as {
          slug?: string;
        };
        if (raw.slug) {
          if (slugs.has(raw.slug)) {
            console.error(
              `✗ duplicate slug "${raw.slug}" in ${slugs.get(raw.slug)} and ${name}`,
            );
            failed += 1;
          } else {
            slugs.set(raw.slug, name);
          }
        }
      } catch {
        /* per-file errors already reported */
      }
    }
  }

  if (failed > 0) {
    console.error(`\n${failed} post check(s) failed.`);
    process.exit(1);
  }
  console.log(`\n${files.length} post file(s) OK.`);
}

main();
