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
    <header className="top screen-line-top screen-line-bottom strong fx sticky top-0 z-20 flex min-h-[60px] flex-wrap items-center justify-between gap-x-4 gap-y-3.5 bg-[var(--bg)] px-[var(--pad)] py-3 [--i:0]">
      <div className="flex items-center gap-3">
        <AoMark initials={profile.initials} />
      </div>

      <ModeToggle mode={mode} onChange={onModeChange} />

      <nav
        className="actions flex items-center gap-2 max-[600px]:order-3 max-[600px]:w-full"
        aria-label="Primary"
      >
        <div className="max-[600px]:ml-auto">
          <ThemeToggle />
        </div>
        <a className="cta-link" href="#contact" onClick={onContactClick}>
          Get in touch
        </a>
        {showResume ? (
          <a
            className="btn-primary"
            href={profile.resumeUrl}
            title="Resume"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
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
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
        ) : null}
      </nav>
    </header>
  );
}
