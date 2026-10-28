"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function PostBody({ body }: { body: string }) {
  return (
    <div className="post-prose prose" data-post-body="">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
    </div>
  );
}
