"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function PostBody({ body }: { body: string }) {
  return (
    <div
      className="post-prose max-w-none font-sans text-[length:var(--text-body)] leading-7 text-[var(--fg)] [&_a]:text-[var(--accent)] [&_a]:underline-offset-2 hover:[&_a]:underline [&_code]:rounded [&_code]:bg-[var(--soft)] [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-medium [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-medium [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-3 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:border-[var(--line)] [&_pre]:bg-[var(--soft)] [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-[13px] [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5"
      data-post-body=""
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
    </div>
  );
}
