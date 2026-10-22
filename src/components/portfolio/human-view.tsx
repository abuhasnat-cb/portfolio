import type { SiteContent } from "@/content";
import { AboutSection } from "./about-section";
import { ContactSection } from "./contact-section";
import { ExperienceSection } from "./experience-section";
import { InfoGrid } from "./info-grid";
import { ProjectsSection } from "./projects-section";
import { StackSection } from "./stack-section";

export function HumanView({ content }: { content: SiteContent }) {
  const { profile, experience, projects, skills } = content;

  return (
    <div>
      <h1 className="hero dots screen-line-bottom fx m-0 max-w-none px-[var(--pad)] pt-[clamp(3.5rem,3rem+2vw,5.25rem)] pb-3.5 font-sans text-[length:var(--text-hero)] leading-[1.15] font-medium tracking-[-0.025em] [--i:1]">
        {profile.name}
        <span className="relative mt-3.5 ml-[calc(-1*var(--pad))] block px-[var(--pad)] pt-2.5 font-mono text-[length:var(--text-mono)] leading-relaxed font-normal tracking-normal text-[var(--muted)] before:absolute before:top-0 before:right-0 before:left-0 before:h-px before:bg-[var(--line)] before:content-['']">
          {profile.tagline}
        </span>
      </h1>

      <div className="fx [--i:2]">
        <InfoGrid profile={profile} />
      </div>

      <div className="hatch-sep screen-line-bottom" aria-hidden="true" />

      <div className="fx [--i:3]">
        <AboutSection profile={profile} />
      </div>

      <div className="hatch-sep screen-line-bottom" aria-hidden="true" />

      <div className="fx [--i:4]">
        <ExperienceSection experience={experience} />
      </div>

      <div className="hatch-sep screen-line-bottom" aria-hidden="true" />

      <div className="fx [--i:5]">
        <ProjectsSection projects={projects} />
      </div>

      <div className="hatch-sep screen-line-bottom" aria-hidden="true" />

      <div className="fx [--i:6]">
        <StackSection skills={skills} />
      </div>

      <div className="hatch-sep screen-line-bottom" aria-hidden="true" />

      <div className="fx [--i:7]">
        <ContactSection profile={profile} />
      </div>

      <div className="hatch-sep screen-line-bottom" aria-hidden="true" />

      <footer className="fx flex justify-between px-[var(--pad)] py-5 font-mono text-[12.5px] leading-none text-[var(--faint)] [--i:8]">
        <span>{profile.site}</span>
        <span>Dhaka · {profile.timezoneLabel}</span>
      </footer>
    </div>
  );
}
