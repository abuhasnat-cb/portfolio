import { z } from "zod";

const kebabSlug = z
  .string()
  .regex(
    /^[a-z0-9]+(-[a-z0-9]+)*$/,
    "slug must be kebab-case (lowercase letters, numbers, hyphens)",
  );

const isoDate = z
  .string()
  .refine((v) => !Number.isNaN(Date.parse(v)), "must be a valid ISO date");

export const postFaqSchema = z.object({
  q: z.string().min(1, "faq question is required"),
  a: z.string().min(1, "faq answer is required"),
});

export const postSchema = z
  .object({
    title: z
      .string()
      .min(1, "title is required")
      .max(60, "title must be 60 characters or fewer"),
    slug: kebabSlug,
    description: z
      .string()
      .min(140, "description must be at least 140 characters")
      .max(160, "description must be 160 characters or fewer"),
    date: isoDate,
    tags: z
      .array(z.string().min(1))
      .min(3, "tags need at least 3 items")
      .max(6, "tags allow at most 6 items"),
    summary: z
      .string()
      .min(1, "summary is required")
      .refine((s) => {
        const sentences = s
          .split(/(?<=[.!?])\s+/)
          .map((x) => x.trim())
          .filter(Boolean);
        return sentences.length >= 2 && sentences.length <= 3;
      }, "summary must be 2–3 sentences"),
    body: z.string().min(1, "body is required"),
    updated: isoDate.optional(),
    cover: z.string().min(1).optional(),
    coverAlt: z.string().min(1).optional(),
    canonical: z.string().url("canonical must be an absolute URL").optional(),
    faq: z.array(postFaqSchema).optional(),
    draft: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.cover && !data.coverAlt) {
      ctx.addIssue({
        code: "custom",
        path: ["coverAlt"],
        message: "coverAlt is required when cover is set",
      });
    }
    if (data.canonical) {
      const expected = `https://oveehasnat.com/posts/${data.slug}`;
      const normalized = data.canonical.replace(/\/$/, "");
      if (normalized !== expected) {
        ctx.addIssue({
          code: "custom",
          path: ["canonical"],
          message: `canonical should be ${expected} (or omit to use the default)`,
        });
      }
    }
  });

export type Post = z.infer<typeof postSchema>;

export function formatPostIssues(issues: z.ZodIssue[]): string[] {
  return issues.map((issue) => {
    const path = issue.path.length ? issue.path.join(".") : "(root)";
    return `${path}: ${issue.message}`;
  });
}
