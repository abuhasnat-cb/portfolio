import type { SkillCategory } from "@/content";

export function StackSection({ skills }: { skills: SkillCategory[] }) {
  return (
    <section
      id="stack"
      className="stack-section section-panel screen-line-bottom"
      aria-labelledby="stack-heading"
    >
      <h2 id="stack-heading" className="section-title">
        <span className="section-index" aria-hidden="true">
          05
        </span>
        Stack
      </h2>

      <div className="stack-list pb-0">
        {skills.map((category) => (
          <div
            key={category.name}
            className="stack-row relative m-0 grid grid-cols-[minmax(9.5rem,11.5rem)_minmax(0,1fr)] gap-0 py-5 max-[640px]:grid-cols-1 max-[640px]:gap-2.5 [&+&]:border-t [&+&]:border-[var(--line)]"
          >
            <div className="stack-label border-r border-dashed border-[var(--line)] pr-3 pl-[var(--pad)] font-sans text-[length:var(--text-body)] leading-6 font-normal text-[var(--fg)] max-[640px]:border-r-0">
              <span className="stack-index" aria-hidden="true" />
              <span className="stack-name">{category.name}</span>
            </div>
            <p className="stack-items m-0 px-[var(--pad)] font-mono text-[13px] leading-[1.85] text-[var(--fg)] max-[640px]:pl-[calc(var(--pad)+2ch+8px)]">
              {category.items.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
