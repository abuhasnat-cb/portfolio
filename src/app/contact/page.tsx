import Link from "next/link";
import type { Metadata } from "next";
import { content } from "@/content";
import { AoMark } from "@/components/portfolio/ao-mark";
import { ContactForm } from "@/components/portfolio/contact-form";
import { CopyButton } from "@/components/portfolio/copy-button";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { buildPageMetadata } from "@/lib/metadata";

const { profile } = content;

const contactDescription = `${profile.contact.pitch} ${profile.contact.note} Reach ${profile.name} via the contact form or email.`;

export const metadata: Metadata = buildPageMetadata({
  path: "/contact/",
  title: "Hire me · Contact",
  description: contactDescription,
  canonicalPath: "/contact/",
  openGraphType: "website",
});

export default function ContactPage() {
  const showResume = Boolean(profile.resumeUrl);

  return (
    <div className="col-wrap">
      <header className="screen-line-top screen-line-bottom sticky top-0 z-[60] flex min-h-[var(--header-h)] items-center justify-between gap-2 bg-[var(--bg)] px-[var(--pad)] py-2.5">
        <Link href="/" className="shrink-0" aria-label="Home">
          <AoMark initials={profile.initials} />
        </Link>
        <nav
          className="actions flex shrink-0 items-center gap-1 sm:gap-2"
          aria-label="Primary"
        >
          <ThemeToggle />
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

      <main className="px-[var(--pad)] py-[clamp(2rem,1.5rem+2vw,3.5rem)]">
        <h1 className="m-0 font-sans text-[length:var(--text-hero)] font-medium tracking-[-0.02em]">
          Contact
        </h1>
        <p className="mt-3 max-w-[42rem] text-[length:var(--text-body)] text-[var(--muted)]">
          {profile.contact.pitch} {profile.contact.note}
        </p>

        <div className="contact mt-8 flex flex-col gap-4 border border-[var(--line)] bg-[var(--soft)] p-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="m-0 font-medium text-[var(--fg)]">{profile.status}</p>
            <div className="mail mt-3 flex items-center gap-2 font-mono text-[length:var(--text-min)] text-[var(--fg)]">
              <a className="ul-link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <CopyButton text={profile.email} idleLabel="Copy email" />
            </div>
          </div>
          <Link
            className="btn-primary header-control shrink-0"
            href={`mailto:${profile.email}`}
          >
            Email me
          </Link>
        </div>

        <ContactForm />

        <div className="links mt-8 flex flex-wrap gap-x-[22px] gap-y-1.5 text-[length:var(--text-min)] text-[var(--muted)]">
          {profile.links.map((link) => (
            <a
              key={link.href}
              className="ul-link inline-flex items-center gap-1"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </main>

      <footer className="screen-line-top mt-auto flex justify-between px-[var(--pad)] py-5 font-mono text-[length:var(--text-min)] leading-none text-[var(--faint)]">
        <span>{profile.site}</span>
        <span>Dhaka · {profile.timezoneLabel}</span>
      </footer>
    </div>
  );
}
