import type { Profile } from "@/content";
import { CopyButton } from "./copy-button";

export function ContactSection({ profile }: { profile: Profile }) {
  return (
    <section
      id="contact"
      className="section-panel screen-line-bottom"
      aria-labelledby="contact-heading"
    >
      <h2 id="contact-heading" className="section-title">
        <span className="section-index" aria-hidden="true">
          06
        </span>
        Contact
      </h2>

      <div className="contact contact-card mt-5! flex flex-col gap-5 border border-[var(--line)] px-7 py-6 max-[600px]:gap-4">
        <div className="flex items-center justify-between gap-8 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-4">
          <div className="flex flex-col gap-0.5">
            <p className="m-0 font-medium text-[var(--fg)]">
              {profile.contact.pitch}
            </p>
            <p className="m-0 text-[var(--muted)]">{profile.contact.note}</p>
          </div>
          <a
            className="btn-primary header-control shrink-0"
            href={`mailto:${profile.email}`}
          >
            Email me
          </a>
        </div>
        <div className="mail flex items-center gap-2 font-mono text-[length:var(--text-min)] leading-none text-[var(--fg)]">
          <span>{profile.email}</span>
          <CopyButton text={profile.email} idleLabel="Copy email" />
        </div>
      </div>

      <div className="links mt-5! flex flex-wrap gap-x-[22px] gap-y-1.5 text-[length:var(--text-min)] text-[var(--muted)]">
        {profile.links.map((link) => (
          <a
            key={link.href}
            className="ul-link inline-flex items-center gap-1"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
            <svg
              className="size-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
        ))}
        {profile.resumeUrl ? (
          <a
            className="ul-link inline-flex items-center gap-1"
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume (PDF)
            <svg
              className="size-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
        ) : null}
      </div>
    </section>
  );
}
