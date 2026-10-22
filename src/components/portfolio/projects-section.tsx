"use client";

import { useId, useState } from "react";
import type { Project } from "@/content";
import { renderRichText } from "@/lib/render-rich-text";

const TOP = 4;

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const total = projects.length;
  const showToggle = total > TOP;

  function toggle() {
    const next = !expanded;
    setExpanded(next);
    if (!next) {
      const el = document.getElementById("projects");
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      el?.scrollIntoView({
        block: "start",
        behavior: reduce ? "auto" : "smooth",
      });
    }
  }

  return (
    <section
      id="projects"
      className="section-panel screen-line-bottom"
      aria-labelledby="projects-heading"
    >
      <h2 id="projects-heading" className="section-title">
        <span className="section-index" aria-hidden="true">
          03
        </span>
        Projects
        <sup>({total})</sup>
      </h2>

      <div
        id={listId}
        className="mx-[var(--pad)] mt-5 grid grid-cols-2 gap-px border border-[var(--line)] bg-[var(--line)] max-[600px]:grid-cols-1"
      >
        {projects.map((project, index) => {
          const isExtra = index >= TOP;
          const hidden = isExtra && !expanded;
          return (
            <article
              key={project.slug}
              id={`p-${project.slug}`}
              className={`card-cell ${isExtra && expanded ? "card-reveal" : ""}`}
              // Keep extra projects in the DOM for SEO; visually hide when collapsed.
              hidden={hidden}
              aria-hidden={hidden || undefined}
            >
              <div className="flex h-full flex-col px-6 pt-7 pb-[26px]">
                <div className="flex items-baseline justify-between gap-2.5">
                  <h3 className="m-0">
                    <b className="card-title text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200">
                      {project.name}
                    </b>
                  </h3>
                  <div className="flex gap-3 font-mono text-[length:var(--text-min)] leading-none whitespace-nowrap text-[var(--muted)]">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="transition-colors duration-200 hover:text-[var(--accent)]"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {renderRichText(project.desc)}
                </p>
                <div className="mt-auto pt-[18px]">
                  <div className="flex flex-wrap gap-2">
                    {project.visibleTags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {showToggle ? (
        <button
          type="button"
          className="pmore"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={toggle}
        >
          <span>{expanded ? "Show less" : `Show all (${total})`}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      ) : null}
    </section>
  );
}
