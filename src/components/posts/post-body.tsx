/** Minimal markdown-ish body for spike posts (not the final renderer). */
export function PostBody({ body }: { body: string }) {
  return (
    <div className="spike-post-body space-y-3 font-sans text-sm leading-relaxed whitespace-pre-wrap text-[var(--fg)]">
      {body}
    </div>
  );
}
