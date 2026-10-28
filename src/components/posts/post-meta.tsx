import type { Post } from "@/content/post-schema";
import { formatPostDate, readingTimeMinutes } from "@/lib/post-utils";

/** Shared post header: date · read time, title, description, tags. */
export function PostMeta({ post, titleId }: { post: Post; titleId?: string }) {
  const minutes = readingTimeMinutes(post.body);

  return (
    <header className="post-meta">
      <p className="m-0 font-sans text-[length:var(--text-min)] text-[var(--faint)]">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <span aria-hidden="true"> · </span>
        <span>{minutes} min read</span>
      </p>
      <h1
        id={titleId}
        className="m-0 mt-3 text-[1.375rem] leading-tight font-semibold tracking-[-0.025em] text-[var(--fg)] sm:text-[1.75rem]"
      >
        {post.title}
      </h1>
      {post.description ? (
        <p className="m-0 mt-3 text-[length:var(--text-body)] leading-relaxed text-[var(--muted)]">
          {post.description}
        </p>
      ) : null}
      {post.tags.length > 0 ? (
        <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[var(--line)] px-2.5 py-1 font-sans text-[length:var(--text-min)] text-[var(--fg)]"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
