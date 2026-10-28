import { content } from "@/content";
import { posts } from "@/content/posts";
import { PortfolioShell } from "@/components/portfolio/portfolio-shell";

export default function HomePage() {
  return <PortfolioShell content={content} posts={posts} />;
}
