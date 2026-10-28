import type { Profile } from "@/content";

/** Author block for modal + standalone (LinkedIn + Email me only). */
export function PostAuthor({ profile }: { profile: Profile }) {
  const linkedIn = profile.links.find((l) => l.label === "LinkedIn");

  return (
    <aside className="post-author author" data-post-author="">
      <div className="av" aria-hidden="true">
        {profile.initials}
      </div>
      <div>
        <b>{profile.name}</b>
        <p>AI-native Software Engineer · Dhaka, BD</p>
      </div>
      <div className="links">
        {linkedIn ? (
          <a
            href={linkedIn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-link header-control inline-flex items-center"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        <a
          href={`mailto:${profile.email}`}
          className="btn-primary header-control inline-flex items-center"
        >
          Email me
        </a>
      </div>
    </aside>
  );
}
