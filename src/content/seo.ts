import type { Seo } from "./types";

export const seo: Seo = {
  siteName: "Abu Hasnat Ovee",
  title: "Abu Hasnat Ovee | AI-native Software Engineer, Dhaka",
  description:
    "Abu Hasnat Ovee is an AI-native Software Engineer in Dhaka building with React, Next.js, TypeScript, Node.js and Laravel. Open to L2/L3 roles.",
  keywords: [
    "Abu Hasnat Ovee",
    "AI-native software engineer",
    "full-stack engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Laravel",
    "Dhaka",
  ],
  canonical: "https://oveehasnat.com/",
  /** Root-relative; Next resolves against deploy metadataBase (incl. Pages base path). */
  ogImage: "/og.png",
  locale: "en_US",
  robots: "index, follow, max-image-preview:large, max-snippet:-1",
};
