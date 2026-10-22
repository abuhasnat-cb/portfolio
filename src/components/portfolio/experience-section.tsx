import type { Experience } from "@/content";
import { renderRichText } from "@/lib/render-rich-text";

export function ExperienceSection({ experience }: { experience: Experience }) {
  const { current, earlier, earlierNote } = experience;

  return (
    <section
      id="experience"
      className="section-panel screen-line-bottom"
      aria-labelledby="experience-heading"
    >
      <h2 id="experience-heading" className="section-title">
        <span className="section-index" aria-hidden="true">
          02
        </span>
        Experience
      </h2>

      <div className="job job-current screen-line-bottom grid grid-cols-[28px_1fr_auto] items-start gap-4 py-5 max-[600px]:grid-cols-[28px_1fr]">
        <div className="badge cur relative grid size-7 place-items-center rounded-[7px] bg-[var(--fg)] font-mono text-[length:var(--text-min)] font-medium text-[var(--bg)]">
          {current.badge}
          <span
            className="absolute -top-[3px] -right-[3px] size-[9px] rounded-full border-2 border-[var(--bg)] bg-[var(--accent)]"
            aria-hidden="true"
          />
        </div>
        <div>
          <b className="inline text-lg leading-6 font-medium tracking-[-0.01em]">
            {current.org}
          </b>
          <span className="now ml-2 inline-block translate-y-0.5 rounded bg-[var(--accent-soft)] px-[5px] py-[3px] align-[2px] font-mono text-[length:var(--text-min)] font-medium tracking-[0.06em] text-[var(--accent)] uppercase">
            Current
          </span>
          <span className="r mt-1 block text-sm text-[var(--muted)]">
            {current.role}
          </span>
          <div className="job-date-mobile mt-1 font-mono text-[length:var(--text-min)] leading-5 whitespace-nowrap text-[var(--faint)] tabular-nums">
            {current.dates}
          </div>
          <ul className="impact mt-3.5 grid list-none gap-2">
            {current.impact.map((item, i) => (
              <li
                key={i}
                className="relative pl-4 text-sm text-[var(--muted)] before:absolute before:top-[0.72em] before:left-0.5 before:size-[5px] before:rounded-full before:bg-[var(--accent)] before:opacity-85 before:content-['']"
              >
                {renderRichText(item)}
              </li>
            ))}
          </ul>
        </div>
        <div className="job-date-desktop font-mono text-[length:var(--text-min)] leading-6 whitespace-nowrap text-[var(--faint)] tabular-nums">
          {current.dates}
        </div>
      </div>

      <div className="sub mx-[var(--pad)] mt-7 mb-1 font-mono text-[length:var(--text-min)] leading-none text-[var(--faint)]">
        {earlierNote}
      </div>

      <div className="earlier relative mx-[var(--pad)] before:absolute before:top-6 before:bottom-6 before:left-[13.5px] before:w-px before:bg-[var(--border)] before:content-['']">
        {earlier.map((role) => (
          <div
            key={role.org}
            className="job grid grid-cols-[28px_1fr_auto] items-start gap-4 py-4 max-[600px]:grid-cols-[28px_1fr]"
          >
            <div className="badge relative z-1 grid size-7 place-items-center rounded-[7px] bg-[var(--soft)] font-mono text-[length:var(--text-min)] font-medium text-[var(--muted)] shadow-[inset_0_0_0_1px_var(--border)]">
              {role.badge}
            </div>
            <div>
              <b className="inline text-[15px] leading-[22px] font-medium tracking-[-0.01em]">
                {role.org}
              </b>
              <span className="r mt-1 block text-sm text-[var(--muted)]">
                {renderRichText(role.desc)}
              </span>
              <div className="job-date-mobile mt-1 font-mono text-[length:var(--text-min)] leading-5 whitespace-nowrap text-[var(--faint)] tabular-nums">
                {role.dates}
              </div>
            </div>
            <div className="job-date-desktop font-mono text-[length:var(--text-min)] leading-6 whitespace-nowrap text-[var(--faint)] tabular-nums max-[600px]:hidden">
              {role.dates}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
