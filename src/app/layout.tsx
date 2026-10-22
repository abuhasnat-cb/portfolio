import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { content } from "@/content";
import { JsonLd } from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { isPreviewDeploy } from "@/lib/site-env";
import "./globals.css";

const { seo, profile } = content;
const preview = isPreviewDeploy();

export const metadata: Metadata = {
  metadataBase: new URL(`${profile.url}/`),
  title: {
    default: seo.title,
    template: `%s | ${profile.name}`,
  },
  description: seo.description,
  authors: [{ name: profile.name, url: profile.url }],
  creator: profile.name,
  keywords: seo.keywords,
  robots: preview
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
  alternates: {
    canonical: seo.canonical,
    types: {
      "text/markdown": [{ url: "index.md", title: "Markdown version" }],
      "text/plain": [{ url: "llms.txt", title: "llms.txt" }],
    },
  },
  openGraph: {
    type: "profile",
    siteName: profile.name,
    locale: seo.locale,
    title: seo.title,
    description:
      "Full-stack engineer working with domain-driven design and agent-first workflows. Dhaka, BD · Open to L2/L3 roles.",
    url: seo.canonical,
    ...(seo.ogImage
      ? {
          images: [
            {
              url: seo.ogImage,
              width: 1200,
              height: 630,
              alt: `${profile.name}, ${profile.role}`,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description:
      "Full-stack engineer working with domain-driven design and agent-first workflows. Dhaka, BD · Open to L2/L3 roles.",
    ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
  },
  other: {
    "profile:first_name": "Abu Hasnat",
    "profile:last_name": "Ovee",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <JsonLd content={content} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
