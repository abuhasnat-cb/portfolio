export type RichText = string;

export type SocialLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  alternateName: string;
  initials: string;
  role: string;
  tagline: string;
  location: string;
  locationLocality: string;
  locationCountry: string;
  timezone: string;
  timezoneLabel: string;
  statusShort: string;
  status: string;
  email: string;
  site: string;
  url: string;
  updated: string;
  /** Google Drive resume URL. Empty string hides the Resume button. */
  resumeUrl: string;
  about: RichText[];
  contact: {
    pitch: string;
    note: string;
  };
  links: SocialLink[];
};

export type ExperienceRole = {
  org: string;
  orgId: string;
  orgUrl: string;
  badge: string;
  role: string;
  dates: string;
  impact: RichText[];
  current: true;
};

export type EarlierRole = {
  org: string;
  orgId: string;
  orgUrl?: string;
  badge: string;
  desc: RichText;
  dates: string;
  kind: "work" | "education";
};

export type Experience = {
  current: ExperienceRole;
  earlierNote: string;
  earlier: EarlierRole[];
};

export type ProjectLink = {
  label: "Live";
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  org: string;
  orgId: string;
  type: string;
  desc: RichText;
  excerpt: string;
  /** Full tag list for JSON-LD / llms.txt / index.md. */
  tags: string[];
  /** Subset shown on project cards (3–5 key tags). */
  visibleTags: string[];
  links: ProjectLink[];
  metaTitle: string;
  schemaType: "SoftwareApplication" | "CreativeWork";
};

export type SkillCategory = {
  name: string;
  items: string[];
};

export type Education = {
  institution: string;
  institutionUrl: string;
  degree: string;
  year: string;
};

export type Seo = {
  /** Brand / site name used in title template, OG, JSON-LD, manifest. */
  siteName: string;
  title: string;
  description: string;
  keywords: string[];
  /** Always the production origin (https://oveehasnat.com/), even on preview. */
  canonical: string;
  ogImage: string | null;
  locale: string;
  robots: string;
};

export type SiteContent = {
  profile: Profile;
  experience: Experience;
  projects: Project[];
  skills: SkillCategory[];
  education: Education;
  seo: Seo;
};
