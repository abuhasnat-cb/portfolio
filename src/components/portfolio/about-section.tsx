import type { Profile } from "@/content";
import { renderRichText } from "@/lib/render-rich-text";

export function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section
      id="about"
      className="about-section section-panel screen-line-bottom"
      aria-labelledby="about-heading"
    >
      <h2 id="about-heading" className="section-title">
        <span className="section-index" aria-hidden="true">
          01
        </span>
        About
      </h2>
      {profile.about.map((paragraph, i) => (
        <p
          key={i}
          className={`leading-[1.7] text-[var(--muted)] ${i === 0 ? "mt-5" : "mt-4"}`}
        >
          {renderRichText(paragraph)}
        </p>
      ))}
    </section>
  );
}
