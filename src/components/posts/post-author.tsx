import type { Profile } from "@/content";

/** Author block for modal + standalone (LinkedIn + Email me only). */
export function PostAuthor({ profile }: { profile: Profile }) {
  const linkedIn = profile.links.find((l) => l.label === "LinkedIn");

  return (
    <aside
      className="post-author mt-10 flex flex-col gap-4 border border-[var(--line)] bg-[var(--bg)] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5"
      data-post-author=""
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="grid size-10 shrink-0 place-items-center rounded-lg border border-[var(--line)] bg-[var(--soft)] font-mono text-[length:var(--text-min)] font-medium tracking-[0.02em] text-[var(--fg)]"
          aria-hidden="true"
        >
          {profile.initials}
        </span>
        <div className="min-w-0">
          <p className="m-0 text-[15px] leading-5 font-medium text-[var(--fg)]">
            {profile.name}
          </p>
          <p className="m-0 mt-1 font-mono text-[length:var(--text-min)] leading-4 text-[var(--muted)]">
            AI-native Software Engineer · Dhaka, BD
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {linkedIn ? (
          <a
            href={linkedIn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-link header-control inline-flex items-center justify-center gap-1.5 px-3.5 py-2 font-mono text-[length:var(--text-min)] no-underline"
          >
            LinkedIn
            <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        <a
          href={`mailto:${profile.email}`}
          className="btn-primary header-control inline-flex items-center justify-center px-3.5 py-2 font-mono text-[length:var(--text-min)] no-underline"
        >
          Email me
        </a>
      </div>
    </aside>
  );
}
