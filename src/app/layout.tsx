import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { content } from "@/content";
import { JsonLd } from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteUrl, isPreviewDeploy } from "@/lib/site-env";
import "./globals.css";

const { seo, profile } = content;
const preview = isPreviewDeploy();
/** Deploy origin (may be GitHub Pages); used to resolve icons/manifest. */
const deployOrigin = `${getSiteUrl()}/`;

export const metadata: Metadata = {
  metadataBase: new URL(deployOrigin),
  title: {
    default: seo.title,
    template: `%s | ${seo.siteName}`,
  },
  description: seo.description,
  applicationName: seo.siteName,
  authors: [{ name: profile.name, url: seo.canonical }],
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
    // Always the production domain, including on the noindex Pages preview.
    canonical: seo.canonical,
    types: {
      "text/markdown": [{ url: "index.md", title: "Markdown version" }],
      "text/plain": [{ url: "llms.txt", title: "llms.txt" }],
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "profile",
    siteName: seo.siteName,
    locale: seo.locale,
    title: seo.title,
    description: seo.description,
    url: seo.canonical,
    ...(seo.ogImage
      ? {
          images: [
            {
              url: seo.ogImage,
              width: 1200,
              height: 630,
              type: "image/png",
              alt: "Abu Hasnat Ovee, AI-native Software Engineer",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
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
