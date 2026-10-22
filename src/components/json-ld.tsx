import { buildJsonLd } from "@/lib/json-ld";
import type { SiteContent } from "@/content";

export function JsonLd({ content }: { content: SiteContent }) {
  const data = buildJsonLd(content);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
