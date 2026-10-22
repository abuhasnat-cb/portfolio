"use client";

import type { Profile } from "@/content";
import { AoMark } from "./ao-mark";
import { ModeToggle } from "./mode-toggle";
import { ThemeToggle } from "./theme-toggle";

type Mode = "human" | "agent";

export function SiteHeader({
  profile,
  mode,
  onModeChange,
  onContactClick,
}: {
  profile: Profile;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onContactClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const showResume = Boolean(profile.resumeUrl);

  return (
    <header className="top screen-line-top screen-line-bottom strong fx sticky top-0 z-[60] flex min-h-[var(--header-h)] flex-nowrap items-center justify-between gap-2 bg-[var(--bg)] px-[var(--pad)] py-2.5 [--i:0] sm:gap-3 sm:py-3">
      <div className="flex shrink-0 items-center gap-3">
        <AoMark initials={profile.initials} />
      </div>

      <ModeToggle mode={mode} onChange={onModeChange} />

      <nav
        className="actions flex shrink-0 items-center gap-1.5 sm:gap-2"
        aria-label="Primary"
      >
        <ThemeToggle />
        <a
          className="cta-link header-control"
          href="#contact"
          aria-label="Get in touch"
          onClick={onContactClick}
        >
          <span className="header-label-full">Get in touch</span>
          <span className="header-label-compact" aria-hidden="true">
            Contact
          </span>
        </a>
        {showResume ? (
          <a
            className="btn-primary header-control"
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
  );
}
