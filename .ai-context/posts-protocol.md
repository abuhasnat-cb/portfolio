# Blog posts protocol (mandatory)

**Status:** Locked by owner (Ovee). Docs-only until the spike and feature land.
**Audience:** Every AI agent (and human) that writes or adds a blog post.
**Do not skip steps.** A post PR is invalid if this checklist was not followed.

Related ADR: [`decisions/0012-blog-posts-architecture.md`](decisions/0012-blog-posts-architecture.md).

---

## When this protocol applies

Use this protocol whenever Ovee hands you a post (as JSON or draft copy) and asks you to add it to the site. Do **not** invent posts. Do **not** implement schema, `pnpm post:check`, or UI in a post-intake PR unless that work is already merged — those land in the feature PR first.

Until the feature exists, refuse to add post files and point at the plan spike + feature items in [`plan.md`](plan.md).

---

## Locked product shape (do not redesign)

### Landing page — section **04 Posts**

Insert between **Projects (03)** and **Stack**. Renumber:

| Index  | Section              |
| ------ | -------------------- |
| 01     | About                |
| 02     | Experience           |
| 03     | Projects             |
| **04** | **Posts**            |
| **05** | **Stack** (was 04)   |
| **06** | **Contact** (was 05) |

Posts list UI (landing):

- Numbered rows `01`, `02`, `03` in **faint mono**, aligned with Stack row insets (`--pad` / stack row padding).
- Each row: **title + date only**.
- Show the **latest 3** posts.
- Full-width **View all posts →** control, styled like Projects **Show all** (`.pmore`).
- Keep the current Cobalt accent. No new accent.

### `/posts` list page

- Plain heading (no section index theater).
- Same numbered title + date rows as the landing list (all posts, not only 3).

### Reading a post — intercepting + parallel routes

- Clicking a post opens it in a **modal** via Next.js intercepting + parallel routes (`@modal` slot, `(.)posts/[slug]`).
- URL becomes `/posts/<slug>` while the underlying list (or home) stays visible behind the modal.
- A **direct load** of `/posts/<slug>` renders the **standalone page** (the URL that ranks / is shared).

**Modal chrome:**

1. **Open page** link + **close** button
2. Title, date, body
3. Author block (see below)
4. **Older →** card (previous / older post)

**Full page chrome:**

1. **Back to posts** link
2. Title, date, body
3. Same author block
4. Same **Older →** card

**Author block (both surfaces):**

- AO mark
- Name: Abu Hasnat Ovee
- Line: `AI-native Software Engineer · Dhaka, BD`
- Buttons only: **LinkedIn** and **Email me** (no GitHub / Upwork here)

### Hosting constraint (spike first)

Implementation **must** start with a **spike branch** that proves intercepting routes work with `output: 'export'` on:

1. GitHub Pages under base path `/portfolio`
2. Root (future Cloudflare Pages on `oveehasnat.com`)

Cover both with Playwright e2e. **No full Posts UI until the spike is green and merged.**

---

## Post intake flow (agent checklist)

Follow in order. Stop and report if a step fails.

### 1. Receive

- Accept the post from Ovee as **JSON** (file path or pasted object).
- Do not invent missing facts. Ask only for fields that are missing or invalid after validation (plain words).

### 2. Validate (loop until pass)

Once `pnpm post:check` exists:

```bash
pnpm post:check <path-to-json>
```

- Validate against the planned Zod schema (same rules CI will run).
- If anything fails, **list every** missing/invalid field in plain words.
- Fix or request fixes; re-run until exit code 0.
- Do not open a PR with a failing check.

Until the script exists: manually apply the field rules and content rules below, then refuse to claim CI coverage.

### 3. Branch

- Create a feature branch off `develop`: `cursor/post-<slug>-…` (repo branch rules in `AGENTS.md` / conventions).
- Never push to `develop` or `main`.

### 4. Write content file

- Write **exactly** one file: `src/content/posts/<slug>.json`
- Slug in the filename must match the `slug` field.
- Do not edit unrelated UI or content in a post-intake PR.

### 5. Self-check

Complete the [Pre-PR self-check](#pre-pr-self-check) below.

### 6. PR into `develop`

- Open PR **into `develop`**.
- CI re-runs the same `post:check` (and the rest of the pipeline).
- Merge only when all checks are green.
- Update `.ai-context/` per the root protocol (changelog + session note at minimum for non-trivial batches; always tick plan if you completed planned work).

---

## Post JSON fields

### Required

| Field         | Rule                                                          |
| ------------- | ------------------------------------------------------------- |
| `title`       | String, **≤ 60** characters                                   |
| `slug`        | kebab-case (`[a-z0-9]+(-[a-z0-9]+)*`), **unique** among posts |
| `description` | Meta description, **140–160** characters                      |
| `date`        | ISO date (`YYYY-MM-DD` or full ISO-8601 instant)              |
| `tags`        | Array of **3–6** short tags                                   |
| `summary`     | **2–3** sentences for AI answers / `llms.txt`                 |
| `body`        | Markdown string                                               |

### Optional

| Field       | Rule                                                                |
| ----------- | ------------------------------------------------------------------- |
| `updated`   | ISO date when the post was revised                                  |
| `cover`     | Path or URL to cover image                                          |
| `coverAlt`  | Required if `cover` is set                                          |
| `canonical` | Absolute URL; **defaults to** `https://oveehasnat.com/posts/<slug>` |
| `faq`       | Array of `{ "q": string, "a": string }` for FAQPage JSON-LD         |
| `draft`     | If `true`, omit from lists, sitemap, RSS, and public routes         |

---

## Generated per post (feature responsibility — agents verify after feature ships)

For every non-draft post, the site must produce:

- Document title + meta description
- Canonical URL
- Open Graph + Twitter tags
- `article:published_time` / `article:modified_time` (modified when `updated` is set)
- **BlogPosting** JSON-LD linked to the existing **Person** node
- **BreadcrumbList** JSON-LD
- Optional **FAQPage** JSON-LD when `faq` is present
- Sitemap entry with `lastmod`
- RSS item in `/posts/feed.xml`
- Entry in `llms.txt`
- Markdown view at `/posts/<slug>.md` for the Human/Agent toggle parity

Agents adding a post do not hand-write these artifacts; they confirm the generators pick up the new JSON after the feature exists.

---

## Content rules (every post)

- **Never** include a phone number.
- **No repository / source-code links** (GitHub, GitLab, Bitbucket, etc.). Live product links only.
- **Excluded projects — never mention:** Medtouch AI, Vision Limo, Bigfish, Tavixa, HelloVacancy.
- **Real facts only.** No invented metrics, employers, or product claims.
- **Plain, simple wording.** No em dashes. Nothing that sounds AI-written (no “delve”, “landscape”, “robust solution”, filler praise, or stacked hedging).
- Every outbound link must work (reachable live URL).
- Fenced code blocks **must** declare a language (e.g. ` ```ts `, not bare ` ``` `).

These rules extend ADR 0007 for post bodies and metadata.

---

## Pre-PR self-check

Copy into the PR description or your session note and tick:

- [ ] Read this protocol and ADR 0012 before editing
- [ ] Branch created off `develop`; PR targets `develop`
- [ ] JSON lives at `src/content/posts/<slug>.json` and `slug` matches the filename
- [ ] `pnpm post:check <file>` passes (or manual field audit if script not yet merged — note that in the PR)
- [ ] `title` ≤ 60 chars; `description` 140–160; `tags` length 3–6; `summary` is 2–3 sentences
- [ ] `date` (and `updated` if set) are valid ISO
- [ ] `canonical` omitted or absolute `https://oveehasnat.com/posts/<slug>`
- [ ] If `cover` set, `coverAlt` present
- [ ] No phone number anywhere in the JSON
- [ ] No repo/source links in `body`, `summary`, `description`, or `faq`
- [ ] Excluded projects not mentioned
- [ ] Facts are real; wording is plain; no em dashes; code fences have languages
- [ ] Links in the body were opened / checked
- [ ] `draft` is intentional if true
- [ ] No unrelated UI or content edits in this PR
- [ ] `.ai-context` updates done if required by the root protocol

---

## Example post JSON (EXAMPLE ONLY — do not commit as a real post)

The object below is a **shape example**. It is not site content. Do not copy it into `src/content/posts/` as a live article without Ovee’s real draft.

````json
{
  "title": "Ship static sites that agents can read",
  "slug": "static-sites-agents-can-read",
  "description": "How a static portfolio stays easy for recruiters and AI crawlers: one content source, markdown mirrors, and schema that points at a real person.",
  "date": "2026-10-28",
  "tags": ["next.js", "static-export", "seo", "aeo"],
  "summary": "A static Next.js export can still serve humans and agents well. Keep profile and project facts in one content folder, regenerate markdown and JSON-LD on build, and avoid duplicate sources of truth. This example shows the field shape only.",
  "body": "## Why one content folder\n\nRecruiters see HTML. Agents prefer markdown and schema. Both should read the same facts.\n\n```ts\nexport const content = { profile, projects, posts };\n```\n\nLink only to live demos, never to private repos.\n",
  "updated": "2026-10-28",
  "canonical": "https://oveehasnat.com/posts/static-sites-agents-can-read",
  "faq": [
    {
      "q": "Where do post files live?",
      "a": "In src/content/posts/<slug>.json after validation."
    }
  ],
  "draft": true
}
````

---

## Implementation order (not part of intake)

1. **Spike** — intercepting + parallel routes on static export at `/portfolio` and at `/`; e2e both. See plan.
2. **Feature** — schema, `pnpm post:check`, CI hook, content folder, landing §04, `/posts`, modal/page, generators (RSS, llms, `.md`, JSON-LD, sitemap).
3. **Intake** — this protocol for every new post JSON PR.
