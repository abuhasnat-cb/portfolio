import type { ReactNode } from "react";
import Link from "next/link";
import type { Profile } from "@/content";
import { AoMark } from "@/components/portfolio/ao-mark";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";

/** Chrome for /posts routes — mark, theme, contact, resume (matches site header actions). */
export function PostsChrome({
  profile,
  children,
}: {
  profile: Profile;
  children: ReactNode;
}) {
  const showResume = Boolean(profile.resumeUrl);

  return (
    <div className="col-wrap">
      <header className="screen-line-top screen-line-bottom sticky top-0 z-[60] flex min-h-[var(--header-h)] items-center justify-between gap-2 bg-[var(--bg)] px-[var(--pad)] py-2.5">
        <AoMark initials={profile.initials} />
        <nav
          className="actions flex shrink-0 items-center gap-1 sm:gap-2"
          aria-label="Primary"
        >
          <ThemeToggle />
          <Link
            className="cta-link header-control header-contact"
            href="/#contact"
            aria-label="Get in touch"
            title="Get in touch"
          >
            <span className="header-label-full">Get in touch</span>
            <span className="header-label-short" aria-hidden="true">
              Contact
            </span>
            <svg
              className="header-label-icon size-[15px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </Link>
          {showResume ? (
            <a
              className="btn-primary header-control header-resume"
              href={profile.resumeUrl}
              aria-label="Resume"
              title="Resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="header-label-full">Resume</span>
              <svg
                className="size-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 4v12" />
                <path d="m7 11 5 5 5-5" />
                <path d="M5 20h14" />
              </svg>
            </a>
          ) : null}
        </nav>
      </header>
      {children}
      <footer className="screen-line-top mt-auto flex justify-between px-[var(--pad)] py-5 font-mono text-[length:var(--text-min)] leading-none text-[var(--faint)]">
        <span>{profile.site}</span>
        <span>Dhaka · {profile.timezoneLabel}</span>
      </footer>
    </div>
  );
}
