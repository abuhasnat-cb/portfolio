import type { Profile } from "@/content";
import { LocalClock } from "./local-clock";

export function InfoGrid({ profile }: { profile: Profile }) {
  return (
    <div className="screen-line-bottom relative m-0 grid grid-cols-2 gap-x-5 gap-y-3 border-0 p-[var(--pad)] before:absolute before:inset-y-0 before:left-1/2 before:w-0 before:border-l before:border-dashed before:border-[var(--line)] before:content-[''] max-[600px]:grid-cols-1 max-[600px]:before:hidden">
      <div className="flex items-center gap-3.5 p-0">
        <span className="ic grid size-[26px] shrink-0 place-items-center rounded-[7px] bg-[var(--soft)] text-[var(--muted)] shadow-[inset_0_0_0_1px_var(--border)]">
          <svg
            className="size-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m8 8-4 4 4 4M16 8l4 4-4 4" />
          </svg>
        </span>
        <div>
          <small className="sr-only">Role</small>
          <p className="font-mono text-sm leading-5">{profile.role}</p>
        </div>
      </div>

      <div className="flex items-center gap-3.5 p-0">
        <span className="ic grid size-[26px] shrink-0 place-items-center rounded-[7px] bg-[var(--soft)] text-[var(--muted)] shadow-[inset_0_0_0_1px_var(--border)]">
          <svg
            className="size-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
        </span>
        <div>
          <small className="sr-only">Based in</small>
          <p className="font-mono text-sm leading-5">{profile.location}</p>
        </div>
      </div>

      <div className="flex items-center gap-3.5 p-0">
        <span className="ic grid size-[26px] shrink-0 place-items-center rounded-[7px] bg-[var(--soft)] text-[var(--muted)] shadow-[inset_0_0_0_1px_var(--border)]">
          <svg
            className="size-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </span>
        <div>
          <small className="sr-only">Local time</small>
          <p className="font-mono text-sm leading-5">
            <LocalClock
              timezone={profile.timezone}
              label={profile.timezoneLabel}
            />
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3.5 p-0">
        <span className="ic grid size-[26px] shrink-0 place-items-center rounded-[7px] bg-[var(--soft)] text-[var(--muted)] shadow-[inset_0_0_0_1px_var(--border)]">
          <svg
            className="size-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 12.5 9 17l11-11" />
          </svg>
        </span>
        <div>
          <small className="sr-only">Status</small>
          <p className="font-mono text-sm leading-5 font-medium text-[var(--accent)]">
            <span
              className="live-dot mr-[7px] inline-block size-1.5 translate-y-px rounded-full bg-[var(--accent)] align-[1px]"
              aria-hidden="true"
            />
            {profile.statusShort}
          </p>
        </div>
      </div>
    </div>
  );
}
