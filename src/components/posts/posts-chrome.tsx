import type { ReactNode } from "react";
import type { Profile } from "@/content";
import { AoMark } from "@/components/portfolio/ao-mark";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";

/** Minimal chrome for /posts routes (theme + home mark). */
export function PostsChrome({
  profile,
  children,
}: {
  profile: Profile;
  children: ReactNode;
}) {
  return (
    <div className="col-wrap">
      <header className="screen-line-top screen-line-bottom sticky top-0 z-[60] flex min-h-[var(--header-h)] items-center justify-between bg-[var(--bg)] px-[var(--pad)] py-2.5">
        <AoMark initials={profile.initials} />
        <ThemeToggle />
      </header>
      {children}
    </div>
  );
}
