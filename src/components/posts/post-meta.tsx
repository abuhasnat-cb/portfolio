import type { Post } from "@/content/post-schema";
import { formatPostDate } from "@/lib/post-utils";

/** Post header: title + date only (locked mockup). */
export function PostMeta({
  post,
  titleId,
  headingLevel = 1,
}: {
  post: Post;
  titleId?: string;
  headingLevel?: 1 | 2;
}) {
  const TitleTag = headingLevel === 2 ? "h2" : "h1";

  return (
    <header className="post-meta">
      <TitleTag id={titleId} data-post-title="">
        {post.title}
      </TitleTag>
      <time dateTime={post.date} className="pmeta post-date-meta">
        {formatPostDate(post.date)}
      </time>
    </header>
  );
}
