import type { SkillCategory } from "@/content";

export function StackSection({ skills }: { skills: SkillCategory[] }) {
  return (
    <section
      id="stack"
      className="section-panel screen-line-bottom"
      aria-labelledby="stack-heading"
    >
      <h2 id="stack-heading" className="section-title">
        <span className="section-index" aria-hidden="true">
          04
        </span>
        Stack
      </h2>

      <div className="pb-0 [counter-reset:cat]">
        {skills.map((category) => (
          <div
            key={category.name}
            className="relative m-0 grid grid-cols-[168px_1fr] gap-0 py-5 max-[600px]:grid-cols-1 max-[600px]:gap-2.5 [&+&]:border-t [&+&]:border-[var(--line)]"
          >
            <small className="border-r border-dashed border-[var(--line)] pl-[var(--pad)] font-sans text-[15px] leading-6 font-normal text-[var(--fg)] [counter-increment:cat] before:mr-1.5 before:font-mono before:text-sm before:leading-6 before:text-[color-mix(in_srgb,var(--muted)_80%,transparent)] before:content-[counter(cat,decimal-leading-zero)_'_'] max-[600px]:border-r-0">
              {category.name}
            </small>
            <div className="flex flex-wrap gap-2 px-[var(--pad)]">
              {category.items.map((item) => (
                <span key={item} className="tag-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
