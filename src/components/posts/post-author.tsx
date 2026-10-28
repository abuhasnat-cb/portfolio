import type { Profile } from "@/content";

/** Author block for modal + standalone post surfaces (LinkedIn + Email only). */
export function PostAuthor({ profile }: { profile: Profile }) {
  const linkedIn = profile.links.find((l) => l.label === "LinkedIn");

  return (
    <aside
      className="mt-10 flex flex-col gap-4 border border-[var(--line)] bg-[var(--soft)] p-5 sm:flex-row sm:items-center sm:justify-between"
      data-post-author=""
    >
      <div className="flex items-center gap-3">
        <span
          className="grid size-[40px] place-items-center rounded-lg border border-[var(--line)] bg-[var(--bg)] font-mono text-[length:var(--text-min)] font-medium tracking-[0.02em] text-[var(--fg)]"
          aria-hidden="true"
        >
          {profile.initials}
        </span>
        <div>
          <p className="m-0 font-medium text-[var(--fg)]">{profile.name}</p>
          <p className="m-0 mt-0.5 font-mono text-[length:var(--text-min)] text-[var(--muted)]">
            AI-native Software Engineer · Dhaka, BD
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {linkedIn ? (
          <a
            href={linkedIn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary header-control inline-flex items-center justify-center px-3 py-2 font-mono text-[length:var(--text-min)]"
          >
            LinkedIn
          </a>
        ) : null}
        <a
          href={`mailto:${profile.email}`}
          className="cta-link header-control inline-flex items-center justify-center px-3 py-2 font-mono text-[length:var(--text-min)]"
        >
          Email me
        </a>
      </div>
    </aside>
  );
}
