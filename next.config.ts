import type { NextConfig } from "next";

function normalizeBasePath(raw: string | undefined): string | undefined {
  if (!raw || raw === "/") return undefined;
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withSlash.replace(/\/$/, "");
}

const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
